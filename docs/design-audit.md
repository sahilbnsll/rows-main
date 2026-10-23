# Design audit

Done before any design decision, from the source and the rendered pages of the four reference projects. All four were read-only; none was modified. (The festival project's dev server was started once from its folder to look at the rendered page and was stopped again; the project's own files were not touched by this work. Its files were being edited by someone else while this audit ran.)

## 1. Why the festival page succeeds (`rayofwisdom`)

- **One idea, drawn from the object itself.** The page is the printed festival pass: handmade cream paper (an SVG grain), the poster's olive-black ink, sage and rose watercolour hills, gold only as hairlines, maroon only for the date and the one thing to do. Nothing is decorative without being from the poster.
- **A small, disciplined token set** (cream, paper, sage, olive, ink, maroon, gold, rose) and three motion durations (120, 200, 320 ms) with named easings. No scattered magic values.
- **Type that carries the identity:** DM Serif Display for display, Newsreader for reading, Hanken Grotesk for interface. No tracked-caps eyebrows; the italic is used for asides.
- **Signature devices that recur:** the temple arch (mehrab) around people, the lotus rule, the seal, perforation lines, the turning emblem, numbers that are also links.
- **Photographs treated with care:** fixed-ratio frames (no layout shift), cut-out artists standing on the hills, and the "develop from black and white" reveal borrowed from My Postcards.
- **Engineering restraint:** CSS-only hero entrance, IntersectionObserver reveals, `prefers-reduced-motion` honoured everywhere, native `<dialog>` for the menu and photo viewer, Lighthouse 100 for accessibility.

## 2. What was taken from the other three

| Project | Used | Not used |
|---|---|---|
| **My Postcards** (and `docs/reference/ui-components.md`) | The develop-from-black-and-white reveal; the chapter rail (sticky numbered list that tracks the section in view, used in "What we do"); the lightbox/viewer pattern; the seal; "numbers that are also links"; CSS-first motion. The 9,364-line component reference is a 21st.dev snippet library (colour-filter gallery, polaroid carousel, scroll-morph hero, zoom parallax, focus cards, stacked scroll cards, glass folders, murmuration wordmark, pull-lamp and so on). It was surveyed in full by component name, and the pieces relevant to a content site (zoom parallax, stacked scroll cards, focus cards, hover-stacked image cards, colour-filter gallery) were read closely. At first only their *ideas* were used. Later the client asked for the library to be used across the site, and each component was then adapted to the Paper and Stage design: see the mapping table in `docs/implementation-status.md`. | Anything that did not serve the content was removed again at the client's request (inverted cursor, image-stream corridor, colour filter, the photo ring). |
| **Portfolio** | Motion tokens; data-driven architecture (typed content files rendered by small components; an accessible, keyboard-friendly carousel pattern with a visible pause); `Reveal` pattern; careful SEO/structured-data habits. | The chat assistant, terminal, cursor effects, dashboards: unrelated to the Society. |
| **LumaCV** | Application-grade polish: consistent tokens, focus rings, loading/feedback states, tidy spacing scale, accessible dialogs. | The Apple-grey SaaS look, Radix/shadcn stack and dashboard patterns: the Society must not look like a software product. |
| **Festival** | Everything in section 1, extended. | The e-pass, gate scanner and Supabase back end (a separate application). |

## 3. Patterns deliberately not reused

Floating petals and drifting flowers over the whole page (the festival's "living wallpaper": charming on one event page, tiring across 50), heavy glass cards, gradient blobs, three-up icon card grids, scroll-jacking, a global page-transition layer, cursor effects.

## 4. Visual direction: "Paper and Stage"

- **Paper** (cream, sage, rose) for reading: about, team, listings, forms.
- **Stage** (deep olive-black `#161c0f`) for the work: the productions, the photographs, the footer. Almost every photograph of the Society was taken under stage lights; the dark surface lets them glow, and the black-and-white ballet frames "develop" into colour on paper.
- **Maroon** is kept for the primary action and one dignified band (the closing call to action), as on the festival page.
- **New signature for the society:** *rays*. Gold hairline rays turn slowly behind the hero, a literal reading of the name, in the festival's gold.
- Original in composition: a pinned scroll-driven hero (stage photographs of the Society zoom past the viewer until a portrait of the founder fills the screen), a sticky chapter story, a pinned production showcase that advances with the scroll, a horizontal editions film strip driven by vertical scroll, word-by-word text reveal, parallax photographs and two strips of real newspaper clippings that slide with the page.

## 5. Technology

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4: the same versions as the festival and Postcards projects, so they share knowledge and tooling. Lockfile-verified (not assumed): `framer-motion` 12.x (Portfolio and LumaCV) and `sharp` 0.35. Added only what is justified: `framer-motion` for the scroll-linked hero parallax. Icons are a small hand-drawn set in `src/components/ui/Icons.tsx` (the icon library no longer ships brand glyphs and the site needs about twenty icons). No CMS, no database, no analytics, no third-party scripts. Details and reasons: `docs/architecture.md`.

## 6. Routes and components

See `docs/architecture.md`.
