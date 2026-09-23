import { expect, test, type Page } from "@playwright/test";
import type { LocationReport } from "../../src/lib/location-contract";
import { adaptReport, dateWindow } from "../../server/analytics/provider";
import { reportFixture } from "./fixtures";

const window = dateWindow("7d", new Date("2026-09-22T14:02:00Z"));
const rum = adaptReport(reportFixture(), window, window.to);
const location: LocationReport = {
  status: "ready", source: "first_party_hourly", period: "7d",
  from: window.from, to: window.to, updatedAt: window.to,
  collectionStart: "2026-09-22T12:00:00.000Z", collectionEnabled: true,
  pageViews: 5000, acceptedHours: 2, dailyCap: 5000, cappedDays: ["2026-09-22"],
  breakdowns: {
    cities: { rows: [{ country: "US", region: "Wyoming", city: "Casper", pageViews: 4999 }, { country: "?", region: "?", city: "?", pageViews: 1 }], limited: true },
    regions: { rows: [{ country: "US", region: "Wyoming", pageViews: 4999 }, { country: "?", region: "?", pageViews: 1 }], limited: false },
    countries: { rows: [{ country: "US", pageViews: 4999 }, { country: "?", pageViews: 1 }], limited: false },
  },
};

async function intercept(page: Page, locations: unknown = location, provider: unknown = rum, status = 200) {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.hostname !== "127.0.0.1") return route.abort();
    if (url.pathname === "/api/admin/analytics/locations/") return route.fulfill({ status, json: locations });
    if (url.pathname === "/api/admin/analytics/") return route.fulfill({ json: provider });
    return route.continue();
  });
}

test("locations are responsive, explicitly approximate, unknown-aware and honest about caps and launch coverage", async ({ page }) => {
  await intercept(page);
  await page.goto("/admin/analytics/");
  const panel = page.getByRole("region", { name: "Approximate cities and regions" });
  await expect(panel.getByRole("heading", { name: "Accepted location pageviews" })).toBeVisible();
  await expect(panel.getByText("Casper, Wyoming, United States", { exact: true })).toBeVisible();
  await expect(panel.getByText("Unknown city, Unknown region, Unknown country", { exact: true })).toBeVisible();
  await expect(panel.getByText(/Daily cap reached: 2026-09-22/)).toBeVisible();
  await expect(panel.getByText(/First accepted data:/)).toContainText("no historical backfill");
  await expect(panel.getByText(/This independent source/)).toContainText("not unique visitors");
  await expect(panel.getByText(/Top 20 only/)).toBeVisible();
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await panel.screenshot({ path: "test-results/locations-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await panel.screenshot({ path: "test-results/locations-desktop.png" });
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
});

test("either service can fail without hiding the other report, and errors never become location zeros", async ({ page }) => {
  await intercept(page, { status: "unavailable" }, rum, 503);
  await page.goto("/admin/analytics/");
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toBeVisible();
  await expect(page.getByText("Location counts are unavailable. No counts were loaded.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Accepted location pageviews" })).toHaveCount(0);
  await page.unrouteAll();
  await intercept(page, location, { status: "unavailable" });
  await page.goto("/admin/analytics/");
  await expect(page.getByRole("heading", { name: "Analytics is unavailable", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Accepted location pageviews" })).toBeVisible();
});

test("location presets and refresh budgets are independent and hiding the page clears both reports", async ({ page }) => {
  await intercept(page);
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/admin/analytics/")) requests.push(new URL(request.url()).pathname);
  });
  await page.goto("/admin/analytics/");
  await expect(page.getByRole("heading", { name: "Accepted location pageviews" })).toBeVisible();
  const select = page.getByRole("combobox", { name: "Locations date range (UTC)", exact: true });
  await select.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(select).toHaveValue("30d");
  await expect(page.getByRole("heading", { name: "Accepted location pageviews" })).toBeVisible();
  expect(requests.filter((url) => url === "/api/admin/analytics/")).toHaveLength(1);
  expect(requests.filter((url) => url === "/api/admin/analytics/locations/")).toHaveLength(2);
  await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pagehide")));
  await expect(page.getByRole("heading", { name: "Accepted location pageviews" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Page views", exact: true })).toHaveCount(0);
  await expect(page.getByText("Location counts cleared while this tab was away. Refresh to load again.")).toBeVisible();
});

test("disabled, unconfigured, auth, rate-limit and malformed reports do not show location totals", async ({ page }) => {
  for (const body of [{ status: "disabled" }, { status: "unconfigured" }, { status: "unauthorized" },
    { status: "forbidden" }, { status: "rate_limited" }, { status: "ready", pageViews: 0 },
    { ...location, pageViews: -1 }]) {
    await page.unrouteAll();
    await intercept(page, body);
    await page.goto("/admin/analytics/");
    await expect(page.getByText("Loading location counts...")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Accepted location pageviews" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Page views", exact: true })).toBeVisible();
  }
});

test("empty and collection-off coverage copy is distinct from service failure", async ({ page }) => {
  await intercept(page, {
    ...location, status: "empty", pageViews: 0, acceptedHours: 0, collectionStart: null,
    collectionEnabled: false, cappedDays: [], breakdowns: {
      cities: { rows: [], limited: false }, regions: { rows: [], limited: false }, countries: { rows: [], limited: false },
    },
  });
  await page.goto("/admin/analytics/");
  await expect(page.getByText("Collection has not received any data yet.", { exact: false })).toBeVisible();
  await expect(page.getByText("No accepted location pageviews in this range.", { exact: false })).toBeVisible();
  await expect(page.getByText("Collection is currently switched off.", { exact: false })).toBeVisible();
  await expect(page.getByText("Location counts are unavailable. No counts were loaded.")).toHaveCount(0);
});
