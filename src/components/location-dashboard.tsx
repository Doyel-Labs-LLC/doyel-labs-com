"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnalyticsPreset } from "@/lib/analytics-contract";
import { isLocationReport, type LocationReport, type LocationRow } from "@/lib/location-contract";

type State = { kind: "loading" | "paused" } | { kind: "error"; message: string } | { kind: "report"; report: LocationReport };
const failures: Record<string, string> = {
  disabled: "Location reads are disabled. Collection is configured separately.",
  unconfigured: "Location analytics is not configured. No counts were loaded.",
  unauthorized: "Sign in again to load location counts.",
  forbidden: "Location counts are restricted to the approved owner and production domain.",
  rate_limited: "Location refresh limit reached. Wait a minute and try again.",
};
const control = "min-h-11 rounded-md border border-line2 bg-surface px-4 py-2 text-base text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";
const number = new Intl.NumberFormat("en-US");
const countries = new Intl.DisplayNames(["en"], { type: "region" });
const timestamp = (value: string) => new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC", month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
}).format(new Date(value));
function label(row: LocationRow) {
  const country = row.country === "?" ? "Unknown country" : countries.of(row.country) ?? row.country;
  return [
    row.city === undefined ? null : row.city === "?" ? "Unknown city" : row.city,
    row.region === undefined ? null : row.region === "?" ? "Unknown region" : row.region,
    country,
  ].filter(Boolean).join(", ");
}

export function LocationDashboard() {
  const [preset, setPreset] = useState<AnalyticsPreset>("7d");
  const [state, setState] = useState<State>({ kind: "loading" });
  const [cooldown, setCooldown] = useState(false);
  const active = useRef<AbortController | null>(null);
  const cooling = useRef<ReturnType<typeof setTimeout> | null>(null);
  const load = useCallback(async () => {
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setState({ kind: "loading" });
    setCooldown(true);
    if (cooling.current) clearTimeout(cooling.current);
    cooling.current = setTimeout(() => setCooldown(false), 10000);
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`/api/admin/analytics/locations/?period=${preset}`, {
        credentials: "same-origin", cache: "no-store", redirect: "error", signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!response.headers.get("Content-Type")?.includes("application/json")) throw new Error("Invalid response");
      const body: unknown = await response.json();
      if (active.current !== controller) return;
      if (response.ok && isLocationReport(body)) setState({ kind: "report", report: body });
      else {
        const code = body && typeof body === "object" && "status" in body && typeof body.status === "string" ? body.status : "";
        setState({ kind: "error", message: Object.hasOwn(failures, code) ? failures[code] : "Location counts are unavailable. No counts were loaded." });
      }
    } catch {
      if (active.current === controller) setState({ kind: "error", message: "Location counts are unavailable. No counts were loaded." });
    } finally {
      clearTimeout(timeout);
    }
  }, [preset]);
  useEffect(() => {
    void load();
    function clear() {
      active.current?.abort();
      active.current = null;
      setState({ kind: "paused" });
    }
    function visibility() { if (document.visibilityState === "hidden") clear(); }
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pagehide", clear);
    return () => {
      active.current?.abort();
      active.current = null;
      if (cooling.current) clearTimeout(cooling.current);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pagehide", clear);
    };
  }, [load]);
  const report = state.kind === "report" ? state.report : null;
  return (
    <section aria-labelledby="locations-title" className="mt-10 border-t border-line pt-8">
      <h2 id="locations-title" className="text-2xl font-semibold">Approximate cities and regions</h2>
      <p className="mt-3 max-w-prose text-mute">First-party accepted pageviews, not unique visitors. This independent source does not match Cloudflare Web Analytics visits or sampled estimates. VPNs and mobile networks can mislocate activity; unknown locations are included.</p>
      <div className="my-6 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="locations-period" className="mb-2 block text-sm text-mute">Locations date range (UTC)</label>
          <select id="locations-period" className={control} value={preset} disabled={state.kind === "loading"}
            onChange={(event) => setPreset(event.target.value as AnalyticsPreset)}>
            <option value="24h">Last 24 hours</option><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option>
          </select>
        </div>
        <button className={control} disabled={state.kind === "loading" || cooldown} onClick={() => void load()}>Refresh locations</button>
      </div>
      <div aria-live="polite" aria-atomic="true" className="mb-5 text-mute">
        {state.kind === "loading" && <p>Loading location counts...</p>}
        {state.kind === "paused" && <p>Location counts cleared while this tab was away. Refresh to load again.</p>}
        {state.kind === "error" && <p>{state.message}</p>}
      </div>
      {report && <>
        <p className="text-sm text-mute">{timestamp(report.from)} to {timestamp(report.to)} UTC. Current hour is partial.</p>
        <div className="my-5 rounded-lg border border-line2 bg-surface p-6">
          <h3 className="text-base text-mute">Accepted location pageviews</h3>
          <p className="mt-2 text-4xl font-semibold tabular-nums">{number.format(report.pageViews)}</p>
        </div>
        <div className="mb-6 max-w-prose space-y-3 text-sm text-mute">
          <p>{report.collectionStart ? `First accepted data: ${timestamp(report.collectionStart)} UTC.` : "Collection has not received any data yet."} New data only; no historical backfill. {report.acceptedHours} hours with accepted data in this range; other hours are not proof of no visits.</p>
          {!report.collectionEnabled && <p>Collection is currently switched off. Previously retained counts may still appear.</p>}
          {report.status === "empty" && <p>No accepted location pageviews in this range. Disabled or blocked delivery can cause missing data.</p>}
          <p>Coverage is incomplete: blocked beacons, privacy signals, outages, and disabled periods can omit activity. Collection is capped at 5,000 accepted pageviews per UTC day.</p>
          {report.cappedDays.length > 0 && <p className="font-medium text-ink">Daily cap reached: {report.cappedDays.join(", ")}. These dates may have partial counts; excluded pageviews are not estimated.</p>}
          <p>Hourly aggregates retained for about 31 days with hourly cleanup. Bucket boundaries or delayed cleanup can extend this slightly. Provider backups may retain deleted aggregates up to 30 additional days.</p>
        </div>
        {report.status === "ready" && <div className="grid gap-5 lg:grid-cols-3">
          {(["cities", "regions", "countries"] as const).map((key) => (
            <section key={key} className="min-w-0 rounded-lg border border-line2 bg-surface p-5">
              <h3 className="mb-3 text-xl font-medium">Top {key}</h3>
              <table className="w-full table-fixed text-left">
                <caption className="sr-only">Approximate {key} by accepted location pageviews</caption>
                <thead><tr className="border-b border-line2 text-sm text-mute"><th scope="col" className="w-3/4 py-3 font-normal">Location</th><th scope="col" className="text-right font-normal">Views</th></tr></thead>
                <tbody>{report.breakdowns[key].rows.map((row) => <tr key={JSON.stringify([row.country, row.region, row.city])} className="border-b border-line">
                  <th scope="row" className="break-words py-3 pr-3 font-normal">{label(row)}</th><td className="text-right tabular-nums">{number.format(row.pageViews)}</td>
                </tr>)}</tbody>
              </table>
              {report.breakdowns[key].limited && <p className="mt-3 text-sm text-mute">Top 20 only; remaining locations are omitted from this table, not from the total.</p>}
            </section>
          ))}
        </div>}
      </>}
    </section>
  );
}
