/**
 * One source of truth for Doyel Labs' own-brand products and where each
 * one stands. Home, Work, and About all read this, so the lineup and the
 * status words stay identical everywhere. This is separate from client
 * work (the SteadFast build), which lives on /work/.
 *
 * Status vocabulary is deliberately small — two words a visitor reads
 * instantly. Nothing here is "live" or for sale yet; that is the honest
 * state, said plainly rather than dressing a test build as shipped.
 */
export type ProductStatus = "Early Access" | "In Testing";

export type Product = {
  key: "routewage" | "connectionloop" | "doxiedrop" | "bai";
  name: string;
  status: ProductStatus;
  /** One plain line a prospect reads first. No hype. */
  tagline: string;
  /** Where it runs / who it's for. */
  meta: string;
};

export const products: Product[] = [
  {
    key: "routewage",
    name: "RouteWage",
    status: "Early Access",
    tagline:
      "Payroll software for USPS route operators — SCA wages to the cent, and one clean employment record per worker. It prepares pay runs and records; it does not move money.",
    meta: "Web app · all 50 states",
  },
  {
    key: "connectionloop",
    name: "ConnectionLoop",
    status: "In Testing",
    tagline:
      "A shared calendar, lists, photos, and chat for one family or group. Invite-only, free, no ads, and no public feed.",
    meta: "iOS · Android",
  },
  {
    key: "doxiedrop",
    name: "Doxie Drop",
    status: "In Testing",
    tagline:
      "A fast, friendly arcade dropper — levels, daily dashes, and a cast of characters to unlock. Our first game.",
    meta: "Mobile",
  },
  {
    key: "bai",
    name: "BAI Desk",
    status: "In Testing",
    tagline:
      "An autonomous trading desk that runs on your own computer — at your broker, under your rules. Nothing it does is investment advice.",
    meta: "Windows · US-only at launch",
  },
];
