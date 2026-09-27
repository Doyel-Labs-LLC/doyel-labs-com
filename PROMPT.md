# doyel-labs.com — the design brief, v12

The reference the site is written against. Change this document first,
then the page. If a page contradicts this brief, the page is wrong.

v12 replaces v11. What changed: a premium-but-warm finish on the same
eight pages — no new pages, no new steps. Fraunces (soft serif) for
headings and Figtree for everything else; Inter and JetBrains Mono are
gone. Solid teal pill buttons in sentence case, rounded cards and
panels, warm shadows. No individual is named in page copy at all — the
About page describes the role ("the person on the other end"); the
founder's name lives only in the legal documents and structured data.
The contact form now sends the visitor one automatic receipt, and both
emails use the site's palette.

v11 replaced v10. What changed: the site no longer names an individual
outside `/about/`. Every "who you talk to" line says **a person** — the
same person from first call to support — so the copy stays true as
Doyel Labs hires. The founder is named once, on the About page and in
the legal documents, nowhere else.

v10 changed: a warm light theme instead of the dark
canvas; photographs in defined slots with illustration fallbacks
(`IMAGES.md`); "AI builds most of it" stated plainly; first-party
analytics and approximate-location counts, disclosed in full; a favicon
set Google can actually show; GitHub as the single deploy path.

v9 changed: eight pages instead of thirty; a published, fixed website
offer; "a real person" as the lead promise; products demoted; every
claim on the site must be evidenced by this repo or by the offer.

---

## 1. Who Doyel Labs is

**Doyel Labs LLC** (exact legal name, as filed with the Wyoming Secretary
of State) is a software company in Casper, Wyoming, formed September
2026. It builds websites and custom software for businesses of any
size and any industry, and it keeps that software running afterward.

Doyel Labs was founded by Blake Doyel and is built to grow: other
people will take calls, review work, and answer the phone. So the site
describes a **role, not a name**: a person reads your message, the same
person stays on your project, and a person answers afterward. The
founder's name appears only in the legal documents and in structured
data (JSON-LD) — never in visible page copy, including `/about/`.
**AI builds most of what ships** — the majority of
code, layouts, and first-draft copy is generated — and the site says so
plainly. Every change is checked by a person, every ship is a human
decision, and a person answers for all of it.

**What Doyel Labs is not** (never claim otherwise, anywhere):
a broker-dealer, an investment adviser, a bank, a payroll processor,
a professional employer organization, a money transmitter, a tax
reporting agent, a fiduciary, or an insurer. Doyel Labs does not carry
professional liability or cyber insurance; do not say it does.

## 2. The promise (site-wide)

> **Real people build it. A real person answers.**

Every hero and every closing band carries this idea in some form. It is
the reason to choose Doyel Labs over a page builder, a marketplace
freelancer, or an agency with a ticket queue.

Concretely, the site may say — because it is true:

- You talk to a person. On the first call, during the build, and
  after. The same person, not a hand-off chain.
- No chatbot, no screening AI, no ticket queue, no drip sequences.
  The form sends exactly one automatic receipt — labeled as
  automatic, never repeating the visitor's message — and every email
  after that is written by a person.
- The phone number on the site rings a person: **(307) 429-0389**,
  Monday–Friday, 9:00 a.m.–6:00 p.m. Mountain.
- Email is read by a person and answered within one business day,
  usually the same day.

Say it plainly. Do not turn it into a slogan wall. One clear statement
per page, one "who answers" block in the footer, that's it.

**On AI.** Be open, and specific: "AI builds most of what we ship.
That's why a five-page site is $1,299 and not $8,000. A person checks
every change, stands behind it, and is who you talk to." Never write
"AI-powered" as an adjective, and never imply the work is hand-written.

**On names and size.** Do not inflate and do not apologize. The site
names no individual in page copy: no first names, no "he" or "she."
"The founder" appears only in the mandatory SteadFast disclosure. Write "a person," "a real person," or "the
same person." "Our team," "small team," and "solo" are forbidden. The
copy must read as true whether one person or five work at Doyel Labs.
What makes it different is accountability, not headcount: one person
owns your project end to end.

