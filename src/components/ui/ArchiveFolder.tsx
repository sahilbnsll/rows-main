"use client";

import Image from "next/image";
import * as React from "react";
import { Seal } from "./Seal";

/*
 * A year of the press archive as a file folder from the Society's own office, after "Glass Folder Cards" in the component
 * library, re-made in the site's materials: a cloth-bound back board in one of the Society's colours, printed with the gold
 * lotus mandala; the clippings standing inside; and a front cover of cream handmade paper with a gold mount line, the Society's
 * seal stamped on it and a brass button tied with red cord, the way Indian office files are closed.
 *   Rest: closed, the tops of the clippings just showing.
 *   Hover or focus: the cover leans forward on its bottom fold and the clippings lift.
 *   Open (click, Enter, Space): the cover falls further and the clippings rise and fan out, each one a button.
 * Escape or a click outside closes it.
 */

export type FolderFile = {
  name: string;
  /** The full description, for screen readers. */
  title?: string;
  meta?: string;
  image?: string;
};

/** Cloth colours for the back boards, from the site palette. */
export const FOLDER_CLOTH = ["#681319", "#3f4d24", "#9a5a1c", "#4a3550", "#566b30"] as const;

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const fanSlot = (index: number, count: number) => (count <= 1 ? 0 : (index / (count - 1)) * 2 - 1);

// Geometry in the folder's own units: drawn at 340 x 272 and scaled to `width`.
const W = 340;
const H = 272;
const HEADROOM = 54;
const FRONT_H = H - 74;
const SHEET_W = 272;
const SHEET_H = 184;
const BACK_PATH = "M0 56A18 18 0 0 1 18 34L146 34C170 34 172 0 198 0L322 0A18 18 0 0 1 340 18L340 254A18 18 0 0 1 322 272L18 272A18 18 0 0 1 0 254Z";
const FRONT_PATH = `M0 18A18 18 0 0 1 18 0L118 0C144 0 146 32 172 32L322 32A18 18 0 0 1 340 50L340 ${FRONT_H - 18}A18 18 0 0 1 322 ${FRONT_H}L18 ${FRONT_H}A18 18 0 0 1 0 ${FRONT_H - 18}Z`;
const MAX_VISIBLE = 4;

