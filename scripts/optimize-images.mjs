/**
 * Optimize the SteadFast client screenshots.
 *
 * These images ship on the homepage hero preview and on the SteadFast
 * case study. Originally they were captured at 2880×1620 (5MP) — way
 * larger than they're ever displayed at (~486px wide on desktop hero,
 * ~1000px on the case study page). Serving 5MP JPEGs to a 486px slot
 * is wasteful; this script rewrites each source to a 1600px-wide,
 * mozjpeg-optimized version, and additionally emits a WebP variant
 * alongside for future <picture>-based delivery.
 *
 * Usage: `node scripts/optimize-images.mjs`
 * Idempotent: safe to re-run.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const files = [
  "public/media/websites/steadfast-hero.jpg",
  "public/media/websites/steadfast-contractors.jpg",
];

const MAX_WIDTH = 1600;

for (const f of files) {
  const abs = path.resolve(f);
  const meta = await sharp(abs).metadata();
  console.log(`\n${f}`);
  console.log(`  before: ${meta.width}×${meta.height}, ${(fs.statSync(abs).size / 1024).toFixed(1)}KB`);

  // Read the source into memory once, then close the file handle by
  // letting the returned Buffer go out of scope. Writing back to the
  // same path is safe on Windows only after the source stream is
  // released.
  const source = fs.readFileSync(abs);

  const jpg = await sharp(source)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toBuffer();
  const webp = await sharp(source)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  fs.writeFileSync(abs, jpg);
  const webpPath = abs.replace(/\.jpg$/, ".webp");
  fs.writeFileSync(webpPath, webp);

  const jpgMeta = await sharp(jpg).metadata();
  console.log(`  after JPG: ${jpgMeta.width}×${jpgMeta.height}, ${(jpg.length / 1024).toFixed(1)}KB`);
  console.log(`  after WebP: ${jpgMeta.width}×${jpgMeta.height}, ${(webp.length / 1024).toFixed(1)}KB`);
  console.log(`  saved: ${((meta.width * meta.height) / (jpgMeta.width * jpgMeta.height)).toFixed(1)}× resolution, ${(1 - jpg.length / fs.statSync(abs).size).toFixed(2) * 100}% JPG size`);
}

console.log("\ndone.");
