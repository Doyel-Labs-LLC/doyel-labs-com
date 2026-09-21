/**
 * Optimize the two BAI brand images and emit web-ready variants.
 *
 *   bai-mark-orig.jpg → bai-mark.jpg + bai-mark.webp
 *     (portrait "BAI on a stage" render, used as a decorative
 *      product mark inline with the BAI section on /products/)
 *
 *   bai-hero-orig.jpg → bai-hero.jpg + bai-hero.webp
 *     (landscape "BAI on a stage" render, used as the hero visual
 *      on /products/#bai and as the OpenGraph card for BAI legal
 *      pages)
 *
 * Also emits:
 *
 *   bai-hero-alpaca.jpg
 *     Exactly 1024×500 (Alpaca's required app-listing screenshot
 *     dimension). This is the same landscape render, letterboxed
 *     into 1024×500 with black bars if the source aspect doesn't
 *     match. Publishable to Alpaca as the app-tile screenshot.
 *
 * Usage: `node scripts/optimize-bai-images.mjs`
 * Idempotent: safe to re-run.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const BAI = "public/media/bai";
const MAX_WIDTH = 1600;

async function optimizePair(basename) {
  const origPath = path.resolve(BAI, `${basename}-orig.jpg`);
  const jpgPath = path.resolve(BAI, `${basename}.jpg`);
  const webpPath = path.resolve(BAI, `${basename}.webp`);
  const meta = await sharp(origPath).metadata();
  const origSize = fs.statSync(origPath).size;
  console.log(`\n${basename}`);
  console.log(`  source: ${meta.width}×${meta.height}, ${(origSize / 1024).toFixed(1)}KB`);

  const source = fs.readFileSync(origPath);
  const jpg = await sharp(source)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toBuffer();
  const webp = await sharp(source)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toBuffer();
  fs.writeFileSync(jpgPath, jpg);
  fs.writeFileSync(webpPath, webp);

  const jpgMeta = await sharp(jpg).metadata();
  console.log(`  JPG:    ${jpgMeta.width}×${jpgMeta.height}, ${(jpg.length / 1024).toFixed(1)}KB`);
  console.log(`  WebP:   ${jpgMeta.width}×${jpgMeta.height}, ${(webp.length / 1024).toFixed(1)}KB`);
  return { width: jpgMeta.width, height: jpgMeta.height };
}

// Standard hero optimizations
await optimizePair("bai-mark");
await optimizePair("bai-hero");

// Alpaca app-tile: exactly 1024×500, letterboxed if needed. Alpaca
// requires PNG or JPG at this exact size — see the dashboard's
// "Publish App > Screenshots" section for the spec.
const heroOrig = fs.readFileSync(path.resolve(BAI, "bai-hero-orig.jpg"));
const alpacaPath = path.resolve(BAI, "bai-hero-alpaca.jpg");
const alpaca = await sharp(heroOrig)
  .resize({
    width: 1024,
    height: 500,
    fit: "contain",
    // Sample the top-left corner (near-black background) to letterbox
    // seamlessly with the render's own backdrop.
    background: { r: 8, g: 12, b: 16, alpha: 1 },
  })
  .jpeg({ quality: 88, mozjpeg: true, progressive: true })
  .toBuffer();
fs.writeFileSync(alpacaPath, alpaca);
const alpacaMeta = await sharp(alpaca).metadata();
console.log(`\nbai-hero-alpaca (Alpaca app tile)`);
console.log(`  ${alpacaMeta.width}×${alpacaMeta.height}, ${(alpaca.length / 1024).toFixed(1)}KB`);

console.log("\ndone.");
