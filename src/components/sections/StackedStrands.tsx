import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/content/photo";
import { ArrowRight } from "@/components/ui/Icons";

export interface Strand {
  title: string;
  text: string;
  href: string;
  cta: string;
  photo: Photo;
}

/**
 * The Society's strands of work as a deck of cards, after "scroll cards" in the component library: each card holds still near the
 * top of the screen while the next one slides up over it, so the deck builds as you read. Pure CSS (position: sticky), nothing
 * runs per frame; each card sits a little lower than the last, so the edges of the ones beneath stay in view. Every card is the
 * same height (the tallest one's, set through --strand-h by StrandsWithIndex) so each lands exactly over the one before it, and
 * the stack is held in place for a while after the last card lands.
 */
export function StackedStrands({ strands, marks = false }: { strands: Strand[]; marks?: boolean }) {
  return (
    <ol className="relative">
      {strands.flatMap((s, i) => [
        // an invisible marker at the card's natural place, which stays put while the card is pinned (used by the index)
        ...(marks ? [<li key={`m${s.title}`} aria-hidden="true" data-strand-mark className="pointer-events-none h-0 list-none" />] : []),
        <li key={s.title} data-strand-card className="sticky pb-6" style={{ top: `calc(var(--header-h) + 1.5rem + ${i * 1.1}rem)` }}>
          <article className="relative isolate grid min-h-[max(24rem,var(--strand-h,0px))] overflow-hidden rounded-[1.5rem] text-paper shadow-e3 ring-1 ring-gold/30 md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[13rem] md:order-2">
              <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width:768px) 36rem, 92vw" quality={80} className="object-cover" style={{ objectPosition: s.photo.position ?? "50% 35%" }} />
            </div>
            <div className="flex flex-col justify-center bg-stage p-7 sm:p-10">
              <span aria-hidden="true" className="display text-[3rem] leading-none text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-3 text-[clamp(1.7rem,1.3rem+1.4vw,2.6rem)] leading-tight">{s.title}</h3>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-paper/80">{s.text}</p>
              <Link href={s.href} className="link-arrow mt-5 self-start text-paper">
                {s.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </li>,
      ])}
      {/* a hold at the end: the pinned cards stay put for this much more scrolling, so the last card finishes sliding over the one
          before it and the finished stack is seen before the page moves on (the cards let go only when this has scrolled past) */}
      <li aria-hidden="true" className="pointer-events-none h-[45svh] min-h-[14rem] list-none" />
    </ol>
  );
}
