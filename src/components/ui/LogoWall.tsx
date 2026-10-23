import Image from "next/image";
import type { Partner } from "@/content/partners";
import { Reveal } from "./Reveal";

/**
 * Partner logos on a hairline grid. The logos are JPEGs on white, so they are multiplied into the paper (white
 * disappears into the cream) instead of sitting in white boxes.
 */
export function LogoWall({ partners, className = "" }: { partners: Partner[]; className?: string }) {
  return (
    <ul className={`grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ${className}`}>
      {partners.map((p, i) => (
        <li key={p.name} className="border-b border-r border-line">
          <Reveal delay={(i % 6) * 40} className="flex h-28 items-center justify-center p-5">
            <Image
              src={p.logo.src}
              alt={p.logo.alt}
              width={p.logo.w}
              height={p.logo.h}
              sizes="(min-width:1280px) 10rem, 40vw"
              className="max-h-full w-auto object-contain mix-blend-multiply"
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
