import manifest from "./image-manifest.generated.json";

/** A locally managed photograph with the dimensions next/image needs (so there is no layout shift). */
export interface Photo {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption?: string;
  /** CSS object-position for crops, e.g. "50% 20%" keeps faces in frame. */
  position?: string;
  credit?: string;
}

const dims = manifest as Record<string, { w: number; h: number }>;

/**
 * Looks a picture up in the generated image manifest (`npm run images`). A path that is not in the manifest
 * stops the build, so a broken image reference can never reach the live site.
 */
export function photo(src: string, alt: string, extra: Partial<Photo> = {}): Photo {
  const d = dims[src];
  if (!d) throw new Error(`Image not in manifest: ${src}. Run "npm run images" or fix the path.`);
  return { src, w: d.w, h: d.h, alt, ...extra };
}

export function hasPhoto(src: string): boolean {
  return src in dims;
}
