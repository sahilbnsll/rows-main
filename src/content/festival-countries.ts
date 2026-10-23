/**
 * Countries whose artists or scholars have taken part in the International Ancient Arts Festival, each with the edition and the
 * words of the Society's own edition pages that say so (festival.ts, festival-2024.ts). India, the host, is not listed. Romania
 * (the Sanskrit production) and Russia (a cultural event) are left out because they were not festival appearances.
 * Coordinates are the capital, or the named city, rounded.
 */
export interface FestivalCountry {
  id: string;
  country: string;
  location: [number, number];
  year: number;
  note: string;
}

export const festivalCountries: FestivalCountry[] = [
  { id: "guinea", country: "Guinea", location: [9.64, -13.58], year: 2018, note: "Djembe player Babara Bangoura" },
  { id: "switzerland", country: "Switzerland", location: [46.95, 7.45], year: 2018, note: "World Music Group Nandighosha" },
  { id: "italy", country: "Italy", location: [41.9, 12.5], year: 2014, note: "Opera artistes for Ramleela in Opera" },
  { id: "hungary", country: "Hungary", location: [47.5, 19.04], year: 2014, note: "Participation in the 5th festival" },
  { id: "france", country: "France", location: [48.86, 2.35], year: 2014, note: "Participation in the 5th festival" },
  { id: "usa", country: "United States", location: [38.9, -77.04], year: 2014, note: "Broadway dance; and earlier, talks in 2012 and 2013" },
  { id: "pakistan", country: "Pakistan", location: [33.68, 73.05], year: 2012, note: "Sufi music" },
  { id: "china", country: "China", location: [39.9, 116.4], year: 2012, note: "Meditative music by Wang Fei" },
  { id: "iran", country: "Iran", location: [35.69, 51.39], year: 2012, note: "Meditative music by Bahman Panahi" },
  { id: "kazakhstan", country: "Kazakhstan", location: [51.17, 71.45], year: 2011, note: "The Kazak State Akademik Folk and Ethnographical Orchestra" },
  { id: "ireland", country: "Ireland", location: [53.35, -6.26], year: 2010, note: "Irish artist Thomas Sullivan" },
  { id: "germany", country: "Germany", location: [52.52, 13.4], year: 2019, note: "Matthias Muller on the guitar" },
  { id: "uk", country: "United Kingdom", location: [51.51, -0.13], year: 2019, note: "Dr Margaret Lobo, Otakar Kraus Music Trust" },
  { id: "malaysia", country: "Malaysia", location: [3.14, 101.69], year: 2024, note: "Guru Ramli Ibrahim, Sutra Foundation (online)" },
  { id: "canada", country: "Canada", location: [45.5, -73.57], year: 2024, note: "McGill University, Montreal (online)" },
];

/** New Delhi, where every edition has been held. */
export const festivalHome: [number, number] = [28.61, 77.21];
