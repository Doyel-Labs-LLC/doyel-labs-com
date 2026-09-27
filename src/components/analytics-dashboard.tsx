"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnalyticsFailureCode, AnalyticsPreset, AnalyticsReport, BreakdownKey } from "@/lib/analytics-contract";
import { isAnalyticsReport } from "@/lib/analytics-contract";
import { LocationDashboard } from "./location-dashboard";

type State =
  | { kind: "loading" }
  | { kind: "paused" }
  | { kind: "error"; code: AnalyticsFailureCode }
  | { kind: "report"; report: AnalyticsReport };

const messages: Record<AnalyticsFailureCode, { title: string; detail: string }> = {
  disabled: { title: "Dashboard reads are disabled", detail: "Visitor collection is configured separately. No metrics were loaded." },
  unconfigured: { title: "Setup is incomplete", detail: "The required production configuration must be verified before analytics can load." },
  unauthorized: { title: "Sign in again", detail: "Your Access session is missing or expired." },
  forbidden: { title: "Access denied", detail: "This dashboard is restricted to its approved owner and production domain." },
  invalid_request: { title: "Choose a date preset", detail: "Select one of the available date ranges and try again." },
  rate_limited: { title: "Refresh limit reached", detail: "Wait a minute before trying again." },
  unavailable: { title: "Analytics is unavailable", detail: "No metrics were loaded. Try again later." },
  schema_unavailable: { title: "Provider setup needs review", detail: "The required analytics contract could not be verified. No metrics were loaded." },
  not_found: { title: "Analytics was not found", detail: "The private API may not be deployed yet." },
};
const sections: Array<[BreakdownKey, string]> = [
  ["paths", "Popular pages"], ["referrers", "Referral hosts"], ["countries", "Countries"],
  ["devices", "Devices"], ["browsers", "Browsers"], ["operatingSystems", "Operating systems"],
];
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const timestamp = (value: string) => new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
}).format(new Date(value));
const control = "min-h-11 rounded-md border border-line2 bg-surface px-4 py-2 text-base text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";

