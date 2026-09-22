import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { before, test, type TestContext } from "node:test";
import { build } from "esbuild";
import { exportJWK, generateKeyPair, SignJWT, type JWTPayload } from "jose";
import { convertV4MiniflareOptions, Miniflare } from "miniflare";
import { configuredEnv, reportFixture, schemaFixture } from "./fixtures";

const compatibilityDate = "2026-09-07";
const jwksUrl = "https://test-team.cloudflareaccess.com/cdn-cgi/access/certs";
const providerUrl = "https://api.cloudflare.com/client/v4/graphql";
const documentUrl = "https://doyel-labs.com/admin/analytics/";
const apiUrl = "https://doyel-labs.com/api/admin/analytics/";
const identityFailure = { status: "unavailable", message: "Dashboard identity verification is unavailable." };
const providerFailure = { status: "unavailable", message: "The analytics provider is unavailable. Check its configuration." };
type Stage = "jwks" | "schema" | "report";
type Variant = "patched" | "original-access" | "original-provider";
type Outbound = { stage: Stage | "unexpected"; url: string; method: string; authorization: string | null; cookie: string | null; assertion: string | null };
let pair: Awaited<ReturnType<typeof generateKeyPair>>;
let jwks: { keys: Awaited<ReturnType<typeof exportJWK>>[] };
const scripts = new Map<Variant, string>();

before(async () => {
  pair = await generateKeyPair("RS256");
  jwks = { keys: [{ ...await exportJWK(pair.publicKey), kid: "runtime-fixture", alg: "RS256", use: "sig" }] };
  for (const variant of ["patched", "original-access", "original-provider"] as const) {
    const result = await build({
      stdin: {
        contents: `import { handleAdmin } from ${JSON.stringify(path.resolve("server", "analytics", "handler.ts"))};
          export default { fetch: handleAdmin };`,
        resolveDir: process.cwd(), loader: "ts",
      },
      bundle: true, format: "esm", platform: "browser", target: "es2022", write: false,
      // Negative controls restore one original option in memory, never in source
      // or global fetch. The positive tests bundle production code unmodified.
      plugins: variant === "patched" ? [] : [{
        name: "original-redirect-regression",
        setup(builder) {
          builder.onLoad({ filter: /[\\/]analytics[\\/](access|provider)\.ts$/ }, async ({ path: filename }) => {
            if (path.basename(filename) !== `${variant === "original-access" ? "access" : "provider"}.ts`) return;
            const source = await readFile(filename, "utf8");
            assert.equal(source.split('redirect: "manual"').length, 2);
            return { contents: source.replace('redirect: "manual"', 'redirect: "error"'), loader: "ts" };
          });
        },
      }],
    });
    scripts.set(variant, result.outputFiles[0].text);
  }
});

async function token(overrides: JWTPayload = {}, signingKey = pair.privateKey) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({
    iss: "https://test-team.cloudflareaccess.com", aud: "a".repeat(64),
    sub: "synthetic-human", email: "owner@example.test", type: "app",
    iat: now, nbf: now, exp: now + 1800, ...overrides,
  }).setProtectedHeader({ alg: "RS256", kid: "runtime-fixture" }).sign(signingKey);
}

function runtime(t: TestContext, options: {
  variant?: Variant;
  script?: string;
  redirect?: { stage: Stage; status: number; location: string };
} = {}) {
  const outbound: Outbound[] = [];
  const { CONTACT_KV, ...bindings } = configuredEnv();
  const script = options.script ?? scripts.get(options.variant ?? "patched");
  assert.ok(script);
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true, script, compatibilityDate, compatibilityFlags: [],
    bindings, kvNamespaces: ["CONTACT_KV"],
    // This intercepts all egress after workerd's native fetch processing.
    // There is no network fallback, even for an unexpected redirect target.
    outboundService: async (request) => {
      let stage: Outbound["stage"] = "unexpected";
      let query = "";
      if (request.url === jwksUrl) stage = "jwks";
      if (request.url === providerUrl) {
        const body = await request.json() as { query?: string };
        query = body.query ?? "";
        if (query.startsWith("query AnalyticsContract")) stage = "schema";
        else if (query.startsWith("query OwnerAnalytics")) stage = "report";
      }
      outbound.push({
        stage, url: request.url, method: request.method,
        authorization: request.headers.get("Authorization"),
        cookie: request.headers.get("Cookie"),
        assertion: request.headers.get("Cf-Access-Jwt-Assertion"),
      });
      if (stage === "unexpected") return new Response("Unexpected test egress", { status: 500 });
      if (options.redirect?.stage === stage) {
        return new Response("Synthetic redirect", {
          status: options.redirect.status, headers: { Location: options.redirect.location },
        });
      }
      if (stage === "jwks") return Response.json(jwks);
      if (stage === "schema") return Response.json({ data: schemaFixture() });
      const data = reportFixture();
      // Use the query window, not a fixed fixture date or the wall clock at response time.
      const from = query.match(/datetime_geq: "([^"]+)"/)?.[1];
      if (!from) return new Response("Missing test query window", { status: 500 });
      data.viewer.accounts[0].trend[0].dimensions = {
        date: from.slice(0, 10), datetimeHour: from.replace(".000Z", "Z"),
      };
      return Response.json({ data });
    },
  }));
  t.after(() => mf.dispose());
  return {
    outbound,
    dispatch: async (url = documentUrl, jwt?: string) => mf.dispatchFetch(url, {
      headers: jwt ? { "Cf-Access-Jwt-Assertion": jwt, Cookie: "synthetic-browser-cookie=private" } : {},
    }),
  };
}

