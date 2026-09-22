# doyel-labs.com

Company website for **Doyel Labs LLC** (Casper, Wyoming). Static export,
deployed on Cloudflare Pages with a serverless contact-form function.

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 3, cyan accent (`#10c7eb`) on a softened
  near-black canvas
- **Rendering:** `output: 'export'` — static HTML, no server runtime
- **Deploy:** Cloudflare Pages, `master` branch = production
- **Contact form:** Cloudflare Pages Function → Resend → Google Workspace
- **Analytics:** One build-selected, cookieless aggregate provider. Plausible
  remains the legacy default until the coordinated Cloudflare switch.
- **Private dashboard:** Staged at `/admin/analytics/`, disabled by default.
  It does not change public collection or install Cloudflare Web Analytics.

The source-of-truth design brief lives in `PROMPT.md`. Read it before
you write copy. Read it *first* before you change positioning.

## Repo layout

```
public/
  _headers               Cloudflare Pages response headers (CSP, HSTS)
  _redirects             Redirect table
  robots.txt
  .well-known/security.txt
  favicon.*, apple-touch-icon.png, logo.svg
  manifest.webmanifest
  media/
    payroll/             (empty; product frames use synthetic data)
    websites/            Real SteadFast screenshots + logo (v2 = optimized)
    bai/                 Optimized BAI product artwork
    connectionloop/      Optimized ConnectionLoop icon

content/
  legal/                 Legal MDX drafts (under counsel review)
    terms.md
    privacy.md
    payroll-data.md
    risk.md

src/
  lib/
    site.ts              Company facts, phone, emails, disclaimers
    legal.ts             Loads content/legal/*.md
    changelog.ts         Single source of truth for /changelog/ + RSS
    testimonials.ts      Named client testimonials (opt-in only)
    writing.ts           Blog post index
    demo/                Synthetic demo data for product frames
  components/
    chrome.tsx           Header, Footer, Page, Eyebrow, H1, H2, Lead, Card,
                         GhostLink, LogoMark, AccentChip, MetaRow, Feature,
                         Notice, Grid2/3, StatusChip
    mobile-nav.tsx       Portal-based native dialog with focus containment
    contact-link.tsx     Canonical inquiry links with optional topic selection
    contact-page-form.tsx The single inquiry form on /contact/
    service-cards.tsx    Three capability groups shared by Home and Services
    process-steps.tsx    Shared four-step engagement summary
    product-cards.tsx    Registry-driven product previews
    turnstile.tsx        Cloudflare Turnstile widget
    quote.tsx            Named client quote block
    client-badge.tsx     Client logo + name + link
    reveal.tsx           Static compatibility wrapper; content is always visible
    breadcrumbs.tsx      Breadcrumb nav + JSON-LD schema
    product-frame.tsx    Dark hairline box that holds a product screen
    frames/              One file per synthetic product screen
    legal-page.tsx       Shared shell for /legal/*
  app/
    layout.tsx           Root metadata, Organization + WebSite JSON-LD
    globals.css          Tokens, reveal animation, prose-legal
    page.tsx             /
    services/            /services and children (websites, payroll, custom-software)
    industries/          /industries and /industries/federal-service-contractors
    work/
    faq/
    contact/
    company/             Company-focused About page
    engineering/
    security/
    press/
    support/
    status/              (client component, live health checks from browser)
    changelog/           HTML changelog + rss.xml route
    docs/                and children (websites, payroll)
    writing/             Blog index + posts
    products/            BAI and ConnectionLoop, with preserved product anchors
    legal/               /legal/{terms,privacy,payroll-data,risk}
    sitemap.ts           XML sitemap generator (static export)
    sitemap/             Human-readable sitemap page (grouped index)
    opengraph-image.tsx  1200x630 OG card via next/og

functions/
  api/
    contact.ts           Cloudflare Pages Function — POST /api/contact
                         → Resend email delivery
                         → Turnstile verify
                         → KV-based per-IP rate limit
  tsconfig.json          Separate TS config for the Pages function

scripts/
  optimize-images.mjs    Re-runnable: resizes + re-encodes screenshots
                         with mozjpeg + emits WebP variants

PROMPT.md                Design brief (v9). Source of truth for positioning.
AUDIT.md                 Rebuild audit trail (what was on the machine).
DESIGN.md                Design system tokens and rationale.
```

## Local development

