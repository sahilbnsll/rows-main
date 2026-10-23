import Link from "next/link";
import { notFound } from "next/navigation";
import { culturalEvents, eventBySlug } from "@/content/events";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { clip, pageMetadata } from "@/lib/seo";
import Image from "next/image";

export function generateStaticParams() {
  return culturalEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = eventBySlug(slug);
  if (!e) return {};
  return pageMetadata({ title: `${e.title}, ${e.when}`, description: clip(e.paragraphs.join(" ")), path: `/events/${e.slug}`, image: e.image.src, imageAlt: e.image.alt });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = eventBySlug(slug);
  if (!e) notFound();
  const i = culturalEvents.findIndex((x) => x.slug === e.slug);
  const next = culturalEvents[(i + 1) % culturalEvents.length];
  const [lead, ...rest] = e.paragraphs;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: e.title, path: `/events/${e.slug}` }]} />
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: e.title }]} title={e.title} lead={lead} meta={<span>{e.when}</span>} />
      <section className="section-tight">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <Reveal develop>
            <Frame photo={e.image} ratio={`${e.image.w} / ${e.image.h}`} sizes="(min-width:1024px) 44rem, 92vw" quality={85} className="shadow-e2" />
          </Reveal>
          <Reveal delay={90}>
            <div className="reading prose-flow">
              {rest.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
            {e.logo && (
              <div className="mt-8 w-40 rounded-xl bg-paper p-3 shadow-e1">
                <Image src={e.logo.src} alt={e.logo.alt} width={e.logo.w} height={e.logo.h} sizes="10rem" className="h-auto w-full" />
              </div>
            )}
          </Reveal>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <Link href="/events" className="link-arrow">
              All events
            </Link>
            <Link href={`/events/${next.slug}`} className="link-arrow">
              Next: {next.title}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
