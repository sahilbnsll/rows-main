import { photo, type Photo } from "./photo";

export interface Partner {
  name: string;
  logo: Photo;
}

const logo = (file: string, name: string): Partner => ({ name, logo: photo(`/images/partners/${file}.jpg`, `${name} logo`) });

/** The 27 logos of the old Our Partners & Sponsors page, in its order. Names are read from the logo file names. */
export const partners: Partner[] = [
  logo("doordarshan", "Doordarshan"),
  logo("sangeet-natak-academy", "Sangeet Natak Akademi"),
  logo("ministry-of-culture-goi", "Ministry of Culture, Government of India"),
  logo("italian-cultural-institute", "Italian Cultural Institute"),
  logo("incredible-india", "Incredible India"),
  logo("sahitya-kala-parishad", "Sahitya Kala Parishad"),
  logo("itdc", "India Tourism Development Corporation (ITDC)"),
  logo("iccr", "Indian Council for Cultural Relations (ICCR)"),
  logo("habitat-world", "Habitat World"),
  logo("embassy-of-romania", "Embassy of Romania"),
  logo("centrul-cultural-rabindranath-tagore", "Centrul Cultural Rabindranath Tagore"),
  logo("embassy-kazakhistan", "Embassy of Kazakhstan"),
  logo("west-bengal-tourism", "West Bengal Tourism"),
  logo("up-tourism", "Uttar Pradesh Tourism"),
  logo("kerala-tourism", "Kerala Tourism"),
  logo("delhi-tourism", "Delhi Tourism"),
  logo("government-uttar-pradesh", "Government of Uttar Pradesh"),
  logo("ndmc", "New Delhi Municipal Council (NDMC)"),
  logo("delhi-government", "Government of Delhi"),
  logo("east-zone-cultural-centre", "East Zone Cultural Centre"),
  logo("khaaja-chowk", "Khaaja Chowk"),
  logo("pondicherry-tourism", "Pondicherry Tourism"),
  logo("ginger", "Ginger"),
  logo("dabur", "Dabur"),
  logo("sgpc", "SGPC"),
  logo("ayodhya-research-institute", "Ayodhya Research Institute"),
  logo("ritam", "RITAM"),
];
