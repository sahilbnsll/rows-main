import type { Testimonial } from "@/content/testimonials";

/** A small seeded random generator, so the scatter is the same on the server and in every browser. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Where each note lands on the board: one per cell of a three by two grid, jittered inside its cell and tilted a few degrees,
 * so they read as cards dropped on a table rather than a grid. The longer testimonials take the top row, where there is room.
 */
function scatter(notes: Testimonial[]) {
  const rand = seeded(1980);
  const order = notes.map((t, i) => ({ t, i, len: t.quote.length })).sort((a, b) => b.len - a.len);
  return order.map(({ t, i }, k) => {
    const row = k < 3 ? 0 : 1;
    const col = [0, 2, 1, 1, 0, 2][k] ?? k % 3;
    const w = 27 + rand() * 4;
    const x = col * 33.4 + rand() * (33.4 - w);
    const y = row === 0 ? rand() * 4 : 52 + rand() * 6;
    const r = (rand() - 0.5) * 7;
    return { t, i, x, y, w, r };
  });
}

const accents = ["var(--gold)", "var(--maroon)", "var(--olive)"];

/**
 * Six real testimonials, scattered like programme cards left on a table: handmade paper, a gold mount line, a brass pin and the
 * Society's lotus. Point at one and it straightens and lifts above the others. On narrower screens they stack.
 */
export function VoiceNotes({ notes }: { notes: Testimonial[] }) {
  const placed = scatter(notes);
  return (
    <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:relative lg:mt-14 lg:block lg:h-[50rem]">
      {placed.map(({ t, i, x, y, w, r }) => (
        <li
          key={t.name}
          style={{ "--x": `${x.toFixed(2)}%`, "--y": `${y.toFixed(2)}%`, "--w": `${w.toFixed(2)}%`, "--r": `${r.toFixed(2)}deg`, "--accent": accents[i % accents.length] } as React.CSSProperties}
          className="voice-note group lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[var(--w)]"
        >
          <figure className="voice-card relative px-7 pb-6 pt-9">
            <span aria-hidden="true" className="voice-pin" />
            <span aria-hidden="true" className="display absolute left-5 top-3 text-[3.6rem] leading-none text-[var(--accent)] opacity-60">
              “
            </span>
            <blockquote className="serif relative text-[1.08rem] leading-[1.55] text-ink">{t.quote}</blockquote>
            <figcaption className="mt-5 flex items-end gap-3">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mb-1 size-5 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 3c2.5 3 2.5 7 0 10-2.5-3-2.5-7 0-10ZM12 13c3.5-2 7-1.5 9 1-3 1.8-6.5 1.5-9-1ZM12 13c-3.5-2-7-1.5-9 1 3 1.8 6.5 1.5 9-1ZM5 19h14" />
              </svg>
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-semibold text-ink">{t.name}</span>
                <span className="block text-[0.84rem] leading-snug text-ink-muted">{t.role}</span>
                {t.context && <span className="serif mt-0.5 block text-[0.86rem] italic text-maroon-deep">{t.context}</span>}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
