/**
 * Facts about the SteadFast Transportation Inc. build, used as the
 * concrete example on `/services/websites`. Every claim here maps to a
 * file in `C:\Users\bdoye\Desktop\index\` (kept out of git).
 */

export const steadfastCase = {
  domain: "steadfasttransportationinc.com",
  liveUrl: "https://www.steadfasttransportationinc.com/",
  operator: "SteadFast Transportation Inc. (Plentywood, MT)",
  what:
    "A federal service contractor operating USPS contract-delivery routes across rural Montana and North Dakota.",
  built: [
    "Home, About, Services, Routes, Contractors, FAQ, Contact, Thank you, Privacy, Terms",
    "Sticky mobile-first nav with focus states and a skip-link",
    "schema.org Organization, PostalAddress and telephone markup",
    "System-fonts fallback, print-media font preload, no render-blocking CSS",
    "Formspree contact + contractor-inquiry with honeypot",
    "Privacy-friendly analytics (Plausible) plus Microsoft Clarity for session review",
    "OpenGraph and Twitter card art for social previews",
    "Password-gated operator workspace on the same domain — the SteadFast Payroll app",
  ],
  ships: [
    "Custom domain on the operator's own registrar",
    "Deploys to Netlify or Cloudflare — the operator picks the host",
    "Editing docs so the operator changes prices and copy without a developer",
    "Contact and inquiry forms wired to the operator's own inbox",
    "Basic SEO: sitemap, robots, schema, canonical, per-page metadata",
  ],
  doesNotShip: [
    "Booking / CRM / ATS features unless the operator names a real system to talk to",
    "A public brochure with invented case studies or stock team photos",
    "Marketing pixels the operator did not agree to install",
  ],
};
