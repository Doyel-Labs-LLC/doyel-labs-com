export type AnalyticsProvider = "none" | "plausible" | "cloudflare";
export type AnalyticsConfig =
  | { provider: "none" }
  | { provider: "plausible"; domain: string }
  | { provider: "cloudflare"; token: string };

export const ANALYTICS_ORIGIN = "https://doyel-labs.com";

export function resolveAnalyticsConfig(input: {
  provider?: string;
  plausibleDomain?: string;
  cloudflareToken?: string;
}): AnalyticsConfig {
  const provider = input.provider || (input.plausibleDomain ? "plausible" : "none");
  if (provider === "none") return { provider };
  if (provider === "plausible" && input.plausibleDomain === "doyel-labs.com") {
    return { provider, domain: input.plausibleDomain };
  }
  if (provider === "cloudflare" && typeof input.cloudflareToken === "string" && /^[a-f0-9]{32}$/.test(input.cloudflareToken)) {
    return { provider, token: input.cloudflareToken };
  }
  throw new Error("Invalid public analytics configuration. Select none, or configure exactly one supported provider.");
}

export const analytics = resolveAnalyticsConfig({
  provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  cloudflareToken: process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN,
});

export const analyticsLabel = {
  none: "No visitor analytics",
  plausible: "Plausible Analytics",
  cloudflare: "Cloudflare Web Analytics",
}[analytics.provider];

export function canCollectAnalytics(origin: string, pathname: string): boolean {
  return origin === ANALYTICS_ORIGIN &&
    pathname.startsWith("/") && !pathname.startsWith("//") && !pathname.includes("\\") &&
    !/^\/(?:admin|api|_next)/i.test(pathname) &&
    !pathname.includes("%");
}

export function analyticsCsp(config: AnalyticsConfig) {
  if (config.provider === "plausible") return { script: "https://plausible.io", connect: "https://plausible.io" };
  if (config.provider === "cloudflare") return {
    script: "https://static.cloudflareinsights.com/beacon.min.js",
    connect: "https://cloudflareinsights.com",
  };
  return { script: "", connect: "" };
}

export function selectAnalyticsPolicy(markdown: string, provider: AnalyticsProvider): string {
  const seen = new Set<string>();
  const result = markdown.replace(
    /<!-- analytics:(none|plausible|cloudflare) -->\r?\n([\s\S]*?)<!-- \/analytics -->/g,
    (_match, mode: string, copy: string) => {
      if (seen.has(mode)) throw new Error("Duplicate analytics privacy section");
      seen.add(mode);
      return mode === provider ? copy.trim() : "";
    },
  );
  if (seen.size !== 3 || !seen.has(provider)) throw new Error("Missing analytics privacy section");
  return result;
}
