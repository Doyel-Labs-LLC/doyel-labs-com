import { expect, test } from "@playwright/test";
import { adminAssets } from "../../server/analytics/admin-assets.generated";

const base = "http://127.0.0.1:3192";
test("real Pages runtime applies shipped private routes and denies alternate hosts", async ({ request }) => {
  for (const host of ["127.0.0.1:3192", "website-8xx.pages.dev", "preview.website-8xx.pages.dev"]) {
    for (const path of ["/admin", "/admin/", "/admin/analytics", "/admin/analytics/", "/api/admin", "/api/admin/", "/api/admin/analytics", "/api/admin/analytics/", "/api/admin/analytics/locations/", "/api/analytics/location/", ...Object.keys(adminAssets)]) {
      const response = await request.get(`${base}${path}`, { headers: { Host: host }, maxRedirects: 0 });
      expect(response.status(), `${host}${path}`).toBe(403);
      expect(response.headers()["cache-control"]).toContain("no-store");
      expect(response.headers()["x-robots-tag"]).toContain("noindex");
      expect(response.headers()["referrer-policy"]).toBe("no-referrer");
      expect(response.headers()["access-control-allow-origin"]).toBeUndefined();
      expect(await response.text()).not.toContain("<html");
    }
  }
});

test("real Pages runtime denies noncanonical location writes before any storage or configuration", async ({ request }) => {
  for (const host of ["127.0.0.1:3192", "website-8xx.pages.dev", "preview.website-8xx.pages.dev"]) {
    const response = await request.post(`${base}/api/analytics/location/`, {
      headers: { Host: host, Origin: "https://doyel-labs.com", "Content-Type": "application/json" }, data: { path: "/" },
    });
    expect(response.status()).toBe(403);
    expect(response.headers()["cache-control"]).toContain("no-store");
    expect(response.headers()["access-control-allow-origin"]).toBeUndefined();
    expect(await response.text()).not.toContain("accepted");
  }
});

test("encoded and alternate artifact URLs cannot reach a public static admin copy", async ({ request }) => {
  for (const path of ["/%61dmin/analytics/", "/ADMIN/analytics/", "//admin/analytics/", "/admin%2fanalytics/", "/admin/analytics.html", "/admin/analytics.txt", "/%61dmin/analytics/index.html", "/%61dmin/analytics/index.txt"]) {
    const response = await request.get(`${base}${path}`, { maxRedirects: 0 });
    expect([403, 404]).toContain(response.status());
    expect(await response.text()).not.toContain("Aggregate activity, not individual visitors.");
  }
});

test("public pages and contact keep their existing routing without analytics configuration", async ({ request }) => {
  for (const path of ["/", "/contact/", "/services/", "/company/", "/sitemap.xml"]) {
    const response = await request.get(`${base}${path}`);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["cache-control"]).not.toContain("private");
  }
  const contact = await request.get(`${base}/api/contact`);
  expect(contact.status()).toBe(405);
  const invalid = await request.post(`${base}/api/contact`, { data: Buffer.from("not-json"), headers: { "Content-Type": "application/json" } });
  expect(invalid.status()).toBe(400);
  expect(await invalid.json()).toEqual({ error: "Invalid JSON body." });
  const legacy = await request.get(`${base}/founder/`, { maxRedirects: 0 });
  expect(legacy.status()).toBe(301);
  expect(legacy.headers().location).toContain("/company/");
});
