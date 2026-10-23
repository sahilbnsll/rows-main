"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Photo } from "@/content/photo";
import { Viewer } from "./Viewer";

/**
 * A gallery that opens its pictures in the full-screen viewer. `masonry` keeps each picture's own proportions in
 * columns; `grid` crops them to one ratio (for sets of similar pictures such as artworks).
 */
/**
 * Lays n pictures out on a four-column grid with the first one large (2 x 2), then widens the last picture across any free
 * cells in its row, so the mosaic never ends in a hole.
 */
function bentoSpans(n: number): { c: number; r: number }[] {
  const cols = 4;
  const taken = new Set<string>();
  const out: { c: number; r: number; row: number; col: number }[] = [];
  for (let i = 0; i < n; i++) {
    const w = i === 0 ? 2 : 1;
    const h = i === 0 ? 2 : 1;
    let placed = false;
    for (let row = 0; !placed; row++) {
      for (let col = 0; col + w <= cols && !placed; col++) {
        const cells: string[] = [];
        for (let dr = 0; dr < h; dr++) for (let dc = 0; dc < w; dc++) cells.push(`${row + dr}:${col + dc}`);
        if (cells.every((c) => !taken.has(c))) {
          cells.forEach((c) => taken.add(c));
          out.push({ c: w, r: h, row, col });
          placed = true;
        }
      }
    }
  }
  const last = out[n - 1];
  if (last && n > 1) {
    let extra = 0;
    while (last.col + last.c + extra < cols && !taken.has(`${last.row}:${last.col + last.c + extra}`)) extra++;
    last.c += extra;
  }
  return out.map(({ c, r }) => ({ c, r }));
}

export function PhotoGrid({
  photos,
  title,
  variant = "masonry",
  ratio = "4 / 3",
  columns = "columns-2 md:columns-3",
  tone = "paper",
  showCaptions = false,
  mono = false,
}: {
  photos: Photo[];
  title: string;
  variant?: "masonry" | "grid" | "bento";
  ratio?: string;
  columns?: string;
  tone?: "paper" | "stage";
  showCaptions?: boolean;
  /** Black and white until the pointer (or focus) is on a picture, which then comes into colour (gallery-4 of the library). */
  mono?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const close = useCallback(() => setOpen(false), []);
  const spans = bentoSpans(photos.length);

  const show = (i: number, el: HTMLElement) => {
    setIndex(i);
    setOrigin(el.getBoundingClientRect());
    setOpen(true);
  };

  const button = (p: Photo, i: number) => (
    <button
      type="button"
      onClick={(e) => show(i, e.currentTarget)}
      aria-label={`Open photograph ${i + 1} of ${photos.length}: ${p.alt}`}
      className={`zoom-on-hover group relative block w-full overflow-hidden rounded-xl bg-sage-deep text-left ${tone === "stage" ? "bg-stage-raised" : ""}`}
      style={variant === "grid" ? { aspectRatio: ratio } : { aspectRatio: `${p.w} / ${p.h}` }}
    >
      <Image
        src={p.src}
        alt=""
        width={p.w}
        height={p.h}
        sizes="(min-width:1024px) 24rem, (min-width:640px) 33vw, 50vw"
        quality={80}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: p.position ?? "50% 40%" }}
      />
    </button>
  );

  return (
    <>
      {variant === "bento" ? (
        // One large picture and a mosaic of smaller ones (the first spans two columns and two rows); pictures warm from a
        // soft desaturation to full colour on hover. Under four pictures it falls back to an even grid.
        <ul className={photos.length >= 4 ? "grid auto-rows-[9.5rem] grid-cols-2 gap-2.5 sm:auto-rows-[12rem] sm:gap-3 md:grid-cols-4" : "grid grid-cols-2 gap-3 md:grid-cols-3"}>
          {photos.map((p, i) => (
            <li key={p.src} className="bento-item" data-first={photos.length >= 4 && i === 0 ? "" : undefined} style={photos.length >= 4 ? ({ "--c": spans[i].c, "--r": spans[i].r } as React.CSSProperties) : undefined}>
              <button
                type="button"
                onClick={(e) => show(i, e.currentTarget)}
                aria-label={`Open photograph ${i + 1} of ${photos.length}: ${p.alt}`}
                className={`zoom-on-hover group relative block size-full overflow-hidden rounded-xl text-left ${tone === "stage" ? "bg-stage-raised" : "bg-sage-deep"} ${photos.length < 4 ? "aspect-[4/3]" : ""}`}
              >
                <Image
                  src={p.src}
                  alt=""
                  width={p.w}
                  height={p.h}
                  sizes={i === 0 ? "(min-width:1024px) 38rem, 92vw" : "(min-width:1024px) 20rem, 46vw"}
                  quality={80}
                  className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-500 ${mono ? "grayscale-[1] contrast-[1.06] group-hover:grayscale-0 group-hover:contrast-100 group-focus-visible:grayscale-0" : "[@media(hover:hover)]:saturate-[0.8] [@media(hover:hover)]:group-hover:saturate-100"}`}
                  style={{ objectPosition: p.position ?? "50% 40%" }}
                />
                {mono ? (
                  <>
                    <span aria-hidden="true" className="absolute right-3 top-3 grid size-9 scale-90 place-items-center rounded-full bg-paper/90 text-stage opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="M16 16l4 4M11 8.5v5M8.5 11h5" />
                      </svg>
                    </span>
                    {showCaptions && p.caption && (
                      <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/75 to-transparent p-4 pt-12 text-sm font-semibold text-paper opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                        {p.caption}
                      </span>
                    )}
                  </>
                ) : (
                  showCaptions && p.caption && i === 0 && <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 text-sm text-paper">{p.caption}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : variant === "masonry" ? (
        <ul className={`${columns} gap-3 [column-fill:_balance] sm:gap-4`}>
          {photos.map((p, i) => (
            <li key={p.src} className="mb-3 break-inside-avoid sm:mb-4">
              {button(p, i)}
              {showCaptions && p.caption && <p className="meta mt-2">{p.caption}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {photos.map((p, i) => (
            <li key={p.src}>
              {button(p, i)}
              {showCaptions && p.caption && <p className="meta mt-2">{p.caption}</p>}
            </li>
          ))}
        </ul>
      )}
      <Viewer photos={open ? photos : null} index={index} origin={origin} title={title} onIndexChange={setIndex} onClose={close} />
    </>
  );
}
