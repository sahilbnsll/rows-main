"use client";

import { Fragment, useEffect, useRef, useState } from "react";

/**
 * Words that rise out of a hidden line one after another when they scroll into view (the "words pull up" effect of the
 * component library). The sentence is one piece of text for screen readers; with reduced motion or without JavaScript the
 * words are simply there (see .pull-word in globals.css).
 */
export function PullUpWords({ text, className = "", stagger = 90 }: { text: string; className?: string; stagger?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} data-in={seen} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <Fragment key={i}>
            <span className="pull-word">
              <span style={{ transitionDelay: `${i * stagger}ms` }}>{word}</span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
