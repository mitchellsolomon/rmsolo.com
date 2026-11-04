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

## Photography

Automatic publishing from the Mac's **Website Photography** album is documented
in [`scripts/photo-sync/README.md`](scripts/photo-sync/README.md). The native
helper exports web-ready copies and a background job publishes from an isolated
checkout. It requires one-time Photos permission and an initial successful sync.

Store web-ready originals in `src/assets/photography` and register static imports
with descriptive alt text in `src/app/photography/photos.ts`. See
[`src/assets/photography/README.md`](src/assets/photography/README.md) for an example.

Every page and the shared navigation use the same `site-container`: a maximum
width of 1440px and 20/32/48px responsive side padding. Body text starts at 16px;
headings use a rem-based fluid scale, and prose retains a readable line length.
Navigation has 44px minimum targets, current-page semantics, visible keyboard
focus, and a skip-to-content link. All pages use a white background.

The gallery preserves full aspect ratios: one column below 640px, two below
1024px, and three on larger screens. All photos use their full column width,
with variation only in vertical offsets and spacing. Gaps start at 32px
and increase to 40px on desktop, with additional vertical breathing room.
Positions are calculated on the server from intrinsic dimensions. There is no
random layout, client-side measurement, cropping, or animated rearrangement.

Photo descriptions live in `src/app/photography/descriptions.ts`, keyed by the
stable IDs in `photos.generated.ts`. Add descriptive alt text there for new
album photos; this editorial file is not overwritten by the sync job.

Run `node --test scripts/test-board-layout.mjs` to check layout bounds and
spacing for mixed aspect ratios and verify existing placements stay stable
when more photos are appended. These checks are not a full WCAG audit.

## Vercel

- Framework preset: **Next.js**.
- Root directory: the repository root.
- Node.js: **24.x**, enforced by `engines.node` in `package.json`.
- Enable Corepack by setting **`ENABLE_EXPERIMENTAL_COREPACK=1`** for builds so Vercel uses the pinned pnpm version.
- Leave the install command on automatic detection; commit `pnpm-lock.yaml` and `pnpm-workspace.yaml` with `package.json`.
- Build command: **`pnpm build`** (also the automatic default for this project).
- Leave the output directory at the Next.js default.

No application environment variables are required. `next/font/google` downloads Inter during the build, so the build environment needs access to Google Fonts. Fonts are then served by the site.

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
