"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

/*
 * The exhibition as a wheel you turn, after "Works Wheel" in the component library. At rest the works sit in a ring around the
 * title, each card tangent to the circle. The first turn opens the ring into a vertical drum: the work at the front lies flat and
 * full size, its neighbours rotate away into perspective and run off the top and bottom. Keep turning and the drum brings the
 * next work round. One number, `turn`, drives it all (0 the ring, 1 the drum with the first work in front, each whole number
 * after that one more work), read by a single animation frame loop that writes transforms straight to the page.
 * Turn it with the mouse wheel (the page scrolls on once the wheel reaches either end), by dragging, with the arrow keys, or
 * from the index of artists on the right.
 */

export interface WheelItem {
  title: string;
  artist: string;
  image: string;
  href: string;
}

const CARD_H = 0.38;
const CARD_MAX_W = 0.34;
const CARD_RATIO = 1.3;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 1.14;
const BOW = 1.82;
const CULL = 1.6;
const WHEEL_UNITS = 700;
const DRAG_UNITS = 380;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;
const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)));
const place = (ringDeg: number, drumDeg: number, ringR: number, drumR: number, bow: number, m: number) =>
  `translateX(${m * bowAt(drumDeg, bow)}px) rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px) rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`;

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function WorksWheel({ items, label }: { items: WheelItem[]; label: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const turn = useRef(0);
  const target = useRef(0);
  const settling = useRef(0);
  const drag = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [drum, setDrum] = useState(false);
  const [stage, setStage] = useState({ w: 0, h: 0 });
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(reducedQuery).matches, () => false);
  const count = items.length;
  const last = Math.max(count - 1, 0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const ringR = cardH * RING_R;
    const ringScale = count ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1) : 1;
    return { cardW, cardH, ringR, ringScale, drumR: cardH * DRUM, bow: cardH * BOW, depth: cardH * LENS, title: cardH * 0.12 };
  }, [stage, count]);

  useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;
    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);
      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);
      if (wheelRef.current) wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const card = cardRefs.current[i];
        if (!card) continue;
        card.style.transform = place(d * (360 / count), d * STEP, ringR, drumR, bow, m);
        card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        const face = card.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }
      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
      setDrum((prev) => (prev === m > 0.5 ? prev : m > 0.5));
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = useCallback((next: number) => (target.current = clamp(next, 0, last + 1)), [last]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      // only hold the page while the wheel still has somewhere to go
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(() => to(Math.round(target.current)), SETTLE);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const front = items[active];

  return (
    <div className="relative h-[clamp(30rem,82svh,46rem)] w-full select-none overflow-hidden">
      <div
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-roledescription="wheel"
        aria-label={`${label}. Turn with the arrow keys, or choose an artist from the index.`}
        className="absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--gold)] active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("a")) return;
          drag.current = e.clientY;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current === null) return;
          to(target.current + (drag.current - e.clientY) / DRAG_UNITS);
          drag.current = e.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowRight") to(Math.round(target.current) + 1);
          else if (e.key === "ArrowUp" || e.key === "ArrowLeft") to(Math.round(target.current) - 1);
          else return;
          e.preventDefault();
        }}
      >
        <div ref={wheelRef} className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]">
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={i === active ? 0 : -1}
              aria-label={`${item.title} by ${item.artist}: the artist's profile`}
              ref={(node: HTMLElement | null) => {
                cardRefs.current[i] = node;
              }}
              className="group absolute [backface-visibility:hidden]"
              style={{ width: metrics.cardW, height: metrics.cardH, marginLeft: -metrics.cardW / 2, marginTop: -metrics.cardH / 2 }}
              draggable={false}
            >
              <span className="relative block size-full overflow-hidden rounded-lg bg-stage-raised shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-gold/40">
                <Image src={item.image} alt="" fill sizes="(min-width:1024px) 30rem, 60vw" quality={75} draggable={false} className="object-cover" />
                <span className="pointer-events-none absolute bottom-3 right-3 flex translate-y-1 items-center gap-1 rounded-full bg-paper/90 px-2.5 py-1 text-[0.7rem] font-semibold text-stage opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  View the artist
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div ref={labelRef} className="display pointer-events-none absolute inset-0 grid place-items-center text-center" style={{ fontSize: metrics.title }}>
        {label}
      </div>
      <div ref={titleRef} className="pointer-events-none absolute left-[5%] top-1/2 max-w-[22%] -translate-y-1/2 opacity-0 max-md:hidden">
        <p className="display leading-tight" style={{ fontSize: metrics.title * 0.75 }}>
          {front?.title}
        </p>
        <p className="serif mt-2 text-[1rem] italic text-paper/75">{front?.artist}</p>
      </div>
      <ol className="absolute right-[3%] top-[7%] text-right text-[0.82rem] leading-[1.9] text-paper/60 max-md:hidden" aria-label="Index of artists">
        {items.map((item, i) => (
          <li key={item.href}>
            <button type="button" onClick={() => to(i + 1)} className={`transition-colors hover:text-paper ${i === active && drum ? "font-semibold text-paper" : ""}`}>
              {item.artist}
            </button>
          </li>
        ))}
      </ol>
      <p className="serif pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.95rem] italic text-paper/60" aria-live="polite">
        {front && drum ? `${active + 1} of ${count}: ${front.artist}` : ""}
      </p>
    </div>
  );
}
