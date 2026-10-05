/**
 * Cloudflare Pages joins headers from every matching `_headers` rule.
 * A second `/*` block therefore does not override the first: it can drop
 * the site-wide block (HSTS, framing, referrer policy) when the generated
 * CSP is appended as its own catch-all. The catch-all CSP has to be
 * inserted into the single existing `/*` block.
 */
export function mergeCatchAllCsp(headersFile: string, policy: string): string {
  const source = headersFile.trimEnd();
  const blocks = source.match(/^\/\*$/gm) ?? [];
  if (blocks.length !== 1) {
    throw new Error(`_headers must contain exactly one /* block (found ${blocks.length})`);
  }
  if (policy.includes("\n")) {
    throw new Error("catch-all CSP must be a single line");
  }
  // Public style-src is hashed. script-src must not allow unsafe-inline.
  if (/script-src[^;]*'unsafe-inline'/.test(policy)) {
    throw new Error("catch-all CSP must not allow unsafe-inline scripts");
  }
  return source.replace(/^\/\*$/m, `/*\n  Content-Security-Policy: ${policy}`);
}

/** Same sensor lock as public/_headers. API responses reuse it. */
export const SITE_PERMISSIONS_POLICY =
  "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=(), accelerometer=(), gyroscope=(), magnetometer=(), display-capture=()";

export const REQUIRED_SITE_HEADERS = [
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Cross-Origin-Opener-Policy",
  "Cross-Origin-Resource-Policy",
] as const;
