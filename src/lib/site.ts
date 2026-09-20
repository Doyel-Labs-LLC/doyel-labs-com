/**
 * One place for company-level facts. Anything that names Doyel Labs
 * itself, its city, its addresses, its status page target, or the
 * disclaimers used across pages, lives here.
 */
export const site = {
  company: "Doyel Labs LLC",
  companyShort: "Doyel Labs",
  domain: "doyel-labs.com",
  city: "Casper, Wyoming",
  founded: "September 2026",
  supportEmail: "support@doyel-labs.com",
  securityEmail: "security@doyel-labs.com",
  phone: "(813) 686-4559",
  phoneHref: "tel:+18136864559",
  apiBase: (
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://bai-control-plane-staging.fly.dev"
  ).replace(/\/$/, ""),
};

/**
 * One-line company positioning. Read this before you write copy anywhere
 * else. This is what Doyel Labs *is*, not a marketing line. Never
 * mentions size or headcount — the customer hires us for what we ship,
 * not for how many chairs are in the office.
 */
export const positioning =
  "Doyel Labs builds the software your business runs on. We use AI to ship fast, and we stay on to keep it running.";

/** Company-scale legal line — footer only, small. */
export const companyLegal =
  `${site.company} is a Wyoming limited liability company. Doyel Labs is not a broker-dealer, ` +
  `investment adviser, bank, payroll processor, or money transmitter, and none of its software ` +
  `holds customer money or securities. Trading with the BAI program can lose money, including all of it.`;

/** BAI-only disclaimer — used on /programs/bai/. */
export const baiDisclaimer =
  "BAI is software you run on your own computer. It connects to your own brokerage and market-data " +
  "accounts and places orders at your broker under rules you set. Doyel Labs LLC is not a broker-dealer " +
  "or an investment adviser, never holds your funds, and nothing on this site or in the app is a " +
  "recommendation to buy or sell any security. Trading can lose money, including all of it.";

/** Payroll-page disclaimer — narrows what the software does. */
export const payrollDisclaimer =
  "The payroll product prepares pay runs and records; it does not file taxes, does not move money, " +
  "does not run direct deposit, and is not a payroll processor or money transmitter under any state law. " +
  "The operator pays through their own bank; Doyel Labs never touches funds.";

export const programStatus = {
  bai: {
    label: "NOT SHIPPING · 2027",
    body: "In private testing. Public availability, if any, no earlier than 2027.",
  },
  connectionloop: {
    label: "STORE SUBMISSION THIS MONTH",
    body: "In private testing with the Hamilton Family. Store review pending; App Check enforcement and attorney sign-off still open.",
  },
} as const;

/**
 * Analytics. Plausible only. Injected from `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
 * at build time; if unset, no script renders and no third-party network
 * I/O occurs on marketing pages.
 */
export const analytics = {
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
};
