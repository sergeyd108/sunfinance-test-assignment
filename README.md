# The Weather App

A small Nuxt 4 SPA built as a take-home assignment: city search with autocomplete, a current weather forecast with daily min/max, temperature unit toggle, and reverse-geocoded location names.

## Stack

- **Nuxt 4** (Vue 3, SSR disabled / SPA mode), TypeScript
- **Pinia** — temperature unit store
- **@nuxt/ui v4** + **Tailwind v4** — UI components and styling
- **VueUse** — composition utilities
- **pnpm** — package manager

## Getting started

```sh
pnpm install
pnpm dev          # dev server
pnpm build        # production build
pnpm preview      # preview the production build locally
pnpm lint         # eslint
pnpm lint:fix     # eslint --fix
pnpm typecheck    # nuxt typecheck
pnpm fmt          # prettier (includes Tailwind class sorting)
```

Requirements: Node 22+, pnpm 11+.

Copy `.env.example` to `.env` and set your OpenWeather API key:

```
NUXT_PUBLIC_OPEN_WEATHER_APP_ID=your_key_here
```

## Project layout

```
app/
├── pages/
│   ├── index.vue              # city search entry point
│   └── index/forecast.vue     # forecast detail (nested route)
├── features/
│   ├── cities/                # search input component + composable
│   └── forecast/              # forecast widget, forecast card, composables
├── components/                # shared UI: logo, error state, temp toggle, weather icon
├── stores/                    # units.ts — selected temperature unit
├── value-objects/             # Temperature.ts, Coordinates.ts
├── middleware/                # weather.ts — coordinate validation guard
└── app.vue / app.config.ts
```

Feature folders keep a component and its composable co-located; `pages/` stays thin and delegates to `features/`.

## Design decisions

**Reverse geocoding for location names.** The forecast page calls OpenWeather's `/geo/1.0/reverse` with the coordinates to resolve the city and country names. When the forecast URL is opened directly (e.g. a shared link), no city name is available — only coordinates — so geocoding is the only way to display it.

**Unit switch converts locally via a value object.** The forecast API is always called with `units=metric`; toggling °C / °F flips a flag in the Pinia store, and the `Temperature` value object (`app/value-objects/Temperature.ts`) converts the stored Celsius value on read. This avoids re-fetching on every toggle and keeps the cached response valid across unit changes.

**Forecast modal lives in its own page.** The modal is rendered by a dedicated nested route (`/forecast?lat=…&lon=…`) rather than being toggled inside the index page. The URL is real and deep-linkable, and the two views stay cleanly separated — the search page doesn't need to know anything about the forecast layout.

**Coordinate validation in route middleware.** `app/middleware/weather.ts` parses and validates `lat`/`lon` via the `Coordinates` value object before the forecast page mounts. Invalid or missing coordinates abort navigation immediately (400) rather than letting the page render and fail mid-fetch.

**Value objects for domain primitives.** `Temperature` and `Coordinates` are small classes that carry their own validation and formatting. Keeps the display logic and invariants next to the data rather than scattered across components.

## CI/CD

`.github/workflows/deploy.yml`:

1. `ci` — `pnpm install` → `pnpm lint` → `pnpm typecheck`.
2. `deploy` — `vercel deploy --prod` on push to `main`, depends on `ci`.

The deploy job expects `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` in the repository secrets.
