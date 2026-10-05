# Design — Doyel Labs (v10)

The full brief lives in [`PROMPT.md`](./PROMPT.md). This file is the short
reference for tokens and rules.

## Palette (v10, warm light)

| Token | Value | Where |
|---|---|---|
| `bg` | `#f6eee2` | Warm linen canvas (never pure white) |
| `surface` / `surface2` | `#fffaf2` / `#f1e7d8` | Ivory cards, frames / sand band |
| `ink` | `#1b1f26` | Body and display type |
| `mute` / `muted` | 0.80 / 0.68 alpha ink | Body below the lead / captions (AA) |
| `line` / `line2` | 0.10 / 0.22 alpha ink | Hairlines |
| **`accent`** / `accentInk` | `#087187` / `#06596a` | Teal — links, solid buttons / hover (darker) |
| `warm` / `warmSoft` | `#f2b455` / 16% | Illustration fills, one band wash. Never text. |
| `rise` / `fall` / `care` | green / red / amber | Status only |

The logo mark keeps its own cyan (`#10c7eb`). Shadows are real and
warm (`card`, `cardHover`, `lift`, `button`, `glow` tokens). Radii: `card`
20px, `panel` 32px, buttons are full pills.

## Type (v12)

Fraunces (variable, soft axis) for H1–H3, prices, and quotes — teal words
inside a heading render in Fraunces italic. Figtree for body, nav,
buttons, and labels. Both self-hosted from `src/fonts/` via
`next/font/local`. System monospace only inside product frames. Named
scale in `tailwind.config.ts`: `display` 64 · `displaySm` 42 · `h2` 44 ·
`h2Sm` 32 · `h3` 24 · `lead` 20 · `body` 18 · `small` 16. **Everything is
sentence case** except the short eyebrow label.

## Buttons

`buttonClass(variant, size)` in `src/components/button-styles.ts` is the
only button style. Primary: solid teal pill, white text, hover darkens to
`accentInk`. Secondary: ivory pill, hairline border. `textLink` is the
inline link style.

## Email

`src/lib/contact-email.ts` renders the internal notification and the
visitor receipt: linen canvas, one ivory rounded card, Georgia headings,
amber bar, teal pill button, plain-text twin. Preview both by rendering
them to HTML files before changing them.

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
(`src/components/illus.tsx`: ink linework, teal wash, amber fill, ivory
paper shapes) as fallbacks. Names: `call`, `answer`, `three-days`, `keys`,
`care`, `scope`, `flow`, `casper`, `lock`, `lost`.

## Motion

Hero fade-in (`.hero-in`) only. Do not hide sections until scroll: a
visitor, a crawler, and a full-page capture must see every section on
first paint. Reduced motion finishes the hero immediately.

## Icon

Four rounded squares — dark gray, mid gray, light gray, cyan. Header,
footer, favicon, OG card, emails, the About "who answers" card.
