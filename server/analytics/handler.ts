import { requireOwner, type AnalyticsEnv } from "./access";
import { adminAssets } from "./admin-assets.generated";
import { AnalyticsError, errorResponse, jsonResponse, privateHeaders } from "./http";
import { loadReport, parsePreset, providerConfig } from "./provider";

export async function handleAdmin(request: Request, env: AnalyticsEnv): Promise<Response> {
  try {
    await requireOwner(request, env);
    if (request.method !== "GET" && request.method !== "HEAD") {
      const response = jsonResponse({ status: "invalid_request", message: "Only read requests are supported." }, 405);
      response.headers.set("Allow", "GET, HEAD");
      return response;
    }
    const url = new URL(request.url);
    if (url.pathname === "/api/admin/analytics" || url.pathname === "/api/admin/analytics/") {
      const origin = request.headers.get("Origin");
      if ((origin && origin !== url.origin) || request.headers.get("Sec-Fetch-Site") === "cross-site") {
        throw new AnalyticsError("forbidden", 403, "Cross-site analytics requests are not allowed.");
      }
      const preset = parsePreset(url);
      if (request.method === "HEAD") {
        providerConfig(env);
        return new Response(null, { headers: privateHeaders() });
      }
      return jsonResponse(await loadReport(env, preset));
    }
    if (["/admin", "/admin/", "/admin/analytics"].includes(url.pathname)) {
      const headers = privateHeaders();
      headers.set("Location", "/admin/analytics/");
      return new Response(null, { status: 302, headers });
    }
    const path = url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname;
    const asset = Object.hasOwn(adminAssets, path) ? adminAssets[path] : undefined;
    if (!asset) throw new AnalyticsError("not_found", 404, "Not found.");
    // An HTML redirect makes Next perform a full document navigation rather
    // than carrying a public page's already-running SPA collector into admin.
    if (asset.contentType.startsWith("text/plain")) {
      const headers = privateHeaders();
      headers.set("Location", "/admin/analytics/");
      return new Response(null, { status: 307, headers });
    }
    const headers = privateHeaders(asset.scriptHashes);
    headers.set("Content-Type", asset.contentType);
    return new Response(request.method === "HEAD" ? null : asset.content, { headers });
  } catch (error) {
    return errorResponse(error);
  }
}
