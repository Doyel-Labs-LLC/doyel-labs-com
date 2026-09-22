import { ImageResponse } from "next/og";

/**
 * Shared renderer for per-route Open Graph cards. Keeps every section's
 * social card visually identical to the root `/opengraph-image` — pure
 * black, the four-square logo top-left, a mono eyebrow, and a large
 * headline with one word in the cyan brand accent — so a link to any
 * section shares as a recognizably-Doyel-Labs card instead of falling
 * back to the generic homepage image.
 *
 * Satori (which powers ImageResponse) requires every div with multiple
 * children to declare `display: flex` and forbids mixing raw text and
 * element children in the same div. The structure below satisfies both:
 * the eyebrow div holds a single string; the headline div holds only
 * <span> elements.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const palette = {
  bg: "#000000",
  ink: "#f0f0fa",
  mute: "rgba(240, 240, 250, 0.60)",
  accent: "#10c7eb",
  square: {
    dark: "#2a2f36",
    mid: "#6a7078",
    light: "#c7cad0",
    accent: "#10c7eb",
  },
} as const;

/** The four-square brand mark, drawn to match `LogoMark` proportions. */
function Mark() {
  const sq = (bg: string) => (
    <div
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "14px",
        background: bg,
      }}
    />
  );
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {sq(palette.square.dark)}
          {sq(palette.square.mid)}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {sq(palette.square.light)}
          {sq(palette.square.accent)}
        </div>
      </div>
    </div>
  );
}

export type OgSegment = { text: string; accent?: boolean };

/**
 * Render a section OG card. `eyebrow` is the small mono line (e.g.
 * "SERVICES · DOYEL LABS"); `segments` build the headline, with any
 * segment flagged `accent` drawn in cyan.
 */
export function renderOgCard({
  eyebrow,
  segments,
}: {
  eyebrow: string;
  segments: OgSegment[];
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          background: palette.bg,
          color: palette.ink,
          fontFamily: "sans-serif",
        }}
      >
        <Mark />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: palette.mute,
              marginBottom: "26px",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: palette.ink,
            }}
          >
            {segments.map((s, i) => (
              <span
                key={i}
                style={{
                  marginRight: "20px",
                  color: s.accent ? palette.accent : palette.ink,
                }}
              >
                {s.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
