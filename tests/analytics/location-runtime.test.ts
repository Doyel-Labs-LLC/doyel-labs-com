import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { before, test, type TestContext } from "node:test";
import { build } from "esbuild";
import { exportJWK, generateKeyPair, SignJWT, type JWTPayload } from "jose";
import { convertV4MiniflareOptions, Miniflare } from "miniflare";
import { configuredEnv, reportFixture, schemaFixture } from "./fixtures";
import { dateWindow } from "../../server/analytics/provider";
import { isLocationReport } from "../../src/lib/location-contract";

const origin = "https://doyel-labs.com";
const ingestUrl = `${origin}/api/analytics/location/`;
const readUrl = `${origin}/api/admin/analytics/locations/`;
const hour = () => Math.floor(Date.now() / 3600000) * 3600;
const day = () => Math.floor(Date.now() / 86400000) * 86400;
const insert = `INSERT INTO location_hourly(bucket_hour,country,region,city,page_views) VALUES(?,?,?,?,1)
  ON CONFLICT(bucket_hour,country,region,city) DO UPDATE SET page_views=location_hourly.page_views+1 RETURNING page_views`;
let script: string;
let migration: string;
let pair: Awaited<ReturnType<typeof generateKeyPair>>;
let jwks: { keys: Awaited<ReturnType<typeof exportJWK>>[] };

before(async () => {
  migration = await readFile(path.join("migrations", "location", "0001_location_analytics.sql"), "utf8");
  pair = await generateKeyPair("RS256");
  jwks = { keys: [{ ...await exportJWK(pair.publicKey), kid: "location-test", alg: "RS256", use: "sig" }] };
  const bundle = await build({
    stdin: { contents: `
      import { onRequest } from ${JSON.stringify(path.resolve("functions", "_middleware.ts"))};
      import retention from ${JSON.stringify(path.resolve("workers", "location-retention", "index.ts"))};
      export default { async fetch(request,env) {
        if (new URL(request.url).pathname === "/__test/retention") {
          try { await retention.scheduled({},env); return Response.json({status:"complete"}); }
          catch { return Response.json({status:"failed"},{status:503}); }
        }
        return onRequest({request,env,next:()=>new Response("not found",{status:404})});
      }, scheduled: retention.scheduled };`, resolveDir: process.cwd(), loader: "ts" },
    bundle: true, format: "esm", platform: "browser", target: "es2022", write: false,
  });
  script = bundle.outputFiles[0].text;
});

async function token(overrides: JWTPayload = {}, signingKey = pair.privateKey) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({
    iss: "https://test-team.cloudflareaccess.com", aud: "a".repeat(64),
    sub: "synthetic-owner", email: "owner@example.test", type: "app",
    iat: now, nbf: now, exp: now + 1800, ...overrides,
  }).setProtectedHeader({ alg: "RS256", kid: "location-test" }).sign(signingKey);
}

async function runtime(t: TestContext, options: {
  bindings?: Record<string, string>;
  database?: boolean;
  migrate?: boolean;
  cf?: Record<string, unknown>;
} = {}) {
  const { CONTACT_KV, ...defaults } = configuredEnv();
  const outbound: string[] = [];
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true, script, compatibilityDate: "2026-09-07", compatibilityFlags: [],
    bindings: { ...defaults, LOCATION_ANALYTICS_ENABLED: "true", ...options.bindings },
    d1Databases: options.database === false ? [] : ["LOCATION_DB"], kvNamespaces: ["CONTACT_KV"],
    cf: options.cf ?? { country: "US", region: "Wyoming", city: "Casper" },
    outboundService: async (request) => {
      outbound.push(request.url);
      if (request.url === "https://test-team.cloudflareaccess.com/cdn-cgi/access/certs") return Response.json(jwks);
      if (request.url === "https://api.cloudflare.com/client/v4/graphql") {
        const body = await request.json() as { query: string };
        if (body.query.startsWith("query AnalyticsContract")) return Response.json({ data: schemaFixture() });
        const data = reportFixture();
        const from = body.query.match(/datetime_geq: "([^"]+)"/)?.[1];
        assert.ok(from);
        data.viewer.accounts[0].trend[0].dimensions = { date: from.slice(0, 10), datetimeHour: from.replace(".000Z", "Z") };
        return Response.json({ data });
      }
      return new Response("Blocked test egress", { status: 500 });
    },
  }));
  t.after(() => mf.dispose());
  const db = options.database === false ? null : await mf.getD1Database("LOCATION_DB");
  if (db && options.migrate !== false) {
    // exec's line handling is not a SQL parser; prepare the complete trigger.
    const [tables, trigger] = migration.split("CREATE TRIGGER");
    for (const sql of tables.split(";").filter((sql) => /CREATE TABLE/.test(sql))) await db.prepare(sql).run();
    await db.prepare(`CREATE TRIGGER${trigger}`).run();
  }
  return {
    mf, db, outbound,
    post: (options: { url?: string; method?: string; body?: string; headers?: Record<string, string> } = {}) =>
      mf.dispatchFetch(options.url ?? ingestUrl, {
        method: options.method ?? "POST", body: options.method === "GET" || options.method === "OPTIONS" ? undefined : options.body ?? '{"path":"/"}',
        headers: { Origin: origin, "Content-Type": "application/json", "Sec-Fetch-Site": "same-origin", ...options.headers },
      }),
    read: async (jwt?: string, url = `${readUrl}?period=7d`, headers: Record<string, string> = {}) =>
      mf.dispatchFetch(url, { headers: { "Cf-Access-Jwt-Assertion": jwt ?? await token(), ...headers } }),
  };
}

