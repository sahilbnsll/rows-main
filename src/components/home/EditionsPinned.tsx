"use client";

import Link from "next/link";
import { motion, useScroll, } from "framer-motion";
import { useScrub } from "@/lib/scrub";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import type { RailEdition } from "./EditionsRail";

/**
 * The festival's editions as a horizontal film strip that is driven by the vertical scroll: the page pins, and scrolling down
 * slides the years sideways from 2010 to 2026, with a progress line underneath. Tabbing to an off-screen year scrolls the page
 * to it, so keyboard users can still reach every edition. (Reduced-motion visitors get an ordinary swipeable rail instead.)
 */
export function EditionsPinned({ items, title, intro }: { items: RailEdition[]; title: React.ReactNode; intro: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0);
  const [vh, setVh] = useState(800);

  const measure = useCallback(() => {
    const t = track.current;
    if (!t) return;
    setDist(Math.max(0, t.scrollWidth - window.innerWidth));
    setVh(window.innerHeight);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useScrub(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useScrub(scrollYProgress, [0, 1], [0, 1]);

  const onFocus = (e: React.FocusEvent<HTMLUListElement>) => {
    const li = (e.target as HTMLElement).closest("li");
    const el = wrap.current;
    if (!li || !el || dist === 0) return;
    const wanted = Math.min(1, Math.max(0, (li as HTMLElement).offsetLeft / dist));
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + wanted * (el.offsetHeight - window.innerHeight), behavior: "auto" });
  };

  return (
    <div ref={wrap} style={{ height: dist ? dist + vh : `${items.length * 19}rem` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-[var(--header-h)]">
        <div className="wrap w-full">
          <h2 id="editions-title" className="section-title max-w-[18ch]">
            {title}
          </h2>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <p className="reading">{intro}</p>
            <Link href="/festival" className="link-arrow">
              About the festival
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <motion.ul ref={track} style={{ x }} onFocusCapture={onFocus} aria-label="Festival editions, oldest first" className="mt-6 flex w-max gap-4 pl-[max(var(--gutter),calc((100vw-var(--wrap))/2+var(--gutter)))] pr-[var(--gutter)] will-change-transform sm:gap-5">
          {items.map((e, i) => {
            const last = i === items.length - 1;
            return (
              <li key={e.year} className="w-[17.5rem] shrink-0 sm:w-[21rem]">
                <Link
                  href={e.href}
                  className={`group flex h-[17.5rem] flex-col rounded-[1.25rem] p-5 transition-[transform,box-shadow] duration-[var(--d3)] ease-[var(--ease-out)] hover:-translate-y-1 sm:h-[19rem] sm:p-6 ${last ? "bg-maroon-band text-paper shadow-e2" : "card hover:shadow-e2"}`}
                >
                  <span className={`display text-[4rem] leading-none sm:text-[5rem] ${last ? "text-paper" : "text-ink"}`}>{e.year}</span>
                  <span className={`serif mt-1 text-sm italic ${last ? "text-paper/75" : "text-ink-muted"}`}>{e.ordinal ? `${e.ordinal} edition${last ? " · coming up" : ""}` : " "}</span>
                  <span className={`perforation mt-4 block ${last ? "opacity-50" : ""}`} aria-hidden="true" />
                  <span className="mt-4 line-clamp-3 text-[1rem] font-semibold leading-snug">{e.theme}</span>
                  {e.where && <span className={`mt-2 text-sm ${last ? "text-paper/75" : "text-ink-muted"}`}>{e.where}</span>}
                  <span className={`mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold ${last ? "text-paper" : "text-maroon-deep"}`}>
                    Read about {e.year}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </motion.ul>

        <div className="wrap mt-6 w-full" aria-hidden="true">
          <div className="h-px bg-line-strong">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-maroon" />
          </div>
          <div className="mt-2 flex justify-between text-xs tabular-nums text-ink-muted">
            <span>{items[0].year}</span>
            <span>{items[items.length - 1].year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
