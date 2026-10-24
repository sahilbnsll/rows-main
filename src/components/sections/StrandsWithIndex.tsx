"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";
import { StackedStrands, type Strand } from "./StackedStrands";

/**
 * "What the Society does": the stack of strand cards on the right, and on the left a column that stays in view for the whole
 * length of the stack, so that side is never empty: the heading, the Society's seal and registration, and a numbered index of
 * the four strands with a gold line showing how far through them you are. The index follows the card on top (found from invisible
 * markers at each card's natural place, because the cards themselves are pinned) and each entry scrolls to its card. Below
 * desktop width the left column simply sits above the cards.
 */
export function StrandsWithIndex({ strands, registration, recognition }: { strands: Strand[]; registration: string; recognition: string }) {
  const list = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  const read = useCallback(() => {
    frame.current = 0;
    const root = list.current;
    if (!root) return;
    const marks = [...root.querySelectorAll<HTMLElement>("[data-strand-mark]")];
    const cards = [...root.querySelectorAll<HTMLElement>("li[data-strand-card]")];
    if (!marks.length || marks.length !== cards.length) return;
    let at = 0;
    marks.forEach((m, i) => {
      const stuck = parseFloat(getComputedStyle(cards[i]).top) || 0;
      if (m.getBoundingClientRect().top <= stuck + 6) at = i;
    });
    setActive(at);
    // 0 at the first card's arrival, 1 when the last card has settled
    const first = marks[0].getBoundingClientRect().top - (parseFloat(getComputedStyle(cards[0]).top) || 0);
    const last = marks[marks.length - 1].getBoundingClientRect().top - (parseFloat(getComputedStyle(cards[cards.length - 1]).top) || 0);
    const span = first - last;
    setProgress(span > 0 ? Math.min(1, Math.max(0, first / span)) : 1);
  }, []);

  // every card the same height, the tallest one's, so each lands exactly over the last (the text-light fourth card was short)
  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const equalise = () => {
      root.style.setProperty("--strand-h", "0px");
      const tallest = Math.max(0, ...[...root.querySelectorAll<HTMLElement>("li[data-strand-card] article")].map((a) => a.offsetHeight));
      root.style.setProperty("--strand-h", `${tallest}px`);
    };
    equalise();
    const ro = new ResizeObserver(equalise);
    ro.observe(root);
    document.fonts?.ready.then(equalise);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, [read]);

  const goTo = (i: number) => {
    const root = list.current;
    if (!root) return;
    const mark = root.querySelectorAll<HTMLElement>("[data-strand-mark]")[i];
    const card = root.querySelectorAll<HTMLElement>("li[data-strand-card]")[i];
    if (!mark || !card) return;
    const stuck = parseFloat(getComputedStyle(card).top) || 0;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: mark.getBoundingClientRect().top + window.scrollY - stuck, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
      <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
        <Reveal>
          <h2 id="work-title" className="section-title max-w-[12ch]">
            What the Society does
          </h2>
          <div className="mt-8 flex items-center gap-5">
            <Seal className="w-24 shrink-0 text-olive" />
            <p className="meta max-w-[14rem]">
              {registration}
              <br />
              {recognition}
            </p>
          </div>
        </Reveal>

        <nav aria-label="The four strands of the Society's work" className="mt-10 hidden lg:block">
          <div className="flex gap-5">
            <div aria-hidden="true" className="relative w-px shrink-0 bg-line-strong">
              <div className="absolute inset-x-0 top-0 origin-top bg-gold" style={{ height: "100%", transform: `scaleY(${progress})`, transition: "transform 200ms linear" }} />
            </div>
            <ol className="space-y-1">
              {strands.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.title}>
                    <button type="button" onClick={() => goTo(i)} aria-current={on ? "step" : undefined} className={`group flex min-h-11 w-full items-baseline gap-4 rounded-lg py-1.5 text-left transition-colors duration-[var(--d2)] ${on ? "text-ink" : "text-ink-muted hover:text-ink"}`}>
                      <span className={`display w-9 shrink-0 text-2xl tabular-nums transition-colors ${on ? "text-maroon" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="relative text-[1.05rem] font-semibold leading-snug">
                        {s.title}
                        <span aria-hidden="true" className={`absolute -bottom-0.5 left-0 h-px bg-maroon transition-[width] duration-[var(--d3)] ease-[var(--ease-out)] ${on ? "w-full" : "w-0"}`} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
      </div>

      <div ref={list}>
        <StackedStrands strands={strands} marks />
      </div>
    </div>
  );
}
