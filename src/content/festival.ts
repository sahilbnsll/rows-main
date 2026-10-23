import { hasPhoto, photo, type Photo } from "./photo";

export const festivalIntro = {
  title: "The International Ancient Arts Festival",
  summary: "The International Ancient Arts Festival (IAAF) is also a symposium. It is an annual event organized by the Rays of Wisdom Society.",
  whyTitle: "Why an ancient arts festival, and why healing?",
  why: [
    "Modern urban living has spawned a host of physical and psycho-social problems both at the individual and at the collective level. This has resulted in human society becoming increasingly ill, aggressive and intolerant. Alleviation of such ailments through art and spirituality, and the creation of a healthier, happier society, is the ultimate goal of our venture, the Ancient Arts Symposium/Festival. It is with this vision, to increase awareness of the need to encourage appreciation of art among people, that this Festival/Symposium was conceptualized.",
    "The Ancient Arts Festival is an array of multi-cultural dance and music presentations by performers, while the symposium sessions are dedicated to presenting research on the healing power of different ancient art forms. All ancient cultures recognized the deep relationship between creativity and spirituality, and the healing potential of art.",
    "As the first ever international event of its kind in India, the symposium has had respected scholars and experts from reputed universities, from fields as diverse as music, dance, poetry, theatre, education and sociology, present their research on the effect of various arts on the human body. Renowned performers from cultures across the world participate in the festival.",
  ],
};

export interface Edition {
  year: number;
  /** Only where the society's own pages or videos say so. */
  ordinal?: string;
  slug: string;
  oldPage: string;
  title: string;
  theme: string;
  dates?: string;
  venue?: string;
  /** Body paragraphs from the old edition page, lightly edited for typos. */
  paragraphs: string[];
  /** One sentence for lists. */
  blurb: string;
  poster?: Photo;
  posterAlt?: string;
  youtubeId?: string;
  /** Extra pictures (invitation cards and such) */
  extras?: Photo[];
}

const poster = (year: number, alt: string) => {
  const src = `/images/festival/${year}/poster.jpg`;
  return hasPhoto(src) ? photo(src, alt) : undefined;
};

