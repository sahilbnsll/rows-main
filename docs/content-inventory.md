# Content inventory

Crawled on 23 Oct 2026 from https://www.raysofwisdomsociety.net/ (the home page nav, every internal link and the page-level links, recursively; the site has no sitemap.xml or robots.txt, both return 404). **52 pages found, all returned HTTP 200: no broken pages or links.** 15 external links were found (listed at the end). Raw HTML and the page list are in `docs/data/` (`old-site-pages.json`).

Old URLs are permanently redirected (HTTP 308) to the new routes in the last column by `src/lib/legacy-redirects.ts`.

Copy edits made while migrating: obvious typos fixed (for example "Aphitheatre", "Rabibdra", "Mayubhanj", "6:045 PM"), names of people kept as published, wording tightened only where the original was broken. Nothing was invented.

## Pages

| Old page | Title | Main purpose | Content, features and notes | New route |
|---|---|---|---|---|
| `index.htm` | Rays of Wisdom Society | Home: mission, team strip, festival editions, productions, featured works, partners, contact | 59 images; 1 form (formindex.php, POST); Google map embed | `/` |
| `about-rays-of-wisdom-society.html` | About Rays of Wisdom Society | About the Society, team, testimonials | 16 images | `/about` |
| `members.html` | Team Members - Rays of Wisdom Society | Team: patrons and executive members | 15 images | `/team` |
| `partners.html` | Our Partners - Rays of Wisdom Society | Partner and sponsor logos, testimonials | 27 images | `/partners` |
| `productions.html` | Rays of Wisdom Productions | Index of five productions | 5 images | `/productions` |
| `prdn-vedas-eko-hum-bahu-syam.html` | Vedas - Eko Hum Bahu Syam / Rays of Wisdom Society | Production page: credits, philosophy/story, photos, video | 5 images; 1 YouTube embed | `/productions/the-vedas` |
| `prdn-antar-yatra.html` | Antar Yatra - Rays of Wisdom Society | Production page: credits, philosophy/story, photos, video | 9 images; 1 YouTube embed | `/productions/antar-yatra` |
| `prdn-sanskrit-healing-language.html` | Sanskrit: The Mantra Bhasha - Rays of Wisdom Society | Production page: credits, philosophy/story, photos, video | 6 images; 1 YouTube embed | `/productions/sanskrit-the-mantra-bhasha` |
| `prdn-ramleela-in-opera.html` | Ramleela in Opera -  Rays of Wisdom Society | Production page: credits, philosophy/story, photos, video | 9 images; 1 YouTube embed | `/productions/ramleela-in-opera` |
| `prdn-rabindra-abhivyakti.html` | Rabindra Abhivyakti  - Rays of Wisdom Society | Production page: credits, philosophy/story, photos, video | 5 images; 1 YouTube embed | `/productions/rabindra-abhivyakti` |
| `iaaf.html` | IAAF - Rays of Wisdom Society | Festival overview, rationale, list of editions | 10 images | `/festival` |
| `iaac-2024.html` | IAA Conference  2024 - Healing Through Arts Across Culture | 2024 scholars' conference: sessions, speakers, topics | 30 images | `/festival/2024/conference` |
| `iaae-2024.html` | International Ancient Arts Exhibition 2024 - Metaphysical, Symbolic and Healing Nature | 2024 exhibition: intro and 13 participating artists | 13 images | `/festival/2024/exhibition` |
| `iaaf-2024.html` | 8th International Ancient Arts Festival 2014 - Delhi, India | 8th festival (8 to 10 Nov 2024): schedule and report | 2 images | `/festival/2024` |
| `rws-7th-iaaf.html` | 7th International Ancient Arts Festival - Delhi, India | 7th festival (30 to 31 Oct 2019): programme and Delhi sightseeing list | 14 images | `/festival/2019` |
| `iaaf-2018.html` | IAAF 2018 - Rays of Wisdom Society | Festival edition report, theme, photos | 2 images | `/festival/2018` |
| `iaaf-2014.html` | IAAF 2014 - Rays of Wisdom Society | Festival edition report, theme, photos | 2 images | `/festival/2014` |
| `iaaf-2013.html` | IAAF 2013 - Rays of Wisdom Society | Festival edition report, theme, photos | 2 images | `/festival/2013` |
| `iaaf-2012.html` | IAAF 2012 - Rays of Wisdom Society | Festival edition report, theme, photos | 2 images | `/festival/2012` |
| `iaaf-2011.html` | IAAF 2011 - Rays of Wisdom Society | Festival edition report, theme, photos | 2 images | `/festival/2011` |
| `iaaf-2010.html` | IAAF 2010 - Rays of Wisdom Society | Festival edition report, theme, photos | 2 images | `/festival/2010` |
| `cultural-event-management.html` | Cultural Event Management - Rays of Wisdom Society | Cultural events produced for ministries and conferences | 33 images | `/events` |
| `yoga.html` | Yoga - Rays of Wisdom Society | Yoga camps, Bijoylaxmi Hota, books, participant testimonials | 12 images | `/yoga` |
| `rws-videos.html` | Online Videos - Rays of Wisdom Society | 15 embedded YouTube videos | 0 images; 15 YouTube embeds | `/media` |
| `print-media.html` | Print Media - Rays of Wisdom Society | Press clippings gallery (all years) | 280 images | `/media/print` |
| `donate.html` | Support the Arts & the Community with Rays of Wisdom Society | Patron donations, bank details, 80G, enquiry form | 0 images; 1 form (donateform.php, POST) | `/support` |
| `contact.html` | Contact Us - Rays of Wisdom Society | Contact details, volunteering and participation routes, enquiry form, map | 1 images; 1 form (contactform.php, POST); Google map embed | `/contact` |
| `iaae-2024-02-sangeeta.html` | IAA Exhibition 2024 - Participating Artist - Sangeeta Gupta | Exhibition artist profile: artworks, biography | 6 images | `/festival/2024/exhibition/sangeeta-gupta` |
| `iaae-2024-03-aashima.html` | IAA Exhibition 2024 - Participating Artist - Aashima Mehrotra | Exhibition artist profile: artworks, biography | 7 images | `/festival/2024/exhibition/aashima-mehrotra` |
| `iaae-2024-04-nidhi.html` | IAA Exhibition 2024 - Participating Artist - Nidhi Chaudhuri | Exhibition artist profile: artworks, biography | 7 images | `/festival/2024/exhibition/nidhi-choudhari` |
| `iaae-2024-05-abhay.html` | IAA Exhibition 2024 - Participating Artist - Abhay Kumar | Exhibition artist profile: artworks, biography | 7 images | `/festival/2024/exhibition/abhay-k` |
| `iaae-2024-06-zuzana.html` | IAA Exhibition 2024 - Participating Artist - Zuzana Mezencevová | Exhibition artist profile: artworks, biography | 5 images | `/festival/2024/exhibition/zuzana-mezencevova` |
| `iaae-2024-07-ragini.html` | IAA Exhibition 2024 - Participating Artist - Ragini Upadhyay | Exhibition artist profile: artworks, biography | 7 images | `/festival/2024/exhibition/ragini-upadhyay` |
| `iaae-2024-08-indu.html` | IAA Exhibition 2024 - Participating Artist - Indu Tripathy | Exhibition artist profile: artworks, biography | 7 images | `/festival/2024/exhibition/indu-tripathy` |
| `iaae-2024-09-laxman.html` | IAA Exhibition 2024 - Participating Artist - Dr. Lakshman Prasad | Exhibition artist profile: artworks, biography | 2 images | `/festival/2024/exhibition/lakshman-prasad` |
| `iaae-2024-10-amit.html` | IAA Exhibition 2024 - Participating Artist - Amit Kalla | Exhibition artist profile: artworks, biography | 7 images | `/festival/2024/exhibition/amit-kalla` |
| `iaae-2024-11-nivedita.html` | IAA Exhibition 2024 - Participating Artist - Dr. Nivedita Bandil | Exhibition artist profile: artworks, biography | 3 images | `/festival/2024/exhibition/nivedita-bandil` |
| `iaae-2024-01-nitin.html` | IAAF 2024 - Healing Through Arts Across Culture | Exhibition artist profile: artworks, biography | 4 images | `/festival/2024/exhibition/nitin-madan` |
| `iaae-2024-12-anand.html` | IAA Exhibition 2024 - Participating Artist - Anand Bekwad | Exhibition artist profile: artworks, biography | 4 images | `/festival/2024/exhibition/anand-bekwad` |
| `iaae-2024-13-tarun.html` | IAA Exhibition 2024 - Participating Artist - Tarun Sharma | Exhibition artist profile: artworks, biography | 4 images | `/festival/2024/exhibition/tarun-sharma` |
| `cul-export-award-function.html` | Export Award Function March 2014 - International Conference - Rays of Wisdom Society | Cultural event write-up | 4 images | `/events/export-award-function` |
| `cul-feel-india.html` | Feel India, Ministry of Tourism - Rays of Wisdom Society | Cultural event write-up | 4 images | `/events/feel-india` |
| `cul-brics-international-conference.html` | BRICS International Conference - Rays of Wisdom Society | Cultural event write-up | 5 images | `/events/brics-summit` |
| `cul-ministry-textiles-international-conference.html` | Ministry of Textiles - International Conference - Rays of Wisdom Society | Cultural event write-up | 4 images | `/events/textiles-handicrafts-seminar` |
| `cul-conference-south-asian-ministers.html` | Conference of South Asian Ministers  - Rays of Wisdom Society | Cultural event write-up | 3 images | `/events/south-asian-ministers-conference` |
| `cul-cvc-conference.html` | CVC Conference, April 2013 - Rays of Wisdom Society | Cultural event write-up | 4 images | `/events/cvc-conference` |
| `cul-capam-conference.html` | CAPAM Conference - Rays of Wisdom Society | Cultural event write-up | 5 images | `/events/capam-conference` |
| `print-media-2011.html` | Print Media 2011 -  Rays of Wisdom Society | Press clippings for one year | 105 images | `/media/print?year=2011` |
| `print-media-2012.html` | Print Media 2012 - Rays of Wisdom Society | Press clippings for one year | 182 images | `/media/print?year=2012` |
| `print-media-2013.html` | Print Media 2013 - Rays of Wisdom Society | Press clippings for one year | 161 images | `/media/print?year=2013` |
| `print-media-2014.html` | Print Media 2014 - Rays of Wisdom Society | Press clippings for one year | 147 images | `/media/print?year=2014` |
| `print-media-2018.html` | Print Media 2018 - Rays of Wisdom Society | Press clippings for one year | 42 images | `/media/print?year=2018` |

