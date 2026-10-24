# Implementation status

As of 23 Oct 2026.

## Done

- All 52 pages of the old site crawled, inventoried (`docs/content-inventory.md`) and mapped to new routes; 53 redirect rules from the old `.html` URLs.
- 405 files downloaded from the old site (all HTTP 200, no duplicates by content hash), kept untouched in `assets/originals`, 361 reused under `public/images` (`docs/asset-inventory.md`). The festival project's 2026 photographs and marks were copied from its folder (read-only).
- New site: 20 page templates, 58 statically generated pages, one API route (see `docs/architecture.md`). Home page plus every page of the old site, including 8 festival editions, the 2024 conference (every speaker and topic), the 2024 exhibition (13 artist pages, 57 artworks), 5 productions, 7 cultural events, yoga, 15 videos, 94 press clippings, 27 partners, team, support and contact. IAAF 2026 has its own page.
- Design system, motion, responsive layouts, reduced-motion handling, SEO (titles, descriptions, canonical, Open Graph and Twitter cards, sitemap, robots, manifest, icons, JSON-LD for the organisation, the 2026 event and breadcrumbs).
- Contact form with validation, honeypot, rate limit and honest status messages.

## Verification results

| Check | Result |
|---|---|
| `tsc --noEmit` | passes |
| `eslint` | passes, no warnings |
| `next build` | succeeds, 58 static pages |
| `npm audit` | 0 vulnerabilities |
| Crawl of the running dev server (`npm run check:links`) | 51 pages and 840 optimised image URLs, all 200 |
| Redirects, contact API (validation 422, unconfigured 503, cross-site 403, bad JSON 400, GET 405), security headers | checked with curl against a production build |
| Lighthouse (production build, mobile, simulated slow 4G, `NEXT_PUBLIC_INDEXABLE=true`), 10 pages | Accessibility 100, Best Practices 100, SEO 100 on all ten. Performance 78 to 90 (home 85, about 87, production 86, **festival/2026 78**, exhibition 86, press archive 82, contact 90, support 90, event 87, yoga 83). CLS 0 everywhere; LCP 3.5 to 5.0 s under that throttling. Scores vary by about 5 to 10 points between runs on this machine. |
| Mobile (375 px) | home, about, team, 2026, conference, contact, press archive and support checked for horizontal overflow (none); home and 2026 looked at visually |
| Mobile menu | opens as a modal dialog, focus moves to Close, all links present (checked by script) |
| Press filter and viewer | `?year=2012` filters to 26 clippings; viewer opens (checked in the browser) |
| Contact form | field errors appear and focus the first invalid field; unconfigured server shows the "not sent" message with the email address (checked in the browser) |
| Reduced motion | home rendered with `--force-prefers-reduced-motion`: all content visible, nothing hidden |

## Not verified (be aware)

- Real devices, Safari and Firefox (only Chromium was used).
- Screen readers; a full keyboard walk of every page (the header menu and viewer dialogs rely on the native `<dialog>`; automated accessibility audits pass).
- **Email delivery**: no Resend key was available, so a real submission has not been sent anywhere.
- Reduced motion on pages other than home was checked by CSS review only.
- Performance of `/festival/2026` is the weakest (78): many photographs and a large collage. Possible next steps: smaller collage, fewer eagerly loaded photographs.

## Needed before launch (blockers and decisions)

