import { expect, test, type Page } from "@playwright/test";
import { analytics } from "../../src/lib/analytics-config";

const beaconScript = "https://static.cloudflareinsights.com/beacon.min.js";
let cloudflareScript = "";
test.beforeAll(async ({ request }) => {
  if (analytics.provider !== "cloudflare") return;
  // Download executable code only. Every browser request, including all
  // ingestion, is intercepted below; no test activity reaches a collector.
  const response = await request.get(beaconScript, { timeout: 20000 });
  expect(response.ok()).toBe(true);
  cloudflareScript = await response.text();
  expect(cloudflareScript.length).toBeLessThan(262144);
});
test.afterEach(async ({ page }) => {
  await page.waitForLoadState("networkidle");
});

async function mockSite(page: Page) {
  const beacons: string[] = [];
  const vendorRequests: string[] = [];
  await page.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (["doyel-labs.com", "www.doyel-labs.com", "website-8xx.pages.dev", "preview.website-8xx.pages.dev"].includes(url.hostname)) {
      const response = await route.fetch({
        url: `http://127.0.0.1:3191${url.pathname}${url.search}`,
        maxRedirects: 0,
      });
      return route.fulfill({ status: response.status(), headers: response.headers(), body: await response.body() });
    }
    vendorRequests.push(request.url());
    if (request.url() === beaconScript) {
      return route.fulfill({ contentType: "text/javascript", body: cloudflareScript });
    }
    if (url.hostname === "plausible.io") {
      return route.fulfill({ contentType: "text/javascript", body: "window.__collectorBoots = (window.__collectorBoots || 0) + 1;" });
    }
    if (url.hostname === "cloudflareinsights.com") {
      beacons.push(request.postData() ?? "");
      return route.fulfill({ status: 204, headers: { "Access-Control-Allow-Origin": "https://doyel-labs.com" } });
    }
    return route.abort();
  });
  return { beacons, vendorRequests };
}

test("only one selected collector loads on canonical public pages and survives public SPA navigation", async ({ page }) => {
  const { beacons } = await mockSite(page);
  await page.goto("https://doyel-labs.com/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const selector = 'script[src*="plausible.io"], script[src*="static.cloudflareinsights.com"]';
  await expect(page.locator(selector)).toHaveCount(analytics.provider === "none" ? 0 : 1);
  if (analytics.provider === "cloudflare") {
    const script = page.locator(`script[src="${beaconScript}"]`);
    await expect(script).toHaveAttribute("type", "module");
    expect(JSON.parse((await script.getAttribute("data-cf-beacon"))!)).toEqual({ token: analytics.token });
    await expect.poll(() => beacons.length).toBeGreaterThan(0);
  }
  await page.evaluate(() => { (window as Window & { testDocument?: string }).testDocument = "public"; });
  await page.locator('header a[href="/services/"]').first().click();
  await expect(page).toHaveURL("https://doyel-labs.com/services/");
  expect(await page.evaluate(() => (window as Window & { testDocument?: string }).testDocument)).toBe("public");
  await expect(page.locator(selector)).toHaveCount(analytics.provider === "none" ? 0 : 1);
  if (analytics.provider === "cloudflare") {
    // The real vendor implementation, not a simulated history listener.
    await expect.poll(() => beacons.some((body) => body.includes("doyel-labs.com/services/"))).toBe(true);
    expect(beacons.join("")).not.toContain("/admin");
  }
});

test("preview/default/www hosts and direct private entry never load a collector", async ({ page }) => {
  const { vendorRequests } = await mockSite(page);
  for (const url of [
    "https://preview.website-8xx.pages.dev/", "https://website-8xx.pages.dev/",
    "https://www.doyel-labs.com/", "https://doyel-labs.com/admin/analytics/",
  ]) {
    await page.goto(url);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('script[src*="plausible.io"], script[src*="cloudflareinsights.com"]')).toHaveCount(0);
  }
  expect(vendorRequests).toEqual([]);
});

