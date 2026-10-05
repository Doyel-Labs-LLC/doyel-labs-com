/**
 * Emit a WebP next to every photo in public/media/generated/.
 *
 * <Photo> prefers the .webp when both exist, so visitors download roughly
 * a third of the bytes. The .jpg stays as the source (and the OG card
 * background reads it). Photo slots render at most ~450px wide (900px on
 * 2x screens), so 960px wide is plenty.
 *
 * Usage: `node scripts/optimize-generated-images.mjs`. Idempotent.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("public", "media", "generated");
const MAX_WIDTH = 960;

for (const name of fs.readdirSync(dir)) {
  if (!/\.(?:jpe?g|png)$/i.test(name)) continue;
  // The OG card reads the JPG directly; it never renders in <Photo>.
  if (name.startsWith("og-")) continue;
  const src = path.join(dir, name);
  const out = path.join(dir, name.replace(/\.(?:jpe?g|png)$/i, ".webp"));
  await sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toFile(out);
  const before = fs.statSync(src).size / 1024;
  const after = fs.statSync(out).size / 1024;
  console.log(`${name}: ${before.toFixed(0)}KB -> ${path.basename(out)} ${after.toFixed(0)}KB`);
}
