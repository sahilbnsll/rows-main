import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { LotusRule } from "@/components/ui/Ornaments";
import { Reveal } from "@/components/ui/Reveal";

const ways = [
  {
    title: "Become a patron",
    text: "Donations are fully tax-deductible under 80G. Patrons receive priority seating, acknowledgement on the website and event announcements, and a vote for the Ancient Arts Award.",
    href: "/support",
    cta: "How to give",
  },
  {
    title: "Volunteer with us",
    text: "We seek volunteers to help with project work, organise events, raise funds and support campaigns. Write to us with your CV.",
    href: "/contact#volunteer",
    cta: "Volunteering",
  },
  {
    title: "Invite us to perform",
    text: "We work with international classical and folk artistes on thematic subjects, with durations and numbers of dancers to suit different budgets.",
    href: "/contact#invite",
    cta: "Invite the Society",
  },
];

/** The closing call to action, in the festival page's one dignified band of maroon. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="moving-backdrop relative isolate overflow-hidden bg-maroon-band text-paper">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_26rem_at_90%_0%,rgba(180,141,60,0.22),transparent_70%),radial-gradient(36rem_24rem_at_0%_100%,rgba(0,0,0,0.3),transparent_70%)]" />
      <div className="wrap grid gap-14 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <h2 id="cta-title" className="display text-[clamp(2.4rem,1.5rem+3.4vw,4.4rem)] leading-[1.02]">
            Help keep the arts alive
          </h2>
          <LotusRule className="mt-6 w-56" color="var(--gold)" />
          <p className="serif mt-6 max-w-[28rem] text-[1.2rem] leading-relaxed text-paper/80">Arts are essential to the proper functioning of society. Join in our efforts: give, volunteer, or bring the Society to your stage.</p>
        </Reveal>
        <ul className="divide-y divide-paper/20 border-y border-paper/20">
          {ways.map((w, i) => (
            <Reveal key={w.title} as="li" delay={i * 90}>
              <Link href={w.href} className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
                <span>
                  <span className="display block text-[1.75rem] leading-tight">{w.title}</span>
                  <span className="mt-2 block max-w-[34rem] text-[0.98rem] leading-relaxed text-paper/75">{w.text}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-paper">
                  {w.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
