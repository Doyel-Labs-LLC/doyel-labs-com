# doyel-labs.com — the design brief, v4

The reference the site is written against. If a page contradicts this
document, the page is wrong. Change this file first, then the page.

## Who Doyel Labs is

Doyel Labs LLC is a **software company** based in Casper, Wyoming,
formed **September 2026**. We build with AI as our primary tool, so we
can ship complex software fast. Every diff is reviewed by a person and
every ship is a human call.

**We are not narrowed.** Payroll and websites are the work we've shipped
first. They are not the totality of what Doyel Labs builds. The right
answer to "can you build X?" is almost always "yes — tell us more."

**We are not defined by size.** The site never says "small team,"
"two-person," "solo," or any headcount language. Customers hire us for
what we produce, not for how many chairs are in the office.

**We do not narrow the products with claims of what we cannot add.**
Any "we do not do X" language on the site describes the current build of
that specific product (SteadFast Payroll v1 does not compute federal
withholding), never a capability limit of the company. Company-level
pages never limit themselves.

## Who we serve

Anyone with a real operation and a real budget. Federal service
contractors, small operators, mid-market companies, other studios
who need a subcontractor. We turn down work only when we cannot ship
it well or when the request would ask us to be something we're not
(broker-dealer, tax filer, healthcare custodian).

## Voice

Short sentences. Concrete nouns. One idea per sentence.

- Say what the software *does*. Then say who it's for.
- If we've built it before, name the client (SteadFast Transportation
  is currently our only named client).
- If we haven't built it before, say "we can build that" — never "we
  specialize in" (it narrows).
- Never write "AI-powered X" as an adjective. If AI matters in a
  sentence, say the specific thing it does.
- Refused words: revolutionize, next-gen, unlock, transform, seamless,
  cutting-edge, world-class, best-in-class, mission-critical.
- Refused framings: "two things we sell," "we only do X," "small
  team," "one of a kind," "leading."
- Keep engineering language ("fail closed," "signed updates") to the
  BAI program page and `/security` — it is not the company's voice.
- Every page should be readable by someone who is not a software
  engineer.

## Design

**Palette.** Softened dark canvas with cyan accent from the four-square
icon. One accent color, used everywhere.

| Token       | Value                             |
| ----------- | --------------------------------- |
| `bg`        | `#0a0f14`                         |
| `surface`   | `#12181f`                         |
| `surface2`  | `#171e26`                         |
| `ink`       | `#f0f0fa`                         |
| `mute`      | `rgba(240,240,250,0.66)`          |
| `muted`     | `rgba(240,240,250,0.44)`          |
| `line`      | `rgba(240,240,250,0.10)`          |
| `line2`     | `rgba(240,240,250,0.22)`          |
| **`accent`** | `#10c7eb`                         |
| `accentHi`  | `#4edcfb`                         |
| `accentDim` | `rgba(16,199,235,0.32)`           |
| `accentSoft`| `rgba(16,199,235,0.10)`           |
| `rise`      | `#4ed4a2`                         |
| `fall`      | `#ff7b8a`                         |
| `care`      | `#f5c15a`                         |

**Typography.** Inter with system fallbacks. Display and nav uppercase
with generous tracking. Body sentence case, 16px+, line-height 1.65.

**Icon.** Four rounded squares — dark gray, mid gray, light gray, cyan.
No shadow, no background. Used as the header wordmark preface, favicon,
and hero on `/company/`.

## Navigation

- **SERVICES** — what we build (broad capabilities + past work).
- **WORK** — a portfolio band: SteadFast site, SteadFast Payroll,
  BAI (internal), ConnectionLoop (internal).
- **COMPANY** — who we are, how we work.
- **CONTACT** — pill button that opens a modal with a real form.

Not in the top nav (still accessible via footer + inline references):
Programs, Engineering, Security, Docs, Support, Changelog, Status,
Legal.

## Page structure

### Home
1. Hero — one line what we build, one line how.
2. What we build — 6-9 capability cards.
3. Selected work — real screenshot + case tile.
4. How we work — 4 rules.
5. Ongoing partnership — retainer band.
6. Contact CTA.

### Services
1. Hero.
2. Capabilities — 9+ cards covering full range.
3. Past work — case studies (SteadFast site, SteadFast Payroll).
4. Ongoing partnership — retainer.
5. How an engagement works — 4 steps.
6. Pricing philosophy — "priced per project."
7. Contact CTA.

