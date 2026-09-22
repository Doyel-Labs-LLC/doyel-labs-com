import { handleAdmin } from "../server/analytics/handler";
import type { AnalyticsEnv } from "../server/analytics/access";

export const onRequest: PagesFunction<AnalyticsEnv> = async (context) => {
  const path = new URL(context.request.url).pathname;
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    return handleAdmin(context.request, context.env);
  }
  return context.next();
};
