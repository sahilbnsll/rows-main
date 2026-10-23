import Image from "next/image";
import Link from "next/link";
import { productions } from "@/content/productions";
import { ArrowRight } from "@/components/ui/Icons";
import { ProductionsScroll } from "./ProductionsScroll";

/**
 * The Stage: the five productions, newest first. Pinned and scroll-driven for most visitors; a plain list for anyone who
 * has asked their device for reduced motion (the two versions are swapped with CSS only).
 */
export function ProductionsSection() {
  const items = [...productions].sort((a, b) => b.year - a.year);
  return (
    <section aria-labelledby="productions-title" className="stage on-stage">
      <div className="motion-reduce:hidden">
        <ProductionsScroll items={items} />
      </div>
      <div className="section wrap hidden motion-reduce:block">
        <h2 className="section-title max-w-[16ch]">Five productions, one thread</h2>
        <ol className="mt-10 divide-y divide-paper/15 border-y border-paper/15">
          {items.map((p) => (
            <li key={p.slug}>
              <Link href={`/productions/${p.slug}`} className="group grid items-center gap-5 py-6 sm:grid-cols-[14rem_1fr_auto]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <Image src={p.cover.src} alt="" fill sizes="14rem" quality={75} className="object-cover" />
                </div>
                <div>
                  <h3 className="display text-[1.9rem] leading-tight">{p.title}</h3>
                  <p className="mt-1 text-paper/70">
                    {p.year} · {p.form}
                  </p>
                </div>
                <ArrowRight size={20} />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
