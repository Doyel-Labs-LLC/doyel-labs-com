import { describe, expect, it } from "vitest";
import { EMAIL_RE, LIMITS, cleanContact, validateContact } from "../src/lib/contact-form";

describe("cleanContact", () => {
  it("trims, caps, and strips line breaks from single-line fields", () => {
    const c = cleanContact({
      name: "  Ada\r\nLovelace  ",
      email: " ada@example.com\n",
      subject: "Hi\r\nBcc: evil@example.com",
      message: "  hello there  ",
      projectType: "WEBSITE",
    });
    expect(c.name).toBe("Ada Lovelace");
    expect(c.email).toBe("ada@example.com");
    expect(c.subject).toBe("Hi Bcc: evil@example.com");
    expect(c.subject).not.toMatch(/[\r\n]/);
    expect(c.message).toBe("hello there");
    expect(c.projectType).toBe("website");
  });

  it("falls back to 'general' for unknown project types", () => {
    expect(cleanContact({ projectType: "bai" }).projectType).toBe("general");
    expect(cleanContact({ projectType: 42 }).projectType).toBe("general");
  });

  it("caps message length", () => {
    const c = cleanContact({ message: "x".repeat(LIMITS.message + 500) });
    expect(c.message.length).toBe(LIMITS.message);
  });

  it("keeps the honeypot value so the function can drop the request", () => {
    expect(cleanContact({ website: "http://spam" }).honeypot).toBe("http://spam");
  });

  it("strips NUL bytes before validation", () => {
    const c = cleanContact({ email: "ada@example.com\u0000", message: "hello\u0000 there" });
    expect(c.email).toBe("ada@example.com");
    expect(c.message).toBe("hello there");
    expect(c.email).not.toContain("\u0000");
  });
});

describe("EMAIL_RE", () => {
  it("accepts ordinary addresses", () => {
    for (const ok of ["a@b.co", "first.last+tag@sub.example.org", "o'brien@example.com"]) {
      expect(EMAIL_RE.test(ok)).toBe(true);
    }
  });
  it("rejects mailto-parameter smuggling and header tricks", () => {
    for (const bad of [
      "a@b.co?cc=x@evil.com",
      "a@b.co,b@c.co",
      "a b@c.co",
      "a@b",
      "a@@b.co",
      "a@b.co\r\nBcc:x@y.z",
      "",
    ]) {
      expect(EMAIL_RE.test(bad)).toBe(false);
    }
  });
});

describe("validateContact", () => {
  it("requires a valid email and a message", () => {
    expect(validateContact(cleanContact({ email: "nope", message: "hello" }))).toMatch(/email/i);
    expect(validateContact(cleanContact({ email: "a@b.co", message: "hi" }))).toMatch(/message/i);
    expect(validateContact(cleanContact({ email: "a@b.co", message: "hello there" }))).toBeNull();
  });
});
