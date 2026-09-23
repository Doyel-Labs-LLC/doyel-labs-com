"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { analytics, canCollectAnalytics } from "@/lib/analytics-config";
import { LocationAnalytics } from "./location-analytics";

/**
 * One build-selected provider. Check the actual browser origin before
 * rendering any vendor script: preview builds can share production assets.
 */
export function Analytics() {
  const pathname = usePathname();
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  if (analytics.provider === "none" || !canCollectAnalytics(origin, pathname)) {
    return null;
  }
  if (analytics.provider === "cloudflare") {
    return (
      <>
        <LocationAnalytics />
        <Script
          id="cloudflare-web-analytics"
          type="module"
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: analytics.token })}
        />
      </>
    );
  }
  return (
    <Script
      id="plausible"
      strategy="afterInteractive"
      defer
      data-domain={analytics.domain}
      src="https://plausible.io/js/script.outbound-links.js"
    />
  );
}
