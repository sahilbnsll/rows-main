import Link from "next/link";
import { curator } from "@/content/festival-2026";
import { editions, festivalMoments } from "@/content/festival";
import { productionBySlug } from "@/content/productions";
import { yoga } from "@/content/yoga";
import { StrandsWithIndex } from "@/components/sections/StrandsWithIndex";
import { aboutNav, org } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { Frame } from "@/components/ui/Frame";
import { ArrowRight } from "@/components/ui/Icons";
import { Quote } from "@/components/ui/Quote";
import { Reveal } from "@/components/ui/Reveal";
import { SubNav } from "@/components/ui/SubNav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the Society",
  description: "Rays of Wisdom Society is a Delhi based registered non-profit that propagates the wisdom behind ancient rituals and practices. Recognised by the Ministry of Culture.",
  path: "/about",
});

const strands = [
  {
    title: "A festival and symposium",
    text: "The Society holds an international convention, the International Ancient Arts Festival, to showcase the healing aspect and shared underlying commonality of various ancient cultures around the world in the field of dance, music and allied arts, as well as the beautiful connection between performing arts and the world of science.",
    href: "/festival",
    cta: "The festival",
    photo: editions[0].poster ?? festivalMoments[0],
  },
  {
    title: "Dances with a spiritual message",
    text: "It produces dances that convey a spiritual message, be it the hidden spirituality in the poems of the Nobel Laureate Rabindranath Tagore, the healing aspect of the ancient language Sanskrit, or the wisdom of the ancient Indian scriptures, the Vedas.",
    href: "/productions",
    cta: "The productions",
    photo: productionBySlug("the-vedas")!.cover,
  },
  {
    title: "Artists across traditions",
    text: "Indian dancers from the classical traditions of Odissi, Bharatanatyam and Kathak, and from the martial art forms of Mayurbhanj and Purulia Chhau and the musical theatre tradition of Yakshagana, perform seamlessly with classical western ballet artistes from Romania, contemporary dancers from the USA and opera singers from Italy.",
    href: "/productions/ramleela-in-opera",
    cta: "Ramleela in Opera",
    photo: productionBySlug("ramleela-in-opera")!.cover,
  },
  {
    title: "Yoga for health",
    text: "The Society organizes yoga general health and therapeutic workshops for diseases such as high blood pressure and diabetes.",
    href: "/yoga",
    cta: "Yoga",
    photo: yoga.proposal.photos[0],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="About Rays of Wisdom Society"
        lead={org.mission}
        below={<SubNav items={aboutNav} current="/about" label="About the Society" />}
      />

      <section aria-labelledby="work-title" className="section-tight">
        <div className="wrap">
          <StrandsWithIndex strands={strands} registration={org.registration} recognition="Recognised by the Ministry of Culture, Government of India, as an Outstanding Category Organization." />
        </div>
      </section>

      <section aria-labelledby="founder-title" className="section bg-sage/45">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal develop mask className="mx-auto w-full max-w-[24rem]">
            <div className="arch-frame">
              <Frame photo={curator.photo} ratio="4 / 5.2" arch sizes="24rem" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="serif italic text-ink-muted">Founder Secretary</p>
            <h2 id="founder-title" className="section-title mt-1">
              {curator.name}
            </h2>
            <p className="meta mt-2">{curator.roles}</p>
            <div className="reading prose-flow mt-6">
              {curator.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="meta mt-5">Founder and Director, Rays of Wisdom Society</p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Testimonials" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          {testimonials.slice(2, 4).map((t, i) => (
            <Quote key={t.name} text={t.quote} name={t.name} role={t.role} context={t.context} size="lg" delay={i * 90} />
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
            <p className="sub-title max-w-[26ch]">The people and institutions behind the work.</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/team" className="link-arrow">
                Meet the team
                <ArrowRight size={16} />
              </Link>
              <Link href="/partners" className="link-arrow">
                Our partners
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
