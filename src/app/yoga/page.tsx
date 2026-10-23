import Link from "next/link";
import { yoga } from "@/content/yoga";
import { videoById } from "@/content/videos";
import { PageHero } from "@/components/layout/PageHero";
import { Frame } from "@/components/ui/Frame";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { PhotoSpread } from "@/components/ui/PhotoSpread";
import { Book } from "@/components/ui/Book";
import { Quote } from "@/components/ui/Quote";
import { Reveal } from "@/components/ui/Reveal";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Yoga and healing",
  description: "Yoga workshops for general health and conditions such as high blood pressure and diabetes, with the Bihar School of Yoga and yoga guru Bijoylaxmi Hota.",
  path: "/yoga",
  image: yoga.proposal.photos[0].src,
});

export default function YogaPage() {
  const video = videoById("cS59ZJ-6868");
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Yoga" }]} title={yoga.title} lead={yoga.intro} image={yoga.camp.photos[0]} imageRatio="4 / 4.6" />

      <section aria-labelledby="camp-title" className="section-tight">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h2 id="camp-title" className="section-title max-w-[16ch]">
              {yoga.camp.title}
            </h2>
            <div className="reading prose-flow mt-6">
              {yoga.camp.paragraphs.map((p) => (
                <p key={p.slice(0, 28)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={90} develop>
            <Frame photo={yoga.camp.photos[1]} ratio="4 / 5" sizes="(min-width:1024px) 28rem, 92vw" className="shadow-e2" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="proposal-title" className="section bg-sage/45">
        <div className="wrap">
          <Reveal className="max-w-[44rem]">
            <h2 id="proposal-title" className="section-title max-w-[16ch]">
              {yoga.proposal.title}
            </h2>
            <p className="reading mt-5">{yoga.proposal.text}</p>
          </Reveal>
          <div className="mt-10">
            <PhotoSpread photos={[...yoga.proposal.photos, ...yoga.camp.photos]} title="Yoga with Rays of Wisdom Society" />
          </div>
        </div>
      </section>

      <section aria-labelledby="expert-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 id="expert-title" className="section-title max-w-[14ch]">
              About {yoga.expert.name}
            </h2>
            <div className="reading prose-flow mt-6">
              {yoga.expert.paragraphs.map((p) => (
                <p key={p.slice(0, 28)}>{p}</p>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
              {yoga.expert.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    {l.label}
                    <ArrowUpRight size={14} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          {video && (
            <Reveal delay={90}>
              <VideoEmbed video={video} />
              <p className="meta mt-3">{video.title}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section aria-labelledby="books-title" className="section-tight">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="books-title" className="section-title max-w-[18ch]">
                Books by {yoga.expert.name}
              </h2>
              <p className="reading mt-3">{yoga.expert.books.length} titles from her Amazon India author page, from Yoga for Busy People (2002) to Yoga for Super Immunity (2022). Each opens the book on Amazon.in.</p>
            </div>
            <a href={yoga.expert.booksUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
              All her books on Amazon.in
              <ArrowUpRight size={14} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-2 items-start gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {yoga.expert.books.map((b) => (
              <li key={b.asin}>
                <a href={`https://www.amazon.in/dp/${b.asin}`} target="_blank" rel="noopener noreferrer" className="group block">
                  <Book cover={b.cover} sizes="(min-width:1280px) 10rem, (min-width:1024px) 15vw, 45vw" />
                  <span className="mt-3 block text-sm font-semibold leading-snug group-hover:text-maroon">{b.title}</span>
                  <span className="meta mt-0.5 block !text-[0.8125rem]">
                    {b.published} · {b.format}
                  </span>
                  <span className="sr-only"> (opens Amazon.in in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="meta mt-8">Book details and covers are from Amazon.in; prices and availability change, so they are shown there only.</p>
        </div>
      </section>

      <section aria-labelledby="voices-title" className="section">
        <div className="wrap">
          <h2 id="voices-title" className="section-title">
            What participants say
          </h2>
          <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-2">
            {yoga.testimonials.map((t, i) => (
              <Quote key={t.name} text={t.quote} name={t.name} role={t.role} delay={(i % 2) * 80} />
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8">
            <p className="reading">To join a yoga workshop, or to learn Odissi at the Academy, write to us.</p>
            <Link href="/contact#learn" className="link-arrow">
              Contact the Society
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
