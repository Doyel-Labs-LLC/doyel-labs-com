/**
 * One place for company-level facts. Anything that names Doyel Labs
 * itself, its city, its contact details, or the disclaimers used across
 * pages, lives here. Prices and timelines live in `offer.ts`.
 */
export const site = {
  /** Exact legal name as filed with the Wyoming Secretary of State. */
  company: "Doyel Labs LLC",
  companyShort: "Doyel Labs",
  domain: "doyel-labs.com",
  city: "Casper, Wyoming",
  founded: "September 2026",
  founder: "Blake Doyel",
  supportEmail: "support@doyel-labs.com",
  securityEmail: "security@doyel-labs.com",
  phone: "(307) 429-0389",
  phoneHref: "tel:+13074290389",
  hours: "Monday–Friday, 9:00 a.m.–6:00 p.m. Mountain",
  hoursShort: "Mon–Fri, 9–6 Mountain",
};

/** Company positioning, one line. Read before writing copy anywhere. */
export const positioning =
  "Doyel Labs builds websites and custom software for businesses. Real people build it. A real person answers.";

/** The promise. Used verbatim in the hero and the footer. */
export const promise = {
  headline: "Real people build it. A real person answers.",
  body:
    "AI builds most of what we ship. A person checks it, and a person is who you talk to — on the first call, during the build, and any time something needs attention afterward. No chatbot, no screening AI, no ticket queue.",
} as const;

/** Footer legal line — every page, small. */
export const companyLegal =
  `${site.company} is a Wyoming limited liability company. It is not a payroll processor, ` +
  `money transmitter, broker-dealer, or investment adviser.`;

/** BAI-only disclaimer — /work/#lab and /legal/bai/* only. Never in the footer. */
export const baiDisclaimer =
  "BAI is software you run on your own computer. It connects to your own brokerage and market-data " +
  "accounts and places orders at your broker under rules you set. Doyel Labs LLC is not a broker-dealer " +
  "or an investment adviser, never holds your funds, and nothing on this site or in the app is a " +
  "recommendation to buy or sell any security. Trading can lose money, including all of it.";

/** Payroll-scope disclaimer — /software/ only. */
export const payrollDisclaimer =
  "Payroll workspaces we build prepare pay runs and records. They do not file taxes, move money, " +
  "or run direct deposit, and Doyel Labs is not a payroll processor or money transmitter. " +
  "You pay through your own bank; Doyel Labs never touches funds.";

export const programStatus = {
  bai: { label: "Private beta", body: "In private testing with a small group of operators." },
  connectionloop: { label: "In private testing", body: "A shared calendar, lists, notes, and photos for one family or group. Invite-only." },
} as const;
