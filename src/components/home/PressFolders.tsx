"use client";

import Link from "next/link";
import { useCallback, useState, useSyncExternalStore } from "react";
import type { Clipping } from "@/content/press";
import type { Photo } from "@/content/photo";
import { ArrowRight } from "@/components/ui/Icons";
import { ArchiveFolder, FOLDER_CLOTH } from "@/components/ui/ArchiveFolder";
import { Viewer } from "@/components/ui/Viewer";


const narrow = "(max-width: 639px)";
function subscribe(cb: () => void) {
  const mq = window.matchMedia(narrow);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export interface PressYear {
  year: number;
  clippings: Clipping[];
}

/** One year's folder, with a caption underneath that names the clipping under the pointer in full and links to it. */
function YearFolder({ y, i, small, onOpen }: { y: PressYear; i: number; small: boolean; onOpen: (clippings: Clipping[], index: number, el: HTMLElement) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const named = y.clippings.filter((c) => c.publication);
  const shown = (named.length >= 4 ? named : y.clippings).slice(0, 4);
  const active = hover === null ? null : shown[hover];
  return (
    <div className="flex flex-col items-center">
      <ArchiveFolder
        label={String(y.year)}
        meta={`${y.clippings.length} clippings`}
        cloth={FOLDER_CLOTH[i % FOLDER_CLOTH.length]}
        width={small ? 165 : 220}
        appearDelay={i * 120}
        files={shown.map((c) => ({ name: c.publication ?? `Clipping, ${y.year}`, title: `${c.label}${c.headline ? `: ${c.headline}` : ""}. Open it large`, meta: c.date?.replace(/\s\d{4}$/, ""), image: c.photo.src }))}
        // the caption keeps the last clipping pointed at, so its link can be reached with the pointer
        onFileHover={(index) => index !== null && setHover(index)}
        onFileSelect={(_, index, el) => onOpen(y.clippings, y.clippings.indexOf(shown[index]), el)}
      />
      <div aria-live="polite" className="mt-3 min-h-[6.5rem] w-full max-w-[14rem] text-center">
        {active ? (
          <>
            <p className="text-[0.9rem] font-semibold leading-snug text-ink">{active.publication ?? "Press clipping"}</p>
            {active.headline && <p className="serif text-[0.95rem] italic leading-snug text-ink">{active.headline}</p>}
            <p className="text-[0.8rem] text-ink-muted">{active.date ?? y.year}</p>
            <Link href={`/media/print?year=${y.year}&clip=${encodeURIComponent(active.id)}`} className="link-arrow !min-h-9 text-[0.85rem]">
              Open this clipping
              <ArrowRight size={14} />
            </Link>
          </>
        ) : (
          <Link href={`/media/print?year=${y.year}`} className="link-arrow !min-h-9 text-[0.9rem]">
            All of {y.year}
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * The newspaper archive as a row of archive folders, one for each year. Point at a folder and its glass leans forward; open it and
 * the clippings with legible mastheads fan out; choose one to read every clipping of that year in the photograph viewer.
 */
export function PressFolders({ years, total }: { years: PressYear[]; total: number }) {
  const small = useSyncExternalStore(subscribe, () => window.matchMedia(narrow).matches, () => false);
  const [viewer, setViewer] = useState<{ photos: Photo[]; index: number; origin: DOMRect | null; title: string } | null>(null);
  const close = useCallback(() => setViewer(null), []);

  return (
    <section aria-labelledby="press-title" className="section-tight">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="press-title" className="section-title max-w-[18ch]">
              In the newspapers
            </h2>
            <p className="reading mt-4">
              {total} clippings from {years[years.length - 1].year} to {years[0].year}, from The Hindu to Dainik Jagran. Open a year&rsquo;s folder, point at a clipping to see what it is, choose it to read it.
            </p>
          </div>
          <Link href="/media/print" className="link-arrow">
            Browse the archive
            <ArrowRight size={16} />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 justify-items-center gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5" aria-label="The press archive by year">
          {years.map((y, i) => (
            <li key={y.year}>
              <YearFolder
                y={y}
                i={i}
                small={small}
                onOpen={(clippings, index, el) =>
                  setViewer({ photos: clippings.map((c) => ({ ...c.photo, caption: c.headline ? `${c.label}: ${c.headline}` : c.label })), index, origin: el.getBoundingClientRect(), title: `Press clippings, ${y.year}` })
                }
              />
            </li>
          ))}
        </ul>
      </div>
      <Viewer
        photos={viewer?.photos ?? null}
        index={viewer?.index ?? 0}
        origin={viewer?.origin ?? null}
        title={viewer?.title ?? ""}
        onIndexChange={(index) => setViewer((v) => (v ? { ...v, index } : v))}
        onClose={close}
      />
    </section>
  );
}
