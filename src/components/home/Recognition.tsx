import { editions } from "@/content/festival";
import { clippings } from "@/content/press";
import { partners } from "@/content/partners";
import { productions } from "@/content/productions";
import { org } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollText } from "@/components/ui/ScrollText";
import { Seal } from "@/components/ui/Seal";

/**
 * One verifiable statement and four counts. Every number is computed from the content files on this site
 * (editions held, productions, partner logos, press scans), so none can drift from what the pages show.
 */
export function Recognition() {
  const stats = [
    { value: editions.length + 1, label: "festival editions, from 2010 to 2026" },
    { value: productions.length, label: "original productions" },
    { value: partners.length, label: "partners and sponsors" },
    { value: clippings.length, label: "press clippings kept in our archive" },
  ];
  return (
    <section aria-labelledby="recognition-title" className="section-tight">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal>
            <Seal className="mx-auto w-32 text-olive sm:w-40" />
          </Reveal>
          <Reveal delay={80}>
            <h2 id="recognition-title" className="sr-only">
              Recognition
            </h2>
            <ScrollText
              className="lead max-w-[44rem] !text-[clamp(1.5rem,1.2rem+1.3vw,2.4rem)] leading-[1.28]"
              text="Officially recognised by the Ministry of Culture, Government of India, as an Outstanding Category Organization."
              accent={["Ministry", "Culture", "Government", "India"]}
            />
            <p className="meta mt-3">
              {org.registration}, a registered non-profit based in New Delhi.
            </p>
          </Reveal>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="flex min-w-0 flex-col-reverse justify-end">
              <dt className="mt-3 max-w-[14rem] text-[0.95rem] leading-snug text-ink-muted">{s.label}</dt>
              <dd className="display text-[clamp(3rem,2.2rem+3vw,5rem)] leading-none text-ink tabular-nums">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