## Functional features of the old site

| Feature | How it worked | In the new site |
|---|---|---|
| Contact form (home, contact page) | POST to `formindex.php` and `contactform.php` on the old host (name, email, message, all required) | `/contact` form posting to `/api/contact`, which emails the Society through Resend when configured. **Not configured yet**: until `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are set it says plainly that the message was not sent and offers the email address. |
| Donate form (donate page) | POST to `donateform.php` (same three fields) | Replaced by the contact form (topic "Donating") and the bank details on `/support`. There was no online payment on the old site and none has been added. |
| Print media gallery | jQuery "gamma" gallery, 5 renditions per scan | 94 scans (largest rendition) in `/media/print` with year filter, load-more and a full-screen viewer |
| Featured works filter (home) | Isotope-style filter All/Festival/Workshops/Productions over 12 thumbnails | Thumbnails reused as "Moments from the festival"; the filter was dropped (12 items do not need one) |
| Testimonial sliders | flexslider on most pages | Static quotations (real ones only) where they add something; the same three recur on 17 old pages |
| Google Analytics | `UA-90386312-1` (Universal Analytics, which Google shut down in 2023) | Not carried over. No analytics, cookies or third-party scripts are loaded. |
| Social links | Facebook, Twitter, LinkedIn in the footer | Kept in the footer (icons redrawn) |
| Downloads | `download/rws-80g-form.pdf`, `download/rws-registration-deed.jpg` | `/documents/`, linked from `/support` |

## Content that was not carried over, and why

- **Page-header stock photographs** (`img/backgrounds`, 28 files): decorative, no information. Kept in `assets/originals` only.
- **"Explore Delhi" on the 2019 page** (Qutub Minar, Red Fort and so on, with paragraphs copied from Wikipedia and stock photographs): not the Society's own content; paragraphs would need attribution. Not reproduced.
- **Private RSVP phone numbers on the 2019 page** (three individuals' mobiles, for an event now over): omitted.
- **Designer credit** ("Designed by SJ" with link) and the template's "© 2017/2024" footers: replaced by the Society's own footer.
- **Newsroom link with empty `href`** and several `javascript:void(0)` placeholders in the old navigation: dropped.

## Inconsistencies in the old site (for the client to confirm)

1. **Telephone numbers**: the home page shows 011 30605540, the contact page 011 40814540 (also in the IAAF 2026 text), the donate page +91 11 30604450 (Savita Bisht). All are kept in `src/content/site.ts` and used where the old site used them.
2. **Team lists differ**: the home page includes Alka Tyagi (not on the team page); the team page includes S.J. Singh, V.K. Mahana, Hiti Mahendru and Prakash Khandpal (not on the home page). The union is shown; four people have no portrait (monogram shown).
3. **Reela Hota's fellowship**: the 2024 conference page says "former Senior Fellow, Ministry of Culture"; the 2026 festival text says "Senior Fellow". The new About page avoids the title; the 2026 page and the 2024 conference page reproduce their own sources.
4. **Edition ordinals**: stated by the Society for 2012 (3rd), 2013 (4th), 2014 (5th), 2019 (7th), 2024 (8th); 2018 is "6th" in the Society's own YouTube title; 2010 and 2011 are 1st and 2nd by counting. The old iaaf.html listing gives the 2011 theme as the 2012 one; the 2011 page's own theme is used.
5. **Spelling of names**: Federico "Beniti" (testimonial) / "Benetti" (2014 text) / "Beneeti" (Ramleela credits); Nidhi "Choudhary" / "Choudhari" / "Chaudhuri"; Sudarshan / Sudarshan. Names are shown as each page prints them.
6. **Exhibition page**: the intro text lists some artists with different spellings from their profile pages.
7. **Dr Sachchidananda Joshi's titles** on the 2024 page ("MS, IGNCA, Additional Secretary, Govt of India") were ambiguous in the original list of guests; read as one person.
8. **Unverifiable outcome claims** on the donate page (arts and grade point averages, test scores, dropout rates) are reproduced as the Society's own statement, not independently sourced. Consider adding a source.
9. **Bank account details** on `/support` are copied from the old donate page; please confirm the account, IFSC and PAN are current before launch.
10. **Two YouTube videos** (`x5Cylr8KLOM`, `9X8MuK7GnFw`) cannot be embedded (embedding disabled by the owner, or the video is private); they open on YouTube. The second has no public title.

## External links on the old site

- https://web.facebook.com/Rays-of-Wisdom-Society-261794860907430 (52 pages)
- https://twitter.com/raysofwisdom1 (52 pages)
- https://in.linkedin.com/in/rays-of-wisdom-307332136 (52 pages)
- https://sudhirjagtap.com/ (50 pages)
- https://ignca.gov.in/ (1 page)
- http://shriramcentre.org (1 page)
- http://www.ebiz-eximius.com/ (1 page)
- http://www.biharyoga.net/bihar-school-of-yoga/about-bsy/ (1 page)
- http://www.bijoylaxmihota.com/ (1 page)
- https://en.wikipedia.org/wiki/Satyananda_Saraswati (1 page)
- http://www.amazon.in/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=bijoylaxmi+hota&rh=i%3Aaps%2Ck%3Abijoylaxmi+hota (1 page)
- http://www.amazon.in/Yoga-Busy-People-Bijoylaxmi-Hota/dp/8171678386/ref=sr_1_1?ie=UTF8&qid=1484395989&sr=8-1&keywords=Yoga+for+Busy+People%E2%80%99 (1 page)
- http://www.amazon.in/Books-Bijoylaxmi-Hota/s?ie=UTF8&page=1&rh=n%3A976389031%2Cp_27%3ABijoylaxmi%20Hota (1 page)
- https://www.capam.org (1 page)
- https://sudhirjagtap.com (1 page)
