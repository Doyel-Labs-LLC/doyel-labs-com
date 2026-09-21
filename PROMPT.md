# doyel-labs.com — the design brief, v7

The reference the site is written against. Change this document first,
then the page. If a page contradicts this brief, the page is wrong.

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

**We are not defined by any single industry, either.**
This is the most important framing choice on the whole site. Read it
twice before writing copy anywhere:

- Our first named client (SteadFast Transportation Inc.) happens to be
  a federal service contractor operating USPS routes. **That is
  incidental to what Doyel Labs is.** They could have been a plumber,
  a nonprofit, an accountant, or an e-commerce operator; we would have
  built for them the same way.
- Past work is a **proof of capability**, not a **definition of
  scope**. Every client we've shipped is one example of "we build the
  software your business runs on" — never "this is the kind of client
  we work with."
- SCA payroll (the specific type of pay-run workspace we built for
  SteadFast) is **one example of a payroll workspace**, not our
  payroll product. If a plumber, a coffee roaster, or a mid-market
  services firm asks us for payroll, the answer is "yes — tell us
  more," not "we do SCA."
- Refused framings on any page:
  - "We specialize in federal contractors."
  - "SCA-first" as the top-level identity of the payroll page.
  - Any hero, headline, or trust strip that names one industry, one
    compliance regime, or one client as the *definitional* thing.
- Allowed framings:
  - "We currently have live client work in [industry] — [Client]."
    (Facts about what we've shipped, presented as one example.)
  - "One of the things we've built is [specific thing]. We build for
    other operations too."
  - "Tell us your business. We can build it."
- The `/industries/` page exists to list many verticals as **starting
  points**, not a closed list. Only industries with a live named
  client get their own deep page; that page is one of many, not a
  featured landing.
- SEO-targeted niche pages (like
  `/industries/federal-service-contractors/`) are allowed and useful
  — but they must not appear at the top of any capability list, in
  the primary nav, in a homepage trust strip, or in the Organization
  JSON-LD as our headline offering. They're deep landings for people
  already searching that niche.

The company doesn't grow by pinning itself to what it's already
shipped. New verticals are welcomed. Say yes to the industry we haven't
served yet.

**We are AI-native, not AI-only.**
Being AI-native means we use AI to draft, translate, and scaffold. It
does NOT mean the customer talks to a chatbot instead of a person. At
every stage of the engagement a real human is on the other end.

The most important human touch on the whole engagement is the
**one-hour orientation call**. It comes after a prospect fills out the
contact form or emails us, and before any code is written:

- **One hour, over Zoom or phone.** Long enough to actually understand
  the operation, short enough to respect the client's time.
- **Real human being.** Not a form, not a screening AI, not a sales
  chatbot. A person from Doyel Labs.
- **Purpose: listening.** We ask about the business, the operation,
  what's slow, what's broken, and what would make it defensible on
  paper. We do not pitch a package.
- **No obligation, no pressure.** At the end of the call the client
  decides whether to move forward. If they say no, that's fine — we
  send our notes anyway.
- **If yes: written scope + fixed price back within one business day.**
- **Then: we get to work.**

The four lines that must be present on the site whenever the
orientation is described (or paraphrased with the same posture):

1. It's a real conversation with a real human being.
2. We listen. Your operation is worth our time.
3. No pressure — the decision to work together is yours.
4. If you say yes, we get to work.

Sentences to avoid: "discovery call," "kickoff call," "book a demo,"
"strategy session." Those are agency clichés. This is an
**orientation**. It orients us to your operation and orients you to
how we build.

## The most important thing about this site

**doyel-labs.com is a place a real person lands with an idea for
software.** Every page should feel like a welcoming place to start a
conversation. Not a brochure. Not a portfolio. A studio door.

Concretely, that means:

- **Every page has a Contact CTA within one screen scroll.**
- **The CTA copy is warm** — "Start a conversation," "Send us a
  message," "Tell us the idea." Never "Buy now," never "Submit."
- **The form itself is welcoming** — asks "What can we help with?" with
  friendly presets like "I have an idea but need help scoping it,"
  "I'm still figuring it out."
- **We say we build for people who don't have specs.** Most of them
  don't. That's fine.
- **The testimonial is prominent** on the home page, services page,
  work page, and case study.
- **The `/start/` page exists** specifically for "I have an idea, I
  don't know what to do next" visitors.
- **The `/faq/` page anticipates** the "what if it's dumb?" / "what
  does it cost?" / "what if I fire you?" nervous questions before the
  visitor has to ask.

## Voice

Short sentences. Concrete nouns. One idea per sentence. Warm, not cold.

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
- "Start a conversation" is the primary CTA verb. Reserve "Start a
  project" for people who have already scoped one out.

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

## Navigation (v5)

**Top nav (desktop and mobile drawer):**
- SERVICES — what we build
- WORK — a portfolio band
- COMPANY — who we are, how we work
- CONTACT — pill button that opens a modal with a real form

**Footer:** Start here · FAQ · Legal · Status · Support · plus contact info.

Not in the top nav (still accessible via footer + inline references):
Programs, Engineering, Security, Docs, Support, Changelog, Legal,
Start, FAQ.

## Page structure

### Home
1. **Hero.** "The software your business runs on." + warm subhead.
2. **Testimonial** (SteadFast full quote). Right below the hero — the
   proof point is the second thing every visitor reads.
3. **What we build** — 6 broad capability cards.
4. **Selected work** — real screenshot + case tile.
5. **How we work** — 4 rules.
6. **What might you be here for?** — 6 path cards for common visitor
   intents.
7. **Get in touch** — big Contact CTA.

### `/start/`
The friendly landing for "I have an idea, I don't know what to do."
Steps, examples of ideas, nervous-question FAQ, testimonial, CTA.

### `/faq/`
Anticipates the questions people ask before signing. Grouped into:
Before we start / Pricing / Working together / After launch / Trust.
Uses collapsible `<details>` elements for each Q. JSON-LD `FAQPage`
schema for SEO.

### Services
1. Hero.
2. **Short testimonial** — one-line excerpt right after the hero.
3. Capabilities — 9+ cards.
4. Past work — SteadFast website + SteadFast payroll cases.
5. Ongoing partnership — retainer.
6. How an engagement works.
7. Pricing philosophy — "priced per project."
8. Contact CTA.

### Work
1. Hero.
2. **Short testimonial** — one-line excerpt right after the hero.
3. SteadFast website case (with real screenshot).
4. SteadFast payroll case.
5. Internal programs — brief.
6. Contact CTA.

### Case study
1. Hero.
2. **Full testimonial** — placed prominently near the top.
3. At-a-glance grid.
4. Marketing site details (2 screenshots).
5. Payroll workspace details (2 product frames).
6. Approach — 4 steps.
7. Scope discipline.
8. CTA.

### Company
1. Hero — LLC, city, founded date, logo mark.
2. How we work — AI-as-tool.
3. Facts — entity, location, contact.
4. Contact CTA.

### Contact
1. Hero.
2. Real form (inline) with:
   - Name (optional)
   - Email (required)
   - **What can we help with?** dropdown (project-type)
   - Subject (optional)
   - Message (required)
3. Direct-contact sidebar (email, phone, security disclosure).
4. Related pages links.

### Programs (BAI, ConnectionLoop)
Program pages use the v3+ voice — sentence-case body, no
"aerospace-lab" language. Program-specific disclaimers stay in the
page footer.

## Content principles

### Trust signals (never fake)
- **Named clients only.** Currently only SteadFast Transportation.
- **Named quotes only.** The SteadFast testimonial (in
  `src/lib/testimonials.ts`) is real, written by the SteadFast owner
  who is also Blake Doyel, and shipped with explicit permission.
- **Logos only from live sites** — SteadFast logo displayed with
  written permission.
- **Screenshots only from real work** — SteadFast home + contractors
  page. Product frames use synthetic demo data.

### Pricing (public)
- **No fixed rate card.** "Priced per project. Contact for quote."
- **Founding-year discount language** stays until 2026-12-31, then
  removed.
- **Retainer bracket:** "priced per month based on load," no number.
- **Internal pricing floors and ceilings** live only in
  `Doyel-labs-business-model.md` on the Desktop — never on the site.

### Contact form
- Real form, `POST /api/contact` → Cloudflare Pages Function → Resend
  → `support@doyel-labs.com` → Google Workspace alias to
  `blake@doyel-labs.com`.
- **Project-type dropdown** categorizes inquiries so blake@ can
  prioritize. Categories: general, website, payroll, custom, idea,
  maintenance, bai, connectionloop, other.
- Subject line email: `[Website · <Category>] <Subject>` for easy
  inbox filtering.
- Env vars: `RESEND_API_KEY` (secret), `RESEND_FROM` (plaintext),
  `CONTACT_TO` (plaintext), `TURNSTILE_SECRET_KEY` (secret),
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (plaintext), `CONTACT_KV` (KV
  binding for rate limiting).
- Rate limit: 5 requests per 5 minutes per IP via Cloudflare KV.
- Bot protection: Cloudflare Turnstile challenge + honeypot field.
- Graceful fallback: if the endpoint fails, the UI shows the direct
  email and phone.

## Security posture

Kept strict:

- CSP: `default-src 'self'`; scripts from `self`, `plausible.io`,
  `challenges.cloudflare.com` only. `frame-ancestors 'none'`.
- HSTS with preload. X-Content-Type-Options: nosniff. X-Frame-Options: DENY.
- No third-party marketing scripts. No session replay tools ever.
- Plausible-only for analytics. Cookieless. No PII collected.
- DMARC `p=quarantine`, SPF, DKIM (Google + Resend), MTA-STS TXT.
- All secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) stored as
  encrypted Pages secrets, not plaintext env vars.