## 3. The offer (single source: `src/lib/offer.ts`)

Every price, timeline, and inclusion on the site is imported from
`src/lib/offer.ts`. Nothing is typed inline on a page.

### Website build — $1,299, one-time

- Five pages (home, about, services, contact, plus one of your choice).
- Your own domain, on your own registrar. You own the site and the code.
- Contact form delivered to your inbox. Phone and email links.
- Mobile-first, fast, accessible. No cookie banner, because nothing
  tracks your visitors.
- Live in **three business days** after your content is in hand
  (logo, hours, photos, one paragraph per page). The clock starts when
  content arrives, not when the deposit is paid.
- 50% ($650) to start, 50% at launch.

### Care plan — $99 / month, optional

- Hosting, TLS, backups, uptime monitoring.
- Small edits included: text, prices, hours, photos — up to 30 minutes
  of work per week. Larger changes are quoted first.
- One person to call. Same phone number, same hours.
- Cancel any month. The site stays yours; we hand over the files.

### Add-ons (flat)

- Extra page — $199
- Booking or quote-request form — $249
- Google Business Profile setup or cleanup — $299
- Page copywriting from a 20-minute interview — $499

### Custom software — quoted, from $4,000

- One-hour orientation call (Zoom or phone) with a real person.
  Listening, not pitching. No obligation.
- Written scope and a fixed price within one business day of the call.
- Progress you can see every business day.
- You own the code and the accounts it runs in.

Never bill hourly. Never publish a range that contradicts these
numbers. Never say "starting at" for the website build — it is $1,299.

## 4. Pages (eight, plus legal)

| Route | Job |
|---|---|
| `/` | The promise, the offer, one SteadFast excerpt (with disclosure), the three lanes, how it works, who answers. |
| `/websites/` | The $1,299 offer in full: inclusions, care plan, add-ons, timeline, what we refuse, six FAQs. |
| `/software/` | Custom software and internal tools. Examples of what a workspace can do (synthetic frames). Exclusions. Quoted per project. |
| `/work/` | The SteadFast build (site + payroll) with the ownership disclosure; product frames. "In the lab" strip for BAI and ConnectionLoop. |
| `/how-we-work/` | The one canonical copy of the engagement: call → scope → build → launch → a person on support. Billing rules, ownership, cancellation. |
| `/security/` | Written for a business owner. Only claims the repo evidences. Contact-form data map. `/.well-known/security.txt`. |
| `/about/` | Doyel Labs LLC, Casper, founded September 2026. A "who answers" card (role, phone, email — no name, no photo). Why a person answering the phone is the point. One paragraph on products in the lab. |
| `/contact/` | Form, phone, email, hours. "A person reads this." Button: "Send message." |
| `/legal/*` | Terms, privacy, BAI terms and privacy. `under_review` banner until counsel signs. |

Nav: **Websites · Software · Work · How we work · About** + a Contact
pill ("Talk to a person"). Footer: Security · Legal · phone · hours.

Everything else from v8 is removed and 301-redirected. No status page.
No FAQ page (FAQs live on `/websites/` and `/how-we-work/`). No press,
uses, founder, engineering, industries, pricing, docs, support, or
start, writing, or changelog pages. Old URLs 301 to the page that now
holds their content.

Word budget: home ≤ 450 words; every other page ≤ 600.

## 5. Proof

**One named client: SteadFast Transportation Inc.** The website
(steadfasttransportationinc.com) and the payroll workspace are real,
shipped, and in use. Show them: the live-site screenshots in
`public/media/websites/`, the SteadFast logo (permission on file), and
the quote in `src/lib/testimonials.ts`.

**Disclosure is mandatory.** SteadFast is owned by Doyel Labs' founder.
Wherever the SteadFast quote or logo appears, this line appears within
the same block, visible without interaction:

> SteadFast Transportation Inc. is owned by Doyel Labs' founder. The
> work is real; the endorsement is not independent.

