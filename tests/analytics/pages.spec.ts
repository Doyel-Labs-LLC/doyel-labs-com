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
  for (const path of ["/", "/contact/", "/websites/", "/about/", "/sitemap.xml"]) {
    const response = await request.get(`${base}${path}`);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["cache-control"]).not.toContain("private");
  }
  const contact = await request.get(`${base}/api/contact`);
  expect(contact.status()).toBe(405);
  expect(contact.headers()["x-content-type-options"]).toBe("nosniff");
  expect(contact.headers()["x-frame-options"]).toBe("DENY");
  const missingOrigin = await request.post(`${base}/api/contact`, {
    data: Buffer.from("{\"email\":\"a@b.co\"}"),
    headers: { "Content-Type": "application/json" },
  });
  expect(missingOrigin.status()).toBe(403);
  const invalid = await request.post(`${base}/api/contact`, {
    data: Buffer.from("not-json"),
    headers: { "Content-Type": "application/json", Origin: "https://doyel-labs.com" },
  });
  expect(invalid.status()).toBe(400);
  expect(await invalid.json()).toEqual({ error: "Invalid JSON body." });
  const legacy = await request.get(`${base}/founder/`, { maxRedirects: 0 });
  expect(legacy.status()).toBe(301);
  expect(legacy.headers().location).toBe("/about/");
  expect(legacy.headers().location).not.toMatch(/^https?:/);

  const origin = "https://doyel-labs.com";
  const json = { "Content-Type": "application/json", Origin: origin };
  const crossSite = await request.post(`${base}/api/contact`, {
    data: { email: "person@example.com", message: "hello there" },
    headers: { ...json, "Sec-Fetch-Site": "cross-site" },
  });
  expect(crossSite.status()).toBe(403);
  const evil = await request.post(`${base}/api/contact`, {
    data: { email: "person@example.com", message: "hello there" },
    headers: { ...json, Origin: "https://evil.example" },
  });
  expect(evil.status()).toBe(403);
  const textBody = await request.post(`${base}/api/contact`, {
    data: "hello",
    headers: { "Content-Type": "text/plain", Origin: origin },
  });
  expect(textBody.status()).toBe(400);
  const arrayBody = await request.post(`${base}/api/contact`, {
    data: [{ email: "a@b.co", message: "hello there" }],
    headers: json,
  });
  expect(arrayBody.status()).toBe(400);
  expect(await arrayBody.json()).toEqual({ error: "Invalid JSON body." });
  const huge = await request.post(`${base}/api/contact`, {
    data: { email: "a@b.co", message: "x".repeat(20_000) },
    headers: json,
  });
  expect(huge.status()).toBe(413);
  const honeypot = await request.post(`${base}/api/contact`, {
    data: { email: "person@example.com", message: "hello there", website: "https://spam.example" },
    headers: json,
  });
  expect(honeypot.status()).toBe(200);
  expect(await honeypot.json()).toEqual({ ok: true });
  const noToken = await request.post(`${base}/api/contact`, {
    data: { email: "person@example.com", message: "We need a website for the shop.", turnstileToken: "" },
    headers: { ...json, "Sec-Fetch-Site": "same-origin" },
  });
  expect(noToken.status()).toBe(500);
  const noTokenBody = await noToken.text();
  expect(noTokenBody).not.toMatch(/resend|api[_ ]?key|turnstile|stack|secret/i);
  for (const response of [contact, crossSite, huge, noToken]) {
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["strict-transport-security"]).toContain("max-age=63072000");
    expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
    expect(headers["x-permitted-cross-domain-policies"]).toBe("none");
    expect(headers["x-robots-tag"]).toContain("noindex");
    expect(headers["access-control-allow-origin"]).toBeUndefined();
    expect(headers["set-cookie"]).toBeUndefined();
  }
});
