import Image from "next/image";
import Link from "next/link";
import { brand, curator, event, sponsors, type Artist, type Day, type Session } from "@/content/festival-2026";
import { gallery2026 } from "@/content/gallery-2026";
import { org } from "@/content/site";
import { FestivalJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Frame } from "@/components/ui/Frame";
import { ArrowRight, Calendar, Mail, Phone, Pin, Plus } from "@/components/ui/Icons";
import { Hills, LotusRule } from "@/components/ui/Ornaments";
import { PhotoGrid } from "@/components/ui/PhotoGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";
import { epassUrl } from "@/lib/site-url";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IAAF 2026: 9th International Ancient Arts Festival, 25 to 26 November, New Delhi",
  description: event.seoDescription.replace(" Get your e-pass.", ""),
  path: "/festival/2026",
  image: event.poster.src,
  imageAlt: event.poster.alt,
});

function ArtistItem({ a }: { a: Artist }) {
  const text = a.bio ?? a.details;
  return (
    <li className="border-t border-line first:border-t-0">
      <details className="group py-4">
        <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
          {a.thumb || a.photo ? (
            <Image
              src={(a.thumb ?? a.photo)!.src}
              alt=""
              width={96}
              height={96}
              quality={75}
              className="size-12 shrink-0 rounded-full object-cover"
              style={{ objectPosition: (a.thumb ?? a.photo)!.position ?? "50% 25%" }}
            />
          ) : (
            <span aria-hidden="true" className="display grid size-12 shrink-0 place-items-center rounded-full bg-sage-deep text-xl text-olive">
              {a.name[0]}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-ink">{a.name}</span>
            <span className="meta block">{a.role}</span>
          </span>
          {text && <Plus size={16} className="shrink-0 text-ink-muted transition-transform duration-[var(--d3)] group-open:rotate-45" />}
        </summary>
        {text && <p className="reading mt-3 !text-[1rem] sm:pl-16">{text}</p>}
      </details>
    </li>
  );
}

function SessionBlock({ s, index, day }: { s: Session; index: number; day: Day }) {
  const extra = gallery2026[s.id] ?? [];
  const photos = [...s.leadPhotos.slice(s.leadPhotos.length > 1 ? 0 : 1), ...(s.stage ? [s.stage] : []), ...(s.gallery ?? []), ...extra].filter(
    (p, i, all) => all.findIndex((q) => q.src === p.src) === i,
  );
  const main = s.leadPhotos[0];
  return (
    <Reveal as="article" className="grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" >
      <div className={`${index % 2 ? "lg:order-2" : ""}`}>
        <div className="arch-frame mx-auto max-w-[22rem]">
          <Frame photo={main} ratio="3 / 4" arch sizes="(min-width:1024px) 22rem, 80vw" />
        </div>
      </div>
      <div>
        <p className="serif italic text-ink-muted">
          {day.label}
          {s.time ? ` · ${s.time}` : ""}
        </p>
        <h3 className="section-title mt-1 !text-[clamp(1.9rem,1.4rem+2vw,3rem)]">{s.title}</h3>
        {s.tagline && <p className="serif mt-2 text-[1.15rem] italic text-maroon-deep">{s.tagline}</p>}
        {!s.hideArtForm && <p className="meta mt-1">{s.artForm}</p>}
        <p className="reading mt-4">{s.note}</p>
        <h4 className="mt-7 text-sm font-semibold">Artists</h4>
        <ul className="mt-2 border-y border-line">
          {s.artists.map((a) => (
            <ArtistItem key={a.name + a.role} a={a} />
          ))}
        </ul>
        {photos.length > 0 && (
          <div className="mt-6">
            <PhotoGrid photos={photos} title={s.title} variant="grid" ratio="1 / 1" columns="" showCaptions={false} />
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function Festival2026Page() {
  const award = event.award;
  const awardPhotos = [award.portrait, ...(gallery2026.award ?? [])];
  return (
    <>
      <FestivalJsonLd />
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(50rem_30rem_at_0%_0%,rgba(176,194,140,0.3),transparent_72%),radial-gradient(44rem_30rem_at_50%_42%,rgba(222,196,128,0.16),transparent_72%),radial-gradient(44rem_26rem_at_100%_100%,rgba(176,194,140,0.16),transparent_72%)]" />
        <div className="wrap pb-28 pt-6 sm:pb-32">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Festival", href: "/festival" }, { label: "2026" }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-4">
            <div className="hero-rise">
              <p className="serif text-[1.1rem] italic text-ink-muted">{org.name} presents</p>
              <h1 className="display mt-3 text-[clamp(2.6rem,1.1rem+5vw,5.2rem)] leading-[0.95] tracking-[-0.015em] text-ink">
                <span className="whitespace-nowrap">
                  <span className="text-[1.5em] leading-none">9</span>
                  <sup className="mr-[0.15em] align-[0.95em] text-[0.4em]">th</sup>
                  International
                </span>
                <br />
                Ancient Arts Festival <span className="whitespace-nowrap text-maroon">2026</span>
              </h1>
              <LotusRule className="mt-6 w-[min(80%,22rem)]" />
              <p className="serif mt-5 max-w-[32rem] text-[clamp(1.15rem,1rem+0.7vw,1.5rem)] font-medium italic leading-snug text-olive">{event.subtitle}</p>
              <p className="serif mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[1.2rem] font-medium text-maroon-deep">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={20} />
                  25 to 26 November 2026
                </span>
                <span className="inline-flex items-center gap-2">
                  <Pin size={20} />
                  {event.venue.name}, {event.venue.area}
                </span>
              </p>
              <p className="serif mt-2 text-ink-muted">
                Curated and directed by <span className="font-medium text-ink">Dr. {event.director}</span> · {event.timeLabel}
              </p>
              <p className="motto mt-4" aria-label={event.motto.join(", ")}>
                {event.motto.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {epassUrl ? (
                  <a href={epassUrl} className="btn btn-primary !min-h-[3.25rem] !px-7 text-base">
                    Get your e-pass
                  </a>
                ) : (
                  <a href="#visit" className="btn btn-primary !min-h-[3.25rem] !px-7 text-base">
                    Plan your visit
                  </a>
                )}
                <a href="#programme" className="link-arrow">
                  See the programme
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="hero-rise relative" style={{ animationDelay: "160ms" }}>
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[44%] -z-10 w-[125%] -translate-x-1/2 -translate-y-1/2">
                <div className="emblem-breathe">
                  <div className="emblem-turn">
                    <Image src={brand.emblem.src} alt="" width={brand.emblem.w} height={brand.emblem.h} sizes="40rem" quality={80} className="h-auto w-full select-none" />
                  </div>
                </div>
              </div>
              <Image src={brand.collage.src} alt={brand.collage.alt} width={brand.collage.w} height={brand.collage.h} sizes="(min-width:1024px) 46rem, 92vw" quality={85} priority className="h-auto w-full select-none [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]" />
            </div>
          </div>
        </div>
        <Hills className="absolute inset-x-0 bottom-0 z-10 h-24 sm:h-36" />
      </section>

      <section aria-label="Presented by" className="section-tight">
        <div className="wrap grid items-center gap-10 sm:grid-cols-2">
          <div className="flex items-center gap-5">
            <Image src={brand.rays.src} alt={brand.rays.alt} width={brand.rays.w} height={brand.rays.h} className="h-20 w-auto" />
            <p className="serif text-lg italic text-ink-muted">Presented by {org.name}</p>
          </div>
          <div>
            <p className="meta">In association with</p>
            <ul className="mt-3 flex flex-wrap gap-4">
              {sponsors.map((s) => (
                <li key={s.name} className="flex h-16 w-36 items-center justify-center rounded-2xl bg-paper p-3 shadow-e1">
                  <Image src={s.src} alt={s.name} width={s.w} height={s.h} className="max-h-full w-auto object-contain" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="about" aria-labelledby="about-title" className="section">
        <div className="wrap grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="max-w-[36rem]">
            <Reveal>
              <h2 id="about-title" className="section-title">
                {event.intro}
              </h2>
              <p className="serif mt-8 text-[clamp(1.3rem,1.15rem+0.6vw,1.6rem)] leading-[1.45] text-ink">{event.about[0]}</p>
            </Reveal>
            <div className="reading mt-6 space-y-5">
              {event.about.slice(1).map((p, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal develop delay={120}>
            <figure className="card overflow-hidden">
              <Frame photo={curator.photo} ratio="4 / 3.4" sizes="(min-width:1024px) 30rem, 92vw" className="!rounded-none" />
              <figcaption className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="serif italic text-ink-muted">Curated and directed by</p>
                    <p className="display mt-1 text-[2rem] leading-tight">{curator.name}</p>
                    <p className="mt-1 text-sm text-ink-muted">{curator.roles}</p>
                  </div>
                  <Seal className="w-20 shrink-0 text-olive sm:w-24" label="Society seal" />
                </div>
                <div className="reading mt-5 space-y-3 !text-[1.02rem]">
                  {curator.bio.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section id="programme" aria-labelledby="programme-title" className="section bg-sage/45">
        <div className="wrap">
          <Reveal>
            <h2 id="programme-title" className="section-title">
              Two evenings
            </h2>
            <p className="reading mt-4">{event.programmeIntro}</p>
            <p className="meta mt-3">Running order follows the festival&apos;s own text; per-performance times are still to be announced.</p>
          </Reveal>
          {(event.days as Day[]).map((d) => (
            <div key={d.id} className="mt-14">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line-strong pb-4">
                <h3 className="display text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)]">{d.label}</h3>
                <p className="serif text-lg italic text-maroon-deep">
                  {new Date(d.date + "T12:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}: {d.theme}
                </p>
              </div>
              <p className="reading mt-4">{d.blurb}</p>
              <div className="divide-y divide-line">
                {d.sessions.map((s, i) => (
                  <SessionBlock key={s.id} s={s} index={i} day={d} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="award" aria-labelledby="award-title" className="stage on-stage section">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal develop className="mx-auto w-full max-w-[24rem]">
            <div className="arch-frame">
              <Frame photo={award.portrait} ratio="3 / 4" arch sizes="24rem" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="serif italic text-paper/75">{award.title}</p>
              <h2 id="award-title" className="section-title mt-1">
                {award.recipient}
              </h2>
              <p className="lead mt-5 max-w-[34rem]">{award.text}</p>
            </Reveal>
            <div className="reading prose-flow mt-6">
              {award.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="serif italic !text-paper">{award.legacy}</p>
            </div>
            <h3 className="sub-title mt-12">Early years on stage</h3>
            <p className="meta mt-2">{award.archiveIntro}</p>
            <div className="mt-6">
              <PhotoGrid photos={[...award.archive.map((a) => ({ ...a.photo, caption: a.caption })), ...(gallery2026.award ?? [])]} title="Madhavi Mudgal" tone="stage" columns="columns-2 md:columns-3" showCaptions={false} />
            </div>
            <span className="sr-only">{awardPhotos.length} photographs</span>
          </div>
        </div>
      </section>

      <section id="visit" aria-labelledby="visit-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 id="visit-title" className="section-title">
              Plan your visit
            </h2>
            <dl className="mt-8 divide-y divide-line border-y border-line text-[1.02rem]">
              <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="font-semibold">When</dt>
                <dd>25 and 26 November 2026, {event.timeLabel}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="font-semibold">Where</dt>
                <dd>
                  {event.venue.name}
                  <br />
                  {event.venue.address}
                  <br />
                  <a className="prose-link" href={event.venue.mapUrl} target="_blank" rel="noopener noreferrer">
                    Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="font-semibold">By metro</dt>
                <dd>{event.venue.metro}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="font-semibold">Entry</dt>
                <dd>{epassUrl ? <a className="prose-link" href={epassUrl}>Make your e-pass</a> : "Entry details will be announced. Please contact the festival office."}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={90}>
            <h3 className="sub-title">Questions</h3>
            <ul className="mt-5 space-y-3 text-[1.02rem]">
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-1 shrink-0 text-maroon" />
                <span>
                  <span className="font-semibold">{org.coordinator2026.name}</span>, {org.coordinator2026.role}
                  <br />
                  <a className="prose-link" href={`tel:${org.coordinator2026.tel}`}>
                    {org.coordinator2026.display}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-1 shrink-0 text-maroon" />
                <span>
                  Festival office
                  <br />
                  <a className="prose-link" href={`tel:${org.phones.mobile.tel}`}>
                    {org.phones.mobile.display}
                  </a>{" "}
                  ·{" "}
                  <a className="prose-link" href={`tel:${org.phones.office.tel}`}>
                    {org.phones.office.display}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-1 shrink-0 text-maroon" />
                <a className="prose-link break-all" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </li>
            </ul>
            <p className="reading mt-8">{event.closing}</p>
            <Link href="/festival" className="link-arrow mt-3">
              All editions of the festival
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
