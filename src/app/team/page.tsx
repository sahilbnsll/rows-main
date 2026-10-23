import { aboutNav } from "@/content/site";
import { executive, founder, patrons, teamQuote } from "@/content/team";
import { PageHero } from "@/components/layout/PageHero";
import { PersonCard } from "@/components/sections/PersonCard";
import { Reveal } from "@/components/ui/Reveal";
import { SubNav } from "@/components/ui/SubNav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our team",
  description: "The founder, patrons and executive members of Rays of Wisdom Society, New Delhi.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Team" }]}
        title="The people behind the Society"
        lead="Our creative minds: the founder, the illustrious patrons who guide the Society, and the executive members who run it."
        below={<SubNav items={aboutNav} current="/team" label="About the Society" />}
      />

      <section aria-labelledby="founder-heading" className="section-tight">
        <div className="wrap">
          <h2 id="founder-heading" className="sub-title">
            Founder
          </h2>
          <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <PersonCard person={founder} />
          </ul>
        </div>
      </section>

      <section aria-labelledby="patrons-heading" className="section-tight">
        <div className="wrap">
          <h2 id="patrons-heading" className="sub-title">
            Illustrious patrons
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {patrons.map((p, i) => (
              <PersonCard key={p.slug} person={p} delay={(i % 4) * 60} />
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="exec-heading" className="section-tight">
        <div className="wrap">
          <h2 id="exec-heading" className="sub-title">
            Executive members
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {executive.map((p, i) => (
              <PersonCard key={p.slug} person={p} delay={(i % 4) * 60} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[40rem] text-center">
            <p className="display text-[clamp(1.8rem,1.4rem+1.6vw,2.8rem)] leading-tight">&ldquo;{teamQuote.text}&rdquo;</p>
            <p className="meta mt-3">{teamQuote.source}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
