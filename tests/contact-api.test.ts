import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequestPost } from "../functions/api/contact";

type Env = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CF_PAGES_BRANCH?: string;
  RATE_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
};

const message = "We need a site for the bakery please";

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://doyel-labs.com/api/contact", {
    method: "POST",
    headers: {
      origin: "https://doyel-labs.com",
      "content-type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function call(request: Request, env: Env = { RESEND_API_KEY: "test" }) {
  return onRequestPost({ request, env } as Parameters<typeof onRequestPost>[0]);
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("visitor receipt", () => {
  it("sends the owner notification and a receipt that does not repeat the message", async () => {
    const calls: { body: { to: string[]; html: string; text: string; subject: string } }[] = [];
    vi.stubGlobal("fetch", async (_url: string, init: RequestInit) => {
      calls.push({ body: JSON.parse(String(init.body)) });
      return new Response("{}", { status: 200 });
    });

    const response = await call(
      post({
        name: "Jordan Reed",
        email: "jordan@example.com",
        projectType: "website",
        message,
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, receipt: true });
    expect(calls).toHaveLength(2);
    expect(calls[0].body.to).toEqual(["support@doyel-labs.com"]);
    expect(calls[0].body.text).toContain("bakery");
    expect(calls[0].body.html).toContain("#f6eee2");
    expect(calls[1].body.to).toEqual(["jordan@example.com"]);
    expect(calls[1].body.subject).toBe("We have your message — Doyel Labs");
    expect(calls[1].body.html).toContain("Thank you, Jordan.");
    expect(calls[1].body.html).not.toContain("bakery");
    expect(calls[1].body.text).not.toContain("bakery");
  });

  it("counts the IP and a hashed email, and does not log the address", async () => {
    const keys: string[] = [];
    const warnings: unknown[][] = [];
    vi.spyOn(console, "warn").mockImplementation((...args) => {
      warnings.push(args);
    });
    vi.stubGlobal("fetch", async (url: string, init?: RequestInit) => {
      if (String(url).includes("siteverify")) {
        return Response.json({ success: true, hostname: "doyel-labs.com" });
      }
      return new Response(String(init?.body ?? ""), { status: 200 });
    });

    const response = await call(
      post(
        {
          name: "Jordan Reed",
          email: "jordan@example.com",
          message,
          turnstileToken: "token",
        },
        { "cf-connecting-ip": "203.0.113.9" },
      ),
      {
        RESEND_API_KEY: "test",
        TURNSTILE_SECRET_KEY: "secret",
        CF_PAGES_BRANCH: "preview",
        RATE_LIMITER: {
          async limit({ key }) {
            keys.push(key);
            return { success: true };
          },
        },
      },
    );

    expect(response.status).toBe(200);
    expect(keys[0]).toBe("ip:203.0.113.9");
    expect(keys[1]).toMatch(/^em:[0-9a-f]{64}$/);
    expect(keys[2]).toMatch(/^rcpt:[0-9a-f]{64}$/);
    expect(JSON.stringify(keys)).not.toContain("jordan@example.com");
    expect(JSON.stringify(warnings)).not.toContain("doyel-labs.com");
  });
});

describe("contact request gates", () => {
  it("rejects a cross-site post, a JSON array, and a preview with no Turnstile secret", async () => {
    const response = await call(
      post({ email: "a@b.co", message: "hello there" }, { "Sec-Fetch-Site": "cross-site" }),
    );
    expect(response.status).toBe(403);

    const arrayBody = await call(post([]));
    expect(arrayBody.status).toBe(400);
    expect(await arrayBody.json()).toEqual({ error: "Invalid JSON body." });

    const errors: unknown[][] = [];
    vi.spyOn(console, "error").mockImplementation((...args) => {
      errors.push(args);
    });
    const closed = await call(
      post({ email: "a@b.co", message: "hello there" }, { "cf-connecting-ip": "203.0.113.8" }),
      {
        RESEND_API_KEY: "test",
        CF_PAGES_BRANCH: "preview",
      },
    );
    expect(closed.status).toBe(500);
    const closedBody = await closed.text();
    expect(closedBody).not.toMatch(/turnstile|resend|secret/i);
    expect(JSON.stringify(errors)).toContain("TURNSTILE_SECRET_KEY missing");
    expect(JSON.stringify(errors)).not.toContain("hello there");
  });

  it("does not log the Resend body when delivery is rejected", async () => {
    const errors: unknown[][] = [];
    vi.spyOn(console, "error").mockImplementation((...args) => {
      errors.push(args);
    });
    vi.stubGlobal("fetch", async () =>
      Response.json({ message, email: "jordan@example.com", hostname: "evil.example" }, { status: 422 }),
    );

    const response = await call(post({ name: "Jordan", email: "jordan@example.com", message }));
    expect(response.status).toBe(500);
    const logged = JSON.stringify(errors);
    expect(logged).toContain("422");
    expect(logged).not.toContain("bakery");
    expect(logged).not.toContain("jordan@example.com");
    expect(logged).not.toContain("evil.example");
  });

  it("does not log a rejected Turnstile hostname", async () => {
    const warnings: unknown[][] = [];
    vi.spyOn(console, "warn").mockImplementation((...args) => {
      warnings.push(args);
    });
    vi.stubGlobal("fetch", async () => Response.json({ success: true, hostname: "evil.example" }));

    const response = await call(
      post({ email: "jordan@example.com", message, turnstileToken: "token" }, { "cf-connecting-ip": "203.0.113.4" }),
      { RESEND_API_KEY: "test", TURNSTILE_SECRET_KEY: "secret" },
    );
    expect(response.status).toBe(403);
    expect(JSON.stringify(warnings)).toContain("hostname mismatch");
    expect(JSON.stringify(warnings)).not.toContain("evil.example");
  });

  it("drops the honeypot before any upstream call", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await call(post({ email: "jordan@example.com", message, website: "http://spam.example" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