```bash
npm install
npm run dev             # dev server on :3100
```

Environment variables you can set locally to exercise the full stack:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<from Cloudflare Turnstile dashboard>
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=doyel-labs.com
NEXT_PUBLIC_API_BASE=https://bai-control-plane-staging.fly.dev
```

Other useful commands:

```bash
npm run typecheck       # strict TypeScript check
npm run lint            # ESLint + jsx-a11y
npm run build           # static export to out/
npm run test:analytics  # after build: synthetic signed JWT/provider/artifact tests
npm run test:analytics:runtime # after build: native workerd regressions only
npm run test:analytics:ui # after build: Chromium UI + real local Pages routing
node scripts/optimize-images.mjs    # re-encode screenshots
```

## Deploying to Cloudflare Pages

**Repo:** [github.com/Doyel-Labs-LLC/doyel-labs-com](https://github.com/Doyel-Labs-LLC/doyel-labs-com)
· default branch `master` · project name `website` on the Cloudflare side.

The site is a **classic Cloudflare Pages** project (not Workers with Static
Assets), **connected to this GitHub repo** — Cloudflare builds and deploys
on every push. There is intentionally **no `wrangler.toml`** in the repo —
its presence would enroll the project in the Workers-with-Assets flow and
override the automatic upload of the `out/` directory.

### How deploys happen (Git-connected)

- **Push to `master` → production** at `doyel-labs.com`. Merging a PR is a
  push to `master`, so merging *is* deploying.
- **Push to any other branch → a preview deploy** at
  `https://<hash>.website-8xx.pages.dev`. Open a PR and use its preview URL
  to check a change before it goes live.

Watch a build from the terminal:

```bash
npx wrangler pages deployment list --project-name=website
```

### Build configuration (must match — do not drift)

Set under **Cloudflare → Pages → website → Settings → Builds & deployments**.
These exact values are what make the build work:

| Setting | Value | Notes |
|---|---|---|
| Production branch | `master` | |
| Build command | `npm ci && npm run build` | |
| Build output directory | `out` | matches `output: 'export'` |
| **Root directory** | **_(empty)_** | the app is at the **repo root**, not a subfolder |

> ⚠️ **Root directory must be blank.** It was once set to `website` (a
> leftover from the old `BAI-Desk/website` layout). This repo has no
> `website/` folder, so every build died at `Cannot find cwd:
> /opt/buildhome/repo/website` — silently, which left production stuck on an
> old commit while pushes appeared to "succeed" in Git. If builds start
> failing at the clone stage with a `Cannot find cwd` error, check this
> field first.

### Manual upload (discouraged fallback only)

Because the project is Git-connected, prefer the push/merge flow above.
A direct upload creates a deployment outside the Git history and Cloudflare
warns against mixing the two on one project. Only if Git builds are down:

```bash
npm run build
npx wrangler pages deploy out --project-name=website --branch=master
```

### Required Pages secrets

Set these in the Cloudflare Pages project settings (Settings → Environment variables):

| Name | Kind | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Encrypted | Sends contact-form emails via Resend. Sending-access scope only. |
| `RESEND_FROM` | Plain | e.g. `Doyel Labs Website <noreply@doyel-labs.com>` |
| `CONTACT_TO` | Plain | Destination inbox, default `support@doyel-labs.com` |
| `TURNSTILE_SECRET_KEY` | Encrypted | Cloudflare Turnstile server-side verify secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Plain | Turnstile client widget key (build-time) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plain | `doyel-labs.com` — legacy Plausible configuration |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Plain | Build selector: `none`, `plausible`, or `cloudflare`; unset preserves the legacy default |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | Plain | Public beacon `site_token`, required only for Cloudflare collection |

Also required: a **KV binding** named `CONTACT_KV` bound to a KV namespace,
used to rate-limit contact submissions by IP (5 messages per 5 minutes).

## Owner analytics and coordinated collector rollout

The private dashboard is a read-only, owner-only Pages Functions feature,
not a new Worker application or Next server. There is no public admin link.
The default preserves existing Plausible collection when its domain is
configured; otherwise no collector runs. Merely deploying this feature
does not select Cloudflare, provision a site, or activate dashboard reads.
No subscription change, raw-IP collection, or automatic injection is included.

