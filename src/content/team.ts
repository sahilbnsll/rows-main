import { hasPhoto, photo, type Photo } from "./photo";

export interface Person {
  slug: string;
  name: string;
  role: string;
  group: "founder" | "patron" | "executive";
  portrait?: Photo;
}

const p = (file: string, name: string): Photo | undefined => {
  const src = `/images/team/${file}.jpg`;
  return hasPhoto(src) ? photo(src, `Portrait of ${name}`) : undefined;
};

/**
 * Names and roles from the old site's Our Team page (members.html) and the home page team strip. The two lists
 * differ slightly (the home page adds Alka Tyagi; the team page adds S.J. Singh, V.K. Mahana, Hiti Mahendru and
 * Prakash Khandpal), so the union is shown. People without a portrait on the old site get a monogram.
 * Confirm the current list with the client.
 */
export const team: Person[] = [
  { slug: "reela-hota", name: "Reela Hota", role: "Founder Secretary | Odissi Danseuse & Yogi", group: "founder", portrait: p("reela-hota", "Reela Hota") },

  { slug: "bd-patel", name: "B.D. Patel", role: "Illustrious Patron | Former Director, UN", group: "patron", portrait: p("bhaichand-patel", "B.D. Patel") },
  { slug: "bn-yugandhar", name: "B.N. Yugandhar", role: "Illustrious Patron | Former Member Planning Commission", group: "patron", portrait: p("b-n-yugandhar", "B.N. Yugandhar") },
  { slug: "sj-singh", name: "S.J. Singh", role: "Illustrious Patron | Former Ambassador to Egypt", group: "patron" },
  { slug: "bijoylaxmi-hota", name: "Bijoylaxmi Hota", role: "Illustrious Patron | Yoga Guru and Author", group: "patron", portrait: p("bijoylaxmi-hota", "Bijoylaxmi Hota") },
  { slug: "hs-shivaprakash", name: "H.S. ShivaPrakash", role: "Illustrious Patron | Director, Tagore Centre, Berlin", group: "patron", portrait: p("h-s-shivaprakash", "H.S. ShivaPrakash") },
  { slug: "ak-sharada", name: "A.K. Sharada", role: "Illustrious Patron | Founder Chairman, RITAM", group: "patron", portrait: p("a-k-sharda", "A.K. Sharada") },
  { slug: "vk-mahana", name: "V.K. Mahana", role: "Illustrious Patron | Director, MRIU", group: "patron", portrait: p("v-k-mahana", "V.K. Mahana") },
  { slug: "ranjoo-mann", name: "Ranjoo Mann", role: "Illustrious Patron | Pro Vice Chairperson, DPS", group: "patron", portrait: p("ranjoo-mann", "Ranjoo Mann") },
  { slug: "vivien-speiser", name: "Dr Vivien M. Speiser", role: "Illustrious Patron | PhD, BC-DMT, LMHC, NCC, REAT", group: "patron", portrait: p("dr-vivien-marcow-speiser", "Dr Vivien M. Speiser") },
  { slug: "phillip-speiser", name: "Dr Phillip Speiser", role: "Illustrious Patron | Director of Arts Therapy at Whittier", group: "patron", portrait: p("dr-phillip-speiser", "Dr Phillip Speiser") },

  { slug: "mala-verma", name: "Mala Verma", role: "Vice President", group: "executive", portrait: p("mala-verma", "Mala Verma") },
  { slug: "sushil-jain", name: "Sushil Jain", role: "Treasurer | Entrepreneur", group: "executive", portrait: p("sushil-jain", "Sushil Jain") },
  { slug: "meera-grover", name: "Meera Grover", role: "Businesswoman", group: "executive", portrait: p("meera-grover", "Meera Grover") },
  { slug: "alka-tyagi", name: "Alka Tyagi", role: "Poet, Academician & Yoga Exponent", group: "executive", portrait: p("alka-tyagi", "Alka Tyagi") },
  { slug: "jyoti-lavakare", name: "Jyoti Lavakare", role: "Journalist", group: "executive", portrait: p("jyoti-lavakare", "Jyoti Lavakare") },
  { slug: "hiti-mahendru", name: "Hiti Mahendru", role: "Member | Social Worker", group: "executive" },
  { slug: "prakash-khandpal", name: "Prakash Khandpal", role: "Member | Lawyer", group: "executive" },
];

export const founder = team.find((t) => t.group === "founder")!;
export const patrons = team.filter((t) => t.group === "patron");
export const executive = team.filter((t) => t.group === "executive");

/** Splits "Illustrious Patron | Former Director, UN" into its title and affiliation. */
export function splitRole(role: string): { title: string; detail?: string } {
  const [title, ...rest] = role.split("|").map((s) => s.trim());
  return { title, detail: rest.join(" | ") || undefined };
}

/** From the old site's team page. */
export const teamQuote = { text: "You destroy darkness by your radiance.", source: "Sam Veda" };
