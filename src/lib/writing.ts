/**
 * Blog / writing metadata. The full body of each post lives in its own
 * `page.tsx` under `/writing/<slug>/`. This file is the index — one
 * entry per post, kept in reverse chronological order.
 *
 * When adding a new post:
 *   1. Add an entry here (top of the array).
 *   2. Create `src/app/writing/<slug>/page.tsx`.
 *   3. Add the path to `src/app/sitemap.ts`.
 *   4. Update `README.md` if the process changes.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601 date
  readingTime: string; // "5 min", "12 min"
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "shipping-steadfast-payroll-in-six-weeks",
    title:
      "How we shipped a full payroll workspace in six weeks",
    excerpt:
      "The playbook for a custom pay-run workspace, from zero code to a live pay period. Read the rulebook first, wireframe next, and ship a real run before locking scope. SteadFast Transportation was the first client to sit under this playbook; the same shape works for any operation.",
    date: "2026-09-20",
    readingTime: "12 min",
    tags: ["Case study", "Payroll", "Process", "AI-native"],
  },
];

/** Utility: format an ISO date as "Sep 20, 2026" for display. */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
