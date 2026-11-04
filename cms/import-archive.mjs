import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.STRAPI_URL?.replace(/\/$/, '');
const token = process.env.STRAPI_WRITE_TOKEN;
if (!base || !token) {
  throw new Error('Set STRAPI_URL and a temporary STRAPI_WRITE_TOKEN before importing.');
}

const photos = JSON.parse(await readFile(path.join(here, 'archive.json'), 'utf8'));
const headers = { Authorization: `Bearer ${token}` };

async function checked(response) {
  if (!response.ok) throw new Error(`${response.status}: ${await response.text()}`);
  return response.json();
}

for (const [index, photo] of photos.entries()) {
  const existingUrl = new URL('/api/photographs', base);
  existingUrl.searchParams.set('filters[legacyId][$eq]', photo.legacyId);
  const existing = await checked(await fetch(existingUrl, { headers }));
  if (existing.data?.length) {
    console.log(`${index + 1}/${photos.length} already imported`);
    continue;
  }

  const bytes = await readFile(path.join(here, '../src/assets/photography/archive', photo.file));
  const form = new FormData();
  form.append('files', new Blob([bytes], { type: 'image/jpeg' }), photo.file);
  form.append('fileInfo', JSON.stringify({ alternativeText: photo.altText }));
  const uploaded = await checked(await fetch(new URL('/api/upload', base), {
    method: 'POST', headers, body: form,
  }));
  const imageId = uploaded[0]?.id;
  if (!imageId) throw new Error(`Upload did not return an image ID for ${photo.file}`);

  await checked(await fetch(new URL('/api/photographs', base), {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: {
      title: `Photograph ${String(index + 1).padStart(2, '0')}`,
      altText: photo.altText,
      sortOrder: photo.sortOrder,
      legacyId: photo.legacyId,
      image: imageId,
    } }),
  }));
  console.log(`${index + 1}/${photos.length} imported`);
}

console.log('Archive import complete. Revoke the temporary write token.');
