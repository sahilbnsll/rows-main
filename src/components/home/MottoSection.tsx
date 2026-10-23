import { event } from "@/content/festival-2026";
import { MottoFlock } from "./MottoFlock";

/** The festival's motto, written in the air by a flock of gold motes just above the footer. */
export function MottoSection() {
  const words = event.motto;
  const half = Math.ceil(words.length / 2);
  const lines = [words.slice(0, half).join(" "), words.slice(half).join(" ")];
  return (
    <section aria-label="The festival's motto" className="stage on-stage overflow-hidden">
      <div className="wrap pb-4 pt-16 text-center sm:pt-20">
        <p className="serif text-[1.1rem] italic text-paper/70">The festival&rsquo;s motto</p>
      </div>
      <MottoFlock lines={lines} />
      <div className="wrap pb-14 text-center sm:pb-20">
        <p className="motto justify-center text-paper" aria-label={words.join(", ")}>
          {words.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