1. **Email**: create a Resend account, verify a sending domain, set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (and optionally `CONTACT_TO_EMAIL`) in the host. Test one real submission.
2. **Domain**: set `NEXT_PUBLIC_SITE_URL`. Point `www.raysofwisdomsociety.net` at the host. The old site is plain static HTML (the same filenames now redirect), so keep the old host running until DNS is switched.
3. **Go live in search**: after sign-off set `NEXT_PUBLIC_INDEXABLE=true` and redeploy (it is a build-time variable).
4. **E-pass**: set `NEXT_PUBLIC_EPASS_URL` to the festival e-pass site once it is deployed; the buttons appear automatically.
5. **Confirm with the client** (details in the content inventory): which phone numbers are current; the team list; bank details; Dr Hota's fellowship wording; spelling of names; the donate-page claims about arts and children; permission to show newspaper clippings and the 2026 photographs (photographer credits came from file names: Avinash Pasricha, Ajay Lal, Priyanka, Sai Thejeswar Rao).
6. **IAAF 2026 gaps** (also open in the festival project): per-performance times and running order, entry policy, official sponsor artwork.
7. **Better images, if available**: team portraits (336 px), partner logos (240 x 80), exhibition artist portraits (**100 x 100 px**, shown only as small avatars) and speaker portraits are low resolution. Request originals.
8. **Privacy statement**: the old site had none and none was invented. The form says it uses what you write only to reply. Consider a short privacy page.
9. **Analytics**: none (the old Universal Analytics property no longer works). Add a privacy-friendly option if wanted.

## Known limitations

- The contact rate limit is per server instance (in memory); behind a serverless host it is best effort. Add a managed limiter if spam appears.
- `framer-motion` adds about 45 KB to the home page for the hero parallax only.
- Two videos (`x5Cylr8KLOM`, `9X8MuK7GnFw`) open on YouTube instead of playing inline; one has no known title.

## Update: scroll-driven home page

The hero, productions, editions and press sections were rebuilt as scroll-driven scenes (see architecture notes). Checked in headless Chrome at 1280x800 and 390x844 (frames at several scroll positions, no console errors). The scroll progress bar was removed on request. **Lighthouse numbers above predate this change and need re-measuring.** The in-app preview pane does not run animation frames, so scroll scenes must be judged in a normal browser. Reduced motion swaps the pinned sections for plain lists (CSS only); not yet checked in a browser with the setting on.

## Update: books and inner pages

