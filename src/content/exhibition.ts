import artistsJson from "./data/exhibition-artists.json";
import { photo, type Photo } from "./photo";

export interface Artwork {
  photo: Photo;
  title: string;
  size: string;
  medium: string;
}

export interface ExhibitionArtist {
  slug: string;
  name: string;
  tagline: string;
  portrait: Photo;
  works: Artwork[];
  bio: string[];
  /** First sentence of the biography, for the listing. */
  blurb: string;
}

export const exhibition = {
  title: "International Ancient Arts Exhibition 2024",
  subtitle: "Metaphysical, Symbolic and Healing Nature",
  venue: "Darshana Art Gallery, IGNCA, New Delhi",
  dates: "8 to 10 November 2024",
  curator: "Dr Reela Hota",
  design: "Design layout and execution: Sanya Tyagi",
  intro: [
    "The International Ancient Arts Exhibition highlighted the \"Metaphysical, Symbolic and Healing Aspects of Nature\" as depicted through visual arts. Smt. Sangeeta Gupta's series Adiyogi symbolizes the essence of Shakti, femininity and feminism; the powerful works of Smt. Ragini Upadhyay's series Ashes put forth her healing from the loss of her beloved daughter and mother in the same year; Smt. Aashima Mehrotra's work Cosmic Resonance explores the vibrational nature of the universe, paralleled by the Naad series by Shri Tarun Sharma, while the explorations of the self in Shri Amit Kalla's work In Within lead you on a journey of introspection.",
    "Shri Abhay K's Shoonyata and Nidhi Choudhary's Dervish series bring forth a longing to connect with the emptiness of the ultimate state. Whether the healing nature of Smt. Zuzana Mezencevová's portrayal, or Smt. Nivedita Bandil's and Dr Nitin Madan's depiction of devotion in the transcendental symbol of Krishna, or Shri Anand Bekwad's depiction of the ancient city of Varanasi, we see art as a medium for expression, reflection and evolution, a powerful tool for mental well-being. Indu Tripathy's series on meditation and Lakshman Prasad's Devi reiterate the meditative and symbolic aspects of artistic expression.",
  ],
};

interface RawArtist {
  slug: string;
  name: string;
  tagline: string;
  portrait: string;
  works: { src: string; title: string; size: string; medium: string }[];
  bio: string[];
}

function tidyBio(a: RawArtist): string[] {
  // Some old pages repeat the artist's name as a heading line before the paragraph.
  return a.bio.map((p) => p.replace(/^(Dr\. Nitin Madan \(P\.C\.S\))\s+(?=Dr\. Nitin)/, "").trim()).filter(Boolean);
}

function firstSentence(text: string): string {
  const m = text.match(/^.*?[.!?](?=\s|$)/);
  return (m ? m[0] : text).trim();
}

export const exhibitionArtists: ExhibitionArtist[] = (artistsJson as RawArtist[]).map((a) => {
  const bio = tidyBio(a);
  return {
    slug: a.slug,
    name: a.name.replace(/^Smt\.\s+/, "").trim(),
    tagline: a.tagline,
    portrait: photo(a.portrait, `Portrait of ${a.name.replace(/^Smt\.\s+/, "")}`),
    works: a.works.map((w) => ({
      photo: photo(w.src, `${w.title}, ${w.medium.toLowerCase()} by ${a.name.replace(/^Smt\.\s+/, "")}`),
      title: w.title,
      size: w.size,
      medium: w.medium,
    })),
    bio,
    blurb: firstSentence(bio[0] ?? a.tagline),
  };
});

export const exhibitionArtistBySlug = (slug: string) => exhibitionArtists.find((a) => a.slug === slug);

/** Cover artworks shown on the exhibition page header (the old page header used these). */
export const exhibitionHighlights: Photo[] = [
  photo("/images/exhibition/2024/highlights/11.jpg", "Radha and Krishna in profile, a painting from the 2024 exhibition"),
  photo("/images/exhibition/2024/highlights/04.jpg", "Dancing figures in orange and blue, a painting from the 2024 exhibition"),
  photo("/images/exhibition/2024/highlights/05.jpg", "Gold and orange discs in a painting from the 2024 exhibition"),
  photo("/images/exhibition/2024/highlights/13.jpg", "Colourful rooftops of an ancient city in a painting from the 2024 exhibition"),
];
