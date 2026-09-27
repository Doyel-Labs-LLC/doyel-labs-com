// Test-only generic UI server. Never deployed or imported by production code.
// API fixtures are injected by Playwright, not by any production feature flag.
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { adminAssets } from "../../server/analytics/admin-assets.generated";
import { privateHeaders } from "../../server/analytics/http";

const root = path.resolve("out");
const publicCsp = readFileSync(path.join(root, "_headers"), "utf8")
  .match(/^\s+Content-Security-Policy: (.+)$/m)?.[1];
if (!publicCsp) throw new Error("Missing generated public CSP");
createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1:3191");
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
    const types: Record<string, string> = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".txt": "text/plain", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon" };
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
      ...(file.endsWith(".html") ? { "Content-Security-Policy": publicCsp } : {}),
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
}).listen(3191, "127.0.0.1", () => console.log("Test-only analytics UI at http://127.0.0.1:3191/admin/analytics/"));