- The yoga page now lists 14 books taken from the Amazon India author page (https://www.amazon.in/Books-Bijoylaxmi-Hota/s?rh=n%3A976389031%2Cp_27%3ABijoylaxmi%2BHota), looked up 23 Oct 2026 in a browser. Each book links to its own `https://www.amazon.in/dp/ASIN` page; covers were saved to `public/images/books/` (Amazon product images, shown only as links to the product). Prices are not shown because they change. The search also returned books by other authors and a three-author combo set; those were left out. `Yoga for Cancer` appears once (the 2012 paperback; a Kindle edition also exists).
- Inner pages gained the same scroll-driven treatment as the home page: opening text lifts and fades (`ScrollFade`), pinned photograph strips (`PhotoStrip`: production pages, festival moments, yoga), parallax frames, and cards that drift at different speeds (`Drift`: team, exhibition artists, books).

## Update: calmer motion, new background, UI reference

- Scroll-driven effects were pulled back to where they earn their place: the home page (zoom hero, word-by-word statement, pinned productions showcase, pinned editions strip, press strips, parallax on the four "What we do" pictures). Inner pages are static again apart from reveal-on-scroll; `ScrollFade`, `Drift` and `PhotoStrip` were deleted.
- New page background (`.site-bg` in `globals.css`, ornaments drawn by `scripts/build-backgrounds.mjs` into `public/bg/`): repeating watercolour sage, rose and gold washes, laid-paper lines, a lotus mandala in the left margin and a flowering vine in the right. Static, no blend modes; hidden in print; Stage sections cover it.
- Photo sections on production pages, festival moments and yoga use a bento gallery (`PhotoGrid variant="bento"`, adapted from `gallery-4` in `Ui-components.md`): first picture large, the rest fill the grid with no gaps, colour deepens on hover. `docs/reference/ui-components.md` is the same file as the one in the My Postcards project (byte-identical); ideas from `zoom-parallax`, `scroll-cards`, `gallery-4`, `focus-cards`, `card-25` informed the home page and galleries, no component code was copied.

## Update: component library (docs/reference/ui-components.md) applied across the site

Every component in `Ui-components.md` was read in full and adapted to the Paper and Stage design (fonts, palette, real content only):

| Library component | Where it lives now |
| --- | --- |
| zoom-parallax | Was the home hero; replaced at the client's request |
| lens-zoom-carousel (added by the client later) | Home hero (`HomeHero`, `LensZoomHero`): five festival photographs (2,000 px and wider) arrive with a zoom pull every 3.5 seconds, the Society's line held steady on the left, artist names at the bottom, pause button; below desktop width the photo sits whole above the text so nothing is cropped |
| scroll-morph-hero (flip cards) | Built as a home-page ring of photographs, then removed at the client's request |
| drag-cards | Home "In their words" (`VoiceNotes`): not draggable, scattered with a seeded layout, styled as programme cards with a brass pin |
| glass-folder-cards | Home press section (`PressFolders`, `ArchiveFolder`): re-made as the Society's own office files (cloth back board printed with the gold mandala, cream paper cover with a gold mount, the seal stamped on it, brass button and red cord), one per year; hovering a clipping names it in full under the folder and links to `/media/print?year=…&clip=…`, which opens that clipping |
| murmuration-wordmark | Home motto section (`MottoFlock`) |
| prisma-hero (WordsPullUp) | Footer wordmark (`PullUpWords`) |
| pull-lamp | Footer desk lamp (`PullLamp`): lighting it switches the whole site to a warm night palette (`html[data-lamp="on"]`); phone menu has `LampSwitch`. MIT credit to Ship Notes in the file |
| morph-gallery (WebGL noise dissolve) | `/productions` hero (`MorphHero`) |
| gallery-4 (black and white, colour on hover) | `/productions` "From the stage" (`PhotoGrid mono`) |
| timeline-01 | `/festival` "Every edition" (`EditionsTimeline`): one unbroken line that fills with gold as you scroll, a glowing tip, nodes that light up as it reaches them, ending at the last dot; dates and venue as chips; every poster shown whole |
| cobe-globe-polaroids | `/festival` "Artists from across the world" (`CountriesGlobe`, data in `festival-countries.ts`, each country tied to the edition text that names it) |
| polaroid-line-carousel | `/festival` "Moments from the festival" (`PolaroidLine`) |
| focus-cards + card-7 | `/events` (`EventCards`) and `/yoga` photographs (`FocusGallery`) |
| scroll-cards | `/about` strands (`StackedStrands`, `StrandsWithIndex`): equal-height pinned cards; the left column stays in view with a numbered index that follows the card on top |
| gallery (PhotoGallery spread) | Tried on `/yoga` and replaced at the client's request by focus cards (`FocusGallery`: rows where each picture keeps its own shape, none cropped) |
| book | `/yoga` books (`Book`, real Amazon covers) |
| works-wheel | `/festival/2024/exhibition` (`WorksWheel`) |
| card-25 | `/festival/2024` strands (`StrandCard`) |
| pixelated-404 postcard | `not-found.tsx` |
| inverted-cursor, image-stream-hero, color-filter-gallery | Tried and removed at the client's request |
| navigation-menu-05 | Already matched by the header's underline navigation |

Also: the dark Stage sections now carry their own scroll-driven backdrop (turning mandala and climbing vine, fixed to the window and clipped to the section, driven by `--bg-rot` and `--bg-vine` from `SiteBackground`), so no section is a flat slab.

Verified: `tsc`, `eslint`, `npm run build` pass; all main routes 200 on the production server; headless Chrome screenshots at 1440 px and 390 px (no horizontal overflow). Not verified: Lighthouse after this round, Safari/Firefox (the globe polaroids use CSS anchor positioning, which only Chromium supports today; elsewhere the globe and the country list still work, without the floating polaroid), screen readers, real touch devices.
