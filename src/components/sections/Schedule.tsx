import type { ScheduleDay } from "@/content/festival";
import { Reveal } from "@/components/ui/Reveal";

/** A day-by-day programme as a time column and a description, one row per item. */
export function Schedule({ days }: { days: ScheduleDay[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      {days.map((d, i) => (
        <Reveal key={d.label} delay={i * 80}>
          <h3 className="sub-title">
            {d.label}
            <span className="serif ml-3 text-[0.7em] italic text-ink-muted">{d.date}</span>
          </h3>
          <ol className="mt-5 divide-y divide-line border-y border-line">
            {d.items.map((it) => (
              <li key={it.time + it.text.slice(0, 18)} className="grid grid-cols-[4.75rem_1fr] gap-4 py-4 sm:grid-cols-[5.5rem_1fr]">
                <span className="text-sm font-semibold tabular-nums text-maroon-deep">{it.time}</span>
                <span className="reading !text-[1.02rem] !leading-snug !text-ink">{it.text}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      ))}
    </div>
  );
}
