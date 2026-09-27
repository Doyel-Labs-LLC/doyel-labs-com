import { handleAdmin } from "../server/analytics/handler";
import { handleLocationIngest, type LocationEnv } from "../server/analytics/location";

export const onRequest: PagesFunction<LocationEnv> = async (context) => {
  const path = new URL(context.request.url).pathname;
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    return handleAdmin(context.request, context.env);
  }
  if (path.startsWith("/api/analytics/location")) {
    return handleLocationIngest(context.request, context.env, context.request.cf);
  }
  return context.next();
};
