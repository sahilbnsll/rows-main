import Image from "next/image";
import Link from "next/link";
import { exhibition, exhibitionArtists } from "@/content/exhibition";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { WorksWheel } from "@/components/sections/WorksWheel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IAA Exhibition 2024: Metaphysical, Symbolic and Healing Nature",
  description: "Thirteen artists at the International Ancient Arts Exhibition, Darshana Art Gallery, IGNCA, New Delhi, 8 to 10 November 2024, curated by Dr Reela Hota.",
  path: "/festival/2024/exhibition",
  image: "/images/exhibition/2024/highlights/11.jpg",
});

export default function ExhibitionPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Festival", href: "/festival" },
          { label: "2024", href: "/festival/2024" },
          { label: "Exhibition" },
        ]}
        title={exhibition.title}
        lead={exhibition.subtitle}
        meta={
          <>
            <span>{exhibition.dates}</span>
            <span>{exhibition.venue}</span>
            <span>Curated by {exhibition.curator}</span>
          </>
        }
      />

      <section aria-label="About the exhibition" className="section-tight">
        <div className="wrap">
          <div className="reading prose-flow !max-w-[46rem]">
            {exhibition.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <p className="meta mt-4">{exhibition.design}</p>
        </div>
      </section>

      <section aria-labelledby="wheel-title" className="stage on-stage section-tight">
        <div className="wrap">
          <h2 id="wheel-title" className="section-title max-w-[20ch]">
            Turn the wheel
          </h2>
          <p className="reading mt-3 max-w-[40rem]">A work by each of the thirteen artists. Scroll, drag or use the arrow keys to turn it; choose a work to meet its artist.</p>
        </div>
        <div className="mt-6">
          <WorksWheel label="Thirteen artists" items={exhibitionArtists.map((a) => ({ title: a.works[0]?.title ?? a.name, artist: a.name, image: (a.works[0]?.photo ?? a.portrait).src, href: `/festival/2024/exhibition/${a.slug}` }))} />
        </div>
      </section>

      <section aria-labelledby="artists-title" className="section">
        <div className="wrap">
          <h2 id="artists-title" className="section-title">
            Participating artists
          </h2>
          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {exhibitionArtists.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={(i % 3) * 70}>
                <Link href={`/festival/2024/exhibition/${a.slug}`} className="group block">
                  <div className="zoom-on-hover relative aspect-[4/3] overflow-hidden rounded-xl bg-sage-deep shadow-e1">
                    <Image src={(a.works[0]?.photo ?? a.portrait).src} alt="" fill sizes="(min-width:1024px) 24rem, (min-width:640px) 45vw, 92vw" quality={80} className="object-cover" />
                  </div>
                  <div className="mt-4 flex items-start gap-4">
                    <Image src={a.portrait.src} alt={a.portrait.alt} width={a.portrait.w} height={a.portrait.h} sizes="56px" quality={75} className="size-14 shrink-0 rounded-full object-cover" />
                    <div className="min-w-0">
                      <h3 className="display text-[1.4rem] leading-tight group-hover:text-maroon">{a.name}</h3>
                      <p className="meta mt-1 line-clamp-2">{a.tagline}</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-maroon-deep">
                        View profile and works <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <Link href="/festival/2024" className="link-arrow">
            Back to IAAF 2024
          </Link>
        </div>
      </section>
    </>
  );
}
