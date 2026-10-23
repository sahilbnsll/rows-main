import { culturalEvents, eventsIntro } from "@/content/events";
import { PageHero } from "@/components/layout/PageHero";
import { Quote } from "@/components/ui/Quote";
import { EventCards } from "@/components/sections/EventCards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cultural events",
  description: "Events produced by Rays of Wisdom Society for international conferences and ministries of the Government of India: BRICS Summit, Feel India, CAPAM, CVC and more.",
  path: "/events",
  image: culturalEvents[0].image.src,
});

export default function EventsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]} title={eventsIntro.title} lead={eventsIntro.text} />

      <section aria-label="Events produced" className="section-tight">
        <div className="wrap">
          <EventCards events={culturalEvents} />
        </div>
      </section>

      <section className="section">
        <div className="wrap max-w-[56rem]">
          <Quote size="lg" text={eventsIntro.testimonial.quote} name={eventsIntro.testimonial.name} role={eventsIntro.testimonial.role} />
        </div>
      </section>
    </>
  );
}