- MFA on GitHub, Cloudflare, Resend, Google Workspace, and Cloudflare
  Registrar (which handles all four domains).

## Accessibility, performance, SEO

- WCAG AA contrast on every band. Focus rings visible. Keyboard nav
  reachable. Semantic headings, one H1 per page.
- LCP < 2.0s on mobile. No render-blocking third-party scripts.
- Sitemap includes every published route. `robots.txt` allows all.
- Every page: unique `<title>` template `%s · Doyel Labs`, unique
  `<meta description>`.
- `application/ld+json` Organization schema in the root layout.
- Breadcrumb JSON-LD on all interior pages via
  `src/components/breadcrumbs.tsx`.
- FAQ JSON-LD on `/faq/` for Google rich results.
- Open Graph image at `/opengraph-image` — 1200×630 PNG rendered by
  `next/og` at build time.
- RSS feed at `/changelog/rss.xml`. `<link rel="alternate">` in root
  `<head>`.

## Content refresh cadence

- **Home + Services + Work + Company + Start + FAQ:** review every 90
  days. Update any stale claim.
- **Testimonials:** as new clients approve them, add to
  `src/lib/testimonials.ts` and surface on the case study + home band.
- **Legal MDX:** update the `version` field on any material change.
  Get attorney sign-off before removing "under review."
- **Changelog:** entry per commit that changed something a user could
  notice. Never marketing-flavored.
- **Case studies:** as new clients ship, add a section under
  `/case-studies/<client>/` with client name (with permission), one
  paragraph of context, and one product frame.

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
