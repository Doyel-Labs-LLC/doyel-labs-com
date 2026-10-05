/**
 * Pure checks for the contact Pages Function. Kept out of the Worker
 * entry so unit tests can run them in Node without Cloudflare bindings.
 *
 * Production is the Pages branch named "master". Any other
 * CF_PAGES_BRANCH value is a deployed preview and fails closed the same
 * way production does. The branch is unset only for a local process that
 * is not a Pages deployment.
 */

export const PRODUCTION_ORIGINS = new Set([
  "https://doyel-labs.com",
  "https://www.doyel-labs.com",
]);

export const PRODUCTION_HOSTS = new Set(["doyel-labs.com", "www.doyel-labs.com"]);

const PREVIEW_ORIGIN = /^https:\/\/[a-z0-9-]+\.website\.pages\.dev$/;
const LOCAL_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const PREVIEW_HOST = /^[a-z0-9-]+\.website\.pages\.dev$/;
const JSON_TYPE = /^application\/json(?:;\s*charset=utf-8)?$/i;

export function isProductionBranch(branch: string | undefined): boolean {
  return branch === "master";
}

/** True on every Cloudflare Pages deployment, including previews. */
export function isDeployedBranch(branch: string | undefined): boolean {
  return typeof branch === "string" && branch.length > 0;
}

export function originAllowed(origin: string | null, branch: string | undefined): boolean {
  if (origin && PRODUCTION_ORIGINS.has(origin)) return true;
  if (isProductionBranch(branch)) return false;
  // Preview deployments and local `wrangler pages dev` (which still sets
  // CF_PAGES_BRANCH) may call the function from loopback or pages.dev.
  if (origin && (PREVIEW_ORIGIN.test(origin) || LOCAL_ORIGIN.test(origin))) return true;
  return false;
}

/**
 * Turnstile binds a token to the hostname that minted it. Production
 * accepts only the public site. Previews may also accept this project's
 * pages.dev hostnames. A missing hostname is a rejection.
 */
export function turnstileHostAllowed(hostname: string | undefined, production: boolean): boolean {
  if (!hostname) return false;
  if (PRODUCTION_HOSTS.has(hostname)) return true;
  if (production) return false;
  return PREVIEW_HOST.test(hostname) || hostname === "localhost" || hostname === "127.0.0.1";
}

export function isJsonContentType(value: string | null): boolean {
  return !!value && JSON_TYPE.test(value);
}

export const API_SECURITY_HEADERS = {
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
  "content-security-policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
  "referrer-policy": "no-referrer",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "cross-origin-resource-policy": "same-origin",
} as const;

/**
 * Read at most `max` bytes. A Content-Length above the cap is rejected
 * without buffering. A missing or understated Content-Length is still
 * capped while the body is read, so a lying header cannot force a large
 * allocation.
 */
export function declaredBodyTooLarge(contentLength: string | null, max: number): boolean {
  if (contentLength === null) return false;
  return !/^\d+$/.test(contentLength) || Number(contentLength) > max;
}

export async function readBoundedBody(request: Request, max: number): Promise<string | null> {
  if (declaredBodyTooLarge(request.headers.get("content-length"), max)) return null;
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const all = new Uint8Array(size);
  let at = 0;
  for (const chunk of chunks) {
    all.set(chunk, at);
    at += chunk.byteLength;
  }
  return new TextDecoder().decode(all);
}
