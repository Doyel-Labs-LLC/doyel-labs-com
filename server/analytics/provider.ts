import type { AnalyticsPreset, AnalyticsReport, AnalyticsRow, BreakdownKey } from "../../src/lib/analytics-contract";
import type { AnalyticsEnv, QueryLimitStore } from "./access";
import { publicPaths } from "./admin-assets.generated";
import { AnalyticsError, CANONICAL_ORIGIN, readBoundedJson, record } from "./http";

const ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";
const GROUP = "AccountRumPageloadEventsAdaptiveGroups";
const dimensionFields: Record<BreakdownKey, string> = {
  paths: "requestPath", referrers: "refererHost", countries: "countryName",
  devices: "deviceType", browsers: "userAgentBrowser", operatingSystems: "userAgentOS",
};
const keys = Object.keys(dimensionFields) as BreakdownKey[];
const MAX_ROWS = 21;
const TIMEOUT_MS = 8000;

export function dateWindow(preset: AnalyticsPreset, now = new Date()) {
  const to = now.toISOString();
  const from = new Date(now);
  if (preset === "24h") from.setUTCHours(from.getUTCHours() - 23, 0, 0, 0);
  else {
    from.setUTCDate(from.getUTCDate() - (preset === "7d" ? 6 : 29));
    from.setUTCHours(0, 0, 0, 0);
  }
  return { from: from.toISOString(), to, granularity: preset === "24h" ? "hour" as const : "day" as const };
}

export function parsePreset(url: URL): AnalyticsPreset {
  if ([...url.searchParams.keys()].some((key) => key !== "period") || url.searchParams.getAll("period").length > 1) {
    throw new AnalyticsError("invalid_request", 400, "Choose a supported date preset.");
  }
  const preset = url.searchParams.get("period") ?? "7d";
  if (preset !== "24h" && preset !== "7d" && preset !== "30d") {
    throw new AnalyticsError("invalid_request", 400, "Choose a supported date preset.");
  }
  return preset;
}

export function providerConfig(env: AnalyticsEnv) {
  if (env.ANALYTICS_ENABLED !== "true") {
    throw new AnalyticsError("disabled", 503, "Dashboard reads are disabled. Visitor collection is configured separately.");
  }
  if (
    !env.CF_ACCOUNT_ID || !/^[a-f0-9]{32}$/.test(env.CF_ACCOUNT_ID) ||
    !env.CF_WEB_ANALYTICS_SITE_TAG || !/^[a-f0-9]{32}$/.test(env.CF_WEB_ANALYTICS_SITE_TAG) ||
    !env.CF_ANALYTICS_API_TOKEN || !env.CONTACT_KV
  ) {
    throw new AnalyticsError("unconfigured", 503, "Analytics setup is incomplete.");
  }
  return { account: env.CF_ACCOUNT_ID, site: env.CF_WEB_ANALYTICS_SITE_TAG, token: env.CF_ANALYTICS_API_TOKEN, kv: env.CONTACT_KV };
}

export async function rateLimit(kv: QueryLimitStore, now = Date.now()): Promise<void> {
  // Existing Pages KV: no visitor data or identifiers. Best-effort across
  // locations because KV is eventually consistent, not an atomic limiter.
  const key = `analytics:owner:${Math.floor(now / 60000)}`;
  try {
    const value = await kv.get(key);
    if (value !== null && !/^[0-6]$/.test(value)) throw new Error("Invalid limiter state");
    const count = value === null ? 0 : Number(value);
    if (count >= 6) throw new AnalyticsError("rate_limited", 429, "Too many refreshes. Try again in a minute.");
    await kv.put(key, String(count + 1), { expirationTtl: 120 });
  } catch (error) {
    if (error instanceof AnalyticsError) throw error;
    throw new AnalyticsError("unavailable", 503, "Analytics query limits are temporarily unavailable.");
  }
}

