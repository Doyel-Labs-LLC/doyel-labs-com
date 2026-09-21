import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for `output: 'export'` so the sitemap is emitted as a static file.
export const dynamic = "force-static";

const base = `https://${site.domain}`;

/**
 * Sitemap entries.
 *
 * `priority` signals the RELATIVE importance of pages to a crawler
 * within this site — not authority vs. other sites. We put the
 * software-studio surfaces at the top (services, pricing, industries,
 * case studies) so a re-crawl re-prioritizes them over the older
 * BAI-first pages that Google has cached.
 */
type Entry = { path: string; priority: number; change: "daily" | "weekly" | "monthly" | "yearly" };

const entries: Entry[] = [
  // Front door
  { path: "/", priority: 1.0, change: "weekly" },
  // What we sell (highest priority after home)
  { path: "/services/", priority: 0.95, change: "weekly" },
  { path: "/services/websites/", priority: 0.95, change: "weekly" },
  { path: "/services/payroll/", priority: 0.95, change: "weekly" },
  { path: "/pricing/", priority: 0.9, change: "monthly" },
  { path: "/industries/", priority: 0.9, change: "monthly" },
  { path: "/industries/federal-service-contractors/", priority: 0.85, change: "monthly" },
  // Proof
  { path: "/work/", priority: 0.85, change: "weekly" },
  { path: "/case-studies/steadfast/", priority: 0.85, change: "monthly" },
  { path: "/reviews/", priority: 0.85, change: "monthly" },
  { path: "/writing/", priority: 0.8, change: "weekly" },
  { path: "/writing/ai-native-software-what-we-write-what-we-generate/", priority: 0.8, change: "monthly" },
  { path: "/writing/shipping-steadfast-payroll-in-six-weeks/", priority: 0.8, change: "monthly" },
  // Consultative entry points
  { path: "/how-we-work/", priority: 0.9, change: "monthly" },
  { path: "/start/", priority: 0.85, change: "monthly" },
  { path: "/contact/", priority: 0.8, change: "monthly" },
  { path: "/faq/", priority: 0.75, change: "monthly" },
  // Company info
  { path: "/company/", priority: 0.7, change: "monthly" },
  { path: "/engineering/", priority: 0.7, change: "monthly" },
  { path: "/security/", priority: 0.7, change: "monthly" },
  // Support surfaces
  { path: "/support/", priority: 0.65, change: "monthly" },
  { path: "/docs/", priority: 0.6, change: "monthly" },
  { path: "/docs/websites/", priority: 0.6, change: "monthly" },
  { path: "/docs/payroll/", priority: 0.6, change: "monthly" },
  { path: "/docs/bai/", priority: 0.5, change: "monthly" },
  { path: "/docs/connectionloop/", priority: 0.5, change: "monthly" },
  // Programs — internal products, lower priority than services
  { path: "/programs/", priority: 0.6, change: "monthly" },
  { path: "/programs/bai/", priority: 0.55, change: "monthly" },
  { path: "/programs/connectionloop/", priority: 0.55, change: "monthly" },
  // Ops
  { path: "/status/", priority: 0.5, change: "weekly" },
  { path: "/changelog/", priority: 0.5, change: "weekly" },
  { path: "/changelog/rss.xml", priority: 0.5, change: "weekly" },
  // Legal — lowest priority
  { path: "/legal/terms/", priority: 0.4, change: "yearly" },
  { path: "/legal/privacy/", priority: 0.4, change: "yearly" },
  { path: "/legal/payroll-data/", priority: 0.4, change: "yearly" },
  { path: "/legal/risk/", priority: 0.4, change: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return entries.map(({ path, priority, change }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: change,
    priority,
  }));
}
