"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/photo";
import { Viewer } from "./Viewer";

/**
 * Photographs dealt out from a single pile, after "gallery" (PhotoGallery) in the component library: they sit stacked in the middle
 * until the row scrolls into view, then spring out side by side one after another, each print tilted a little. Point at one and it
 * straightens, grows and comes to the front; choose it to see it large. With reduced motion they are simply laid out.
 */
export function PhotoSpread({ photos, title }: { photos: Photo[]; title: string }) {
  const row = useRef<HTMLDivElement>(null);
  const seen = useInView(row, { once: true, amount: 0.4 });
  const [width, setWidth] = useState(1000);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = photos.length;
  const card = width < 640 ? 150 : 230;
  const step = n > 1 ? Math.min(card * 0.92, (width - card) / (n - 1)) : 0;

  return (
    <>
      <div ref={row} className="relative mx-auto flex h-[15rem] w-full items-center justify-center sm:h-[20rem]">
        <div className="relative" style={{ width: card, height: card }}>
          {photos.map((p, i) => {
            const x = (i - (n - 1) / 2) * step;
            const tilt = (i % 2 ? 1 : -1) * (1.5 + ((i * 37) % 3));
            return (
              <motion.button
                key={p.src}
                type="button"
                aria-label={`Open photograph ${i + 1} of ${n}: ${p.alt}`}
                onClick={(e) => {
                  setIndex(i);
                  setOrigin(e.currentTarget.getBoundingClientRect());
                  setOpen(true);
                }}
                className="absolute inset-0 overflow-hidden rounded-[1.4rem] bg-paper p-1.5 shadow-e2 outline-offset-4"
                style={{ zIndex: n - Math.abs(Math.round(i - (n - 1) / 2)) }}
                initial={false}
                animate={seen ? { x, y: (i % 3) * 8, rotate: tilt } : { x: 0, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 12, mass: 1, delay: seen ? i * 0.12 : 0 }}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                whileFocus={{ scale: 1.1, rotate: 0, zIndex: 50 }}
              >
                <span className="relative block size-full overflow-hidden rounded-[1.1rem]">
                  <Image src={p.src} alt="" fill sizes="15rem" quality={75} className="object-cover" style={{ objectPosition: p.position ?? "50% 40%" }} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
      <Viewer photos={open ? photos : null} index={index} origin={origin} title={title} onIndexChange={setIndex} onClose={close} />
    </>
  );
}
