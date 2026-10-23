import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site-url";

/** Draft mode (the default) blocks crawlers entirely. Set NEXT_PUBLIC_INDEXABLE=true on the live site after sign-off. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl };
}
