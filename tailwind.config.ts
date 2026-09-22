import type { Config } from "tailwindcss";

/**
 * Tokens are documented in DESIGN.md and PROMPT.md. Keep them in sync.
 *
 * The palette is anchored on the physical Doyel Labs icon: four rounded
 * squares in dark gray, mid gray, light gray, and cyan. The cyan is the
 * one accent used across the site. Everything else is spectral off-white
 * on a softened near-black canvas.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Canvas — softened from pure black so the site has warmth.
        bg: "#0a0f14",
        surface: "#12181f",
        surface2: "#171e26",
        // Type
        ink: "#f0f0fa",
        mute: "rgba(240, 240, 250, 0.66)",
        // 0.50 (not lower) so muted small text clears WCAG AA (4.5:1) on
        // both the canvas (#0a0f14 → 4.84) and card surfaces (#12181f →
        // 4.77). Still clearly quieter than `mute` (0.66) and `ink`.
        muted: "rgba(240, 240, 250, 0.50)",
        // Hairline
        line: "rgba(240, 240, 250, 0.10)",
        line2: "rgba(240, 240, 250, 0.22)",
        // Cyan accent — from the bottom-right icon square. Used sparingly.
        accent: "#10c7eb",
        accentHi: "#4edcfb",
        accentDim: "rgba(16, 199, 235, 0.32)",
        accentSoft: "rgba(16, 199, 235, 0.10)",
        // Icon palette (also used as chip / step accents)
        iconDark: "#3f444b",
        iconMid: "#878a91",
        iconLight: "#c7cad0",
        // Semantic
        rise: "#4ed4a2",
        fall: "#ff7b8a",
        care: "#f5c15a",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Cascadia Mono",
          "Consolas",
          "ui-monospace",
          "monospace",
        ],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        display: "-0.01em",
        wide: "0.06em",
      },
      maxWidth: { prose: "68ch", band: "1200px" },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      boxShadow: {
        accent: "0 0 0 1px rgba(16, 199, 235, 0.4)",
        // Depth on a near-black canvas comes from an inset top highlight
        // (light-from-above) plus a soft dark drop — not a grey shadow,
        // which is invisible here. Used by the elevated card surface.
        card:
          "inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 12px 32px -20px rgba(0, 0, 0, 0.85)",
        cardHover:
          "inset 0 1px 0 rgba(16, 199, 235, 0.14), 0 22px 48px -22px rgba(0, 0, 0, 0.9)",
        glow: "0 0 0 1px rgba(16, 199, 235, 0.35), 0 8px 30px -12px rgba(16, 199, 235, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
