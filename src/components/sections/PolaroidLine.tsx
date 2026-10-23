"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/photo";
import { ChevronLeft, ChevronRight } from "@/components/ui/Icons";

/*
 * After "Polaroid Line Carousel" in the component library: prints pegged with brass clips to a sagging gold string. Drag the line
 * (or use the arrows, the keys, or click a print) and the prints slide along it, swinging on their pegs with the speed you give
 * them and settling with a little overshoot; at rest they sway as if in a breeze. The print in the middle is the one you are
 * looking at, and its caption is written underneath. It steps on by itself while nobody is touching it. Reduced motion keeps it
 * still and stops the autoplay.
 */

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const stringY = (x: number, w: number, y0: number, sag: number) => {
  const t = clamp(x / w, 0, 1);
  return y0 + 4 * sag * t * (1 - t);
};
function springStep(x: number, v: number, target: number, dt: number, k = 70): [number, number] {
  const c = 2 * Math.sqrt(k);
  const nv = v + (k * (target - x) - c * v) * dt;
  return [x + nv * dt, nv];
}
function swingStep(a: number, w: number, lineVel: number, dt: number, gain: number): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt;
  return [clamp(a + nw * dt, -0.6, 0.6), nw];
}
const nearestAt = (off: number, spacing: number, n: number) => clamp(Math.round(off / spacing), 0, Math.max(0, n - 1));
const pad = (n: number) => String(n).padStart(2, "0");
const AUTOPLAY = 4500;

