# Architecture

## Stack and why

| Choice | Reason |
|---|---|
| **Next.js 16, App Router** | Content site: every page is statically generated at build (58 static pages, one dynamic API route). Same major version as the festival and Postcards projects. |
| **React 19 + TypeScript (strict)** | Typed content models catch missing photographs and fields at build time. |
| **Tailwind CSS 4** + a small hand-written component layer (`src/styles/globals.css`, in `@layer components`) | Design tokens as CSS variables; utilities for layout; repeated patterns (buttons, arches, reveal) named once. |
| **framer-motion 12** | Scroll-driven scenes: the zoom hero, pinned productions showcase, pinned editions strip, press strips, parallax frames, word reveal. Mappings go through `src/lib/scrub.ts` (always computed in JavaScript: framer's native scroll-timeline shortcut mis-measured pinned sections). Simple reveals stay CSS plus IntersectionObserver. |
| **`next/image`** | AVIF/WebP, responsive sizes, explicit width and height (no layout shift). |
| **No CMS / database / analytics** | The content changes a few times a year; it lives in typed files in the repository. The only server code is the contact endpoint. |
| **Resend (HTTP API, no SDK)** for the contact form | Small, one `fetch`; needs one key. Not installed as a dependency. |

Third-party requests at page load: none. Fonts are self-hosted by `next/font`. YouTube and Google Maps load only after the visitor presses play / "Show the map".

## Routes

| Route | Purpose |
|---|---|
| `/` | Home: hero, recognition and counts, What we do (chapters), IAAF 2026 feature, productions index, editions rail, voices, press strip, partners, closing call to action |
| `/about`, `/team`, `/partners` | The Society, people, partners (sub-navigation shared) |
| `/festival` | Festival overview and every edition |
| `/festival/2026` | The coming edition: programme, artists, award, visit |
| `/festival/[year]` | 2010 to 2014, 2018, 2019 editions |
| `/festival/2024`, `/festival/2024/conference`, `/festival/2024/exhibition`, `/festival/2024/exhibition/[slug]` | 2024 edition with its conference and 13 artist pages |
| `/productions`, `/productions/[slug]` | Five productions |
| `/events`, `/events/[slug]` | Seven cultural events |
| `/yoga` | Yoga programme, expert, books, testimonials |
| `/media`, `/media/print` | Videos; press archive with year filter |
| `/support`, `/contact` | Donations (bank details, 80G); contact, volunteering, form |
| `/api/contact` | Contact form delivery |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image.jpg` | Discoverability |

Old `.html` URLs redirect permanently (`src/lib/legacy-redirects.ts`, 53 rules, wired in `next.config.ts`).

## Folders

```
src/app/            routes (server components by default)
src/components/
  layout/           SiteHeader (client: menu dialog), SiteFooter, PageHero
  home/             one component per homepage section
  sections/         page-level building blocks (EditionPage, Schedule, PersonCard, ContactForm, PressArchive)
  ui/               primitives: Reveal, Frame, Viewer, PhotoGrid, VideoEmbed, LogoWall, Quote, Seal, Ornaments, Icons ...
  seo/              JSON-LD
src/content/        typed content: site, team, partners, productions, festival, festival-2024, festival-2026, exhibition, events, yoga, press, videos, testimonials
src/content/data/   bulk data extracted from the old site (JSON, hand-editable)
src/lib/            site URL, SEO helper, contact validation, legacy redirects
scripts/            build-images, fetch-originals, build-icons, check-links
docs/               this documentation and the inventories
assets/originals/   untouched downloads from the old site (not served, not committed)
public/images/      web copies, organised by use
```

## Key decisions

1. **Content as typed files, rendered by components.** Adding a production or event means adding an object; sitemap, listings and routes update by themselves. `photo()` throws at build time if an image path is not in the generated manifest, so a broken image can never ship.
2. **Server components by default.** Client components exist only for interaction: header menu, hero parallax, reveal, chapter rail, productions preview, editions rail, press strip, viewer/photo grid, video facade, copy buttons, contact form, press archive, map facade.
3. **Motion:** transform and opacity only; durations/easings are tokens; all reveals are CSS classes toggled by one IntersectionObserver per element; `prefers-reduced-motion` disables the reveals, parallax, marquee and turning rays (content is visible without JavaScript through a `<noscript>` rule). The hero entrance slides but does not fade, so the largest content paints at once.
4. **No global page transition.** The cost (delays, hydration interplay, back-button edge cases) outweighs the benefit on a content site.
5. **Native `<dialog>`** for the mobile menu and photo viewer: focus trap, Escape and focus return for free.
6. **Press archive state in the URL** (`?year=2012`), read with `useSyncExternalStore` so the server HTML contains the full archive (no layout jump) and old `print-media-YYYY.html` links land on the right year.
7. **Draft mode by default.** Until `NEXT_PUBLIC_INDEXABLE=true`, `robots.txt` disallows everything and every page is `noindex`.
8. **Contact form never lies.** It reports "sent" only after the email service accepted the message; unconfigured or failing, it says so and offers the email address with the visitor's text pre-filled.
9. **Image strategy.** Originals untouched in `assets/originals`; `npm run images` maps them to descriptive paths, re-encodes JPEGs only when smaller, and writes `image-manifest.generated.json`. Optimised delivery by `next/image` (30-day cache). On Vercel's free plan there is a monthly limit on distinct source images optimised; this site has about 360, which is within it, but watch it if many photographs are added.
10. **CSS inlined** (`experimental.inlineCss`): the stylesheet is about 15 KB.

## Security

Security headers in `next.config.ts` (no framing, no sniffing, strict referrer policy, camera/microphone/geolocation off, narrow CSP for `frame-ancestors`, `base-uri`, `form-action`, `object-src`). The contact endpoint validates input, caps size, rate limits per address (best effort per instance), refuses cross-site posts, uses a honeypot, never echoes errors, and keeps the API key server side. Structured data is escaped. External links use `rel="noopener noreferrer"`. `npm audit`: 0 vulnerabilities at the time of writing.
