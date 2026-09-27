import assert from "node:assert/strict";
import { before, test } from "node:test";
import { exportJWK, generateKeyPair, SignJWT, type JWTPayload } from "jose";
import { requireOwner } from "../../server/analytics/access";
import { handleAdmin } from "../../server/analytics/handler";
import { configuredEnv, MemoryLimitStore, reportFixture, schemaFixture } from "./fixtures";

let pair: Awaited<ReturnType<typeof generateKeyPair>>;
let jwks: { keys: Awaited<ReturnType<typeof exportJWK>>[] };
before(async () => {
  pair = await generateKeyPair("RS256");
  jwks = { keys: [{ ...await exportJWK(pair.publicKey), kid: "fixture", alg: "RS256" }] };
});
async function token(overrides: JWTPayload = {}) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({
    iss: "https://test-team.cloudflareaccess.com", aud: "a".repeat(64),
    sub: "human-test", email: "owner@example.test", type: "app",
    iat: now, nbf: now, exp: now + 1800, ...overrides,
  }).setProtectedHeader({ alg: "RS256", kid: "fixture" }).sign(pair.privateKey);
}
function request(jwt?: string, url = "https://doyel-labs.com/admin/analytics/") {
  return new Request(url, { headers: jwt ? { "Cf-Access-Jwt-Assertion": jwt } : {} });
}

test("only a correctly signed human owner token is accepted", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (url: string) => {
    calls++;
    assert.equal(String(url), "https://test-team.cloudflareaccess.com/cdn-cgi/access/certs");
    return Response.json(jwks);
  });
  await requireOwner(request(await token()), configuredEnv());
  assert.equal(calls, 1);
});

test("missing headers, cookie-only, forged tokens and identity headers fail closed", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(jwks));
  const forgedPair = await generateKeyPair("RS256");
  const forged = await new SignJWT({ email: "owner@example.test" })
    .setProtectedHeader({ alg: "RS256", kid: "fixture" }).sign(forgedPair.privateKey);
  const valid = await token();
  for (const req of [
    request(), request("bad"), request(forged),
    new Request("https://doyel-labs.com/admin/", { headers: {
      Cookie: `CF_Authorization=${valid}`, "Cf-Access-Authenticated-User-Email": "owner@example.test",
    } }),
  ]) {
    await assert.rejects(requireOwner(req, configuredEnv()), { code: "unauthorized" });
  }
});

test("expired, future, stale, wrong issuer/audience/identity and service tokens are rejected", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(jwks));
  const now = Math.floor(Date.now() / 1000);
  const cases: JWTPayload[] = [
    { exp: now - 1 }, { iat: now - 1900, nbf: now - 1900, exp: now + 1000 },
    { nbf: now + 60 }, { iat: now + 60 }, { iss: "https://attacker.example" },
    { aud: "wrong" }, { email: "other@example.test" }, { email: "OWNER@example.test" },
    { sub: "" }, { type: "org" }, { common_name: "service.access" },
    { service_token_id: "service" }, { service_token_status: true },
    { email: undefined }, { exp: undefined }, { iat: undefined }, { nbf: undefined },
    { sub: undefined }, { type: undefined },
  ];
  for (const claims of cases) await assert.rejects(requireOwner(request(await token(claims)), configuredEnv()));
});

test("wrong algorithm and unsigned tokens are rejected", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(jwks));
  const hs = await new SignJWT({ email: "owner@example.test" })
    .setProtectedHeader({ alg: "HS256" }).sign(new TextEncoder().encode("synthetic-fixture-secret-only-32characters"));
  const none = `${Buffer.from('{"alg":"none"}').toString("base64url")}.${Buffer.from('{"email":"owner@example.test"}').toString("base64url")}.`;
  for (const value of [hs, none]) await assert.rejects(requireOwner(request(value), configuredEnv()), { code: "unauthorized" });
});

test("missing or malformed Access configuration denies access before fetching JWKS", async (t) => {
  t.mock.method(globalThis, "fetch", () => { throw new Error("Must not fetch"); });
  for (const key of ["CF_ACCESS_TEAM_DOMAIN", "CF_ACCESS_AUD", "ANALYTICS_ALLOWED_EMAIL"] as const) {
    const env = configuredEnv();
    delete env[key];
    await assert.rejects(requireOwner(request("x"), env), { code: "unconfigured" });
  }
  await assert.rejects(requireOwner(request("x"), { ...configuredEnv(), CF_ACCESS_TEAM_DOMAIN: "https://attacker.test" }));
});

test("alternate hosts, ports and HTTP deny even with a valid owner token", async (t) => {
  t.mock.method(globalThis, "fetch", () => { throw new Error("Must not fetch"); });
  const jwt = await token();
  for (const origin of [
    "https://website-8xx.pages.dev", "https://preview.website-8xx.pages.dev", "https://www.doyel-labs.com",
    "https://doyel-labs.com.evil.test", "https://doyel-labs.com:8443", "http://doyel-labs.com",
  ]) await assert.rejects(requireOwner(request(jwt, `${origin}/admin/analytics/`), configuredEnv()), { code: "forbidden" });
});

