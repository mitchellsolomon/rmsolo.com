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

The site has routes at `/`, `/about`, and `/links`. The navigation's links item intentionally opens `https://links.rmsolo.com` in a new tab.

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
