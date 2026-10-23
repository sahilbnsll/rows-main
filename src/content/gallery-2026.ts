import galleryJson from "./data/gallery-2026.json";
import type { Photo } from "./photo";

type Raw = Record<string, { src: string; w: number; h: number; caption?: string }[]>;

/**
 * Extra photographs per performance (folder name = performance id; "award" for Madhavi Mudgal), with captions written
 * for the festival project's viewer. Files were moved to public/images/iaaf-2026/gallery.
 */
export const gallery2026: Record<string, Photo[]> = Object.fromEntries(
  Object.entries(galleryJson as Raw).map(([folder, items]) => [
    folder,
    items.map((p) => ({
      src: p.src.replace("/images/gallery/", "/images/iaaf-2026/gallery/"),
      w: p.w,
      h: p.h,
      alt: p.caption ?? "Photograph from IAAF 2026",
      caption: p.caption,
    })),
  ]),
);