export function PolaroidLine({ photos, label }: { photos: Photo[]; label: string }) {
  const n = photos.length;
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ w: 1200, h: 640, cw: 280 });
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const sim = useRef({ off: 0, vel: 0, target: 0, a: [] as number[], w: [] as number[] });
  const drag = useRef<null | { x: number; off: number; lx: number; lt: number; v: number; moved: boolean }>(null);
  const lastTouch = useRef(0);
  const activeRef = useRef(0);
  const spacing = size.cw * 1.08;

  const goTo = useCallback((i: number) => (sim.current.target = clamp(i, 0, n - 1) * spacing), [n, spacing]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height, cw: Math.round(Math.max(150, Math.min(290, r.width * 0.42, r.height * 0.46))) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    sim.current.target = activeRef.current * spacing;
    sim.current.off = activeRef.current * spacing;
  }, [spacing]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let raf = 0;
    let prev = performance.now();
    const S = sim.current;
    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      const { w, h, cw } = size;
      const y0 = Math.max(40, h * 0.12);
      const sag = Math.min(46, h * 0.07);
      const d = drag.current;
      let lineVel: number;
      if (d && d.moved) lineVel = d.v * 1000;
      else {
        const before = S.off;
        [S.off, S.vel] = reduce ? [S.target, 0] : springStep(S.off, S.vel, S.target, dt);
        lineVel = -(S.off - before) / Math.max(dt, 1e-3);
      }
      const g = reduce ? 0 : 1;
      const near = nearestAt(S.off, spacing, n);
      for (let i = 0; i < n; i++) {
        const card = cards.current[i];
        if (!card) continue;
        const x = w / 2 + i * spacing - S.off;
        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          card.style.visibility = "hidden";
          continue;
        }
        card.style.visibility = "visible";
        let a = S.a[i] || 0;
        let av = S.w[i] || 0;
        [a, av] = swingStep(a, av, lineVel, dt, g);
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009;
        S.a[i] = a;
        S.w[i] = av;
        const y = stringY(x, w, y0, sag) - 6;
        card.style.transform = `translate(${(x - cw / 2).toFixed(1)}px,${y.toFixed(1)}px) rotate(${a.toFixed(4)}rad)`;
        card.style.zIndex = String(i === near ? n + 1 : n - Math.abs(i - near));
      }
      path.current?.setAttribute("d", `M0 ${y0} Q${w / 2} ${y0 + 2 * sag} ${w} ${y0}`);
      if (near !== activeRef.current) {
        activeRef.current = near;
        setActive(near);
      }
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size, spacing, n]);

  useEffect(() => {
    if (n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (document.hidden || drag.current || performance.now() - lastTouch.current < AUTOPLAY * 2) return;
      goTo(activeRef.current >= n - 1 ? 0 : activeRef.current + 1);
    }, AUTOPLAY);
    return () => window.clearInterval(t);
  }, [n, goTo]);

  const step = (dir: number) => {
    lastTouch.current = performance.now();
    goTo(clamp(activeRef.current + dir, 0, n - 1));
  };

  const current = photos[active];

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      data-drag={dragging || undefined}
      className="relative h-[clamp(30rem,72svh,42rem)] w-full cursor-grab touch-pan-y select-none overflow-hidden outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--gold)] data-[drag]:cursor-grabbing"
      style={{ "--pl-cw": `${size.cw}px` } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
        else return;
        e.preventDefault();
      }}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest("[data-bar]")) return;
        lastTouch.current = performance.now();
        drag.current = { x: e.clientX, off: sim.current.off, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        if (!d.moved && Math.abs(dx) > 5) {
          d.moved = true;
          setDragging(true);
          root.current?.setPointerCapture(e.pointerId);
        }
        if (!d.moved) return;
        const dt = Math.max(1, e.timeStamp - d.lt);
        d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v;
        d.lx = e.clientX;
        d.lt = e.timeStamp;
        const max = (n - 1) * spacing;
        let off = d.off - dx;
        if (off < 0) off *= 0.35;
        if (off > max) off = max + (off - max) * 0.35;
        sim.current.off = off;
      }}
      onPointerUp={(e) => {
        const d = drag.current;
        drag.current = null;
        lastTouch.current = performance.now();
        if (!d) return;
        if (d.moved) {
          setDragging(false);
          sim.current.vel = -d.v * 1000;
          goTo(nearestAt(sim.current.off - d.v * 180, spacing, n));
          return;
        }
        const card = (e.target as HTMLElement).closest("[data-i]");
        if (card) goTo(Number(card.getAttribute("data-i")));
      }}
      onPointerCancel={() => {
        drag.current = null;
        setDragging(false);
      }}
    >
      <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <path ref={path} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {photos.map((p, i) => (
        <div
          key={p.src}
          data-i={i}
          ref={(el) => {
            cards.current[i] = el;
          }}
          aria-hidden={i === active ? undefined : true}
          className="absolute left-0 top-0 w-[var(--pl-cw)] origin-top will-change-transform"
        >
          <div className={`mt-2.5 bg-[#fbf7ee] px-2.5 pt-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_22px_34px_-16px_rgba(0,0,0,0.6)] transition-[transform,filter] duration-500 ease-[var(--ease-out)] ${i === active ? "" : "scale-90 brightness-90 saturate-[0.7]"}`}>
            <div className="relative aspect-square overflow-hidden bg-[#d9d5cc]">
              <Image src={p.src} alt={p.alt} fill sizes="18rem" quality={75} draggable={false} className="pointer-events-none object-cover" style={{ objectPosition: p.position ?? "50% 35%" }} />
            </div>
            <div className="serif flex h-11 items-center justify-center truncate px-1.5 text-[0.95rem] italic text-[#3b3833]">{p.caption?.split(",")[0]}</div>
          </div>
          <div aria-hidden="true" className="absolute left-1/2 top-0 h-[26px] w-2.5 -translate-x-1/2 rounded-[2px] bg-[linear-gradient(90deg,#8a6a2c,#e1bd6a_45%,#8a6a2c)] shadow-[0_2px_3px_rgba(0,0,0,0.35)]" />
        </div>
      ))}
      <div data-bar className="absolute inset-x-[clamp(16px,4vw,56px)] bottom-[clamp(16px,3vh,32px)] flex cursor-default items-center gap-4">
        <p key={active} className="min-w-0 flex-1 animate-[pl-in_0.55s_var(--ease-out)_both]">
          <span className="display block truncate text-[clamp(1.15rem,1rem+0.8vw,1.6rem)]">{current.caption}</span>
        </p>
        <span className="text-xs font-semibold tracking-[0.14em] text-paper/70 tabular-nums" aria-hidden="true">
          <b className="text-paper">{pad(active + 1)}</b> / {pad(n)}
        </span>
        <button type="button" onClick={() => step(-1)} aria-label="Previous photograph" className="grid size-11 place-items-center rounded-full text-paper shadow-[inset_0_0_0_1px_rgb(251_247_238/0.3)] transition-colors hover:bg-paper hover:text-stage">
          <ChevronLeft size={16} />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next photograph" className="grid size-11 place-items-center rounded-full text-paper shadow-[inset_0_0_0_1px_rgb(251_247_238/0.3)] transition-colors hover:bg-paper hover:text-stage">
          <ChevronRight size={16} />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {`Photograph ${active + 1} of ${n}: ${current.caption ?? current.alt}`}
      </p>
    </div>
  );
}
