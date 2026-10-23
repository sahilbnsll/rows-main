import Link from "next/link";
import { productions } from "@/content/productions";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Frame } from "@/components/ui/Frame";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoGrid } from "@/components/ui/PhotoGrid";
import { MorphHero, type MorphSlide } from "@/components/sections/MorphHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Productions",
  description: "Five dance productions by Rays of Wisdom Society: The Vedas, Antar Yatra, Sanskrit: The Mantra Bhasha, Ramleela in Opera and Rabindra Abhivyakti.",
  path: "/productions",
  image: "/images/productions/the-vedas/05.jpg",
});

export default function ProductionsPage() {
  const items = [...productions].sort((a, b) => b.year - a.year);
  // two photographs from each production dissolve into one another in the opening
  const slides: MorphSlide[] = items.flatMap((p) =>
    [p.cover, ...p.photos.filter((x) => x.src !== p.cover.src)].slice(0, 2).map((x) => ({ src: x.src, w: x.w, h: x.h, alt: x.alt, title: p.title, href: `/productions/${p.slug}`, note: p.premiere })),
  );
  // every photograph once, captioned with its production
  const seen = new Set<string>();
  const gallery = items.flatMap((p) => [p.cover, ...p.photos].filter((x) => !seen.has(x.src) && seen.add(x.src)).map((x) => ({ ...x, caption: p.title })));
  return (
    <>
      <MorphHero slides={slides}>
        <div className="wrap absolute inset-x-0 top-0 pt-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Productions" }]} tone="stage" />
          <div className="hero-rise mt-10 max-w-[40rem] sm:mt-14">
            <h1 className="page-title">Productions</h1>
            <p className="lead mt-5">Dances that convey a spiritual message: the wisdom of the Vedas, the healing language of Sanskrit, the chakras, the Ramayana and the poems of Tagore.</p>
          </div>
        </div>
      </MorphHero>

      <section aria-labelledby="stage-photos-title" className="stage on-stage section-tight">
        <div className="wrap">
          <h2 id="stage-photos-title" className="section-title max-w-[20ch]">
            From the stage
          </h2>
          <p className="reading mt-3 max-w-[40rem]">Every photograph from the five productions. Each comes into colour as you point at it; open one to see it large.</p>
          <div className="mt-8">
            <PhotoGrid photos={gallery} title="Photographs from the productions" variant="bento" tone="stage" showCaptions mono />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <ol className="space-y-20 lg:space-y-28">
            {items.map((p, i) => (
              <li key={p.slug} className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal develop mask>
                  <Link href={`/productions/${p.slug}`} className="block" tabIndex={-1} aria-hidden="true">
                    <Frame photo={p.cover} ratio="4 / 3" sizes="(min-width:1024px) 38rem, 92vw" zoom className="shadow-e2" />
                  </Link>
                </Reveal>
                <Reveal delay={80}>
                  <p className="serif italic text-ink-muted">
                    {p.year} · {p.duration}
                  </p>
                  <h2 className="section-title mt-2 max-w-[14ch]">
                    <Link href={`/productions/${p.slug}`} className="hover:text-maroon">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="reading mt-4">{p.summary}</p>
                  <p className="meta mt-3">{p.premiere}</p>
                  <Link href={`/productions/${p.slug}`} className="link-arrow mt-3">
                    About {p.title}
                    <ArrowRight size={16} />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
