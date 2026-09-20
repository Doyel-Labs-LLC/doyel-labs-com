import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

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
  const html = marked.parse(body) as string;
  return {
    slug,
    title: String(data.title || slug),
    version: String(data.version || ""),
    underReview: Boolean(data.under_review ?? false),
    html,
  };
}