/** Newest first. 2026 is on its own page (festival-2026.ts). */
export const editions: Edition[] = [
  {
    year: 2024,
    ordinal: "8th",
    slug: "2024",
    oldPage: "iaaf-2024.html",
    title: "8th International Ancient Arts Festival | Symposium | Exhibition",
    theme: "Healing through Creative Arts across Cultures",
    dates: "8 to 10 November 2024",
    venue: "Indira Gandhi National Centre for the Arts (IGNCA), Janpath, New Delhi",
    blurb: "Three days of dance, music, a scholars' conference and an exhibition of visual art at IGNCA.",
    paragraphs: [
      "The 8th International Ancient Arts Festival | Symposium | Exhibition was organized by Rays of Wisdom Society, supported by the Ministry of Culture, Government of India, in collaboration with IGNCA and the Religion, Consciousness and Spirituality Group. The three-day event showcased the therapeutic aspects and commonalities shared by ancient cultures around the globe through dance, music and related arts.",
      "Throughout history, cultures across the globe have harnessed the power of arts not only for aesthetic pleasure but also for healing and spiritual growth. For instance, Indian classical dances stem from yogic postures, the aim being to achieve perfect balance and harmony. Ragas and certain notes can help calm nerves, soothe the agitation of the mind, and strengthen nerves. Paintings involve colours, and colours affect the mind, especially our emotional responses, very powerfully. Keeping these factors in mind, Dr Reela Hota curated this festival to include performances, discussions, and display of a varied form of arts.",
      "She says: \"Art is a definite stress buster. It helps activate the parasympathetic nervous system that helps calm the brain, slow down the heartbeat and relax the muscles. A society that encourages its people to actively involve artistic pursuits in their daily lives helps create a more humane world because they are more balanced and likely to live in greater harmony with themselves and tolerance with others.\"",
      "On the first evening, Reela Hota and her group brought a unique dance on the yogic theory of chakras and social peace. Titled Antar Yatra, this dance was an interesting collaboration of Odissi, Chhau and contemporary ballet. This dance drama presents the yogic way to elevate our inner consciousness to a higher, positive vibrational state. The juxtaposition of the varied dance forms was a novel experience for the audience.",
      "Shrinivas Joshi, son of the legendary Bhimsen Joshi, performed bada khayal, which had a soothing effect on the audience. On the third day, Yamini Reddy and her group were energetic and innovative. An abhinaya on a Sufi Urdu song nearly brought the audience to their feet.",
      "Distinguished guests of honour included V. Srinivas, Secretary, DARPG and DPPW; Dr Sachchidananda Joshi, Member Secretary, IGNCA, and Additional Secretary, Government of India; Shri Padma Lochan Sahoo, Additional Chief Secretary, Government of Kerala; Shri K. R. Jyothilal; and Dr Richa Kamboj, HOD, Kaladarsana.",
      "The Ancient Arts Award 2024 was bestowed upon Guru Nityananda Das for his contribution to Odissi dance. We are thankful to Bhaskar Koirala, whose generous financial contribution made it possible to increase the scale of the event.",
    ],
    poster: photo("/images/festival/2024/banner.webp", "Banner of the 8th International Ancient Arts Festival 2024, 8 to 10 November, with Odissi and Kuchipudi dancers"),
  },
  {
    year: 2019,
    ordinal: "7th",
    slug: "2019",
    oldPage: "rws-7th-iaaf.html",
    title: "7th International Ancient Arts Festival / Symposium",
    theme: "Healing through Creative Arts across Cultures",
    dates: "30 and 31 October 2019",
    venue: "Shriram Centre for Performing Arts, 4 Safdar Hashmi Marg, Mandi House, Delhi",
    blurb: "Odissi on the Vedas, the Ancient Arts Award for Guru Geeta Chandran, and Mohan Veena with guitar.",
    paragraphs: [
      "India's only multi-arts event of its kind which tries to educate while entertaining. The event consists of lectures on the latest research on the therapeutic effect of arts along with artistic performances. Entry free.",
      "Held under the aegis of Rays of Wisdom Society, a Delhi based cultural NGO, supported by the Ministry of Culture, Government of India.",
    ],
    extras: [
      photo("/images/festival/2019/invitation-day-1-front.jpg", "Invitation card for day 1 of IAAF 2019, front"),
      photo("/images/festival/2019/invitation-day-1-back.jpg", "Invitation card for day 1 of IAAF 2019, programme"),
      photo("/images/festival/2019/invitation-day-2-front.jpg", "Invitation card for day 2 of IAAF 2019, front"),
      photo("/images/festival/2019/invitation-day-2-back.jpg", "Invitation card for day 2 of IAAF 2019, programme"),
    ],
  },
  {
    year: 2018,
    ordinal: "6th",
    slug: "2018",
    oldPage: "iaaf-2018.html",
    title: "International Ancient Arts Festival 2018",
    theme: "Arts as Tools of Transformation of Society",
    dates: "10 and 11 March 2018",
    venue: "The Ashok Amphitheatre, Diplomatic Enclave, Chanakyapuri, New Delhi",
    blurb: "Music and dance as therapeutic tools, with artists from Guinea, Switzerland and India.",
    paragraphs: [
      "After a short sabbatical, IAAF was held on 10 and 11 March 2018 at The Ashok Amphitheatre, Diplomatic Enclave, Chanakyapuri. The event showed how music and dance are vital therapeutic tools in traditional systems of healing. Adding to the value of this event was the fact that it had artists from Guinea and Switzerland along with those from India. According to the festival director, Reela Hota, who founded the Rays of Wisdom Society: \"This is the only multi-arts event of its kind which tries to educate while entertaining.\" The danseuse, who started a new chapter in Odissi dance and its spiritual aspect, said that the event would highlight how dance can help achieve a more balanced lifestyle and rounded personality in a common man's life filled with stress and strain.",
      "There were performances by the World Music Group Nandighosha from Switzerland, djembe player Babara Bangoura from Guinea and a Kathak performance by Guru Shikha Khare.",
      "Odissi dance on the Vedas by renowned dancer and spiritualist Reela Hota, with a fashion show on healing colours, was one of the highlights of Day 1. The Vedas: Eko Ham Bahu Shyam showcases the different aspects of the Vedic culture and lifestyle, as the Vedas are the scriptures of ultimate knowledge that show the path to purge negative past karmas and fulfil all human desires while maintaining harmony in society.",
      "Dr Prerna Kohli, a clinical psychologist, and Sonia Bhandari, consultant art therapist at Vimhans Hospital, spoke on Arts and Healing. Subjects that came up for discussion included the psychotherapeutic use of movement and dance to support intellectual, emotional and motor functions of the body, and the unique and life-enhancing benefits of music available to many vulnerable, marginalized people. The finale was an award presentation to cultural impresario Churchil Pandhian from Chennai.",
    ],
    poster: poster(2018, "Poster of IAAF 2018, 10 and 11 March, The Ashok Amphitheatre"),
    youtubeId: "XlfyB4MDFKE",
  },
  {
    year: 2014,
    ordinal: "5th",
    slug: "2014",
    oldPage: "iaaf-2014.html",
    title: "International Ancient Arts Festival 2014",
    theme: "Healing through Creative Arts across Cultures",
    dates: "4 and 5 December 2014",
    venue: "Siri Fort Auditorium, New Delhi",
    blurb: "With participation from Italy, India, Hungary, France and the USA, and the premiere of Ramleela in Opera.",
    paragraphs: [
      "The 5th International Festival on 4 and 5 December 2014 at Siri Fort, New Delhi, with participation from Italy, India, Hungary, France and the USA.",
      "One of the highlights this year was an international standard opera of the Ramleela with artistes from Italy. Internationally acclaimed Fabrizio Daros is the conductor, while prize-winning Maestro Marco Pucci Catena is the director of the opera. The original music score has been created by Antonio Cocomazi, who has won 13 national and international competitions and has recorded 7 CDs and 230 works. Mattia Olivieri (baritone) and Raffaele Abete (tenor) are among the most sought-after opera singers in Europe, while the talented Federico Benetti is the bass.",
      "Reela Hota, Odissi danseuse and founder director of the International Ancient Arts Festival, played the role of Sita in the opera: \"Through the cross-cultural Ramayana, we want to show that Lord Rama is a state of being that each one of us must strive for. This artistic collaboration has never been done before. Each style is maintaining its language, music, and has been chosen to play different acts of the play.\"",
      "The dance of Broadway USA is different because of the fusion of ballet, jazz and modern, which also blends in acting and singing. Acclaimed dancer Jason Macdonald travelled from New York.",
    ],
    poster: poster(2014, "Poster of IAAF 2014 with Reela Hota and the opera singers of Ramleela in Opera"),
    youtubeId: "Ei4TR6X6bcE",
  },
  {
    year: 2013,
    ordinal: "4th",
    slug: "2013",
    oldPage: "iaaf-2013.html",
    title: "International Ancient Arts Festival 2013",
    theme: "The Healing Aspect of Ancient Sound",
    dates: "22 and 23 May 2013",
    venue: "Kamani Auditorium, New Delhi",
    blurb: "Romanian ballet and Indian Odissi come together, with a focus on Sanskrit.",
    paragraphs: [
      "Romanian ballet and Indian Odissi came together for the International Ancient Arts Festival/Symposium 2013 at Kamani Auditorium on 22 and 23 May 2013.",
      "This was the first time that Romanian ballet dancers of the Bucharest National Opera House performed in India. They presented a unique fusion with Odissi danseuse and spiritualist Reela Hota in a dance recital that was a significant highlight of the fourth edition of the festival.",
      "Highlighting the therapeutic benefits of music and dance in restoring individual health and harmony, this time the special focus of the festival was on ancient languages, in particular Sanskrit.",
      "The festival included a performance by maestros Pt Rajan-Sajan Mishra and a talk by Mandra Cromwell from the USA, nominated for the Thomas Edison Award for her work in the field of cymatherapy.",
    ],
    poster: poster(2013, "Poster of IAAF 2013 with Odissi and ballet dancers"),
    youtubeId: "5VwEKz_TLy8",
  },
  {
    year: 2012,
    ordinal: "3rd",
    slug: "2012",
    oldPage: "iaaf-2012.html",
    title: "International Ancient Arts Festival 2012",
    theme: "The Meditative Aspects of Traditional Music, Dance and Allied Arts",
    dates: "From 16 May 2012",
    blurb: "Inaugurated by Delhi's Lieutenant Governor, with Sufi music from Pakistan and meditative music from China and Iran.",
    paragraphs: [
      "The 3rd edition of IAAF was inaugurated on 16 May by Lt. Governor H.E. Tejendra Khanna.",
      "The performance began with a collaborative performance of various Indian traditional dance forms, highlighting the spiritual significance of Rabindranath Tagore's poems, led by Reela Hota.",
      "The second performance of the evening was a soul-stirring Sufi music performance by Ustad Hamid Ali Khan, a Pakistani classical singer.",
      "Day 2 had a meditative musical performance by Wang Fei from China and Bahman Panahi from Iran, interspersed with talks on movement therapy by Dr Vivien Marcow Speiser from Lesley University, USA.",
    ],
    poster: poster(2012, "Poster of IAAF 2012 with the festival's artists"),
    youtubeId: "TCAKqihKtNE",
  },
  {
    year: 2011,
    ordinal: "2nd",
    slug: "2011",
    oldPage: "iaaf-2011.html",
    title: "International Ancient Arts Festival 2011",
    theme: "Music, Dance and Vital Therapeutic Practices in Traditional Systems of Healing",
    dates: "Four days",
    blurb: "Opened with Delhi's Chief Minister and an orchestra from Kazakhstan; artistes from across India.",
    paragraphs: [
      "Highlighting how music, dance and vital therapeutic practices in traditional systems of healing can combine to meet the lifestyle challenges of today, the four-day festival went off to a flying start. A spate of stories came, regaling the audience, befittingly starting with Mrs Sheila Dixit, Chief Minister of NCR, Delhi.",
      "\"I had once gone to a village near Gorakhpur, inhabited by only potters. India abounds in such villages where only one community lives, say, of iron-mongers, weavers and so on. This Gorakhpur village, I found, had the potters using mud and earth from a single pond, of great antiquity. Nobody indeed knew how ancient the pond was. Since the potters came out with astonishingly clever designs of images and icons, I asked them how they hit upon their ideas. They all said they imagined and even dreamt of these ideas from roaming near the pond.\"",
      "The second story came from Prof Eleanor Richards, teaching music therapy in Cambridge: \"A mythical king of France once wanted to know how the art of communication was important for children. He segregated two-three tiny babies from all human contacts, but made sure they received the best of nourishment and comfort. After a couple of years, all the babies were found dead. Obviously human connection was vital, which had been missing.\"",
      "The opening oeuvre was a performance by the Kazak State Akademik Folk and Ethnographical Orchestra. Coming from Kazakhstan, the young conductor brought out from the ensemble an amazing blend of rhythms. The festival saw a wide representation of artistes from all across India.",
    ],
    poster: poster(2011, "Poster of IAAF 2011"),
    youtubeId: "UqzdmbkcZhg",
  },
  {
    year: 2010,
    ordinal: "1st",
    slug: "2010",
    oldPage: "iaaf-2010.html",
    title: "International Ancient Arts Festival 2010",
    theme: "Arts as Tools of Transformation of Society",
    dates: "10 and 11 April 2010",
    venue: "Azad Bhawan Auditorium, New Delhi",
    blurb: "The first festival and symposium, combining talks and performances in a novel way.",
    paragraphs: [
      "The two-day festival/symposium was organized on 10 and 11 April 2010 at Azad Bhawan Auditorium, New Delhi, to promote and propagate ancient cultural heritage and to rekindle spirituality in the individual and thereby society.",
      "The festival combined talks and performances in a novel manner and featured a varied range of folk and classical performances across the globe. It gave the audience a rare opportunity to understand the benefits, significance and nuances of various art forms from art scholars.",
      "The highlight of the festival was a performance by Irish artist Thomas Sullivan.",
    ],
    poster: poster(2010, "Poster of IAAF 2010 with the programme"),
  },
];

