"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/site";

/**
 * Analytics injection point.
 *
 * Plausible only. Cookieless. No personal data. No inline scripts, so
 * the CSP does not need `'unsafe-inline'` for `script-src`. If
 * `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is unset, no script tag renders and
 * the marketing pages emit zero third-party network I/O.
 *
 * Do NOT add session-replay tools (Clarity, FullStory, Hotjar, LogRocket)
 * here. See `src/lib/site.ts` for the reasoning.
 */
export function Analytics() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || !analytics.plausibleDomain) {
    return null;
  }
  return (
    <Script
      id="plausible"
      strategy="afterInteractive"
      defer
      data-domain={analytics.plausibleDomain}
      src="https://plausible.io/js/script.outbound-links.js"
    />
  );
}
