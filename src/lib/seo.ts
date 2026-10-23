import type { Metadata } from "next";
import { isIndexable } from "./site-url";

const SITE = "Rays of Wisdom Society";

interface PageMeta {
  title: string;
  description: string;
  /** Path with leading slash, used for the canonical link. */
  path: string;
  /** Path of a share image under /public; defaults to the site-wide card. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/** One place to build each page's title, description, canonical link and share card. */
export function pageMetadata({ title, description, path, image, imageAlt, type = "website", noindex }: PageMeta): Metadata {
  const fullTitle = title === SITE ? title : `${title} | ${SITE}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      ...(image ? { images: [{ url: image, alt: imageAlt ?? title }] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(image ? { images: [image] } : {}) },
    ...(noindex || !isIndexable ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Trims text to a meta-description length at a word boundary. */
export function clip(text: string, max = 158): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:\s]+$/, "") + "…";
}