export const editionByYear = (slug: string) => editions.find((e) => e.slug === slug);

/** Festival photographs from the old home page "Featured works", with the captions it gave them. */
export const festivalMoments: Photo[] = [
  photo("/images/highlights/2-sheila-dixit-cm-delhi.jpg", "Smt. Sheila Dixit, Chief Minister of Delhi, at IAAF 2011", { caption: "Smt. Sheila Dixit, Hon'ble Chief Minister of Delhi, IAAF 2011" }),
  photo("/images/highlights/portfolio_img3.jpg", "Kathakali artist on stage at IAAF 2010", { caption: "Margi Madhu, IAAF 2010" }),
  photo("/images/highlights/dr-karan-singh-iaaf-2011.jpg", "Dr Karan Singh greeting guests at IAAF 2011", { caption: "Dr Karan Singh, President, ICCR" }),
  photo("/images/highlights/portfolio_img7.jpg", "H.E. Tejendra Khanna, Lieutenant Governor of Delhi, at IAAF 2012", { caption: "H.E. Tejendra Khanna, Lt. Governor of Delhi, IAAF 2012" }),
  photo("/images/highlights/8-gaaradi-iaaf-2011.jpg", "Gaaradi folk performers in yellow and orange at IAAF 2011", { caption: "Gaaradi, IAAF 2011" }),
  photo("/images/highlights/9-qtubi-brothers-iaaf-2011.jpg", "Qawwali by the Qutbi Brothers", { caption: "Qawwali by the Qutbi Brothers" }),
  photo("/images/highlights/12-kathak.jpg", "Kathak and Odissi dancers in Rabindra Abhivyakti at IAAF 2012", { caption: "Rabindra Abhivyakti, IAAF 2012" }),
];

