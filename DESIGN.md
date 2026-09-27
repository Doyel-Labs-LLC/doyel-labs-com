# Design — Doyel Labs (v9)

The full brief lives in [`PROMPT.md`](./PROMPT.md). This file is the short
reference for tokens and rules.

## Palette (unchanged from v8)

| Token | Value | Where |
|---|---|---|
| `bg` | `#0a0f14` | Page canvas |
| `surface` / `surface2` | `#12181f` / `#171e26` | Panels, frames, cards |
| `ink` | `#f0f0fa` | Body and display type |
| `mute` / `muted` | 0.66 / 0.50 alpha | Body below the lead / captions (AA at small sizes) |
| `line` / `line2` | 0.10 / 0.22 alpha | Hairlines |
| **`accent`** | `#10c7eb` | The one accent |
| `accentHi` / `accentDim` / `accentSoft` | hover / hairline / wash | |
| `rise` / `fall` / `care` | green / red / amber | Status only |

## Type (new in v9)

Named scale in `tailwind.config.ts`: `display` 56/1.05 · `displaySm` 38 ·
`h2` 36/1.15 · `h2Sm` 28 · `h3` 22/1.3 · `body` 17/1.65 · `small` 15/1.55.
**Headings are sentence case.** Uppercase only for eyebrows, nav, chips,
and CTA pills. Inter for everything; JetBrains Mono for eyebrows, chips,
and figures. Both self-hosted from `src/fonts/` via `next/font/local`.

## Layout primitives (`src/components/chrome.tsx`)

`Page` · `Section` (rhythm + top rule) · `Split` (text + visual) · `H1` ·
`H2` · `H3` · `Lead` · `Body` · `Card` · `Grid2` / `Grid3` · `Feature`
(numbered step) · `Checks` (bullet list) · `Faq` (details/summary) ·
`Price` · `Notice` · `AccentChip` / `StatusChip` · `PrimaryLink` /
`GhostLink` · `Close` (closing band with the modal CTA + phone) ·
`WhoAnswers` (footer block). Max six sections per page; never two card
grids in a row.

## Illustration (`src/components/illus.tsx`)

Ten inline SVGs, one style: off-white 1.5px linework, one flat cyan fill at
16% opacity, no faces, no gradients. Names: `call`, `answer`, `three-days`,
`keys`, `care`, `scope`, `flow`, `casper`, `lock`, `lost`. Real SteadFast
screenshots stay, framed in a browser mock. No photography.

## Motion

Hero fade-in (`.hero-in`) and one scroll reveal (`<Reveal>`). The `<html>`
element starts with `no-js`; a hashed inline script removes it before
paint. If JS never runs, every reveal is simply visible. Reduced motion
disables everything.

## Icon

Four rounded squares — dark gray, mid gray, light gray, cyan. Header,
footer, favicon, OG card, founder signature card.
