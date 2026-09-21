import { ImageResponse } from "next/og";

// Static OG image, matches the design mockup: pure black background,
// four-square logo in the top-left, and a single centered tagline —
// "Doyel Labs LLC · Custom software for any business" — with the
// "Custom software" phrase in the cyan brand accent.
//
// Rendered once at build time as a static PNG; Cloudflare Pages serves
// it under `/opengraph-image` and the header rule at `_headers` pins
// the content-type to `image/png`.
//
// Satori (which powers ImageResponse) requires:
//   - every div with multiple children to have explicit `display: flex`
//   - no mixed text + element children in the same div
// The layout below is structured to satisfy both.

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Doyel Labs LLC — Custom software for any business. Casper, Wyoming.";

/** Palette pulled from Tailwind tokens so the OG image always matches
 * the site. Keep these in sync with `tailwind.config.ts`. */
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

export default function OpengraphImage() {
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
        {/* Top-left: four-square logo mark, standalone (no wordmark).
         * Squares are 60px with a 10px gap, matching the site's LogoMark
         * proportions. Corner radius keeps them readable at OG sizes. */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: palette.square.dark,
                }}
              />
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: palette.square.mid,
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: palette.square.light,
                }}
              />
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: palette.square.accent,
                }}
              />
            </div>
          </div>
        </div>

        {/* Center: single-line tagline, built from flex spans so Satori
         * can render the mixed-color text without wrapping issues. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "56px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: palette.ink,
            }}
          >
            <span style={{ marginRight: "18px" }}>Doyel Labs LLC</span>
            <span
              style={{
                marginRight: "18px",
                color: palette.mute,
                fontWeight: 400,
              }}
            >
              ·
            </span>
            <span
              style={{
                marginRight: "18px",
                color: palette.accent,
              }}
            >
              Custom software
            </span>
            <span>for any business</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
