# doyel-labs.com

Company site for Doyel Labs LLC (Casper, Wyoming). Static export, deployed on
Cloudflare Pages against the Cloudflare-managed `doyel-labs.com` domain.

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling:** Tailwind 3.
- **Rendering:** `output: 'export'` — static HTML. No server runtime.
- **Deploy target:** Cloudflare Pages. Custom headers in `public/_headers`.
  Legacy URL redirects in `public/_redirects`.

## Repo layout

```
public/
  _headers               Cloudflare Pages custom response headers (CSP, HSTS)
  _redirects             Cloudflare Pages redirect table
  robots.txt
  .well-known/security.txt
  media/
    payroll/             .webp derivatives, redacted
    websites/            .webp derivatives
    bai/                 .webp derivatives, redacted
    connectionloop/      .webp derivatives, redacted

content/
  legal/                 .md drafts (under counsel review)
    terms.md
    privacy.md
    payroll-data.md
    risk.md

src/
  lib/
    site.ts              Company facts and disclaimers
    legal.ts             Loads content/legal/*.md
    demo/                Synthetic demo data for product frames
  components/
    chrome.tsx           Header, Footer, Page, Eyebrow, H1, H2, Lead, Card, GhostLink
    product-frame.tsx    The dark hairline box that holds a product screen
    frames/              One file per synthetic screen
    legal-page.tsx       Shared shell for /legal/*
  app/
    layout.tsx           Root metadata (title template "%s · Doyel Labs")
    globals.css          Tokens + prose-legal
    page.tsx             /
    services/            /services and /services/{payroll,websites}
    programs/            /programs and /programs/{bai,connectionloop}
    engineering/
    security/
    docs/  changelog/  status/  support/  company/  contact/
    legal/               /legal/{terms,privacy,payroll-data,risk}
    sitemap.ts

AUDIT.md                 What was on this machine when the site was rebuilt
DESIGN.md                Design system tokens and rationale
CONTENT.md               Copy → source-of-truth map, voice rules
```

## Local development

```bash
npm install
npm run dev
```

The dev server binds `:3100`.

```bash
npm run typecheck       # strict TypeScript check, no emit
npm run lint            # ESLint (next/core-web-vitals + jsx-a11y)
npm run build           # static export to out/
```

## Deploying to Cloudflare Pages

1. Push the repo to Git (see AUDIT.md — no remote is set at initial commit).
2. In Cloudflare Pages, add the project pointing at the repo.
3. Build command: `npm ci && npm run build`. Build output directory: `out`.
4. Environment: `NEXT_PUBLIC_API_BASE` (optional, defaults to the staging
   control plane).
5. Point the custom domain `doyel-labs.com` at the Pages project. `_headers`
   and `_redirects` are read automatically from the `out/` folder.

## Adding a changelog entry

Edit `src/app/changelog/page.tsx`. Add a `{ date, text }` entry to the top of
the relevant array (`COMPANY`, `PAYROLL`, `WEBSITES`, `BAI`, `CL`). Dates are
`YYYY-MM-DD`. Say what changed and why in one sentence; no marketing verbs.

## Adding a redacted screenshot

The site does not need screenshots to run — all product screens are drawn
from `src/components/frames/*` with synthetic data. If you later want to add
a real screen capture:

1. **Capture.** Take the screenshot outside git (`C:\Users\bdoye\Desktop\...`),
   not inside this repo.
2. **Redact.** Cover before you save:
   - Legal names of contractors, staff, or family members → `OPERATOR 04`,
     `J. REED`, `MEMBER 02`, etc.
   - SSN, EIN, bank routing, account numbers, broker account ids, API keys,
     tokens → `•••-••-••••` or a redaction bar.
   - Dollar amounts and positions → replace with a round demo figure
     (`$0.00` or `$1,240.00`), consistently.
   - Chat transcripts and order tickets that identify a person.
   - Faces, emails, phone numbers.
   - Never commit a raw capture.
3. **Convert.** Save as WebP, 1600px wide (or the actual screen width).
   Never SVG (leaks structure) and never PNG (over-quality for this).
4. **File.** Drop under `public/media/<product>/<screen>.webp`.
5. **Use.** Swap the demo frame for `next/image` on the page. Keep the
   corner label `DEMO · REDACTED` or `INTERNAL PREVIEW · REDACTED`.
6. **Verify.** Zoom the exported image; if any redaction is even partly
   readable, reject it.

## Adding a legal page

1. Add `content/legal/<slug>.md` with frontmatter:

   ```
   ---
   kind: <kind>
   version: YYYY-MM-DD
   title: <Human title>
   under_review: true
   ---
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

4. Keep `under_review: true` until counsel signs.
