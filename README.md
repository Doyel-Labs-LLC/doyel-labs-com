# doyel-labs.com

Company website for **Doyel Labs LLC** (Casper, Wyoming). Static export,
deployed on Cloudflare Pages with a serverless contact-form function.

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 3, cyan accent (`#10c7eb`) on a softened
  near-black canvas
- **Rendering:** `output: 'export'` — static HTML, no server runtime
- **Deploy:** Cloudflare Pages, `master` branch = production
- **Contact form:** Cloudflare Pages Function → Resend → Google Workspace
- **Analytics:** Plausible only. Cookieless. No session replay.

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
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plain | `doyel-labs.com` — enables analytics |

Also required: a **KV binding** named `CONTACT_KV` bound to a KV namespace,
used to rate-limit contact submissions by IP (5 messages per 5 minutes).

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
  behaviour lives in `functions/api/contact.ts` (Cloudflare Pages
  Functions, separate from Next.js).
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
- No third-party marketing scripts (Plausible only)
- No fake testimonials, fake logos, fake case studies
- No public service price ranges, retainer amounts, or sample quotes,
  including structured data and RSS. Labeled demo payroll amounts remain.
- No "small team" / "two-person" / any headcount language
- No "we specialize in X" — always broad, always any industry

If any of these need to change, first update `PROMPT.md`, then the code.
