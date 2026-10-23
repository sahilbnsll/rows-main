"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { aboutNav, org, primaryNav } from "@/content/site";
import { Close, Menu } from "@/components/ui/Icons";
import { LampSwitch } from "@/components/ui/PullLamp";

const isCurrent = (pathname: string, match: string[]) => match.some((m) => pathname === m || pathname.startsWith(`${m}/`));

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The menu closes whenever the route changes.
  useEffect(() => {
    if (menu.current?.open) menu.current.close();
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-[var(--d3)] ${scrolled ? "bg-cream/95 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-cream/95"}`}>
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/brand/rays-logo.png" alt="" width={360} height={317} className="h-10 w-auto" priority />
          <span className="sr-only">{org.name}, home</span>
          <span aria-hidden="true" className="display text-[1.2rem] leading-[1.05] max-[380px]:hidden sm:text-[1.3rem]">
            Rays of Wisdom
            <span className="block text-[0.82em] text-ink-muted">Society</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {primaryNav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isCurrent(pathname, n.match) ? "page" : undefined} className="nav-link">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/support" className="btn btn-primary !min-h-10 !px-4 text-sm whitespace-nowrap">
            Support our work
          </Link>
          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            className="grid size-10 place-items-center rounded-full bg-surface shadow-e1 lg:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <dialog
        ref={menu}
        aria-label="Menu"
        onClick={(e) => e.target === e.currentTarget && menu.current?.close()}
        className="sheet m-0 ml-auto h-svh max-h-none w-[min(24rem,90vw)] max-w-none overflow-y-auto bg-cream p-0 text-ink shadow-e3"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="flex items-center gap-3">
            <Image src="/images/brand/rays-logo.png" alt="" width={360} height={317} className="h-9 w-auto" />
            <span className="display text-xl">Rays of Wisdom</span>
          </span>
          <button type="button" onClick={() => menu.current?.close()} aria-label="Close menu" className="grid size-10 place-items-center rounded-full bg-surface shadow-e1">
            <Close size={14} />
          </button>
        </div>
        <nav aria-label="Main menu" className="px-3">
          <ul>
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isCurrent(pathname, n.match) ? "page" : undefined}
                  className="display flex min-h-14 items-center rounded-xl px-3 text-[1.75rem] hover:bg-ink/[0.05] aria-[current=page]:text-maroon"
                >
                  {n.label}
                </Link>
                {n.href === "/about" && (
                  <ul className="mb-1 ml-3 flex gap-2 pb-1">
                    {aboutNav.slice(1).map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="chip">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 pb-8 pt-4">
          <Link href="/support" className="btn btn-primary w-full">
            Support our work
          </Link>
          <LampSwitch className="mt-4" />
          <p className="meta mt-6">
            <Link href="/contact" className="prose-link">
              Contact and volunteering
            </Link>
            <br />
            {org.email}
          </p>
        </div>
      </dialog>
    </header>
  );
}
