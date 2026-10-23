import { newsroomNav } from "@/content/site";
import { clippings, pressYears } from "@/content/press";
import { PageHero } from "@/components/layout/PageHero";
import { PressArchive } from "@/components/sections/PressArchive";
import { SubNav } from "@/components/ui/SubNav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Newsroom: the Society in print",
  description: `${clippings.length} newspaper clippings from 2011 to 2018 on Rays of Wisdom Society and the International Ancient Arts Festival, from The Hindu to Dainik Jagran.`,
  path: "/media/print",
  image: clippings.find((c) => c.publication)?.photo.src,
});

export default function PrintMediaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Newsroom", href: "/media" }, { label: "In print" }]}
        title="The Society in print"
        lead={`${clippings.length} newspaper clippings, 2011 to 2018. Choose a year, then open a clipping to read it at full size.`}
        below={<SubNav items={newsroomNav} current="/media/print" label="Newsroom" />}
      />
      <section aria-label="Press clippings" className="section-tight">
        <div className="wrap">
          <PressArchive clippings={clippings} years={pressYears} />
        </div>
      </section>
    </>
  );
}
