import { clippings, pressYears } from "@/content/press";
import { EditionsSection } from "@/components/home/EditionsSection";
import { FestivalFeature } from "@/components/home/FestivalFeature";
import { FinalCta } from "@/components/home/FinalCta";
import { HomeHero } from "@/components/home/HomeHero";
import { MottoSection } from "@/components/home/MottoSection";
import { PartnersPreview } from "@/components/home/PartnersPreview";
import { PressFolders } from "@/components/home/PressFolders";
import { ProductionsSection } from "@/components/home/ProductionsSection";
import { Recognition } from "@/components/home/Recognition";
import { Voices } from "@/components/home/Voices";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

/** The press archive by year, newest first, for the glass folders. */
const pressByYear = pressYears.map((year) => ({ year, clippings: clippings.filter((c) => c.year === year) }));

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <HomeHero />
      <Recognition />
      <WhatWeDo />
      <FestivalFeature />
      <ProductionsSection />
      <EditionsSection />
      <Voices />
      <PressFolders years={pressByYear} total={clippings.length} />
      <PartnersPreview />
      <FinalCta />
      <MottoSection />
    </>
  );
}
