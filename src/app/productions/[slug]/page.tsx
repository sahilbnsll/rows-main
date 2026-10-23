import Link from "next/link";
import { notFound } from "next/navigation";
import { productionBySlug, productions } from "@/content/productions";
import { videoById } from "@/content/videos";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Frame } from "@/components/ui/Frame";
import { ArrowRight } from "@/components/ui/Icons";
import { LotusRule } from "@/components/ui/Ornaments";
import { PhotoGrid } from "@/components/ui/PhotoGrid";
import { Reveal } from "@/components/ui/Reveal";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { clip, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return productions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productionBySlug(slug);
  if (!p) return {};
  return pageMetadata({ title: p.fullTitle, description: clip(`${p.summary} ${p.premiere}.`), path: `/productions/${p.slug}`, image: p.cover.src, imageAlt: p.cover.alt });
}

function CreditList({ title, items }: { title: string; items: { name: string; role: string }[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-paper">{title}</h3>
      <dl className="mt-3 divide-y divide-paper/12 border-t border-paper/12">
        {items.map((c) => (
          <div key={c.name + c.role} className="grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[1fr_1fr]">
            <dt className="font-medium text-paper">{c.name}</dt>
            <dd className="text-paper/70">{c.role}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function ProductionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productionBySlug(slug);
  if (!p) notFound();
  const sorted = [...productions].sort((a, b) => b.year - a.year);
  const next = sorted[(sorted.findIndex((x) => x.slug === p.slug) + 1) % sorted.length];
  const video = videoById(p.youtubeId);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Productions", path: "/productions" }, { name: p.title, path: `/productions/${p.slug}` }]} />
      <section className="stage on-stage relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ background: `radial-gradient(48rem 30rem at 85% 10%, ${p.accent}66, transparent 70%)` }} />
        <div className="wrap pb-14 pt-6 sm:pb-20">
          <Breadcrumbs tone="stage" items={[{ label: "Home", href: "/" }, { label: "Productions", href: "/productions" }, { label: p.title }]} />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="hero-rise">
              <p className="serif text-lg italic text-paper/75">{p.premiere}</p>
              <h1 className="page-title mt-3 max-w-[14ch]">{p.title}</h1>
              <p className="lead mt-6 max-w-[34rem]">{p.summary}</p>
              <dl className="mt-8 grid max-w-[34rem] grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="text-paper/60">Form</dt>
                <dd>{p.form}</dd>
                <dt className="text-paper/60">Length</dt>
                <dd>{p.duration}</dd>
                {p.language && (
                  <>
                    <dt className="text-paper/60">Language</dt>
                    <dd>{p.language}</dd>
                  </>
                )}
              </dl>
            </div>
            <div className="hero-rise" style={{ animationDelay: "120ms" }}>
              <Frame photo={p.cover} ratio="4 / 3" sizes="(min-width:1024px) 40rem, 92vw" priority quality={85} className="shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h2 id="about-title" className="section-title max-w-[16ch]">
              {p.textTitle === "The story" ? "The story" : "The philosophy"}
            </h2>
            <div className="reading prose-flow mt-6">
              {p.text.map((t) => (
                <p key={t.slice(0, 30)}>{t}</p>
              ))}
            </div>
          </Reveal>
          {video && (
            <Reveal delay={90}>
              <VideoEmbed video={video} />
              <p className="meta mt-3">{video.title}</p>
              {!video.embeddable && <p className="meta mt-1">The owner of this video does not allow it to be played here, so it opens on YouTube.</p>}
            </Reveal>
          )}
        </div>
      </section>

      <section aria-labelledby="credits-title" className="stage on-stage section-tight">
        <div className="wrap">
          <h2 id="credits-title" className="sub-title">
            Artists and creative team
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <CreditList title="Artists" items={p.artists} />
            <div className="space-y-10">
              <CreditList title="Creative team" items={p.creative} />
              <CreditList title="Music" items={p.music} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="photos-title" className="section">
        <div className="wrap">
          <h2 id="photos-title" className="section-title max-w-[16ch]">
            From the stage
          </h2>
          <div className="mt-10">
            <PhotoGrid photos={p.photos} title={p.title} variant="bento" />
          </div>
        </div>
      </section>

      <section aria-label="Words of wisdom" className="section-tight">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[44rem] text-center">
            <LotusRule className="mx-auto w-44" />
            <p className="display mt-6 text-[clamp(1.8rem,1.3rem+2vw,3rem)] leading-tight">&ldquo;{p.quote.text}&rdquo;</p>
            <p className="meta mt-3">{p.quote.source}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <Link href="/productions" className="link-arrow">
              All productions
            </Link>
            <Link href={`/productions/${next.slug}`} className="link-arrow">
              Next: {next.title}
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
