import Link from "next/link";
import { editions, festivalIntro, festivalMoments } from "@/content/festival";
import { testimonials } from "@/content/testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { Hills } from "@/components/ui/Ornaments";
import { Quote } from "@/components/ui/Quote";
import { Reveal } from "@/components/ui/Reveal";
import { CountriesGlobe } from "@/components/sections/CountriesGlobe";
import { EditionsTimeline } from "@/components/sections/EditionsTimeline";
import { PolaroidLine } from "@/components/sections/PolaroidLine";
import { brand } from "@/content/festival-2026";
import { festivalCountries, festivalHome } from "@/content/festival-countries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "International Ancient Arts Festival",
  description: "The International Ancient Arts Festival (IAAF): a festival and symposium on the healing power of ancient arts, held in New Delhi by Rays of Wisdom Society since 2010.",
  path: "/festival",
  image: "/images/festival/2024/banner.webp",
});

/** The poster of each edition, for the polaroids on the globe. */
const posters: Record<number, string | undefined> = Object.fromEntries(editions.map((e) => [e.year, e.poster?.src]));

export default function FestivalPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Festival" }]}
        title={festivalIntro.title}
        lead={festivalIntro.summary}
        actions={
          <Link href="/festival/2026" className="btn btn-primary">
            The next edition: 25 to 26 November 2026
          </Link>
        }
      />

      <section aria-labelledby="why-title" className="section-tight">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 id="why-title" className="section-title max-w-[16ch]">
              {festivalIntro.whyTitle}
            </h2>
          </Reveal>
          <div className="reading prose-flow">
            {festivalIntro.why.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 60}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="editions-heading" className="section-tight">
        <div className="wrap">
          <EditionsTimeline
            title="Every edition"
            intro="Nine festivals since 2010, each with its own theme, held in New Delhi. Choose an edition to read about it."
            items={[
              {
                year: 2026,
                label: "9th edition · coming up",
                theme: "Ancient Arts. Universal Consciousness. A World Beyond Boundaries.",
                dates: "25 and 26 November 2026",
                venue: "Kamani Auditorium, New Delhi",
                href: "/festival/2026",
                poster: brand.collage,
                highlight: true,
              },
              ...editions.map((e) => ({
                year: e.year,
                label: e.ordinal ? `${e.ordinal} edition` : "Edition",
                theme: e.theme,
                dates: e.dates,
                venue: e.venue,
                blurb: e.blurb,
                href: `/festival/${e.slug}`,
                poster: e.poster ?? e.extras?.[0],
              })),
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="world-title" className="section-tight">
        <div className="wrap">
          <h2 id="world-title" className="section-title max-w-[20ch]">
            Artists from across the world
          </h2>
          <p className="reading mt-3 max-w-[40rem]">Every country whose artists or scholars the festival&rsquo;s own pages name, each joined to New Delhi. Choose a country, or drag the globe.</p>
          <div className="mt-10">
            <CountriesGlobe countries={festivalCountries} home={festivalHome} posters={posters} />
          </div>
        </div>
      </section>

      <section aria-labelledby="moments-title" className="stage on-stage section">
        <div className="wrap">
          <h2 id="moments-title" className="section-title max-w-[18ch]">
            Moments from the festival
          </h2>
          <p className="reading mt-3">Drag the line, or use the arrows, to look along the prints.</p>
        </div>
        <div className="mt-6">
          <PolaroidLine photos={festivalMoments} label="Moments from the festival" />
        </div>
      </section>

      <section aria-label="Testimonials" className="relative section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          {[testimonials[0], testimonials[3]].map((t, i) => (
            <Quote key={t.name} text={t.quote} name={t.name} role={t.role} context={t.context} size="lg" delay={i * 90} />
          ))}
        </div>
      </section>
      <Hills className="h-20 sm:h-28" fade="var(--stage)" />
    </>
  );
}
