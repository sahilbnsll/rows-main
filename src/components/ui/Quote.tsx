import { Reveal } from "./Reveal";

/** A quotation set as a pull quote, with its attribution. Only used for real testimonials from the society's own pages. */
export function Quote({
  text,
  name,
  role,
  context,
  size = "md",
  tone = "paper",
  delay = 0,
}: {
  text: string;
  name: string;
  role?: string;
  context?: string;
  size?: "lg" | "md";
  tone?: "paper" | "stage";
  delay?: number;
}) {
  return (
    <Reveal as="figure" delay={delay} className="relative">
      <span aria-hidden="true" className={`display absolute -left-1 -top-6 select-none text-[5rem] leading-none text-gold ${size === "lg" ? "sm:text-[7rem]" : ""}`}>
        &ldquo;
      </span>
      <blockquote
        className={`serif relative pt-8 ${size === "lg" ? "text-[clamp(1.45rem,1.15rem+1.2vw,2.3rem)] leading-[1.3]" : "text-[1.15rem] leading-[1.5]"} ${tone === "stage" ? "text-paper" : "text-ink"}`}
      >
        <p>{text}</p>
      </blockquote>
      <figcaption className={`mt-4 text-sm ${tone === "stage" ? "text-paper/70" : "text-ink-muted"}`}>
        <span className={`font-semibold ${tone === "stage" ? "text-paper" : "text-ink"}`}>{name}</span>
        {role && <span>, {role}</span>}
        {context && <span className="block text-[0.8125rem] italic">{context}</span>}
      </figcaption>
    </Reveal>
  );
}
