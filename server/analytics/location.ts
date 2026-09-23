import type { D1Database } from "@cloudflare/workers-types";
import type { AnalyticsEnv } from "./access";
import type { AnalyticsPreset } from "../../src/lib/analytics-contract";
import { isLocationReport, type LocationReport } from "../../src/lib/location-contract";
import { publishedPaths } from "../../src/lib/public-paths.generated";
import { AnalyticsError, CANONICAL_ORIGIN, errorResponse, jsonResponse } from "./http";
import { dateWindow, rateLimit } from "./provider";

export interface LocationEnv extends AnalyticsEnv {
  LOCATION_ANALYTICS_ENABLED?: string;
  LOCATION_DB?: D1Database;
}

interface EdgeLocation {
  country?: unknown;
  region?: unknown;
  city?: unknown;
}

export const hourSeconds = (now: Date) => Math.floor(now.getTime() / 3600000) * 3600;
const iso = (seconds: number) => new Date(seconds * 1000).toISOString();

export function coarseLocation(cf?: EdgeLocation) {
  const label = (value: unknown) => typeof value === "string" && value.trim().length > 0 &&
    value.trim().length <= 100 && !/\p{Cc}/u.test(value) ? value.trim() : "?";
  return {
    country: typeof cf?.country === "string" && /^[A-Z]{2}$/.test(cf.country) &&
      !["XX", "T1"].includes(cf.country) ? cf.country : "?",
    region: label(cf?.region),
    city: label(cf?.city),
  };
}

async function publishedPath(request: Request): Promise<string> {
  const invalid = () => new AnalyticsError("invalid_request", 400, "A published page path is required.");
  const length = request.headers.get("Content-Length");
  if (!request.body || (length !== null && (!/^\d+$/.test(length) || Number(length) > 512))) throw invalid();
  const reader = request.body.getReader();
  const bytes = new Uint8Array(512);
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (size + value.byteLength > bytes.length) {
        await reader.cancel();
        throw invalid();
      }
      bytes.set(value, size);
      size += value.byteLength;
    }
  } finally {
    reader.releaseLock();
  }
  let body: unknown;
  try {
    body = JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }).decode(bytes.subarray(0, size)));
  } catch {
    throw invalid();
  }
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).length !== 1 ||
      !("path" in body) || typeof body.path !== "string" || body.path.length > 200 ||
      !publishedPaths.includes(body.path)) throw invalid();
  return body.path;
}

export async function handleLocationIngest(request: Request, env: LocationEnv, cf?: EdgeLocation): Promise<Response> {
  try {
    const url = new URL(request.url);
    if (url.origin !== CANONICAL_ORIGIN || request.headers.get("Origin") !== CANONICAL_ORIGIN ||
        (request.headers.has("Sec-Fetch-Site") && request.headers.get("Sec-Fetch-Site") !== "same-origin")) {
      throw new AnalyticsError("forbidden", 403, "Location collection is restricted to public production pages.");
    }
    if (!["/api/analytics/location", "/api/analytics/location/"].includes(url.pathname) || url.search) {
      throw new AnalyticsError("invalid_request", 400, "Invalid collection endpoint.");
    }
    if (request.method !== "POST") {
      const response = jsonResponse({ status: "invalid_request", message: "Only POST is supported." }, 405);
      response.headers.set("Allow", "POST");
      return response;
    }
    if (env.LOCATION_ANALYTICS_ENABLED !== "true" || request.headers.get("Sec-GPC") === "1" ||
        request.headers.get("DNT") === "1") {
      return jsonResponse({ status: "disabled", message: "Location collection is disabled for this request." }, 503);
    }
    if (!/^application\/json(?:;\s*charset=utf-8)?$/i.test(request.headers.get("Content-Type") ?? "") ||
        (request.headers.has("Content-Encoding") && request.headers.get("Content-Encoding") !== "identity") ||
        /prefetch/i.test(`${request.headers.get("Purpose") ?? ""} ${request.headers.get("Sec-Purpose") ?? ""}`)) {
      throw new AnalyticsError("invalid_request", 400, "A JSON pageview request is required.");
    }
    await publishedPath(request); // Validate in memory only; never persist the path.
    if (!env.LOCATION_DB) throw new AnalyticsError("unconfigured", 503, "Location collection is not configured.");
    const geo = coarseLocation(cf);
    const accepted = await env.LOCATION_DB.prepare(`
      INSERT INTO location_hourly (bucket_hour, country, region, city, page_views)
      VALUES (?, ?, ?, ?, 1)
      ON CONFLICT (bucket_hour, country, region, city)
      DO UPDATE SET page_views = location_hourly.page_views + 1
      RETURNING page_views
    `).bind(hourSeconds(new Date()), geo.country, geo.region, geo.city).first<{ page_views: number }>();
    if (!accepted) return jsonResponse({ status: "limited", message: "The daily collection limit has been reached." }, 429);
    return jsonResponse({ status: "accepted" }, 202);
  } catch (error) {
    return errorResponse(error);
  }
}

