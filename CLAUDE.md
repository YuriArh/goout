# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server (Vite on port 3000)
npm run dev

# Convex backend (run alongside dev server)
npx convex dev

# Build
npm run build

# Tests
npm run test

# Lint / format / check (Biome)
npm run lint
npm run format
npm run check
```

Add shadcn components:
```bash
pnpm dlx shadcn@latest add button
```

## Architecture

**goout** is a city events guide (Moscow) built on TanStack Start (SSR framework over TanStack Router + React 19).

### Key layers

- **`src/routes/`** — file-based routing via TanStack Router. `__root.tsx` wraps the app in `ConvexProvider`, `WorkOSProvider`, and `LangProvider`. Routes are auto-registered; `src/routeTree.gen.ts` is generated — do not edit manually.
- **`src/integrations/`** — thin provider wrappers for Convex, TanStack Query, and WorkOS AuthKit. Import providers from here, not directly from libraries.
- **`convex/`** — Convex backend: `schema.ts` defines the DB, function files export `query`/`mutation`/`action`. Run `npx convex dev` to sync to the cloud.
- **`src/data/events.ts`** — static mock event data used for UI development before Convex queries are wired up.
- **`src/lib/lang.tsx`** — bilingual (ru/en) context via `useLang()`. All UI strings must support both languages.
- **`src/routes/mcp.ts`** — MCP server endpoint at `POST /mcp`, built with `@modelcontextprotocol/sdk`.

### Data model

The `events` table in `convex/schema.ts` stores bilingual text as `{ ru: string, en: string }` objects. Events have visibility levels: `public`, `neighbors` (geo-fenced by `visibilityRadiusM`), `private`.

### Routing & SSR

- TanStack Start provides SSR via Nitro. Server functions use `createServerFn`; API routes use the `server.handlers` property on a route.
- Path alias `#/*` maps to `src/*` (configured in `package.json` `imports` and `tsconfig`).

### Styling

- Tailwind CSS v4 (via `@tailwindcss/vite`). Config is in `src/styles.css` (no `tailwind.config.ts`).
- Biome handles formatting: tabs for indentation, double quotes for JS/TS strings.
- `src/routeTree.gen.ts` and `src/styles.css` are excluded from Biome linting.

### Auth

WorkOS AuthKit (`@workos-inc/authkit-react`). Set `VITE_WORKOS_CLIENT_ID` in `.env.local`. Auth state from `useAuth()` hook. The `/auth` route handles sign-in/sign-up; authenticated users are redirected to `/`.

### Convex schema notes

- Bilingual fields use the `bilingualStr` helper: `v.object({ ru: v.string(), en: v.string() })`.
- `_id` and `_creationTime` are system fields — never define them manually.
- Do not add indexes for `_id` or `_creationTime` (automatic).
- Required env vars: `VITE_CONVEX_URL`, `CONVEX_DEPLOYMENT` (set via `npx convex init` or manually in `.env.local`).
