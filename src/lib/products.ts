import { programStatus } from "@/lib/site";

/**
 * One source of truth for Doyel Labs' *own-brand* products and the stage
 * each one is at. This is deliberately separate from client *services*
 * work (which lives under /services and /work): products are software
 * Doyel Labs ships under its own brand.
 *
 * The visitor's #1 confusion this file exists to kill: "what can I use
 * today vs. what is still being built?" Every surface that renders a
 * product reads its stage from here, so the status vocabulary is
 * identical across Home, Work, Services, and the Products page.
 *
 * Facts (labels, availability, path-to-public) are reused from
 * `programStatus` in `site.ts` — never restate a status in two places.
 */

/**
 * Lifecycle stage. Kept to three so the status reads instantly:
 *   live — shipped and in real use today
 *   beta — real software, private/invite access only
 *   soon — announced, not yet available to anyone outside testing
 *
 * No own-brand product is `live` yet. That is the honest state; the
 * homepage roadmap band says so plainly rather than dressing a beta as
 * a shipped product.
 */
export type Stage = "live" | "beta" | "soon";

export const stageMeta: Record<
  Stage,
  { label: string; blurb: string }
> = {
  live: {
    label: "Live · in use",
    blurb: "Shipped and running in production today.",
  },
  beta: {
    label: "Private beta",
    blurb: "Real software, available by invite while we finish review.",
  },
  soon: {
    label: "Coming soon",
    blurb: "In testing now; not yet open outside the pilot group.",
  },
};

export type Product = {
  key: "bai" | "connectionloop";
  name: string;
  stage: Stage;
  /** One line a prospect reads first. Plain, no hype. */
  tagline: string;
  /** Deep link into the products page. */
  href: string;
  /** Where it runs / who it's for — one short mono line. */
  meta: string;
  image: { src: string; width: number; height: number };
  /** The remaining steps to public. Sourced from programStatus.*.body. */
  pathToPublic: string;
};

export const products: Product[] = [
  {
    key: "bai",
    name: "BAI Desk",
    stage: "beta",
    tagline:
      "An automated trading desk. Your computer, your broker, your rules.",
    href: "/products/#bai",
    meta: "Windows · macOS later · US-only at launch",
    image: { src: "/media/bai/bai-hero.webp", width: 1024, height: 576 },
    pathToPublic: programStatus.bai.body,
  },
  {
    key: "connectionloop",
    name: "ConnectionLoop",
    stage: "soon",
    tagline:
      "A private, shared calendar for families and groups.",
    href: "/products/#connectionloop",
    meta: "iOS · Android · invite-only",
    image: { src: "/media/connectionloop/connectionloop-icon.webp", width: 640, height: 640 },
    pathToPublic: programStatus.connectionloop.body,
  },
];
