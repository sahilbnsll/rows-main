import { photo, type Photo } from "./photo";

export interface YogaTestimonial { quote: string; name: string; role?: string }

/** Everything on the old Yoga page (yoga.html), lightly edited for typos. */
export const yoga = {
  title: "Healing through yoga",
  intro:
    "Rays of Wisdom Society organizes yoga general health and therapeutic workshops for diseases such as high blood pressure and diabetes.",
  camp: {
    title: "Rays of Wisdom with the Bihar School of Yoga",
    paragraphs: [
      "Rays of Wisdom Society, in association with the Bihar School of Yoga, organized a three day yoga camp at the Bapu Nature Cure Hospital and Yogashram, Gandhi Nidhi, Mayur Vihar Phase I. The camp was held on 9 and 10 March 2013.",
      "The swamis and sannyasins conducting the shivir were Swami Ahimsadhara and Swami Shiva Dhyanam.",
      "A few basic asanas were taught in each session, along with lectures explaining exactly how these postures work on the body. Some basic pranayama, mantra, kirtan and meditation were also introduced, with explanations in a simple, precise manner. A maha mrityunjaya yagya was added on the second evening.",
      "On the last day, participants were advised to practise different yoga at different times of the day so as to make its practice possible and regular. The four yogic capsule theory was introduced: mantra + asana + mental cleansing + diet. The importance of keeping good company was also stressed. The concept of self healing with yoga was encouraged. Prasad was distributed.",
    ],
    photos: [
      photo("/images/yoga/rws-bihar-school-yoga1.jpg", "Swamis lighting a lamp at the Bihar School of Yoga camp organized by Rays of Wisdom Society"),
      photo("/images/yoga/rws-bihar-school-yoga2.jpg", "Participants listening to a swami at the yoga camp"),
    ],
  },
  proposal: {
    title: "Rays of Wisdom with Bijoylaxmi Hota",
    text: "We propose to hold yoga camps for high blood pressure. We plan to cure about 1,000 patients with essential hypertension by covering 10 districts in Delhi/NCR in a period of one year. These camps will be held under the supervision of Yoga Guru Bijoylaxmi Hota, assisted by senior yoga teachers trained in the Bihar School of Yoga. Details would be announced soon.",
    photos: [
      photo("/images/yoga/rws-bijoylaxmi-hota-healing-with-yoga1.jpg", "Bijoylaxmi Hota leading a large open-air yoga session"),
      photo("/images/yoga/rws-bijoylaxmi-hota-healing-with-yoga2.jpg", "Rows of participants in a yoga session in a stadium"),
      photo("/images/yoga/rws-bijoylaxmi-hota-healing-with-yoga3.jpg", "Participants practising yoga on mats on a ground"),
      photo("/images/yoga/rws-bijoylaxmi-hota-healing-with-yoga5.jpg", "Bijoylaxmi Hota addressing a yoga gathering on stage"),
    ],
  },
  expert: {
    name: "Bijoylaxmi Hota",
    site: "http://www.bijoylaxmihota.com/",
    paragraphs: [
      "Bijoylaxmi Hota is a reputed yoga therapist with more than three decades of experience. A disciple of Paramahamsa Swami Satyananda Saraswati, founder of the Bihar School of Yoga, she has successfully treated various ailments ranging from asthma, arthritis and backache to tumours and cancer.",
      "She has written many books on yoga and food, many of them published by Rupa Publications. Her books have been translated into regional languages and have been reprinted several times. One of her books, Yoga for Busy People, has made it to the Times of India book club's \"All Time Bestsellers\" list.",
      "More recently, Bijoylaxmi Hota conducted a historic yoga teachers training and therapeutic camp for the police force of Mizoram. Results were documented in the presence of a medical doctor.",
    ],
    links: [
      { label: "Bijoylaxmi Hota's website", href: "http://www.bijoylaxmihota.com/" },
      { label: "Bihar School of Yoga", href: "http://www.biharyoga.net/bihar-school-of-yoga/about-bsy/" },
      { label: "Swami Satyananda Saraswati (Wikipedia)", href: "https://en.wikipedia.org/wiki/Satyananda_Saraswati" },
    ],
    /** Amazon India author listing, and the books on it (looked up 23 Oct 2026). Each book links to its own product page. */
    booksUrl: "https://www.amazon.in/Books-Bijoylaxmi-Hota/s?rh=n%3A976389031%2Cp_27%3ABijoylaxmi%2BHota",
    books: [
      { asin: "8171678386", title: "Yoga for Busy People", published: "October 2002", format: "Paperback", cover: photo("/images/books/8171678386.jpg", "Cover of Yoga for Busy People by Bijoylaxmi Hota") },
      { asin: "8129105888", title: "Yoga and Meditation for All Ages", published: "August 2005", format: "Paperback", cover: photo("/images/books/8129105888.jpg", "Cover of Yoga and Meditation for All Ages by Bijoylaxmi Hota") },
      { asin: "8129109786", title: "Yoga for a Healthy Heart", published: "November 2006", format: "Paperback", cover: photo("/images/books/8129109786.jpg", "Cover of Yoga for a Healthy Heart by Bijoylaxmi Hota") },
      { asin: "8129113910", title: "Yoga for Schoolchildren", published: "July 2008", format: "Paperback", cover: photo("/images/books/8129113910.jpg", "Cover of Yoga for Schoolchildren by Bijoylaxmi Hota") },
      { asin: "B00BG6UTVW", title: "Yoga for Cancer", published: "January 2012", format: "Paperback", cover: photo("/images/books/B00BG6UTVW.jpg", "Cover of Yoga for Cancer by Bijoylaxmi Hota") },
      { asin: "B015A9X5TI", title: "Healthy Oriya Cuisine", published: "September 2012", format: "Kindle edition", cover: photo("/images/books/B015A9X5TI.jpg", "Cover of Healthy Oriya Cuisine by Bijoylaxmi Hota") },
      { asin: "B0171TCYDI", title: "Yoga and Diet for Ailments", published: "November 2015", format: "Kindle edition", cover: photo("/images/books/B0171TCYDI.jpg", "Cover of Yoga and Diet for Ailments by Bijoylaxmi Hota") },
      { asin: "8129102668", title: "Yoga to Preserve Youth and Beauty", published: "September 2015", format: "Paperback", cover: photo("/images/books/8129102668.jpg", "Cover of Yoga to Preserve Youth and Beauty by Bijoylaxmi Hota") },
      { asin: "8129100630", title: "Yoga to Banish Backaches", published: "September 2015", format: "Paperback", cover: photo("/images/books/8129100630.jpg", "Cover of Yoga to Banish Backaches by Bijoylaxmi Hota") },
      { asin: "B01N2JLBVU", title: "Control Blood Pressure with Yoga", published: "December 2016", format: "Kindle edition (Rupa Quick Reads)", cover: photo("/images/books/B01N2JLBVU.jpg", "Cover of Control Blood Pressure with Yoga by Bijoylaxmi Hota") },
      { asin: "9353334861", title: "Yoga and Diet for Weight Loss", published: "June 2019", format: "Paperback", cover: photo("/images/books/9353334861.jpg", "Cover of Yoga and Diet for Weight Loss by Bijoylaxmi Hota") },
      { asin: "B07YPPW678", title: "Yoga Aur Aahar Dwara 100 Saal Kaise Jiyen", published: "October 2019", format: "Hindi edition, Kindle", cover: photo("/images/books/B07YPPW678.jpg", "Cover of Yoga Aur Aahar Dwara 100 Saal Kaise Jiyen by Bijoylaxmi Hota") },
      { asin: "9355202814", title: "Yoga for Super Immunity", published: "June 2022", format: "Paperback", cover: photo("/images/books/9355202814.jpg", "Cover of Yoga for Super Immunity by Bijoylaxmi Hota") },
      { asin: "8177668374", title: "Soundarya Ani Tarunya Tikavanyasathi Yogsadhana", published: "January 2007", format: "Marathi edition, with Prashant Talnikar", cover: photo("/images/books/8177668374.jpg", "Cover of Soundarya Ani Tarunya Tikavanyasathi Yogsadhana by Bijoylaxmi Hota") },
    ] as { asin: string; title: string; published: string; format: string; cover: Photo }[],
  },
  testimonials: [
    { quote: "I have studied the books of Bihar School Yoga and this was my first live experience with Bihar school of yoga and it was completely invigorating. Thanks to Rays of Wisdom Society", name: "Dr Shreyashi Panda", role: "Resident Doctor, Bapu Nature Cure & Yogashram" },
    { quote: "I already knew yogic practices but have been unable to practice it due to a busy life. Swami Shivdhyanam ji's lecture about how to practice yoga at different times of the day inspired me. I enjoyed the camp organized by Rays of Wisdom Society", name: "Mrs Bindu Gurtoo"},
    { quote: "Swamiji has taught some easy asanas that I can practice daily and improve my concentration which will help in my studies", name: "Shiva Bharadwaj", role: "Teenager" },
    { quote: "That a yoga capsule can be incorporated in different times of the day is what I liked most", name: "Rajesh Kapoor", role: "Follower of Bihar School of Yoga since the 1980s" },
    { quote: "My theoretical knowledge of yoga for the past one decade was due to television, books and internet. My practical experience of yoga under the guidance of Guru Bijoylaxmi Hota immensely helped me to improve my health within a very short span of time.", name: "Alokesh Nath" },
    { quote: "Yoga improved my back pain, kept me alert, active and my body is more flexible.", name: "Zosang Zuala" },
    { quote: "Yoga improved my body's flexibility, health, balance, oxygen intake, improved digestion and normalised my blood pressure.", name: "Ngurhmingliana" },
  ] as YogaTestimonial[],
};
