# Copilot Instructions

## Project Overview

Nuxt 3 boilerplate using Tailwind CSS 4, shadcn-nuxt (Reka UI), Pinia, i18n, VueUse, Vitest, Zod, and PWA support. Uses Nuxt's **Compatibility Version 4** layout (`app/` directory as source root).

## Architecture

- **`app/`** — source root (Nuxt v4 compat). Pages, layouts, components, composables all live here.
- **`server/`** — Nitro server routes (`api/`) and shared server utilities (e.g., `telegramUtils.ts`).
- **`shared/`** — code shared between app and server (e.g., `shared/utils/customLogger.ts`).
- **`i18n/locales/`** — translation files (`en.json`, `es.json`).
- **`assets/css/main.css`** — global styles; Tailwind CSS 4 is loaded via `@tailwindcss/vite` plugin.

## Build and Test

```bash
pnpm install          # install dependencies
pnpm dev              # start dev server (nuxi dev)
pnpm build            # production build
pnpm test             # run unit tests (vitest run)
pnpm lint             # eslint + prettier check
pnpm lint:fix         # auto-fix lint and formatting
pnpm typecheck        # nuxi typecheck
```

## Code Style

- **`<script setup lang="ts">`** syntax for all Vue SFCs.
- Tailwind utility classes composed via `cn()` helper (`app/lib/utils.ts`) — wraps `clsx` + `tailwind-merge`.
- shadcn components live in `app/components/ui/` and are built on Reka UI primitives.
- ESLint flat config (`eslint.config.js`) + Prettier; husky + lint-staged enforce on commit.

## Project Conventions

- **Composables** in `app/composables/` export functions prefixed `use*`. Use Nuxt's `useState` for SSR-shared state (see `count.ts`). Pinia stores use the Setup Store pattern with `acceptHMRUpdate` (see `stores/user.ts`).
- **i18n**: use `useI18n()` and `t('key')` — never hardcode user-facing strings; add keys to both `en.json` and `es.json`.
- **Runtime secrets** are declared in `nuxt.config.ts → runtimeConfig` (server-only by default) and sourced from `.env` via `NUXT_` prefix. Never expose secret keys client-side.
- **Server API routes** in `server/api/` use `defineEventHandler`. Shared server utilities (e.g., Telegram bot) are imported from `server/`.
- **Zod** is used for runtime validation of API inputs/outputs — prefer schema-first approach.

## Integration Points

- **Telegram logging**: `server/telegramUtils.ts` exposes `telegramLogBot`; credentials via `NUXT_TELEGRAM_LOG_BOT_TOKEN` / `NUXT_TELEGRAM_LOG_CHAT_ID` in `.env`.
- **PWA**: configured in `app/config/pwa.ts`, enabled via `VITE_PLUGIN_PWA=true` (`pnpm dev:pwa`).
- **Icons**: `@nuxt/icon` with `@iconify-json/carbon` and `@iconify-json/twemoji` icon sets.

## Security

- `.env` contains Telegram bot secrets — never commit, never reference from client-side code.
- `runtimeConfig` server keys are only accessible in `server/` and Nitro handlers.
