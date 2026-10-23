"use client";

import { useActiveSection } from "@/components/ui/useActiveSection";

export interface Chapter {
  id: string;
  label: string;
}

/**
 * The sticky chapter list beside the "What we do" story: numbers that are also links, with the chapter in view marked.
 * A plain list of in-page links, so it works without JavaScript; the highlight is the only enhancement.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const active = useActiveSection(chapters.map((c) => c.id));
  return (
    <nav aria-label="Chapters" className="hidden lg:block">
      <ol className="space-y-1">
        {chapters.map((c, i) => {
          const on = (active ?? chapters[0].id) === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "location" : undefined}
                className={`group flex min-h-11 items-center gap-4 rounded-lg py-1 transition-colors duration-[var(--d2)] ${on ? "text-ink" : "text-ink-muted hover:text-ink"}`}
              >
                <span className={`display w-8 text-2xl tabular-nums transition-colors ${on ? "text-maroon" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="relative">
                  <span className="text-[1.05rem] font-semibold">{c.label}</span>
                  <span aria-hidden="true" className={`absolute -bottom-0.5 left-0 h-px bg-maroon transition-[width] duration-[var(--d3)] ease-[var(--ease-out)] ${on ? "w-full" : "w-0"}`} />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
