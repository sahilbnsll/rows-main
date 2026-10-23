import type { MetadataRoute } from "next";
import { culturalEvents } from "@/content/events";
import { exhibitionArtists } from "@/content/exhibition";
import { editions } from "@/content/festival";
import { productions } from "@/content/productions";
import { siteUrl } from "@/lib/site-url";

/** Every public page, built from the content files so a new production, event or artist appears here by itself. */
export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["/", "/about", "/team", "/partners", "/festival", "/festival/2026", "/festival/2024/conference", "/festival/2024/exhibition", "/productions", "/events", "/yoga", "/media", "/media/print", "/support", "/contact"];
  const dynamic = [
    ...productions.map((p) => `/productions/${p.slug}`),
    ...editions.map((e) => `/festival/${e.slug}`),
    ...exhibitionArtists.map((a) => `/festival/2024/exhibition/${a.slug}`),
    ...culturalEvents.map((e) => `/events/${e.slug}`),
  ];
  const priority = (p: string) => (p === "/" ? 1 : p === "/festival/2026" ? 0.9 : fixed.includes(p) ? 0.8 : 0.6);
  return [...fixed, ...dynamic].map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}`, changeFrequency: path === "/festival/2026" ? "weekly" : "monthly", priority: priority(path) }));
}
