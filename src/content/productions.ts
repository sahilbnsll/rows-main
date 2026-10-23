import { hasPhoto, photo, type Photo } from "./photo";

export interface Credit {
  name: string;
  role: string;
}

export interface Production {
  slug: string;
  /** Old page, kept for redirects. */
  oldPage: string;
  title: string;
  /** Title as printed on the old listing page. */
  fullTitle: string;
  /** Year of the premiere, for ordering and display. */
  year: number;
  premiere: string;
  /** One-line summary from the old Productions page. */
  summary: string;
  form: string;
  duration: string;
  artists: Credit[];
  creative: Credit[];
  music: Credit[];
  language?: string;
  /** Headings and paragraphs of the old page's "The Philosophy" / "Story" section. */
  textTitle: string;
  text: string[];
  quote: { text: string; source: string };
  youtubeId: string;
  embeddable: boolean;
  poster: Photo;
  photos: Photo[];
  /** The photograph shown first on cards and in the homepage index. */
  cover: Photo;
  /** Hex colours picked from the poster for the production's page accents. */
  accent: string;
}

function gallery(slug: string, title: string, numbers: string[]): Photo[] {
  return numbers
    .filter((n) => hasPhoto(`/images/productions/${slug}/${n}.jpg`))
    .map((n, i) => photo(`/images/productions/${slug}/${n}.jpg`, `Scene from ${title}, photograph ${i + 1}`));
}

const poster = (slug: string, title: string) => photo(`/images/productions/${slug}/poster.jpg`, `Poster of ${title}`);

