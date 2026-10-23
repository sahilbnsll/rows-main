"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, } from "framer-motion";
import { useScrub } from "@/lib/scrub";
import { useRef } from "react";
import type { Photo } from "@/content/photo";

/**
 * A photograph in a fixed-ratio frame whose picture drifts slowly against the frame as the page scrolls, so the image
 * seems to sit behind a window. The picture is drawn a little larger than the frame so the edges never show.
 * With reduced motion it is a still image.
 */
export function ParallaxFrame({
  photo,
  ratio,
  sizes,
  strength = 7,
  arch = false,
  rounded = true,
  priority = false,
  quality = 82,
  className = "",
}: {
  photo: Photo;
  ratio: string;
  sizes: string;
  /** Percent of the frame height the picture travels each way. */
  strength?: number;
  arch?: boolean;
  rounded?: boolean;
  priority?: boolean;
  quality?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useScrub(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={`relative isolate overflow-hidden bg-sage-deep ${arch ? "arch" : rounded ? "rounded-2xl" : ""} ${className}`} style={{ aspectRatio: ratio }}>
      <motion.div className="absolute inset-x-0" style={{ y, top: `-${strength * 1.5}%`, bottom: `-${strength * 1.5}%` }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: photo.position ?? "50% 50%" }}
        />
      </motion.div>
    </div>
  );
}