// This narrow contract check is deliberately not a schema explorer. The
// live authenticated schema must confirm every field/type before any data query.
export const SCHEMA_QUERY = `query AnalyticsContract {
  account: __type(name: "account") { fields { name args { name type { ...Ref } } type { ...Ref } } }
  accountFilter: __type(name: "AccountFilter_InputObject") { inputFields { name type { ...Ref } } }
  group: __type(name: "${GROUP}") { fields { name type { ...Ref } } }
  dimensions: __type(name: "${GROUP}Dimensions") { fields { name type { ...Ref } } }
  sum: __type(name: "${GROUP}Sum") { fields { name type { ...Ref } } }
  avg: __type(name: "${GROUP}Avg") { fields { name type { ...Ref } } }
  filter: __type(name: "${GROUP}Filter_InputObject") { inputFields { name type { ...Ref } } }
  order: __type(name: "${GROUP}OrderBy") { enumValues { name } }
}
fragment Ref on __Type { kind name ofType { kind name ofType { kind name ofType { kind name } } } }`;

function fields(value: unknown, property = "fields"): Record<string, Record<string, unknown>> {
  const list = record(value)[property];
  if (!Array.isArray(list) || list.length > 1000) throw new Error("Schema fields");
  return Object.fromEntries(list.map((field) => {
    const item = record(field);
    if (typeof item.name !== "string") throw new Error("Schema name");
    return [item.name, item];
  }));
}

function unwrap(value: unknown): Record<string, unknown> {
  let type = record(value);
  for (let depth = 0; depth < 3 && (type.kind === "NON_NULL" || type.kind === "LIST"); depth++) type = record(type.ofType);
  return type;
}

function outerType(value: unknown): Record<string, unknown> {
  const type = record(value);
  return type.kind === "NON_NULL" ? record(type.ofType) : type;
}

export function verifySchema(data: unknown): void {
  try {
    const schema = record(data);
    const group = fields(schema.group);
    const node = fields(schema.account).rumPageloadEventsAdaptiveGroups;
    if (outerType(node.type).kind !== "LIST" || unwrap(node.type).name !== GROUP || unwrap(node.type).kind !== "OBJECT") throw new Error("Node");
    const args = fields({ fields: node.args });
    if (unwrap(args.filter.type).name !== `${GROUP}Filter_InputObject` ||
        outerType(args.filter.type).kind !== "INPUT_OBJECT" ||
        unwrap(args.orderBy.type).name !== `${GROUP}OrderBy` ||
        outerType(args.orderBy.type).kind !== "LIST" ||
        unwrap(args.orderBy.type).kind !== "ENUM" ||
        outerType(args.limit.type).kind !== "SCALAR" ||
        !["Int", "uint64"].includes(String(unwrap(args.limit.type).name))) throw new Error("Arguments");
    const accountTag = unwrap(fields(schema.accountFilter, "inputFields").accountTag.type);
    if (outerType(fields(schema.accountFilter, "inputFields").accountTag.type).kind !== "SCALAR" || !["string", "String"].includes(String(accountTag.name))) throw new Error("Account filter");
    for (const [field, type] of [["dimensions", "Dimensions"], ["sum", "Sum"], ["avg", "Avg"]]) {
      if (unwrap(group[field].type).name !== `${GROUP}${type}` || outerType(group[field].type).kind !== "OBJECT") throw new Error("Group");
    }
    for (const field of [group.count, fields(schema.sum).visits, fields(schema.avg).sampleInterval]) {
      const type = unwrap(field.type);
      if (outerType(field.type).kind !== "SCALAR" || !["Int", "Float", "uint64", "float64"].includes(String(type.name))) throw new Error("Metric");
    }
    const dimensions = fields(schema.dimensions);
    for (const name of [...Object.values(dimensionFields), "date", "datetimeHour"]) {
      const type = unwrap(dimensions[name].type);
      const names = ["date", "datetimeHour"].includes(name) ? ["string", "String", "Date", "Time", "DateTime"] : ["string", "String"];
      if (outerType(dimensions[name].type).kind !== "SCALAR" || !names.includes(String(type.name))) throw new Error("Dimension");
    }
    const filter = fields(schema.filter, "inputFields");
    for (const name of ["siteTag", "requestHost", "datetime_geq", "datetime_lt"]) {
      const type = unwrap(filter[name].type);
      const names = name.startsWith("datetime_") ? ["string", "String", "Time", "DateTime"] : ["string", "String"];
      if (outerType(filter[name].type).kind !== "SCALAR" || !names.includes(String(type.name))) throw new Error("Filter");
    }
    const order = fields(schema.order, "enumValues");
    if (!order.count_DESC || !order.date_ASC || !order.datetimeHour_ASC) throw new Error("Order");
  } catch {
    throw new AnalyticsError("schema_unavailable", 503, "The analytics provider contract is not available. Setup must be reviewed.");
  }
}

