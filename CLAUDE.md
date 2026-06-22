# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

VistaXM marketing site — a single-page-heavy React 19 app built on **TanStack Start** (SSR) and **Vite**, scaffolded by **Lovable** and deployed to **Cloudflare** (Nitro build target). The package name (`tanstack_start_ts`) is a scaffold artifact; the product is VistaXM ("Revenue Channel Intelligence").

## Commands

This project uses **Bun** (see `bun.lock`, `bunfig.toml`). Install with `bun install`.

- `bun run dev` — Vite dev server
- `bun run build` — production build (Nitro/Cloudflare); `bun run build:dev` for development mode
- `bun run preview` — preview the production build
- `bun run lint` — ESLint over the whole repo
- `bun run format` — Prettier write (printWidth 100, semicolons, double quotes, trailing commas)

There is no test runner configured. Typecheck via `tsc --noEmit` (the project has `noEmit: true`).

`bunfig.toml` enforces a 24h supply-chain guard (`minimumReleaseAge`) — packages published less than a day ago are skipped. Don't add to `minimumReleaseAgeExcludes` without confirming with the user.

## Lovable constraints (important)

This project is connected to Lovable (see `AGENTS.md`). **Do not rewrite published git history** — no force-push, rebase, amend, or squash of pushed commits; it corrupts history on Lovable's side. Commits pushed to the connected branch sync back into the Lovable editor, so keep the branch in a working state.

## Architecture

### Vite config is mostly hidden
`vite.config.ts` extends `@lovable.dev/vite-tanstack-config`, which **already includes** tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro, the `@/*` path alias, React/TanStack dedupe, `VITE_*` env injection, and Lovable's dev-only plugins (component tagger, HMR gate, error logger). Do **not** re-add these plugins manually or the app breaks with duplicates. Add extra config via the `defineConfig({ vite: { ... } })` escape hatch.

### Routing — TanStack Start file-based routing
- Routes live in `src/routes/`. Every `.tsx` there is a route. `routeTree.gen.ts` is **auto-generated — never edit by hand**.
- See `src/routes/README.md` for the full filename→URL convention table. Key points: dynamic segments use bare `$` (`$id.tsx`), splats read `_splat` (not `*`), `__root.tsx` is the only app shell.
- This is **not** Next.js or Remix — do not create `src/pages/`, `app/layout.tsx`, etc.
- `src/router.tsx` (`getRouter`) wires the route tree with a per-request TanStack Query `QueryClient` passed through route context (`createRootRouteWithContext`).
- `src/routes/__root.tsx` is the shell: it defines `<head>` meta/OG tags, the `RootShell` (html/body), and `RootComponent` which renders the site `Header` + `Footer` + `QueryClientProvider` around every page. The nav links are currently non-functional placeholders (`href="#"`, `preventDefault`); only `/` exists as a route.

### SSR error handling (three layers)
Server-side errors are caught at three points, all rendering `src/lib/error-page.ts`:
1. `src/start.ts` — `createStart` request middleware wraps handlers; re-throws objects with `statusCode`, renders error page otherwise.
2. `src/server.ts` — the SSR entry (`tanstackStart.server.entry` → `"server"` in vite config). Wraps the TanStack server-entry fetch and specifically detects h3's swallowed-throw pattern (`{"unhandled":true,"message":"HTTPError"}`) that try/catch can't catch.
3. `src/lib/error-capture.ts` / `lovable-error-reporting.ts` — captures last error and reports client-side boundary errors back to Lovable.

When touching SSR, preserve all three layers — they cover distinct failure modes.

### Page composition
`src/routes/index.tsx` (the homepage) is assembled from section components exported by `src/components/site.tsx` (~600 lines: `Hero`, `Section`, `SectionHead`, `Stat`, `CTABand`, plus bespoke data-viz like `NPSGauge`, `JourneyMatrix`, `ScoreVsDecision`, `SpendByCohort`, `InfluencerGapCard`). New marketing sections go in `site.tsx`; new pages go in `src/routes/`.

### Styling — Tailwind v4 + custom design system
- **Tailwind v4** (CSS-first config). All theme tokens and custom utilities live in `src/styles.css`, not a `tailwind.config.js`.
- **shadcn/ui** components are in `src/components/ui/` (style "new-york", base color slate). Config in `components.json`. Use `cn()` from `@/lib/utils` for class merging.
- The site uses a **custom brand layer on top of shadcn**: brand CSS variables (`--navy-deep`, `--blue-cta`, `--orange-pop`, etc.) and custom `@utility` classes defined in `styles.css` — `container-x`, `section-y`, `btn-primary`/`btn-secondary`/`btn-secondary-dark`/`btn-ghost`, `eyebrow`, `pill`, `glass`, `hairline`, `grain`, `reveal`/`reveal-in`, `card-lift`. Prefer these established utilities over ad-hoc Tailwind for marketing UI consistency. Colors are referenced as `bg-[color:var(--navy-deep)]` etc.
- Scroll-reveal animation: wrap content in `<Reveal>` (from `site.tsx`) or use the `useReveal` / `useCountUp` hooks in `src/hooks/use-reveal.ts`. Respects `prefers-reduced-motion`.

### Assets
Images are stored in Lovable's R2 and referenced via `*.asset.json` files in `src/assets/` (e.g. `vistaxm-logo.svg.asset.json`). Import the JSON and read `.url`: `import logoAsset from "../assets/...asset.json"; <img src={logoAsset.url} />`. These are Lovable-managed — don't hand-edit the `url`/`r2_key` fields.

## Conventions
- Path alias: `@/*` → `src/*`.
- `server-only` (Next.js) is a **lint error** — use `*.server.ts` naming or `@tanstack/react-start/server-only` instead.
- `@typescript-eslint/no-unused-vars` is off; `strict` TS is on.