export interface ScheduleDay {
  label: string;
  date: string;
  items: { time: string; text: string }[];
}

/**
 * IAAF 2019 programme from the old rws-7th-iaaf.html. The old page's personal RSVP phone numbers are not repeated:
 * the event is over and they were private numbers.
 */
export const schedule2019: { entry: string; venueUrl: string; days: ScheduleDay[]; cast: string; credits: { role: string; name: string }[] } = {
  entry: "Entry free",
  venueUrl: "http://shriramcentre.org",
  days: [
    {
      label: "Day 1",
      date: "30 October 2019",
      items: [
        { time: "6:45 pm", text: "Lighting of the lamp and address by Chief Guest Smt Mridula Sinha, Hon'ble Governor, Government of Goa" },
        { time: "7:00 pm", text: "Odissi dance on the Veda by Reela Hota and group (Delhi)" },
        { time: "7:30 pm", text: "Ancient Arts Award presentation ceremony: Guru Geeta Chandran, Bharatanatyam (Delhi)" },
        { time: "7:45 pm", text: "Musical recital: Grammy winner Pandit Vishwa Mohan Bhatt on the Mohan Veena (Rajasthan) and Matthias Muller on the guitar (Germany)" },
        { time: "9:00 pm", text: "End of Day 1" },
      ],
    },
    {
      label: "Day 2",
      date: "31 October 2019",
      items: [
        { time: "7:00 pm", text: "Lighting of the lamp" },
        { time: "7:00 pm", text: "Rakt Kalyan, a play written by Girish Karnad, translated by Ram Gopal Bajaj and directed by Santanu Bose, Professor of Drama, National School of Drama (Delhi)" },
        { time: "8:15 pm", text: "Talk, The Power of Music: Dr Margaret Lobo, FRSA, founder of the Otakar Kraus Music Trust (United Kingdom)" },
        { time: "9:00 pm", text: "End of Day 2" },
      ],
    },
  ],
  cast: "Cast of Rakt Kalyan: Yogesh, Abhishek, Paras, Vivek, Mandeep, Agrima, Sameer, Arvind, Amresh, Rinku, Deepankar and Honey.",
  credits: [
    { role: "Lights", name: "Atul Mishra" },
    { role: "PR", name: "Mediagraphix" },
    { role: "Video promo", name: "Grid365" },
    { role: "Design", name: "Ebiz Eximius Inc." },
  ],
};
