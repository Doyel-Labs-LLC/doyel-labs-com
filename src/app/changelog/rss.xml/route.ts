/**
 * RSS feed of the company + product changelog.
 *
 * Served at `/changelog/rss.xml`. Static — Next.js pre-renders once
 * at build time and Cloudflare Pages serves the resulting file.
 * Subscribers plug the URL into any RSS reader; when we ship a new
 * entry we rebuild and their reader picks up the update on next poll.
 *
 * Every entry comes from `src/lib/changelog.ts` (the single source
 * of truth shared with the HTML changelog page). Do NOT duplicate
 * entries here.
 */
import { entries, rfc822 } from "@/lib/changelog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = `https://${site.domain}`;
  const now = rfc822(new Date().toISOString().slice(0, 10));

  const items = entries
    .map((e) => {
      const guid = `${base}/changelog/#${e.id}`;
      const title = e.version
        ? `[${e.version} · ${e.section}] ${e.title}`
        : `[${e.section}] ${e.title}`;
      return `    <item>
      <title>${escape(title)}</title>
      <description>${escape(e.body)}</description>
      <link>${base}/changelog/#${e.id}</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${rfc822(e.date)}</pubDate>
      <category>${escape(e.section)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.company)} — Changelog</title>
    <link>${base}/changelog/</link>
    <description>Company and per-product changelog for ${escape(site.company)}. Every entry names a real change.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${base}/changelog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
