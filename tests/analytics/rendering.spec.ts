import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const base = "http://127.0.0.1:3192";

const paths = [
  ...readFileSync("out/sitemap.xml", "utf8").matchAll(/<loc>https:\/\/doyel-labs\.com([^<]*)<\/loc>/g),
].map((match) => match[1]);

test.describe("public pages stay intact under the generated CSP", () => {
  for (const path of paths) {
    test(`${path} has no CSP violations, console errors, or broken images`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const violations: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => consoleErrors.push(error.message));
      await page.addInitScript(() => {
        const record = (event: SecurityPolicyViolationEvent) => {
          (window as unknown as { __csp: string[] }).__csp.push(
            `${event.violatedDirective} blocked ${event.blockedURI || event.sample || "inline"}`,
          );
        };
        (window as unknown as { __csp: string[] }).__csp = [];
        document.addEventListener("securitypolicyviolation", record);
      });

      const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
      expect(response?.status(), path).toBe(200);
      expect(response?.headers()["content-security-policy"] ?? "").not.toContain("unsafe-inline");
      expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
      expect(response?.headers()["x-frame-options"]).toBe("DENY");

      await page.evaluate(async () => {
        await Promise.all([...document.images].map((img) => img.decode().catch(() => undefined)));
        await Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => undefined)));
        const height = document.documentElement.scrollHeight;
        for (let y = 0; y < height; y += window.innerHeight) window.scrollTo(0, y);
        window.scrollTo(0, 0);
      });

      const images = await page.evaluate(() =>
        [...document.images].map((img) => {
          let displayNone = false;
          let invisible = false;
          for (let node: Element | null = img; node; node = node.parentElement) {
            const style = getComputedStyle(node);
            if (style.display === "none") displayNone = true;
            if (style.visibility === "hidden" || Number(style.opacity) === 0) invisible = true;
          }
          return {
            src: img.currentSrc || img.getAttribute("src") || "",
            naturalWidth: img.naturalWidth,
            clientWidth: img.clientWidth,
            displayNone,
            invisible,
          };
        }),
      );
      // display:none is a responsive hide. opacity:0 is content a visitor cannot see.
      const broken = images.filter(
        (img) => !img.displayNone && (img.invisible || img.naturalWidth === 0 || img.clientWidth === 0),
      );
      expect(broken, `${path} broken or hidden images`).toEqual([]);

      const csp = await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? []);
      violations.push(...csp);
      expect(violations, path).toEqual([]);
      expect(consoleErrors, path).toEqual([]);
    });
  }

  test("home content is visible without JavaScript and with reduced motion", async ({ browser }) => {
    for (const options of [{ javaScriptEnabled: false }, { reducedMotion: "reduce" as const }]) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...options });
      const page = await context.newPage();
      await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { name: "Three ways to start" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "A real conversation, then a real build." })).toBeVisible();
      await expect(page.getByRole("heading", { name: /Tell us what your business does/ })).toBeVisible();
      await context.close();
    }
  });
});
