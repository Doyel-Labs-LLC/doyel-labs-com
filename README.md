# doyel-labs.com

Company website for **Doyel Labs LLC** (Casper, Wyoming). Static export,
deployed on Cloudflare Pages, with a Pages Function for the contact form
and an owner-only analytics dashboard gated by Cloudflare Access.

The public site is eight pages plus legal documents: home, websites,
software, work, how we work, about, contact, and security. Copy and
prices come from `PROMPT.md` and `src/lib/offer.ts`. The visual system
is in `DESIGN.md` and `tailwind.config.ts`.

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 3, cream canvas, teal accent
- **Rendering:** `output: 'export'` — static HTML, no Next.js server
- **Deploy:** Cloudflare Pages. Pushing `master` builds and publishes.
- **Contact:** `functions/api/contact.ts` → Turnstile → Resend
- **Analytics:** one build-time provider (Cloudflare Web Analytics in
  production, or Plausible, or none). No cookies, no session replay.

Node 22 (see `.nvmrc`).

## Repo layout

```
public/
  _headers                 Site-wide security headers (CSP is appended at build)
  _redirects               Retired URLs → current pages
  robots.txt
  .well-known/security.txt
  media/                   Photographs, client screenshots, generated art
functions/
  _middleware.ts           Admin gate + location ingest
  api/contact.ts           POST /api/contact
server/analytics/          Access check, dashboard, location aggregates
src/app/                   Routes
src/components/            Header, footer, forms, product frames
src/lib/                   Facts, offer, contact contract, analytics config
content/legal/             Legal markdown
migrations/location/       D1 schema for approximate-location counts
workers/location-retention Retention cron for those counts
scripts/                   Path list, admin bundle, CSP hashes, image optimize
tests/                     Vitest unit tests and Playwright e2e
```

`npm run build` generates `src/lib/public-paths.generated.ts` and
`src/lib/generated-images.generated.ts`, exports static HTML to `out/`,
moves the admin export into the Functions bundle, then writes per-page
CSP hashes into `out/_headers`. Do not commit `out/` or the generated
TypeScript files.

There is no root `wrangler.toml`. A root config file enrolls the Pages
project in the Workers-with-static-assets flow and breaks the `out/`
upload. The retention worker's config lives under
`workers/location-retention/` and is not the site deploy.

## Local development

```bash
npm ci
npm run dev          # http://localhost:3100
```

Useful checks:

```bash
npm run typecheck    # site, Pages Functions, and the retention worker
npm run lint
npm test             # vitest
npm run build        # static export + admin bundle + CSP hashes
npm run test:e2e     # Playwright against the built out/ directory
npm run check        # typecheck, lint, unit tests, and build
```

`npm run dev` does not execute Pages Functions. To exercise
`/api/contact` and `/admin`, build first, then:

```bash
npx wrangler pages dev out --port 3192
```

Copy `.env.example` to `.env.local` for public build-time values. Server
secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, Access audience, and
so on) belong in the Cloudflare dashboard, never in git. On any Pages
deployment, including previews, the contact function refuses to send if
Turnstile or a rate-limit binding is missing.

## Deploying

**Repo:** [github.com/Doyel-Labs-LLC/doyel-labs-com](https://github.com/Doyel-Labs-LLC/doyel-labs-com).
Production is the `master` branch. Cloudflare Pages project name:
`website`. Build command `npm run build`, output directory `out`,
Node 22.

The day-to-day path is a push to `master`. A manual upload, if the Git
build is unavailable:

```bash
npm run build
npx wrangler pages deploy out --project-name=website --branch=master
```

Required production variables and bindings are listed in `.env.example`
and `LAUNCH.md`. After a deploy, check `/`, `/contact/`, a retired URL
such as `/pricing/` (it should redirect), and `/admin/analytics/` (it
should demand Cloudflare Access).

## Contact form

`POST /api/contact` accepts JSON (`name`, `email`, `projectType`,
`subject`, `message`, optional `preferredTimes`, a honeypot, and a
Turnstile token). It checks origin, content type, and body size, drops
honeypot hits, validates with `src/lib/contact-form.ts`, verifies
Turnstile, then rate-limits by IP and by email before sending through
Resend. Errors returned to the browser are generic.

## Analytics dashboard

`/admin/analytics/` is not a public page. The middleware verifies a
Cloudflare Access JWT for one configured email and serves the dashboard
from the Functions bundle. Location counts are hourly country, region,
and city totals with no IP address and no page path stored. See
`/security/` and `content/legal/privacy.md`.

## Adding a photograph

Slots are listed in `IMAGES.md`. Prefer a WebP (or JPEG) at
`public/media/generated/<slot>.webp`. `src/components/photo.tsx` uses it
on the next build and falls back to a line illustration if the file is
absent. Do not commit an unredacted screenshot.

## Non-negotiables

From `PROMPT.md`, do not change these without updating that brief first:

- No photo of the founder
- No third-party marketing scripts and no session replay
- No invented clients, reviews, logos, or statistics
- Prices only from `src/lib/offer.ts`
- No headcount language ("our team", "solo", "two-person")
- Outside `/about/` and the legal documents, do not name an individual
