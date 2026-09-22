import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * The status page itself is a client component (`"use client"`), so it
 * cannot export `metadata`. This route-level layout carries the title,
 * description, and canonical instead — otherwise /status inherits the
 * site-wide default title and ships with no self-referencing canonical.
 */
export const metadata: Metadata = {
  title: "Status",
  description: `Live status for ${site.company} — website, contact endpoint, BAI control plane, payroll workspace, and ConnectionLoop backend, each checked from your own browser.`,
  alternates: { canonical: `https://${site.domain}/status/` },
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
