# doyel-labs.com — the design brief, v2

This is the reference the site is written against. If a page contradicts
this document, the page is wrong.

## Who Doyel Labs is

Doyel Labs LLC is a **small software studio** in Casper, Wyoming, formed
in **September 2026**. The team is small on purpose. We build with AI as
our primary tool, which means a two-person studio can ship what used to
take a ten-person team.

The company is *not*:

- A trading firm. BAI is one program the studio built. It is not what
  the studio does.
- A payroll processor, bank, broker-dealer, adviser, or PEO.
- An enterprise vendor. We serve small operators who cannot afford the
  enterprise stack.

## Who we serve

- **Federal service contractors and small operators** who need clean
  payroll records under labor-law scrutiny (day-rate contractors, USPS
  contract delivery, wage-determination compliance).
- **Small operators** who need a fast, honest marketing site that reads
  well on a phone and does not leak visitor data.
- **Ourselves.** Internal programs (BAI, ConnectionLoop) are things the
  studio is trying to make work.

## Voice

The voice comes from the customer's problem, not from our engineering
choices. Rules:

- Short sentences. Concrete nouns.
- Say what the software *does* before we say how it is built.
- Say "we use AI to build" when it matters (positioning, pricing),
  not as a filler adjective on every noun.
- Never write "AI-powered X" as an adjective. Say the specific thing
  the AI does: "we generated the operator's contractor register from
  a CSV in an afternoon."
- Refused: revolutionize, next-gen, unlock, transform, seamless,
  cutting-edge, world-class, best-in-class, mission-critical.
- Save "fail closed" and "signed updates" for `/engineering` — those
  are engineering concepts and not every band needs to sound like it.

## Design

**Palette.** A softened dark canvas with a single bright accent so the
site has warmth without becoming a SaaS gradient. Colors are named for
the icon.

| Token       | Value             | Where                                     |
| ----------- | ----------------- | ----------------------------------------- |
| `bg`        | `#0a0f14`         | Page canvas — softer than pure black       |
| `surface`   | `#12181f`         | Inset panels, product frames, hover        |
| `surface2`  | `#171e26`         | Cards on `surface`, tables, code           |
| `ink`       | `#f0f0fa`         | Body / display text                        |
| `mute`      | `rgba(240,240,250,0.66)` | Body below the lead                 |
| `muted`     | `rgba(240,240,250,0.44)` | Captions, footnotes                 |
| `line`      | `rgba(240,240,250,0.10)` | Default hairline                    |
| `line2`     | `rgba(240,240,250,0.22)` | CTA border, active hairline         |
| **`accent`** | `#10c7eb`         | Cyan — one accent everywhere              |
| `accentHi`  | `#4edcfb`         | Cyan on hover                             |
| `accentSoft`| `rgba(16,199,235,0.10)` | Cyan wash on active band            |
| `rise`      | `#4ed4a2`         | Status up                                  |
| `fall`      | `#ff7b8a`         | Status down                                |
| `care`      | `#f5c15a`         | Program status chip (2027, etc.)          |

The cyan is used for: the accent square in the logo, active nav item,
one primary CTA per page, an inline highlight under a hover'd link, the
`/status` "up" dot, and the accent bar in a product-band eyebrow. It is
never used for body text.

**Typography.** Inter with system fallbacks. Display and nav are
uppercase with generous tracking. Body is sentence case, 16px+, line
height 1.65. Legal / docs prose is left readable — never uppercase.

**Density and rhythm.** Full-viewport bands, one idea per band. Bands
have a clear left column (eyebrow + H2 + lead) and a right column
(evidence — product frame, table, or a proof point grid). Bands
separate on a hairline, not a filled divider.

**Icon.** Four rounded squares in a 2x2 grid. Top-left dark gray,
top-right mid gray, bottom-left light gray, bottom-right cyan. No
shadow, no background. Rendered as SVG at every size. Used as the site
favicon, the header wordmark preface, and in the hero of `/company`.

## Home page structure (v2)

Company-first, product-second, program-third.

1. **Hero.** Two sentences. What Doyel Labs is and who we build for.
   One primary CTA (cyan pill: "See what we build") and one ghost
   secondary ("How we work").
2. **What we build.** A three-across grid: Payroll · Websites ·
   Programs. Each cell: one-line description, a link to the relevant
   page, and one supporting figure ("Live example: steadfasttransportation
   inc.com" / "For USPS CDS operators" / "In private testing").
3. **How we work.** The AI-native studio angle, four honest bullets:
   we use AI to code, we scope tight, we ship in weeks not quarters, we
   hand off cleanly. This is where the differentiation lives.
4. **Where we are.** Casper, Wyoming. Founded September 2026. Small on
   purpose. Contact.
5. **Close.** The legal line (not a broker-dealer / not a bank / etc.)
   moved to a small line here, not the primary disclaimer of the page.

No BAI demo frame on the home page. BAI lives on `/programs/bai/`.

## Services page structure (v2)

1. **Hero.** "Two things we sell."
2. **Payroll — SCA-first.** One band with:
   - Left: audience + promise + proof line + ghost CTA
   - Right: SCA product frame
   - Below: 6 feature cards ("what's in the app today")
   - Below that: "what it does not do" (the explicit refusal band)
3. **Websites — for small operators.** Same shape:
   - Left: what we ship + Steadfast case reference + ghost CTA
   - Right: Steadfast preview frame
   - Below: 6 feature cards ("every project ships with")
   - Below that: 3 refusal cards
4. **How a Doyel Labs engagement works.** Discovery → build → handoff.
   Concrete steps with typical timelines (payroll workspace: ~1 week;
   marketing site: ~3 days for a small operator).
5. **Pricing philosophy.** We do not publish a rate card because every
   operator's stack is different, but we do publish our floor and our
   ceiling. Founding-year rate. Fixed-price by default.
6. **Close.** Two CTAs: email + phone.

## Programs page structure

Unchanged in spirit — keep as two full-band rows for BAI and
ConnectionLoop. Move the current arm-bar / kill-switch demo frame OFF
the home page and only show it here.

## Company page structure

- Hero: LLC, city, **founded September 2026**, size ("small on purpose").
- What we build.
- **How we work** (AI-native studio, expanded).
- What we are not.
- Contact (email, phone, security email, hours).

## Non-negotiables

- Never claim tax filing, wage transfer, direct deposit, ACH, or money
  movement for the payroll product.
- Never claim trading returns or "AI trading" for BAI.
- Never invent case studies. Steadfast Transportation is the only
  named client, and only because they are a live customer.
- CSP stays strict. Plausible only. No session replay.
- Accessibility: WCAG AA contrast on every band, visible focus, semantic
  headings, keyboard nav.
- Performance: LCP under 2.0s on mobile, no third-party scripts on
  marketing pages beyond Plausible.
