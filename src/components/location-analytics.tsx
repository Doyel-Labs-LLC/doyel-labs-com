"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { canCollectLocation, locationAnalyticsEnabled } from "@/lib/location-config";

export function LocationAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const privacy = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (!locationAnalyticsEnabled || !canCollectLocation(window.location.origin, pathname) ||
        privacy.globalPrivacyControl === true || navigator.doNotTrack === "1") return;
    // No retries: an interrupted response may already have incremented a count.
    void fetch("/api/analytics/location/", {
      method: "POST", credentials: "omit", mode: "same-origin", cache: "no-store",
      redirect: "error", referrerPolicy: "no-referrer", keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
    }).then((response) => {
      if (!response.ok) console.warn("location_analytics_not_accepted");
    }).catch(() => console.warn("location_analytics_unavailable"));
  }, [pathname]);
  return null;
}
