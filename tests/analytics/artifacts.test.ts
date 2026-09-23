import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { adminAssets, publicPaths } from "../../server/analytics/admin-assets.generated";

test("all exported admin HTML/RSC/text artifacts live only in the Functions bundle", () => {
  assert.equal(existsSync(path.join("out", "admin")), false);
  assert.ok(Object.keys(adminAssets).length >= 2);
  for (const [url, asset] of Object.entries(adminAssets)) {
    assert.ok(url.startsWith("/admin/"));
    assert.equal(existsSync(path.join("out", ...url.split("/").filter(Boolean))), false);
    assert.doesNotMatch(asset.content, /SYNTHETIC_TEST_SECRET|CF_ANALYTICS_API_TOKEN|CF_ACCESS_AUD|owner@example\.test/);
  }
  const html = adminAssets["/admin/analytics/index.html"];
  assert.match(html.content, /noindex/);
  assert.doesNotMatch(html.content, /src="https:\/\/(plausible\.io|static\.cloudflareinsights\.com)/);
  for (const match of html.content.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    if (match[1]) assert.ok(html.scriptHashes.includes(createHash("sha256").update(match[1]).digest("base64")));
  }
});

test("shipped routes protect parent/slash/artifacts while preserving public and contact routing", () => {
  const routes = JSON.parse(readFileSync(path.join("out", "_routes.json"), "utf8"));
  assert.deepEqual(routes, JSON.parse(readFileSync(path.join("public", "_routes.json"), "utf8")));
  assert.deepEqual(routes.exclude, []);
  const invokes = (url: string) => routes.include.some((rule: string) => new RegExp(`^${rule.replaceAll("*", ".*")}$`).test(url));
  for (const url of [
    "/admin", "/admin/", "/admin/analytics", "/admin/analytics/",
    "/api/admin", "/api/admin/", "/api/admin/analytics", "/api/admin/analytics/",
    ...Object.keys(adminAssets), "/api/contact", "/api/contact/",
    "/api/analytics/location", "/api/analytics/location/", "/api/admin/analytics/locations/",
  ]) assert.equal(invokes(url), true, url);
  for (const url of ["/", "/contact/", "/services/", "/_next/static/chunks/example.js", "/media/logo.svg", "/sitemap.xml"]) {
    assert.equal(invokes(url), false, url);
  }
  assert.ok(publicPaths.includes("/contact/"));
  assert.ok(publicPaths.every((url) => !url.startsWith("/admin")));
  assert.doesNotMatch(readFileSync(path.join("out", "sitemap.xml"), "utf8"), /\/admin/);
});
