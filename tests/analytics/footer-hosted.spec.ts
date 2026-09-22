import { expect, test } from "@playwright/test";

const preview = process.env.ANALYTICS_PREVIEW_URL;
const canonicalTarget = "https://doyel-labs.com/admin/analytics/";

test.describe("hosted owner entry", () => {
  test.skip(!preview, "Set ANALYTICS_PREVIEW_URL to an approved Git-connected preview.");
  test.use({ serviceWorkers: "block" });

  test.beforeAll(() => {
    expect(preview).toMatch(/^https:\/\/[a-f0-9]+\.website-8xx\.pages\.dev\/?$/);
  });

  test("preview footer reaches the signed-out canonical Access gate without collecting", async ({ page }) => {
    const vendorRequests: string[] = [];
    let entryRequests = 0;
    await page.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (/cloudflareinsights\.com$|plausible\.io$/.test(url.hostname)) vendorRequests.push(url.hostname);
      if (request.method() !== "GET") return route.abort();
      if (request.url() === canonicalTarget) {
        expect(request.isNavigationRequest()).toBe(true);
        expect(request.resourceType()).toBe("document");
        entryRequests++;
        const response = await route.fetch({ maxRedirects: 0 });
        expect(response.status()).toBe(302);
        const location = new URL(response.headers().location);
        expect(location.origin).toBe("https://aged-frog-7595.cloudflareaccess.com");
        expect(location.pathname).toContain("/cdn-cgi/access/login");
        // Stop at the real signed-out boundary; never automate login or retain its response/cookies.
        return route.fulfill({ contentType: "text/html", body: "<h1>Access sign-in required</h1>" });
      }
      if (url.origin === new URL(preview!).origin && !url.pathname.startsWith("/api/")) return route.continue();
      return route.abort();
    });
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(preview!);
    const owner = page.getByRole("contentinfo").getByRole("link", { name: "Owner login", exact: true });
    await expect(owner).toHaveAttribute("href", canonicalTarget);
    await expect(page.locator('header a[href*="/admin"], main a[href*="/admin"]')).toHaveCount(0);
    await owner.scrollIntoViewIfNeeded();
    await owner.hover();
    await page.waitForLoadState("networkidle");
    expect(entryRequests).toBe(0);
    expect(vendorRequests).toEqual([]);
    await page.getByRole("contentinfo").screenshot({ path: "test-results/owner-footer-preview-mobile.png" });
    await owner.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { name: "Access sign-in required" })).toBeVisible();
    expect(entryRequests).toBe(1);
    expect(vendorRequests).toEqual([]);
  });

  test("preview and default private routes remain denied and excluded from the XML sitemap", async ({ request }) => {
    for (const origin of [new URL(preview!).origin, "https://website-8xx.pages.dev"]) {
      for (const path of ["/admin", "/admin/analytics/", "/admin/analytics/index.html", "/admin/analytics/index.txt", "/api/admin", "/api/admin/analytics/"]) {
        const response = await request.get(`${origin}${path}`, { maxRedirects: 0 });
        expect(response.status()).toBe(403);
        expect(response.headers()["cache-control"]).toContain("no-store");
        expect(response.headers()["x-robots-tag"]).toContain("noindex");
        expect(await response.text()).not.toContain("Website analytics");
      }
    }
    const sitemap = await request.get(`${new URL(preview!).origin}/sitemap.xml`);
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).not.toContain("/admin");
  });
});
