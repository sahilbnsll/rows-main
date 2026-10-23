"use client";

import { motion, useReducedMotion, useScroll, type MotionValue } from "framer-motion";
import { useScrub } from "@/lib/scrub";
import { useRef } from "react";

function Word({ word, range, progress, reduce }: { word: string; range: [number, number]; progress: MotionValue<number>; reduce: boolean }) {
  const opacity = useScrub(progress, range, [reduce ? 1 : 0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {" "}
    </motion.span>
  );
}

/**
 * A sentence whose words light up one after another as it scrolls through the middle of the screen. The whole sentence is
 * in the page from the start (screen readers read it normally); only its brightness is tied to the scroll position.
 * Words listed in `accent` are drawn in maroon.
 */
export function ScrollText({ text, accent = [], className = "" }: { text: string; accent?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const start = i / words.length;
          const end = Math.min(1, start + 1.6 / words.length);
          const hot = accent.some((a) => w.replace(/[^\p{L}]/gu, "").toLowerCase() === a.toLowerCase());
          return (
            <span key={i} className={hot ? "text-maroon" : undefined}>
              <Word word={w} range={[start, end]} progress={scrollYProgress} reduce={reduce} />
            </span>
          );
        })}
      </span>
    </p>
  );
}