Do not call it a "review" or "testimonial." Call it "what we built for
SteadFast." One full quote on `/work/`; one short excerpt on the home
page; nowhere else. The disclosure travels with both.

Facts allowed about the SteadFast build (from the repo): ten-page
marketing site; password-gated payroll workspace on the same domain;
SAM.gov wage-determination lookup with floor checks; batch pay runs
with PDF stubs; 180-day audit log with CSV export; passkey sign-in;
JSON/DOCX backups; live in production since 2026. Do not add
turnaround claims, page counts that don't match the site, or pay-period
frequency.

Additional proof:

1. **Product frames.** The synthetic workspace screens in
   `src/components/frames/*` with the `DEMO · SYNTHETIC DATA` corner
   label, on `/software/` and `/work/`. Names are `OPERATOR 04` /
   `J. REED`; amounts are round demo figures.
2. **The offer itself.** A published price, a published timeline, and
   a phone number that a person answers.

New clients: add to `src/lib/testimonials.ts` only with written
permission on file (`permissionDate`) and a disclosure line if any
ownership or family relationship exists.

Never invent a client, review, logo, statistic, or "average." No
"80% of engagements," no "most of our clients," no "on average."

## 6. Voice

Short sentences. Concrete nouns. One idea per sentence. Warm, not cold.
Readable by someone who is not a software engineer.

- Say what the software does. Then say who it's for.
- "Tell us what your business does. We can build it."
- Primary CTA verb: **"Talk to a person."** Secondary: "See the offer,"
  "See our work." Never "Submit," "Buy now," "Book a demo,"
  "Discovery call," "Strategy session." The first call is an
  **orientation**.
- Refused words: revolutionize, next-gen, unlock, transform, seamless,
  cutting-edge, world-class, best-in-class, mission-critical, leading,
  AI-powered, our team, small team, solo, and any person's name in
  page copy.
- Pronouns for whoever answers: "a person," "the same person," "we."
  Never "he," "she," or "I" in page copy. "We" means Doyel Labs, the
  company, which is fine because it is one; "our team" is not.
- Refused claims (removed from v8, do not reintroduce): insurance of
  any kind; refunds beyond the written scope; "DOL inspector" or any
  inspection-outcome language; named competitors; HIPAA, SOC 2, PCI,
  GLBA, or any certification; "compresses two-month builds"; "a
  fraction of what a vendor charges"; uptime percentages; "we never
  hold PII" (the contact form holds it briefly — say what happens to
  it instead).
- Engineering language ("fail closed," "signed updates") belongs on
  `/security/` and `/legal/bai/*` only.

## 7. Design

**Feel.** Welcoming, warm, like paper on a wooden desk in morning light.
Not a dashboard, not a dev tool. A visitor who runs a bakery should feel
at home in the first second — and a buyer comparing agencies should see
the finish of a company that sweats details: generous space, one clear
action per band, nothing that wiggles for attention.

**Palette (v10, light; `accentInk` added in v12).** Tokens live in
`tailwind.config.ts`.

| Token | Value | Use |
|---|---|---|
| `bg` | `#faf7f2` | Cream canvas |
| `surface` / `surface2` | `#ffffff` / `#f3efe8` | Cards, frames / warm band |
| `ink` | `#1b1f26` | Text |
| `mute` / `muted` | 0.80 / 0.68 alpha ink | Body / captions (AA) |
| `accent` / `accentInk` | `#087187` / `#06596a` | Teal: links, solid buttons / hover (hover always darkens) |
| `warm` / `warmSoft` | `#f2b455` / 16% | Illustration fills, one soft band wash. Never text. |
| `rise` / `fall` / `care` | green / red / amber | Status only |

The logo mark keeps its own cyan (`#10c7eb`); the accent used for text
and buttons is the deeper teal so it passes AA on cream.

