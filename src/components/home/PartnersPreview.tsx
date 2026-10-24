import Link from "next/link";
import { partners } from "@/content/partners";
import { ArrowRight } from "@/components/ui/Icons";
import { LogoWall } from "@/components/ui/LogoWall";
import { Reveal } from "@/components/ui/Reveal";

/** A first look at the partners; the full wall of 27 is on /partners. */
export function PartnersPreview() {
  // eleven logos and a "more" tile make twelve cells, which fills every row at 2, 3, 4 and 6 columns
  const featured = partners.slice(0, 11);
  return (
    <section aria-labelledby="partners-title" className="section">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="partners-title" className="section-title max-w-[18ch]">
              Partners and sponsors
            </h2>
            <p className="reading mt-4">Government bodies, cultural institutes, embassies, tourism boards and companies that have supported the Society&apos;s festivals and productions.</p>
          </div>
          <Link href="/partners" className="link-arrow">
            All {partners.length} partners
            <ArrowRight size={16} />
          </Link>
        </Reveal>
        <LogoWall partners={featured} className="mt-10" more={{ href: "/partners", label: `+${partners.length - featured.length}`, note: "more partners" }} />
      </div>
    </section>
  );
}
