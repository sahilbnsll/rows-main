/**
 * Permanent redirects from the old raysofwisdomsociety.net pages (plain .html files) to the new routes, so existing
 * links, bookmarks and search results keep working. Imported by next.config.ts, so it must stay free of path aliases.
 */
export interface Redirect {
  source: string;
  destination: string;
  permanent: true;
}

const pairs: [string, string][] = [
  ["/index.htm", "/"],
  ["/index.html", "/"],
  ["/about-rays-of-wisdom-society.html", "/about"],
  ["/members.html", "/team"],
  ["/partners.html", "/partners"],
  ["/productions.html", "/productions"],
  ["/prdn-vedas-eko-hum-bahu-syam.html", "/productions/the-vedas"],
  ["/prdn-antar-yatra.html", "/productions/antar-yatra"],
  ["/prdn-sanskrit-healing-language.html", "/productions/sanskrit-the-mantra-bhasha"],
  ["/prdn-ramleela-in-opera.html", "/productions/ramleela-in-opera"],
  ["/prdn-rabindra-abhivyakti.html", "/productions/rabindra-abhivyakti"],
  ["/iaaf.html", "/festival"],
  ["/iaaf-2024.html", "/festival/2024"],
  ["/iaac-2024.html", "/festival/2024/conference"],
  ["/iaae-2024.html", "/festival/2024/exhibition"],
  ["/rws-7th-iaaf.html", "/festival/2019"],
  ["/iaaf-2018.html", "/festival/2018"],
  ["/iaaf-2014.html", "/festival/2014"],
  ["/iaaf-2013.html", "/festival/2013"],
  ["/iaaf-2012.html", "/festival/2012"],
  ["/iaaf-2011.html", "/festival/2011"],
  ["/iaaf-2010.html", "/festival/2010"],
  ["/iaae-2024-01-nitin.html", "/festival/2024/exhibition/nitin-madan"],
  ["/iaae-2024-02-sangeeta.html", "/festival/2024/exhibition/sangeeta-gupta"],
  ["/iaae-2024-03-aashima.html", "/festival/2024/exhibition/aashima-mehrotra"],
  ["/iaae-2024-04-nidhi.html", "/festival/2024/exhibition/nidhi-choudhari"],
  ["/iaae-2024-05-abhay.html", "/festival/2024/exhibition/abhay-k"],
  ["/iaae-2024-06-zuzana.html", "/festival/2024/exhibition/zuzana-mezencevova"],
  ["/iaae-2024-07-ragini.html", "/festival/2024/exhibition/ragini-upadhyay"],
  ["/iaae-2024-08-indu.html", "/festival/2024/exhibition/indu-tripathy"],
  ["/iaae-2024-09-laxman.html", "/festival/2024/exhibition/lakshman-prasad"],
  ["/iaae-2024-10-amit.html", "/festival/2024/exhibition/amit-kalla"],
  ["/iaae-2024-11-nivedita.html", "/festival/2024/exhibition/nivedita-bandil"],
  ["/iaae-2024-12-anand.html", "/festival/2024/exhibition/anand-bekwad"],
  ["/iaae-2024-13-tarun.html", "/festival/2024/exhibition/tarun-sharma"],
  ["/cultural-event-management.html", "/events"],
  ["/cul-export-award-function.html", "/events/export-award-function"],
  ["/cul-feel-india.html", "/events/feel-india"],
  ["/cul-brics-international-conference.html", "/events/brics-summit"],
  ["/cul-ministry-textiles-international-conference.html", "/events/textiles-handicrafts-seminar"],
  ["/cul-conference-south-asian-ministers.html", "/events/south-asian-ministers-conference"],
  ["/cul-cvc-conference.html", "/events/cvc-conference"],
  ["/cul-capam-conference.html", "/events/capam-conference"],
  ["/yoga.html", "/yoga"],
  ["/rws-videos.html", "/media"],
  ["/print-media.html", "/media/print"],
  ["/print-media-2011.html", "/media/print?year=2011"],
  ["/print-media-2012.html", "/media/print?year=2012"],
  ["/print-media-2013.html", "/media/print?year=2013"],
  ["/print-media-2014.html", "/media/print?year=2014"],
  ["/print-media-2018.html", "/media/print?year=2018"],
  ["/donate.html", "/support"],
  ["/contact.html", "/contact"],
];

export const legacyRedirects: Redirect[] = pairs.map(([source, destination]) => ({ source, destination, permanent: true }));