`src/lib/analytics-config.ts` selects exactly one collector at build time.
It also selects the analytics section in `content/legal/privacy.md`, the
current provider named on Uses/Security, and the generated public CSP.
Cloudflare mode requires a valid public beacon token and fails the build
if it is absent or malformed; it never silently falls back to Plausible.
Unused legacy Plausible configuration does not cause dual injection.
`none` removes both analytics CSP hosts and renders the inactive policy.
The post-export step loads the same Next environment files as the build.

Collector scripts render only after checking the actual browser origin:
`https://doyel-labs.com`, public paths only. Local, default Pages, preview,
`www`, alternate-port, admin and API paths are excluded. Cloudflare's
manual module beacon handles public SPA navigation itself; no custom
pageview calls or `spa:false` override are added. Removing a script cannot
remove its installed SPA listeners, so authenticated admin RSC/text
requests redirect to the HTML dashboard. Next then performs a full
document navigation before entering admin. The new document has no
collector and a separate self-only CSP. Use full navigation to enter/leave
the private dashboard; there is deliberately no public admin link.

`functions/_middleware.ts` gates the private routes with `jose` RS256
verification against the configured Access team's JWKS, exact issuer and
audience, expiry/not-before/issued-at, a maximum token age of 30 minutes,
and the exact approved human email. Service tokens are rejected. Only
`https://doyel-labs.com` is accepted; default Pages, preview, `www`, HTTP,
and alternate-port hosts are denied even for a valid owner token.
Authentication still runs while analytics is disabled.

`public/_routes.json` invokes Functions only for `/admin*`, `/api/admin*`,
and `/api/contact*`, including bare parents, slash variants, and admin
HTML/RSC/text documents. Ordinary public pages/assets bypass this middleware.
`npm run build` first exports Next, then `scripts/package-admin.mjs` embeds
the generic admin documents in an ignored server-only module and removes
`out/admin`. They are served only after authentication, with no-store,
noindex, no-referrer, and a self-only CSP with hashes for Next's inline
scripts. RSC/text artifacts redirect only after authentication. Thus no
public static copy remains if Functions are bypassed.
Do not replace the build command with bare `next build`, upload `.next`,
or publish the generated server module as a static asset. Public JS/CSS
chunks contain generic UI only. No metrics are embedded at build time.

### Runtime configuration

Keep these bindings in **Production only**, not Preview. The first five
were manually prepared by the owner; their deployed operation still needs
verification. No backend credentials belong in `NEXT_PUBLIC_*`, git,
screenshots, logs, or chat. The public beacon token above is intentionally
browser-visible and is not an API credential.

| Binding | Value / role |
|---|---|
| `CF_ACCESS_TEAM_DOMAIN` | `aged-frog-7595.cloudflareaccess.com` (no scheme/path) |
| `CF_ACCESS_AUD` | `0f4387aa5fe2fe1f66878253225d6432a5d98bc79616f0c4dc136d4bf0c7517c` |
| `ANALYTICS_ALLOWED_EMAIL` | `blake@doyel-labs.com`, exact human identity |
| `CF_ACCOUNT_ID` | `82601db094101e2165e5a4bb07cbb436`, server-pinned account |
| `CF_ANALYTICS_API_TOKEN` | Encrypted secret; Account Analytics Read only |
| `CF_WEB_ANALYTICS_SITE_TAG` | **Not configured yet.** This website's `site_tag`, not its beacon `site_token`, zone ID, or account ID |
| `ANALYTICS_ENABLED` | Absent or `false` by default. Only exact `true` enables provider reads; it does not enable visitor collection |
| `CONTACT_KV` | Reuse the existing binding; required for enabled queries |

The API accepts only `GET /api/admin/analytics/?period=24h|7d|30d`.
Account, site and canonical request hostname are server-pinned; callers
cannot supply GraphQL, identifiers, arbitrary dates, or dimensions.
UTC presets include the current partial hour/day. `24h` uses the current
hour and previous 23 hours; longer presets use 7 or 30 calendar days.

Enabled requests first apply a best-effort owner throttle (6/minute)
using the existing KV binding, then a small fixed schema-contract
introspection and one bounded RUM aggregate query. KV stores only an
`analytics:owner:<minute>` counter with a 120-second TTL: no IPs, emails,
metrics, request logs, or visitor records. KV is eventually consistent;
this is **not a strict global/concurrent quota**. Read/write failure denies
the query. UI refreshes are manual with a 10-second cooldown.

