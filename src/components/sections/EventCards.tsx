import Image from "next/image";
import Link from "next/link";
import type { CulturalEvent } from "@/content/events";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * The commissioned events as tall picture cards: "focus cards" and "card-7" from the component library together. Point at one and
 * the others soften out of focus while it lifts, its picture slowly zooms, its summary slides up and the way in appears. On touch
 * screens, where there is no hover, the summary and link are simply shown. Each card is one link to the event's page.
 */
export function EventCards({ events }: { events: CulturalEvent[] }) {
  return (
    <ul className="focus-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((e) => (
        <li key={e.slug} className="focus-card">
          <Link href={`/events/${e.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-stage text-paper shadow-e2 transition duration-500 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-e3">
            <Image src={e.image.src} alt="" fill sizes="(min-width:1024px) 24rem, (min-width:640px) 46vw, 92vw" quality={75} className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-110" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            {e.logo && (
              <span className="absolute left-5 top-5 grid size-14 place-items-center overflow-hidden rounded-full bg-paper p-1.5 shadow-e1">
                <Image src={e.logo.src} alt="" width={e.logo.w} height={e.logo.h} sizes="3.5rem" className="h-auto max-h-full w-auto max-w-full object-contain" />
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 flex flex-col p-6">
              <span className="event-card-body transition-transform duration-500 ease-[var(--ease-out)]">
                <span className="serif block text-[0.95rem] italic text-paper/80">{e.when}</span>
                <span className="display mt-1 block text-[clamp(1.5rem,1.3rem+0.7vw,2rem)] leading-tight">{e.title}</span>
                <span className="event-card-more mt-3 block text-[0.95rem] leading-relaxed text-paper/80">
                  <span className="line-clamp-3">{e.blurb}</span>
                </span>
              </span>
              <span className="event-card-cta mt-4 inline-flex items-center gap-2 self-start rounded-full bg-paper px-4 py-2 text-sm font-semibold text-maroon-band">
                Read about the event
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
