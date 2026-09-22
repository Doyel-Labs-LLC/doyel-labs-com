import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/analytics",
  testMatch: "*.spec.ts",
  workers: 1,
  use: { baseURL: "http://127.0.0.1:3191", browserName: "chromium" },
  webServer: [
    {
      command: "npx tsx tests/analytics/preview-server.ts",
      url: "http://127.0.0.1:3191/admin/analytics/",
      reuseExistingServer: false,
    },
    {
      command: "npx wrangler pages dev out --ip 127.0.0.1 --port 3192 --inspector-port 9232 --compatibility-date 2026-09-22 --log-level error",
      url: "http://127.0.0.1:3192/",
      env: { WRANGLER_SEND_METRICS: "false" },
      reuseExistingServer: false,
    },
  ],
});
