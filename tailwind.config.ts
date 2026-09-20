import type { Config } from "tailwindcss";

/**
 * Tokens are documented in DESIGN.md. Keep them in sync.
 * Canvas is pure black; the surface tint is only for a subtle band separator.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Canvas
        bg: "#000000",
        surface: "#0a0a0a",
        // Type
        ink: "#f0f0fa",
        mute: "rgba(240, 240, 250, 0.62)",
        muted: "rgba(240, 240, 250, 0.44)",
        // Hairline
        line: "rgba(240, 240, 250, 0.14)",
        line2: "rgba(240, 240, 250, 0.28)",
        // Semantic (used sparingly — status/kill dots, no marketing accents)
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
    },
  },
  plugins: [],
};
export default config;
