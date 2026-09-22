"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Desktop primary-nav links with an active-page indicator. Split into its
 * own client component so the header shell can stay a server component —
 * only this piece needs `usePathname`.
 *
 * A link is active when the current path is it or sits under it, so
 * /services/websites/ still lights up "Services". The "/" guard keeps a
 * "Home"-style root link (if one is ever added) from matching everything.
 * This is the cyan "active nav item" rule documented in DESIGN.md.
 */
export function NavLinks({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <>
      {items.map((n) => {
        const active =
          pathname === n.href ||
          (n.href !== "/" && pathname.startsWith(n.href));
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 items-center transition-colors ${
              active ? "text-accent" : "hover:text-ink"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </>
  );
}
