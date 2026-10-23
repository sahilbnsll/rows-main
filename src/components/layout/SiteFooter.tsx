import Link from "next/link";
import { footerNav, org } from "@/content/site";
import { Facebook, LinkedIn, XSocial } from "@/components/ui/Icons";
import { PullLamp } from "@/components/ui/PullLamp";
import { PullUpWords } from "@/components/ui/PullUpWords";
import { Seal } from "@/components/ui/Seal";

const socialIcon: Record<string, React.ReactNode> = {
  Facebook: <Facebook size={20} />,
  "X (Twitter)": <XSocial size={20} />,
  LinkedIn: <LinkedIn size={20} />,
};

function Column({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-paper">{title}</h2>
      <ul className="mt-3 space-y-0.5 text-sm text-paper/70">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-9 items-center transition-colors hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The foot of every page answers the last questions in one place: who we are, where to go, how to reach us. */
export function SiteFooter() {
  return (
    <footer className="stage on-stage">
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-paper/12 py-14 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <Seal className="w-20 shrink-0 text-paper/80 sm:w-24" />
            <div>
              <p className="display text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight">{org.name}</p>
              <p className="mt-1 max-w-md text-paper/70">{org.tagline}</p>
            </div>
          </div>
          <div className="flex items-end gap-6 self-stretch md:self-auto">
            <Link href="/support" className="btn btn-primary mb-1 shrink-0 !min-h-12 !px-6">
              Support our work
            </Link>
            {/* the lamp stands on the footer's rule: pull its chain for the warm night colours */}
            <div className="relative z-10 -mb-[4.86rem] ml-auto w-[8rem] shrink-0 sm:-mb-[5.12rem] sm:w-[9.5rem] md:ml-0">
              <PullLamp className="w-full" />
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_1.4fr]">
          <Column title="The Society" links={footerNav.society} />
          <Column title="Our work" links={footerNav.work} />
          <Column title="Newsroom" links={footerNav.newsroom} />
          <div>
            <h2 className="text-sm font-semibold text-paper">Contact</h2>
            <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-paper/70">
              <p>
                {org.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <p>
                <a className="inline-flex min-h-9 items-center hover:text-paper" href={`tel:${org.phones.office.tel}`}>
                  {org.phones.office.display}
                </a>
                <span className="block text-paper/50">Open {org.hours}</span>
              </p>
              <p>
                <a className="inline-flex min-h-9 items-center break-all hover:text-paper" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </p>
            </address>
            <ul className="mt-3 flex gap-2" aria-label="Rays of Wisdom Society on social media">
              {org.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/22"
                  >
                    {socialIcon[s.label]}
                    <span className="sr-only">
                      {s.label} (opens in a new tab)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="select-none border-t border-paper/12 pb-2 pt-10 text-center">
          <PullUpWords text={org.name} className="display block text-[clamp(2.6rem,1rem+8.6vw,10.5rem)] leading-[0.95] text-paper/[0.16]" />
        </div>

        <div className="flex flex-col gap-2 border-t border-paper/12 py-6 text-xs text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {org.name} · {org.registration}
          </p>
          <p>{org.recognition}</p>
        </div>
      </div>
    </footer>
  );
}
