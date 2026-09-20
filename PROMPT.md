# doyel-labs.com — the design brief, v3

This is the reference the site is written against. If a page contradicts
this document, the page is wrong.

## Who Doyel Labs is

Doyel Labs LLC is a **software company** based in Casper, Wyoming,
formed in **September 2026**. We build with AI as our primary tool, so
we can ship complex software fast.

**We are not narrowed.** Payroll and websites are the work we've shipped
first. They are not the totality of what we build. Doyel Labs takes on
whatever software the customer needs — a portal, a data pipeline, an
internal tool, a public app, a payments integration, a compliance
workspace. The right answer to "can you build X?" is almost always
"yes, tell us more."

**We are not defined by size.** The site never says "small team,"
"two-person," "solo," or any headcount language. Customers hire us for
what we produce, not for how many chairs are in the office.

**We do not narrow the payroll product with claims of what we cannot
add.** The current SteadFast Payroll build does not compute federal
withholding — but that is a feature scope decision on that build, not a
capability limit of the company. Do not write "we cannot / we do not
do tax filing" on the marketing pages. Legal disclaimers about *what
the current software does* stay on the payroll product page and in the
Terms of Service. The company page never limits itself.

## Who we serve

Anyone with an operation and a real budget. We take work from federal
service contractors, small operators, mid-market companies, and other
studios who need a subcontractor. We turn down work only when we
cannot ship it well or when the request violates the law.

## Voice

Short sentences. Concrete nouns. One idea per sentence.

- Say what the software *does*.
- If we've built it before, name the client (SteadFast Transportation).
- If we haven't built it before, say "we can build that" — not
  "we specialize in."
- Never write "AI-powered X" as an adjective. Say the specific thing
  the AI does when it matters: "we generated the operator's contractor
  register from a CSV in an afternoon."
- Refused words: revolutionize, next-gen, unlock, transform, seamless,
  cutting-edge, world-class, best-in-class, mission-critical.
- Refused framings: "two things we sell," "we only do X," "small team,"
  "one of a kind," "leading."
- Keep engineering language ("fail closed," "signed updates") to the
  BAI program page and `/security` — it is not the company's voice.

## Design

**Palette.** Softened dark canvas with cyan accent from the icon.

| Token       | Value             |
| ----------- | ----------------- |
| `bg`        | `#0a0f14`         |
| `surface`   | `#12181f`         |
| `surface2`  | `#171e26`         |
| `ink`       | `#f0f0fa`         |
| `mute`      | `rgba(240,240,250,0.66)` |
| `muted`     | `rgba(240,240,250,0.44)` |
| `line`      | `rgba(240,240,250,0.10)` |
| `line2`     | `rgba(240,240,250,0.22)` |
| **`accent`** | `#10c7eb`         |
| `accentHi`  | `#4edcfb`         |
| `accentDim` | `rgba(16,199,235,0.32)` |
| `accentSoft`| `rgba(16,199,235,0.10)` |
| `rise`      | `#4ed4a2`         |
| `fall`      | `#ff7b8a`         |
| `care`      | `#f5c15a`         |

**Typography.** Inter with system fallbacks. Display and nav are
uppercase with generous tracking. Body is sentence case, 16px+, line
height 1.65.

**Icon.** Four rounded squares. Dark gray, mid gray, light gray, cyan.
No shadow, no background. Used as header wordmark preface, favicon, and
in hero visuals.

## Navigation (v3)

Top nav is four items. Contact is the primary CTA, not a nav link
alongside the others.

- **SERVICES** — what we build (broad capabilities + past work)
- **WORK** — a portfolio band: SteadFast site, SteadFast Payroll,
  BAI (internal), ConnectionLoop (internal)
- **COMPANY** — who we are, how we work
- **CONTACT** — button that opens an inline modal with a real form

Removed from the top nav: Programs, Engineering, Security. They keep
their URLs and are reachable from footer links + inline references,
but they don't headline.

