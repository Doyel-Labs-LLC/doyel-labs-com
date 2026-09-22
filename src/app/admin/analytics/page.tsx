import type { Metadata } from "next";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";

export const metadata: Metadata = {
  title: "Private analytics",
  description: "Owner-only aggregate website analytics.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
  alternates: { canonical: "/admin/analytics/" },
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
