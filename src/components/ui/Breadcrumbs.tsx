import Link from "next/link";
import { ChevronRight } from "./Icons";

export interface Crumb {
  label: string;
  href?: string;
}

/** A plain breadcrumb trail. The last crumb is the current page. */
export function Breadcrumbs({ items, tone = "paper" }: { items: Crumb[]; tone?: "paper" | "stage" }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${tone === "stage" ? "text-paper/70" : "text-ink-muted"}`}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-1.5">
              {last || !c.href ? (
                <span aria-current={last ? "page" : undefined} className={tone === "stage" ? "text-paper" : "text-ink"}>
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current">
                  {c.label}
                </Link>
              )}
              {!last && <ChevronRight size={12} className="opacity-50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
