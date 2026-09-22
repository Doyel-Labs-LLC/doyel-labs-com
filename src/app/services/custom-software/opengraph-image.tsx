import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "Doyel Labs — Custom software. Dashboards, portals, integrations, and one-off programs, built to spec.";

export default function Image() {
  return renderOgCard({
    eyebrow: "CUSTOM SOFTWARE · DOYEL LABS",
    segments: [{ text: "Built to" }, { text: "spec.", accent: true }],
  });
}
