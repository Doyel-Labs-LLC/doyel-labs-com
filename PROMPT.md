# Doyel Labs website brief, v10

This is the source of truth for positioning and experience. Update this
brief before intentionally changing those decisions.

## Purpose

Doyel Labs LLC builds software for businesses. Lead with small-business
needs: websites, payroll workspaces, internal tools, integrations, and
custom applications. These are examples, not company or industry limits.

The main journey is **understand the services, see real work, start a
conversation**. Enterprise quality means clarity, consistency, credible
evidence, accessibility, and reliable interactions, not inflated claims.

## Navigation and pages

The logo links Home. Desktop and mobile share four primary links:
**Services, Work, Products, About**, plus **Start a conversation**.
About uses the existing `/company/` URL.

Home has four major sections: hero with project evidence, services,
products, and contact. One primary and one secondary hero action.
Do not repeat the project or process in separate homepage sections.

Services covers capabilities, process, pricing, and support concisely.
Use contextual links for work and industry examples. Retain service-detail
pages and the full FAQ for deeper reading; make walkthroughs optional.

Work shows real website/payroll evidence. About presents the company,
not a personal profile. Products shows each product once, with artwork,
status, and optional details. Do not frame the company around a product count.
Contact is the only inquiry form; do not reintroduce modal forms.

`/pricing/`, `/how-we-work/`, `/founder/`, and the `/industries/` overview
redirect to relevant Services sections or About. Preserve old URLs, product
anchors, and useful service anchors. Keep supporting resources reachable
through contextual links, Support, and the human sitemap without putting
the complete directory in the mobile menu.

The footer copyright area includes a discreet, keyboard-accessible **Owner
login** link with a mobile-sized touch target. Use a normal HTML anchor to
`https://doyel-labs.com/admin/analytics/`, including on previews, so entering
the dashboard starts a new document without the public collector. Do not
add it to primary navigation or sitemap listings. Keep private pages noindex,
preview/default-host admin access denied, and the existing owner-only Access
OTP plus independent MFA intact; do not add a client-side password form.

## Voice and truth

Use short, concrete, welcoming sentences that a business owner can read.
Lead with what the software does, not frameworks or technical jargon.
Welcome projects beyond the examples without promising every possible
feature or outcome.

Keep hero descriptions to one short sentence and card descriptions to one
line of thought. Do not stack an eyebrow, slogan, paragraph, and reassurance
that all say the same thing. Link to detail rather than repeating it.
Keep legal notices and product limitations visible, not hidden for brevity.

Do not use "revolutionize", "next-gen", "AI-powered", "world-class",
"best-in-class", "leading", or headcount language. Do not narrow the
company to one industry because of its first project.

Use AI as a tool, not the central sales proposition. A person makes the
decisions and reviews the work.

Only use approved, real evidence. SteadFast Transportation and Doyel Labs
share an owner; disclose this wherever its endorsement is
shown. Do not imply it is independent third-party validation. Keep real
screenshots distinct from frames labeled "Demo - synthetic data".

No invented customers, performance metrics, certifications, awards,
testimonials, launch dates, trading returns, or team photographs.
Do not use a founder portrait, signature card, personal bio, or Person
schema. Do not call Blake Doyel an engineer or make him the company spokesperson.
Use company-level contact details and unnamed shared-ownership disclosures.

## Design

Refine the existing dark navy and cyan brand. Preserve the four-square
logo, Inter, and the single cyan interface accent. See `DESIGN.md` for
tokens. Product artwork may keep its own colors.

Use sentence-case headings, readable navigation, normal body copy and form
inputs of at least 16px, generous but disciplined spacing, and restrained
surfaces. Small uppercase labels are secondary, never the primary way to
understand the page. Do not make static cards look interactive.

No carousel, theme switcher, chatbot, decorative animation library, or
stock corporate/team photos. Content must be visible without waiting for
scroll effects. Honor reduced motion and visible keyboard focus.

## Products

Products are secondary to client services. BAI is an automated trading
desk. ConnectionLoop is a shared calendar for families and groups.

`src/lib/products.ts` is the source for product labels, descriptions,
artwork, stages, and inquiry topics. BAI is private beta; ConnectionLoop
is coming soon/in private testing. Neither is publicly launched.
Do not restate both as "private beta" or promise release "this month".

Use existing optimized BAI artwork and the supplied ConnectionLoop icon.
Do not crop product wordmarks. Product artwork is not a customer/team photo.
Use honest inquiry actions, not a waitlist subscription or guaranteed access.

## Pricing and engagement

Use **Quoted per project**. Do not publish Doyel Labs service price ranges,
retainer amounts, quote examples, or pricing thresholds in page copy,
metadata, structured data, or RSS. Synthetic payroll/trading amounts are
not service prices and remain labeled demo data.

Scope and price are agreed before work begins. Do not invent payment terms,
discounts, delivery guarantees, or new service commitments.

The existing orientation is a free, no-obligation, one-hour conversation
over Zoom or phone with a real person. We listen; the client decides
whether to proceed. It is not a required commitment to send an inquiry.

## Contact

All general primary actions say "Start a conversation" and link to
`/contact/`. Service/product links may preselect an allowlisted
`projectType` query value.

Require email and message only. Name and topic are optional. Suggested
orientation times are tucked into an optional disclosure; no ordinary
subject field. Product/support inquiries must not receive sales-call or
waitlist promises.

Preserve the existing POST `/api/contact` contract, Resend delivery,
Turnstile, honeypot, and rate limiting. Show validation, sending, success,
and failure states; retain input on failure and support retry. Include
direct email/phone alternatives. Never show success on a failed request.

## Boundaries and quality

Keep Next.js static export, React, TypeScript, Tailwind, and Cloudflare
Pages. No framework/hosting migration, CMS, new product functionality,
booking integration, or marketing tracker.

Preserve legal wording, review notices, and strict CSP. The approved analytics
target is Cloudflare Web Analytics for aggregate reporting, with Plausible
retained until the coordinated switch passes account/schema/data checks.
Exactly one build-selected provider may run on public doyel-labs.com pages;
none may run on admin, preview, or local pages. Collector, CSP, and privacy
copy must use the same selection. Never enable automatic injection or dual
tracking. No raw-IP collection, replay, fingerprinting, form capture, or
contact/browsing linkage. Backend read enablement is not collection enablement.
Payroll prepares records; it does not file taxes or move money.
BAI can lose money; never promise returns. Existing product-specific
limitations remain visible on relevant surfaces.

Target WCAG 2.2 AA: semantic headings, labeled controls, sufficient
contrast, keyboard navigation, accessible mobile-menu focus, reduced
motion, and reflow. Use optimized images with explicit dimensions.

Update retained links, redirects, sitemaps, canonicals, breadcrumbs, and
structured data together. Preserve noindex on pre-release product surfaces.
Run existing lint, typecheck, and static build and check real browser
journeys. Report unverified production behavior honestly.
