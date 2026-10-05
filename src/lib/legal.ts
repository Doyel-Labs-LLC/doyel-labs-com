import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";
import { analytics, selectAnalyticsPolicy } from "./analytics-config";
import { locationAnalyticsEnabled, selectLocationPolicy } from "./location-config";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SAFE_URL = /^(?:https?:|mailto:|tel:|\/|#)/i;

// Legal pages are trusted markdown, but raw HTML would be hashed into the
// page CSP and could run. Escape HTML tokens and drop non-web links.
marked.use({
  walkTokens(token) {
    if ((token.type === "link" || token.type === "image") && "href" in token) {
      if (typeof token.href !== "string" || !SAFE_URL.test(token.href.trim())) token.href = "";
    }
  },
  renderer: {
    html({ text }) {
      return escapeHtml(text);
    },
  },
});

/** Render counsel-authored markdown. Raw HTML is escaped, not executed. */
export function renderTrustedMarkdown(markdown: string): string {
  return marked.parse(markdown) as string;
}

/**
 * A minimal frontmatter+markdown loader. We keep legal drafts as plain
 * .md so counsel can redline them without touching TSX.
 */
export type LegalDoc = {
  slug: string;
  title: string;
  version: string;
  underReview: boolean;
  html: string;
};

function parseFrontmatter(raw: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string | boolean> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const raw = kv[2].trim();
    data[kv[1]] =
      raw === "true"
        ? true
        : raw === "false"
          ? false
          : raw.replace(/^"|"$/g, "");
  }
  return { data, body: m[2] };
}

export function loadLegal(slug: string): LegalDoc {
  const path = join(process.cwd(), "content", "legal", `${slug}.md`);
  const raw = readFileSync(path, "utf-8");
  const { data, body } = parseFrontmatter(raw);
  const html = renderTrustedMarkdown(slug === "privacy"
    ? selectLocationPolicy(selectAnalyticsPolicy(body, analytics.provider), locationAnalyticsEnabled) : body);
  return {
    slug,
    title: String(data.title || slug),
    version: String(data.version || ""),
    underReview: Boolean(data.under_review ?? false),
    html,
  };
}
