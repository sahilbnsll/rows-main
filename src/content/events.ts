import eventsJson from "./data/events.json";
import { photo, type Photo } from "./photo";

export const eventsIntro = {
  title: "Cultural events",
  text: "Rays of Wisdom Society has been specially commissioned to produce events for International Conferences by the different ministries of the central Government of India. Our USP is that while we showcase the varied classical and folk forms of India, the central theme of spirituality, the core of Indian traditional lifestyle, runs throughout the presentations.",
  testimonial: {
    quote: "I congratulate Rays of Wisdom Society for highlighted the deep connection between science, spirituality and ancient performing arts making it perhaps the only multi-arts event which tried to educate while entertaining",
    name: "Sri Ravindra Singh",
    role: "Secretary, Ministry of Culture, Government of India",
  },
};

export interface CulturalEvent {
  slug: string;
  oldPage: string;
  /** "March 2014" */
  when: string;
  year: number;
  title: string;
  /** The old page's own heading, kept for the page title. */
  heading: string;
  blurb: string;
  paragraphs: string[];
  image: Photo;
  logo?: Photo;
}

interface RawEvent {
  slug: string;
  oldPage: string;
  catalogueTitle: string;
  pageTitle: string;
  blurb: string;
  images: { src: string; logo: boolean }[];
  content: { tag: string; text: string }[];
}

const titles: Record<string, string> = {
  "export-award-function": "Export Award Function",
  "feel-india": "Feel India, Ministry of Tourism",
  "brics-summit": "BRICS Summit",
  "textiles-handicrafts-seminar": "International Seminar for Promotion of Exports of Indian Handicrafts",
  "south-asian-ministers-conference": "Conference of South Asian Ministers",
  "cvc-conference": "CVC Conference",
  "capam-conference": "9th CAPAM Biennial Conference and Ministerial Forum",
};

function tidy(text: string): string {
  return text
    .replace(/\bAphitheatre\b/g, "Amphitheatre")
    .replace(/Rabibdra/g, "Rabindra")
    .replace(/\s*\.\.\.\.$/, ".")
    .trim();
}

export const culturalEvents: CulturalEvent[] = (eventsJson as RawEvent[]).map((e) => {
  const [dated] = e.catalogueTitle.split(" - ");
  const [yearStr, ...monthParts] = dated.split(" ");
  const year = Number(yearStr);
  const title = titles[e.slug] ?? e.pageTitle;
  const main = e.images.find((i) => !i.logo)!;
  const logo = e.images.find((i) => i.logo);
  return {
    slug: e.slug,
    oldPage: e.oldPage,
    year,
    when: `${monthParts.join(" ")} ${year}`,
    title,
    heading: e.content.find((c) => c.tag === "h4")?.text ?? title,
    blurb: tidy(e.blurb),
    paragraphs: e.content.filter((c) => c.tag === "p").map((c) => tidy(c.text)),
    image: photo(main.src, `${title}, ${monthParts.join(" ")} ${year}`),
    logo: logo ? photo(logo.src, `Logo of ${title}`) : undefined,
  };
});

export const eventBySlug = (slug: string) => culturalEvents.find((e) => e.slug === slug);
