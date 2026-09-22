# Design — Doyel Labs (v2)

The full brief lives in [`PROMPT.md`](./PROMPT.md). This file is the
short reference for the design system tokens and rules.

## Palette

Anchored on the physical Doyel Labs icon: four rounded squares in dark
gray, mid gray, light gray, and cyan. The cyan is the single accent used
across the site.

| Token          | Value                             | Where                                     |
| -------------- | --------------------------------- | ----------------------------------------- |
| `bg`           | `#0a0f14`                         | Page canvas (softened from pure black)     |
| `surface`      | `#12181f`                         | Inset panels, product frames, hover        |
| `surface2`     | `#171e26`                         | Cards on `surface`, tables                 |
| `ink`          | `#f0f0fa`                         | Body / display type                        |
| `mute`         | `rgba(240,240,250,0.66)`          | Body below the lead                        |
| `muted`        | `rgba(240,240,250,0.44)`          | Captions, footnotes                        |
| `line`         | `rgba(240,240,250,0.10)`          | Default hairline                           |
| `line2`        | `rgba(240,240,250,0.22)`          | CTA border, active hairline                |
| **`accent`**   | `#10c7eb`                         | Cyan — the one accent color               |
| `accentHi`    | `#4edcfb`                         | Cyan on hover                              |
| `accentDim`   | `rgba(16,199,235,0.32)`           | Cyan hairline for cards / underlines       |
| `accentSoft`  | `rgba(16,199,235,0.10)`           | Cyan wash on active band / primary CTA fill |
| `iconDark`     | `#3f444b`                         | Icon square (top-left)                     |
| `iconMid`      | `#878a91`                         | Icon square (top-right)                    |
| `iconLight`    | `#c7cad0`                         | Icon square (bottom-left)                  |
| `rise`         | `#4ed4a2`                         | Status up                                  |
| `fall`         | `#ff7b8a`                         | Status down                                |
| `care`         | `#f5c15a`                         | Program status chip (NOT SHIPPING, etc.)   |

## Usage rules for the accent

Cyan is used for:

- The bottom-right square of the four-square logo.
- Focus rings on every interactive element.
- The active nav item and hover on nav links.
- The primary CTA on any page (cyan pill with a cyan hairline).
- The `AccentChip` used for "Live at …" and "In use at …" proof lines.
- The eyebrow accent bar (a 24px cyan bar before every eyebrow label).
- The `Notice` component's left border.
- The `/status` "up" dot when the control plane is healthy.
- Inline emphasis inside a headline (one word per H1 at most).

Cyan is **not** used for:

- Body text (never).
- Any card fill (only borders and 10-% washes).
- Two CTAs on the same band — one primary, everything else ghost.
- The BAI or ConnectionLoop program pages beyond the site's chrome —
  those pages keep their own visual identity.

## Depth & elevation

The canvas is near-black, so depth is built from **light, not grey shadow**
(a grey drop-shadow is invisible here). The recipe, encoded in the
`surface-card` utility (`globals.css`) and the `card` / `cardHover` shadow
tokens (`tailwind.config.ts`):

- A faint top-lit surface gradient (white at ~2%, fading by 42%).
- An inset 1px top highlight (light-from-above).
- A soft, very dark drop for lift — never a grey box-shadow.
- Hover warms the border to `accentDim`, lifts 2px, and deepens the drop.

Applied through the shared `Card` component and the interactive link-cards
(home / work / products), so every page inherits it. The hero uses a quiet
cyan **mesh** (three radials) plus a hairline grid overlay (`.hero-glow`),
and flagship band dividers use `.divider-soft` (a cyan-tinted hairline that
fades in from the left, rhyming with the eyebrow accent bar). Elevation is
still restrained: subtle is the point.

## Typography

- Inter with system fallbacks.
- Display + nav: uppercase, tracked `-0.01em` on H1/H2, `0.06em` on nav.
- Body: sentence case, 16px+, `line-height: 1.65`.
- Legal / docs prose: never uppercase, ever.

## Icon

Four rounded squares (radius 10 on a 100-unit square, 44 side length,
4-unit gap, 4-unit padding). Colors in the palette table. Rendered as
SVG (`/logo.svg`, `/favicon.svg`, `/icon-192.svg`). Used in:

- The header, next to the "DOYEL LABS" wordmark.
- The footer, small, before the same wordmark.
- The home page hero and the `/company` page hero.
- The `/programs` cards on the home page.

## The rest

Anything not covered here — content voice, page structure, refusals —
lives in [`PROMPT.md`](./PROMPT.md).
