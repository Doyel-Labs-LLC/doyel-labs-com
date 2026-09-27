# IMAGES — slots, sizes, and generation prompts

The site works without any photos: each slot below falls back to a line
illustration. Drop a file into `public/media/generated/` with the exact
file name, run `npm run build`, and it appears. No code changes.

## Rules for every image

- **Size:** 1600 × 1200 px (4:3), JPG, quality 80, under 250 KB. Run
  `node scripts/optimize-images.mjs` if a file is larger. Then run
  `node scripts/optimize-generated-images.mjs` to make the smaller
  WebP copy the site serves first (the JPG stays as the fallback).
- **Style, one line to paste at the end of every prompt:**
  > warm natural light, soft cream and amber tones with a hint of teal,
  > shallow depth of field, editorial photography, calm, unposed, no
  > text, no logos, no watermarks, no visible faces
- **No faces** (privacy, and no stock-photo feel). Hands, backs,
  silhouettes, objects, and places are all fine.
- **No people that could be mistaken for you** unless you choose to add a
  real photo of yourself, which the brief currently says not to.
- Nothing that looks like a screenshot of software (the real frames
  already do that).

## The slots

| File name | Where it shows | Prompt (paste the style line after it) |
|---|---|---|
| `home-answer.jpg` | Home → "Why it's different" | A person seen from behind at a wooden desk in a bright small office, holding a phone to their ear with one hand and a pen over a notebook with the other, a window with morning light and a plant |
| `websites-care.jpg` | Websites → care plan | The front of a small independent business on a quiet main street, an "open" sign in the window, morning light, a bicycle leaning nearby, welcoming and cared-for |
| `how-we-work-scope.jpg` | How we work → hero | A single printed one-page document on a warm wooden table with a signature line at the bottom, a fountain pen resting on it, a coffee mug beside it, overhead angle |
| `software-scope.jpg` | Software → "How a project runs" | Two people at a workbench in a small workshop reviewing a printed plan together, seen from above and behind so no faces show, tools and a laptop nearby |
| `contact-call.jpg` | Contact → "What we don't do" | A landline handset resting on an open notebook beside a mug of coffee on a warm wooden desk, close-up, morning light through a window |
| `about-casper.jpg` | About → hero | Casper Mountain and the open Wyoming plains at golden hour, a two-lane road leading toward the town, big sky, no people |
| `close-desk.jpg` | Every page → closing band | A tidy desk by a window at first light: a phone, a closed notebook, a small plant, a mug, warm tones, calm |

## Optional extras (no slot yet — send them and I'll place them)

- `og-background.jpg` (1200 × 630): the Wyoming plains at dawn, very soft,
  to sit behind the four-square mark on social cards.
- `work-steadfast-context.jpg` (1600 × 1200): a rural highway in Montana
  at dawn with a single delivery vehicle far off, for the Work page.

## Tips for the generator

- Ask for "editorial photograph" rather than "illustration" so the results
  match the real SteadFast screenshots on the same pages.
- If a result includes a face, regenerate or crop; don't blur.
- Generate 3–4 options per slot, pick the one with the calmest composition
  and the least clutter. The pages have text beside these images.
