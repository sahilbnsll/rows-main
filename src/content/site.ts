/**
 * Organisation facts, navigation and contact details. Everything here comes from the old website
 * (raysofwisdomsociety.net, crawled 23 Oct 2026) or from the client's IAAF 2026 text, as noted.
 */

export const org = {
  name: "Rays of Wisdom Society",
  short: "RWS",
  /** Old site, home page meta description and about page. */
  mission:
    "Rays of Wisdom Society is a Delhi based registered non-profit organization, committed to establish and propagate the wisdom behind ancient rituals and practices.",
  tagline: "Spreading the wisdom behind ancient rituals and practices",
  registration: "Regd. no. 54348/80 G",
  recognition:
    "Recognized officially by the Ministry of Culture, Government of India, as an Outstanding Category Organization.",
  address: {
    lines: ["5th Floor, 86, Padma Palace", "Nehru Place", "New Delhi 110019"],
    oneLine: "5th Floor, 86, Padma Palace, Nehru Place, New Delhi 110019",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Padma+Palace+86+Nehru+Place+New+Delhi",
    /** The old site's own map embed points at Padma Palace-86. */
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.660028373216!2d77.25056531438281!3d28.549936732450426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x44251912fb9a602c!2sPadma+Palace+-86!5e0!3m2!1sen!2sin!4v1483415454536",
  },
  email: "raysofwisdom@gmail.com",
  /**
   * Phone numbers as published. The old site shows three different office lines on different pages
   * (home: 011 30605540, contact: 011 40814540, donate: +91 11 30604450) and the IAAF 2026 text adds a mobile.
   * They are all kept; the client should confirm which are current (see docs/implementation-status.md).
   */
  phones: {
    office: { label: "Office", display: "+91 11 40814540", tel: "+911140814540" },
    officeAlt: { label: "Office", display: "+91 11 30605540", tel: "+911130605540" },
    donations: { label: "Donations, Savita Bisht", display: "+91 11 30604450", tel: "+911130604450" },
    mobile: { label: "Festival office mobile", display: "+91 99538 24452", tel: "+919953824452" },
  },
  hours: "10:00 am to 6:00 pm",
  coordinator2026: { name: "Nishant Sharma", role: "Project Coordinator, IAAF 2026", display: "+91 89555 91445", tel: "+918955591445" },
  social: [
    { label: "Facebook", href: "https://web.facebook.com/Rays-of-Wisdom-Society-261794860907430" },
    { label: "X (Twitter)", href: "https://twitter.com/raysofwisdom1" },
    { label: "LinkedIn", href: "https://in.linkedin.com/in/rays-of-wisdom-307332136" },
  ],
} as const;

export interface NavItem {
  label: string;
  href: string;
  /** Route prefixes that mark this item as current. */
  match: string[];
}

/** Six plain labels; Team and Partners sit under About (a local sub-navigation), Support is the header button. */
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about", match: ["/about", "/team", "/partners"] },
  { label: "Festival", href: "/festival", match: ["/festival"] },
  { label: "Productions", href: "/productions", match: ["/productions"] },
  { label: "Events", href: "/events", match: ["/events"] },
  { label: "Yoga", href: "/yoga", match: ["/yoga"] },
  { label: "Newsroom", href: "/media", match: ["/media"] },
];

export const aboutNav: NavItem[] = [
  { label: "The Society", href: "/about", match: ["/about"] },
  { label: "Team", href: "/team", match: ["/team"] },
  { label: "Partners", href: "/partners", match: ["/partners"] },
];

export const newsroomNav: NavItem[] = [
  { label: "Videos", href: "/media", match: ["/media"] },
  { label: "In print", href: "/media/print", match: ["/media/print"] },
];

export const footerNav = {
  society: [
    { label: "About the Society", href: "/about" },
    { label: "Our team", href: "/team" },
    { label: "Partners and sponsors", href: "/partners" },
    { label: "Support our work", href: "/support" },
    { label: "Contact and volunteering", href: "/contact" },
  ],
  work: [
    { label: "International Ancient Arts Festival", href: "/festival" },
    { label: "IAAF 2026", href: "/festival/2026" },
    { label: "Productions", href: "/productions" },
    { label: "Cultural events", href: "/events" },
    { label: "Yoga", href: "/yoga" },
  ],
  newsroom: [
    { label: "Videos", href: "/media" },
    { label: "In print", href: "/media/print" },
  ],
} as const;
