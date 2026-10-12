# KamaraPMS homepage

The public homepage of KamaraPMS: one page that explains the product and collects demo requests.

Same stack as the KamaraPMS web app (`retechno/kamarapms/web`): Vue 3 + TypeScript, Vite, Tailwind CSS v4, Plus Jakarta Sans (self-hosted through `@fontsource-variable`). No router, no state library: it is one page.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run type-check
npm test
npm run build        # dist/, static files for any web server
```

Browser checks (screenshots at 1440, 1280, 768 and 390 px, overflow, console errors, links, menus, tabs, FAQ, form):

```bash
npx playwright install chromium
npm run build && npx vite preview --port 4173 &
node scripts/qa.mjs http://localhost:4173   # writes screenshots/
```

CI (`.github/workflows/ci.yml`) runs the same on every pull request and uploads the screenshots as an artifact.

## Configuration

Copy `.env.example` to `.env.local`. Every value is optional; a link or form whose value is empty is not shown, so the page never has a link that goes nowhere.

| Variable | Used for |
|---|---|
| `VITE_APP_URL` | "Log in" goes to `<VITE_APP_URL>/login` |
| `VITE_DEMO_ENDPOINT` | The demo form POSTs JSON here (`name`, `hotel`, `email`, `phone`, `rooms`, `message`, `source`) |
| `VITE_SALES_EMAIL` | Shown in the demo section and footer; with no endpoint, the form opens an e-mail instead |
| `VITE_PRIVACY_URL`, `VITE_TERMS_URL` | Footer legal links |

With neither an endpoint nor a sales e-mail, the demo section says requests open soon.

## Layout

```
src/
  App.vue                 the order of the sections
  site.config.ts          every link that leaves the page, from the environment
  content/                navigation and feature copy
  components/             one component per section
  components/mockups/     pictures of the product, built from the app's own design references
  assets/main.css         design tokens (colours, type scale, radii) and shared classes
scripts/qa.mjs            browser checks
```

## Rules for the copy

- Only claim what is on `main` of KamaraPMS. The source of truth is `docs/architecture/13-feature-map.md` there.
- Anything not built is labelled **Planned**: today that is point of sale, inventory and purchasing, banquet, and every live integration (channel manager, payment gateway, door locks, PABX, IPTV). When one ships, move it out of `RoadmapSection.vue` / the planned list in `IntegrationsSection.vue` and update the FAQ.
- No customer logos, testimonials, statistics or prices until real ones exist. Figures inside the product pictures are sample data and are captioned as such.
- Colours for rooms and bookings are the app's status tokens (`--color-st-*`), so the pictures match the product.
