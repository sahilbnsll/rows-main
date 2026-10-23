import { editionByYear } from "@/content/festival";
import { schedule2024 } from "@/content/festival-2024";
import { conference } from "@/content/festival-2024";
import { exhibition, exhibitionHighlights } from "@/content/exhibition";
import { EditionPage } from "@/components/sections/EditionPage";
import { Schedule } from "@/components/sections/Schedule";
import { StrandCard } from "@/components/sections/StrandCard";
import { productionBySlug } from "@/content/productions";
import { clip, pageMetadata } from "@/lib/seo";

const edition = editionByYear("2024")!;

export const metadata = pageMetadata({
  title: "IAAF 2024: Festival, Symposium and Exhibition",
  description: clip(edition.paragraphs[0]),
  path: "/festival/2024",
  image: edition.poster?.src,
  imageAlt: edition.poster?.alt,
});

export default function Festival2024Page() {
  return (
    <EditionPage edition={edition}>
      <section aria-labelledby="schedule-title" className="section">
        <div className="wrap">
          <h2 id="schedule-title" className="section-title">
            The evening performances
          </h2>
          <p className="meta mt-3">
            {schedule2024.venue} ·{" "}
            <a href={schedule2024.venueUrl} className="prose-link" target="_blank" rel="noopener noreferrer">
              ignca.gov.in<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <div className="mt-10">
            <Schedule days={schedule2024.days} />
          </div>
        </div>
      </section>

      <section aria-labelledby="three-title" className="stage on-stage section">
        <div className="wrap">
          <h2 id="three-title" className="section-title max-w-[18ch]">
            Three strands, one festival
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StrandCard
              title="The evening performances"
              photos={productionBySlug("antar-yatra")!.photos.slice(0, 3)}
              facts={["8 to 10 November 2024", "Three evenings"]}
              text="Antar Yatra by Reela Hota and group, a vocal recital by Srinivas Joshi, and Kuchipudi by Yamini Reddy and group."
              href="#schedule-title"
            />
            <StrandCard
              title={conference.title}
              photos={conference.inaugural.speakers.slice(0, 3).map((x) => x.portrait)}
              facts={[conference.dates, "Umang Conference Room"]}
              text={`${conference.theme}. Papers, a keynote and a round table by scholars of philosophy, religion, politics, dance and the arts.`}
              href="/festival/2024/conference"
            />
            <StrandCard
              title={exhibition.title}
              photos={exhibitionHighlights.slice(0, 3)}
              facts={[exhibition.dates, "Thirteen artists"]}
              text={`${exhibition.subtitle}, at the ${exhibition.venue}, curated by ${exhibition.curator}.`}
              href="/festival/2024/exhibition"
            />
          </div>
        </div>
      </section>
    </EditionPage>
  );
}
