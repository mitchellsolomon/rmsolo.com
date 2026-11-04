# rmsolo.com

Mitchell Solomon's personal website, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Local development

Use Node.js 24 (see `.nvmrc`) and pnpm 10.34.9 (pinned in `package.json`). With Corepack installed, `corepack enable` activates the pinned package manager. Alternatively, install it with `npm install --global pnpm@10.34.9`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

`pnpm build` runs ESLint before creating the production build. Next.js also checks TypeScript during the build. `pnpm typecheck` generates route types before checking, so it works on a fresh checkout.

The site has routes at `/`, `/links`, and `/photography`. The shared navigation links to the home and photography pages.

## Project organization

`src/app` contains the Next.js App Router routes and shared site UI. The `(site)` route group shares a main layout for the home and links pages without adding a URL segment. Photography renders its own main container because the gallery needs different spacing. Shared navigation and global styles live at the `app` level; gallery components and data loading stay beside the photography route. This is Next.js's supported route-colocation pattern, so separate top-level `components`, `lib`, and `types` folders are unnecessary for this small site.

`cms/` is an independent Strapi application with its own `package.json` and npm lockfile. The site uses pnpm; Strapi's Docker build uses npm. Keep both lockfiles current and do not install the CMS as a pnpm workspace package. The SaaS example in Strapi's blog includes authentication, dashboard, and pricing code that this photography site does not use.

## Photography

Photographs are managed in Strapi. See [`cms/README.md`](cms/README.md) for
deployment and adding new images. The live gallery reads published photos
through a read-only Tailscale Funnel gateway and refreshes within five minutes.

Every page and the shared navigation use the same `site-container`: a maximum
width of 1440px and 20/32/48px responsive side padding. Body text starts at 16px;
headings use a rem-based fluid scale, and prose retains a readable line length.
Navigation has 44px minimum targets, current-page semantics, visible keyboard
focus, and a skip-to-content link. All pages use a white background.

The gallery preserves full aspect ratios: one column below 640px, two below
1024px, and three on larger screens. All photos use their full column width,
with variation only in vertical offsets and spacing. Gaps start at 32px
and increase to 40px on desktop, with additional vertical breathing room.
Each photo goes into the shortest column so mixed shapes finish at similar
heights. Positions use intrinsic dimensions, with no random layout, cropping,
client-side measurement, or animated rearrangement. Clicking a photo opens an
optimized full-size view in a native dialog with a dimmed backdrop. The viewer
requests a size matched to the photo's shape and viewport. Added 1280px and 1440px
optimizer widths avoid the default jump from 1200px to 1920px on Retina
screens. Escape, the close button, and the backdrop close it; focus returns to
the selected photo.
Descriptions remain available to screen readers without appearing below the image.

Set descriptive alt text for new photos in Strapi's Photograph editor.

Run `node --test scripts/test-board-layout.mjs` to check layout bounds,
spacing, and column balance for mixed aspect ratios and verify existing
placements stay stable when more photos are appended. These checks are not a
full WCAG audit.

## Vercel

- Framework preset: **Next.js**.
- Root directory: the repository root.
- Node.js: **24.x**, enforced by `engines.node` in `package.json`.
- Enable Corepack by setting **`ENABLE_EXPERIMENTAL_COREPACK=1`** for builds so Vercel uses the pinned pnpm version.
- Leave the install command on automatic detection; commit `pnpm-lock.yaml` and `pnpm-workspace.yaml` with `package.json`.
- Build command: **`pnpm build`** (also the automatic default for this project).
- Leave the output directory at the Next.js default.

Set `STRAPI_URL` to the public HTTPS Funnel URL and `STRAPI_READ_TOKEN` to a
Strapi token with only `Photograph → find` permission in Vercel Production. The
token stays server-side. The gallery shows a temporary-unavailable message if
the CMS cannot be reached.
`next/font/google` downloads Inter during the build, so the build environment
needs access to Google Fonts. Fonts are then served by the site.

After updating dependencies or changing Node versions, redeploy without the previous build cache if Vercel retains stale artifacts.

See [Vercel package manager configuration](https://vercel.com/docs/package-managers) and [Corepack configuration](https://vercel.com/docs/builds/configure-a-build#corepack).

## Dependency maintenance

Next.js and `eslint-config-next` use matching versions. Tailwind 4 uses `@tailwindcss/postcss`; the old Tailwind config and Autoprefixer are no longer needed.

ESLint stays on 9.x because `eslint-plugin-react`, included by Next.js, currently declares support through ESLint 9. TypeScript stays on 6.0.x because `typescript-eslint` currently requires TypeScript below 6.1. Update these together when their peer dependencies support newer majors. Node type definitions track the Node 24 deployment runtime.

To refresh compatible direct and indirect dependencies, then validate:

```bash
pnpm update --depth Infinity
pnpm audit
pnpm typecheck
pnpm build
```