export function locationReadConfig(env: LocationEnv) {
  if (env.ANALYTICS_ENABLED !== "true") {
    throw new AnalyticsError("disabled", 503, "Dashboard reads are disabled. Location collection is configured separately.");
  }
  if (!env.LOCATION_DB || !env.CONTACT_KV) {
    throw new AnalyticsError("unconfigured", 503, "Location analytics setup is incomplete.");
  }
  return { db: env.LOCATION_DB, kv: env.CONTACT_KV };
}

export async function loadLocationReport(env: LocationEnv, preset: AnalyticsPreset, now = new Date()): Promise<LocationReport> {
  const { db, kv } = locationReadConfig(env);
  await rateLimit(kv, now.getTime(), "locations");
  const window = dateWindow(preset, now);
  const from = Date.parse(window.from) / 1000;
  const through = hourSeconds(now);
  const scope = "bucket_hour >= ? AND bucket_hour <= ?";
  const dimensions = ["country, region, city", "country, region", "country"];
  const results = await db.batch<Record<string, unknown>>([
    db.prepare(`SELECT COALESCE(SUM(page_views), 0) AS pageViews, COUNT(DISTINCT bucket_hour) AS acceptedHours
      FROM location_hourly WHERE ${scope}`).bind(from, through),
    db.prepare("SELECT first_hour FROM location_metadata WHERE singleton = 1"),
    db.prepare("SELECT day_start FROM location_daily_budget WHERE day_start >= ? AND day_start <= ? AND accepted = 5000 ORDER BY day_start")
      .bind(from - from % 86400, through - through % 86400),
    ...dimensions.map((columns) => db.prepare(`
      SELECT ${columns}, SUM(page_views) AS pageViews FROM location_hourly
      WHERE ${scope} GROUP BY ${columns} ORDER BY pageViews DESC, ${columns} LIMIT 21
    `).bind(from, through)),
  ]);
  if (results.some((result) => !result.success)) throw new AnalyticsError("unavailable", 503, "Location analytics is unavailable.");
  const totals = results[0].results[0];
  const first = results[1].results[0]?.first_hour;
  const report = {
    status: totals?.pageViews === 0 ? "empty" : "ready",
    source: "first_party_hourly",
    period: preset,
    from: window.from, to: window.to, updatedAt: now.toISOString(),
    collectionStart: first === undefined ? null : typeof first === "number" ? iso(first) : undefined,
    collectionEnabled: env.LOCATION_ANALYTICS_ENABLED === "true",
    pageViews: totals?.pageViews,
    acceptedHours: totals?.acceptedHours,
    dailyCap: 5000,
    cappedDays: results[2].results.map((row) => typeof row.day_start === "number" ? iso(row.day_start).slice(0, 10) : null),
    breakdowns: Object.fromEntries(["cities", "regions", "countries"].map((key, index) => [
      key, { rows: results[index + 3].results.slice(0, 20), limited: results[index + 3].results.length > 20 },
    ])),
  };
  if (!isLocationReport(report)) throw new AnalyticsError("unavailable", 503, "Location analytics returned invalid aggregates.");
  return report;
}
