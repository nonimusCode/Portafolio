# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install
pnpm dev          # webpack dev server on http://localhost:3000
pnpm dev:turbo    # turbopack dev server (faster, default for Next.js 16)
pnpm build
pnpm start        # production server after build
pnpm lint         # ESLint
```

There is no test suite in this project.

## Architecture

Single-page portfolio — one route (`app/page.tsx`) that composes all sections. The only entry points are `app/layout.tsx` (fonts, metadata, global styles) and `app/page.tsx` (section assembly).

**Dependency rule:**
```
app/  →  features/  →  components/ui/, lib/, hooks/
              ↘  config/  ←  constants/content.json
```

Features must not import from each other. Composition happens exclusively in `app/page.tsx`.

### Layers

| Path | Role |
|------|------|
| `app/` | Routing shell only. No section logic here. |
| `features/<name>/` | One vertical slice per section. Each exposes its public API via `index.ts`. |
| `constants/content.json` | **Single source of truth for all copy, labels, and data.** Never hardcode strings in components. |
| `config/site.ts` | Derives `siteConfig` (SEO, nav links, CTAs) from `content.json`. |
| `components/ui/` | Generic UI primitives (shadcn/ui + Radix pattern). No product logic. |
| `shared/providers/` | React context wrappers (e.g. `ThemeProvider`). |

### Key patterns

- **All copy lives in `constants/content.json`.** Components import it directly (`import content from "@/constants/content.json"`) or consume it via `siteConfig`.
- **Below-the-fold sections are lazy-loaded** with `next/dynamic` in `app/page.tsx`. `Navbar` and `HeroSection` are imported eagerly.
- **Three.js** (`IridescentDiamond`) is loaded with `ssr: false` inside `features/hero/` to avoid SSR issues.
- `ScrollRevealText` in `components/ui/` uses `IntersectionObserver`-style scroll tracking with a soft diagonal gradient reveal — no external animation library.
- Fonts: `Syne` → `--font-syne` (sans), `Space Mono` → `--font-space-mono` (mono). Both are CSS variables set on `<html>`.

### next.config.mjs notes

- `typescript.ignoreBuildErrors: true` — type errors do not block production builds.
- `outputFileTracingRoot` and `turbopack.root` are pinned to the project directory to prevent Turbopack from misreading a parent-level lockfile.
- `pnpm dev` forces webpack; `pnpm dev:turbo` uses Turbopack.

## Adding content

To update any visible text, stats, nav links, or section data — edit `constants/content.json`. No component changes needed.

## Adding a new section

1. Create `features/<name>/` with the component and an `index.ts` barrel.
2. Export it from `features/index.ts`.
3. Add a nav anchor to `content.json` under `nav.links`.
4. Import and render it in `app/page.tsx` (use `next/dynamic` for below-the-fold sections).