test("JWKS errors, oversized keys, timeouts and unexpected failures never disclose details", async (t) => {
  const jwt = await token();
  for (const response of [new Response("secret upstream details", { status: 500 }), Response.json({ keys: [], padding: "x".repeat(40000) })]) {
    const mocked = t.mock.method(globalThis, "fetch", async () => response);
    const result = await handleAdmin(request(jwt), configuredEnv());
    assert.equal(result.status, 503);
    assert.doesNotMatch(await result.text(), /secret|padding|SYNTHETIC/);
    mocked.mock.restore();
  }
  t.mock.method(globalThis, "fetch", async () => { throw new DOMException("private", "TimeoutError"); });
  assert.equal((await handleAdmin(request(jwt), configuredEnv())).status, 503);
});

test("every admin parent, artifact and API variant authenticates; no-store applies to denial and success", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(jwks));
  const jwt = await token();
  const paths = ["/admin", "/admin/", "/admin/analytics", "/admin/analytics/", "/admin/analytics/index.html",
    "/admin/analytics/index.txt", "/admin/analytics/__next._full.txt", "/api/admin", "/api/admin/", "/api/admin/analytics/"];
  for (const path of paths) {
    const denied = await handleAdmin(request(undefined, `https://doyel-labs.com${path}`), configuredEnv());
    assert.equal(denied.status, 401);
    assert.match(denied.headers.get("cache-control")!, /no-store/);
    assert.equal(denied.headers.get("referrer-policy"), "no-referrer");
    assert.match(denied.headers.get("x-robots-tag")!, /noindex/);
    assert.equal(denied.headers.get("access-control-allow-origin"), null);
  }
  const allowed = await handleAdmin(request(jwt), configuredEnv());
  assert.equal(allowed.status, 200);
  assert.match(allowed.headers.get("content-security-policy")!, /sha256-/);
  assert.doesNotMatch(allowed.headers.get("content-security-policy")!, /plausible|cloudflareinsights/);
  assert.match(allowed.headers.get("cache-control")!, /no-store/);
  assert.doesNotMatch(await allowed.text(), /SYNTHETIC_TEST_SECRET|owner@example\.test/);
  for (const artifact of ["/admin/analytics/index.txt", "/admin/analytics/__next._full.txt"]) {
    const response = await handleAdmin(request(jwt, `https://doyel-labs.com${artifact}`), configuredEnv());
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("Location"), "/admin/analytics/");
    assert.match(response.headers.get("Cache-Control")!, /no-store/);
  }
});

test("API is read-only, cross-site queries denied, and feature disabled before provider fetch", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => { calls++; return Response.json(jwks); });
  const jwt = await token();
  const url = "https://doyel-labs.com/api/admin/analytics/";
  const headers = { "Cf-Access-Jwt-Assertion": jwt };
  const disabled = await handleAdmin(new Request(url, { headers }), { ...configuredEnv(), ANALYTICS_ENABLED: "false" });
  assert.equal(disabled.status, 503);
  assert.equal((await disabled.json()).status, "disabled");
  assert.equal(calls, 1);
  const head = await handleAdmin(new Request(url, { method: "HEAD", headers }), { ...configuredEnv(), ANALYTICS_ENABLED: "false" });
  assert.equal(head.status, 503);
  assert.equal((await handleAdmin(new Request(url, { method: "POST", headers }), configuredEnv())).status, 405);
  assert.equal((await handleAdmin(new Request(url, { headers: { ...headers, Origin: "https://evil.test" } }), configuredEnv())).status, 403);
});

test("end-to-end owner API flow authenticates each call, throttles and never caches private aggregates", async (t) => {
  let authCalls = 0;
  let providerCalls = 0;
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    if (String(url).includes("/cdn-cgi/access/certs")) {
      authCalls++;
      return Response.json(jwks);
    }
    assert.equal(String(url), "https://api.cloudflare.com/client/v4/graphql");
    providerCalls++;
    if (String(init.body).includes("AnalyticsContract")) return Response.json({ data: schemaFixture() });
    const data = reportFixture();
    data.viewer.accounts[0].trend[0].dimensions.date = new Date().toISOString().slice(0, 10);
    return Response.json({ data });
  });
  const jwt = await token();
  const env = configuredEnv();
  const url = "https://doyel-labs.com/api/admin/analytics/?period=7d";
  const response = await handleAdmin(request(jwt, url), env);
  assert.equal(response.status, 200);
  assert.equal(authCalls, 1);
  assert.equal(providerCalls, 2);
  assert.equal(response.headers.get("cdn-cache-control"), "no-store");
  assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
  const body = await response.text();
  assert.equal(JSON.parse(body).pageViews, 12);
  assert.doesNotMatch(body, /SYNTHETIC_TEST_SECRET|owner@example|siteTag|accountTag|Cf-Access|hidden@example/);
  const blocked = configuredEnv();
  const kv = new MemoryLimitStore();
  kv.values.set(`analytics:owner:${Math.floor(Date.now() / 60000)}`, "6");
  blocked.CONTACT_KV = kv;
  const limited = await handleAdmin(request(jwt, url), blocked);
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "60");
  assert.equal(authCalls, 2);
  assert.equal(providerCalls, 2);
  const unauthorized = await handleAdmin(request(undefined, url), env);
  assert.equal(unauthorized.status, 401);
  assert.doesNotMatch(await unauthorized.text(), /pageViews|visits/);
});
