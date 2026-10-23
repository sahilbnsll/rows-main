import Image from "next/image";
import Link from "next/link";
import { conference, type Speaker } from "@/content/festival-2024";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IAA Conference 2024: Religion, Consciousness and Spirituality as Expressed in Arts",
  description: "The scholars' conference of the 8th International Ancient Arts Festival, 9 and 10 November 2024, IGNCA, New Delhi: every session, speaker and topic.",
  path: "/festival/2024/conference",
});

function SpeakerRow({ s }: { s: Speaker }) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] gap-4 py-5 sm:grid-cols-[4.5rem_1fr] sm:gap-5">
      <Image src={s.portrait.src} alt="" width={s.portrait.w} height={s.portrait.h} sizes="72px" quality={75} className="size-14 rounded-full object-cover sm:size-[4.5rem]" />
      <div className="min-w-0">
        <p className="font-semibold text-ink">{s.name}</p>
        <p className="meta">{s.role}</p>
        {s.time && <p className="mt-1 text-sm font-semibold tabular-nums text-maroon-deep">{s.time}</p>}
        {s.chair ? (
          <p className="mt-2 text-sm">
            <span className="chip !min-h-0 !px-2.5 !py-0.5 !text-[0.8125rem]">Session chair</span>
          </p>
        ) : (
          s.topic && (
            <p className="serif mt-2 text-[1.05rem] italic leading-snug text-ink">
              <span className="not-italic text-ink-muted">Topic: </span>
              {s.topic}
            </p>
          )
        )}
      </div>
    </li>
  );
}

export default function ConferencePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Festival", href: "/festival" },
          { label: "2024", href: "/festival/2024" },
          { label: "Conference" },
        ]}
        title={conference.title}
        lead={conference.theme}
        meta={
          <>
            <span>{conference.dates}</span>
            <span>{conference.venue}</span>
          </>
        }
      />

      <section aria-labelledby="inaugural" className="section-tight">
        <div className="wrap">
          <h2 id="inaugural" className="sub-title">
            {conference.inaugural.title}
          </h2>
          <p className="meta mt-1">{conference.inaugural.note}</p>
          <ul className="mt-4 grid divide-y divide-line border-y border-line lg:grid-cols-2 lg:gap-x-14 lg:divide-y-0 [&>li]:border-b [&>li]:border-line">
            {conference.inaugural.speakers.map((s) => (
              <SpeakerRow key={s.name} s={s} />
            ))}
          </ul>
        </div>
      </section>

      {conference.days.map((d) => (
        <section key={d.label} aria-labelledby={`day-${d.label.replace(/\W/g, "")}`} className="section-tight">
          <div className="wrap">
            <Reveal>
              <h2 id={`day-${d.label.replace(/\W/g, "")}`} className="section-title">
                {d.label}
              </h2>
              <p className="meta mt-2">
                {d.date} · {conference.venue} · Convener: {d.convener}
              </p>
            </Reveal>
            <div className="mt-10 space-y-12">
              {d.sessions.map((s) => (
                <Reveal key={s.title} className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-14">
                  <div>
                    <h3 className="display text-[1.6rem] leading-tight">{s.title}</h3>
                    {s.heading && <p className="serif mt-1 text-[1.15rem] italic text-maroon-deep">{s.heading}</p>}
                    <p className="meta mt-2 tabular-nums">{s.time}</p>
                  </div>
                  <ul className="divide-y divide-line border-y border-line">
                    {s.speakers.map((sp) => (
                      <SpeakerRow key={s.title + sp.name} s={sp} />
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-tight">
        <div className="wrap">
          <p className="reading">{conference.closing}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6">
            <Link href="/festival/2024" className="link-arrow">
              Back to IAAF 2024
            </Link>
            <Link href="/festival/2024/exhibition" className="link-arrow">
              The exhibition
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