test("native D1 stores hourly aggregates only; repeated UPSERT and new geographic buckets spend one admission each", async (t) => {
  const h = await runtime(t);
  for (let i = 0; i < 3; i++) {
    const response = await h.post({ headers: {
      "CF-IPCity": "UntrustedCity", "CF-IPCountry": "CA", "User-Agent": "ForbiddenStoredAgent",
      "Cookie": "visitor=ForbiddenStoredCookie", Referer: `${origin}/?email=private@example.test`,
    } });
    assert.equal(response.status, 202);
    assert.deepEqual(await response.json(), { status: "accepted" });
    assert.match(response.headers.get("Cache-Control")!, /no-store/);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
  }
  await h.db!.prepare(insert).bind(hour(), "CA", "Ontario", "Toronto").run();
  assert.deepEqual((await h.db!.prepare("SELECT * FROM location_hourly ORDER BY country").all()).results, [
    { bucket_hour: hour(), country: "CA", region: "Ontario", city: "Toronto", page_views: 1 },
    { bucket_hour: hour(), country: "US", region: "Wyoming", city: "Casper", page_views: 3 },
  ]);
  assert.equal((await h.db!.prepare("SELECT accepted FROM location_daily_budget").first())!.accepted, 4);
  assert.deepEqual((await h.db!.prepare("SELECT * FROM location_metadata").all()).results, [{ singleton: 1, first_hour: hour() }]);
  assert.deepEqual(h.outbound, []);
  const kv = await h.mf.getKVNamespace("CONTACT_KV");
  assert.deepEqual((await kv.list()).keys, []);
  const tables = (await h.db!.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'location_%' ORDER BY name").all()).results;
  assert.deepEqual(tables.map((row) => row.name), ["location_daily_budget", "location_hourly", "location_metadata"]);
  assert.deepEqual((await h.db!.prepare("PRAGMA table_info(location_hourly)").all()).results.map((row) => row.name),
    ["bucket_hour", "country", "region", "city", "page_views"]);
});

test("native D1 concurrent atomic increments, cap boundary, zero-write rejection and next-day admission", async (t) => {
  const h = await runtime(t);
  const responses = await Promise.all(Array.from({ length: 40 }, () => h.post()));
  assert.ok(responses.every((response) => response.status === 202));
  assert.equal((await h.db!.prepare("SELECT page_views FROM location_hourly").first())!.page_views, 40);
  await h.db!.prepare("UPDATE location_daily_budget SET accepted=4995").run();
  const boundary = await Promise.all(Array.from({ length: 30 }, () => h.post()));
  assert.equal(boundary.filter((response) => response.status === 202).length, 5);
  assert.equal(boundary.filter((response) => response.status === 429).length, 25);
  assert.equal((await h.db!.prepare("SELECT accepted FROM location_daily_budget").first())!.accepted, 5000);
  assert.equal((await h.db!.prepare("SELECT page_views FROM location_hourly").first())!.page_views, 45);
  for (const city of ["Casper", "NewCityAtCap"]) {
    const result = await h.db!.prepare(insert).bind(hour(), "US", "Wyoming", city).run();
    assert.deepEqual(result.results, []);
    assert.equal(result.meta.changes, 0);
    assert.equal(result.meta.rows_written, 0);
  }
  await h.db!.prepare(insert).bind(day() + 86400, "US", "Wyoming", "NextDay").run();
  assert.equal((await h.db!.prepare("SELECT accepted FROM location_daily_budget WHERE day_start=?").bind(day() + 86400).first())!.accepted, 1);
  const report = await (await h.read()).json();
  assert.ok(isLocationReport(report));
  assert.deepEqual(report.cappedDays, [new Date(day() * 1000).toISOString().slice(0, 10)]);
  assert.equal(report.pageViews, 45); // The future row is not in the current report.
});

test("native D1 failed insert and failed batch roll back budget, aggregate and initial metadata", async (t) => {
  const h = await runtime(t);
  await assert.rejects(h.db!.prepare(insert).bind(hour(), "US", "Wyoming", "x".repeat(101)).run(), /CHECK/);
  for (const table of ["location_hourly", "location_daily_budget", "location_metadata"]) {
    assert.equal((await h.db!.prepare(`SELECT COUNT(*) AS n FROM ${table}`).first())!.n, 0);
  }
  await assert.rejects(h.db!.batch([
    h.db!.prepare(insert).bind(hour(), "US", "Wyoming", "Casper"),
    h.db!.prepare("INSERT INTO location_metadata(singleton,first_hour) VALUES(2,?)").bind(hour()),
  ]), /CHECK/);
  for (const table of ["location_hourly", "location_daily_budget", "location_metadata"]) {
    assert.equal((await h.db!.prepare(`SELECT COUNT(*) AS n FROM ${table}`).first())!.n, 0);
  }
  assert.equal((await h.post()).status, 202);
});

test("ingest rejects alternate hosts, cross-origin, unsafe methods, bodies, encodings and nonpublished paths before D1", async (t) => {
  const h = await runtime(t, { migrate: false });
  for (const host of ["http://doyel-labs.com", "https://www.doyel-labs.com", "https://website-8xx.pages.dev",
    "https://preview.website-8xx.pages.dev", "https://doyel-labs.com:8443", "http://localhost"]) {
    assert.equal((await h.post({ url: `${host}/api/analytics/location/` })).status, 403);
  }
  for (const headers of [{ Origin: "" }, { Origin: "https://evil.invalid" }, { "Sec-Fetch-Site": "cross-site" }]) {
    assert.equal((await h.post({ headers })).status, 403);
  }
  for (const method of ["GET", "OPTIONS", "PUT", "DELETE"]) assert.equal((await h.post({ method })).status, 405);
  for (const body of ["{}", "[]", "null", "broken", '{"path":"/","city":"spoof"}', "x".repeat(513),
    '{"path":"/admin/analytics/"}', '{"path":"/api/contact"}', '{"path":"/404/"}', '{"path":"/_not-found/"}',
    '{"path":"/_next/static/a.js"}', '{"path":"/unknown/"}', '{"path":"/?email=secret"}',
    '{"path":"/#hash"}', '{"path":"https://doyel-labs.com/"}', '{"path":"/%63ontact/"}']) {
    assert.equal((await h.post({ body })).status, 400, body);
  }
  for (const headers of [{ "Content-Type": "text/plain" }, { "Content-Encoding": "gzip" }, { Purpose: "prefetch" }, { "Sec-Purpose": "prefetch" }]) {
    assert.equal((await h.post({ headers })).status, 400);
  }
  assert.equal((await h.post({ url: `${ingestUrl}?path=/` })).status, 400);
  assert.equal((await h.post({ url: `${ingestUrl}anything` })).status, 400);
  assert.deepEqual(h.outbound, []);
});

test("GPC, DNT and runtime-off suppress collection without D1; unconfigured and storage errors are explicit", async (t) => {
  const h = await runtime(t, { migrate: false });
  for (const headers of [{ "Sec-GPC": "1" }, { DNT: "1" }]) {
    const response = await h.post({ headers });
    assert.equal(response.status, 503);
    assert.equal((await response.json() as { status: string }).status, "disabled");
  }
  const failed = await h.post();
  assert.equal(failed.status, 503);
  assert.equal((await failed.json() as { status: string }).status, "unavailable");
  const missing = await runtime(t, { database: false });
  assert.equal((await (await missing.post()).json() as { status: string }).status, "unconfigured");
  for (const flag of ["", "false", "TRUE", "1"]) {
    const off = await runtime(t, { bindings: { LOCATION_ANALYTICS_ENABLED: flag }, migrate: false });
    assert.equal((await (await off.post()).json() as { status: string }).status, "disabled");
  }
});

test("unknown and bounded trusted geo values are explicit; SQL-shaped labels are bound, not executable", async (t) => {
  const unknown = await runtime(t, { cf: { country: "XX", region: "x".repeat(101), city: "line\nbreak" } });
  assert.equal((await unknown.post()).status, 202);
  const report = await (await unknown.read()).json();
  assert.ok(isLocationReport(report));
  assert.deepEqual(report.breakdowns.cities.rows, [{ country: "?", region: "?", city: "?", pageViews: 1 }]);
  const attack = "Casper'); DROP TABLE location_hourly;--";
  const quoted = await runtime(t, { cf: { country: "US", region: "A".repeat(100), city: attack } });
  assert.equal((await quoted.post()).status, 202);
  const result = await (await quoted.read()).json();
  assert.ok(isLocationReport(result));
  assert.equal(result.breakdowns.cities.rows[0].city, attack);
  assert.equal(result.breakdowns.cities.rows[0].region!.length, 100);
});

test("signed native owner reads each UTC preset, independent top20 tables and bounded aggregate output", async (t) => {
  const h = await runtime(t);
  const now = new Date();
  const dates = [hour(), ...(["24h", "7d", "30d"] as const).flatMap((preset) => {
    const from = Date.parse(dateWindow(preset, now).from) / 1000;
    return [from, from - 3600];
  })];
  for (const [index, bucket] of dates.entries()) {
    await h.db!.prepare(insert).bind(bucket, "US", "Wyoming", `City${index}`).run();
  }
  for (let index = 0; index < 23; index++) await h.db!.prepare(insert).bind(hour(), "CA", `Region${index}`, `Top${index}`).run();
  for (const period of ["24h", "7d", "30d"] as const) {
    const response = await h.read(await token(), `${readUrl}?period=${period}`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
    assert.match(response.headers.get("Cache-Control")!, /no-store/);
    const report = await response.json();
    assert.ok(isLocationReport(report));
    const from = Date.parse(dateWindow(period, now).from) / 1000;
    assert.equal(report.pageViews, dates.filter((bucket) => bucket >= from).length + 23);
    assert.equal(report.from, dateWindow(period, now).from);
    assert.equal(report.breakdowns.cities.rows.length, 20);
    assert.equal(report.breakdowns.cities.limited, true);
    assert.equal(report.breakdowns.regions.rows.length, 20);
    assert.equal(report.breakdowns.countries.limited, false);
    assert.doesNotMatch(JSON.stringify(report), /visitor|requestPath|cookie|userAgent|latitude|longitude|postal|owner@example/);
  }
  assert.ok(h.outbound.every((url) => url.endsWith("/cdn-cgi/access/certs")));
});

test("location reads reject missing/forged/wrong-owner/service credentials, alternate domains and arbitrary scopes", async (t) => {
  const h = await runtime(t);
  const forged = await generateKeyPair("RS256");
  for (const [jwt, status] of [
    ["", 401], [await token({}, forged.privateKey), 401],
    [await token({ email: "other@example.test" }), 403], [await token({ service_token_id: "synthetic" }), 403],
  ] as const) assert.equal((await h.read(jwt)).status, status);
  for (const host of ["https://www.doyel-labs.com", "https://website-8xx.pages.dev", "https://preview.website-8xx.pages.dev",
    "http://doyel-labs.com", "https://doyel-labs.com:8443"]) {
    assert.equal((await h.read(await token(), `${host}/api/admin/analytics/locations/`)).status, 403);
  }
  for (const query of ["period=forever", "period=7d&period=30d", "country=US", "period=7d&site=other", "period=7d&from=2020-01-01", "period=';DROP TABLE location_hourly;--"]) {
    assert.equal((await h.read(await token(), `${readUrl}?${query}`)).status, 400);
  }
  assert.equal((await h.read(await token(), readUrl, { Origin: "https://elsewhere.invalid" })).status, 403);
  assert.equal((await h.read(await token(), readUrl, { "Sec-Fetch-Site": "cross-site" })).status, 403);
});

test("location empty, global read-off, collection-off, storage failure and RUM independence remain honest", async (t) => {
  const h = await runtime(t, { bindings: { LOCATION_ANALYTICS_ENABLED: "false", CF_ANALYTICS_API_TOKEN: "" } });
  const empty = await (await h.read()).json();
  assert.ok(isLocationReport(empty));
  assert.equal(empty.status, "empty");
  assert.equal(empty.collectionStart, null);
  assert.equal(empty.collectionEnabled, false);
  assert.equal((await h.read(await token(), `${origin}/api/admin/analytics/`)).status, 503);
  const off = await runtime(t, { bindings: { ANALYTICS_ENABLED: "false" } });
  assert.equal((await (await off.read()).json() as { status: string }).status, "disabled");
  assert.equal((await off.post()).status, 202); // Private-read gate is not the collection gate.
  const broken = await runtime(t, { migrate: false });
  const failure = await broken.read();
  assert.equal(failure.status, 503);
  assert.doesNotMatch(await failure.text(), /pageViews|empty|SELECT|location_hourly/);
  assert.equal((await broken.read(await token(), `${origin}/api/admin/analytics/`)).status, 200);
});

test("private location throttle has a separate scope and never spends RUM's six-query budget", async (t) => {
  const h = await runtime(t);
  const jwt = await token();
  for (let count = 0; count < 6; count++) assert.equal((await h.read(jwt)).status, 200);
  assert.equal((await h.read(jwt)).status, 429);
  assert.equal((await h.read(jwt, `${origin}/api/admin/analytics/`)).status, 200);
  const kv = await h.mf.getKVNamespace("CONTACT_KV");
  const keys = (await kv.list()).keys.map((key) => key.name);
  assert.ok(keys.some((key) => key.startsWith("analytics:locations:")));
  assert.ok(keys.some((key) => key.startsWith("analytics:owner:")));
});

test("retention runs real scheduled handler; indexed bounded deletes keep 31-day boundary and coarse feature start", async (t) => {
  const h = await runtime(t);
  const cutoff = hour() - 31 * 86400;
  for (const bucket of [cutoff - 86400, cutoff - 3600, cutoff, hour()]) {
    await h.db!.prepare(insert).bind(bucket, "US", "Wyoming", "Casper").run();
  }
  const response = await h.mf.dispatchFetch(`${origin}/__test/retention`);
  assert.equal(response.status, 200);
  assert.deepEqual((await h.db!.prepare("SELECT bucket_hour FROM location_hourly ORDER BY bucket_hour").all()).results.map((row) => row.bucket_hour), [cutoff, hour()]);
  assert.equal((await h.db!.prepare("SELECT first_hour FROM location_metadata").first())!.first_hour, cutoff - 86400);
  assert.equal((await h.db!.prepare("SELECT COUNT(*) AS n FROM location_daily_budget WHERE day_start < ?").bind(cutoff - cutoff % 86400).first())!.n, 0);
  const plan = await h.db!.prepare("EXPLAIN QUERY PLAN SELECT * FROM location_hourly WHERE bucket_hour < ? ORDER BY bucket_hour LIMIT 1000").bind(cutoff).all();
  assert.match(JSON.stringify(plan.results), /PRIMARY KEY/);
  assert.deepEqual(h.outbound, []);
  const broken = await runtime(t, { migrate: false });
  assert.equal((await broken.mf.dispatchFetch(`${origin}/__test/retention`)).status, 503);
});

test("retention batches stop at 8000 rows, signal backlog, and finish safely on the next invocation", async (t) => {
  const h = await runtime(t);
  for (let days = 33; days <= 35; days++) {
    await h.db!.prepare(`WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM seq WHERE n<3000)
      INSERT INTO location_hourly(bucket_hour,country,region,city,page_views)
      SELECT ?, 'US', 'Wyoming', CAST(n AS TEXT), 1 FROM seq`).bind(hour() - days * 86400).run();
  }
  assert.equal((await h.db!.prepare("SELECT COUNT(*) AS n FROM location_hourly").first())!.n, 9000);
  assert.equal((await h.mf.dispatchFetch(`${origin}/__test/retention`)).status, 503);
  assert.equal((await h.db!.prepare("SELECT COUNT(*) AS n FROM location_hourly").first())!.n, 1000);
  assert.equal((await h.mf.dispatchFetch(`${origin}/__test/retention`)).status, 200);
  assert.equal((await h.db!.prepare("SELECT COUNT(*) AS n FROM location_hourly").first())!.n, 0);
  assert.equal((await h.db!.prepare("SELECT COUNT(*) AS n FROM location_daily_budget").first())!.n, 0);
});
