import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/content/photo";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * A strand of the festival as a card, after "card-25" in the component library: a title with an arrow, three photographs stacked
 * like prints that fan out when the card is pointed at, a line of facts and a short description. The whole card is one link.
 */
export function StrandCard({ title, photos, facts, text, href }: { title: string; photos: Photo[]; facts: string[]; text: string; href: string }) {
  return (
    <Link href={href} aria-label={`${title}: read more`} className="group block rounded-2xl bg-stage-raised p-6 text-paper shadow-e2 ring-1 ring-paper/10 transition duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-e3 hover:ring-gold/40 sm:p-7">
      <span className="flex items-start justify-between gap-4">
        <span className="display text-[clamp(1.5rem,1.3rem+0.6vw,1.9rem)] leading-tight">{title}</span>
        <ArrowRight size={22} className="mt-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="relative mt-6 block h-32 sm:h-36">
        {photos.slice(0, 3).map((p, i) => (
          <span
            key={p.src}
            className="absolute h-full w-[40%] overflow-hidden rounded-lg border-2 border-stage-raised shadow-e2 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-[var(--tx)] group-hover:rotate-[var(--r)] motion-reduce:transition-none"
            style={{ transform: `translateX(${i * 32}px)`, zIndex: 3 - i, "--tx": `${i * 82}%`, "--r": `${i * 5 - 5}deg` } as React.CSSProperties}
          >
            <Image src={p.src} alt="" fill sizes="10rem" quality={70} className="object-cover" style={{ objectPosition: p.position ?? "50% 30%" }} />
          </span>
        ))}
      </span>
      <span className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-paper/70">
        {facts.map((f) => (
          <span key={f} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
            {f}
          </span>
        ))}
      </span>
      <span className="mt-3 block text-[0.98rem] leading-relaxed text-paper/80">{text}</span>
    </Link>
  );
}
