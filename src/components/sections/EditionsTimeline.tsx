import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/content/photo";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export interface TimelineEdition {
  year: number;
  label: string;
  theme: string;
  meta?: string;
  blurb?: string;
  href: string;
  poster?: Photo;
  highlight?: boolean;
}

/**
 * Every edition of the festival as a ruled timeline, after "timeline-01" in the component library: a framed column with the year
 * held at the left (it stays in view while its entry scrolls past), a gold line with a node for each edition, and the entry with
 * its poster on the right. The whole entry is one link to the edition's page.
 */
export function EditionsTimeline({ items, title, intro }: { items: TimelineEdition[]; title: string; intro: string }) {
  return (
    <div className="border-x border-line">
      <div className="border-b border-line px-6 py-10 md:px-10 md:py-14 lg:px-14">
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-[inset_0_0_0_1px_var(--line-strong)]">Timeline</span>
        <h2 id="editions-heading" className="section-title mt-4">
          {title}
        </h2>
        <p className="reading mt-3 max-w-[40rem]">{intro}</p>
      </div>
      <ol>
        {items.map((e) => (
          <li key={e.year} className="border-b border-line">
            <Link href={e.href} className="group grid gap-4 px-6 py-8 transition-colors hover:bg-[color-mix(in_srgb,var(--surface)_55%,transparent)] md:grid-cols-[9rem_1fr] md:gap-10 md:px-10 lg:grid-cols-[11rem_1fr] lg:px-14">
              <div className="md:sticky md:top-[calc(var(--header-h)+1.5rem)] md:self-start">
                <span className={`display block text-[3rem] leading-none md:text-[3.75rem] ${e.highlight ? "text-maroon" : "text-ink"}`}>{e.year}</span>
                <span className="serif mt-1 block text-sm italic text-ink-muted">{e.label}</span>
              </div>
              <Reveal className="relative grid gap-6 md:border-l md:border-[color-mix(in_srgb,var(--gold)_55%,transparent)] md:pl-10 lg:grid-cols-[1fr_12rem]">
                <span aria-hidden="true" className={`absolute -left-[0.4rem] top-3 hidden size-3 rounded-full ring-4 ring-cream md:block ${e.highlight ? "bg-maroon" : "bg-gold"}`} />
                <span>
                  <span className="block text-[1.2rem] font-semibold leading-snug">{e.theme}</span>
                  {e.meta && <span className="meta mt-1 block">{e.meta}</span>}
                  {e.blurb && <span className="reading mt-2 block !text-[1rem]">{e.blurb}</span>}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-maroon-deep">
                    Read about {e.year}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
                {e.poster && (
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-sage shadow-e1 lg:aspect-[3/4]">
                    <Image src={e.poster.src} alt="" fill sizes="12rem" quality={70} className="object-cover grayscale-[0.35] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0" />
                  </span>
                )}
              </Reveal>
            </Link>
          </li>
        ))}
      </ol>
      <div className="h-16 md:h-24" />
    </div>
  );
}
