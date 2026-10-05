# doyel-labs.com

Company website for **Doyel Labs LLC** (Casper, Wyoming). Static export,
deployed on Cloudflare Pages. Production is the `master` branch of this
repo, Pages project **`website`**.

The live site is the warm linen design (v12 layout and copy, v13 palette):
Fraunces and Figtree, self-hosted; cream canvas `#f6eee2`, ivory cards,
teal `#087187`. Prices live only in `src/lib/offer.ts`. The brief is
`PROMPT.md`. Tokens are in `DESIGN.md` and `tailwind.config.ts`.

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Rendering:** `output: 'export'` — static HTML, no Next server runtime
- **Contact:** Pages Function `POST /api/contact` → Resend → Google Workspace,
  plus one automatic receipt to the visitor
- **Analytics:** chosen at build time (`NEXT_PUBLIC_ANALYTICS_PROVIDER`).
  Production uses Cloudflare Web Analytics plus first-party approximate
  location counts. The owner dashboard is `/admin/analytics/`, behind
  Cloudflare Access, and is not part of the public export.

Build pipeline: `prebuild` writes the public-path allowlist and the
generated-image list → `next build` → `scripts/package-admin.mjs` moves
the admin export into the Functions bundle → `scripts/csp-hashes.mjs`
writes a hashed Content-Security-Policy into the single `/*` block of
`out/_headers`. Node 22 (`.nvmrc`).

## Checks

```bash
npm ci
npm run typecheck    # site, Pages Function, and the location-retention worker
npm run lint
npm test             # vitest
npm run test:analytics
npm run build
npm run test:e2e     # Playwright, including the rendering regression
```

`npm run check` runs typecheck, lint, vitest, and the build. CI
(`.github/workflows/ci.yml`) runs the same gates plus the analytics tests
and Playwright, and fails if `out/_headers` has a second `/*` block or
allows `'unsafe-inline'` in `script-src` or public `style-src`.

## Local development

```bash
npm install
npm run dev          # http://127.0.0.1:3100
```

Copy `.env.example` for the build-time public variables. Pages Function
secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) and the `RATE_LIMITER`
or `CONTACT_KV` binding are set in the Cloudflare dashboard, not in git.
A local process with no `CF_PAGES_BRANCH` may omit Turnstile and the rate
limiter. Every Pages deployment, including previews, refuses to run
without both.

## Deploy

Pushing `master` builds the site on Cloudflare Pages (project `website`,
root directory the repo root, build command `npm run build`, output `out`).
There is no `wrangler.toml` on purpose: adding one would switch the
project to Workers static assets and stop the automatic `out/` upload.

Do not deploy from a laptop unless the Git integration is down:

```bash
npx wrangler pages deploy out --project-name=website --branch=master
```

### Pages settings the function needs

| Name | Kind | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Encrypted | Contact mail. Sending-access scope only. |
| `RESEND_FROM` | Plain | e.g. `Doyel Labs Website <noreply@doyel-labs.com>` |
| `CONTACT_TO` | Plain | Default `support@doyel-labs.com` |
| `TURNSTILE_SECRET_KEY` | Encrypted | Server-side Turnstile verify |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Plain | Widget key, baked in at build time |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Plain | `cloudflare` in production |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | Plain | Web Analytics site token |
| `NEXT_PUBLIC_LOCATION_ANALYTICS_ENABLED` | Plain | `true` only with the Cloudflare provider |

Bindings: `RATE_LIMITER` (5 requests / 300 seconds) or fallback `CONTACT_KV`.
The function counts per IP and per email (the email key is a SHA-256 hash).
Production Turnstile tokens must be minted for `doyel-labs.com` or `www`.

## Repo layout

```
public/                _headers, _redirects, robots.txt, media, icons
content/legal/         Counsel drafts. Raw HTML is escaped at render.
functions/api/contact.ts
src/app/               /, /websites, /software, /work, /how-we-work,
                       /about, /contact, /security, /legal/*, admin export
src/components/        chrome, contact form, Photo, frames
src/lib/               site facts, offer, contact contract, emails,
                       contact-guard, legal loader, analytics config
src/fonts/             Fraunces and Figtree, self-hosted
server/analytics/      Owner dashboard and location ingest
workers/location-retention/
scripts/csp-hashes.mjs Hashed CSP, merged into the one /* header block
tests/                 vitest and Playwright
```

## Contact form

`functions/api/contact.ts` handles `POST /api/contact`.

1. The request must come from this site (`Origin`, and not
   `Sec-Fetch-Site: cross-site`), be JSON, and stay under 16 KB.
2. A filled honeypot (`dl_hp` in the form, `website` in the JSON) returns
   `{ ok: true }` and sends nothing.
3. Fields are cleaned with the same rules as the browser, including NUL
   bytes.
4. Turnstile is verified. Production accepts only `doyel-labs.com` and
   `www`. A missing secret fails closed on every Pages deployment.
5. After Turnstile, the IP and the hashed email are rate-limited. A
   missing binding fails closed on every deployment.
6. Resend delivers the notification. Logs record a static event and the
   HTTP status. They do not include the Resend body, the message, or the
   Turnstile hostname.
7. One best-effort receipt goes to the visitor (`src/lib/contact-email.ts`).
   It never repeats the message, greets by first name only when the name
   is plain letters, and is capped per address (one per day when
   `CONTACT_KV` is bound). A receipt failure is logged and does not fail
   the request. The success card mentions the receipt only when the
   response says `receipt: true`.

Both email templates match the site: linen canvas, one ivory card,
Georgia headings, an amber bar, a teal pill. That module must not import
`site.ts` (it reads `process.env`).

## Adding a legal page

1. Add `content/legal/<slug>.md` with `title`, `version`, and
   `under_review` frontmatter. Write markdown. Do not put raw HTML in the
   draft: it is escaped, and a `<script>` would otherwise be hashed into
   `script-src`.
2. Add `src/app/legal/<slug>/page.tsx` that calls `loadLegal` and sets a
   description plus a canonical Open Graph URL.
3. Add the slug to the legal nav and to `src/app/sitemap.ts`.
4. Leave `under_review: true` until counsel signs.

## Images

Photo slots are `public/media/generated/<name>.jpg` with a `.webp`
sibling. `<Photo>` prefers the WebP and keeps the JPEG as the `<img>`
src, with width, height, and synchronous decode. SteadFast screenshots
live in `public/media/websites/`. See `IMAGES.md`. Use a sized `<img>`,
not `next/image`: the optimizer emits an inline style, and public pages
do not allow `style-src 'unsafe-inline'`.
