import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for `output: 'export'` so the sitemap is emitted as a static file.
export const dynamic = "force-static";

const base = `https://${site.domain}`;

const paths = [
  "/",
  "/services/",
  "/services/payroll/",
  "/services/websites/",
  "/work/",
  "/case-studies/steadfast/",
  "/programs/",
  "/programs/bai/",
  "/programs/connectionloop/",
  "/engineering/",
  "/security/",
  "/status/",
  "/changelog/",
  "/changelog/rss.xml",
  "/docs/",
  "/docs/payroll/",
  "/docs/websites/",
  "/docs/bai/",
  "/docs/connectionloop/",
  "/support/",
  "/company/",
  "/legal/terms/",
  "/legal/privacy/",
  "/legal/payroll-data/",
  "/legal/risk/",
  "/contact/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1.0 : 0.7,
  }));
}