async function graphql(query: string, token: string, signal: AbortSignal): Promise<Record<string, unknown>> {
  const response = await fetch(ENDPOINT, {
    method: "POST", redirect: "manual", signal,
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw new AnalyticsError("unavailable", 503, "The analytics provider is unavailable. Check its configuration.");
  }
  const body = record(await readBoundedJson(response, 262144));
  if (body.errors !== undefined && body.errors !== null && (!Array.isArray(body.errors) || body.errors.length > 0)) {
    throw new AnalyticsError("unavailable", 503, "The analytics provider could not complete this query.");
  }
  return record(body.data);
}

export function dataQuery(account: string, site: string, window: ReturnType<typeof dateWindow>): string {
  const filter = `siteTag: ${JSON.stringify(site)}, requestHost: "doyel-labs.com", datetime_geq: ${JSON.stringify(window.from)}, datetime_lt: ${JSON.stringify(window.to)}`;
  const time = window.granularity === "hour" ? "datetimeHour" : "date";
  const group = (alias: string, dimension?: string, order = "count_DESC", limit = MAX_ROWS) =>
    `${alias}: rumPageloadEventsAdaptiveGroups(limit: ${limit}, filter: {${filter}}, orderBy: [${order}]) {
      count sum { visits } avg { sampleInterval } ${dimension ? `dimensions { ${dimension} }` : ""}
    }`;
  return `query OwnerAnalytics { viewer { accounts(filter: { accountTag: ${JSON.stringify(account)} }) {
    ${group("overview", undefined, "count_DESC", 1)}
    ${group("trend", time, `${time}_ASC`, 32)}
    ${keys.map((key) => group(key, dimensionFields[key])).join("\n")}
  } } }`;
}

function metric(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1e12) {
    throw new AnalyticsError("unavailable", 503, "The analytics provider returned invalid metrics.");
  }
  return value;
}

