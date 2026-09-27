import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "Doyel Labs — Work. Real software shipped for real operators, in production and in private testing.";

export default function Image() {
  return renderOgCard({
    eyebrow: "WORK · DOYEL LABS",
    segments: [{ text: "What we've" }, { text: "shipped.", accent: true }],
  });
}