function expectCalls(outbound: Outbound[], stages: Stage[]) {
  assert.deepEqual(outbound, stages.map((stage) => ({
    stage, url: stage === "jwks" ? jwksUrl : providerUrl,
    method: stage === "jwks" ? "GET" : "POST",
    authorization: stage === "jwks" ? null : "Bearer SYNTHETIC_TEST_SECRET",
    cookie: null, assertion: null,
  })));
}

test("native workerd rejects redirect:error before outbound fetch at production compatibility", async (t) => {
  const harness = runtime(t, { script: `export default { async fetch() {
    try {
      await fetch(${JSON.stringify(jwksUrl)}, { redirect: "error" });
      return Response.json({ unexpected: "accepted" });
    } catch (error) {
      return Response.json({ name: error.name, message: error.message });
    }
  } };` });
  const response = await harness.dispatch();
  const error = await response.json() as { name: string; message: string };
  assert.equal(error.name, "TypeError");
  assert.match(error.message, /redirect.*error/);
  assert.match(error.message, /manual/);
  t.diagnostic(error.message);
  expectCalls(harness.outbound, []);
});

test("original JWKS option reproduces the exact production identity 503 with zero outbound requests", async (t) => {
  const harness = runtime(t, { variant: "original-access" });
  const response = await harness.dispatch(documentUrl, await token());
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), identityFailure);
  expectCalls(harness.outbound, []);
});

test("original provider option also fails before GraphQL after successful native JWKS verification", async (t) => {
  const harness = runtime(t, { variant: "original-provider" });
  const response = await harness.dispatch(apiUrl, await token());
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "unavailable", message: "Analytics could not be loaded. Try again later." });
  expectCalls(harness.outbound, ["jwks"]);
});

test("signed human owner loads the real protected document using native JWKS verification", async (t) => {
  const harness = runtime(t);
  const response = await harness.dispatch(documentUrl, await token());
  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type")!, /text\/html/);
  assert.match(response.headers.get("Cache-Control")!, /no-store/);
  assert.doesNotMatch(response.headers.get("Content-Security-Policy")!, /plausible|cloudflareinsights/);
  assert.match(await response.text(), /Website analytics/);
  expectCalls(harness.outbound, ["jwks"]);
});

for (const period of ["24h", "7d", "30d"]) {
  test(`native owner ${period} report passes real JWKS, schema and report paths with local KV`, async (t) => {
    const harness = runtime(t);
    const response = await harness.dispatch(`${apiUrl}?period=${period}`, await token());
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("CDN-Cache-Control"), "no-store");
    const body = await response.text();
    const report = JSON.parse(body);
    assert.equal(report.status, "ready");
    assert.equal(report.pageViews, 12);
    assert.equal(report.visits, 5);
    assert.deepEqual(report.breakdowns.paths.rows, [{ label: "/services/", pageViews: 12 }]);
    assert.doesNotMatch(body, /SYNTHETIC|owner@example|hidden@example|siteTag|accountTag/);
    expectCalls(harness.outbound, ["jwks", "schema", "report"]);
  });
}

for (const stage of ["jwks", "schema", "report"] as const) {
  for (const status of [301, 302, 303, 307, 308]) {
    for (const sameOrigin of [true, false]) {
      test(`native ${stage} ${status} ${sameOrigin ? "same" : "cross"}-origin redirect fails closed without forwarding`, async (t) => {
        const origin = sameOrigin ? new URL(stage === "jwks" ? jwksUrl : providerUrl).origin : "https://redirect-target.invalid";
        const harness = runtime(t, { redirect: { stage, status, location: `${origin}/redirected` } });
        const response = await harness.dispatch(apiUrl, await token());
        assert.equal(response.status, 503);
        assert.deepEqual(await response.json(), stage === "jwks" ? identityFailure : providerFailure);
        assert.match(response.headers.get("Cache-Control")!, /no-store/);
        assert.equal(response.headers.get("Location"), null);
        expectCalls(harness.outbound, stage === "jwks" ? ["jwks"] : stage === "schema" ? ["jwks", "schema"] : ["jwks", "schema", "report"]);
      });
    }
  }
}

test("native verification rejects missing, expired, forged, wrong-human and service credentials", async (t) => {
  const harness = runtime(t);
  const forged = await generateKeyPair("RS256");
  const cases = [
    { jwt: undefined, status: 401 },
    { jwt: await token({ exp: Math.floor(Date.now() / 1000) - 1 }), status: 401 },
    { jwt: await token({}, forged.privateKey), status: 401 },
    { jwt: await token({ email: "other@example.test" }), status: 403 },
    { jwt: await token({ service_token_id: "synthetic-service" }), status: 403 },
  ];
  for (const { jwt, status } of cases) {
    const response = await harness.dispatch(apiUrl, jwt);
    assert.equal(response.status, status);
    assert.doesNotMatch(await response.text(), /pageViews|visits|SYNTHETIC/);
  }
  expectCalls(harness.outbound, ["jwks", "jwks", "jwks", "jwks"]);
});

test("native preview canonical-host gate denies even signed owner tokens before JWKS", async (t) => {
  const harness = runtime(t);
  const jwt = await token();
  for (const pathname of ["/admin/analytics/", "/api/admin/analytics/"]) {
    const response = await harness.dispatch(`https://preview.website-8xx.pages.dev${pathname}`, jwt);
    assert.equal(response.status, 403);
    assert.deepEqual(await response.json(), { status: "forbidden", message: "This dashboard is available only on its production domain." });
  }
  expectCalls(harness.outbound, []);
});
