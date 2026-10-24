"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Photo } from "@/content/photo";
import { ArrowRight, Calendar, Pin } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export interface TimelineEdition {
  year: number;
  label: string;
  theme: string;
  /** Dates and venue, kept apart so each can carry its own icon. */
  dates?: string;
  venue?: string;
  blurb?: string;
  href: string;
  poster?: Photo;
  highlight?: boolean;
}

/**
 * Every edition of the festival as a ruled timeline, after "timeline-01" in the component library: a framed column with the year
 * held at the left (it stays in view while its entry scrolls past), one unbroken gold line down the whole list with a node for
 * each edition (the coming one in maroon, ringed), and the entry beside it: theme, dates and venue as small chips, a line about
 * the edition and its poster shown whole, at its own shape. The whole entry is one link to the edition's page.
 * The line is linked to the scroll: a gold line grows down it from the first edition, the glowing tip travelling just below the
 * middle of the screen, and each node lights up and settles as the tip reaches it, so the line reads as one journey from edition
 * to edition. (The values are written straight to the elements on scroll, with no re-rendering; with reduced motion the nodes
 * change state without the pop.)
 */
export function EditionsTimeline({ items, title, intro }: { items: TimelineEdition[]; title: string; intro: string }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const rails = [...root.querySelectorAll<HTMLElement>("[data-tl-rail]")];
    let frame = 0;
    const paint = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.58;
      for (const rail of rails) {
        const box = (rail.querySelector("[data-tl-line]") ?? rail).getBoundingClientRect();
        const node = rail.querySelector<HTMLElement>("[data-tl-node]");
        const p = box.height > 0 ? Math.min(1, Math.max(0, (anchor - box.top) / box.height)) : 0;
        rail.style.setProperty("--p", p.toFixed(4));
        rail.toggleAttribute("data-active", p > 0 && p < 1);
        if (node) {
          const n = node.getBoundingClientRect();
          node.toggleAttribute("data-on", anchor >= n.top + n.height / 2);
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items.length]);

  return (
    <div className="border-x border-line">
      <div className="border-b border-line px-6 py-10 md:px-10 md:py-14 lg:px-14">
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-[inset_0_0_0_1px_var(--line-strong)]">Timeline</span>
        <h2 id="editions-heading" className="section-title mt-4">
          {title}
        </h2>
        <p className="reading mt-3 max-w-[40rem]">{intro}</p>
      </div>
      <ol ref={list}>
        {items.map((e, i) => (
          <li key={e.year} className="border-b border-line">
            <Link
              href={e.href}
              className="group grid gap-5 px-6 py-8 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--surface)_50%,transparent)] md:grid-cols-[8.5rem_2.5rem_1fr] md:gap-x-5 md:px-10 lg:grid-cols-[10rem_2.5rem_1fr] lg:px-14"
            >
              <div className="md:sticky md:top-[calc(var(--header-h)+1.5rem)] md:self-start">
                <span className={`display block text-[3rem] leading-none transition-colors md:text-[3.75rem] ${e.highlight ? "text-maroon" : "text-ink"}`}>{e.year}</span>
                <span className="serif mt-1 block text-sm italic text-ink-muted">{e.label}</span>
              </div>

              {/* the rail: one line for the whole list, drawn across the entry's padding so it joins the entries above and below */}
              <div aria-hidden="true" data-tl-rail className="relative -my-8 hidden md:block">
                {/* the faint line, always there */}
                <span data-tl-line className={`absolute inset-x-0 mx-auto w-px bg-[color-mix(in_srgb,var(--gold)_30%,transparent)] ${i === 0 ? "top-9" : "top-0"} ${i === items.length - 1 ? "h-[2.85rem]" : "bottom-0"}`} />
                {/* the gold line that grows with the scroll */}
                <span
                  className={`absolute inset-x-0 mx-auto w-px origin-top bg-gold ${i === 0 ? "top-9" : "top-0"} ${i === items.length - 1 ? "h-[2.85rem]" : "bottom-0"}`}
                  style={{ transform: "scaleY(var(--p, 0))" }}
                />
                {/* the glowing tip, only while the line is passing through this entry */}
                <span
                  className="tl-tip absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold opacity-0 shadow-[0_0_0_4px_color-mix(in_srgb,var(--gold)_25%,transparent),0_0_14px_3px_color-mix(in_srgb,var(--gold)_60%,transparent)] transition-opacity duration-200"
                  style={{ top: i === items.length - 1 ? "calc(var(--p, 0) * 2.85rem)" : i === 0 ? "calc(2.25rem + var(--p, 0) * (100% - 2.25rem))" : "calc(var(--p, 0) * 100%)" }}
                />
                <span
                  data-tl-node
                  className={`tl-node absolute left-1/2 top-[2.35rem] size-4 -translate-x-1/2 rounded-full bg-surface ring-4 ring-cream transition duration-500 ease-[var(--ease-out)] shadow-[inset_0_0_0_2px_color-mix(in_srgb,var(--gold)_55%,transparent)] data-[on]:scale-125 ${e.highlight ? "data-[on]:bg-maroon data-[on]:shadow-[0_0_0_6px_color-mix(in_srgb,var(--maroon)_25%,transparent)]" : "data-[on]:bg-gold data-[on]:shadow-[0_0_0_6px_color-mix(in_srgb,var(--gold)_28%,transparent)]"} motion-reduce:transition-none`}
                />
              </div>

              <Reveal className="grid gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
                <span className="block">
                  {e.highlight && <span className="mb-3 inline-flex rounded-full bg-maroon-band px-3 py-1 text-xs font-semibold text-paper">Coming up</span>}
                  <span className="block text-[1.3rem] font-semibold leading-snug">{e.theme}</span>
                  {(e.dates || e.venue) && (
                    <span className="mt-3 flex flex-wrap gap-2">
                      {e.dates && (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.82rem] font-semibold shadow-[inset_0_0_0_1px_var(--line-strong)]">
                          <Calendar size={14} />
                          {e.dates}
                        </span>
                      )}
                      {e.venue && (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.82rem] shadow-[inset_0_0_0_1px_var(--line-strong)]">
                          <Pin size={14} />
                          {e.venue}
                        </span>
                      )}
                    </span>
                  )}
                  {e.blurb && <span className="reading mt-4 block !text-[1rem]">{e.blurb}</span>}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-maroon-deep">
                    Read about {e.year}
                    <span aria-hidden="true" className="grid size-8 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line-strong)] transition-colors duration-300 group-hover:bg-maroon-band group-hover:text-paper group-hover:shadow-none">
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </span>
                {e.poster && (
                  <span
                    className="relative block self-start overflow-hidden rounded-lg bg-sage shadow-e1 ring-1 ring-black/5"
                    style={{ aspectRatio: `${e.poster.w} / ${e.poster.h}`, width: e.poster.w > e.poster.h ? "16rem" : "11rem", maxWidth: "100%" }}
                  >
                    <Image src={e.poster.src} alt={e.poster.alt} fill sizes="16rem" quality={75} className="object-cover transition duration-500 group-hover:scale-[1.03]" />
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
