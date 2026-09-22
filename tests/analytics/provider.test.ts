import assert from "node:assert/strict";
import { test } from "node:test";
import { adaptReport, dataQuery, dateWindow, loadReport, normalizePath, parsePreset, providerConfig, rateLimit, verifySchema } from "../../server/analytics/provider";
import { readBoundedJson } from "../../server/analytics/http";
import { configuredEnv, groupFixture, MemoryLimitStore, reportFixture, schemaFixture } from "./fixtures";

const window = dateWindow("7d", new Date("2026-09-22T14:02:00Z"));

test("preset-only date windows bound cost to 30 days / 24 hourly buckets", () => {
  for (const period of ["24h", "7d", "30d"] as const) {
    assert.equal(parsePreset(new URL(`https://doyel-labs.com/api/admin/analytics/?period=${period}`)), period);
    const dates = dateWindow(period, new Date("2026-09-22T14:02:00Z"));
    assert.ok(Date.parse(dates.to) - Date.parse(dates.from) <= 30 * 86400000);
    if (period === "24h") assert.equal(dates.from, "2026-09-21T15:00:00.000Z");
  }
  for (const query of ["period=forever", "period=", "period=7d&period=30d", "from=2020-01-01", "account=other", "query=secret"]) {
    assert.throws(() => parsePreset(new URL(`https://doyel-labs.com/?${query}`)), { code: "invalid_request" });
  }
});

test("disabled by default; required provider configuration has no fallbacks", () => {
  for (const enabled of [undefined, "", "false", "TRUE", "1"]) {
    assert.throws(() => providerConfig({ ...configuredEnv(), ANALYTICS_ENABLED: enabled }), { code: "disabled" });
  }
  for (const key of ["CF_ACCOUNT_ID", "CF_WEB_ANALYTICS_SITE_TAG", "CF_ANALYTICS_API_TOKEN", "CONTACT_KV"] as const) {
    const env = configuredEnv();
    delete env[key];
    assert.throws(() => providerConfig(env), { code: "unconfigured" });
  }
});

test("best-effort KV owner throttle enforces six/minute, TTL, and fails closed", async () => {
  const kv = new MemoryLimitStore();
  for (let i = 0; i < 6; i++) await rateLimit(kv, 60000);
  await assert.rejects(rateLimit(kv, 60000), { code: "rate_limited" });
  await rateLimit(kv, 120000);
  assert.ok(kv.writes.every((row) => row.ttl === 120 && !row.key.includes("@") && /^\d$/.test(row.value)));
  kv.values.set("analytics:owner:3", "corrupt");
  await assert.rejects(rateLimit(kv, 180000), { code: "unavailable" });
  await assert.rejects(rateLimit({ get: async () => { throw new Error("private"); }, put: async () => {} }), { code: "unavailable" });
  await assert.rejects(rateLimit({ get: async () => null, put: async () => { throw new Error("private"); } }), { code: "unavailable" });
});

test("narrow schema gate verifies metrics, arguments, filters, dimensions and sort enums", () => {
  verifySchema(schemaFixture());
  for (const key of ["account", "accountFilter", "group", "sum", "avg", "dimensions", "filter", "order"]) {
    const schema = schemaFixture();
    assert.throws(() => verifySchema({ ...schema, [key]: null }), { code: "schema_unavailable" });
  }
  const invalidType = schemaFixture();
  invalidType.sum.fields[0].type.name = "string";
  assert.throws(() => verifySchema(invalidType), { code: "schema_unavailable" });
  const missingDimension = schemaFixture();
  missingDimension.dimensions.fields.pop();
  assert.throws(() => verifySchema(missingDimension), { code: "schema_unavailable" });
  const missingHost = schemaFixture();
  missingHost.filter.inputFields = missingHost.filter.inputFields.filter((field) => field.name !== "requestHost");
  assert.throws(() => verifySchema(missingHost), { code: "schema_unavailable" });
});

