import { Illus, type IllusName } from "@/components/illus";
import { generatedImages } from "@/lib/generated-images.generated";

/**
 * Image slot with a build-time fallback.
 *
 * Drop a file at `public/media/generated/<name>.jpg` (or .webp / .png),
 * rebuild, and it renders here in place of the line illustration. If no
 * file exists, the matching <Illus> renders instead, so the site is never
 * waiting on artwork. IMAGES.md lists every slot, its size, and the
 * generation prompt.
 *
 * The list of files is generated at build time by
 * scripts/generate-public-paths.mjs, so this works in any component.
 *
 * Sized <img> elements, not next/image: the optimizer writes
 * style="color:transparent", which would force style-src 'unsafe-inline'
 * on every public page.
 */
const RASTER = ["jpg", "jpeg", "png"] as const;

function generatedFile(name: string, ext: string): string | null {
  const file = `${name}.${ext}`;
  return generatedImages.includes(file) ? `/media/generated/${file}` : null;
}

/** Prefer a JPEG/PNG url for the <img> src so a browser that cannot
 *  decode WebP still has a picture. WebP, when present, is a <source>. */
export function generatedImage(name: string): string | null {
  for (const ext of RASTER) {
    const src = generatedFile(name, ext);
    if (src) return src;
  }
  return generatedFile(name, "webp");
}

export function Photo({
  name,
  fallback,
  alt,
  width = 1200,
  height = 900,
  priority = false,
  className = "",
  frame = true,
}: {
  /** File stem under public/media/generated/. */
  name: string;
  /** Illustration used until the image exists. */
  fallback: IllusName;
  /** Alt text for the image once it exists. */
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  /** Rounded corners + soft shadow around the photo. */
  frame?: boolean;
}) {
  const src = generatedImage(name);
  if (!src) return <Illus name={fallback} className={className} decorative />;
  const webp = generatedFile(name, "webp");
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      // Synchronous decode so a full-page capture paints the photo instead
      // of an empty reserved box. These slots are few and already sized.
      decoding="sync"
      fetchPriority={priority ? "high" : undefined}
      className={`block h-auto w-full ${frame ? "rounded-card shadow-card ring-1 ring-ink/5" : ""} ${className}`}
    />
  );
  if (!webp || webp === src) return img;
  return (
    <picture className="block w-full">
      <source srcSet={webp} type="image/webp" />
      {img}
    </picture>
  );
}