The connector has an 8-second total provider deadline, a 256 KiB maximum
per upstream response, eight aggregate groups, at most 32 trend buckets
and 21 source rows per breakdown, and 10 displayed rows per breakdown.
JWKS fetching is separately bounded to 5 seconds and 32 KiB. No metric
cache, browser persistence, raw logs, retries, or alternate-dataset
fallbacks are used. Known provider failures are sanitized to explicit
states; missing data/configuration is never converted to zero activity.
Only the known-empty provider response has an empty state.

Server JWKS and GraphQL requests use `redirect: "manual"` and reject every
non-OK response, including redirects; never follow a provider `Location`
with the bearer credential. Native workerd rejects `redirect: "error"`
before sending a request at the Production/Preview compatibility date
`2026-09-07` with no flags, even though the Request reference lists it.
The browser dashboard's `redirect: "error"` remains intentional and unchanged.

Paths are normalized against the published page list generated during
build; unknown/private paths become `Other paths`. Query strings and
fragments are removed. Referrals show validated hostnames only (not IP
addresses or paths); browsers/OS/devices use broad allowlists. All labels
are React text, never HTML or clickable upstream URLs. Top normalized
groups can be partial. Sampled counts remain the provider's scaled
estimates; they are not multiplied again. Missing trend buckets are not
filled with zeros. Visits are arrivals from a different site or a direct
link, **not unique people**. Reading time, session duration, raw IPs,
session replay, fingerprints, form capture, and contact/browsing linkage
are not implemented. Performance metrics are deferred.

### Schema evidence and remaining launch gates

Authenticated, schema-only GraphQL introspection on 2026-09-22 verified
the required RUM types, dimensions, metrics, filters and order enums.
The root type is lowercase `account`. The corrected production contract
query passed against that schema (196,884 response bytes, under 256 KiB).
`tests/analytics/schema-observed.json` retains only required type metadata,
not credentials, visitor data, or account-specific records. Fault-injection
and report fixtures remain synthetic. This evidence does **not** prove
the stored Production token can query this dataset or that collection works.

Runtime introspection still verifies the contract before every fixed data
query. An unsupported contract returns `schema_unavailable`; it does not
try another dataset or widen site filters. Actual token permissions,
dataset availability, retention/query limits, and site data need a
controlled Production check.
Cloudflare Web Analytics GraphQL is not categorically unavailable on Free.

Before an authorized launch:

1. Review and validate both provider builds. Branch pushes deploy previews;
   production requires a separately coordinated merge/deployment.
2. Recheck Access on **both** `doyel-labs.com/admin` and
   `doyel-labs.com/api/admin`, including children/artifacts. Keep only the
   exact owner Allow policy, 30-minute sessions, OTP login and independent
   MFA on this app. The no-MFA enrollment policy belongs only to App
   Launcher. Test owner, signed-out, wrong-user, expired, forged and
   service-token cases; do not share JWTs/cookies/recovery material.
3. Keep Pages quota behavior **Fail closed** in both Production and Preview.
   On 2026-09-22 the coordinating operator set and read back `fail_open:false`
   for both environments while preserving other environment/build settings
   and the canonical deployment. Do not buy Workers Standard for this feature.
   Still test default/preview hosts and signed-out production paths after
   deployment; configuration evidence is not a quota-exhaustion test.
4. Inspect existing injection settings first. **Do not use dashboard Add a
   site or Pages Metrics Enable**: a proxied site's dashboard setup enables
   injection immediately by default, and Pages Metrics Enable injects on
   the next deployment. Register the exact site's verified zone through
   `POST /accounts/{account_id}/rum/site_info` with `zone_tag` and explicit
   `auto_install:false`, then read back that disabled state. Site creation
   requires Account Settings Write; site listing requires Account Settings
   Read. Use a separate, short-lived setup credential securely, never the
   Production analytics secret or a token pasted into chat. Do not broaden
   the Account Analytics Read token. Verify expiry/rotation separately.
5. Keep Pages/zone/Observatory automatic injection off. Record `site_tag`
   for the backend and the distinct public `site_token` for the manual
   collector. Set `CF_WEB_ANALYTICS_SITE_TAG` in Production. Publish the
   prepared code initially with Plausible preserved. Under an authorized
   check set `ANALYTICS_ENABLED=true` for reads only; the owner signs in
   normally with Access/MFA and uses `/admin/analytics/`. No copying JWTs,
   cookies, or API secrets is needed. Verify all three date presets against
   the stored Production secret. An empty response proves only a working
   query, not ingestion. Do not add a public diagnostic/proxy endpoint.
