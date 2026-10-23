"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades content up once it scrolls into view. With `develop`, photographs inside also go from black and white to
 * colour (see .develop in globals.css); with `mask`, the block is uncovered from the bottom edge up.
 * Content is never hidden for people who prefer reduced motion or have JavaScript off (see the noscript rule in
 * the layout), and it is visible in the server-rendered HTML before any script runs only for those cases.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  develop = false,
  mask = false,
  as: Tag = "div",
  threshold = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  develop?: boolean;
  mask?: boolean;
  as?: "div" | "li" | "section" | "figure" | "article" | "p";
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as never}
      className={`${mask ? "mask-reveal" : "reveal"} ${develop ? "develop" : ""} ${className}`}
      data-in={seen}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
