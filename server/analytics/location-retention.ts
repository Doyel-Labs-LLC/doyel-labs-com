import type { D1Database } from "@cloudflare/workers-types";

export async function pruneLocationAggregates(db: D1Database, now = new Date()) {
  const cutoff = Math.floor(now.getTime() / 3600000) * 3600 - 31 * 86400;
  let deleted = 0;
  for (let batch = 0; batch < 8; batch++) {
    const result = await db.prepare(`
      DELETE FROM location_hourly WHERE (bucket_hour, country, region, city) IN (
        SELECT bucket_hour, country, region, city FROM location_hourly
        WHERE bucket_hour < ? ORDER BY bucket_hour, country, region, city LIMIT 1000
      )
    `).bind(cutoff).run();
    if (!result.success) throw new Error("location_retention_failed");
    deleted += result.meta.changes;
    if (result.meta.changes < 1000) break;
  }
  const budgets = await db.prepare(`
    DELETE FROM location_daily_budget WHERE day_start IN (
      SELECT day_start FROM location_daily_budget WHERE day_start < ? ORDER BY day_start LIMIT 32
    )
  `).bind(cutoff - cutoff % 86400).run();
  if (!budgets.success) throw new Error("location_retention_failed");
  const remaining = await db.prepare("SELECT 1 AS remaining FROM location_hourly WHERE bucket_hour < ? LIMIT 1").bind(cutoff).first();
  const oldBudget = await db.prepare("SELECT 1 AS remaining FROM location_daily_budget WHERE day_start < ? LIMIT 1")
    .bind(cutoff - cutoff % 86400).first();
  return { deleted, budgetRowsDeleted: budgets.meta.changes, backlog: remaining !== null || oldBudget !== null };
}
