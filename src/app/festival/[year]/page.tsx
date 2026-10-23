import { notFound } from "next/navigation";
import { editionByYear, editions } from "@/content/festival";
import { EditionPage } from "@/components/sections/EditionPage";
import { clip, pageMetadata } from "@/lib/seo";

/** Every past edition except 2024, which has its own page with the conference and exhibition beneath it. */
const slugs = editions.filter((e) => e.slug !== "2024").map((e) => e.slug);

export function generateStaticParams() {
  return slugs.map((year) => ({ year }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const e = editionByYear(year);
  if (!e || !slugs.includes(year)) return {};
  return pageMetadata({
    title: `IAAF ${e.year}: ${e.theme}`,
    description: clip(e.paragraphs[0]),
    path: `/festival/${e.slug}`,
    image: e.poster?.src,
    imageAlt: e.poster?.alt,
  });
}

export default async function EditionRoute({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const edition = editionByYear(year);
  if (!edition || !slugs.includes(year)) notFound();
  return <EditionPage edition={edition} />;
}
