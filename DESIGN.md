# Design — Doyel Labs

Mission-briefing, not SaaS gradient. Pure black canvas, spectral off-white
type, one ghost CTA, hairlines instead of borders, redacted product
evidence instead of stock photography.

## Tokens

| Token          | Value                             | Where                                   |
| -------------- | --------------------------------- | --------------------------------------- |
| `bg`           | `#000000`                         | Page canvas                             |
| `surface`      | `#0a0a0a`                         | Optional inset band, product frame body |
| `ink`          | `#f0f0fa`                         | Body and display type                   |
| `mute`         | `rgba(240, 240, 250, 0.62)`       | Body text below the lead                |
| `muted`        | `rgba(240, 240, 250, 0.44)`       | Captions, footnotes, metadata           |
| `line`         | `rgba(240, 240, 250, 0.14)`       | Default hairline                        |
| `line2`        | `rgba(240, 240, 250, 0.28)`       | CTA border, focused/hover hairline      |
| `rise`         | `#4ed4a2`                         | Status "up" dot on `/status` only       |
| `fall`         | `#ff7b8a`                         | Status "down" dot on `/status` only     |
| `care`         | `#f5c15a`                         | `NOT SHIPPING` and program-status chips |

There is no brand-blue, no purple, no gradient. Colour comes from product
evidence, not from chrome.

## Type

- Display and nav: uppercase, `tracking-eyebrow` (0.18em) on eyebrows,
  `tracking-wide` (0.06em) on nav items, `tracking-display` (-0.01em) on
  H1/H2. Font family: Inter with system fallbacks. If D-DIN is licensed
  later, drop it in place of Inter for display only.
- Body: sentence case, 16px+, line-height 1.65. `text-mute` for body,
  `text-ink` for emphasis.
- Legal, payroll and security pages: never uppercase body copy. Legal
  MDX renders through `.prose-legal`, tuned for scannability.

## Layout

- Full-viewport bands, one idea per band. Max content width `max-w-band`
  (1200px) with `px-6 md:px-10`.
- No drop shadows. No card farms. Depth is line + type contrast + a
  slow ken-burns on the very few background images.
- CTAs: exactly one primary per band. `GhostLink` — `border-line2`,
  `text-ink`, `hover:border-ink`, no fill, no icon, no second colour.

## Motion

- Global `--m-base: 240ms` with `ease-soft: cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Product frames may loop 4–8 seconds. Any motion honours
  `prefers-reduced-motion: reduce`.

## Accessibility

- All body text renders at contrast >= 7:1 (`#f0f0fa` on `#000000`).
- Visible focus ring: `outline: 2px solid rgba(240,240,250,0.62);
  outline-offset: 2px`.
- Semantic headings only; H1 once per page.
- Keyboard-reachable nav, focusable modals if introduced later.

## Product evidence

The `ProductFrame` component is the only surface that carries product
UI. It is a dark chromeless box with a 1px hairline and a corner label
that reads `DEMO · SYNTHETIC DATA`. Contents are built as React
components from the real DOM of the underlying app so the shapes stay
honest, but never carry live values.

## Nav and footer

- Nav (all pages): `PAYROLL · PROGRAMS · ENGINEERING · SECURITY · COMPANY`.
  Left-aligned wordmark `DOYEL LABS`. No CTA in the nav.
- Footer: full-width, hairline top. Left: `Doyel Labs LLC · Casper,
  Wyoming`. Center: `legal · status · support`. Right: current year.
