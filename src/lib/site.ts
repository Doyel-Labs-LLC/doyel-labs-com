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
  supportEmail: "support@doyel-labs.com",
  securityEmail: "security@doyel-labs.com",
  // The BAI control plane. Only /status calls it, from the viewer's own
  // browser, so a Cloudflare Pages deploy needs no server piece.
  apiBase: (
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://bai-control-plane-staging.fly.dev"
  ).replace(/\/$/, ""),
};

/** Company-scale legal line — used in the footer of every page. */
export const companyLegal =
  `${site.company} is a Wyoming limited liability company. Doyel Labs is not a broker-dealer, ` +
  `investment adviser, bank, payroll processor, or money transmitter, and none of its software ` +
  `holds customer money or securities. Trading with the BAI program can lose money, including all of it.`;

/** The BAI-only disclaimer, unchanged in meaning from the existing site. */
export const baiDisclaimer =
  "BAI is software you run on your own computer. It connects to your own brokerage and market-data " +
  "accounts and places orders at your broker under rules you set. Doyel Labs LLC is not a broker-dealer " +
  "or an investment adviser, never holds your funds, and nothing on this site or in the app is a " +
  "recommendation to buy or sell any security. Trading can lose money, including all of it.";

/** Payroll-page disclaimer — narrows what the software does and does not do. */
export const payrollDisclaimer =
  "SteadFast Payroll (the payroll product built by Doyel Labs) is operational software for federal " +
  "service contractors and small operators. It does not file federal or state taxes, does not move " +
  "money, does not run direct deposit, and is not a payroll processor or money transmitter under any " +
  "state law. The operator pays through their own bank; Doyel Labs never touches funds.";

/** Program status chips shown on /programs and each program page. */
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