6. Once those gates pass, set Production build variables
   `NEXT_PUBLIC_ANALYTICS_PROVIDER=cloudflare` and
   `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=<this-site-public-beacon-token>`.
   Rebuild/deploy through the coordinated Git-connected workflow. The
   collector, CSP and rendered policy switch together; retain the legacy
   domain only for rollback or remove it later. Existing open tabs retain
   their original document until reloaded, but no document installs both
   providers. Preview hosts must remain collector-free regardless of build
   settings. Recheck public pages, Contact, private routes and CSP.
7. Make a small controlled public visit after activation, then compare
   the same UTC period/site/host with Cloudflare Web Analytics. Allow for
   ingestion delay and sampling; page views/visits are not exact people.
   Check empty/sampled results and hostname/site isolation. Do not claim
   production readiness until the actual site/token/data checks succeed.

Rollback: disable provider reads by setting `ANALYTICS_ENABLED=false`
through the approved deployment process; keep Access and the private-route
guards. If collection was later enabled, disabling this read flag does
**not** disable collection. Select `NEXT_PUBLIC_ANALYTICS_PROVIDER=none`
and rebuild to stop this manual collector, or select `plausible` with its
legacy domain to restore that provider and matching privacy/CSP in one
deployment. Keep all automatic injection disabled. Do not remove Access
to troubleshoot the dashboard.

### Local verification

Use Node 22+ (Node 24 used during development). Run `npm ci`, then build
before Functions typechecking/tests; the server-only admin document module
is generated by the build. Keep the same provider environment for each
build/test pair. To exercise legacy mode:

```powershell
$env:NEXT_PUBLIC_PLAUSIBLE_DOMAIN='doyel-labs.com'
$env:NEXT_PUBLIC_ANALYTICS_PROVIDER='plausible'
npm run build
npm run typecheck
npm run lint
npm run test:analytics
npm run test:analytics:ui
git -c core.whitespace=cr-at-eol diff --check
```