**Type.** Fraunces (variable, soft axis) for H1–H3, prices, and
quotes; teal words inside a heading render in Fraunces italic.
Figtree for body, nav, buttons, and labels. Both self-hosted in
`src/fonts/`. No Inter, no JetBrains Mono; product frames use the
system monospace for figures. Named scale: `display` 64 · `h2` 44 ·
`h3` 24 · `lead` 20 · `body` 18 · `small` 16. **Everything is sentence
case** except the short eyebrow label above a heading.

**Buttons.** One shared style (`src/components/button-styles.ts`):
solid teal pill with white text for the primary action, white pill
with a hairline for the secondary. Sentence case, arrow icon, 48px tall
(40px small). One primary per band.

**Layout.** Max six sections per page. Alternate: split hero, photo
band, three-up, statement paragraph, FAQ list, close. Never two card
grids in a row. Cards 20px radius, panels 32px; soft warm shadows. At
most one warm-washed panel per page besides the closing band.

**Imagery.** Three kinds, in this order of preference:

1. **Photographs** in defined slots (`<Photo name=… fallback=…>`).
   Each slot has a file name, size, and generation prompt in
   `IMAGES.md`. Warm natural light, cream and amber with a hint of
   teal, editorial, calm, no faces, no text, no logos. Until a file
   exists the slot shows its illustration, so nothing is ever blank.
2. **Real screenshots** of shipped work (SteadFast), framed in a
   browser mock, labeled with the ownership disclosure.
3. **Line illustrations** (`src/components/illus.tsx`): ink linework,
   a teal wash, an amber fill, white paper shapes. Used as fallbacks
   and for small spots (footer, close band).

No stock photography. No photos of anyone who works at Doyel Labs.

**Email.** The contact notification and the visitor receipt share the
site's look (`src/lib/contact-email.ts`): cream background, one white
rounded card, Georgia headings (the email-safe cousin of Fraunces), an
amber bar, a solid teal pill button, and a plain-text twin. Light only.

**Motion.** Hero fade-in and one scroll reveal, gated on a `no-js`
class removed by a hashed inline script. Reduced motion disables all.

**Icon.** Four rounded squares. Ships as `favicon.ico` (16/32/48),
`favicon-48/96/192/512.png` (Google Search needs a multiple of 48px),
`favicon.svg`, and `apple-touch-icon.png` on a cream background. The
48/96/192 PNGs are listed first in `<link rel="icon">`.

## 8. Security posture (must be true, verified in CI)

- CSP with **no `'unsafe-inline'` in `script-src`**. Inline Next
  bootstrap scripts are hashed at build time by
  `scripts/csp-hashes.mjs` into `public/_headers`. `style-src` keeps
  `'unsafe-inline'` (Next critical CSS). `connect-src` is `'self'`,
  the analytics host selected at build time, and Turnstile only.
  `report-uri` set.
- HSTS with preload, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `frame-ancestors 'none'`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  Permissions-Policy without `interest-cohort`.
- Analytics, disclosed in full: **Cloudflare Web Analytics** (cookieless
  beacon, no persistent identifier) plus **first-party approximate
  location counts** (hourly country/region/city counters in D1; no IP,
  no path, no identifier stored; honors Do Not Track and Global Privacy
  Control; 5,000/day cap; ~31-day retention). The provider is chosen at
  build time (`NEXT_PUBLIC_ANALYTICS_PROVIDER`) and the privacy policy
  renders the matching section automatically (`src/lib/legal.ts`), so
  the policy cannot say one thing while the build does another.
  `/security/` describes the same, in plain English. No session replay,
  ever. No ad pixels. An owner-only dashboard at `/admin/analytics/`
  sits behind Cloudflare Access and is never indexed.
- Contact form (`functions/api/contact.ts`): same-origin `Origin`
  required; `Content-Type: application/json` required; body capped at
  16 KB; Turnstile verified with hostname check; rate limit counted
  after Turnstile passes; **fails closed in production** if the
  Turnstile secret or the rate-limit binding is missing; 5-second
  timeouts on Turnstile and Resend; errors return a generic message
  and never upstream text; email is strictly validated and
  URL-encoded in the reply link; subject stripped of line breaks.
  After delivery, one best-effort receipt goes to the visitor: it
  never repeats their message, greets by first name only when the
  name is plain letters, and its failure never fails the request.
  Processors disclosed in privacy: Cloudflare (Pages, Turnstile),
  Resend (email delivery), Google Workspace (mailbox).
