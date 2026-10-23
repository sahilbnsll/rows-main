"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; ox: number; oy: number; k: number; r: number; tone: number };

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Gold motes that drift like a murmuration and, as the section scrolls to the middle of the screen, gather into the festival's
 * motto. Move the pointer through them and they scatter, then find their place again. Everything is drawn on one canvas, only
 * while it is on screen; with reduced motion the motes are simply laid out as the words. The words are also real text under
 * the canvas, for screen readers and for anyone without JavaScript.
 */
export function MottoFlock({ lines }: { lines: string[] }) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = box.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!host || !cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let motes: Mote[] = [];
    let raf = 0;
    let visible = false;
    let started = performance.now();
    const pointer = { x: -999, y: -999 };

    /** Reads the words off a hidden canvas and returns points that fall inside the letters. */
    const sample = (count: number) => {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d");
      if (!o) return [];
      const family = getComputedStyle(host).getPropertyValue("--font-display").trim() || "serif";
      const widest = Math.max(...lines.map((l) => l.length));
      let size = Math.min((w * 0.9) / (widest * 0.52), h / (lines.length * 1.2), 190);
      o.font = `400 ${size}px ${family}`;
      const measured = Math.max(...lines.map((l) => o.measureText(l).width));
      if (measured > w * 0.92) size *= (w * 0.92) / measured;
      o.font = `400 ${size}px ${family}`;
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      const lh = size * 1.12;
      lines.forEach((l, i) => o.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * lh));
      const data = o.getImageData(0, 0, w, h).data;
      const pts: [number, number][] = [];
      const step = Math.max(2, Math.round(size / 36));
      for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) if (data[(y * w + x) * 4 + 3] > 140) pts.push([x, y]);
      for (let i = pts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      return pts.slice(0, count);
    };

    const build = () => {
      const r = host.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 900 : 2300;
      const pts = sample(count);
      motes = pts.map(([tx, ty], i) => {
        const a = Math.random() * Math.PI * 2;
        const d = Math.sqrt(Math.random()) * Math.min(w, h) * 0.46;
        return { x: w / 2 + Math.cos(a) * d, y: h / 2 + Math.sin(a) * d, vx: 0, vy: 0, tx, ty, ox: Math.cos(a) * d, oy: Math.sin(a) * d, k: 0.016 + Math.random() * 0.04, r: 0.9 + Math.random() * 1.5, tone: i % 5 === 0 ? 1 : 0 };
      });
    };

    const draw = (now: number) => {
      const t = (now - started) / 1000;
      const rect = host.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const vh = window.innerHeight;
      const gather = reduce ? 1 : smooth(0.62, 0.14, Math.abs(mid - vh / 2) / vh);
      ctx.clearRect(0, 0, w, h);

      // the flock's centre wanders on a slow loop and the whole cloud turns around it
      const cx = w / 2 + Math.sin(t * 0.31) * w * 0.22;
      const cy = h / 2 + Math.cos(t * 0.23) * h * 0.18;
      const turn = t * 0.34;
      const cos = Math.cos(turn);
      const sin = Math.sin(turn);
      const px = pointer.x;
      const py = pointer.y;

      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        for (const m of motes) {
          if (m.tone !== pass) continue;
          const breathe = 1 + Math.sin(t * 0.8 + m.k * 90) * 0.18;
          const fx = cx + (m.ox * cos - m.oy * sin) * breathe;
          const fy = cy + (m.ox * sin + m.oy * cos) * 0.62 * breathe;
          const gx = fx + (m.tx - fx) * gather;
          const gy = fy + (m.ty - fy) * gather;
          if (reduce) {
            m.x = m.tx;
            m.y = m.ty;
          } else {
            m.vx += (gx - m.x) * m.k * (0.6 + gather * 1.1);
            m.vy += (gy - m.y) * m.k * (0.6 + gather * 1.1);
            const dx = m.x - px;
            const dy = m.y - py;
            const d2 = dx * dx + dy * dy;
            if (d2 < 130 * 130) {
              const f = (1 - Math.sqrt(d2) / 130) * 3.4;
              const d = Math.sqrt(d2) || 1;
              m.vx += (dx / d) * f;
              m.vy += (dy / d) * f;
            }
            m.vx *= 0.86;
            m.vy *= 0.86;
            m.x += m.vx;
            m.y += m.vy;
          }
          ctx.moveTo(m.x + m.r, m.y);
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        }
        ctx.fillStyle = pass === 0 ? "rgba(214, 170, 78, 0.92)" : "rgba(251, 247, 238, 0.85)";
        ctx.fill();
      }
      if (reduce) return;
      if (visible) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      started = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const init = () => {
      build();
      if (reduce) draw(performance.now());
      else if (visible) start();
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduce) start();
        else cancelAnimationFrame(raf);
      },
      { rootMargin: "120px" },
    );
    io.observe(host);
    const ro = new ResizeObserver(() => init());
    ro.observe(host);

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const leave = () => {
      pointer.x = pointer.y = -999;
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    void document.fonts.ready.then(init);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [lines]);

  return (
    <div ref={box} className="relative h-[min(30rem,62svh)] w-full">
      <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 size-full" />
    </div>
  );
}
