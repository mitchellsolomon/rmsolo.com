# Photography CMS

This is a self-hosted Strapi 5 project for the photography page. Production uses PostgreSQL and a persistent Docker volume for uploads. The code and schema are versioned here; database records and uploaded files live on the home server.

## Deploy on the Linux server

1. Clone or pull this repository onto the server. In `cms/`, run `bash setup-env.sh`. It creates a private `.env` with random secrets and the Strapi address. Back it up securely.
2. On this server, Nginx Proxy Manager already uses the shared Docker network named `proxy`. In `cms/`, run `docker compose up -d --build`. The PostgreSQL port is not published. Uploaded files and the database persist in named Docker volumes.
3. In Nginx Proxy Manager, create a Proxy Host for `strapi.rmsolohome.com`, scheme **http**, forward hostname **rmsolo-strapi**, port **1337**. Leave the host's own SSL settings off; Cloudflare Tunnel provides public HTTPS.
4. In Cloudflare, create a Tunnel named `rmsolo-strapi` and add a **Published application** route: hostname `strapi.rmsolohome.com`, service `http://nginx-proxy-manager:80`. Cloudflare should create a proxied CNAME for this specific hostname, which overrides the existing wildcard DNS record pointing to a Tailscale address. Copy the tunnel token from the dashboard. On the server, run `bash set-tunnel-token.sh` in `cms/` and paste the token at its hidden prompt. The script starts the `cloudflared` container on the shared `proxy` network. Do not share the token in chat.
5. Open `https://strapi.rmsolohome.com/admin` and create the first admin account. Protect admin access with a strong password and keep Strapi updated. The Content API needs no public role permissions; the website reads with a server-side API token.

## Import the existing gallery once

1. In Strapi Admin, go to **Settings → API Tokens** and create a temporary **Full access** token. Do not put it in `.env`, Git, or Vercel.
2. From the repository root on a machine with Node.js 24 and the archived photos, run:

   ```bash
   STRAPI_URL=https://strapi.rmsolohome.com STRAPI_WRITE_TOKEN='temporary-token' node cms/import-archive.mjs
   ```

   The importer checks `legacyId` before each upload, so it can resume after an interruption. It preserves the existing display order with `sortOrder`. The archival JPEGs do not include a reliable capture date, so edit `takenAt` in Strapi where known. New entries sort by `takenAt` newest first; undated entries use `sortOrder`.
3. Verify all 27 entries are published and visible in `GET /api/photographs` using an API token. Revoke the temporary Full access token.
4. Create a **Custom** API token with only `Photograph → find` permission. In Vercel, set `STRAPI_URL=https://strapi.rmsolohome.com` and `STRAPI_READ_TOKEN` to this token, then redeploy. The token must remain server-side. The gallery refreshes from Strapi every five minutes and uses Next.js image optimization for uploaded images. If Strapi is unavailable, it displays the archived gallery.

## Add a photo

In **Content Manager → Photograph**, create an entry with a title, descriptive alt text, capture date (`takenAt`), and one image. Publish the entry. Export JPEG or WebP in sRGB at roughly 2000–2400 pixels on the long edge, and remove GPS metadata before upload. The gallery preserves the full aspect ratio.

## Backups and updates

Back up both Docker volumes: `cms_database` and `cms_uploads`. A database dump alone does not include the files. Keep `.env` with the backups because its secrets are required for a full restore. To update the CMS, pull the repo and run `docker compose up -d --build`; take a backup first.

Local development can use SQLite: run `npm ci` in `cms/`, set the secrets in `cms/.env`, then `npm run develop`. The production Compose configuration overrides the database settings for PostgreSQL.
