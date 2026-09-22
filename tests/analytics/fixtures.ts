import type { QueryLimitStore, AnalyticsEnv } from "../../server/analytics/access";

export class MemoryLimitStore implements QueryLimitStore {
  values = new Map<string, string>();
  writes: Array<{ key: string; value: string; ttl: number }> = [];
  async get(key: string) { return this.values.get(key) ?? null; }
  async put(key: string, value: string, options: { expirationTtl: number }) {
    this.values.set(key, value);
    this.writes.push({ key, value, ttl: options.expirationTtl });
  }
}

export function configuredEnv(): AnalyticsEnv {
  return {
    CF_ACCESS_TEAM_DOMAIN: "test-team.cloudflareaccess.com",
    CF_ACCESS_AUD: "a".repeat(64),
    ANALYTICS_ALLOWED_EMAIL: "owner@example.test",
    ANALYTICS_ENABLED: "true",
    CF_ACCOUNT_ID: "b".repeat(32),
    CF_WEB_ANALYTICS_SITE_TAG: "c".repeat(32),
    CF_ANALYTICS_API_TOKEN: "SYNTHETIC_TEST_SECRET",
    CONTACT_KV: new MemoryLimitStore(),
  };
}

// Synthetic schema for fault injection. schema-observed.json separately
// captures the required types from authenticated introspection, not metrics.
export function schemaFixture() {
  const group = "AccountRumPageloadEventsAdaptiveGroups";
  const scalar = (name: string) => ({ kind: "SCALAR", name });
  const field = (name: string, type = scalar("string")) => ({ name, type });
  return {
    account: { fields: [{
      name: "rumPageloadEventsAdaptiveGroups",
      type: { kind: "LIST", ofType: { kind: "OBJECT", name: group } },
      args: [
        field("filter", { kind: "INPUT_OBJECT", name: `${group}Filter_InputObject` }),
        { name: "orderBy", type: { kind: "LIST", ofType: { kind: "ENUM", name: `${group}OrderBy` } } },
        field("limit", scalar("uint64")),
      ],
    }] },
    accountFilter: { inputFields: [field("accountTag")] },
    group: { fields: [
      field("count", scalar("uint64")),
      ...["dimensions", "sum", "avg"].map((name) => field(name, { kind: "OBJECT", name: `${group}${name[0].toUpperCase()}${name.slice(1)}` })),
    ] },
    dimensions: { fields: ["requestPath", "refererHost", "countryName", "deviceType", "userAgentBrowser", "userAgentOS", "date", "datetimeHour"].map((name) => field(name)) },
    sum: { fields: [field("visits", scalar("uint64"))] },
    avg: { fields: [field("sampleInterval", scalar("float64"))] },
    filter: { inputFields: ["siteTag", "requestHost", "datetime_geq", "datetime_lt"].map((name) => field(name)) },
    order: { enumValues: ["count_DESC", "date_ASC", "datetimeHour_ASC"].map((name) => ({ name })) },
  };
}

export function groupFixture(dimensions: Record<string, string> = {}, count = 12, visits = 5, interval = 1) {
  return { count, sum: { visits }, avg: { sampleInterval: interval }, dimensions };
}

export function reportFixture() {
  return { viewer: { accounts: [{
    overview: [groupFixture()],
    trend: [groupFixture({ date: "2026-09-22", datetimeHour: "2026-09-22T12:00:00Z" })],
    paths: [groupFixture({ requestPath: "/services/?email=hidden@example.test#private" })],
    referrers: [groupFixture({ refererHost: "example.com/path?secret=hidden" })],
    countries: [groupFixture({ countryName: "US" })],
    devices: [groupFixture({ deviceType: "mobile" })],
    browsers: [groupFixture({ userAgentBrowser: "Safari" })],
    operatingSystems: [groupFixture({ userAgentOS: "iOS" })],
  }] } };
}
