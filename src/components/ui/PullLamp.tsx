"use client";

/*
 * The lamp that turns the page to night.
 * Drawing and cord physics after "Pull Lamp" by Ship Notes (https://github.com/aqualang89/shipnotes-components), MIT licensed,
 * Copyright (c) 2026 Ship Notes, from the component library the Society chose. Re-coloured in the Society's brass and olive enamel,
 * and wired to the page's night palette instead of a light and dark theme.
 */

import { useEffect, useId, useRef, useSyncExternalStore } from "react";

const KEY = "rws-lamp";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lamp"] });
  return () => mo.disconnect();
}

/** Whether the lamp is lit, read from the page itself (the first client render matches the server, which has no lamp). */
function useLamp(): boolean {
  return useSyncExternalStore(subscribe, () => document.documentElement.dataset.lamp === "on", () => false);
}

/** Lights the lamp (the warm night palette) or puts it out, for the whole site, and remembers the choice. */
function setLamp(on: boolean) {
  document.documentElement.dataset.lamp = on ? "on" : "off";
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* the lamp still works for this visit */
  }
}

/**
 * A brass desk lamp with an olive enamel shade that stands in the bottom-right corner of the window. Tug its bead chain down
 * (or tap it, or focus it and press Enter) and the lamp lights: the page turns to a warm night palette and a pool of lamplight
 * spreads from the corner. Tug again for day. The chain is a small spring, so it swings back and sways.
 */