### Work
1. Hero.
2. Case: SteadFast website (with real screenshot).
3. Case: SteadFast Payroll (with product frame).
4. Internal programs — brief.
5. Contact CTA.

### Company
1. Hero — LLC, city, founded date, logo mark.
2. How we work — AI-as-tool.
3. Facts — entity, location, contact.
4. Contact CTA.

### Contact
1. Hero.
2. Real form (inline) + direct contact sidebar.
3. Related pages links.

### Programs (BAI, ConnectionLoop)
Program pages use the v3 voice — sentence-case body, no
"aerospace-lab" language, no "fail-closed" without context. Explain
what the program is, who it's for, and where it stands. Program-specific
disclaimers stay in the page footer.

## Content principles

### Trust signals (never fake)
- **Named clients only.** Never invent a case study, testimonial, or
  logo. Currently only SteadFast Transportation is named.
- **Named quotes only.** No anonymous "one client told us" copy. If
  we can quote a person, we name the person and their title with their
  written permission.
- **Logos only from live sites.** Do not show a client's logo on the
  Doyel Labs site until they confirm they're happy with it in writing.
- **Screenshots only from real work.** Product frames use synthetic
  demo data, labeled `DEMO · SYNTHETIC DATA`. Real screenshots (like
  SteadFast website home) are labeled with the live URL.

### Pricing (public)
- **No fixed rate card.** "Priced per project. Contact for quote."
- **Founding-year discount language** stays until 2026-12-31, then is
  removed.
- **Retainer bracket:** "priced per month based on load," no number.
- **Internal pricing floors and ceilings** live only in
  `Doyel-labs-business-model.md` on the Desktop — never on the site.

### Contact form
- Real form, `POST /api/contact` → Cloudflare Pages Function → Resend
  → `support@doyel-labs.com`.
- Env vars: `RESEND_API_KEY` (secret), `RESEND_FROM` (plaintext).
- Graceful fallback to email + phone if the endpoint fails.
- Optional Cloudflare Turnstile for CAPTCHA (needs `NEXT_PUBLIC_TURNSTILE_SITE_KEY`).
- Optional rate limiting via Cloudflare Workers KV (not yet wired up).

## Security posture

Kept strict:

- CSP: `default-src 'self'; script-src 'self' https://plausible.io;
  frame-ancestors 'none'; upgrade-insecure-requests` and friends.
- HSTS with preload, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`.
- No third-party marketing scripts, no session replay, no ad networks,
  no Google Analytics, no Meta Pixel.
- Plausible-only for analytics, cookieless, no personal data.
- Server-side: RESEND_API_KEY is a secret, never a plaintext var.
- Every dependency in `package.json` is pinned to a caret range; a
  `npm audit --production` should return zero highs before deploy.

## Accessibility, performance, SEO

- WCAG AA contrast on every band. Focus rings visible. Keyboard nav
  reachable. Semantic headings, one H1 per page.
- LCP < 2.0s on mobile. No render-blocking third-party scripts.
- Sitemap includes every published route. `robots.txt` allows all.
- Every page: unique `<title>` template `%s · Doyel Labs`, unique
  `<meta description>`.
- `application/ld+json` Organization schema in the root layout.
- Open Graph title + description on every page. OG image published at
  `/opengraph-image.png` (or generated by `opengraph-image.tsx`).
- `canonical` = `https://doyel-labs.com/<path>/`. Trailing slash matches
  Next.js `trailingSlash: true`.

## Content refresh cadence

- **Home + Services + Work + Company:** review every 90 days. Update
  any stale claim.
- **Legal MDX:** update the `version` field in frontmatter on any
  material change. Get attorney sign-off before removing "under
  review."
- **Changelog:** entry per commit that changed something a user could
  notice. Never marketing-flavored.
- **Case studies:** as new clients ship, add a section under `/work/`
  with client name (with permission), one paragraph of context, and
  one product frame.
- **Program pages:** review each on the program's own release cadence.
  Keep the status chips honest (`NOT SHIPPING · 2027`, etc.).

## Non-negotiables

- Never claim tax filing, wage transfer, direct deposit, ACH, or money
  movement for the payroll product on the payroll product page.
- Never claim trading returns for BAI.
- Never invent a case study, testimonial, logo, or quote.
- CSP stays strict. Plausible only.
- Never publish fixed prices.
- Never mention team size.
- Every "we don't do X" statement is a scope statement for a specific
  build, not a company limit.
- WCAG AA, LCP < 2.0s on mobile, structured data on every page.
