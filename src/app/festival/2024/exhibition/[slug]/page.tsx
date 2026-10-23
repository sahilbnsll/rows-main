import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { exhibitionArtistBySlug, exhibitionArtists } from "@/content/exhibition";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { PhotoGrid } from "@/components/ui/PhotoGrid";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { clip, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return exhibitionArtists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = exhibitionArtistBySlug(slug);
  if (!a) return {};
  return pageMetadata({
    title: `${a.name}: IAA Exhibition 2024`,
    description: clip(`${a.tagline} ${a.blurb}`),
    path: `/festival/2024/exhibition/${a.slug}`,
    image: (a.works[0]?.photo ?? a.portrait).src,
  });
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = exhibitionArtistBySlug(slug);
  if (!a) notFound();
  const i = exhibitionArtists.findIndex((x) => x.slug === a.slug);
  const next = exhibitionArtists[(i + 1) % exhibitionArtists.length];
  const prev = exhibitionArtists[(i - 1 + exhibitionArtists.length) % exhibitionArtists.length];
  const photos = a.works.map((w) => ({ ...w.photo, caption: `${w.title}. ${[w.size, w.medium].filter(Boolean).join(", ")}` }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Festival", path: "/festival" },
          { name: "2024", path: "/festival/2024" },
          { name: "Exhibition", path: "/festival/2024/exhibition" },
          { name: a.name, path: `/festival/2024/exhibition/${a.slug}` },
        ]}
      />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Festival", href: "/festival" },
          { label: "2024", href: "/festival/2024" },
          { label: "Exhibition", href: "/festival/2024/exhibition" },
          { label: a.name },
        ]}
        title={a.name}
        lead={a.tagline}
      />

      {a.works.length > 0 && (
        <section aria-labelledby="works-title" className="section-tight">
          <div className="wrap">
            <h2 id="works-title" className="section-title">
              Works shown
            </h2>
            <ul className="mt-8 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {a.works.map((w) => (
                <li key={w.photo.src} className="border-t border-line pt-3">
                  <span className="font-semibold text-ink">{w.title}</span>
                  <span className="meta block">{[w.size, w.medium].filter(Boolean).join(", ")}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <PhotoGrid photos={photos} title={`${a.name}: works at the 2024 exhibition`} columns="columns-1 sm:columns-2 lg:columns-3" showCaptions />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="bio-title" className="section">
        <div className="wrap">
          <div className="flex items-center gap-4">
            <Image src={a.portrait.src} alt={a.portrait.alt} width={a.portrait.w} height={a.portrait.h} sizes="64px" className="size-16 rounded-full object-cover" />
            <h2 id="bio-title" className="sub-title">
              About {a.name}
            </h2>
          </div>
          <Reveal className="reading prose-flow mt-6">
            {a.bio.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <Link href={`/festival/2024/exhibition/${prev.slug}`} className="link-arrow">
              <ArrowRight size={16} className="rotate-180" />
              {prev.name}
            </Link>
            <Link href="/festival/2024/exhibition" className="link-arrow">
              All artists
            </Link>
            <Link href={`/festival/2024/exhibition/${next.slug}`} className="link-arrow">
              {next.name}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