test("fixed query uses only RUM, pinned account/site/hostname on all eight groups, bounded limits", () => {
  const query = dataQuery("b".repeat(32), "c".repeat(32), window);
  assert.equal((query.match(/rumPageloadEventsAdaptiveGroups\(/g) ?? []).length, 8);
  assert.equal((query.match(/siteTag:/g) ?? []).length, 8);
  assert.equal((query.match(/requestHost: "doyel-labs.com"/g) ?? []).length, 8);
  assert.doesNotMatch(query, /httpRequests|firewall|refererPath|userAgent\b|requestIP/);
  assert.match(query, /limit: 32/);
  assert.match(query, /limit: 21/);
});

test("adapter keeps scaled counts, sampling, bounded normalized aggregate results", () => {
  const data = reportFixture();
  data.viewer.accounts[0].overview[0].avg.sampleInterval = 10;
  const report = adaptReport(data, window, window.to);
  assert.equal(report.pageViews, 12);
  assert.equal(report.visits, 5);
  assert.equal(report.sampled, true);
  assert.equal(report.maxSampleInterval, 10);
  assert.deepEqual(report.breakdowns.paths.rows, [{ label: "/services/", pageViews: 12 }]);
  assert.equal(report.breakdowns.referrers.rows[0].label, "example.com");
  assert.doesNotMatch(JSON.stringify(report), /hidden|secret|@/);
  const source = data.viewer.accounts[0];
  source.paths = Array.from({ length: 21 }, (_, i) => groupFixture({ requestPath: `/private/${i}@example.com` }, 1, 1));
  const limited = adaptReport(data, window, window.to);
  assert.equal(limited.breakdowns.paths.limited, true);
  assert.deepEqual(limited.breakdowns.paths.rows, [{ label: "Other paths", pageViews: 21 }]);
});

test("unknown/sensitive paths, referer IPs and raw user agent labels are not exposed", () => {
  for (const path of ["/people/person@example.com", "/admin/analytics/", "https://evil.test/services/", "/%zz", "/services/%253fsecret"]) {
    assert.equal(normalizePath(path), "Other paths");
  }
  assert.equal(normalizePath("/services%3Fsecret=123"), "/services/");
  const data = reportFixture();
  data.viewer.accounts[0].referrers = [groupFixture({ refererHost: "192.0.2.10" })];
  data.viewer.accounts[0].browsers = [groupFixture({ userAgentBrowser: "<script>personal-secret</script>" })];
  const report = adaptReport(data, window, window.to);
  assert.equal(report.breakdowns.referrers.rows[0].label, "Other referrers");
  assert.equal(report.breakdowns.browsers.rows[0].label, "Other / unknown");
  assert.doesNotMatch(JSON.stringify(report), /192\.0|script|personal-secret/);
});

test("empty results are explicit; missing accounts/groups/metrics are unavailable, never zero defaults", () => {
  const account = reportFixture().viewer.accounts[0];
  const empty = Object.fromEntries(Object.keys(account).map((key) => [key, []]));
  assert.equal(adaptReport({ viewer: { accounts: [empty] } }, window, window.to).status, "empty");
  for (const bad of [
    {}, { viewer: { accounts: [] } }, { viewer: { accounts: [null] } },
    { viewer: { accounts: [{ ...account, overview: [] }] } },
    { viewer: { accounts: [{ ...account, paths: undefined }] } },
    { viewer: { accounts: [{ ...account, trend: [] }] } },
    { viewer: { accounts: [{ ...account, overview: [{ count: -1 }] }] } },
    { viewer: { accounts: [{ ...account, overview: [{ count: null, sum: { visits: 0 }, avg: { sampleInterval: 1 } }] }] } },
  ]) assert.throws(() => adaptReport(bad, window, window.to), { code: "unavailable" });
});

test("invalid values, large lists and out-of-window trends fail closed", () => {
  for (const count of [-1, Infinity, NaN, 1e13]) {
    const data = reportFixture();
    data.viewer.accounts[0].overview[0].count = count;
    assert.throws(() => adaptReport(data, window, window.to), { code: "unavailable" });
  }
  const data = reportFixture();
  data.viewer.accounts[0].paths = Array.from({ length: 22 }, () => groupFixture({ requestPath: "/" }));
  assert.throws(() => adaptReport(data, window, window.to), { code: "unavailable" });
  const trend = reportFixture();
  trend.viewer.accounts[0].trend[0].dimensions.date = "2020-01-01";
  assert.throws(() => adaptReport(trend, window, window.to), { code: "unavailable" });
});

test("bounded JSON reader rejects invalid and oversized declared/chunked payloads", async () => {
  await assert.rejects(readBoundedJson(new Response("{}", { headers: { "Content-Length": "99999" } }), 10));
  await assert.rejects(readBoundedJson(new Response("x".repeat(20)), 10));
  await assert.rejects(readBoundedJson(new Response("invalid"), 10));
  assert.deepEqual(await readBoundedJson(Response.json({ ok: true }), 32), { ok: true });
});

test("provider verifies schema before data and returns sanitized failures", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    calls++;
    assert.equal(String(url), "https://api.cloudflare.com/client/v4/graphql");
    assert.equal(init.redirect, "error");
    assert.ok(init.signal);
    assert.match(String(init.body), /AnalyticsContract/);
    return Response.json({ data: { account: null } });
  });
  await assert.rejects(loadReport(configuredEnv(), "7d"), { code: "schema_unavailable" });
  assert.equal(calls, 1);
});