export function PullLamp({ className = "" }: { className?: string }) {
  const on = useLamp();
  const uid = useId().replace(/[:]/g, "");
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const cord = useRef<SVGPathElement>(null);
  const beads = useRef<SVGPathElement>(null);
  const knob = useRef<SVGGElement>(null);
  const sim = useRef({ pull: 0, sway: 0, vel: 0, side: 0, last: 0, raf: 0, moved: 0, drag: null as null | { id: number; x: number; y: number; scale: number } });

  useEffect(() => {
    const btn = button.current;
    const box = root.current;
    if (!btn || !box) return;
    const s = sim.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pose = () => {
      const x = 350 + s.sway;
      const y = 329 + s.pull;
      const d = `M350 226 Q${350 + s.sway * 0.22} ${277 + s.pull * 0.45} ${x} ${y}`;
      cord.current?.setAttribute("d", d);
      beads.current?.setAttribute("d", d);
      knob.current?.setAttribute("transform", `translate(${s.sway} ${s.pull})`);
      btn.style.left = `${(x / 480) * 100}%`;
      btn.style.top = `${((y + 3) / 560) * 100}%`;
    };

    const tick = (now: number) => {
      const dt = s.last ? Math.min((now - s.last) / 1000, 0.025) : 0.016;
      s.last = now;
      if (!s.drag) {
        s.vel += (-s.pull * 220 - s.vel * 19) * dt;
        s.pull += s.vel * dt;
        s.side += (-s.sway * 100 - s.side * 9) * dt;
        s.sway += s.side * dt;
      }
      pose();
      if (s.drag || Math.abs(s.pull) + Math.abs(s.vel) + Math.abs(s.sway) + Math.abs(s.side) > 0.015) s.raf = requestAnimationFrame(tick);
      else {
        s.raf = 0;
        s.pull = s.sway = 0;
        pose();
      }
    };
    const wake = () => {
      if (reduced.matches) {
        s.pull = s.sway = s.vel = s.side = 0;
        pose();
        return;
      }
      if (!s.raf) {
        s.last = 0;
        s.raf = requestAnimationFrame(tick);
      }
    };
    const toggle = () => {
      setLamp(document.documentElement.dataset.lamp !== "on");
      wake();
    };

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const r = box.getBoundingClientRect();
      s.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, scale: 480 / r.width };
      s.moved = 0;
      btn.setPointerCapture(e.pointerId);
      wake();
    };
    const move = (e: PointerEvent) => {
      const d = s.drag;
      if (!d || e.pointerId !== d.id) return;
      const dx = (e.clientX - d.x) * d.scale;
      const dy = (e.clientY - d.y) * d.scale;
      s.moved = Math.max(s.moved, Math.hypot(dx, dy));
      s.pull = Math.max(0, Math.min(65, dy));
      s.sway = Math.max(-24, Math.min(24, dx));
      pose();
    };
    const release = (e: PointerEvent, cancelled: boolean) => {
      const d = s.drag;
      if (!d || e.pointerId !== d.id) return;
      const flip = !cancelled && (s.pull > 16 || s.moved < 5);
      s.drag = null;
      if (btn.hasPointerCapture(e.pointerId)) btn.releasePointerCapture(e.pointerId);
      if (flip) toggle();
      wake();
    };
    const up = (e: PointerEvent) => release(e, false);
    const cancel = (e: PointerEvent) => release(e, true);
    // keyboard activation arrives as a click with no pointer behind it
    const click = (e: MouseEvent) => {
      if (e.detail === 0) toggle();
    };

    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointermove", move);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointercancel", cancel);
    btn.addEventListener("click", click);
    pose();
    return () => {
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      btn.removeEventListener("pointerdown", down);
      btn.removeEventListener("pointermove", move);
      btn.removeEventListener("pointerup", up);
      btn.removeEventListener("pointercancel", cancel);
      btn.removeEventListener("click", click);
    };
  }, []);

  const id = (n: string) => `${n}-${uid}`;
  return (
    <div ref={root} className={`pull-lamp select-none ${className}`} data-on={on}>
      <svg viewBox="0 0 480 560" aria-hidden="true" className="block size-full overflow-visible">
        <defs>
          <linearGradient id={id("metal")}>
            <stop stopColor="#4a3826" />
            <stop offset=".25" stopColor="#bf9c62" />
            <stop offset=".45" stopColor="#ffe4a5" />
            <stop offset=".6" stopColor="#a27d47" />
            <stop offset="1" stopColor="#49331f" />
          </linearGradient>
          <linearGradient id={id("enamel")} x1="0" y1="0" x2="1" y2=".85">
            <stop stopColor="#b6c290" />
            <stop offset=".15" stopColor="#6d7f3f" />
            <stop offset=".43" stopColor="#455626" />
            <stop offset=".73" stopColor="#2c3816" />
            <stop offset="1" stopColor="#1a220c" />
          </linearGradient>
          <linearGradient id={id("base")} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#6a7a3e" />
            <stop offset=".4" stopColor="#33401b" />
            <stop offset="1" stopColor="#1a220c" />
          </linearGradient>
          <linearGradient id={id("beam")} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ffd892" stopOpacity=".3" />
            <stop offset="1" stopColor="#ffd892" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={id("pool")}>
            <stop stopColor="#ffd997" stopOpacity=".65" />
            <stop offset=".55" stopColor="#ffd28a" stopOpacity=".18" />
            <stop offset="1" stopColor="#ffd28a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id("under")}>
            <stop stopColor="#fffde1" />
            <stop offset=".5" stopColor="#ffe6a2" />
            <stop offset="1" stopColor="#b17839" />
          </radialGradient>
          <radialGradient id={id("shadow")}>
            <stop stopColor="#000" stopOpacity=".35" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id("edge")}>
            <stop stopColor="#5a412b" />
            <stop offset=".5" stopColor="#eac98f" />
            <stop offset="1" stopColor="#795433" />
          </linearGradient>
          <filter id={id("soft")}>
            <feGaussianBlur stdDeviation="11" />
          </filter>
        </defs>
        <ellipse cx="245" cy="496" rx="169" ry="29" fill={`url(#${id("shadow")})`} />
        <g className="pull-lamp-lit">
          <path d="M91 216 10 487 Q240 547 470 487L389 216Z" fill={`url(#${id("beam")})`} />
          <ellipse cx="240" cy="487" rx="225" ry="60" fill={`url(#${id("pool")})`} />
        </g>
        <ellipse cx="240" cy="477" rx="112" ry="25" fill="#1a220c" />
        <path d="M128 468 Q132 447 240 445 Q346 447 352 468L351 478Q240 518 129 478Z" fill={`url(#${id("base")})`} />
        <ellipse cx="240" cy="467" rx="112" ry="23" fill={`url(#${id("enamel")})`} />
        <path d="M140 465Q240 433 340 465" fill="none" stroke="#e2e7d1" strokeOpacity=".25" strokeWidth="1.5" />
        <ellipse cx="240" cy="464" rx="28" ry="8" fill={`url(#${id("metal")})`} />
        <rect x="230" y="213" width="20" height="249" rx="8" fill={`url(#${id("metal")})`} />
        <path d="M233 225V451" stroke="#ffedc6" strokeOpacity=".35" />
        <rect x="220" y="208" width="40" height="42" rx="12" fill={`url(#${id("metal")})`} />
        <ellipse cx="240" cy="216" rx="153" ry="24" fill="#1a220c" />
        <ellipse className="pull-lamp-lit" cx="240" cy="224" rx="141" ry="23" fill="#ffcf77" filter={`url(#${id("soft")})`} />
        <ellipse className="pull-lamp-lit" cx="240" cy="220" rx="146" ry="18" fill={`url(#${id("under")})`} />
        <path d="M86 216C92 151 139 110 206 103Q240 99 274 103C341 110 388 151 394 216Q240 244 86 216Z" fill={`url(#${id("enamel")})`} />
        <path d="M102 188C123 140 159 118 208 113" fill="none" stroke="#e2e7d1" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
        {/* a lotus-petal band of gold around the shade, the Society's one ornament */}
        <path d="M110 172 q14 -18 28 0 q14 -18 28 0 q14 -18 28 0 q14 -18 28 0 q14 -18 28 0 q14 -18 28 0 q14 -18 28 0 q14 -18 28 0 q14 -18 28 0" fill="none" stroke="#d8b46a" strokeOpacity=".55" strokeWidth="2" />
        <path d="M87 215Q240 246 393 215" fill="none" stroke={`url(#${id("edge")})`} strokeWidth="4" />
        <ellipse cx="240" cy="102" rx="16" ry="5" fill={`url(#${id("metal")})`} />
        <path ref={cord} d="M350 226Q350 274 350 329" fill="none" stroke={`url(#${id("metal")})`} strokeWidth="2.5" />
        <path ref={beads} d="M350 226Q350 274 350 329" fill="none" stroke="#e5ca97" strokeWidth="3.3" strokeLinecap="round" strokeDasharray=".1 5.5" />
        <g ref={knob}>
          <ellipse cx="350" cy="332" rx="7" ry="10" fill={`url(#${id("metal")})`} />
          <ellipse cx="348" cy="329" rx="1.5" ry="4" fill="#fff1c8" opacity=".65" />
        </g>
      </svg>
      <button
        ref={button}
        type="button"
        aria-pressed={on}
        aria-label={on ? "Put out the lamp (day colours)" : "Light the lamp (warm night colours)"}
        title={on ? "Pull for day" : "Pull for night"}
        className="pull-lamp-handle"
      />
    </div>
  );
}

/** The same switch as a plain button, for the phone menu where there is no room for the lamp. */
export function LampSwitch({ className = "" }: { className?: string }) {
  const on = useLamp();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setLamp(!on)}
      className={`inline-flex min-h-11 items-center gap-3 rounded-full bg-surface px-4 text-sm font-semibold text-ink shadow-e1 ${className}`}
    >
      <span aria-hidden="true" className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-gold" : "bg-line-strong"}`}>
        <span className={`absolute top-0.5 size-4 rounded-full bg-paper shadow transition-[left] ${on ? "left-[1.1rem]" : "left-0.5"}`} />
      </span>
      {on ? "Night colours" : "Day colours"}
    </button>
  );
}
