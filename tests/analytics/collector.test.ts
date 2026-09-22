import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { analytics, analyticsCsp, canCollectAnalytics, resolveAnalyticsConfig, selectAnalyticsPolicy } from "../../src/lib/analytics-config";

test("collector selection preserves legacy default and selects one provider without fallback", () => {
  assert.deepEqual(resolveAnalyticsConfig({}), { provider: "none" });
  assert.deepEqual(resolveAnalyticsConfig({ plausibleDomain: "doyel-labs.com" }), { provider: "plausible", domain: "doyel-labs.com" });
  assert.deepEqual(resolveAnalyticsConfig({ provider: "none", plausibleDomain: "doyel-labs.com" }), { provider: "none" });
  assert.deepEqual(resolveAnalyticsConfig({ provider: "cloudflare", plausibleDomain: "doyel-labs.com", cloudflareToken: "a".repeat(32) }),
    { provider: "cloudflare", token: "a".repeat(32) });
  for (const input of [
    { provider: "unexpected" }, { provider: "plausible" }, { plausibleDomain: "another.test" },
    { provider: "cloudflare", plausibleDomain: "doyel-labs.com" },
    { provider: "cloudflare", cloudflareToken: "A".repeat(32) },
    { provider: "cloudflare", cloudflareToken: "NOT_A_BEACON_TOKEN" },
  ]) assert.throws(() => resolveAnalyticsConfig(input), /Invalid public analytics configuration/);
});

test("collection is restricted to exact canonical public browser origin and unambiguous paths", () => {
  assert.equal(canCollectAnalytics("https://doyel-labs.com", "/services/"), true);
  for (const origin of ["", "http://doyel-labs.com", "https://www.doyel-labs.com", "https://doyel-labs.com:8443",
    "https://website-8xx.pages.dev", "https://preview.website-8xx.pages.dev", "http://localhost:3100"]) {
    assert.equal(canCollectAnalytics(origin, "/"), false, origin);
  }
  for (const pathname of ["/admin", "/admin/", "/admin/analytics/", "/ADMIN/analytics", "/administrator", "/api/contact",
    "/_next/static/file.js", "/%61dmin/", "//admin/", "/\\admin/"]) {
    assert.equal(canCollectAnalytics("https://doyel-labs.com", pathname), false, pathname);
  }
});

test("privacy sections and CSP follow the same provider, never dual tracking claims", () => {
  const source = readFileSync(path.join("content", "legal", "privacy.md"), "utf8");
  for (const provider of ["none", "plausible", "cloudflare"] as const) {
    const policy = selectAnalyticsPolicy(source, provider);
    assert.equal(policy.includes("**Plausible Analytics**"), provider === "plausible");
    assert.equal(policy.includes("**Cloudflare Web Analytics**"), provider === "cloudflare");
    assert.equal(policy.includes("No visitor analytics provider is enabled"), provider === "none");
    assert.doesNotMatch(policy, /<!-- analytics:/);
    const config = resolveAnalyticsConfig({ provider, plausibleDomain: "doyel-labs.com", cloudflareToken: "a".repeat(32) });
    const csp = JSON.stringify(analyticsCsp(config));
    assert.equal(csp.includes("plausible.io"), provider === "plausible");
    assert.equal(csp.includes("cloudflareinsights.com"), provider === "cloudflare");
  }
  assert.throws(() => selectAnalyticsPolicy("Missing policy", "none"), /Missing analytics privacy section/);
  assert.throws(() => selectAnalyticsPolicy(source + source, "cloudflare"), /Duplicate analytics privacy section/);
});

test("exported CSP, public HTML and privacy agree with this build's selection", () => {
  const csp = readFileSync(path.join("out", "_headers"), "utf8");
  assert.doesNotMatch(csp, /__ANALYTICS_/);
  assert.equal(csp.includes("https://plausible.io"), analytics.provider === "plausible");
  assert.equal(csp.includes("https://cloudflareinsights.com"), analytics.provider === "cloudflare");
  const privacy = readFileSync(path.join("out", "legal", "privacy", "index.html"), "utf8");
  assert.equal(privacy.includes("<strong>Plausible Analytics</strong>"), analytics.provider === "plausible");
  assert.equal(privacy.includes("<strong>Cloudflare Web Analytics</strong>"), analytics.provider === "cloudflare");
  assert.equal(privacy.includes("No visitor analytics provider is enabled"), analytics.provider === "none");
  const home = readFileSync(path.join("out", "index.html"), "utf8");
  assert.doesNotMatch(home, /<script[^>]+src="https:\/\/(?:plausible\.io|static\.cloudflareinsights\.com)/);
});
