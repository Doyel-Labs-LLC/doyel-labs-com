/**
 * Company + product changelog.
 *
 * Single source of truth for both `/changelog/` (HTML) and
 * `/changelog/rss.xml` (RSS feed). Every entry must be a real
 * shipped change — never a marketing bullet or a placeholder.
 *
 * Adding an entry: prepend to `entries`. Fields:
 *   - `id`      unique slug (used for RSS GUID and #anchor)
 *   - `version` short version tag (e.g. "v21") — one per ship
 *   - `date`    ISO 8601 date (YYYY-MM-DD)
 *   - `section` category chip, from `SECTIONS` below
 *   - `title`   one-line summary; renders as heading
 *   - `body`    one paragraph of detail; renders under the heading
 *
 * Order matters: `entries` is intentionally kept in reverse
 * chronological order so the rendered page and RSS feed
 * inherit that order without a sort.
 */

export type ChangelogSection =
  | "Company"
  | "Design"
  | "Performance"
  | "Accessibility"
  | "SEO"
  | "Writing"
  | "Bugfix"
  | "Payroll"
  | "BAI"
  | "ConnectionLoop"
  | "Products"
  | "Legal";

export const SECTIONS: readonly ChangelogSection[] = [
  "Company",
  "Design",
  "Performance",
  "Accessibility",
  "SEO",
  "Writing",
  "Bugfix",
  "Payroll",
  "BAI",
  "ConnectionLoop",
  "Products",
  "Legal",
] as const;

export type ChangelogEntry = {
  id: string;
  version?: string;
  date: string;
  section: ChangelogSection;
  title: string;
  body: string;
};

/**
 * Changelog entries. Reverse chronological — newest first.
 *
 * Each version tag corresponds to a Git commit on `master`; the
 * commit history is the audit trail. Never rewrite these entries
 * after they ship; add a new entry that corrects if needed.
 */
