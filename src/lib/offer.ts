/**
 * THE OFFER — single source of truth for every price, inclusion, and
 * timeline on doyel-labs.com. Pages import from here; nothing is typed
 * inline. See PROMPT.md §3. Change this file, then the page.
 */

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const websiteBuild = {
  name: "Website build",
  price: 1299,
  priceLabel: "$1,299",
  terms: "one-time",
  deposit: 650,
  depositLabel: "$650 to start, $650 at launch",
  pages: 5,
  turnaround: "three business days",
  turnaroundNote:
    "The clock starts when your content is in hand — logo, hours, photos, and a paragraph per page. Not when the deposit is paid.",
  includes: [
    "Five pages: home, about, services, contact, plus one of your choice.",
    "Your own domain, on your own registrar. You own the site and the code.",
    "A contact form that delivers to your inbox. Phone and email links that work on a tap.",
    "Mobile-first, fast, and accessible. Built to open in under two seconds on a phone.",
    "No cookie banner — because nothing on the site tracks your visitors.",
    "Search basics done right: titles, descriptions, sitemap, and business schema so Google knows who you are.",
  ],
} as const;

export const carePlan = {
  name: "Care plan",
  price: 99,
  priceLabel: "$99",
  terms: "per month, optional",
  cancel: "Cancel any month. The site stays yours; we hand over the files.",
  editsLimit: "up to 30 minutes of work per week",
  includes: [
    "Hosting, TLS certificate, and backups.",
    "Uptime monitoring, so we usually know before you do.",
    "Small edits included: text, prices, hours, photos — up to 30 minutes of work per week. Larger changes are quoted first.",
    "One person to call. Same number, same hours.",
  ],
} as const;

export const addOns = [
  { name: "Extra page", price: 199, note: "Same build quality, one more page." },
  { name: "Booking or quote-request form", price: 249, note: "Delivered to your inbox like the contact form." },
  { name: "Google Business Profile setup or cleanup", price: 299, note: "Hours, photos, categories, and the map pin, done properly." },
  { name: "Page copywriting", price: 499, note: "We interview you for 20 minutes and write every page." },
] as const;

export const customSoftware = {
  name: "Custom software",
  from: 4000,
  fromLabel: "from $4,000",
  terms: "quoted per project",
  steps: [
    "A one-hour orientation call with a real person — Zoom or phone. Listening, not pitching. No obligation.",
    "A written scope and a fixed price within one business day of the call.",
    "Progress you can see every business day while we build.",
    "You own the code and the accounts it runs in.",
  ],
  billing: "50% to start, 50% at launch. Never hourly.",
} as const;

/** How fast a person replies. One number, used everywhere. */
export const response = {
  window: "within one business day",
  usually: "usually the same day",
} as const;

/** Things we say no to. Scope statements, not company limits. */
export const refused = {
  websites: [
    "No page builders you can't leave. You get real files you can take anywhere.",
    "No tracking pixels, session recorders, or ad scripts on your site.",
    "No dark patterns: no fake countdowns, no forced pop-ups, no hidden fees.",
  ],
  software: [
    "We do not move money, file taxes, or hold funds. Software that prepares records — yes. Software that acts as a bank or payroll processor — no.",
    "We do not build regulated financial products: broker-dealer, adviser, lending, or insurance systems.",
    "We do not build anything we can't explain to you in plain English.",
  ],
} as const;

export const websiteFaq = [
  {
    q: "What do you need from me to start?",
    a: "Your logo (or the name, and we'll set it cleanly), your hours, a few photos, and a paragraph about the business for each page. If writing isn't your thing, the copywriting add-on covers it.",
  },
  {
    q: "Is $1,299 really the whole price?",
    a: "Yes. $650 to start and $650 when the site is live. The only extras are the add-ons listed here, and you choose those. Your domain registration is billed by your registrar, not by us — typically $10–$20 a year.",
  },
  {
    q: "Do I have to take the care plan?",
    a: "No. Without it, we hand you the files and point you at where to host them. With it, we host, back up, and edit the site for $99 a month, and you can cancel any month.",
  },
  {
    q: "What counts as a small edit?",
    a: "Anything that takes us under 30 minutes in a given week: new hours, a price change, swapping photos, a new staff bio. A whole new page or a redesign is quoted separately.",
  },
  {
    q: "Who am I actually talking to?",
    a: "A person at Doyel Labs. The person who takes your first call stays on through the build and answers the phone afterward. There is no chatbot and no ticket queue.",
  },
  {
    q: "What if I already have a website?",
    a: "We can rebuild it on the same domain. Your old site stays up until the new one is ready, so there's no gap.",
  },
] as const;