export function AnalyticsDashboard() {
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
      const response = await fetch(`/api/admin/analytics/?period=${preset}`, {
        credentials: "same-origin", cache: "no-store", redirect: "error", signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!response.headers.get("Content-Type")?.includes("application/json")) throw new Error("Invalid response");
      const body: unknown = await response.json();
      if (active.current !== controller) return;
      if (response.ok && isAnalyticsReport(body)) {
        setState({ kind: "report", report: body });
      } else {
        const code = body && typeof body === "object" && "status" in body &&
          typeof body.status === "string" && Object.hasOwn(messages, body.status)
          ? body.status as AnalyticsFailureCode : "unavailable";
        setState({ kind: "error", code });
      }
    } catch {
      if (active.current === controller) setState({ kind: "error", code: "unavailable" });
    } finally {
      clearTimeout(timeout);
    }
  }, [preset]);

  useEffect(() => {
    void load();
    function clear() {
      if (document.visibilityState !== "hidden") return;
      active.current?.abort();
      active.current = null;
      setState({ kind: "paused" });
    }
    function pageHide() {
      active.current?.abort();
      active.current = null;
      setState({ kind: "paused" });
    }
    document.addEventListener("visibilitychange", clear);
    window.addEventListener("pagehide", pageHide);
    return () => {
      active.current?.abort();
      active.current = null;
      if (cooling.current) clearTimeout(cooling.current);
      document.removeEventListener("visibilitychange", clear);
      window.removeEventListener("pagehide", pageHide);
    };
  }, [load]);

  const report = state.kind === "report" ? state.report : null;
  const error = state.kind === "error" ? messages[state.code] : null;
  return (
    <main id="main" className="mx-auto max-w-band px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-5 border-b border-line pb-7">
        <div>
          <p className="mb-2 text-sm text-accent">Doyel Labs / Private</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Website analytics</h1>
          <p className="mt-3 max-w-prose text-base text-mute">Aggregate activity, not individual visitors.</p>
        </div>
        <a href="/cdn-cgi/access/logout" className={control}>Sign out</a>
      </header>
      <div className="mb-7 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="analytics-period" className="mb-2 block text-sm text-mute">Date range (UTC)</label>
          <select id="analytics-period" value={preset} className={control}
            disabled={state.kind === "loading"}
            onChange={(event) => setPreset(event.target.value as AnalyticsPreset)}>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
        <button className={control} disabled={state.kind === "loading" || cooldown} onClick={() => void load()}>
          {state.kind === "loading" ? "Loading..." : cooldown ? "Please wait..." : "Refresh"}
        </button>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true" className="mb-6 text-mute">
        {state.kind === "loading" && "Loading aggregate analytics..."}
        {state.kind === "paused" && "Metrics cleared while this tab was away. Refresh to load again."}
        {error && <><h2 className="mb-2 text-xl font-medium text-ink">{error.title}</h2><p>{error.detail}</p></>}
        {state.kind === "error" && state.code === "unauthorized" && (
          <a href="/admin/analytics/" className="mt-4 inline-block text-accent underline underline-offset-4">Reload and sign in</a>
        )}
        {report && <p>Updated {timestamp(report.updatedAt)} UTC. Current period is partial.</p>}
      </div>
      {report?.status === "empty" && (
        <section className="rounded-lg border border-line2 bg-surface p-6">
          <h2 className="text-xl font-medium">No reported activity</h2>
          <p className="mt-2 text-mute">The provider returned no page views for this range. This does not prove nobody visited. Collection, delivery, or reporting delay may affect results.</p>
        </section>
      )}
      {report?.status === "ready" && (
        <>
          <p className="mb-4 text-sm text-mute">{timestamp(report.from)} to {timestamp(report.to)} UTC</p>
          <div className="mb-7 grid gap-4 sm:grid-cols-2">
            {[["Page views", report.pageViews], ["Visits", report.visits]].map(([title, value]) => (
              <section key={title} className="rounded-lg border border-line2 bg-surface p-6">
                <h2 className="text-base text-mute">{title}</h2>
                <p className="mt-2 text-4xl font-semibold tabular-nums">{number.format(Number(value))}</p>
              </section>
            ))}
          </div>
          <p className="mb-7 text-sm text-mute">
            {report.sampled
              ? "Sampled estimates. Counts are scaled by the provider; totals and breakdowns may differ."
              : "No sampling reported for these results. Blocked or missing beacons can still undercount activity."}
          </p>
          <section className="mb-7 rounded-lg border border-line2 bg-surface p-5 sm:p-6">
            <h2 className="mb-5 text-xl font-medium">{report.granularity === "hour" ? "Hourly" : "Daily"} trend</h2>
            <div className="flex h-28 items-end gap-1" aria-hidden="true">
              {report.trend.map((row) => (
                <div key={row.time} className="min-w-0 flex-1 rounded-t bg-accent"
                  style={{ height: `${Math.max(1, row.pageViews / Math.max(1, ...report.trend.map((point) => point.pageViews)) * 100)}%` }} />
              ))}
            </div>
            <p className="mt-3 text-sm text-mute">Reported time buckets only. Missing intervals are not filled with zeros.</p>
            <details className="mt-5">
              <summary className="min-h-11 cursor-pointer py-2 text-accent">View trend values</summary>
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Reported time buckets in UTC. Missing buckets are not filled with zeros.</caption>
                <thead><tr className="border-b border-line2"><th scope="col" className="py-3">UTC</th><th scope="col" className="text-right">Views</th><th scope="col" className="text-right">Visits</th></tr></thead>
                <tbody>{report.trend.map((row) => (
                  <tr key={row.time} className="border-b border-line"><th scope="row" className="py-3 font-normal">{timestamp(row.time)}</th><td className="text-right tabular-nums">{number.format(row.pageViews)}</td><td className="text-right tabular-nums">{number.format(row.visits)}</td></tr>
                ))}</tbody>
              </table>
            </details>
          </section>
          <div className="grid gap-5 md:grid-cols-2">
            {sections.map(([key, title]) => (
              <section key={key} className="min-w-0 rounded-lg border border-line2 bg-surface p-5 sm:p-6">
                <h2 className="mb-3 text-xl font-medium">{title}</h2>
                <table className="w-full table-fixed text-left text-base">
                  <caption className="sr-only">{title} by page views</caption>
                  <thead><tr className="border-b border-line2 text-sm text-mute"><th scope="col" className="w-3/4 py-3 font-normal">Name</th><th scope="col" className="text-right font-normal">Views</th></tr></thead>
                  <tbody>{report.breakdowns[key].rows.map((row) => (
                    <tr key={row.label} className="border-b border-line"><th scope="row" className="break-words py-3 pr-4 font-normal">{row.label}</th><td className="text-right tabular-nums">{number.format(row.pageViews)}</td></tr>
                  ))}</tbody>
                </table>
                {report.breakdowns[key].limited && <p className="mt-3 text-sm text-mute">Top results only; normalized groups may be partial.</p>}
              </section>
            ))}
          </div>
        </>
      )}
      <LocationDashboard />
      <footer className="mt-8 max-w-prose border-t border-line pt-6 text-sm leading-relaxed text-mute">
        <p>Visits are arrivals from another website or a direct link, not unique people. No names, IP addresses, reading time, or individual browsing history are shown.</p>
        <p className="mt-3">When activated, this dashboard reads Cloudflare Web Analytics. Paths are limited to published pages; query strings, fragments, and unknown paths are not displayed. Countries are approximate. No automatic refresh.</p>
      </footer>
    </main>
  );
}
