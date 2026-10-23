"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/Icons";

export interface RailEdition {
  year: number;
  ordinal?: string;
  theme: string;
  where?: string;
  href: string;
}

/**
 * The festival's editions, oldest to newest, on a horizontal rail you can scroll, swipe or step with the buttons.
 * Native scroll snapping does the work; the buttons are an addition for mouse and keyboard users.
 */
export function EditionsRail({ items }: { items: RailEdition[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = (card?.getBoundingClientRect().width ?? 320) + 16;
    el.scrollBy({ left: dir * w * 1.5, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <div>
      <div className="mb-5 flex justify-end gap-2">
        <button type="button" onClick={() => step(-1)} aria-label="Earlier editions" className="grid size-11 place-items-center rounded-full bg-surface shadow-e1 transition-shadow hover:shadow-e2">
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Later editions" className="grid size-11 place-items-center rounded-full bg-surface shadow-e1 transition-shadow hover:shadow-e2">
          <ChevronRight size={18} />
        </button>
      </div>
      <ul
        ref={rail}
        tabIndex={0}
        aria-label="Festival editions, oldest first"
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-6 [scrollbar-width:thin]"
      >
        {items.map((e) => (
          <li key={e.year} className="w-[17rem] shrink-0 snap-start sm:w-[19rem]">
            <Link href={e.href} className="card group flex h-full flex-col p-6 transition-[transform,box-shadow] duration-[var(--d3)] ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-e2">
              <span className="display text-[4.25rem] leading-none text-ink">{e.year}</span>
              <span className="serif mt-1 text-sm italic text-ink-muted">{e.ordinal ? `${e.ordinal} edition` : " "}</span>
              <span className="perforation mt-4 block" aria-hidden="true" />
              <span className="mt-4 text-[1.02rem] font-semibold leading-snug text-ink">{e.theme}</span>
              {e.where && <span className="mt-2 text-sm text-ink-muted">{e.where}</span>}
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-maroon-deep">
                Read about {e.year}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
