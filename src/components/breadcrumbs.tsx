import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Breadcrumb trail with schema.org BreadcrumbList JSON-LD embedded.
 *
 * Rendered visually above the page hero and machine-readably for search
 * engines (Google shows breadcrumbs in the SERP snippet, which is the
 * primary reason we ship this). The visible text is small — this is
 * navigation aid, not a headline.
 */
export function Breadcrumbs({
  items,
}: {
  /** Ordered trail from most general to the current page. Do not
   *  include a "Home" entry — it's prepended automatically. */
  items: { name: string; href: string }[];
}) {
  const base = `https://${site.domain}`;
  const trail = [{ name: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: `${base}${entry.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="pt-20 md:pt-28"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
          {trail.map((entry, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={entry.href} className="flex items-center gap-x-2">
                {isLast ? (
                  <span className="text-mute" aria-current="page">
                    {entry.name}
                  </span>
                ) : (
                  <Link
                    href={entry.href}
                    className="hover:text-accentHi transition-colors"
                  >
                    {entry.name}
                  </Link>
                )}
                {!isLast ? (
                  <span aria-hidden="true" className="text-muted">
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
