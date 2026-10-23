"use client";

import { useState } from "react";

/** A map that loads Google's embed only when asked, so the page makes no Google requests until then. */
export function MapEmbed({ src, title, linkHref }: { src: string; title: string; linkHref: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sage-deep shadow-e1 sm:aspect-[16/9]">
      {on ? (
        <iframe title={title} src={src} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <div>
            <p className="serif text-lg">Padma Palace, Nehru Place</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => setOn(true)} className="btn btn-secondary">
                Show the map
              </button>
              <a href={linkHref} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <p className="mt-3 text-sm text-ink">The map is provided by Google and loads only if you ask for it.</p>
          </div>
        </div>
      )}
    </div>
  );
}
