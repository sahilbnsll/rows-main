import type { Photo } from "@/content/photo";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Frame } from "@/components/ui/Frame";
import { Sprig } from "@/components/ui/Ornaments";

/**
 * The opening of every inner page: breadcrumb, one h1, a lead line, optional actions and an optional picture cut as a
 * temple arch. `paper` is the default; `stage` is the dark auditorium surface used for productions and festival editions.
 */
export function PageHero({
  crumbs,
  title,
  lead,
  meta,
  actions,
  below,
  image,
  imageRatio = "4 / 5",
  tone = "paper",
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  below?: React.ReactNode;
  image?: Photo;
  imageRatio?: string;
  tone?: "paper" | "stage";
}) {
  const stage = tone === "stage";
  return (
    <section className={`relative isolate overflow-hidden ${stage ? "stage on-stage" : ""}`}>
      {!stage && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(46rem_26rem_at_0%_0%,rgba(176,194,140,0.28),transparent_72%),radial-gradient(40rem_24rem_at_100%_100%,rgba(232,198,191,0.22),transparent_72%)]"
          />
          <Sprig className="absolute right-0 top-4 -z-10 hidden w-40 md:block lg:w-52" flip />
        </>
      )}
      <div className="wrap pb-12 pt-6 sm:pb-16 lg:pb-20">
        <Breadcrumbs items={crumbs} tone={tone} />
        <div className={`mt-8 grid items-end gap-10 lg:mt-12 ${image ? "lg:grid-cols-[1.25fr_0.75fr] lg:gap-16" : ""}`}>
          <div className="hero-rise">
            <h1 className="page-title max-w-[18ch]">{title}</h1>
            {lead && <p className={`lead mt-6 max-w-[38rem] ${stage ? "" : "!text-ink-muted"}`}>{lead}</p>}
            {meta && <div className="meta mt-5 flex flex-wrap gap-x-6 gap-y-2">{meta}</div>}
            {actions && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{actions}</div>}
          </div>
          {image && (
            <div className="hero-rise mx-auto w-full max-w-[22rem] lg:max-w-none" style={{ animationDelay: "120ms" }}>
              <div className="arch-frame">
                <Frame photo={image} ratio={imageRatio} arch sizes="(min-width:1024px) 26rem, 22rem" priority quality={85} />
              </div>
            </div>
          )}
        </div>
        {below && <div className="mt-10">{below}</div>}
      </div>
    </section>
  );
}