test("public-to-private Next navigation starts a new document without carrying the collector", async ({ page }) => {
  const { beacons } = await mockSite(page);
  await page.goto("https://doyel-labs.com/");
  if (analytics.provider !== "none") {
    await expect(page.locator('script[src*="plausible.io"], script[src*="cloudflareinsights.com"]')).toHaveCount(1);
  }
  if (analytics.provider === "cloudflare") await expect.poll(() => beacons.length).toBeGreaterThan(0);
  await page.evaluate(() => { (window as Window & { testDocument?: string }).testDocument = "public"; });
  await page.evaluate(() => {
    const next = (window as Window & { next?: { router: { push: (url: string) => void } } }).next;
    if (!next) throw new Error("Next router is not available");
    next.router.push("/admin/analytics/");
  });
  await expect(page.getByRole("heading", { name: "Website analytics" })).toBeVisible();
  expect(await page.evaluate(() => (window as Window & { testDocument?: string }).testDocument)).toBeUndefined();
  await expect(page.locator('script[src*="plausible.io"], script[src*="cloudflareinsights.com"]')).toHaveCount(0);
  await page.waitForLoadState("networkidle");
  expect(beacons.join("")).not.toContain("/admin");
});

for (const [origin, width] of [
  ["https://doyel-labs.com", 1440],
  ["https://preview.website-8xx.pages.dev", 375],
  ["https://website-8xx.pages.dev", 320],
] as const) {
  test(`footer owner entry from ${origin} is accessible and navigates without prefetch`, async ({ page }) => {
    const { beacons, vendorRequests } = await mockSite(page);
    const adminRequests: { url: string; document: boolean }[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname.startsWith("/admin")) {
        adminRequests.push({ url: request.url(), document: request.isNavigationRequest() && request.resourceType() === "document" });
      }
    });
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/`);
    if (origin === "https://doyel-labs.com" && analytics.provider !== "none") {
      await expect(page.locator('script[src*="plausible.io"], script[src*="cloudflareinsights.com"]')).toHaveCount(1);
      if (analytics.provider === "cloudflare") await expect.poll(() => beacons.length).toBeGreaterThan(0);
    }
    const footer = page.getByRole("contentinfo");
    const owner = footer.getByRole("link", { name: "Owner login", exact: true });
    await expect(owner).toHaveAttribute("href", "https://doyel-labs.com/admin/analytics/");
    expect(await owner.getAttribute("target")).toBeNull();
    expect(await owner.evaluate((element) => element.tagName)).toBe("A");
    await owner.scrollIntoViewIfNeeded();
    await owner.hover();
    const links = footer.getByRole("link");
    await links.nth((await links.count()) - 2).focus();
    await page.keyboard.press("Tab");
    await expect(owner).toBeFocused();
    expect(await owner.evaluate((element) => element.matches(":focus-visible"))).toBe(true);
    await expect(owner).toHaveCSS("outline-style", "solid");
    await expect(owner).toHaveCSS("outline-width", "2px");
    const box = await owner.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.waitForLoadState("networkidle");
    expect(adminRequests).toEqual([]);
    if (origin !== "https://doyel-labs.com") expect(vendorRequests).toEqual([]);
    await page.evaluate(() => { (window as Window & { testDocument?: string }).testDocument = "public"; });
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("https://doyel-labs.com/admin/analytics/");
    await expect(page.getByRole("heading", { name: "Website analytics" })).toBeVisible();
    expect(adminRequests).toEqual([{ url: "https://doyel-labs.com/admin/analytics/", document: true }]);
    expect(await page.evaluate(() => (window as Window & { testDocument?: string }).testDocument)).toBeUndefined();
    await expect(page.locator('script[src*="plausible.io"], script[src*="cloudflareinsights.com"]')).toHaveCount(0);
    await page.waitForLoadState("networkidle");
    expect(beacons.join("")).not.toContain("/admin");
  });
}
