// Test-only generic UI server. Never deployed or imported by production code.
// API fixtures are injected by Playwright, not by any production feature flag.
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { adminAssets } from "../../server/analytics/admin-assets.generated";
import { privateHeaders } from "../../server/analytics/http";

const root = path.resolve("out");
const cspByPath = new Map<string, string>();
let currentPath = "";
for (const line of readFileSync(path.join(root, "_headers"), "utf8").split("\n")) {
  if (line.startsWith("/") || line === "/*") {
    currentPath = line.trim();
    continue;
  }
  const policy = line.match(/^\s+Content-Security-Policy:\s*(.+)$/);
  if (policy && currentPath) cspByPath.set(currentPath, policy[1]);
}
if (!cspByPath.get("/*")) throw new Error("Missing generated public CSP");

const redirects = new Map<string, { to: string; code: number }>();
for (const line of readFileSync(path.resolve("public/_redirects"), "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [from, to, status] = trimmed.split(/\s+/);
  if (!from || !to || from.includes("*")) continue;
  redirects.set(from.endsWith("/") ? from : `${from}/`, { to, code: Number(status) || 301 });
}

function cspFor(pathname: string): string {
  const slashed = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return cspByPath.get(pathname) ?? cspByPath.get(slashed) ?? cspByPath.get("/*")!;
}
createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1:3191");
    const redirect = redirects.get(url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`);
    if (redirect) {
      response.writeHead(redirect.code, { Location: redirect.to }).end();
      return;
    }
    if (url.pathname.startsWith("/api/")) {
      response.writeHead(503, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      response.end(JSON.stringify({ status: "disabled" }));
      return;
    }
    const assetPath = url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname;
    const admin = adminAssets[assetPath];
    if (admin) {
      if (admin.contentType.startsWith("text/plain")) {
        response.writeHead(307, { ...Object.fromEntries(privateHeaders()), Location: "/admin/analytics/" }).end();
        return;
      }
      const headers = privateHeaders(admin.scriptHashes);
      headers.set("Content-Type", admin.contentType);
      response.writeHead(200, Object.fromEntries(headers));
      response.end(admin.content);
      return;
    }
    const file = path.resolve(root, `.${decodeURIComponent(assetPath)}`);
    if (!file.startsWith(`${root}${path.sep}`) || !(await stat(file)).isFile()) {
      response.writeHead(404).end();
      return;
    }
    const types: Record<string, string> = {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".woff2": "font/woff2",
      ".txt": "text/plain; charset=utf-8",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".ico": "image/x-icon",
    };
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
      ...(file.endsWith(".html")
        ? {
            "Content-Security-Policy": cspFor(url.pathname),
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
          }
        : {}),
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
}).listen(3191, "127.0.0.1", () => console.log("Test-only analytics UI at http://127.0.0.1:3191/admin/analytics/"));
