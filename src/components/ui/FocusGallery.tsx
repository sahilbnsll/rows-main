"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Photo } from "@/content/photo";
import { Viewer } from "./Viewer";

/**
 * Photographs in rows, after "focus cards" in the component library: point at one and it lifts forward while the others soften
 * out of focus, its caption slides up from the bottom, and choosing it opens it large. Each picture keeps its own shape (a
 * picture's share of its row follows its proportions, so every picture in a row is the same height and none is cropped). On
 * touch screens, where there is no hover, the captions are simply shown.
 */
export function FocusGallery({ photos, title }: { photos: Photo[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <ul className="focus-grid flex flex-wrap gap-3 sm:gap-4">
        {photos.map((p, i) => {
          const ratio = p.w / p.h;
          return (
            <li key={p.src} className="focus-card min-w-0" style={{ flex: `${ratio.toFixed(3)} 1 ${(ratio * 13).toFixed(1)}rem` }}>
              <button
                type="button"
                onClick={(e) => {
                  setIndex(i);
                  setOrigin(e.currentTarget.getBoundingClientRect());
                  setOpen(true);
                }}
                aria-label={`Open photograph ${i + 1} of ${photos.length}: ${p.alt}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-sage-deep text-left shadow-e1 ring-1 ring-black/5 transition duration-500 ease-[var(--ease-out)] [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-e3 [@media(hover:hover)]:hover:ring-gold/50"
                style={{ aspectRatio: `${p.w} / ${p.h}` }}
              >
                <Image src={p.src} alt="" fill sizes="(min-width:1024px) 34rem, (min-width:640px) 50vw, 92vw" quality={80} className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100" />
                <span className="serif absolute inset-x-0 bottom-0 translate-y-0 p-4 text-[1rem] leading-snug text-paper transition duration-500 ease-[var(--ease-out)] sm:p-5 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
                  {p.alt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <Viewer photos={open ? photos : null} index={index} origin={origin} title={title} onIndexChange={setIndex} onClose={close} />
    </>
  );
}
