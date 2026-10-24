import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/content/partners";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";

/**
 * Partner logos as a grid of white tiles. The logos are JPEGs on pure white, so each sits on a white card with a hairline
 * edge, the same size and padding for every one; pointing at a tile lifts it, rings it in gold and names the organisation
 * underneath. An optional last tile ("more") links on to the full list and completes the final row.
 */
export function LogoWall({ partners, className = "", more }: { partners: Partner[]; className?: string; more?: { href: string; label: string; note: string } }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6 ${className}`}>
      {partners.map((p, i) => (
        <li key={p.name}>
          <Reveal delay={(i % 6) * 40} className="h-full">
            <figure className="group relative grid h-full min-h-[7.5rem] place-items-center overflow-hidden rounded-2xl bg-white px-4 py-5 shadow-[0_1px_2px_rgb(38_48_26/0.06),inset_0_0_0_1px_var(--line)] transition duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_14px_28px_-14px_rgb(38_48_26/0.4),inset_0_0_0_1px_rgb(180_141_60/0.7)]">
              <Image src={p.logo.src} alt={p.logo.alt} width={p.logo.w} height={p.logo.h} sizes="(min-width:1280px) 12rem, (min-width:640px) 22vw, 44vw" className="h-auto w-full max-w-[12.5rem] object-contain transition-transform duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:-translate-y-2 [@media(hover:hover)]:group-hover:scale-[0.94]" />
              <figcaption aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full px-3 pb-2.5 text-center text-[0.72rem] font-semibold leading-tight text-[#26301a] opacity-0 transition duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
                {p.name}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
      {more && (
        <li>
          <Reveal delay={(partners.length % 6) * 40} className="h-full">
            <Link href={more.href} className="group relative flex h-full min-h-[7.5rem] flex-col items-center justify-center overflow-hidden rounded-2xl bg-maroon-band px-4 py-5 text-center text-paper shadow-[0_1px_2px_rgb(38_48_26/0.12)] transition duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_14px_28px_-14px_rgb(104_19_25/0.7)]">
              <span className="display text-[1.5rem] leading-none">{more.label}</span>
              <span className="serif mt-1.5 text-[0.9rem] italic text-paper/80">{more.note}</span>
              <span className="mt-2.5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold">
                See all
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </li>
      )}
    </ul>
  );
}
