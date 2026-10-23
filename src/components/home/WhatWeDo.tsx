import Link from "next/link";
import { photos } from "@/content/festival-2026";
import { culturalEvents } from "@/content/events";
import { productions } from "@/content/productions";
import { yoga } from "@/content/yoga";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { ChapterRail } from "./ChapterRail";

const events = culturalEvents.find((e) => e.slug === "brics-summit")!;

/** What the Society does, in four chapters. The summaries come from the old About page and the sections it links to. */
const chapters = [
  {
    id: "festival",
    label: "The festival",
    title: "An international festival and symposium on the healing power of ancient arts",
    text: "The International Ancient Arts Festival shows the healing aspect and the shared common ground of ancient cultures in dance, music and allied arts, and the connection between the performing arts and the world of science.",
    href: "/festival",
    cta: "The festival and its editions",
    photo: photos.mantraTemple,
    ratio: "3 / 2",
  },
  {
    id: "productions",
    label: "Productions",
    title: "Dances that carry a spiritual message",
    text: "The hidden spirituality in the poems of Rabindranath Tagore, the healing aspect of Sanskrit, the wisdom of the Vedas. Indian classical dancers perform seamlessly with ballet artistes from Romania, contemporary dancers from the USA and opera singers from Italy.",
    href: "/productions",
    cta: "The five productions",
    photo: productions[0].cover,
    ratio: "3 / 2",
  },
  {
    id: "events",
    label: "Cultural events",
    title: "Culture for conferences and ministries",
    text: "The Society has been commissioned to produce events for international conferences by ministries of the Government of India. While it showcases the classical and folk forms of India, spirituality runs through every presentation.",
    href: "/events",
    cta: "Events we have produced",
    photo: events.image,
    ratio: "3 / 2",
  },
  {
    id: "yoga",
    label: "Yoga",
    title: "Yoga for health and healing",
    text: "General health and therapeutic yoga workshops for conditions such as high blood pressure and diabetes, in association with the Bihar School of Yoga and yoga guru Bijoylaxmi Hota.",
    href: "/yoga",
    cta: "Yoga at the Society",
    photo: yoga.proposal.photos[0],
    ratio: "3 / 2",
  },
];

export function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do" className="section bg-sage/45">
      <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 id="what-we-do" className="section-title">
                What we do
              </h2>
              <p className="reading mt-4">Four strands of work, all drawing on the wisdom of ancient arts and practices.</p>
            </Reveal>
            <div className="mt-10">
              <ChapterRail chapters={chapters.map((c) => ({ id: c.id, label: c.label }))} />
            </div>
          </div>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {chapters.map((c, i) => (
            <article key={c.id} id={c.id} className="scroll-mt-28">
              <Reveal develop mask>
                <ParallaxFrame photo={c.photo} ratio={c.ratio} sizes="(min-width:1024px) 46rem, 92vw" className="shadow-e2" />
              </Reveal>
              <Reveal delay={80} className="mt-7 max-w-[36rem]">
                <p className="serif text-ink-muted">
                  <span className="display text-maroon">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true"> · </span>
                  {c.label}
                </p>
                <h3 className="sub-title mt-2">{c.title}</h3>
                <p className="reading mt-4">{c.text}</p>
                <Link href={c.href} className="link-arrow mt-3">
                  {c.cta}
                  <ArrowRight size={16} />
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
