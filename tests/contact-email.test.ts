import { describe, expect, it } from "vitest";
import {
  renderNotificationHtml,
  renderNotificationText,
  renderReceiptHtml,
  renderReceiptText,
  safeFirstName,
} from "../src/lib/contact-email";

const visitor = {
  name: "Jordan Reed",
  email: "jordan@example.com",
  projectTypeLabel: "Website",
  subject: "New site <b>please</b>",
  message: "Hello <script>alert(1)</script>\nSecond line",
  preferredTimes: "",
};

describe("safeFirstName", () => {
  it("keeps ordinary first names", () => {
    expect(safeFirstName("Jordan Reed")).toBe("Jordan");
    expect(safeFirstName("  Anne-Marie O'Neil ")).toBe("Anne-Marie");
    expect(safeFirstName("José")).toBe("José");
  });
  it("drops anything that isn't a plain name", () => {
    for (const bad of ["", "http://spam.example", "WIN$$$", "<b>hi</b>", "a".repeat(41), "123"]) {
      expect(safeFirstName(bad)).toBe("");
    }
  });
});

describe("notification email", () => {
  it("escapes visitor input and keeps line breaks", () => {
    const html = renderNotificationHtml({ ...visitor, replyMailto: "mailto:jordan%40example.com" });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;b&gt;please&lt;/b&gt;");
    expect(html).toContain("Second line");
    expect(html).toContain("Reply to Jordan");
    expect(html).toContain("#f6eee2");
  });
  it("has a plain-text version with the message", () => {
    const text = renderNotificationText(visitor);
    expect(text).toContain("Jordan Reed <jordan@example.com>");
    expect(text).toContain(visitor.message);
  });
});

describe("receipt email", () => {
  it("greets by first name and never repeats the message", () => {
    const html = renderReceiptHtml({ name: visitor.name });
    const text = renderReceiptText({ name: visitor.name });
    expect(html).toContain("Thank you, Jordan.");
    expect(text).toContain("Thank you, Jordan.");
    for (const out of [html, text]) {
      expect(out).not.toContain("Second line");
      expect(out).not.toContain("script");
      expect(out).toContain("within one business day");
    }
  });
  it("falls back to a neutral greeting for odd names", () => {
    expect(renderReceiptHtml({ name: "http://spam.example" })).toContain("Thank you. We have your message.");
    expect(renderReceiptHtml({ name: "http://spam.example" })).not.toContain("spam.example");
  });
});
