import { videos } from "@/content/videos";
import { newsroomNav } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SubNav } from "@/components/ui/SubNav";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Newsroom: videos",
  description: "Performances, festival coverage and television appearances of Rays of Wisdom Society and its founder Reela Hota: fifteen videos.",
  path: "/media",
  image: videos[0].thumbnail.src,
});

export default function MediaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Newsroom" }]}
        title="Newsroom"
        lead="Performances, festival coverage and television appearances. Videos load from YouTube only when you press play."
        below={<SubNav items={newsroomNav} current="/media" label="Newsroom" />}
      />
      <section aria-label="Videos" className="section-tight">
        <div className="wrap">
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <Reveal as="li" key={v.id} delay={(i % 3) * 70}>
                <VideoEmbed video={v} />
                <h2 className="mt-4 text-[1.05rem] font-semibold leading-snug">{v.title}</h2>
                {v.channel && <p className="meta mt-0.5">{v.channel}</p>}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
