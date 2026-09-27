export type AnalyticsPreset = "24h" | "7d" | "30d";
export type BreakdownKey = "paths" | "referrers" | "countries" | "devices" | "browsers" | "operatingSystems";
export interface AnalyticsRow {
  label: string;
  pageViews: number;
}
export interface AnalyticsReport {
  status: "ready" | "empty";
  from: string;
  to: string;
  updatedAt: string;
  granularity: "hour" | "day";
  pageViews: number;
  visits: number;
  sampled: boolean;
  maxSampleInterval: number | null;
  trend: Array<{ time: string; pageViews: number; visits: number }>;
  breakdowns: Record<BreakdownKey, { rows: AnalyticsRow[]; limited: boolean }>;
}
export type AnalyticsFailureCode =
  | "disabled" | "unconfigured" | "unauthorized" | "forbidden"
  | "invalid_request" | "rate_limited" | "unavailable" | "schema_unavailable" | "not_found";
export interface AnalyticsFailure {
  status: AnalyticsFailureCode;
  message: string;
}

export function isAnalyticsReport(value: unknown): value is AnalyticsReport {
  const object = (item: unknown): item is Record<string, unknown> =>
    item !== null && typeof item === "object" && !Array.isArray(item);
  const count = (item: unknown): item is number =>
    typeof item === "number" && Number.isFinite(item) && item >= 0 && item <= 1e12;
  const date = (item: unknown): item is string =>
    typeof item === "string" && item.length <= 30 && Number.isFinite(Date.parse(item));
  if (
    !object(value) || !["ready", "empty"].includes(String(value.status)) ||
    !date(value.from) || !date(value.to) || !date(value.updatedAt) ||
    !["hour", "day"].includes(String(value.granularity)) ||
    !count(value.pageViews) || !count(value.visits) || typeof value.sampled !== "boolean" ||
    !(value.maxSampleInterval === null || (count(value.maxSampleInterval) && value.maxSampleInterval >= 1)) ||
    !Array.isArray(value.trend) || value.trend.length > 32 ||
    !value.trend.every((row) => object(row) && date(row.time) && count(row.pageViews) && count(row.visits)) ||
    !object(value.breakdowns)
  ) return false;
  const breakdowns = value.breakdowns;
  return ["paths", "referrers", "countries", "devices", "browsers", "operatingSystems"].every((key) => {
    const table = breakdowns[key];
    return object(table) && typeof table.limited === "boolean" && Array.isArray(table.rows) && table.rows.length <= 10 &&
      table.rows.every((row) => object(row) && typeof row.label === "string" && row.label.length <= 253 && count(row.pageViews));
  });
}
