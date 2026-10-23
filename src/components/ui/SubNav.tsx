import Link from "next/link";

export interface SubNavItem {
  label: string;
  href: string;
}

/** A local navigation for sibling pages (for example About, Team and Partners). Server-rendered: the current page is passed in. */
export function SubNav({ items, current, label, tone = "paper" }: { items: SubNavItem[]; current: string; label: string; tone?: "paper" | "stage" }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              aria-current={i.href === current ? "page" : undefined}
              className={`chip ${tone === "stage" ? "!text-paper !shadow-[inset_0_0_0_1px_rgb(251_247_238/0.35)] aria-[current=page]:!bg-paper aria-[current=page]:!text-stage" : ""}`}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
