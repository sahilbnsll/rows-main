import Image from "next/image";
import Link from "next/link";
import { editions, schedule2019, type Edition } from "@/content/festival";
import { videoById } from "@/content/videos";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Calendar, Pin, ArrowRight } from "@/components/ui/Icons";
import { PhotoGrid } from "@/components/ui/PhotoGrid";
import { Reveal } from "@/components/ui/Reveal";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Schedule } from "./Schedule";

/** One past edition of the festival: theme, dates, venue, the story as the old page told it, poster, schedule and video. */
export function EditionPage({ edition, children }: { edition: Edition; children?: React.ReactNode }) {
  const video = edition.youtubeId ? videoById(edition.youtubeId) : undefined;
  const sorted = [...editions].sort((a, b) => a.year - b.year);
  const i = sorted.findIndex((e) => e.year === edition.year);
  const older = sorted[i - 1];
  const newer = sorted[i + 1];
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Festival", path: "/festival" }, { name: String(edition.year), path: `/festival/${edition.slug}` }]} />
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(46rem_26rem_at_0%_0%,rgba(176,194,140,0.28),transparent_72%),radial-gradient(40rem_24rem_at_100%_100%,rgba(232,198,191,0.22),transparent_72%)]" />
        <div className="wrap pb-14 pt-6 sm:pb-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Festival", href: "/festival" }, { label: String(edition.year) }]} />
          <div className={`mt-10 grid items-center gap-10 lg:mt-14 ${edition.poster ? "lg:grid-cols-[1.3fr_0.7fr] lg:gap-16" : ""}`}>
            <div className="hero-rise">
              <p className="serif italic text-ink-muted">{edition.ordinal ? `The ${edition.ordinal} International Ancient Arts Festival` : "International Ancient Arts Festival"}</p>
              <h1 className="display mt-2 text-[clamp(4rem,2rem+9vw,9rem)] leading-[0.9] text-ink">{edition.year}</h1>
              <p className="lead mt-6 max-w-[32rem] !text-maroon-deep">{edition.theme}</p>
              <div className="meta mt-6 flex flex-wrap gap-x-6 gap-y-2 !text-ink">
                {edition.dates && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={18} />
                    {edition.dates}
                  </span>
                )}
                {edition.venue && (
                  <span className="inline-flex items-center gap-2">
                    <Pin size={18} />
                    {edition.venue}
                  </span>
                )}
              </div>
            </div>
            {edition.poster && (
              <div className="hero-rise mx-auto w-full max-w-[22rem] lg:max-w-none" style={{ animationDelay: "120ms" }}>
                <div className="overflow-hidden rounded-md bg-paper p-2 shadow-e3">
                  <Image src={edition.poster.src} alt={edition.poster.alt} width={edition.poster.w} height={edition.poster.h} sizes="(min-width:1024px) 24rem, 22rem" quality={85} priority className="h-auto w-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-label={`About IAAF ${edition.year}`} className="section-tight">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <div className="reading prose-flow">
              {edition.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </Reveal>
          {video && (
            <Reveal delay={90}>
              <VideoEmbed video={video} />
              <p className="meta mt-3">{video.title}</p>
            </Reveal>
          )}
        </div>
      </section>

      {edition.year === 2019 && (
        <section aria-labelledby="schedule-title" className="section">
          <div className="wrap">
            <h2 id="schedule-title" className="section-title">
              Programme
            </h2>
            <p className="meta mt-3">
              {schedule2019.entry} · Shriram Centre for Performing Arts ·{" "}
              <a href={schedule2019.venueUrl} className="prose-link" target="_blank" rel="noopener noreferrer">
                shriramcentre.org<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
            <div className="mt-10">
              <Schedule days={schedule2019.days} />
            </div>
            <p className="reading mt-8">{schedule2019.cast}</p>
            <p className="meta mt-3">{schedule2019.credits.map((c) => `${c.role}: ${c.name}`).join(" · ")}</p>
          </div>
        </section>
      )}

      {edition.extras && edition.extras.length > 0 && (
        <section aria-labelledby="cards-title" className="section-tight">
          <div className="wrap">
            <h2 id="cards-title" className="sub-title">
              Invitation cards
            </h2>
            <div className="mt-8">
              <PhotoGrid photos={edition.extras} title={`IAAF ${edition.year} invitation cards`} variant="masonry" columns="columns-2 lg:columns-4" />
            </div>
          </div>
        </section>
      )}

      {children}

      <section className="section-tight">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            {older ? (
              <Link href={`/festival/${older.slug}`} className="link-arrow">
                <ArrowRight size={16} className="rotate-180" />
                {older.year}
              </Link>
            ) : (
              <span />
            )}
            <Link href="/festival" className="link-arrow">
              All editions
            </Link>
            {newer ? (
              <Link href={`/festival/${newer.slug}`} className="link-arrow">
                {newer.year}
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link href="/festival/2026" className="link-arrow">
                2026
                <ArrowRight size={16} />
              </Link>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