Repeat with `NEXT_PUBLIC_ANALYTICS_PROVIDER=cloudflare` and the synthetic
`NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
then with provider `none`. Never use actual account credentials in tests.
The Cloudflare browser test downloads the current public beacon JavaScript,
executes it against locally intercepted pages with a synthetic token, and
intercepts **all** browser traffic, including every ingestion request.
It observes the actual vendor's SPA behavior without recording test visits.
Plausible loading uses a synthetic script; no provider receives test events.

Playwright uses local ports 3191 (generic UI harness with intercepted
synthetic API responses) and 3192 (real Wrangler Pages routing).
Install Chromium with `npx playwright install chromium` only if missing.
The test harness is not deployed and is not an authentication bypass in
production code. The normal Pages runtime rejects localhost by design.
Browser tests block external browser requests and exercise desktop/mobile reflow,
keyboard controls, loading/empty/error states, no local/session storage,
admin/preview tracker exclusion, public SPA behavior, full-document admin
entry, selected privacy/CSP, and public navigation preservation.
The contact runtime test sends only invalid JSON and cannot send mail.

`test:analytics` also runs the native Miniflare/workerd suite, or run it
alone with `npm run test:analytics:runtime`. Build first. It bundles the
real server handler and `jose`, uses synthetic signed human identities and
local KV, and intercepts all outbound requests outside the Worker without
replacing native `fetch`. At compatibility `2026-09-07`, flags `[]`, it
reproduces the original identity 503 before any outbound call, verifies
successful JWKS/schema/report requests, and rejects same/cross-origin
JWKS and provider redirects without following them or forwarding credentials.
No provider, visitor, contact, or ingestion traffic leaves this harness.
This local success is not verification of the stored Production token;
hosted previews still deny all admin requests at the canonical-host gate.

Official references (reviewed 2026-09-22):
[Access JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/),
[human versus service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/),
[Pages routes and quota fail-closed](https://developers.cloudflare.com/pages/functions/routing/),
[Web Analytics setup/injection](https://developers.cloudflare.com/web-analytics/get-started/),
[metrics](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/),
[dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/),
[sampling](https://developers.cloudflare.com/web-analytics/faq/#is-the-data-sampled),
[schema discovery](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/),
[RUM dataset](https://developers.cloudflare.com/data-localization/metadata-boundary/graphql-datasets/),
[site identifiers and permissions](https://developers.cloudflare.com/api/resources/rum/subresources/site_info/methods/list/),
[disabled-injection site creation](https://developers.cloudflare.com/api/resources/rum/subresources/site_info/methods/create/),
[automatic SPA handling](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/),
[manual beacon CSP](https://developers.cloudflare.com/web-analytics/faq/#how-can-i-use-web-analytics-with-a-content-security-policy-csp),
[RUM privacy](https://developers.cloudflare.com/speed/observatory/rum-beacon/#privacy-information),
[KV consistency](https://developers.cloudflare.com/kv/api/write-key-value-pairs/#concurrent-writes-to-the-same-key).

## Adding a changelog entry (post-v22 pattern)

Since v22 the changelog is a single source of truth. Do NOT edit
`src/app/changelog/page.tsx` or `src/app/changelog/rss.xml/route.ts`
directly — they both read from `src/lib/changelog.ts`.

Prepend a new object to the `entries` array in `src/lib/changelog.ts`:

```ts
{
  id: "v27-your-change-slug",
  version: "v27",           // optional, one per ship
  date: "2026-09-21",       // YYYY-MM-DD
  section: "Company",       // one of: Company, Design, Performance,
                            // Accessibility, SEO, Writing, Bugfix,
                            // Payroll, BAI, ConnectionLoop
  title: "One-line summary",
  body: "One paragraph of what actually changed and why.",
},
```

On next build:
- The `/changelog/` page renders it in the timeline
- The RSS feed at `/changelog/rss.xml` includes it
- The feed stays available from All pages; it is not a homepage section

## Adding a testimonial

Testimonials require **written permission from the quoted party**. Never
add anonymous or fabricated copy.

Edit `src/lib/testimonials.ts` — add a `Testimonial` object to the
`testimonials` array, newest first. Fields: `id`, `attribution`, `role`,
`company`, `companyUrl`, `logo`, `short`, `full`, `scope`, `date`, `verify`.

Render an approved testimonial explicitly where it supports a real case
study. The current statement appears on Work. SteadFast and Doyel Labs
share an owner; the shared Quote component discloses that relationship.
Do not present a related-business endorsement as independent validation.

## Adding a blog post

1. Prepend a new `Post` entry to the `posts` array in `src/lib/writing.ts`
   with slug, title, excerpt, date, readingTime, tags.
2. Create `src/app/writing/<slug>/page.tsx` — copy an existing post
   (`ai-native-software-what-we-write-what-we-generate/page.tsx` is a
   good template) and rewrite. Include:
   - `<script type="application/ld+json">` with `BlogPosting` schema
   - Breadcrumbs
   - Standard hero with date + reading time + tag row
   - Body inside `<article>`, using local `Section` / `P` / `Callout`
     helpers per post so styling can drift per piece if needed
3. Add the path to `src/app/sitemap.ts` and to `src/app/sitemap/page.tsx`
   (human sitemap).

## Adding a legal page

1. Add `content/legal/<slug>.md` with frontmatter:

   ```
   ---
   kind: <kind>
   version: YYYY-MM-DD
   title: <Human title>
   under_review: true
   ---

   # Human title

   Body markdown here — no inline "DRAFT FOR COUNSEL" banners.
   The LegalPage shell renders a proper Notice when
   `under_review: true`.
   ```

2. Add a route file under `src/app/legal/<slug>/page.tsx`:

   ```tsx
   import { LegalPage } from "@/components/legal-page";
   import { loadLegal } from "@/lib/legal";
   export const metadata = { title: "<Human title>" };
   export default function() {
     return <LegalPage doc={loadLegal("<slug>")} />;
   }
   ```

3. Add the slug to the `NAV` array in `src/components/legal-page.tsx`.
4. Add the URL to `src/app/sitemap.ts` and to the "Legal" section of
   `src/app/sitemap/page.tsx`.
5. Keep `under_review: true` until counsel signs.

## Adding a redacted screenshot

The site does not need screenshots to run — most product screens are
drawn from `src/components/frames/*` with synthetic data. If you want to
add a real screen capture:

1. **Capture** outside git (`C:\Users\bdoye\Desktop\...`), not in the repo.
2. **Redact** before you save:
   - Legal names → `OPERATOR 04`, `J. REED`, `MEMBER 02`
   - SSN, EIN, routing, account numbers, tokens → `•••-••-••••`
   - Dollar amounts → round demo figures, consistently
   - Chat, emails, phone numbers
   - Never commit a raw capture
3. **Optimize.** Save at max 1600px wide. Run
   `node scripts/optimize-images.mjs` to re-encode with mozjpeg and emit
   a WebP variant. This drops file size ~65% at the same visible quality.
4. **File** under `public/media/<product>/<screen>-v2.jpg` (the `-v2`
   suffix invalidates any CDN cache on the old URL).
5. **Use.** Reference from a `next/image` element with explicit
   `width` and `height`.
6. **Verify** the exported image: if any redaction is partly readable,
   reject it.

## Contact form architecture

`functions/api/contact.ts` is a Cloudflare Pages Function that runs at the
edge on every `POST /api/contact` request. Flow:

1. The single `<ContactPageForm>` on `/contact/`
   POSTs JSON with `name`, `email`, `projectType`, `subject`, `message`,
   optional `preferredTimes`, and a Cloudflare Turnstile token. Only email
   and message are required in the UI; subject is sent empty. Optional
   `projectType` query values preselect an allowlisted topic. Turnstile is
   reset after each request because tokens are single-use.
2. Function validates the payload, silently 200s on honeypot, verifies
   Turnstile server-side, and checks a per-IP rate limit against
   `CONTACT_KV` (5 msgs / 5 min).
3. Composes an HTML + plain-text email via Resend, from
   `noreply@doyel-labs.com`, to `support@doyel-labs.com` (routes via
   Google Workspace to the company inbox).
4. Returns `{ ok: true }` on success or a JSON error. The form preserves
   input on failure and provides email/phone alternatives. Product
   inquiries are not waitlist subscriptions or automatic call bookings.

## Navigation and route consolidation

The primary navigation is Services, Work, Products, About, and a
Start a conversation action. About keeps `/company/`. Home has four
sections, with project evidence in its hero; deeper resources are reachable through contextual links and
All pages (`/sitemap/`).

Exact permanent redirects consolidate `/pricing/` into
`/services/#pricing`, `/how-we-work/` into `/services/#process`,
`/founder/` into `/company/`, and `/industries/` into
`/services/#industries`. Both slash forms are covered. The federal
service contractors page is retained; never add an industry wildcard
that captures it. Cloudflare applies these rules; `next dev` does not.

Pricing is **Quoted per project**, including metadata and public feeds.
Historical public ranges are withdrawn, not moved to another page.

Keep public copy concise: one short hero sentence, no duplicate project
or product introductions, and optional walkthroughs on detail pages.
About and structured data represent the company, not a personal profile.
The legacy `/company/#founder` anchor still reaches the company introduction.

The email template is designed — full HTML with the four-square logo,
category chip, From/Subject grid, cyan-bordered "Suggested orientation
times" block (if the field was populated), and a Reply CTA button.

## Static export gotchas

- **No API routes.** We're on `output: 'export'`. All server-side
  behaviour lives in Cloudflare Pages Functions, separate from Next.js
  (`functions/api/contact.ts` and the private admin middleware).
- **No dynamic image optimization.** `next/image` serves the source
  file. Optimize offline via `scripts/optimize-images.mjs`.
- **No `<Link>` prefetching over the network** — Next.js still prefetches
  RSC data but you'll see them in DevTools as `.txt?_rsc=...` requests,
  not HTML.

## Design tokens

Full palette + typography in `PROMPT.md` under the "Design" section and
in `tailwind.config.ts`. Highlights:

- Canvas: `#0a0f14` (softened black, not `#000`)
- Ink: `#f0f0fa` (spectral off-white)
- Accent: `#10c7eb` (from the bottom-right cyan square of the icon)
- Never a second accent color

## Non-negotiables

Do not change without an explicit ask:

- No founder profile, photos, signature card, or personal engineer title
- No advertising scripts or session replay; one explicitly selected aggregate analytics provider
- No fake testimonials, fake logos, fake case studies
- No public service price ranges, retainer amounts, or sample quotes,
  including structured data and RSS. Labeled demo payroll amounts remain.
- No "small team" / "two-person" / any headcount language
- No "we specialize in X" — always broad, always any industry

If any of these need to change, first update `PROMPT.md`, then the code.
