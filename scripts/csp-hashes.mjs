/**
 * Post-build: write a strict Content-Security-Policy into out/_headers.
 *
 * Next.js static export inlines a few bootstrap <script> blocks on every
 * page (the flight data and a tiny `__next_f` shim). Instead of allowing
 * 'unsafe-inline', this script hashes each inline script and emits the
 * hashes into the CSP. Style blocks are hashed the same way. A style
 * attribute cannot be hashed, so public pages must not emit one.
 *
 * Cloudflare Pages `_headers` rules: max 100 rules, ~2,000 chars per
 * line, and a header set in several matching rules is joined — so each
 * page gets ONE rule that first detaches the catch-all CSP (`!`) and then
 * sets its own. The catch-all carries the 404 page's hashes so unknown
 * paths are covered too. The catch-all is inserted into the existing
 * `/*` block. A second `/*` block drops HSTS and the other site headers.
 *
 * Usage: node scripts/csp-hashes.mjs   (runs automatically in `npm run build`)
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const { analytics, analyticsCsp } = await import("../src/lib/analytics-config.ts");
const { mergeCatchAllCsp } = await import("../src/lib/security-headers.ts");
const vendor = analyticsCsp(analytics);

const OUT = "out";
const HEADERS = join(OUT, "_headers");

const BASE = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' mailto: tel:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "manifest-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "frame-src https://challenges.cloudflare.com",
  `connect-src 'self' https://challenges.cloudflare.com${vendor.connect ? " " + vendor.connect : ""}`,
  "upgrade-insecure-requests",
];

const SCRIPT_HOSTS = `'self' https://challenges.cloudflare.com${vendor.script ? " " + vendor.script : ""}`;

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function sha(body) {
  return "'sha256-" + createHash("sha256").update(body, "utf8").digest("base64") + "'";
}

function policyParts(file) {
  const html = readFileSync(file, "utf8");
  const scripts = new Set();
  const styles = new Set();
  const scriptRe = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = scriptRe.exec(html))) {
    const [, attrs, body] = m;
    if (/application\/ld\+json/.test(attrs)) continue; // data block, never executed
    if (!body.trim()) continue;
    scripts.add(sha(body));
  }
  const styleRe = /<style([^>]*)>([\s\S]*?)<\/style>/gi;
  while ((m = styleRe.exec(html))) {
    const body = m[2];
    if (!body.trim()) continue;
    styles.add(sha(body));
  }
  // A style attribute cannot be hashed when its value is dynamic. Public
  // pages should not need one; if any do, keep style-src 'unsafe-inline'
  // for that page only.
  const styleAttr = /<[^>]+\sstyle\s*=/.test(html);
  return { scripts: [...scripts], styles: [...styles], styleAttr };
}

function csp(parts) {
  const styleSrc = parts.styleAttr
    ? "style-src 'self' 'unsafe-inline'"
    : `style-src 'self'${parts.styles.length ? " " + parts.styles.join(" ") : ""}`;
  return [...BASE, styleSrc, `script-src ${SCRIPT_HOSTS} ${parts.scripts.join(" ")}`].join("; ");
}

function urlFor(file) {
  const rel = relative(OUT, file).split(sep).join("/");
  if (rel === "404.html") return null;
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"index.html".length);
  return "/" + rel; // e.g. legacy foo.html
}

const files = walk(OUT);
const notFound = files.find((f) => relative(OUT, f) === "404.html");
const rules = [];
let longest = 0;

const catchAll = csp(notFound ? policyParts(notFound) : { scripts: [], styles: [], styleAttr: false });
longest = Math.max(longest, catchAll.length);

for (const f of files) {
  const url = urlFor(f);
  if (!url) continue;
  const policy = csp(policyParts(f));
  longest = Math.max(longest, policy.length);
  rules.push(`${url}\n  ! Content-Security-Policy\n  Content-Security-Policy: ${policy}`);
}

let existing;
try {
  existing = mergeCatchAllCsp(readFileSync(HEADERS, "utf8"), catchAll);
} catch (error) {
  console.error(`csp-hashes: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
const existingRules = (existing.match(/^\/[^\n]*$/gm) || []).length;
const total = existingRules + rules.length;
if (total > 100) {
  console.error(`csp-hashes: ${total} header rules exceeds Cloudflare's limit of 100`);
  process.exit(1);
}
if (longest > 1900) {
  console.error(`csp-hashes: a CSP line is ${longest} chars, over the ~2000 limit`);
  process.exit(1);
}
if (rules.some((rule) => /style-src[^;]*'unsafe-inline'/.test(rule)) || /style-src[^;]*'unsafe-inline'/.test(catchAll)) {
  console.error("csp-hashes: a public page still has a style attribute, so style-src would allow unsafe-inline");
  process.exit(1);
}

writeFileSync(
  HEADERS,
  existing + "\n\n# ── Content-Security-Policy (generated by scripts/csp-hashes.mjs) ──\n" + rules.join("\n") + "\n",
);
console.log(`csp-hashes: wrote ${rules.length} CSP rules (${total} rules total, longest line ${longest} chars); analytics provider: ${analytics.provider}`);
