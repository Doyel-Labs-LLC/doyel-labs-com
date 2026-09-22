import { expect, test } from "@playwright/test";
import { adaptReport, dateWindow } from "../../server/analytics/provider";
import { reportFixture } from "./fixtures";

const window = dateWindow("7d", new Date("2026-09-22T14:02:00Z"));
const report = adaptReport(reportFixture(), window, window.to);
test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    if (new URL(route.request().url()).hostname !== "127.0.0.1") return route.abort();
    return route.continue();
  });
});

test("disabled, unconfigured, session, rate-limit and provider errors show no metrics", async ({ page }) => {
  for (const [status, title] of [
    ["disabled", "Analytics is not activated"], ["unconfigured", "Setup is incomplete"],
    ["unauthorized", "Sign in again"], ["forbidden", "Access denied"],
    ["rate_limited", "Refresh limit reached"], ["unavailable", "Analytics is unavailable"],
    ["schema_unavailable", "Provider setup needs review"],
  ]) {
    await page.route("**/api/admin/analytics/**", (route) => route.fulfill({ status: status === "rate_limited" ? 429 : 503, json: { status } }));
    await page.goto("/admin/analytics/");
    await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Page views", exact: true })).toHaveCount(0);
    await expect(page.locator('script[src*="plausible"], script[src*="cloudflareinsights"]')).toHaveCount(0);
    await page.unroute("**/api/admin/analytics/**");
  }
});

test("loading and empty states are distinct from errors and zeros", async ({ page }) => {
  let release: () => void = () => {};
  const paused = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/admin/analytics/**", async (route) => {
    await paused;
    await route.fulfill({ json: { ...report, status: "empty", pageViews: 0, visits: 0, trend: [] } });
  });
  await page.goto("/admin/analytics/");
  await expect(page.getByRole("status")).toContainText("Loading aggregate analytics");
  await expect(page.getByRole("button", { name: "Loading..." })).toBeDisabled();
  release();
  await expect(page.getByRole("heading", { name: "No reported activity" })).toBeVisible();
  await expect(page.getByText("This does not prove nobody visited.", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toHaveCount(0);
});

test("responsive aggregate display, sampling, keyboard controls and no private storage", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/api/admin/analytics/**", (route) => route.fulfill({
    json: { ...report, sampled: true, maxSampleInterval: 10 },
  }));
  await page.goto("/admin/analytics/");
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toBeVisible();
  await expect(page.getByText("Sampled estimates.", { exact: false })).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "/services/", exact: true })).toBeVisible();
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole("heading", { name: "Website analytics" })).toBeVisible();
  }
  await page.getByText("View trend values", { exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("table", { name: /Reported time buckets/ })).toBeVisible();
  const select = page.getByRole("combobox", { name: "Date range (UTC)" });
  await select.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(select).toHaveValue("30d");
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toBeVisible();
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  expect(errors).toEqual([]);
  await page.screenshot({ path: "test-results/analytics-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "test-results/analytics-desktop.png", fullPage: true });
});

test("network/HTML errors clear old metrics, and hiding the page clears the report", async ({ page }) => {
  let fail = false;
  await page.route("**/api/admin/analytics/**", (route) => fail
    ? route.fulfill({ status: 200, contentType: "text/html", body: "<html>Access login</html>" })
    : route.fulfill({ json: report }));
  await page.goto("/admin/analytics/");
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toBeVisible();
  await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pagehide")));
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("Metrics cleared");
  fail = true;
  await page.getByRole("combobox").selectOption("30d");
  await expect(page.getByRole("heading", { name: "Analytics is unavailable", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toHaveCount(0);
});

test("malformed success data is an explicit error, not a broken or zero-valued dashboard", async ({ page }) => {
  await page.route("**/api/admin/analytics/**", (route) => route.fulfill({ json: { status: "ready", pageViews: 12 } }));
  await page.goto("/admin/analytics/");
  await expect(page.getByRole("heading", { name: "Analytics is unavailable", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toHaveCount(0);
});

test("public pages retain Plausible and have no admin navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('script[src="https://plausible.io/js/script.outbound-links.js"]')).toHaveCount(1);
  await expect(page.locator('a[href^="/admin"]')).toHaveCount(0);
  await page.goto("/contact/");
  await expect(page.getByRole("textbox", { name: /email/i }).first()).toBeVisible();
  await expect(page.locator('a[href^="/admin"]')).toHaveCount(0);
});