- `/.well-known/security.txt` published; `security@doyel-labs.com` is
  the disclosure address.
- Secrets only as encrypted Pages secrets. MFA on GitHub, Cloudflare,
  Resend, Google Workspace, Cloudflare Registrar.
- CI on every push: `npm ci`, typecheck, lint, unit tests, build
  (which packages the admin export and writes the hashed CSP), a check
  that `script-src` has no `'unsafe-inline'`, and a banned-copy grep.
- **Deploy path:** push to `master` on GitHub
  (`Doyel-Labs-LLC/doyel-labs-com`); Cloudflare Pages builds with
  `npm run build`, Node 22.18+. No web uploads, no manual `wrangler`
  deploys, so GitHub and the live site never drift.

If any of the above stops being true, `/security/` changes the same
day. The page never runs ahead of the code.

## 9. Accessibility, performance, SEO

- WCAG AA contrast everywhere. Visible focus rings. Skip link. One H1
  per page, heading order intact. Form errors announced with
  `role="alert"`; fields use `aria-invalid` and `aria-describedby`.
  Modal and mobile drawer trap focus and return it on close.
- LCP < 2.0 s on mobile. No render-blocking third-party scripts.
  Illustrations are inline or single-file SVG. Photos and screenshots
  ship as WebP (`scripts/optimize-generated-images.mjs`); fonts are
  subset latin woff2, preloaded by `next/font`.
- Unique `<title>` (`%s · Doyel Labs`) and description per page.
  Organization JSON-LD in the root layout with `legalName:
  "Doyel Labs LLC"`, `foundingDate: "2026-09"`, `telephone`,
  `openingHoursSpecification` (Mo–Fr 09:00–18:00, America/Denver).
  `Offer` JSON-LD on `/websites/` with `price: 1299` and a
  `priceSpecification` for the $99/month care plan. `FAQPage` JSON-LD
  on `/websites/` and `/how-we-work/`. Breadcrumb JSON-LD on interior
  pages. XML sitemap lists only the eight pages and legal.

## 10. Products in the lab (BAI, ConnectionLoop)

Demoted, not hidden. They appear as one short strip on `/work/#lab`
and one paragraph on `/about/`. Not in the nav. Not on the home page.
Labels: BAI "Private beta"; ConnectionLoop "In private testing." No
dates, no "this month." The BAI trading disclaimer appears on
`/work/#lab` and `/legal/bai/*` only — **not** in the site footer.
The footer legal line is: "Doyel Labs LLC is a Wyoming limited
liability company. It is not a payroll processor, money transmitter,
broker-dealer, or investment adviser."

## 11. Content refresh

- Offer (`src/lib/offer.ts`): review monthly. Any change ships the same
  day to `/websites/`, `/how-we-work/`, and the JSON-LD.
- Legal: bump `version` on any material change; keep `under_review`
  until counsel signs.
- Testimonials: only with written permission and a disclosure line
  where a relationship exists.

## 12. Non-negotiables

- No client names, logos, screenshots, or quotes without written
  permission on file. SteadFast only today, always with the
  ownership disclosure.
- Prices on the site come only from `src/lib/offer.ts`.
- Never bill hourly. Never say "starting at $1,299."
- No claims of insurance, certification, uptime, or regulatory
  outcomes.
- CSP stays strict and hashed. Only the analytics provider selected at
  build time, disclosed in the privacy policy and on `/security/`.
- No individual is named in page copy — only in the legal documents
  and structured data. Every "who answers" line says a person, so
  nothing has to be rewritten when someone is hired.
- No photos of people who work here. No stock photography. Generated photos in
  the `IMAGES.md` slots, real SteadFast screenshots, and line
  illustrations only.
- Every page has "Talk to a person" within one screen.
- If a claim cannot be shown in this repo or in the offer, it does
  not go on the site.
