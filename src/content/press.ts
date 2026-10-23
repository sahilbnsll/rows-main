import raw from "./data/press-raw.json";
import { photo, type Photo } from "./photo";

export interface Clipping {
  id: string;
  year: number;
  photo: Photo;
  /** Publication, when the scan's file name tells us (about 40 do); otherwise undefined. */
  publication?: string;
  /** Date text from the file name ("15 May 2012"), if any. */
  date?: string;
  /** Headline words from the file name, if any. */
  headline?: string;
  label: string;
}

const publications = [
  "the hindu metro plus", "the hindu", "deccan herald", "mail today", "nav bharat times", "navbharat times", "the pioneer", "the speaking tree",
  "dainik jagran", "dainik bhaskar", "hindustan times edition", "the hindustan times", "hindustan times", "hindustan", "the indian express", "millennium post",
  "millinium post", "sunday business standard", "business standard", "times of india", "dna", "the sunday standard", "the asian age", "asian age",
  "the sunday guardian", "navodaya times", "the statesman",
].sort((a, b) => b.length - a.length);

const display: Record<string, string> = {
  "the hindu metro plus": "The Hindu, Metro Plus",
  "navbharat times": "Navbharat Times",
  "nav bharat times": "Navbharat Times",
  "millinium post": "Millennium Post",
  "hindustan times edition": "Hindustan Times",
  "the hindustan times": "Hindustan Times",
  "sunday business standard": "Business Standard",
  "asian age": "The Asian Age",
  dna: "DNA",
};

const months: Record<string, string> = { jan: "January", feb: "February", march: "March", mar: "March", april: "April", may: "May", june: "June", july: "July", aug: "August", sep: "September", oct: "October", nov: "November", dec: "December" };

const title = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

function describe(file: string): Pick<Clipping, "publication" | "date" | "headline"> {
  const base = file.replace(/\.jpg$/i, "").replace(/\d$/, (d, i, s) => (/[a-z]/i.test(s[i - 1]) ? "" : d));
  const m = base.match(/^(\d{4})-([a-z]+)-(?:(\d{1,2})-)?(.+)$/i);
  if (!m) return {};
  const [, year, mon, day, slugRaw] = m;
  const slug = slugRaw.replace(/-+/g, " ").toLowerCase().replace(/\biaaf( 2013)?\b/g, "").replace(/\s+/g, " ").trim();
  const pub = publications.find((p) => slug.includes(p));
  const monthName = months[mon.toLowerCase()];
  const date = [day, monthName, year].filter(Boolean).join(" ");
  if (!pub) return { date, headline: title(slug) || undefined };
  const rest = slug.replace(pub, "").replace(/\s+/g, " ").trim();
  return { publication: display[pub] ?? title(pub), date, headline: rest ? title(rest) : undefined };
}

/** All 94 newspaper scans from the old Print Media pages (2011 to 2018). */
export const clippings: Clipping[] = (raw as { file: string; year: string }[])
  .map((r) => {
    const d = describe(r.file);
    const label = d.publication
      ? `${d.publication}${d.date ? `, ${d.date}` : ""}`
      : d.date
        ? `Press clipping, ${d.date}`
        : `Press clipping, ${r.year}`;
    const src = `/images/press/${r.year}/${r.file}`;
    return {
      id: r.file.replace(/\.jpg$/i, ""),
      year: Number(r.year),
      publication: d.publication,
      date: d.date,
      headline: d.headline,
      label,
      photo: photo(src, `Newspaper clipping about Rays of Wisdom Society: ${label}`),
    };
  })
  .sort((a, b) => b.year - a.year || a.id.localeCompare(b.id, undefined, { numeric: true }));

export const pressYears = [...new Set(clippings.map((c) => c.year))].sort((a, b) => b - a);
