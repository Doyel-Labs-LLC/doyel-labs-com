import type { AnalyticsFailureCode } from "../../src/lib/analytics-contract";

export const CANONICAL_ORIGIN = "https://doyel-labs.com";

export class AnalyticsError extends Error {
  constructor(
    public readonly code: AnalyticsFailureCode,
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export function privateHeaders(scriptHashes = ""): Headers {
  return new Headers({
    "Cache-Control": "private, no-store, no-cache, max-age=0, must-revalidate, no-transform",
    "CDN-Cache-Control": "no-store",
    "Cloudflare-CDN-Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Expires": "0",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()",
    "Content-Security-Policy": `default-src 'self'; script-src 'self' ${scriptHashes}; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; font-src 'self'; frame-src 'none'; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; form-action 'self'`,
  });
}

export function jsonResponse(value: unknown, status = 200): Response {
  const headers = privateHeaders();
  headers.set("Content-Type", "application/json; charset=utf-8");
  if (status === 429) headers.set("Retry-After", "60");
  return new Response(JSON.stringify(value), { status, headers });
}

export function errorResponse(error: unknown): Response {
  if (error instanceof AnalyticsError) {
    return jsonResponse({ status: error.code, message: error.message }, error.status);
  }
  // Never log upstream bodies, headers, identities, URLs, or exception messages.
  console.error("analytics_unexpected_failure");
  return jsonResponse({ status: "unavailable", message: "Analytics is temporarily unavailable." }, 503);
}

export async function readBoundedJson(response: Response, maxBytes: number): Promise<unknown> {
  if (!response.body || Number(response.headers.get("Content-Length")) > maxBytes) {
    await response.body?.cancel();
    throw new AnalyticsError("unavailable", 503, "The analytics service returned an invalid response.");
  }
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        throw new AnalyticsError("unavailable", 503, "The analytics service returned an oversized response.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new AnalyticsError("unavailable", 503, "The analytics service returned invalid data.");
  }
}

export function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new AnalyticsError("unavailable", 503, "The analytics service returned invalid data.");
  }
  return value as Record<string, unknown>;
}
