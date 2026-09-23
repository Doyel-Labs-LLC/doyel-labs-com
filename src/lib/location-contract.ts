import type { AnalyticsPreset } from "./analytics-contract";

export interface LocationRow {
  country: string;
  region?: string;
  city?: string;
  pageViews: number;
}

export interface LocationReport {
  status: "ready" | "empty";
  source: "first_party_hourly";
  period: AnalyticsPreset;
  from: string;
  to: string;
  updatedAt: string;
  collectionStart: string | null;
  collectionEnabled: boolean;
  pageViews: number;
  acceptedHours: number;
  dailyCap: 5000;
  cappedDays: string[];
  breakdowns: Record<"cities" | "regions" | "countries", { rows: LocationRow[]; limited: boolean }>;
}

export function isLocationReport(value: unknown): value is LocationReport {
  const object = (item: unknown): item is Record<string, unknown> =>
    item !== null && typeof item === "object" && !Array.isArray(item);
  const count = (item: unknown): item is number =>
    typeof item === "number" && Number.isSafeInteger(item) && item >= 0 && item <= 155000;
  const date = (item: unknown): item is string =>
    typeof item === "string" && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(item) && Number.isFinite(Date.parse(item));
  const label = (item: unknown): item is string =>
    typeof item === "string" && item.length > 0 && item.length <= 100 && !/\p{Cc}/u.test(item);
  if (!object(value) || !["ready", "empty"].includes(String(value.status)) ||
      value.source !== "first_party_hourly" || !["24h", "7d", "30d"].includes(String(value.period)) ||
      !date(value.from) || !date(value.to) || !date(value.updatedAt) ||
      !(value.collectionStart === null || date(value.collectionStart)) ||
      typeof value.collectionEnabled !== "boolean" || !count(value.pageViews) ||
      !count(value.acceptedHours) || value.acceptedHours > 720 || value.dailyCap !== 5000 ||
      !Array.isArray(value.cappedDays) || value.cappedDays.length > 30 ||
      !value.cappedDays.every((day) => typeof day === "string" && /^\d{4}-\d\d-\d\d$/.test(day)) ||
      !object(value.breakdowns) || (value.status === "empty") !== (value.pageViews === 0)) return false;
  const breakdowns = value.breakdowns;
  return (["cities", "regions", "countries"] as const).every((key) => {
    const table = breakdowns[key];
    return object(table) && typeof table.limited === "boolean" && Array.isArray(table.rows) && table.rows.length <= 20 &&
      table.rows.every((row) => object(row) && typeof row.country === "string" &&
        /^(?:[A-Z]{2}|\?)$/.test(row.country) && count(row.pageViews) && row.pageViews > 0 &&
        (key === "countries" || label(row.region)) && (key !== "cities" || label(row.city)));
  });
}
