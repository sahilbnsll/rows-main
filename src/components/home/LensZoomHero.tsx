"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import { LotusRule } from "@/components/ui/Ornaments";

/*
 * The home page opening, after "Lens Zoom Carousel" in the component library: full-width photographs from the festival, and the
 * next one arrives like a fast zoom pull, landing out of a soft magnified blur with two fading ghost copies trailing behind it,
 * while the old picture falls back and darkens. Going back zooms out instead of in. The Society's line and the way in stay put on
 * the left; the name of the artist in the picture rises in at the bottom beside the count, the arrows and a gold line that fills
 * as each picture's time runs out. Arrows, swipe and the arrow keys; it steps on by itself every three and a half seconds (a plain fade for
 * anyone who has asked for reduced motion), holds while its controls have keyboard focus, and has a pause button. Below desktop
 * width the photograph sits whole above the text at its own shape, so nothing is cropped to a narrow strip.
 */

export interface LensSlide {
  src: string;
  alt: string;
  title: string;
  caption: string;
  position?: string;
}

const wrap = (i: number, n: number) => (n ? ((i % n) + n) % n : 0);
const ghostScale = (depth: number, g: number) => depth + (depth - 1) * 0.6 * (g + 1);
const pad = (n: number) => String(n).padStart(2, "0");

const DURATION = 1050;
const DEPTH = 1.35;
const AUTOPLAY = 3400;

