import Image from "next/image";
import Link from "next/link";
import { brand, event } from "@/content/festival-2026";
import { Calendar, Pin, ArrowRight } from "@/components/ui/Icons";
import { Hills, LotusRule } from "@/components/ui/Ornaments";
import { Reveal } from "@/components/ui/Reveal";
import { epassUrl } from "@/lib/site-url";

/**
 * The next edition of the festival, shown the way the festival's own page opens (cream paper, maroon date line,
 * the artists standing on the poster's hills) so the two sites read as one family.
 */
export function FestivalFeature() {
  return (
    <section aria-labelledby="festival-2026-title" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--sage)_80%,transparent)_70%,transparent)]">
      <div className="wrap relative grid items-center gap-10 pb-28 pt-20 sm:pt-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6 lg:pb-32">
        <div>
          <Reveal>
            <p className="serif text-[1.1rem] italic text-ink-muted">Coming up</p>
            <h2 id="festival-2026-title" className="display mt-3 text-[clamp(2.4rem,1.2rem+4vw,4.6rem)] leading-[0.98] text-ink">
              <span className="text-[1.5em] leading-none">9</span>
              <sup className="mr-[0.15em] align-[0.95em] text-[0.4em]">th</sup>
              International Ancient Arts Festival <span className="whitespace-nowrap text-maroon">2026</span>
            </h2>
            <LotusRule className="mt-6 w-[min(80%,22rem)]" />
            <p className="serif mt-5 max-w-[30rem] text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] font-medium italic leading-snug text-olive">{event.subtitle}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="serif mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[1.2rem] font-medium text-maroon-deep">
              <span className="inline-flex items-center gap-2">
                <Calendar size={20} />
                25 to 26 November 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <Pin size={20} />
                {event.venue.name}, {event.venue.area}
              </span>
            </p>
            <p className="serif mt-2 text-ink-muted">
              {event.timeLabel} · Curated and directed by Dr. {event.director}
            </p>
            <p className="reading mt-5">{event.programmeIntro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/festival/2026" className="btn btn-primary !min-h-[3.25rem] !px-7 text-base">
                The programme and artists
              </Link>
              {epassUrl && (
                <a href={epassUrl} className="link-arrow">
                  Get your e-pass
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="relative lg:-mr-[6%]">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[118%] -translate-x-1/2 -translate-y-[46%]">
            <div className="emblem-breathe">
              <div className="emblem-turn">
                <Image src={brand.emblem.src} alt="" width={brand.emblem.w} height={brand.emblem.h} sizes="40rem" quality={80} className="h-auto w-full select-none" />
              </div>
            </div>
          </div>
          <Image
            src={brand.collage.src}
            alt={brand.collage.alt}
            width={brand.collage.w}
            height={brand.collage.h}
            sizes="(min-width:1024px) 46rem, 92vw"
            quality={85}
            className="h-auto w-full select-none [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
          />
        </Reveal>
      </div>
      <Hills className="absolute inset-x-0 bottom-0 z-10 h-24 sm:h-32" />
    </section>
  );
}
