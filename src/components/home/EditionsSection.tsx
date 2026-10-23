import Link from "next/link";
import { editions } from "@/content/festival";
import { ArrowRight } from "@/components/ui/Icons";
import { EditionsPinned } from "./EditionsPinned";
import { EditionsRail, type RailEdition } from "./EditionsRail";

function shortVenue(v?: string) {
  if (!v) return undefined;
  return v.split(",")[0].replace(/\s*\(.*\)/, "");
}

const intro = "The festival has travelled between Delhi's auditoriums and the Indira Gandhi National Centre for the Arts, each year under a theme drawn from healing and the arts.";

/** Sixteen years of the festival, oldest first, ending with the coming edition. Scroll-driven; a plain rail for reduced motion. */
export function EditionsSection() {
  const items: RailEdition[] = [
    ...[...editions].reverse().map((e) => ({
      year: e.year,
      ordinal: e.ordinal,
      theme: e.theme,
      where: shortVenue(e.venue),
      href: `/festival/${e.slug}`,
    })),
    {
      year: 2026,
      ordinal: "9th",
      theme: "Ancient Arts. Universal Consciousness. A World Beyond Boundaries.",
      where: "Kamani Auditorium",
      href: "/festival/2026",
    },
  ];
  return (
    <section aria-labelledby="editions-title">
      <div className="motion-reduce:hidden">
        <EditionsPinned items={items} title="Every edition since 2010" intro={intro} />
      </div>
      <div className="section wrap hidden motion-reduce:block">
        <h2 className="section-title max-w-[18ch]">Every edition since 2010</h2>
        <p className="reading mt-4">{intro}</p>
        <Link href="/festival" className="link-arrow mt-2">
          About the festival
          <ArrowRight size={16} />
        </Link>
        <div className="mt-10">
          <EditionsRail items={items} />
        </div>
      </div>
    </section>
  );
}
