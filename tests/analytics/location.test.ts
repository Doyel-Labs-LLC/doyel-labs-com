import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { canCollectLocation, locationAnalyticsEnabled, resolveLocationEnabled, selectLocationPolicy } from "../../src/lib/location-config";
import { selectAnalyticsPolicy } from "../../src/lib/analytics-config";
import { publishedPaths } from "../../src/lib/public-paths.generated";
import { publicPaths } from "../../server/analytics/admin-assets.generated";
import { coarseLocation } from "../../server/analytics/location";

test("location build flag is default-off and explicitly validated against CF mode", () => {
  for (const provider of ["none", "plausible", "cloudflare"] as const) {
    assert.equal(resolveLocationEnabled(undefined, provider), false);
    assert.equal(resolveLocationEnabled("false", provider), false);
    for (const invalid of ["", "TRUE", "1", "yes"]) assert.throws(() => resolveLocationEnabled(invalid, provider));
  }
  assert.equal(resolveLocationEnabled("true", "cloudflare"), true);
  assert.throws(() => resolveLocationEnabled("true", "none"));
  assert.throws(() => resolveLocationEnabled("true", "plausible"));
});

test("client/server published route allowlists are build-verified; only canonical published paths collect", () => {
  assert.deepEqual([...publicPaths].filter((url) => !["/404/", "/_not-found/"].includes(url)).sort(), publishedPaths);
  for (const pathname of publishedPaths) assert.equal(canCollectLocation("https://doyel-labs.com", pathname), true);
  for (const pathname of ["/404/", "/_not-found/", "/missing/", "/admin/analytics/", "/api/contact", "/_next/static/x.js",
    "/?email=private", "/#hash", "/%63ontact/", "//contact/", "/contact", "/contact/?q=private"]) {
    assert.equal(canCollectLocation("https://doyel-labs.com", pathname), false, pathname);
  }
  for (const origin of ["http://doyel-labs.com", "https://www.doyel-labs.com", "https://website-8xx.pages.dev",
    "https://preview.website-8xx.pages.dev", "http://localhost:3191"]) assert.equal(canCollectLocation(origin, "/"), false);
});

test("location privacy is selected atomically at build time, preserving legal review and provider sections", () => {
  const source = readFileSync(path.join("content", "legal", "privacy.md"), "utf8");
  for (const enabled of [true, false]) {
    const policy = selectLocationPolicy(selectAnalyticsPolicy(source, "cloudflare"), enabled);
    assert.equal(policy.includes("first-party approximate location counts"), enabled);
    assert.equal(policy.includes("First-party city and region collection is not enabled"), !enabled);
    assert.doesNotMatch(policy, /<!-- location:/);
    assert.match(policy, /under_review: true/);
    if (enabled) assert.match(policy, /31 days[\s\S]+30 additional days/);
  }
  assert.throws(() => selectLocationPolicy("missing", true));
  assert.throws(() => selectLocationPolicy(source + source, true));
  const html = readFileSync(path.join("out", "legal", "privacy", "index.html"), "utf8");
  assert.equal(html.includes("first-party approximate location counts"), locationAnalyticsEnabled);
  assert.equal(html.includes("First-party city and region collection is not enabled"), !locationAnalyticsEnabled);
});

test("trusted missing/invalid geography uses bounded explicit unknown markers", () => {
  assert.deepEqual(coarseLocation(), { country: "?", region: "?", city: "?" });
  assert.deepEqual(coarseLocation({ country: "T1", region: "", city: " " }), { country: "?", region: "?", city: "?" });
  assert.deepEqual(coarseLocation({ country: "us", region: "x".repeat(101), city: "a\u0000b" }), { country: "?", region: "?", city: "?" });
  assert.deepEqual(coarseLocation({ country: "US", region: " Wyoming ", city: " Casper " }), { country: "US", region: "Wyoming", city: "Casper" });
});
