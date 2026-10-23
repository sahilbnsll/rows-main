# Design system: Paper and Stage

Tokens live in `src/styles/globals.css` (`:root` and `@theme inline`); component classes sit in `@layer components` so Tailwind utilities can override them.

## Colour

| Token | Value | Use |
|---|---|---|
| `cream` | `#f6efe0` | page |
| `paper` | `#fbf7ee` | cards, inputs |
| `sage` / `sage-deep` | `#e2e7d1` / `#c5cfa9` | washes, image placeholders |
| `rose` | `#e8c6bf` | soft washes, form notices |
| `ink` | `#26301a` | text (about 12:1 on cream) |
| `ink-muted` | `#565d4a` | secondary text (6.1:1 on cream; 4.2:1 on `sage-deep`, so small text on sage-deep uses `ink`) |
| `olive` | `#566b30` | seals |
| `maroon` / `maroon-deep` | `#8a1c24` / `#681319` | the one action; the closing band |
| `gold` | `#b48d3c` | hairlines, diamonds, rays. Decorative only (never carries text) |
| `stage` / `stage-raised` | `#161c0f` / `#1f2716` | dark surface. Text on it is `paper` at 100% / 72% |

One dark surface only; no dark mode toggle (colour-scheme is light), by design: the Stage is a section, not a theme.

## Type

DM Serif Display (display and titles), Newsreader (reading, quotes), Hanken Grotesk (interface, meta). Classes: `.display-xl` (home hero), `.page-title` (h1), `.section-title` (h2), `.sub-title` (h3), `.lead`, `.reading` (about 65 characters per line, `max-width: 40rem`), `.meta`. All sizes are `clamp()`; body text 17 to 19 px. No tracked all-caps eyebrows.

## Space, width, shape

`.wrap` (76rem, 86rem from 1680 px; gutter `clamp(1.25rem, .5rem + 3vw, 3rem)`), `.wrap-narrow` (48rem), `.section` and `.section-tight` for vertical rhythm. Radii: 0.75 to 1.25 rem; pills for buttons and chips. Shadows `e1` to `e3`, used sparingly. Breakpoints are Tailwind's (640, 768, 1024, 1280).

## Motion

Durations `--d1` 120 ms (press), `--d2` 200 ms (colour), `--d3` 320 ms (movement), longer for reveals (560 to 1100 ms). Easings `--ease`, `--ease-out`, `--ease-move`. Only transform and opacity animate. Reduced motion: reveals, parallax, marquee and rotation off; content visible.

| Pattern | Class / component |
|---|---|
| Reveal on scroll | `Reveal` (`.reveal`), with `develop` (black and white to colour) and `mask` (uncovered from the bottom) |
| Hero entrance | `.hero-rise`, `.arch-rise` (slide only, no fade) |
| Image hover | `.zoom-on-hover` (hover devices only) |
| Turning rays / emblem | `.emblem-turn`, `.emblem-breathe` |
| Press strip | `.marquee` with pause button, stops on hover and focus |

## Signature devices

Arch (`.arch`, `.arch-frame` with gold hairline outline), lotus rule (`LotusRule`), hills (`Hills`), sprig, seal (`Seal`), perforation (`.perforation`), rays (`Rays`), numbers that are links (`ChapterRail`), diamond separator (`Diamond`, `.motto`).

## Components

| Component | Notes |
|---|---|
| `PageHero` | breadcrumb, h1, lead, meta, actions; `paper` or `stage` tone; optional arch picture |
| `SubNav` | sibling-page chips with `aria-current` |
| `SectionHeader`, `Quote`, `LogoWall` (logos multiplied into the paper), `PersonCard` (portrait or monogram) | |
| `PhotoGrid` + `Viewer` | masonry or grid; full-screen viewer with arrows, swipe, keyboard, thumbnails, captions |
| `VideoEmbed` | thumbnail facade; loads YouTube (nocookie) on click; links out when embedding is disabled |
| `Schedule`, `CopyField`, `MapEmbed` | programme rows; copyable bank details; map on request |

## States

Buttons: hover, `:active` scale, `:disabled` (progress cursor), visible `:focus-visible` ring (maroon on paper, sage on stage). Links: underline offset, arrow nudges. Form fields: inset border, olive focus, maroon invalid with text error (`aria-invalid`, `aria-describedby`). Loading: contact submit shows "Sending…". Empty and error: `not-found.tsx`, `error.tsx`, form status messages.

## Accessibility conventions

Skip link; one h1 per page; landmarks (`header`, `nav` with labels, `main`, `footer`); interactive targets are at least 36 px tall and primary controls 44 px (WCAG 2.2 AA asks for 24 px); text alternatives on every photograph (decorative duplicates have `alt=""`); dialogs are native; the moving strip has a pause control; links that open new tabs say so for screen readers.
