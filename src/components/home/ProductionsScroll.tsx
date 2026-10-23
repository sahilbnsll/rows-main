"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, type MotionValue } from "framer-motion";
import { useScrub } from "@/lib/scrub";
import { useRef, useState } from "react";
import type { Production } from "@/content/productions";
import { ArrowRight } from "@/components/ui/Icons";

const SEGMENT_VH = 95; // scroll distance given to each production

/** The window of scroll progress in which production `i` of `n` is showing: fades in, holds, fades out. */
function windowFor(i: number, n: number) {
  const c = (i + 0.5) / n;
  const half = 0.5 / n;
  return { c, a: c - half * 0.95, b: c - half * 0.45, d: c + half * 0.45, e: c + half * 0.95 };
}

function Slide({ p, i, n, progress, active }: { p: Production; i: number; n: number; progress: MotionValue<number>; active: boolean }) {
  const w = windowFor(i, n);
  const first = i === 0;
  const last = i === n - 1;
  const opacity = useScrub(progress, first ? [0, w.d, w.e] : last ? [w.a, w.b, 1] : [w.a, w.b, w.d, w.e], first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]);
  const scale = useScrub(progress, [w.a, w.e], [1.07, 1.0]);
  const textY = useScrub(progress, first ? [0, w.d, w.e] : last ? [w.a, w.b, 1] : [w.a, w.b, w.d, w.e], first ? [0, 0, -36] : last ? [36, 0, 0] : [36, 0, 0, -36]);
  return (
    <>
      <motion.div style={{ opacity, scale }} className="absolute inset-x-0 top-0 h-[64svh] will-change-transform lg:inset-0 lg:h-auto" aria-hidden="true">
        <Image src={p.cover.src} alt="" fill sizes="100vw" quality={80} priority={first} className="object-cover" style={{ objectPosition: p.cover.position ?? "50% 40%" }} />
      </motion.div>
      <motion.div
        style={{ opacity, y: textY }}
        className="absolute inset-x-0 bottom-0 z-10 px-[var(--gutter)] pb-14 sm:pb-16 lg:pb-20"
        aria-hidden={!active || undefined}
        {...(!active ? { inert: true } : {})}
      >
        <div className="wrap !px-0 lg:max-w-[64rem]">
          <p className="serif text-lg italic text-paper/80">
            <span className="display not-italic text-gold">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-paper/50"> / {String(n).padStart(2, "0")}</span>
            <span className="mx-3 text-paper/40">·</span>
            {p.year}
          </p>
          <h3 className="display mt-2 text-[clamp(2.4rem,1.4rem+4.8vw,5.6rem)] leading-[0.98] [text-shadow:0_2px_30px_rgb(0_0_0/0.6)]">{p.title}</h3>
          <p className="mt-3 max-w-[34rem] text-[0.98rem] leading-snug text-paper/80 sm:text-[1.05rem]">{p.form}</p>
          <p className="serif mt-1 text-[0.98rem] italic text-paper/65">{p.premiere}</p>
          <Link href={`/productions/${p.slug}`} className="btn btn-primary mt-6 !min-h-12">
            About {p.title}
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </>
  );
}

/**
 * Five productions on one pinned screen. The page stops moving and the scroll wheel advances through the productions:
 * each photograph fades and drifts in while its title rises into place. The numbered buttons jump to a production (and are
 * the keyboard route through the section). Under reduced motion the section is replaced by an ordinary list.
 */
export function ProductionsScroll({ items }: { items: Production[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const n = items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * scrollable, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div ref={ref} style={{ height: `${n * SEGMENT_VH + 100}svh` }} className="relative">
      <div className="sticky top-0 h-svh overflow-hidden">
        {items.map((p, i) => (
          <Slide key={p.slug} p={p} i={i} n={n} progress={scrollYProgress} active={active === i} />
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(14_18_9/0.7)_0%,transparent_22%,transparent_38%,rgb(22_28_15)_66%)] lg:bg-[linear-gradient(180deg,rgb(14_18_9/0.7)_0%,transparent_28%,transparent_45%,rgb(14_18_9/0.85)_100%)]" />

        <div className="absolute inset-x-0 top-0 z-20 pt-[calc(var(--header-h)+1.25rem)]">
          <div className="wrap flex items-start justify-between gap-6">
            <div>
              <h2 id="productions-title" className="section-title max-w-[16ch] !text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)]">
                Five productions, one thread
              </h2>
              <p className="mt-2 hidden max-w-[28rem] text-[0.95rem] text-paper/75 sm:block">The wisdom of ancient scriptures and practices, told through dance and music.</p>
            </div>
            <Link href="/productions" className="link-arrow shrink-0 text-paper">
              All productions
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <nav aria-label="Productions" className="absolute right-[var(--gutter)] top-1/2 z-20 hidden -translate-y-1/2 lg:block">
          <ol className="space-y-2">
            {items.map((p, i) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active === i ? "true" : undefined}
                  className={`group flex min-h-11 items-center justify-end gap-3 text-right transition-colors ${active === i ? "text-paper" : "text-paper/55 hover:text-paper"}`}
                >
                  <span className={`text-sm font-semibold transition-opacity ${active === i ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>{p.title}</span>
                  <span className={`display grid size-9 place-items-center rounded-full text-lg tabular-nums transition-[background-color,box-shadow] ${active === i ? "bg-paper text-stage" : "shadow-[inset_0_0_0_1px_rgb(251_247_238/0.4)]"}`}>{i + 1}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <nav aria-label="Productions" className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-2 lg:hidden">
          {items.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Show ${p.title}`}
              aria-current={active === i ? "true" : undefined}
              className={`grid size-10 place-items-center rounded-full text-sm font-semibold tabular-nums ${active === i ? "bg-paper text-stage" : "text-paper shadow-[inset_0_0_0_1px_rgb(251_247_238/0.4)]"}`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
