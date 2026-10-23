"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { Clipping } from "@/content/press";
import { Viewer } from "@/components/ui/Viewer";

const PAGE = 24;
const URL_EVENT = "rws:urlchange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
}

/**
 * The press archive: every scan, filtered by year (kept in the address as ?year=2012, so a filtered view can be shared
 * and the old print-media-2012.html links land on it), shown 24 at a time, opened large in the viewer.
 */
export function PressArchive({ clippings, years }: { clippings: Clipping[]; years: number[] }) {
  // The year lives in the address (?year=2012). The server and the first client render show every year, so the page
  // arrives complete and does not jump; a visitor who arrived with ?year= then sees the filtered list.
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const fromUrl = Number(new URLSearchParams(search).get("year"));
  const year: number | "all" = years.includes(fromUrl) ? fromUrl : "all";

  const [shown, setShown] = useState(PAGE);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<DOMRect | null>(null);

  const choose = (next: number | "all") => {
    setShown(PAGE);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("year");
    else url.searchParams.set("year", String(next));
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(URL_EVENT));
  };

  const list = useMemo(() => (year === "all" ? clippings : clippings.filter((c) => c.year === year)), [clippings, year]);
  const visible = list.slice(0, shown);
  const photos = useMemo(() => list.map((c) => ({ ...c.photo, caption: c.label })), [list]);
  // ?clip=<id> (from the folders on the home page) opens that clipping straight away, until it is closed
  const clipId = new URLSearchParams(search).get("clip");
  const [dismissed, setDismissed] = useState<string | null>(null);
  const linked = clipId && clipId !== dismissed ? list.findIndex((c) => c.id === clipId) : -1;
  const viewing = open || linked >= 0;
  const viewIndex = open ? index : linked;
  const close = useCallback(() => {
    setOpen(false);
    setDismissed(clipId);
  }, [clipId]);
  const step = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div>
      <div role="group" aria-label="Filter clippings by year" className="flex flex-wrap items-center gap-2">
        <button type="button" className="chip" aria-pressed={year === "all"} onClick={() => choose("all")}>
          All years
        </button>
        {years.map((y) => (
          <button key={y} type="button" className="chip" aria-pressed={year === y} onClick={() => choose(y)}>
            {y}
          </button>
        ))}
        <p className="meta ml-2" role="status" aria-live="polite">
          {list.length} {list.length === 1 ? "clipping" : "clippings"}
          {year !== "all" ? ` from ${year}` : ""}
        </p>
      </div>

      <ul className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {visible.map((c, i) => (
          <li key={c.id} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={(e) => {
                setIndex(i);
                setOrigin(e.currentTarget.getBoundingClientRect());
                setOpen(true);
              }}
              aria-label={`Open clipping: ${c.label}`}
              className="zoom-on-hover block w-full overflow-hidden rounded-md bg-surface text-left shadow-e1 transition-shadow hover:shadow-e2"
            >
              <Image src={c.photo.src} alt="" width={c.photo.w} height={c.photo.h} sizes="(min-width:1024px) 18rem, (min-width:768px) 30vw, 46vw" quality={75} className="h-auto w-full" />
              <span className="block px-3 py-2 text-[0.8125rem] leading-snug text-ink-muted">
                {c.label}
                {c.headline && <span className="serif mt-0.5 block text-[0.9rem] italic text-ink">{c.headline}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shown < list.length && (
        <div className="mt-10 flex justify-center">
          <button type="button" className="btn btn-secondary" onClick={() => setShown((n) => n + PAGE)}>
            Show more ({list.length - shown} left)
          </button>
        </div>
      )}

      <Viewer photos={viewing ? photos : null} index={Math.max(0, viewIndex)} origin={open ? origin : null} title="Press clippings" onIndexChange={step} onClose={close} />
    </div>
  );
}
