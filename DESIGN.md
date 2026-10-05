# Design — Doyel Labs (v10)

The full brief lives in [`PROMPT.md`](./PROMPT.md). This file is the short
reference for tokens and rules.

## Palette (v10, warm light)

| Token | Value | Where |
|---|---|---|
| `bg` | `#faf7f2` | Cream canvas |
| `surface` / `surface2` | `#ffffff` / `#f3efe8` | Cards, frames / warm band |
| `ink` | `#1b1f26` | Body and display type |
| `mute` / `muted` | 0.80 / 0.68 alpha ink | Body below the lead / captions (AA) |
| `line` / `line2` | 0.10 / 0.22 alpha ink | Hairlines |
| **`accent`** / `accentHi` | `#087187` / `#065e70` | Teal — links, CTAs, eyebrow bars. `accentHi` is the darker hover so small text stays WCAG AA on cream. |
| `warm` / `warmSoft` | `#f2b455` / 16% | Illustration fills, one band wash. Never text. |
| `rise` / `fall` / `care` | green / red / amber | Status only |

The logo mark keeps its own cyan (`#10c7eb`). Shadows are real and
warm-grey (`card`, `cardHover`, `glow` tokens).

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

## Imagery

Photos first, in slots (`<Photo>`; see `IMAGES.md`), then real SteadFast
screenshots in a browser mock, then line illustrations
(`src/components/illus.tsx`: ink linework, teal wash, amber fill, white
paper shapes) as fallbacks. Names: `call`, `answer`, `three-days`, `keys`,
`care`, `scope`, `flow`, `casper`, `lock`, `lost`.

## Motion

Hero fade-in (`.hero-in`) and one scroll reveal (`<Reveal>`). The `<html>`
element starts with `no-js`; a hashed inline script removes it before
paint. If JS never runs, every reveal is simply visible. Reduced motion
disables everything.

## Icon

Four rounded squares — dark gray, mid gray, light gray, cyan. Header,
footer, favicon, OG card, founder signature card.
