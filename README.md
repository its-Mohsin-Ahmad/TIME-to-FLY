# TIME TO FLY

A premium, responsive travel-management frontend for flights, stays, packages, experiences, transport, trip planning, ticketing, customer accounts, and operations.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run preview
```

## Included product surfaces

- Cinematic homepage with multi-mode booking search, autoplay destination carousel, trust services, animated statistics, commerce previews, reviews, and editorial content
- Searchable destination, hotel, experience, package, vehicle, and transfer catalogs
- Flight filters, sorting, selection, persisted bookings, and generated boarding passes
- Hotel details with room selection, policies, amenities, location, and reservation state
- Trip planner with editable/reorderable timeline, calendar, map, budget, and FlyMate suggestions
- Customer dashboard, admin operations dashboard, Recharts analytics, authentication, checkout/coupons, ticketing, support center, guides, and blog
- Responsive mobile navigation, filter drawers, dashboard sidebars, and accessible keyboard/focus states
- Route-level lazy loading, shared local persistence, reduced-motion support, and responsive image delivery

## Deploy on GitHub Pages

The included GitHub Actions workflow builds and deploys `main` to GitHub Pages:

- **Repository:** https://github.com/its-Mohsin-Ahmad/TIME-to-FLY
- **Live site:** https://its-mohsin-ahmad.github.io/TIME-to-FLY/

The workflow runs `npm ci`, ESLint, and the Vite production build before publishing the static site. Vite uses the `/TIME-to-FLY/` project base path in CI, and a `404.html` copy provides client-route fallback support.

## Architecture notes

This repository is a complete interactive product frontend. External travel inventory, authentication, live maps, weather, payments, email, and AI responses use realistic demo state and clearly marked integration points. Production deployment should connect the existing UI contracts to authenticated server APIs, object storage, a flight/hotel aggregator, Stripe, Mapbox, and a vetted AI provider before handling real customer data.
