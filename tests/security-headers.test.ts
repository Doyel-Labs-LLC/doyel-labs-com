import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { REQUIRED_SITE_HEADERS, mergeCatchAllCsp } from "../src/lib/security-headers";

const headers = readFileSync(new URL("../public/_headers", import.meta.url), "utf8");

describe("public/_headers", () => {
  it("sets the site-wide headers a reviewer expects, in one catch-all block", () => {
    expect(headers.match(/^\/\*$/gm)).toEqual(["/*"]);
    const block = headers.split(/^\/(?![\s*])/m)[0];
    for (const name of REQUIRED_SITE_HEADERS) {
      expect(block, name).toContain(name);
    }
    expect(block).toContain("X-Content-Type-Options: nosniff");
    expect(block).toContain("X-Frame-Options: DENY");
    expect(block).toContain("includeSubDomains; preload");
    const directives = block.split("\n").filter((line) => line.startsWith("  ") && !line.startsWith("  #"));
    expect(directives.join("\n")).not.toContain("unsafe-inline");
  });

  it("lets the email logo load cross-origin without relaxing every other asset", () => {
    expect(headers).toMatch(/\/apple-touch-icon\.png\n {2}! Cross-Origin-Resource-Policy\n {2}Cross-Origin-Resource-Policy: cross-origin/);
    expect(headers).toMatch(/Cross-Origin-Resource-Policy: same-origin/);
  });
});

describe("mergeCatchAllCsp", () => {
  it("inserts the catch-all policy into the existing block so HSTS is not dropped", () => {
    const merged = mergeCatchAllCsp(headers, "default-src 'self'; script-src 'self' 'sha256-abc'");
    expect(merged.match(/^\/\*$/gm)).toEqual(["/*"]);
    expect(merged).toContain("Strict-Transport-Security:");
    expect(merged).toContain("Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-abc'");
    expect(merged.indexOf("Content-Security-Policy:")).toBeLessThan(merged.indexOf("Strict-Transport-Security:"));
  });

  it("refuses a second catch-all and refuses unsafe-inline scripts", () => {
    expect(() => mergeCatchAllCsp("/*\n  X-Frame-Options: DENY\n/*\n  X-Frame-Options: DENY\n", "default-src 'self'")).toThrow(/exactly one/);
    expect(() => mergeCatchAllCsp(headers, "script-src 'self' 'unsafe-inline'")).toThrow(/unsafe-inline/);
  });
});
