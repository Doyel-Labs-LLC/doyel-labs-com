import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * XML sitemap. Lists the eight public pages and the legal documents.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const now = new Date();
  const entries: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/websites/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/software/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/how-we-work/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
    { path: "/security/", priority: 0.4, changeFrequency: "monthly" },
    { path: "/legal/terms/", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/privacy/", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/payroll-data/", priority: 0.1, changeFrequency: "yearly" },
    { path: "/legal/risk/", priority: 0.1, changeFrequency: "yearly" },
    { path: "/legal/bai/terms/", priority: 0.1, changeFrequency: "yearly" },
    { path: "/legal/bai/privacy/", priority: 0.1, changeFrequency: "yearly" },
  ];
  return entries.map((e) => ({
    url: `${base}${e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
