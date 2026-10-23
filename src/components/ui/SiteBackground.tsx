"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/** Height of one repeat of public/bg/vine.svg when it is drawn 22rem (352 px) wide. */
const VINE_TILE = 2347;

type Petal = { x: number; size: number; speed: number; spin: number; tone: "gold" | "rose" | "sage"; start: number };

/** Fourteen petals at different depths: the nearer ones (larger, faster) rise past as you read, the far ones barely move. */
const PETALS: Petal[] = [
  { x: 6, size: 26, speed: 0.34, spin: 0.09, tone: "rose", start: 0.1 },
  { x: 14, size: 15, speed: 0.16, spin: -0.07, tone: "gold", start: 0.55 },
  { x: 23, size: 20, speed: 0.26, spin: 0.12, tone: "sage", start: 0.82 },
  { x: 33, size: 12, speed: 0.12, spin: -0.05, tone: "gold", start: 0.3 },
  { x: 44, size: 22, speed: 0.3, spin: 0.08, tone: "rose", start: 0.68 },
  { x: 52, size: 13, speed: 0.14, spin: -0.1, tone: "gold", start: 0.95 },
  { x: 61, size: 18, speed: 0.22, spin: 0.06, tone: "sage", start: 0.4 },
  { x: 70, size: 28, speed: 0.38, spin: -0.11, tone: "rose", start: 0.05 },
  { x: 78, size: 14, speed: 0.15, spin: 0.09, tone: "gold", start: 0.6 },
  { x: 86, size: 21, speed: 0.28, spin: -0.07, tone: "sage", start: 0.25 },
  { x: 92, size: 16, speed: 0.19, spin: 0.1, tone: "rose", start: 0.78 },
  { x: 97, size: 11, speed: 0.1, spin: -0.06, tone: "gold", start: 0.45 },
  { x: 38, size: 17, speed: 0.2, spin: 0.07, tone: "rose", start: 0.88 },
  { x: 67, size: 10, speed: 0.09, spin: -0.09, tone: "sage", start: 0.15 },
];

const tones = { gold: "var(--gold)", rose: "var(--rose)", sage: "var(--sage-deep)" } as const;

function PetalDot({ p, height }: { p: Petal; height: number }) {
  const { scrollY } = useScroll();
  const span = height + 160;
  const y = useTransform(scrollY, (v) => ((((p.start * span - v * p.speed) % span) + span) % span) - 80);
  const rotate = useTransform(scrollY, (v) => v * p.spin);
  const sway = useTransform(scrollY, (v) => Math.sin(v / (260 + p.size * 8) + p.start * 9) * 18);
  return (
    <motion.span className="absolute top-0 block will-change-transform motion-reduce:hidden" style={{ left: `${p.x}%`, y, x: sway, rotate, width: p.size, height: p.size * 1.5, opacity: 0.55 }}>
      <svg viewBox="0 0 20 30" width="100%" height="100%" aria-hidden="true">
        <path d="M10 1 C 17 9 18 20 10 29 C 2 20 3 9 10 1 Z" fill={tones[p.tone]} fillOpacity="0.5" stroke="var(--gold)" strokeWidth="0.8" strokeOpacity="0.7" />
        <path d="M10 5 L10 26" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.55" />
      </svg>
    </motion.span>
  );
}

/**
 * The page's moving background. Everything here sits behind the content and is driven by how far you have scrolled:
 *  - sage, rose and gold washes that slide and swap places, so the colour of the paper changes as you read;
 *  - a lotus mandala in each margin that turns with the page;
 *  - a flowering vine that climbs the right-hand margin, slower than the text;
 *  - petals at different depths that rise past.
 * All of it is transform-only and fixed to the window, so it costs one small layer, however long the page. The dark Stage
 * sections cover it. With reduced motion it holds still (petals are hidden).
 */
export function SiteBackground() {
  const { scrollY } = useScroll();
  const [height, setHeight] = useState(900);
  useEffect(() => {
    const read = () => setHeight(window.innerHeight);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const blobA = { x: useTransform(scrollY, (v) => `${Math.sin(v / 1700) * 22}%`), y: useTransform(scrollY, (v) => `${Math.cos(v / 1300) * 14}%`) };
  const blobB = { x: useTransform(scrollY, (v) => `${Math.cos(v / 1500) * -20}%`), y: useTransform(scrollY, (v) => `${Math.sin(v / 1900) * 18}%`) };
  const blobC = { x: useTransform(scrollY, (v) => `${Math.sin(v / 2100 + 2) * 26}%`), y: useTransform(scrollY, (v) => `${Math.cos(v / 1700 + 1) * -16}%`) };
  const blobD = { x: useTransform(scrollY, (v) => `${Math.cos(v / 1250 + 3) * 18}%`), y: useTransform(scrollY, (v) => `${Math.sin(v / 1600 + 4) * 20}%`) };

  const mandalaRotate = useTransform(scrollY, (v) => v * 0.045);
  const mandalaDrift = useTransform(scrollY, (v) => Math.sin(v / 900) * 70);
  const mandala2Rotate = useTransform(scrollY, (v) => v * -0.035);
  const mandala2Drift = useTransform(scrollY, (v) => Math.cos(v / 1100) * -60);
  const vineY = useTransform(scrollY, (v) => -((v * 0.28) % VINE_TILE));

  // the dark Stage sections draw their own copy of the mandala and vine (see .stage in globals.css) and follow these
  useMotionValueEvent(scrollY, "change", (v) => {
    const root = document.documentElement.style;
    root.setProperty("--bg-rot", `${(v * 0.045).toFixed(2)}deg`);
    root.setProperty("--bg-vine", `${(-((v * 0.28) % VINE_TILE)).toFixed(1)}px`);
  });

  return (
    <div className="site-bg" aria-hidden="true">
      <div className="absolute inset-0 overflow-hidden">
        <motion.span className="wash wash-sage -left-[18vw] -top-[10vh] motion-reduce:!transform-none" style={blobA} />
        <motion.span className="wash wash-rose -right-[20vw] top-[6vh] motion-reduce:!transform-none" style={blobB} />
        <motion.span className="wash wash-gold -left-[14vw] bottom-[-12vh] motion-reduce:!transform-none" style={blobC} />
        <motion.span className="wash wash-sage -right-[16vw] bottom-[-18vh] motion-reduce:!transform-none" style={blobD} />

        <motion.span className="mandala-fixed left-[-19rem] top-[18vh] motion-reduce:!transform-none" style={{ rotate: mandalaRotate, y: mandalaDrift }} />
        <motion.span className="mandala-fixed mandala-fixed-sm right-[-15rem] bottom-[-6vh] motion-reduce:!transform-none" style={{ rotate: mandala2Rotate, y: mandala2Drift }} />

        <motion.span className="vine-fixed motion-reduce:!transform-none" style={{ y: vineY }} />

        {PETALS.map((p, i) => (
          <PetalDot key={i} p={p} height={height} />
        ))}
      </div>
    </div>
  );
}