export function normalizePath(value: string): string {
  try {
    const url = new URL(value, CANONICAL_ORIGIN);
    if (url.origin !== CANONICAL_ORIGIN) return "Other paths";
    const decoded = decodeURIComponent(url.pathname).split(/[?#]/, 1)[0];
    const path = `${decoded.replace(/\/+/g, "/").replace(/\/$/, "")}/`;
    // Arbitrary path segments may contain emails, tokens or identifiers.
    return publicPaths.includes(path) ? path : "Other paths";
  } catch {
    return "Other paths";
  }
}

function label(key: BreakdownKey, value: unknown): string {
  if (typeof value !== "string" || value.length > 2048) {
    throw new AnalyticsError("unavailable", 503, "The analytics provider returned invalid labels.");
  }
  if (key === "paths") return normalizePath(value);
  if (key === "referrers") {
    if (!value) return "Direct / unknown";
    try {
      const host = new URL(`https://${value.split(/[/?#]/, 1)[0]}`).hostname.toLowerCase();
      // Do not surface IP addresses or unstructured input as referral labels.
      return /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(host) && !value.includes("@") ? host : "Other referrers";
    } catch {
      return "Other referrers";
    }
  }
  if (key === "countries") return /^[A-Z]{2}$/.test(value) ? value : "Unknown";
  const allowlists = {
    devices: ["desktop", "mobile", "tablet"],
    browsers: ["Chrome", "ChromeMobile", "Chrome Mobile", "Safari", "MobileSafari", "Mobile Safari", "Firefox", "Edge", "IE", "Opera", "Samsung Internet", "SamsungInternet"],
    operatingSystems: ["Windows", "macOS", "MacOSX", "Mac OS X", "iOS", "Android", "Linux", "ChromeOS", "Chrome OS"],
  };
  return allowlists[key].includes(value) ? value : "Other / unknown";
}

export function adaptReport(data: unknown, window: ReturnType<typeof dateWindow>, updatedAt: string): AnalyticsReport {
  const accounts = record(record(data).viewer).accounts;
  if (!Array.isArray(accounts) || accounts.length !== 1) throw new AnalyticsError("unavailable", 503, "Analytics account data is unavailable.");
  const account = record(accounts[0]);
  let maxSampleInterval: number | null = null;
  function rows(name: string, limit: number) {
    const rows = account[name];
    if (!Array.isArray(rows) || rows.length > limit) throw new AnalyticsError("unavailable", 503, "The analytics provider returned incomplete data.");
    return rows.map((value) => {
      const row = record(value);
      const pageViews = metric(row.count);
      const visits = metric(record(row.sum).visits);
      const interval = metric(record(row.avg).sampleInterval);
      if (interval < 1) throw new AnalyticsError("unavailable", 503, "Analytics sampling information is unavailable.");
      maxSampleInterval = Math.max(maxSampleInterval ?? 1, interval);
      return { pageViews, visits, dimensions: name === "overview" ? {} : record(row.dimensions) };
    });
  }
  const overview = rows("overview", 1);
  const trend = rows("trend", 32).map((row) => {
    const value = row.dimensions[window.granularity === "hour" ? "datetimeHour" : "date"];
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}(T\d{2}:00:00Z)?$/.test(value)) throw new AnalyticsError("unavailable", 503, "Analytics trend data is invalid.");
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) throw new AnalyticsError("unavailable", 503, "Analytics trend data is invalid.");
    const time = date.toISOString();
    if (time < window.from || time >= window.to) throw new AnalyticsError("unavailable", 503, "Analytics trend data is outside the requested dates.");
    return { time, pageViews: row.pageViews, visits: row.visits };
  });
  if (new Set(trend.map((row) => row.time)).size !== trend.length) throw new AnalyticsError("unavailable", 503, "Analytics trend data is invalid.");
  const breakdowns = {} as AnalyticsReport["breakdowns"];
  let breakdownCount = 0;
  for (const key of keys) {
    const source = rows(key, MAX_ROWS);
    breakdownCount += source.length;
    const merged = new Map<string, number>();
    for (const row of source) {
      const name = label(key, row.dimensions[dimensionFields[key]]);
      merged.set(name, metric((merged.get(name) ?? 0) + row.pageViews));
    }
    const normalized: AnalyticsRow[] = [...merged].map(([name, pageViews]) => ({ label: name, pageViews }));
    breakdowns[key] = {
      rows: normalized.sort((a, b) => b.pageViews - a.pageViews || a.label.localeCompare(b.label)).slice(0, 10),
      limited: source.length === MAX_ROWS || normalized.length > 10,
    };
  }
  if ((!overview.length && (trend.length || breakdownCount)) || (overview[0]?.pageViews > 0 && (!trend.length || keys.some((key) => !breakdowns[key].rows.length)))) {
    throw new AnalyticsError("unavailable", 503, "The analytics provider returned incomplete data.");
  }
  return {
    status: !overview.length || overview[0].pageViews === 0 ? "empty" : "ready",
    ...window, updatedAt, pageViews: overview[0]?.pageViews ?? 0, visits: overview[0]?.visits ?? 0,
    sampled: maxSampleInterval !== null && maxSampleInterval > 1, maxSampleInterval,
    trend: trend.sort((a, b) => a.time.localeCompare(b.time)), breakdowns,
  };
}

export async function loadReport(env: AnalyticsEnv, preset: AnalyticsPreset): Promise<AnalyticsReport> {
  const config = providerConfig(env);
  await rateLimit(config.kv);
  const window = dateWindow(preset);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    verifySchema(await graphql(SCHEMA_QUERY, config.token, controller.signal));
    return adaptReport(
      await graphql(dataQuery(config.account, config.site, window), config.token, controller.signal),
      window, new Date().toISOString(),
    );
  } catch (error) {
    if (error instanceof AnalyticsError) throw error;
    throw new AnalyticsError("unavailable", 503, "Analytics could not be loaded. Try again later.");
  } finally {
    clearTimeout(timeout);
  }
}
