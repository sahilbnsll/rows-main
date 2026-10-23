import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { VoiceNotes } from "./VoiceNotes";

/** What officials, artists and critics have said, in their own words from the society's pages, pinned up as notes you can move. */
export function Voices() {
  return (
    <section aria-labelledby="voices-title" className="section overflow-hidden bg-[linear-gradient(180deg,transparent,rgb(232_198_191/0.35)_50%,transparent)]">
      <div className="wrap">
        <Reveal>
          <h2 id="voices-title" className="section-title max-w-[18ch]">
            In their words
          </h2>
          <p className="serif mt-3 text-[1.15rem] italic text-ink-muted">Officials, diplomats, artists and critics, on the festival and the productions.</p>
        </Reveal>
        <VoiceNotes notes={testimonials} />
      </div>
    </section>
  );
}
