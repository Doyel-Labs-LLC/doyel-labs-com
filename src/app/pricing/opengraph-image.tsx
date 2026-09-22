import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "Doyel Labs — Pricing. Priced per project, quoted in one business day. No hourly rate, no lock-in.";

export default function Image() {
  return renderOgCard({
    eyebrow: "PRICING · DOYEL LABS",
    segments: [{ text: "Priced per" }, { text: "project.", accent: true }],
  });
}
