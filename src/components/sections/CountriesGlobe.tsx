"use client";

import Image from "next/image";
import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FestivalCountry } from "@/content/festival-countries";

/*
 * After "Globe Polaroids" in the component library (cobe): a slowly turning globe with a marker for every country whose artists
 * have come to the festival, each joined to New Delhi by a gold arc. The country in focus carries a small polaroid (the poster of
 * the edition it came to, and the country's name), anchored to its marker with CSS anchor positioning, so it rides the globe and
 * fades as the country turns away. The list beside it is the way in for keyboards and screen readers: choosing a country turns
 * the globe to face it. Drag to spin. With reduced motion the globe only turns when a country is chosen.
 */

const toAngles = (lat: number, lon: number): [number, number] => [Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];

export function CountriesGlobe({ countries, home, posters }: { countries: FestivalCountry[]; home: [number, number]; posters: Record<number, string | undefined> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const target = useRef<[number, number] | null>(null);
  const interacted = useRef(0);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const offset = useRef({ phi: 0, theta: 0, dPhi: 0, dTheta: 0 });

  const focus = useCallback(
    (i: number, byUser: boolean) => {
      setActive(i);
      target.current = toAngles(...countries[i].location);
      if (byUser) interacted.current = performance.now();
    },
    [countries],
  );

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let raf = 0;
    let visible = true;
    const start = toAngles(...countries[0].location);
    let phi = start[0];
    let theta = 0.25;
    target.current = start;

    const init = () => {
      const width = el.offsetWidth;
      if (!width || globe) return;
      globe = createGlobe(el, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi,
        theta,
        dark: 0,
        diffuse: 1.3,
        mapSamples: 16000,
        mapBrightness: 7,
        mapBaseBrightness: 0.05,
        baseColor: [0.98, 0.95, 0.88],
        markerColor: [0.54, 0.11, 0.14],
        glowColor: [0.93, 0.86, 0.68],
        markerElevation: 0.01,
        markers: [{ location: home, size: 0.07, id: "delhi" }, ...countries.map((c) => ({ location: c.location, size: 0.04, id: c.id }))],
        arcs: countries.map((c) => ({ from: c.location, to: home, id: `arc-${c.id}` })),
        arcColor: [0.71, 0.55, 0.24],
        arcWidth: 0.6,
        arcHeight: 0.3,
        opacity: 0.85,
      });
      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || !globe) return;
        const t = target.current;
        if (t && !drag.current) {
          // ease the shortest way round to the country in focus
          let d = t[0] - phi;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          phi += d * (reduced ? 1 : 0.06);
          theta += (t[1] * 0.6 - theta) * (reduced ? 1 : 0.06);
        }
        const o = offset.current;
        globe.update({ phi: phi + o.phi + o.dPhi, theta: Math.max(-0.6, Math.min(0.9, theta + o.theta + o.dTheta)) });
      };
      frame();
      el.style.opacity = "1";
    };

    const ro = new ResizeObserver(() => init());
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    init();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      globe?.destroy();
    };
  }, [countries, home]);

  // step through the countries on its own until someone chooses one
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (performance.now() - interacted.current < 9000 || drag.current) return;
      setActive((a) => {
        const next = (a + 1) % countries.length;
        target.current = toAngles(...countries[next].location);
        return next;
      });
    }, 3600);
    return () => window.clearInterval(id);
  }, [countries]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      offset.current.dPhi = (e.clientX - d.x) / 200;
      offset.current.dTheta = (e.clientY - d.y) / 600;
    };
    const up = () => {
      if (!drag.current) return;
      const o = offset.current;
      o.phi += o.dPhi;
      o.theta += o.dTheta;
      o.dPhi = o.dTheta = 0;
      drag.current = null;
      if (canvas.current) canvas.current.style.cursor = "grab";
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const c = countries[active];
  const years = [...new Set(countries.map((x) => x.year))].sort((a, b) => b - a);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="relative mx-auto aspect-square w-full max-w-[34rem] select-none">
        <canvas
          ref={canvas}
          aria-hidden="true"
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, y: e.clientY };
            interacted.current = performance.now();
            e.currentTarget.style.cursor = "grabbing";
          }}
          className="size-full cursor-grab rounded-full opacity-0 transition-opacity duration-1000 [touch-action:pan-y]"
        />
        {countries.map((x, i) => (
          <div
            key={x.id}
            aria-hidden="true"
            className="pointer-events-none absolute bg-[#fbf7ee] px-[5px] pb-1 pt-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-[opacity,filter] duration-300"
            style={
              {
                positionAnchor: `--cobe-${x.id}`,
                bottom: "anchor(top)",
                left: "anchor(center)",
                translate: "-50% 0",
                marginBottom: 8,
                opacity: i === active ? `var(--cobe-visible-${x.id}, 0)` : 0,
                filter: `blur(calc((1 - var(--cobe-visible-${x.id}, 0)) * 6px))`,
                rotate: `${i % 2 ? 3 : -4}deg`,
              } as React.CSSProperties
            }
          >
            {posters[x.year] ? (
              <span className="relative block size-[4.5rem] overflow-hidden bg-sage">
                <Image src={posters[x.year]!} alt="" fill sizes="5rem" quality={60} className="object-cover" />
              </span>
            ) : (
              <span className="display grid size-[4.5rem] place-items-center bg-stage text-[1.4rem] text-paper">{x.year}</span>
            )}
            <span className="mt-1 block text-center text-[0.62rem] font-semibold leading-tight text-[#26301a]">
              {x.country}
              <span className="block font-normal opacity-70">IAAF {x.year}</span>
            </span>
          </div>
        ))}
      </div>

      <div>
        <p aria-live="polite" className="min-h-[5.5rem]">
          <span className="display block text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)] leading-tight">{c.country}</span>
          <span className="serif block text-[1.1rem] italic text-ink-muted">
            IAAF {c.year} · {c.note}
          </span>
        </p>
        <ul className="mt-6 space-y-4" aria-label="Countries by edition">
          {years.map((y) => (
            <li key={y} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-3 border-t border-line pt-3">
              <span className="display text-[1.3rem] text-maroon">{y}</span>
              <span className="flex flex-wrap gap-2">
                {countries.map((x, i) =>
                  x.year === y ? (
                    <button key={x.id} type="button" className="chip" aria-pressed={i === active} onClick={() => focus(i, true)}>
                      {x.country}
                    </button>
                  ) : null,
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
