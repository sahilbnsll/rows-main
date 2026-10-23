/**
 * Real testimonials as published on the old site, quoted as written (spelling of names as printed there; the
 * opera artist appears as "Beniti" in the quote credit and "Benetti" in the 2014 festival text: confirm with the client).
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  context?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "I congratulate Rays of Wisdom Society for highlighted the deep connection between science, spirituality and ancient performing arts making it perhaps the only multi-arts event which tried to educate while entertaining",
    name: "Ravindra Singh",
    role: "Secretary, Ministry of Culture, Government of India",
    context: "On the International Ancient Arts Festival",
  },
  {
    quote: "I congratulate you and your group of dancers for this amazing performance, Sanskrit: The Mantra Bhasha",
    name: "Valerie Epure",
    role: "Ambassador of Romania to India",
    context: "On Sanskrit: The Mantra Bhasha",
  },
  {
    quote: "What makes the Ramleela interesting for us Europeans is the coming together of Gods, humans, and animals in one story",
    name: "Federico Beniti",
    role: "Opera artist, Italy",
    context: "On Ramleela in Opera",
  },
  {
    quote: "Vibrations can heal and restore harmony. Reela Hota demystifies sensory perceptions at the International Ancient Arts Festival 2013",
    name: "Utpal K Banerjee",
    role: "Dance critic",
    context: "On IAAF 2013",
  },
  {
    quote: "Bravo to Reela Hota and Bogdan Canila",
    name: "Dr Karan Singh",
    role: "President, ICCR",
    context: "At Sanskrit: The Mantra Bhasha",
  },
  {
    quote: "Ramleela in Opera was a great success",
    name: "Gianluca Grandi",
    role: "Deputy Head of Mission, Embassy of Italy to India",
  },
];