export function ArchiveFolder({
  label,
  meta,
  cloth = FOLDER_CLOTH[0],
  files,
  onFileSelect,
  onFileHover,
  width = 300,
  appearDelay = 0,
}: {
  label: string;
  meta?: string;
  cloth?: string;
  files: FolderFile[];
  onFileSelect?: (file: FolderFile, index: number, el: HTMLElement) => void;
  /** The file under the pointer or keyboard focus (null when there is none), so the page can show its full title. */
  onFileHover?: (index: number | null) => void;
  width?: number;
  appearDelay?: number;
}) {
  const uid = React.useId().replace(/:/g, "");
  const root = React.useRef<HTMLDivElement>(null);
  const filesRef = React.useRef<HTMLDivElement>(null);
  const hit = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  const k = width / W;

  // put itself together the first time it is on screen
  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    let t = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        t = window.setTimeout(() => setEntered(true), appearDelay);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [appearDelay]);

  // a little tilt towards the pointer, without re-rendering
  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const write = () => {
      raf = 0;
      el.style.setProperty("--af-px", px.toFixed(3));
      el.style.setProperty("--af-py", py.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(write);
    };
    const leave = () => {
      px = py = 0;
      if (!raf) raf = requestAnimationFrame(write);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  React.useEffect(() => {
    filesRef.current?.toggleAttribute("inert", !open);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || document.querySelector("dialog[open]")) return;
      setOpen(false);
      hit.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (document.querySelector("dialog[open]")) return;
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const visible = files.slice(0, MAX_VISIBLE).reverse();
  const count = files.length;
  const metaLine = meta ?? `${count} ${count === 1 ? "item" : "items"}`;

  return (
    <div ref={root} className="af-root" data-open={open || undefined} data-entered={entered || undefined} style={{ width, height: (H + HEADROOM) * k, "--af-cloth": cloth } as React.CSSProperties}>
      <div className="af-stage" style={{ transform: `translateY(${HEADROOM * k}px) scale(${k})` }}>
        <div className="af-tilt">
          <div className="af-shadow" aria-hidden="true" />
          {/* the cloth-bound back board, printed with the lotus mandala */}
          <div className="af-back" style={{ clipPath: `path('${BACK_PATH}')` }} aria-hidden="true">
            <div className="af-print" />
          </div>
          <svg className="af-rim af-back-rim" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <path d={BACK_PATH} />
          </svg>

          {/* the cream paper cover, folding forward on its bottom edge */}
          <div className="af-front" style={{ clipPath: `path('${FRONT_PATH}')` }}>
            <div className="af-paper" aria-hidden="true" />
            <svg className="af-rim af-front-rim" viewBox={`0 0 ${W} ${FRONT_H}`} aria-hidden="true">
              <path d={FRONT_PATH} className="af-edge" />
              <path d={FRONT_PATH} className="af-mount" transform={`translate(11 9) scale(${(W - 22) / W} ${(FRONT_H - 18) / FRONT_H})`} />
            </svg>
            <span className="af-seal" aria-hidden="true">
              <Seal className="w-full" />
            </span>
            {/* a brass button tied round with red cord */}
            <svg className="af-tie" viewBox="0 0 60 90" aria-hidden="true">
              <path d="M30 34 C 52 30 52 52 30 50 C 8 48 10 26 30 34 Z" fill="none" stroke="#a51f24" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M33 50 C 44 62 22 70 34 90" fill="none" stroke="#a51f24" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="30" cy="40" r="9" fill={`url(#af-brass-${uid})`} stroke="#5a412b" strokeWidth="0.8" />
              <circle cx="27" cy="37" r="2.4" fill="#fff1c8" opacity="0.7" />
              <defs>
                <radialGradient id={`af-brass-${uid}`} cx="0.35" cy="0.3" r="0.8">
                  <stop offset="0" stopColor="#ffe4a5" />
                  <stop offset="0.45" stopColor="#b48d3c" />
                  <stop offset="1" stopColor="#5a412b" />
                </radialGradient>
              </defs>
            </svg>
            <button ref={hit} type="button" className="af-hit" aria-expanded={open} aria-label={`${open ? "Close" : "Open"} ${label}, ${metaLine}`} onClick={() => setOpen(!open)} />
            <div className="af-label">
              <span className="af-title">{label}</span>
              <span className="af-meta">{metaLine}</span>
            </div>
          </div>

          <div ref={filesRef} className="af-files" role="list" aria-label={`${label}: contents`}>
            {visible.map((file, v) => {
              const index = visible.length - 1 - v;
              const jitter = rng(hashString(file.name) + v);
              return (
                <div key={file.name + v} role="listitem" className="af-sheet-slot">
                  <button
                    type="button"
                    className={`af-sheet${file.image ? " af-sheet--art" : ""}`}
                    style={
                      {
                        "--af-slot": fanSlot(v, visible.length),
                        "--af-depth": visible.length - 1 - v,
                        "--af-jx": `${((jitter() - 0.5) * 10).toFixed(2)}px`,
                        "--af-jr": `${((jitter() - 0.5) * 3.2).toFixed(2)}deg`,
                        zIndex: v + 1,
                      } as React.CSSProperties
                    }
                    aria-label={file.title ?? file.name}
                    onClick={(e) => onFileSelect?.(file, index, e.currentTarget)}
                    onPointerEnter={() => onFileHover?.(index)}
                    onPointerLeave={() => onFileHover?.(null)}
                    onFocus={() => onFileHover?.(index)}
                    onBlur={() => onFileHover?.(null)}
                  >
                    {file.image && <Image className="af-sheet-art" src={file.image} alt="" width={SHEET_W} height={SHEET_H} sizes="17rem" quality={70} draggable={false} />}
                    <span className="af-sheet-head">
                      <span className="af-sheet-name">{file.name}</span>
                      {file.meta && <span className="af-sheet-meta">{file.meta}</span>}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
