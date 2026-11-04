# Photography CMS

This is a self-hosted Strapi 5 project for the photography page. Production uses PostgreSQL and a persistent Docker volume for uploads. The code and schema are versioned here; database records and uploaded files live on the home server.

## Deploy on the Linux server

1. Put the repository's `cms/` contents in `/opt/compose/strapi` on the home server. Run `bash setup-env.sh` there only for a new installation. It creates a private `.env` with random secrets and the Strapi address. Back it up securely. When moving an existing installation, keep its `.env` instead.
2. Nginx Proxy Manager uses the shared Docker network named `proxy`. In `/opt/compose/strapi`, run `docker compose up -d --build`. The PostgreSQL port is not published. Uploaded files and the database persist in named Docker volumes. The explicit Compose project name `rmsolo-strapi` keeps the existing `rmsolo-strapi_database` and `rmsolo-strapi_uploads` volumes attached even if the directory moves.
3. In Nginx Proxy Manager, use the existing Proxy Host for `strapi.rmsolohome.com`, scheme **http**, forward hostname **rmsolo-strapi**, port **1337**. This is the private admin address, reachable while connected to Tailscale. Keep its HTTPS certificate enabled.
4. The `photo-public` container listens on the server's loopback address at port 1340. Its Nginx configuration allows only `GET`/`HEAD` for `/api/photographs` and image files in `/uploads/`; all other routes return 404. Image files use long-lived caching because Strapi gives each uploaded file a unique name. Test it locally before publishing: `curl -i http://127.0.0.1:1340/_health`, `curl -i http://127.0.0.1:1340/admin`, and `curl -i -X POST http://127.0.0.1:1340/api/photographs`.
5. If public automatic updates are desired, enable Tailscale Funnel for this gateway from the server: `sudo tailscale funnel --bg 1340`. Use the HTTPS `*.ts.net` URL reported by Tailscale as the website's `STRAPI_URL`. Funnel makes the gateway public, so check its route restrictions first. The Strapi admin remains on the private `strapi.rmsolohome.com` address. `sudo tailscale funnel reset` removes the Funnel configuration if this host has no other Serve/Funnel routes; otherwise disable only this route.
6. Open `https://strapi.rmsolohome.com/admin` while connected to Tailscale and create the first admin account. Protect admin access with a strong password and keep Strapi updated. The Content API needs no public role permissions; the website reads with a server-side API token.

If the admin password is lost before email delivery is configured, SSH to the server, run `cd /opt/compose/strapi`, then `docker compose exec strapi npm run strapi -- admin:reset-user-password`. Enter the email and new password at the interactive prompts; do not put the password in a command argument or shell history.

## Website connection

The existing gallery was imported into Strapi and the temporary import token was revoked. The live site uses a **Custom** API token with only `Photograph → find` permission. In Vercel Production, `STRAPI_URL` is the public HTTPS Funnel URL and `STRAPI_READ_TOKEN` is a secret. The gallery refreshes from Strapi every five minutes and uses Next.js image optimization. If Strapi is unavailable, the page displays a temporary-unavailable message.

The original JPEGs did not include reliable capture dates. Edit `takenAt` in Strapi where known. New entries with dates sort newest first; undated entries use `sortOrder`.

## Add a photo

In **Content Manager → Photograph**, create an entry with a title, descriptive alt text, capture date (`takenAt`), and one image. Publish the entry. Export JPEG or WebP in sRGB at roughly 2000–2400 pixels on the long edge, and remove GPS metadata before upload. The gallery preserves the full aspect ratio.

## Backups and updates

Back up both Docker volumes: `rmsolo-strapi_database` and `rmsolo-strapi_uploads`. A database dump alone does not include the files. Keep `.env` with the backups because its secrets are required for a full restore. To update the CMS, pull the repo and run `docker compose up -d --build`; take a backup first.

Local development can use SQLite: run `npm ci` in `cms/`, set the secrets in `cms/.env`, then `npm run develop`. The production Compose configuration overrides the database settings for PostgreSQL.
