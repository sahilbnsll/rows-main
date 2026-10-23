/**
 * The public address of the site, used for canonical links, share images, the sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL on the live site (with or without https://); on Vercel it falls back to the
 * production domain, and to localhost in development.
 */
function resolve(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return /^https?:\/\//.test(configured) ? configured : `https://${configured}`;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteUrl = resolve().replace(/\/+$/, "");

/** Until NEXT_PUBLIC_INDEXABLE=true is set the whole site asks search engines to stay away (draft mode). */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

/** Where visitors make their IAAF 2026 e-pass (separate festival site). Empty hides the e-pass button. */
export const epassUrl = process.env.NEXT_PUBLIC_EPASS_URL?.trim() || "";