export function LensZoomHero({ slides }: { slides: LensSlide[] }) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [incoming, setIncoming] = useState<null | { to: number; dir: number; id: number }>(null);
  const [offscreen, setOffscreen] = useState(false);
  const [held, setHeld] = useState(false);
  const [stopped, setStopped] = useState(false);
  const root = useRef<HTMLElement>(null);
  const down = useRef<null | { x: number; y: number }>(null);

  const go = (dir: number) => {
    if (incoming || n < 2) return;
    setIncoming({ to: wrap(index + dir, n), dir, id: Date.now() });
  };
  const commit = () => {
    if (!incoming) return;
    setIndex(incoming.to);
    setIncoming(null);
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let seen = true;
    const sync = () => setOffscreen(!seen || document.hidden);
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const shown = incoming ? incoming.to : index;
  const s = slides[shown];
  // it moves on by itself every few seconds; with reduced motion the change is a plain fade, and the pause button stops it
  const running = n > 1 && !incoming && !stopped;

  return (
    <section
      ref={root}
      aria-labelledby="home-title"
      aria-roledescription="carousel"
      className="lz-root on-stage relative isolate flex min-h-[max(36rem,calc(100svh-var(--header-h)))] select-none flex-col overflow-hidden bg-stage text-paper"
      style={{ "--lz-d": `${DURATION}ms`, "--lz-auto": `${AUTOPLAY}ms` } as React.CSSProperties}
      data-moving={incoming ? "1" : "0"}
      data-paused={offscreen || held ? "1" : "0"}
      onFocusCapture={(e) => setHeld(!!(e.target as HTMLElement).closest("[data-lz-controls]"))}
      onBlurCapture={() => setHeld(false)}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={(e) => (down.current = { x: e.clientX, y: e.clientY })}
      onPointerUp={(e) => {
        const d = down.current;
        down.current = null;
        if (!d) return;
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - d.y)) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* the picture in place */}
      {/* every photograph stays mounted as its own layer and only the current one shows, so when a zoom lands the picture
          underneath is already decoded and identical to the last frame: no swap, no flash */}
      {slides.map((sl, i) => (
        <div key={sl.src} className="lz-base lz-frame -z-20" data-on={i === index || undefined} aria-hidden={i === index ? undefined : true}>
          <Image src={sl.src} alt={i === index ? sl.alt : ""} fill priority={i === 0} sizes="100vw" quality={85} draggable={false} className="object-cover" style={{ objectPosition: sl.position ?? "50% 50%" }} />
        </div>
      ))}
      {/* the next picture, pulled in through the lens */}
      {incoming && (
        <div
          key={incoming.id}
          aria-hidden="true"
          className="lz-in lz-frame -z-20 overflow-hidden"
          style={{ "--lz-depth": String(incoming.dir >= 0 ? DEPTH : 1 / DEPTH) } as React.CSSProperties}
          onAnimationEnd={(e) => e.target === e.currentTarget && commit()}
        >
          <Image src={slides[incoming.to].src} alt="" fill sizes="100vw" quality={85} draggable={false} className="lz-main object-cover" style={{ objectPosition: slides[incoming.to].position ?? "50% 50%" }} />
          {[1, 0].map((g) => (
            <Image
              key={g}
              src={slides[incoming.to].src}
              alt=""
              fill
              sizes="100vw"
              quality={85}
              draggable={false}
              className="lz-ghost object-cover"
              style={{ objectPosition: slides[incoming.to].position ?? "50% 50%", "--lz-g": String(ghostScale(incoming.dir >= 0 ? DEPTH : 1 / DEPTH, g)), animationDelay: `${g * 40}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,18,9,0.86)_0%,rgba(14,18,9,0.5)_40%,rgba(14,18,9,0.05)_72%),linear-gradient(0deg,rgba(14,18,9,0.9)_0%,transparent_42%),linear-gradient(180deg,rgba(14,18,9,0.45)_0%,transparent_22%)]" />

      <div className="wrap flex flex-1 flex-col justify-end pb-10 pt-[calc(66.6vw-2rem)] lg:pb-8 lg:pt-12">
        <div className="max-w-[44rem]">
          <p className="hero-rise serif text-[1.1rem] italic text-paper/80">Rays of Wisdom Society · New Delhi</p>
          <h1 id="home-title" className="display hero-rise mt-4 text-[clamp(2.6rem,1.3rem+4.6vw,5.4rem)] leading-[0.98] tracking-[-0.015em]" style={{ animationDelay: "80ms" }}>
            The wisdom behind ancient rituals and practices
          </h1>
          <LotusRule className="hero-rise mt-6 w-[min(70%,18rem)]" color="var(--gold)" />
          <p className="serif hero-rise mt-5 max-w-[34rem] text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] leading-relaxed text-paper/85" style={{ animationDelay: "160ms" }}>
            A registered non-profit that stages dance with a spiritual message, convenes the International Ancient Arts Festival and organises yoga for health.
          </p>
          <div className="hero-rise mt-7 flex flex-wrap items-center gap-x-7 gap-y-3" style={{ animationDelay: "240ms" }}>
            <Link href="/festival/2026" className="btn btn-primary !min-h-[3.1rem] !px-6">
              <Calendar size={18} />
              IAAF 2026, 25 to 26 November
            </Link>
            <Link href="/about" className="link-arrow">
              What the Society does
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* who is in the picture, the count, the arrows and the time line */}
      <div className="wrap relative pb-6 sm:pb-8">
        <div className="flex items-end justify-between gap-6">
          <div key={`t${shown}`} aria-hidden="true" className="min-w-0">
            <span className="lz-line display block text-[clamp(1.1rem,1rem+0.6vw,1.5rem)] leading-tight sm:truncate">
              <span>{s.title}</span>
            </span>
            <span className="lz-line serif mt-0.5 block text-[0.95rem] italic text-paper/75 sm:truncate">
              <span style={{ animationDelay: "80ms" }}>{s.caption}</span>
            </span>
          </div>
          <div data-lz-controls className="flex shrink-0 items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.16em] text-paper/75 tabular-nums" aria-hidden="true">
              <b className="text-paper">{pad(shown + 1)}</b> / {pad(n)}
            </span>
            <button
              type="button"
              aria-label={stopped ? "Play the photographs" : "Pause the photographs"}
              aria-pressed={stopped}
              onClick={() => setStopped((v) => !v)}
              onPointerDown={(e) => e.stopPropagation()}
              className="grid size-11 place-items-center rounded-full text-paper shadow-[inset_0_0_0_1px_rgb(251_247_238/0.45)] backdrop-blur-sm transition-colors hover:bg-paper hover:text-stage"
            >
              {stopped ? (
                <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />
                </svg>
              )}
            </button>
            <button type="button" aria-label="Previous photograph" onClick={() => go(-1)} onPointerDown={(e) => e.stopPropagation()} className="grid size-11 place-items-center rounded-full text-paper shadow-[inset_0_0_0_1px_rgb(251_247_238/0.45)] backdrop-blur-sm transition-colors hover:bg-paper hover:text-stage">
              <ChevronLeft size={16} />
            </button>
            <button type="button" aria-label="Next photograph" onClick={() => go(1)} onPointerDown={(e) => e.stopPropagation()} className="grid size-11 place-items-center rounded-full text-paper shadow-[inset_0_0_0_1px_rgb(251_247_238/0.45)] backdrop-blur-sm transition-colors hover:bg-paper hover:text-stage">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div aria-hidden="true" className="mt-4 h-px bg-paper/25">
          <div key={`f${index}`} className="lz-fill h-full origin-left bg-gold" data-run={running ? "1" : "0"} onAnimationEnd={() => go(1)} />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {`Photograph ${shown + 1} of ${n}: ${s.title}, ${s.caption}`}
      </p>
    </section>
  );
}