export const productions: Production[] = [
  {
    slug: "the-vedas",
    oldPage: "prdn-vedas-eko-hum-bahu-syam.html",
    title: "The Vedas",
    fullTitle: "Vedas: Eko Hum Bahu Syam",
    year: 2017,
    premiere: "Premiered 18 March 2017",
    summary:
      "Vedas: Eko Ham Bahu Shyam showcases the different aspects of the Vedic culture and lifestyle as Vedas, the scriptures of ultimate knowledge, show the path to purge negative past karmas and fulfill all human desires while maintaining the harmony in society.",
    form: "A pure Odissi production set to soulful Vedic hymns",
    duration: "1 hr, no intermission",
    artists: [
      { name: "Reela Hota", role: "Classical dance, Odissi" },
      { name: "Asha Kumari", role: "Classical dance, Odissi" },
      { name: "Lipsa Satpathy", role: "Classical dance, Odissi" },
      { name: "Sudarshan Sahoo", role: "Classical dance, Odissi" },
      { name: "Dinabandhu Dalai", role: "Classical dance, Odissi" },
    ],
    creative: [{ name: "Yoga Guru Bijoylaxmi Hota", role: "Concept, script and dance choreography" }],
    music: [{ name: "Rajan Mishra and Swaraansh Mishra", role: "Original musical composition" }],
    textTitle: "The philosophy",
    text: [
      "The word Veda is derived from Vidya, meaning knowledge. On the one hand it propagates spiritual life, and on the other it teaches the ways of life to fulfill all human desires while living in this world. Today's lifestyle has created conflict in interpersonal and social relationships.",
      "The ashram system, as propagated in the Vedas, is the ideal way of life.",
      "Rays of Wisdom Society presented The Vedas to highlight the material, scientific and spiritual wisdom of the Vedas and bring back Vedic living in contemporary India through dance. The dance depicts the nature and philosophy of the Vedas, human desires, the ashram system and the realization of the ultimate truth, advaita, in Odissi style.",
    ],
    quote: { text: "The Reality (Truth) is ONE: the wise call It by various names.", source: "Rig Veda" },
    youtubeId: "P4PtpWvrZmM",
    embeddable: true,
    poster: poster("the-vedas", "The Vedas"),
    photos: gallery("the-vedas", "The Vedas", ["03", "01", "04", "05"]),
    cover: photo("/images/productions/the-vedas/05.jpg", "Three Odissi dancers in saffron and cream costume on a dark stage, from The Vedas"),
    accent: "#b4361f",
  },
  {
    slug: "antar-yatra",
    oldPage: "prdn-antar-yatra.html",
    title: "Antar Yatra",
    fullTitle: "Antar Yatra",
    year: 2014,
    premiere: "Premiered at the Siri Fort Auditorium, New Delhi, 2014",
    summary:
      "A fusion of Odissi, contemporary, Mayurbhanj Chhau, Rajasthani folk and Russian folk dances depicting the symbolism of the seven chakras.",
    form: "Odissi, contemporary, Mayurbhanj Chhau, Rajasthani folk and Russian folk dance",
    duration: "1 hr 15 mins, no intermission",
    artists: [
      { name: "Reela Hota", role: "Odissi" },
      { name: "Jason Macdonald and Chloe Chevaleyre", role: "Contemporary" },
      { name: "Rakesh Sai Babu and Company", role: "Mayurbhanj Chhau" },
      { name: "Iulia and Swetlana", role: "Russian folk" },
      { name: "West Zone Cultural Centre", role: "Rajasthani folk" },
    ],
    creative: [],
    music: [{ name: "Rajan Mishra and Swaraansh Mishra", role: "Original music (Maestros)" }],
    language: "English, Sanskrit, Hindi (recorded)",
    textTitle: "The philosophy",
    text: [
      "A soul evolves from chakra to chakra. Each chakra has certain attributes, and a man's nature, as well as his actions, are governed by them. One can elevate oneself to a higher chakra, to be a better human being and lead a more harmonious life.",
      "The highest chakra for animals is Mooladhara, which is the lowest one for human beings. A person whose consciousness is in this chakra, having just evolved out of the animal world, retains most of the base qualities.",
      "When man evolves to Swadhisthana, he is no longer as violent. Still unaware of the subtle aspects of life, he is absorbed in the external material world. The third chakra is Manipura, and a man of this chakra is still in the gross external world, but not focused on sensual pleasure. He seeks wealth, but only for glory and power.",
      "As the Manipura man crosses this chakra, his mind starts going inward, and he becomes more and more aware of spirituality. By the time he reaches the next chakra, Anahata, he is absolutely selfless and compassionate: he is filled with universal love.",
      "Strong positive emotions, especially intense love, push a soul up. The person reaches Visuddhi chakra fast, where the mind dwells completely on the divine, be it in the form of a deity or one's Self. Sahasrara is the highest chakra, where personal evolution ends. The person becomes complete, perfect and content.",
    ],
    quote: { text: "All the aspects of the mind must be harmonized in order to achieve true inner peace.", source: "Swami Satyananda, founder of the Bihar School of Yoga" },
    youtubeId: "Ei4TR6X6bcE",
    embeddable: true,
    poster: poster("antar-yatra", "Antar Yatra"),
    photos: gallery("antar-yatra", "Antar Yatra", ["01", "02", "03", "04", "06", "07", "09", "10", "11"]),
    cover: photo("/images/productions/antar-yatra/11.jpg", "An ensemble of dancers in orange and yellow costume in Antar Yatra"),
    accent: "#c6881a",
  },
  {
    slug: "sanskrit-the-mantra-bhasha",
    oldPage: "prdn-sanskrit-healing-language.html",
    title: "Sanskrit: The Mantra Bhasha",
    fullTitle: "Sanskrit: The Mantra Bhasha",
    year: 2013,
    premiere: "Premiered at the Ashok Banquet Hall, Chanakyapuri, New Delhi, 2013",
    summary:
      "A blend of the Indian classical dance Odissi and Western classical ballet on the healing aspect of ancient languages, in particular Sanskrit.",
    form: "Odissi and Western classical ballet",
    duration: "1 hr 15 mins, no intermission",
    artists: [
      { name: "Reela Hota", role: "Classical dance, Odissi" },
      { name: "Lipsa Dash", role: "Indian classical dance, Odissi" },
      { name: "Sudarshan Sahoo", role: "Indian classical dance, Odissi" },
      { name: "Bogdan Canila", role: "First soloist, ballet" },
      { name: "Christina Dijmaru", role: "Prime ballerina, ballet" },
      { name: "Andrea Ionette", role: "First soloist, ballet" },
    ],
    creative: [],
    music: [{ name: "Rajan Mishra and Swaraansh Mishra", role: "Original music (Maestros)" }],
    language: "Sanskrit (recorded)",
    textTitle: "The philosophy",
    text: [
      "Sanskrit is a device, not necessarily a medium of communication. Most other languages were made up because we had to refer to something. Initially they started with just a handful of words and then multiplied them into complex forms. But Sanskrit is a discovered language.",
      "When you utter a sound, a form is being created. There is a whole science of using sounds in a particular way so that it creates the right kind of form. We can create powerful forms by uttering sounds in certain arrangements. This is known as Nada Yoga, the yoga of sound. If you have mastery over the sound, you also have mastery over the form that is attached to it.",
      "In ancient India, Oum was considered to be the first primordial sound that was created. NASA has recorded the sound of the sun in deep space and compressed the inaudible waves so that human ears can hear it. The sound is precisely as ancient Indians described it in the Vedas thousands of years ago, as OUM.",
      "Aum is the first mantra, but all Sanskrit letters are mantras and can be used in their own right. Each letter is called akshara, which means imperishable, and is the eternal sound that is reverberating in the cosmos as extremely subtle frequencies. These aksharas and shabdas, or Sanskrit letters and words, are related to energy centres, which in turn are connected to the brain and can alter awareness.",
      "To showcase the profound wisdom of ancient India, a collaborative dance production of Odissi and Western classical ballet on Sanskrit: The Mantra Bhasha was presented.",
    ],
    quote: { text: "The very sound of the Sanskrit is musical.", source: "Swami Vivekananda" },
    youtubeId: "v6HpM5B6Q3c",
    embeddable: true,
    poster: poster("sanskrit-the-mantra-bhasha", "Sanskrit: The Mantra Bhasha"),
    photos: gallery("sanskrit-the-mantra-bhasha", "Sanskrit: The Mantra Bhasha", ["01", "02", "03", "04", "05", "06"]),
    cover: photo("/images/productions/sanskrit-the-mantra-bhasha/04.jpg", "Two ballerinas and a male dancer in white against a black stage, from Sanskrit: The Mantra Bhasha"),
    accent: "#2d2a26",
  },
  {
    slug: "ramleela-in-opera",
    oldPage: "prdn-ramleela-in-opera.html",
    title: "Ramleela in Opera",
    fullTitle: "Ramleela in Opera",
    year: 2014,
    premiere: "Premiered at the Siri Fort Auditorium, New Delhi, 4 December 2014",
    summary:
      "The first ever collaborative musical theatrical production on the great Indian epic, the Ramayana, featuring Italian opera and classical and tribal dances from India.",
    form: "Italian opera with Indian classical, folk and tribal dance and musical theatre",
    duration: "1 hr 15 mins, no intermission",
    artists: [
      { name: "Reela Hota", role: "Classical dance, Odissi" },
      { name: "Mattia Oliviere", role: "Opera" },
      { name: "Raffale Abette", role: "Opera" },
      { name: "Federico Beneeti", role: "Opera" },
      { name: "Abhimanyu Lal and Group", role: "Classical dance, Kathak" },
      { name: "Karnataka Kala Darshini", role: "Musical theatre" },
      { name: "Guru Manohar Lal and group", role: "Musical theatre" },
      { name: "Kumunthum Narmada", role: "Classical dance" },
    ],
    creative: [
      { name: "Marco Pucci Catena", role: "Stage direction" },
      { name: "Bijoylaxmi Hota", role: "Concept and script" },
      { name: "Jainee", role: "Costume designer" },
    ],
    music: [
      { name: "Pandit Rajan Mishra", role: "Music composition (Odissi)" },
      { name: "Antonio Cocomazzi", role: "Maestro (opera)" },
    ],
    language: "Sung in Italian, Sanskrit, Awadhi and Kannada, with titles in English",
    textTitle: "The story",
    text: [
      "The Ramayana tells the story of Rama, considered the seventh incarnation of the Hindu supreme god Vishnu, whose wife Sita is abducted by Ravana, the king of Lanka (present-day Sri Lanka). The hero lived a righteous life; in fact, that was why Indians consider him heroic. When Rama was a young boy he was the perfect son. Later he was an ideal husband to his faithful wife, Sita, and a responsible ruler.",
      "Mattia Oliviere (opera) as Rama and Reela Hota (Odissi) as Sita star in the performances. The live music is provided by a most unique and interesting mix of Indian and Western orchestra of 40 elements. Fabrizio Da Ros conducts.",
    ],
    quote: { text: "Rama and Sita are the ideals of the Indian nation.", source: "Swami Vivekananda" },
    youtubeId: "6eazvHYDi1I",
    embeddable: true,
    poster: poster("ramleela-in-opera", "Ramleela in Opera"),
    photos: gallery("ramleela-in-opera", "Ramleela in Opera", ["01", "02", "05", "06", "09", "10", "14", "15", "16"]),
    cover: photo("/images/productions/ramleela-in-opera/10.jpg", "Performers in red and gold masks and costume on a red stage, from Ramleela in Opera"),
    accent: "#a3151f",
  },
  {
    slug: "rabindra-abhivyakti",
    oldPage: "prdn-rabindra-abhivyakti.html",
    title: "Rabindra Abhivyakti",
    fullTitle: "Rabindra Abhivyakti",
    year: 2012,
    premiere: "Premiered 6 March 2012 at the Amphitheatre, The Ashok, Chanakyapuri, New Delhi",
    summary:
      "A multi-arts presentation of the yogic significance of selected poems of Rabindranath Tagore, featuring Odissi, Kathak, Gaudiya Nritya, Pung Cholom and contemporary dances.",
    form: "Odissi, Kathak, Gaudiya Nritya, Pung Cholom and contemporary dance",
    duration: "1 hr 15 mins, no intermission",
    artists: [
      { name: "Reela Hota", role: "Classical dance, Odissi" },
      { name: "Renuka Aiyer and Vipanchee", role: "Indian classical dance, Bharatanatyam" },
      { name: "Swati Sinha", role: "Indian classical dance, Kathak" },
      { name: "Kumuntham Narmada", role: "Indian classical dance, Manipuri" },
    ],
    creative: [],
    music: [{ name: "Rajan Mishra and Swaraansh Mishra", role: "Original music (Maestros)" }],
    language: "Bengali (recorded)",
    textTitle: "The philosophy",
    text: [
      "Consciousness evolves from chakra to chakra: Mooladhara is the highest chakra for animals and the lowest for humans. A person whose consciousness is at this level still retains animal qualities, unaware of and disinterested in spiritual qualities. His main, or rather only, concern is security and survival.",
      "When consciousness evolves out of the Mooladhara chakra and crosses the Manipura chakra, the person is awakened from deep ignorance and gets an inkling of his real nature, the final destination and the utter bliss of that state. He becomes eager to move forward but does not know the way.",
      "But duality is the nature of creation, and man is no exception. His energies, tendencies and desires are all opposite to each other. It requires persistent effort and divine grace to overcome this near stagnant situation. Finally, it is the ego, a common failing, that prevents the individual from reaching the spiritual destination. Only when this ego is surrendered does the seeker merge with the Supreme and attain moksha.",
      "This yogic philosophy is reflected in the poems of the highly evolved soul, Gurudev Rabindranath Tagore.",
    ],
    quote: { text: "You are Brahman.", source: "Chandogya Upanishad" },
    youtubeId: "x5Cylr8KLOM",
    embeddable: false,
    poster: poster("rabindra-abhivyakti", "Rabindra Abhivyakti"),
    photos: gallery("rabindra-abhivyakti", "Rabindra Abhivyakti", ["05", "02", "03", "04", "01"]),
    cover: photo("/images/productions/rabindra-abhivyakti/02.jpg", "Two dancers in white and red leaning into a deep bend, from Rabindra Abhivyakti"),
    accent: "#8a1c24",
  },
];

export const productionBySlug = (slug: string) => productions.find((p) => p.slug === slug);
