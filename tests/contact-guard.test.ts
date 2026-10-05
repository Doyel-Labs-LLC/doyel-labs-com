import { describe, expect, it } from "vitest";
import {
  API_SECURITY_HEADERS,
  declaredBodyTooLarge,
  isDeployedBranch,
  isJsonContentType,
  isProductionBranch,
  originAllowed,
  readBoundedBody,
  turnstileHostAllowed,
} from "../src/lib/contact-guard";

describe("deployment gates", () => {
  it("treats only the master branch as production, and any branch as deployed", () => {
    expect(isProductionBranch("master")).toBe(true);
    expect(isProductionBranch("release/v11")).toBe(false);
    expect(isProductionBranch(undefined)).toBe(false);
    expect(isDeployedBranch("release/v11")).toBe(true);
    expect(isDeployedBranch("master")).toBe(true);
    expect(isDeployedBranch(undefined)).toBe(false);
    expect(isDeployedBranch("")).toBe(false);
  });
});

describe("originAllowed", () => {
  it("accepts the public origins on production and rejects previews and localhost", () => {
    expect(originAllowed("https://doyel-labs.com", "master")).toBe(true);
    expect(originAllowed("https://www.doyel-labs.com", "master")).toBe(true);
    expect(originAllowed("https://abc.website.pages.dev", "master")).toBe(false);
    expect(originAllowed("http://127.0.0.1:3192", "master")).toBe(false);
    expect(originAllowed("http://localhost:3100", "master")).toBe(false);
    expect(originAllowed(null, "master")).toBe(false);
  });

  it("accepts this project's preview origins only outside production", () => {
    expect(originAllowed("https://feat-1.website.pages.dev", "preview")).toBe(true);
    expect(originAllowed("https://evil.pages.dev", "preview")).toBe(false);
    expect(originAllowed("https://feat-1.website.pages.dev.evil.test", "preview")).toBe(false);
  });

  it("accepts loopback origins outside production, including local Pages dev", () => {
    expect(originAllowed("http://127.0.0.1:3192", undefined)).toBe(true);
    expect(originAllowed("http://localhost:3100", undefined)).toBe(true);
    expect(originAllowed("http://127.0.0.1:3192", "release/v11")).toBe(true);
    expect(originAllowed("http://127.0.0.1:3192", "master")).toBe(false);
  });
});

describe("turnstileHostAllowed", () => {
  it("requires a hostname and locks production to the public site", () => {
    expect(turnstileHostAllowed(undefined, true)).toBe(false);
    expect(turnstileHostAllowed("doyel-labs.com", true)).toBe(true);
    expect(turnstileHostAllowed("www.doyel-labs.com", true)).toBe(true);
    expect(turnstileHostAllowed("localhost", true)).toBe(false);
    expect(turnstileHostAllowed("feat.website.pages.dev", true)).toBe(false);
    expect(turnstileHostAllowed("feat.website.pages.dev", false)).toBe(true);
    expect(turnstileHostAllowed("localhost", false)).toBe(true);
    expect(turnstileHostAllowed("127.0.0.1", false)).toBe(true);
  });
});

describe("isJsonContentType", () => {
  it("accepts JSON and rejects lookalikes", () => {
    expect(isJsonContentType("application/json")).toBe(true);
    expect(isJsonContentType("application/json; charset=utf-8")).toBe(true);
    expect(isJsonContentType("application/jsonfoo")).toBe(false);
    expect(isJsonContentType("text/plain")).toBe(false);
    expect(isJsonContentType(null)).toBe(false);
  });
});

describe("readBoundedBody", () => {
  it("rejects an overstated Content-Length and a body that exceeds the cap", async () => {
    expect(declaredBodyTooLarge("999999", 32)).toBe(true);
    expect(declaredBodyTooLarge("nope", 32)).toBe(true);
    expect(declaredBodyTooLarge(null, 32)).toBe(false);

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("x".repeat(40)));
        controller.close();
      },
    });
    const lying = new Request("https://doyel-labs.com/api/contact", { method: "POST", body: stream, duplex: "half" });
    expect(await readBoundedBody(lying, 16)).toBeNull();
    expect(
      await readBoundedBody(new Request("https://doyel-labs.com/api/contact", { method: "POST", body: "{\"a\":1}" }), 32),
    ).toBe("{\"a\":1}");
  });
});

describe("API response headers", () => {
  it("ships a locked-down set on JSON responses", () => {
    expect(API_SECURITY_HEADERS["x-content-type-options"]).toBe("nosniff");
    expect(API_SECURITY_HEADERS["strict-transport-security"]).toContain("max-age=63072000");
    expect(API_SECURITY_HEADERS["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(API_SECURITY_HEADERS["content-security-policy"]).not.toContain("unsafe-inline");
    expect(API_SECURITY_HEADERS["x-frame-options"]).toBe("DENY");
    expect(API_SECURITY_HEADERS["referrer-policy"]).toBe("no-referrer");
    expect(API_SECURITY_HEADERS["cross-origin-opener-policy"]).toBe("same-origin");
    expect(API_SECURITY_HEADERS["x-permitted-cross-domain-policies"]).toBe("none");
    expect(API_SECURITY_HEADERS["x-robots-tag"]).toBe("noindex");
    expect(API_SECURITY_HEADERS["permissions-policy"]).toContain("interest-cohort=()");
    expect(API_SECURITY_HEADERS["permissions-policy"]).toContain("display-capture=()");
  });
});
