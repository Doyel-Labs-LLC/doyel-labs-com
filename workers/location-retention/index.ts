import { pruneLocationAggregates } from "../../server/analytics/location-retention";

export default {
  async scheduled(_controller, env) {
    try {
      const result = await pruneLocationAggregates(env.LOCATION_DB);
      console.log(JSON.stringify({ event: "location_retention", ...result }));
      if (result.backlog) throw new Error("location_retention_backlog");
    } catch {
      console.error(JSON.stringify({ event: "location_retention_failed" }));
      throw new Error("Location retention needs operator review.");
    }
  },
} satisfies ExportedHandler<Env>;
