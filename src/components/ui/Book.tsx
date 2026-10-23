import Image from "next/image";
import type { Photo } from "@/content/photo";

/** The light catching the fold of a hardback cover near the spine (from the library's book). */
const BIND =
  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0) 12%, rgba(255,255,255,0.25) 29.25%, rgba(255,255,255,0) 50.5%, rgba(255,255,255,0) 75.25%, rgba(255,255,255,0.25) 91%, rgba(255,255,255,0)), linear-gradient(90deg, rgba(0,0,0,0.03), rgba(0,0,0,0.1) 12%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.2) 73.5%, rgba(0,0,0,0.5) 75.25%, rgba(0,0,0,0.15) 85.25%, rgba(0,0,0,0))";

/**
 * A book as an object, after "book" in the component library: the real cover on the front, the fold of the binding catching the
 * light, the block of pages along the right edge and a back board behind, all in 3D. It turns to show its pages when its card is
 * pointed at (`.book-rotate` in library.css). It fills the width of its container and measures everything in container units,
 * so the same book works at any size; the cover keeps its own proportions.
 */
export function Book({ cover, sizes, board = "#3f4d24" }: { cover: Photo; sizes: string; board?: string }) {
  return (
    <div className="w-full [container-type:inline-size]" style={{ perspective: 900 }}>
      <div className="book-rotate relative w-full" style={{ aspectRatio: `${cover.w} / ${cover.h}`, transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 overflow-hidden rounded-l-[5px] rounded-r-[2px] bg-paper shadow-[0_1px_1px_rgba(0,0,0,0.04),0_6px_10px_-4px_rgba(0,0,0,0.18),0_18px_26px_-10px_rgba(0,0,0,0.22)]">
          <Image src={cover.src} alt={cover.alt} fill sizes={sizes} quality={80} className="object-cover" />
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[8.2%] mix-blend-overlay" style={{ background: BIND }} />
          <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] ring-1 ring-black/10" />
        </div>
        {/* the block of pages, standing at right angles along the fore-edge */}
        <div
          aria-hidden="true"
          className="absolute top-[3px] h-[calc(100%-6px)] w-[calc(16cqw-2px)]"
          style={{
            background: "linear-gradient(90deg, #e6dfcf, transparent 70%), repeating-linear-gradient(90deg, #fbf7ee 0 1px, #efe8d8 1px 2px)",
            transform: "translateX(calc(100cqw - 8cqw - 3px)) rotateY(90deg) translateX(8cqw)",
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 rounded-l-[5px] rounded-r-[2px]" style={{ background: board, transform: "translateZ(-16cqw)" }} />
      </div>
    </div>
  );
}