export const entries: ChangelogEntry[] = [
  // ── v30 · Site simplification + BAI legal for Alpaca ──────
  {
    id: "v30-products-page",
    version: "v30",
    date: "2026-09-21",
    section: "Products",
    title: "New /products/ page — BAI Desk + ConnectionLoop, in one place",
    body: "Replaces the earlier three-page /programs/* tree with one focused page. Documents both products (BAI Desk — the autonomous trading desk; ConnectionLoop — the invite-only shared calendar) with hero, three-locks card, product-vs-services separation, and direct links to the BAI legal docs. Deep links: /products/#bai and /products/#connectionloop. Page-level noindex, follow (same posture as before) until at least one product ships publicly.",
  },
  {
    id: "v30-bai-legal",
    version: "v30",
    date: "2026-09-21",
    section: "Legal",
    title: "BAI Desk Terms of Use + Privacy Policy published",
    body: "Two new legal documents scoped specifically to BAI Desk, published at /legal/bai/terms/ and /legal/bai/privacy/. Both effective Sep 21 2026, published primarily so Alpaca's broker-app compliance team can review the product's terms as part of the OAuth Connect submission. Content authored by the founder; hosted under a product-scoped side-nav so the pages don't drag the company-wide legal rail with them. LegalPage component refactored to accept optional nav/breadcrumbs/lead overrides.",
  },
  {
    id: "v30-simplification",
    version: "v30",
    date: "2026-09-21",
    section: "Company",
    title: "Simplified from ~41 pages to ~30 — same content, fewer routes",
    body: "The old site had a page per program (BAI, ConnectionLoop), a page per program's docs, a case-studies subtree with one entry, a /reviews/ page with one testimonial, a /start/ funnel page duplicating /contact/, and a /programs/ index tying it together — nine routes total for what is really three surfaces (products, case studies, contact). Consolidated: /programs/* → /products/ (single page, hash anchors); /docs/bai/ and /docs/connectionloop/ → /products/#*; /case-studies/steadfast/ → /work/ (full case + testimonial); /reviews/ → /work/ (full testimonial rendered inline); /start/ → /contact/. Every deleted route is 301'd via public/_redirects, so nothing 404s. Fewer pages, same content, easier to maintain, and search engines see one strong page per product instead of three thin ones.",
  },
  {
    id: "v30-bai-status",
    version: "v30",
    date: "2026-09-21",
    section: "Products",
    title: "BAI status updated — private beta, broker review",
    body: "BAI Desk status moved from \"NOT SHIPPING · 2027\" to \"PRIVATE BETA · BROKER REVIEW\" to reflect the actual state — the product is being submitted for Alpaca's broker-app onboarding. Public release still follows the app-approval + risk-audit gates, but the framing no longer reads like vaporware.",
  },

  // ── v29 · De-index unshipped programs from Google ────────
  {
    id: "v29-noindex-programs",
    version: "v29",
    date: "2026-09-21",
    section: "Company",
    title: "De-indexed BAI + ConnectionLoop program pages from search",
    body: "Google was still cutting a \"BAI by Doyel Labs\" title and a \"software you run on your own computer\" description into the top result for the company-name search — misrepresenting Doyel Labs as a trading-desk shop instead of the custom software studio it is. Root cause: /programs/*, /docs/bai/, and /docs/connectionloop/ were fully indexable, so Google could mix their snippets into the root-domain result. Fix: added robots: { index: false, follow: true } to /programs/, /programs/bai/, /programs/connectionloop/, /docs/bai/, /docs/connectionloop/. Dropped those routes from sitemap.xml. Added Disallow rules to /robots.txt. Tightened the BAI hero framing so any residual crawl grabs \"Doyel Labs is a custom software studio; BAI is one of the programs it builds\" first. When BAI or ConnectionLoop ship publicly, the index flag flips back and they land in the sitemap again.",
  },

  // ── v28 · /uses/ page ─────────────────────────────────────
  {
    id: "v28-uses",
    version: "v28",
    date: "2026-09-20",
    section: "Company",
    title: "/uses/ page — real tech stack, real tools",
    body: "New /uses/ page in the classic uses.tech developer-blog format. Nine categories (editor + AI tooling, framework + language, backend + storage, deployment + CDN, comms + email, auth + payments, analytics + monitoring, design + assets, legal + ops) with 40+ specific tools we actually use. \"What we don't use\" band names six categories we've explicitly refused (Google Analytics, session-replay tools, chat widgets, newsletter pop-ups, growth hacks, gratuitous custom fonts) with the reason each. Signal to technical prospects that the stack is transparent and considered.",
  },

  // ── v27 · Phone number update + README refresh ───────────
  {
    id: "v27-phone-307",
    version: "v27",
    date: "2026-09-20",
    section: "Company",
    title: "Phone number updated to (307) 429-0389",
    body: "Company phone number changed from (813) 686-4559 to (307) 429-0389. The 307 area code is Wyoming, matching the Casper HQ — replaces the previous Tampa Bay (813) number for consistency. Updated in src/lib/site.ts (single source of truth), the /press/ facts table, and AUDIT.md. Every page that renders site.phone / site.phoneHref auto-updates on next deploy.",
  },
  {
    id: "v27-readme",
    version: "v27",
    date: "2026-09-20",
    section: "Company",
    title: "README rewritten for v22+ architecture",
    body: "Dev docs were stale relative to v22 — still describing the old changelog-as-array-in-page pattern. Full rewrite covering: current repo layout (all 20+ new pages, new libs, functions/, scripts/), Cloudflare Pages Functions deploy story, the shared src/lib/changelog.ts source-of-truth pattern, how to add testimonials / blog posts / legal pages / screenshots, contact form architecture, static export gotchas, and the non-negotiables from PROMPT.md v8. Useful for any future engineer opening the repo.",
  },

  // ── v26 · Legal MDX polish ────────────────────────────────
  {
    id: "v26-legal-polish",
    version: "v26",
    date: "2026-09-20",
    section: "Company",
    title: "Legal pages polished — same content, less scary framing",
    body: "Removed the inline \"DRAFT FOR COUNSEL. Do not present to customers\" note from all four legal MDX files (terms, privacy, payroll-data, risk) — that was an internal reviewer note that shouldn't have been visible to end users. The LegalPage shell already surfaces the \"under counsel review\" status via a measured Notice component. Rebuilt the legal shell with: breadcrumbs, hero + one-line description per doc, side-nav under the hero, softer \"effective as drafted / under counsel review\" notice, and a footer with 'ask a legal question' + 'security posture' links. Terms scope broadened from \"small operators\" to \"any business\" to match the current company positioning.",
  },

  // ── v25 · Recently-shipped band on homepage ───────────────
  {
    id: "v25-recent-shipped-home",
    version: "v25",
    date: "2026-09-20",
    section: "Design",
    title: "\"Recently shipped\" band on the homepage",
    body: "Home page now shows the three most recent changelog entries as compact cards, right before the close CTA. Pulled directly from src/lib/changelog.ts (no duplication), so every new entry updates the homepage automatically on next deploy. Repeat visitors see active shipping without hunting; the full timeline stays at /changelog/.",
  },

  // ── v24 · Support page rebuild ────────────────────────────
  {
    id: "v24-support-rebuild",
    version: "v24",
    date: "2026-09-20",
    section: "Company",
    title: "Support page rebuilt for post-launch clients",
    body: "New /support/ page separates prospect-focused pre-sales (/contact/) from client-focused post-launch help. Two-column hero with a direct-routes card. Three explicit response tiers: same-day for retainer SEV-1 breakage, one-business-day standard, two-business-day security disclosures. Retainer vs. standard SLA spelled out. Product-scoped FAQs for payroll, websites, BAI, and ConnectionLoop preserved and expanded. \"What to include in the first email\" band saves one round-trip of email tag.",
  },

  // ── v23 · Custom software page + changelog self-reference ─
  {
    id: "v23-custom-software",
    version: "v23",
    date: "2026-09-20",
    section: "Company",
    title: "Custom software service page",
    body: "New /services/custom-software/ landing page — the third major service page, alongside websites and payroll. Covers seven categories (dashboards, portals, internal tools, integrations, data pipelines, custom web apps, one-off programs) with real-shape examples per category. Honest \"when to build custom vs. buy off-the-shelf\" band. Service JSON-LD emitted with a $10k–$80k price range for Google's rich results.",
  },
  {
    id: "v23-services-subnav",
    version: "v23",
    date: "2026-09-20",
    section: "Design",
    title: "Services deep-page sub-nav",
    body: "Added a \"Deep pages\" row under the /services/ hero linking to /services/websites/, /services/payroll/, and the new /services/custom-software/. Makes the three deep landing pages discoverable from a single click on the services overview.",
  },

  // ── v22 · Changelog rewrite ───────────────────────────────
  {
    id: "v22-changelog-real",
    version: "v22",
    date: "2026-09-20",
    section: "Company",
    title: "Changelog rewritten with 36 real entries + timeline layout",
    body: "Rebuilt /changelog/ with a proper timeline layout — cyan dots at each version group, color-coded section chips (Company, Design, Performance, Accessibility, SEO, Writing, Bugfix, Payroll, BAI, ConnectionLoop), and permalink anchors on every entry. 36 real entries covering v1 through v22. Every entry names a real shipped change; nothing padded for marketing.",
  },
  {
    id: "v22-changelog-source",
    version: "v22",
    date: "2026-09-20",
    section: "Company",
    title: "Single source of truth for changelog + RSS",
    body: "The old changelog duplicated all entries between the HTML page and the RSS feed route (~120 lines of copy-paste, always going to drift). Refactored to a shared src/lib/changelog.ts module with typed ChangelogEntry / ChangelogSection. Both the page and rss.xml route now import from it. Adding a new entry is one prepended object in one file.",
  },

  // ── 2026-09-20 · Founder + third writing post ────────────
  {
    id: "v21-founder-card",
    version: "v21",
    date: "2026-09-20",
    section: "Company",
    title: "Founder signature card",
    body: "Rebuilt the /founder/ portrait as an intentional designed signature — mono \"FOUNDER CARD\" header, big Doyel monogram treatment, business-card grid footer. No photo, on purpose.",
  },
  {
    id: "v21-third-post",
    version: "v21",
    date: "2026-09-20",
    section: "Writing",
    title: "Third writing post: How to scope software without a spec",
    body: "10-minute read on the seven-question framework we use on the orientation call to turn \"I think we need something\" into a written scope + fixed price. Practical, no philosophy.",
  },

  // ── v20 · Founder page ───────────────────────────────────
  {
    id: "v20-founder",
    version: "v20",
    date: "2026-09-20",
    section: "Company",
    title: "Founder page",
    body: "New /founder/ page with an honest bio (non-traditional path, AI-native, human-reviewed), Person JSON-LD linked to the Organization, and a signature-card visual identity. Cross-linked from /company/, the mobile nav, and the human sitemap.",
  },

  // ── v19 · Performance ────────────────────────────────────
  {
    id: "v19-image-opt",
    version: "v19",
    date: "2026-09-20",
    section: "Performance",
    title: "Image optimization — 65% smaller hero images",
    body: "Resized SteadFast screenshots from 2880×1620 to 1600×900 and re-encoded with mozjpeg at q82. Contractors page: 331KB → 118KB. Home hero: 258KB → 93KB. WebP variants also emitted. Cold-cache LCP measured at 264ms on prod.",
  },
  {
    id: "v19-heading-hierarchy",
    version: "v19",
    date: "2026-09-20",
    section: "Accessibility",
    title: "Heading hierarchy skip fixed",
    body: "The <Feature> component was rendering as <h4> inside <h2> bands, causing an H2→H4 skip in the accessibility outline. Changed to <h3> for a clean hierarchy across every page that uses Feature.",
  },

  // ── v18 · Mobile nav portal fix ──────────────────────────
  {
    id: "v18-mobile-nav",
    version: "v18",
    date: "2026-09-20",
    section: "Bugfix",
    title: "Mobile nav drawer rewritten via createPortal",
    body: "The header's backdrop-filter created a new CSS containing block that was collapsing the fixed inset-0 drawer to 75px tall on mobile — page content bled through where the drawer should have been. Fix: render the drawer via createPortal to document.body, plus a fully opaque bg (no more reliance on backdrop-filter for readability). Drawer now shows every site link grouped into Primary, Explore, and Support & Ops.",
  },
  {
    id: "v18-overflow-safeguards",
    version: "v18",
    date: "2026-09-20",
    section: "Design",
    title: "Horizontal-overflow safeguards",
    body: "Added global body { overflow-x: hidden } and { overflow-wrap: anywhere } on every mono/code element. Long URLs on /sitemap/ now wrap gracefully instead of forcing horizontal scroll on narrow viewports. Verified across every key page at 390px width.",
  },

  // ── v17 · Sitemap + Press ────────────────────────────────
  {
    id: "v17-sitemap-press",
    version: "v17",
    date: "2026-09-20",
    section: "Company",
    title: "Human sitemap + press kit",
    body: "New /sitemap/ page — a human-readable index of every URL, grouped into 11 sections with per-URL blurbs. New /press/ media kit with three canonical boilerplate lengths (14, 50, and 140 words), downloadable logo assets, a canonical facts table, and usage rules for journalists and partners.",
  },

  // ── v16 · Reviews ────────────────────────────────────────
  {
    id: "v16-reviews",
    version: "v16",
    date: "2026-09-20",
    section: "Company",
    title: "Reviews page",
    body: "New /reviews/ page for named client feedback. Every review shows the full quote, scope of what was built, and a public verification link. schema.org Review JSON-LD emitted per review (deliberately no fake numeric ratings — our clients write paragraphs, not stars). \"An honest note\" band auto-hides at 2+ reviews.",
  },

  // ── v15 · Contact page + orientation times ───────────────
  {
    id: "v15-contact-page",
    version: "v15",
    date: "2026-09-20",
    section: "Company",
    title: "Contact page overhaul + orientation-times field",
    body: "Rebuilt /contact/ with a \"what happens after you hit send\" three-step band and four \"quiet commitments\" cards (No sales sequence · No pressure on the call · No hidden charges · No newsletter sign-up). Added an optional \"Suggested orientation times\" textarea to the contact form; when populated, times render as a cyan-bordered card in the delivered email so scheduling is one round-trip instead of three.",
  },

  // ── v14 · How we work ────────────────────────────────────
  {
    id: "v14-orientation",
    version: "v14",
    date: "2026-09-20",
    section: "Company",
    title: "The one-hour orientation as the centerpiece",
    body: "New /how-we-work/ page with the one-hour orientation call as the primary trust surface. Four ground rules: a real conversation with a real human, we listen (your operation is worth our time), no pressure (the decision is yours), if you say yes we get to work. Every existing engagement flow (services, pricing, start, FAQ, home) updated to reference the orientation, replacing generic agency \"discovery call\" language.",
  },

  // ── v13 · OG image + services hero + second post ─────────
  {
    id: "v13-og-image",
    version: "v13",
    date: "2026-09-20",
    section: "Design",
    title: "New Open Graph image",
    body: "Rebuilt the OG card as a solid black canvas with the four-square mark and \"Doyel Labs LLC · Custom software for any business.\" Every link to doyel-labs.com in Slack, iMessage, LinkedIn, and Twitter now previews with the branded card.",
  },
  {
    id: "v13-services-hero",
    version: "v13",
    date: "2026-09-20",
    section: "Design",
    title: "Two-column hero preview on /services/",
    body: "Added the layered SteadFast site preview + SCA compliance card to the top-level services page, matching the treatment on the home page and per-service pages.",
  },
  {
    id: "v13-second-post",
    version: "v13",
    date: "2026-09-20",
    section: "Writing",
    title: "Second writing post: AI-native software",
    body: "\"AI-native software — what we generate, what we still write by hand.\" How Doyel Labs actually uses AI in production builds, which parts humans hold line-by-line, and how we keep clients safe when AI drafts real code.",
  },

  // ── v12 · Broader positioning + SEO overhaul ─────────────
  {
    id: "v12-positioning",
    version: "v12",
    date: "2026-09-20",
    section: "SEO",
    title: "Broader positioning + SEO overhaul",
    body: "Homepage title, meta description, keywords, and Organization JSON-LD rewritten to lead with \"custom software for any business\" (mom-and-pop through enterprise), no more BAI-first or SCA-first framing. Legacy /programs/bai/ and /legal/risk/ pages get accurate program-scoped titles. Full sitemap.xml re-tiered.",
  },
  {
    id: "v12-pricing",
    version: "v12",
    date: "2026-09-20",
    section: "Company",
    title: "Pricing page",
    body: "New /pricing/ page with typical price bands (marketing sites $2.5k–$8k · payroll workspaces $8k–$20k · custom software $10k–$80k), a retainer band, six factors that move a quote, and a four-step billing flow. No hard prices, no menus.",
  },
  {
    id: "v12-industries",
    version: "v12",
    date: "2026-09-20",
    section: "Company",
    title: "Industries index + first vertical page",
    body: "New /industries/ index with 12 verticals in alphabetical order — no \"featured\" card. Full landing page at /industries/federal-service-contractors/ for SCA payroll compliance SEO. Every other vertical routes to /contact/ with a topic pre-fill.",
  },
  {
    id: "v12-writing",
    version: "v12",
    date: "2026-09-20",
    section: "Writing",
    title: "Writing / engineering-notes surface",
    body: "New /writing/ index with the first post: \"How we shipped a full payroll workspace in six weeks.\" BlogPosting JSON-LD per post, ordered reverse-chronologically. RSS-friendly with per-post canonical URLs.",
  },

  // ── v11 · Hero preview + trust strip + motion ────────────
  {
    id: "v11-hero-preview",
    version: "v11",
    date: "2026-09-20",
    section: "Design",
    title: "Hero product preview",
    body: "Homepage hero now has a two-column layout: copy on the left, a browser-chrome frame with the live SteadFast contractors page on the right, plus a floating SCA-compliance card overlay on desktop. Proves the range (marketing site + compliance-grade internal tool) in one visual.",
  },
  {
    id: "v11-trust-strip",
    version: "v11",
    date: "2026-09-20",
    section: "Design",
    title: "Trust strip below the hero",
    body: "Mono-typed row of proof signals under the hero: Live client work since 2026 · Any industry, any operation · Shipping in days, not quarters · Casper, Wyoming-based · Reply within 1 business day.",
  },
  {
    id: "v11-scroll-motion",
    version: "v11",
    date: "2026-09-20",
    section: "Design",
    title: "Scroll-reveal motion on bands",
    body: "Every main band on the home and interior pages now fades and lifts into view as it enters the viewport, via IntersectionObserver. Fully respects prefers-reduced-motion (no motion at all on OS reduced-motion setting).",
  },

  // ── v10 · Enterprise email + favicon set ─────────────────
  {
    id: "v10-email",
    version: "v10",
    date: "2026-09-20",
    section: "Company",
    title: "Enterprise-grade contact-form email",
    body: "The contact form now delivers a designed HTML email with the four-square logo header, cyan category pill, From/Subject grid, cyan-accent message body, and a big Reply CTA button that opens a fresh email with Re: <subject> pre-filled. Plain-text version rewritten with proper box-drawing separators for HTML-off clients.",
  },
  {
    id: "v10-favicons",
    version: "v10",
    date: "2026-09-20",
    section: "Design",
    title: "Full favicon set + Apple touch icon",
    body: "Generated proper favicon.ico (16 + 32 px), favicon-16.png, favicon-32.png, and apple-touch-icon.png (180 × 180) from the four-square logo. Every browser and iOS home screen now shows the mark, not a generic Next.js placeholder.",
  },

  // ── v9 · Site interactivity bugfix ───────────────────────
  {
    id: "v9-csp-hydration",
    version: "v9",
    date: "2026-09-20",
    section: "Bugfix",
    title: "Site interactivity restored (CSP hydration fix)",
    body: "The strict CSP was blocking Next.js App Router's inline hydration scripts, which meant every button and onClick handler silently failed to attach on production. Added 'unsafe-inline' to script-src and script-src-elem (necessary for Next 16 App Router hydration) — tightened enough to keep third-party scripts blocked, loose enough that our own client bundle boots. Every button and form now interactive.",
  },

  // ── v7-v8 · Design system + testimonial ──────────────────
  {
    id: "v8-testimonial",
    version: "v8",
    date: "2026-09-20",
    section: "Company",
    title: "Testimonial + Quote component",
    body: "First named client testimonial (SteadFast Transportation Inc.) added, with written permission. New <Quote> component renders short single-line excerpts on tight surfaces and full multi-paragraph quotes on the case study, /reviews, /how-we-work, and /founder pages.",
  },
  {
    id: "v7-design-system",
    version: "v7",
    date: "2026-09-20",
    section: "Design",
    title: "Palette refresh + four-square mark",
    body: "Softened the pure #000 background to #0a0f14 for warmth. Introduced the cyan accent (#10c7eb, from the icon's bottom-right square). Company-first landing page (not BAI-first). New four-square logo mark in the header, footer, hero, favicon, and OG image.",
  },

  // ── v1-v6 · Initial relaunch ─────────────────────────────
  {
    id: "v6-relaunch",
    version: "v1–v6",
    date: "2026-09-20",
    section: "Company",
    title: "doyel-labs.com relaunched as a Doyel Labs LLC company site",
    body: "Rebuilt from scratch as a company site (not a BAI landing page). Next.js App Router + TypeScript + Tailwind, static-exported to Cloudflare Pages. Strict CSP, HSTS, no third-party marketing scripts. BAI moved to /programs/bai; Payroll and Websites became primary services. MDX legal pages. Plausible-only analytics.",
  },

  // ── Product-specific (pre-relaunch) ──────────────────────
  {
    id: "payroll-2026-09-19",
    date: "2026-09-19",
    section: "Payroll",
    title: "SteadFast Payroll: paystub live preview + portal status + YTD auto-fill",
    body: "Paystub live-preview added to the draft screen. Portal status selector (paid / pending / void). YTD gross and YTD net now auto-fill from contractor history.",
  },
  {
    id: "payroll-2026-09-15",
    date: "2026-09-15",
    section: "Payroll",
    title: "SCA wage-determination auto-lookup pipeline",
    body: "Four-step SCA WD pipeline: city + state → geocode → county → SAM.gov active WD → parse base wage + H&W fringe. Recent-lookups pane on the SCA tab. Two-year revision reminder.",
  },
  {
    id: "payroll-2026-09-10",
    date: "2026-09-10",
    section: "Payroll",
    title: "Passkey enrolment + admin recovery",
    body: "WebAuthn passkey enrolment on the operator workspace. Fallback to password (PBKDF2) with rate-limited lockout. Admin password reset via one-time code with 15-minute expiry.",
  },
  {
    id: "bai-2026-09-07",
    date: "2026-09-07",
    section: "BAI",
    title: "Desk engine and watchdog wrapped in a Windows job",
    body: "The desk engine and watchdog now run inside a Windows job object tied to the app. A stopped app leaves no orphan process holding the installation open. Uninstalls are clean.",
  },
  {
    id: "bai-2026-09-06",
    date: "2026-09-06",
    section: "BAI",
    title: "Crash reports strip financial fields",
    body: "Crash reports now drop any field that names positions, orders, fills, dollar amounts, or quantities before they are written to disk. Nothing sensitive leaves the operator's machine, even in a crash.",
  },
  {
    id: "bai-2026-09-06-admin",
    date: "2026-09-06",
    section: "BAI",
    title: "Admin console: per-request nonce CSP + IP allowlist",
    body: "Admin console shipped with a per-request nonce Content Security Policy and an IP allowlist that applies before a token is typed. Reduces attack surface even when a token leaks.",
  },
  {
    id: "cl-2026-09-20",
    date: "2026-09-20",
    section: "ConnectionLoop",
    title: "0.2.106 · Privacy policy names voice-lists + crash-notes flows",
    body: "The privacy policy now explicitly names both the voice-list and crash-notes flows so any user can audit what leaves their device.",
  },
  {
    id: "cl-2026-09-19-email",
    date: "2026-09-19",
    section: "ConnectionLoop",
    title: "Custom sign-in emails from noreply@connectionloop.app via Resend",
    body: "Sign-in emails now send from a first-party address instead of Firebase's default. Email enumeration protection enabled. Password policy ON, minimum length 8.",
  },
  {
    id: "cl-2026-09-19-node22",
    date: "2026-09-19",
    section: "ConnectionLoop",
    title: "Cloud Functions runtime upgraded to Node.js 22",
    body: "The ConnectionLoop backend Cloud Functions runtime moved to Node.js 22.",
  },
];

/** Format a YYYY-MM-DD date for display. */
export function formatChangelogDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Emit RFC 822 for RSS pubDate. */
export function rfc822(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toUTCString();
}