## Home page structure (v3)

1. **Hero.** One sentence that says what we build for and one that says
   how. One primary CTA ("Start a project" — opens contact modal) and
   one ghost link ("See our work").
2. **What we build.** Broad, single band: "We build the software your
   business runs on." Six-across capability tiles, or a paragraph with
   an inline list.
3. **Selected work.** Four tiles, equal billing: SteadFast website,
   SteadFast Payroll, BAI, ConnectionLoop.
4. **How we work.** AI-as-tool framing: we use AI to code, we scope
   tight, we ship fast, you own the source. Four rules.
5. **Ongoing partnership.** New band. We stay on to maintain what we
   build, fix issues, and ship new features on a monthly retainer.
6. **Get in touch.** Prominent — big CTA that opens the contact modal.

## Services page structure (v3)

1. **Hero.** "What we build."
2. **Capabilities.** Ten or so cards that cover our full range —
   internal tools, marketing sites, compliance workspaces, data
   pipelines, API integrations, portals, mobile apps, etc.
3. **Past work.** Case-study framing:
   - **SteadFast Payroll** for SteadFast Transportation — SCA-first
     pay-run workspace, currently in operator use.
   - **SteadFast Transportation website** — ten pages, schema.org,
     Formspree.
   - Both name the client, the domain, and what shipped.
4. **Ongoing partnership.** Retainer service: fix bugs, keep dependencies
   current, ship new features. Priced per month.
5. **Pricing.** No fixed dollar tiers. "Every project is priced after a
   short discovery call." One line about honouring founding-year rates
   for our first customers.
6. **Contact.** Prominent CTA that opens the modal.

## Pricing philosophy (internal — do not publish)

- Every project quote is fixed price. We do not bill hourly for AI's
  time.
- Base every quote on:
  - Our own labour (small vs. medium project)
  - Cloud costs the customer will pay (Cloudflare, Neon, Resend, etc.)
  - AI token costs during build (this can be significant on a code-heavy
    project — figure a few hundred dollars for a complex payroll build)
  - A buffer of ~30 % for iteration
- The floor is: we do not lose money on an engagement.
- The ceiling is: what an enterprise vendor would charge for the same
  scope, minus 30–50 %. We are competitive because we ship faster with
  fewer people, not because we undercut to bleed.
- Ongoing retainer: $250–$1,000/month depending on load, with a clear
  scope of what's included.
- Anything AI-heavy at runtime (e.g. an AI-powered feature customers
  use) is quoted with a token-cost estimate + a runtime pass-through.
- If a discovery call reveals the project is AI-heavy at build time
  AND runtime, quote the runtime pass-through explicitly and offer to
  cap monthly AI spend.

## Contact form

- **Real form**, not `mailto:`. Fields: name, email, subject, message.
- **Endpoint:** `POST /api/contact` — a Cloudflare Pages Function.
- **Sends via Resend** to `support@doyel-labs.com`.
- **Env var required:** `RESEND_API_KEY` in the Cloudflare Pages env.
- **From address:** `Doyel Labs Website <noreply@doyel-labs.com>` once
  the domain is verified in Resend. Fall back to
  `onboarding@resend.dev` if the domain isn't yet verified.
- **Reply-to:** the sender's email address.
- **Fallback:** if the API fails, the UI shows the support email and
  phone so the visitor can reach us anyway.
- **Modal or page:** the modal is trigger-able from any page via a
  Contact button. `/contact/` also renders the same form inline.

## Non-negotiables

- Never claim tax filing, wage transfer, direct deposit, ACH, or money
  movement for the payroll product **on the payroll product page** —
  those are legitimate scope statements. Company-level pages do not
  need to say them.
- Never claim trading returns for BAI.
- Never invent case studies. SteadFast Transportation is the only real
  client until another one signs.
- CSP stays strict. Plausible only. No session replay.
- WCAG AA contrast, visible focus, keyboard nav, semantic headings.
- LCP under 2.0s on mobile.
