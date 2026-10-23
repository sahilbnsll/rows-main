import Image from "next/image";
import Link from "next/link";
import { festivalMoments } from "@/content/festival";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Page not found", description: "This page does not exist.", path: "/404", noindex: true });

const ways = [
  { href: "/festival", label: "The festival" },
  { href: "/productions", label: "Productions" },
  { href: "/events", label: "Events" },
  { href: "/yoga", label: "Yoga" },
  { href: "/contact", label: "Contact" },
];

const postcard = festivalMoments[1];

/**
 * A lost page as a postcard from the festival, after the "404 postcard" in the component library: a print tilted on the page, the
 * Society's name turning slowly round its corner like a postmark, and wavy cancellation lines beside it.
 */
export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap flex flex-col items-center text-center">
        <div className="relative mb-14 mt-6">
          <svg aria-hidden="true" viewBox="0 0 140 140" className="absolute -left-12 -top-16 z-20 size-[8.75rem] animate-[spin_24s_linear_infinite] text-maroon motion-reduce:animate-none">
            <defs>
              <path id="postmark-circle" d="M 70,70 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" fill="none" />
            </defs>
            <circle cx="70" cy="70" r="62" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <text fill="currentColor" style={{ fontFamily: "var(--font-serif)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              <textPath href="#postmark-circle">Rays of Wisdom Society • New Delhi • IAAF •</textPath>
            </text>
          </svg>
          <div className="relative z-10 rotate-[4deg] bg-[#fbf7ee] p-3 shadow-e3 transition-transform duration-300 hover:rotate-0">
            <div className="relative h-[13.75rem] w-[min(22.5rem,80vw)] overflow-hidden">
              <Image src={postcard.src} alt={postcard.alt} fill sizes="22.5rem" quality={80} className="object-cover" priority />
            </div>
            <p className="serif mt-2 text-left text-[0.9rem] italic text-[#3b3833]">{postcard.caption}</p>
          </div>
          <svg aria-hidden="true" viewBox="0 0 100 60" className="absolute -right-20 top-1/2 h-20 w-28 -translate-y-1/2 text-ink-muted max-sm:hidden">
            {[15, 25, 35].map((y) => (
              <path key={y} d={`M 10 ${y} Q 20 ${y - 5} 30 ${y} Q 40 ${y + 5} 50 ${y} Q 60 ${y - 5} 70 ${y} Q 80 ${y + 5} 90 ${y}`} stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
            ))}
          </svg>
        </div>
        <p className="display text-[1.4rem] text-maroon">404</p>
        <h1 className="page-title mt-2 max-w-[22ch] !text-[clamp(2rem,1.5rem+2vw,3rem)]">This page has gone elsewhere, like a postcard on its way</h1>
        <p className="reading mx-auto mt-4">The address may have changed when the website was rebuilt, or it may be mistyped. These are good places to start again.</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          <li>
            <Link href="/" className="btn btn-primary">
              Back to the home page
            </Link>
          </li>
          {ways.map((w) => (
            <li key={w.href}>
              <Link href={w.href} className="chip">
                {w.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
