export type Photograph = {
  id: string;
  src: string;
  tileSrc?: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
};

type StrapiImage = {
  url: string;
  width: number;
  height: number;
  alternativeText?: string | null;
  formats?: { large?: { url: string } };
};

type StrapiPhotograph = {
  documentId: string;
  title: string;
  altText?: string | null;
  takenAt?: string | null;
  sortOrder?: number | null;
  image?: StrapiImage | null;
};

export async function getPhotographs(): Promise<Photograph[] | null> {
  const base = process.env.STRAPI_URL?.replace(/\/$/, "");
  const token = process.env.STRAPI_READ_TOKEN;
  if (!base || !token) return process.env.NODE_ENV === "development" ? [] : null;

  const entries: { photo: Photograph; takenAt: string | null; sortOrder: number }[] = [];
  try {
    let page = 1;
    let pages = 1;
    do {
      const url = new URL("/api/photographs", base);
      url.searchParams.set("populate", "image");
      url.searchParams.set("sort", "createdAt:asc");
      url.searchParams.set("pagination[page]", String(page));
      url.searchParams.set("pagination[pageSize]", "100");
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "force-cache",
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Strapi returned ${response.status}`);
      const result = (await response.json()) as {
        data?: StrapiPhotograph[];
        meta?: { pagination?: { pageCount?: number } };
      };
      for (const item of result.data ?? []) {
        const image = item.image;
        if (!image?.url || !image.width || !image.height) continue;
        entries.push({
          takenAt: item.takenAt ?? null,
          sortOrder: item.sortOrder ?? 0,
          photo: {
            id: item.documentId,
            src: new URL(image.url, base).toString(),
            tileSrc: image.formats?.large?.url
              ? new URL(image.formats.large.url, base).toString()
              : undefined,
            width: image.width,
            height: image.height,
            alt: item.altText || image.alternativeText || item.title,
          },
        });
      }
      pages = result.meta?.pagination?.pageCount ?? 1;
      page += 1;
    } while (page <= pages);
    entries.sort((a, b) => {
      if (a.takenAt && b.takenAt) {
        const byDate = Date.parse(b.takenAt) - Date.parse(a.takenAt);
        if (byDate) return byDate;
      } else if (a.takenAt || b.takenAt) {
        return a.takenAt ? -1 : 1;
      }
      return b.sortOrder - a.sortOrder || a.photo.id.localeCompare(b.photo.id);
    });
    return entries.map(({ photo }) => photo);
  } catch (error) {
    console.error("Could not load photographs from Strapi.", error);
    return null;
  }
}
