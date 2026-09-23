import { analytics, canCollectAnalytics, type AnalyticsProvider } from "./analytics-config";
import { publishedPaths } from "./public-paths.generated";

export function resolveLocationEnabled(value: string | undefined, provider: AnalyticsProvider): boolean {
  if (value === undefined || value === "false") return false;
  if (value !== "true" || provider !== "cloudflare") {
    throw new Error("Location analytics requires an explicit true/false flag and Cloudflare collection mode.");
  }
  return true;
}

export const locationAnalyticsEnabled = resolveLocationEnabled(
  process.env.NEXT_PUBLIC_LOCATION_ANALYTICS_ENABLED, analytics.provider,
);

export function canCollectLocation(origin: string, pathname: string): boolean {
  return canCollectAnalytics(origin, pathname) && publishedPaths.includes(pathname);
}

export function selectLocationPolicy(markdown: string, enabled: boolean): string {
  const sections = [...markdown.matchAll(/<!-- location:(enabled|disabled) -->\r?\n([\s\S]*?)<!-- \/location -->/g)];
  if (sections.length !== 2 || new Set(sections.map((match) => match[1])).size !== 2) {
    throw new Error("Missing or duplicate location privacy section");
  }
  return markdown.replace(/<!-- location:(enabled|disabled) -->\r?\n([\s\S]*?)<!-- \/location -->/g,
    (_match, mode: string, copy: string) => (mode === "enabled") === enabled ? copy.trim() : "");
}
