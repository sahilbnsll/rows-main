import Link from "next/link";
import { partners } from "@/content/partners";
import { aboutNav } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { LogoWall } from "@/components/ui/LogoWall";
import { Quote } from "@/components/ui/Quote";
import { SubNav } from "@/components/ui/SubNav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partners and sponsors",
  description: "The government bodies, cultural institutes, embassies, tourism boards and companies that support the festivals and productions of Rays of Wisdom Society.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Partners" }]}
        title="Our partners and sponsors"
        lead={`${partners.length} institutions and companies have stood behind the Society's festivals, productions and events.`}
        below={<SubNav items={aboutNav} current="/partners" label="About the Society" />}
      />
      <section aria-label="Partner logos" className="section-tight">
        <div className="wrap">
          <LogoWall partners={partners} />
        </div>
      </section>
      <section aria-label="Testimonials" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          {testimonials.slice(0, 2).map((t, i) => (
            <Quote key={t.name} text={t.quote} name={t.name} role={t.role} context={t.context} size="lg" delay={i * 90} />
          ))}
        </div>
        <div className="wrap mt-14">
          <Link href="/support" className="link-arrow">
            Support the Society as a patron
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
