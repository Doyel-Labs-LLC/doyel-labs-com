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
 */
const EXTENSIONS = ["webp", "jpg", "jpeg", "png"] as const;

export function generatedImage(name: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = `${name}.${ext}`;
    if (generatedImages.includes(file)) return `/media/generated/${file}`;
  }
  return null;
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
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`h-auto w-full ${frame ? "rounded-[6px] shadow-card" : ""} ${className}`}
    />
  );
}
