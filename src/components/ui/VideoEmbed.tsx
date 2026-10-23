"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/content/videos";
import { ArrowUpRight, Play } from "./Icons";

/**
 * A YouTube video that costs nothing until it is wanted: a local thumbnail and a play button. Only after a click does it
 * load YouTube's player, through the privacy-enhanced domain, so no visitor data goes to Google just for scrolling past.
 * Videos whose owner has disabled embedding link to YouTube instead, rather than showing a broken player.
 */
export function VideoEmbed({ video, className = "", priority = false }: { video: Pick<Video, "id" | "title" | "thumbnail" | "embeddable">; className?: string; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <div className={`relative aspect-video overflow-hidden rounded-xl bg-stage ${className}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          <Image src={video.thumbnail.src} alt="" fill sizes="(min-width:1024px) 40rem, 92vw" quality={80} priority={priority} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
          {video.embeddable ? (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 grid place-items-center" aria-label={`Play video: ${video.title}`}>
              <span className="grid size-16 place-items-center rounded-full bg-paper/95 text-maroon shadow-e3 transition-transform duration-[var(--d3)] ease-[var(--ease-out)] group-hover:scale-110 group-focus-visible:scale-110">
                <Play size={22} className="translate-x-0.5" />
              </span>
            </button>
          ) : (
            <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="group absolute inset-0 grid place-items-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-paper/95 px-5 py-3 text-sm font-semibold text-ink shadow-e3">
                Watch on YouTube
                <ArrowUpRight size={14} />
              </span>
              <span className="sr-only"> {video.title} (opens in a new tab)</span>
            </a>
          )}
        </>
      )}
    </div>
  );
}
