import { createRemoteJWKSet, customFetch, errors, jwtVerify } from "jose";
import { AnalyticsError, CANONICAL_ORIGIN, readBoundedJson } from "./http";

export interface AnalyticsEnv {
  CF_ACCESS_TEAM_DOMAIN?: string;
  CF_ACCESS_AUD?: string;
  ANALYTICS_ALLOWED_EMAIL?: string;
  CF_ACCOUNT_ID?: string;
  CF_ANALYTICS_API_TOKEN?: string;
  CF_WEB_ANALYTICS_SITE_TAG?: string;
  ANALYTICS_ENABLED?: string;
  CONTACT_KV?: QueryLimitStore;
}

export interface QueryLimitStore {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options: { expirationTtl: number }): Promise<void>;
}

export async function requireOwner(request: Request, env: AnalyticsEnv): Promise<void> {
  if (new URL(request.url).origin !== CANONICAL_ORIGIN) {
    throw new AnalyticsError("forbidden", 403, "This dashboard is available only on its production domain.");
  }
  if (
    !env.CF_ACCESS_TEAM_DOMAIN || !/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(env.CF_ACCESS_TEAM_DOMAIN) ||
    !env.CF_ACCESS_AUD || !/^[a-f0-9]{64}$/.test(env.CF_ACCESS_AUD) ||
    !env.ANALYTICS_ALLOWED_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.ANALYTICS_ALLOWED_EMAIL)
  ) {
    throw new AnalyticsError("unconfigured", 503, "Dashboard access is not configured.");
  }
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token || token.length > 8192) {
    throw new AnalyticsError("unauthorized", 401, "Sign in through Cloudflare Access to continue.");
  }
  const issuer = `https://${env.CF_ACCESS_TEAM_DOMAIN}`;
  const keys = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`), {
    timeoutDuration: 5000,
    [customFetch]: async (url, options) => {
      try {
        const response = await fetch(url, { ...options, redirect: "error" });
        if (!response.ok) throw new Error("JWKS unavailable");
        const body = await readBoundedJson(response, 32768);
        return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
      } catch {
        throw new AnalyticsError("unavailable", 503, "Dashboard identity verification is unavailable.");
      }
    },
  });
  try {
    const { payload } = await jwtVerify(token, keys, {
      issuer,
      audience: env.CF_ACCESS_AUD,
      algorithms: ["RS256"],
      requiredClaims: ["exp", "iat", "nbf", "sub", "email", "type"],
      maxTokenAge: "30m",
      clockTolerance: 0,
    });
    if (
      payload.type !== "app" || typeof payload.sub !== "string" || !payload.sub.trim() ||
      payload.email !== env.ANALYTICS_ALLOWED_EMAIL ||
      "common_name" in payload || "service_token_id" in payload || "service_token_status" in payload
    ) {
      throw new AnalyticsError("forbidden", 403, "This account is not allowed to view analytics.");
    }
  } catch (error) {
    if (error instanceof AnalyticsError) throw error;
    if (error instanceof errors.JOSEError) {
      throw new AnalyticsError("unauthorized", 401, "Your Access session is invalid or expired. Sign in again.");
    }
    throw new AnalyticsError("unavailable", 503, "Dashboard identity verification is unavailable.");
  }
}