test("valid schema then aggregate data succeeds without exposing credentials or provider payloads", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) => {
    calls++;
    const body = JSON.parse(String(init.body));
    assert.equal(new Headers(init.headers).get("Authorization"), "Bearer SYNTHETIC_TEST_SECRET");
    if (calls === 1) return Response.json({ data: schemaFixture() });
    assert.match(body.query, /query OwnerAnalytics/);
    const data = reportFixture();
    data.viewer.accounts[0].trend[0].dimensions.date = new Date().toISOString().slice(0, 10);
    return Response.json({ data });
  });
  const report = await loadReport(configuredEnv(), "7d");
  assert.equal(calls, 2);
  assert.equal(report.status, "ready");
  assert.equal(report.pageViews, 12);
  assert.doesNotMatch(JSON.stringify(report), /SYNTHETIC|siteTag|accountTag|hidden@example/);
});

test("disabled, unconfigured and throttled requests never contact the provider", async (t) => {
  t.mock.method(globalThis, "fetch", () => { throw new Error("Must not fetch"); });
  await assert.rejects(loadReport({ ...configuredEnv(), ANALYTICS_ENABLED: "false" }, "7d"), { code: "disabled" });
  await assert.rejects(loadReport({ ...configuredEnv(), CF_WEB_ANALYTICS_SITE_TAG: undefined }, "7d"), { code: "unconfigured" });
  const kv = new MemoryLimitStore();
  kv.values.set(`analytics:owner:${Math.floor(Date.now() / 60000)}`, "6");
  await assert.rejects(loadReport({ ...configuredEnv(), CONTACT_KV: kv }, "7d"), { code: "rate_limited" });
});

test("provider HTTP errors, GraphQL errors, malformed JSON and transport failures are explicit", async (t) => {
  for (const response of [
    new Response("secret", { status: 403 }), new Response("secret", { status: 429 }),
    Response.json({ errors: [{ message: "secret" }], data: {} }), new Response("<html>secret</html>"),
    Response.json({ data: null }), new Response("x".repeat(262145)),
  ]) {
    const mock = t.mock.method(globalThis, "fetch", async () => response);
    await assert.rejects(loadReport(configuredEnv(), "7d"), (error: Error) => !error.message.includes("secret"));
    mock.mock.restore();
  }
  t.mock.method(globalThis, "fetch", async () => { throw new Error("secret"); });
  await assert.rejects(loadReport(configuredEnv(), "7d"), { code: "unavailable" });
});

test("one deadline bounds schema plus data including a stalled response body", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) =>
    new Response(new ReadableStream({
      start(controller) {
        init.signal?.addEventListener("abort", () => controller.error(new DOMException("aborted", "AbortError")));
      },
    })),
  );
  const pending = loadReport(configuredEnv(), "7d");
  await new Promise((resolve) => setImmediate(resolve));
  t.mock.timers.tick(8001);
  await assert.rejects(pending, { code: "unavailable" });
});
