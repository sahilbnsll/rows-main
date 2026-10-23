import Image from "next/image";
import { splitRole, type Person } from "@/content/team";
import { Reveal } from "@/components/ui/Reveal";

/** A portrait (or a monogram where the old site had none), a name and the role as the society prints it. */
export function PersonCard({ person, delay = 0 }: { person: Person; delay?: number }) {
  const { title: roleTitle, detail: roleDetail } = splitRole(person.role);
  // Patrons all carry the same title; their affiliation is the line that tells them apart.
  const title = person.group === "patron" && roleDetail ? roleDetail : roleTitle;
  const detail = person.group === "patron" && roleDetail ? undefined : roleDetail;
  const initials = person.name
    .replace(/^(Dr|Smt|Shri|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <Reveal as="li" delay={delay} className="flex gap-5 sm:block">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-sage-deep sm:size-40" style={{ boxShadow: "0 0 0 1px var(--line), 0 0 0 6px var(--cream), 0 0 0 7px color-mix(in srgb, var(--gold) 50%, transparent)" }}>
        {person.portrait ? (
          <Image src={person.portrait.src} alt={person.portrait.alt} width={person.portrait.w} height={person.portrait.h} sizes="(min-width:640px) 10rem, 6rem" quality={80} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden="true" className="display grid h-full w-full place-items-center text-3xl text-olive sm:text-5xl">
            {initials}
          </span>
        )}
      </div>
      <div className="min-w-0 self-center sm:mt-5 sm:self-auto">
        <h3 className="display text-[1.4rem] leading-tight">{person.name}</h3>
        <p className="mt-1 text-sm font-semibold text-maroon-deep">{title}</p>
        {detail && <p className="meta mt-0.5">{detail}</p>}
      </div>
    </Reveal>
  );
}
