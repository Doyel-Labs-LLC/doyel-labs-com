import { describe, expect, it } from "vitest";
import { renderTrustedMarkdown } from "../src/lib/legal";

describe("renderTrustedMarkdown", () => {
  it("escapes raw HTML so a script tag cannot be hashed into the CSP", () => {
    const html = renderTrustedMarkdown("Hello <script>alert(1)</script> and <img src=x onerror=alert(1)>");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;");
  });

  it("keeps ordinary links and drops javascript urls", () => {
    const html = renderTrustedMarkdown("[Privacy](/legal/privacy/) and [nope](javascript:alert(1))");
    expect(html).toContain('href="/legal/privacy/"');
    expect(html).not.toContain("javascript:");
  });
});
