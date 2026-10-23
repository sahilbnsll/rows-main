# Rays of Wisdom Society: website

The redesigned website of [Rays of Wisdom Society](https://www.raysofwisdomsociety.net/), New Delhi: a registered non-profit that produces dance with a spiritual message, holds the International Ancient Arts Festival (IAAF) and organises yoga for health. Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. Content is typed files in the repository; there is no CMS or database.

The visual language is drawn from the IAAF 2026 festival page (cream paper, olive ink, sage and rose watercolour, maroon and gold) and extended with a dark "Stage" surface for the productions. See `docs/`.

## Prerequisites

Node.js 20.9 or newer (the version in `.nvmrc`, 24, is what it is developed on) and npm.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start     # production build
```

Other scripts:

| Script | What it does |
|---|---|
| `npm run lint`, `npm run typecheck` | ESLint, TypeScript |
| `npm run check` | Both of the above, in one go |
| `npm run images` | Rebuilds `public/images` and the image manifest from `assets/originals` (see `docs/asset-inventory.md`) |
| `npm run fetch:originals` | Re-downloads the originals from the old site if `assets/originals` is missing (it is not committed) |
| `npm run backgrounds` | Redraws the gold mandala and vine ornaments in `public/bg/` |
| `npm run icons` | Redraws favicon, app icons and the 1200 x 630 share card |
| `npm run check:links` | With a server running, crawls every page and image and reports anything that is not 200 (`node scripts/check-links.mjs http://localhost:3000`) |

## Project structure

```
src/
  app/            routes (App Router), metadata, sitemap, robots, the contact API
  components/
    home/         sections of the home page
    layout/       header, footer, page hero
    sections/     larger blocks used by inner pages (timeline, globe, galleries, wheels)
    ui/           small shared pieces (viewer, photo grid, seal, lamp, folders, book)
    seo/          structured data
  content/        every word and picture reference on the site, as typed files and JSON
  lib/            helpers (SEO, site address, contact validation, redirects)
  styles/         design tokens and component styles (globals.css and its imports)
public/           web-sized images, documents, icons and background ornaments
scripts/          image, icon and background builders, link checker
docs/             design audit, design system, architecture, inventories, status
  reference/      the UI component library the design draws on
```

## Configuration (`.env.example`)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Final address, used for canonical links, sitemap and share cards |
| `NEXT_PUBLIC_INDEXABLE` | Leave unset or `false` while in draft (site is `noindex`, `robots.txt` blocks all). Set `true` at launch. **Build-time**: redeploy after changing |
| `NEXT_PUBLIC_EPASS_URL` | Address of the IAAF 2026 e-pass site; empty hides the e-pass buttons |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Delivery of the contact form (server only). Until set, the form tells visitors their message was **not** sent and gives the email address |

No secrets are committed. Never put the Resend key in a `NEXT_PUBLIC_` variable.

## Editing content

All copy and data live in `src/content/` (see `docs/architecture.md`): `site.ts` (contact details, navigation), `team.ts`, `partners.ts`, `productions.ts`, `festival.ts`, `festival-2026.ts`, `events.ts`, `yoga.ts`, `testimonials.ts`, and JSON in `src/content/data/`. To add a photograph, put the original in `assets/originals/`, add a mapping rule in `scripts/build-images.mjs` (or drop a web-sized file straight into `public/images/` and run `npm run images` to register its size), then reference it with `photo("/images/...", "description")`. A wrong path stops the build.

## Deploying (Vercel recommended)

1. Push the repository and import it in Vercel (framework: Next.js; no build settings needed).
2. Add the environment variables above.
3. Deploy, check the preview, then add the domain. Old `.html` addresses redirect automatically.
4. At go-live set `NEXT_PUBLIC_INDEXABLE=true` and redeploy; submit `/sitemap.xml` to Google Search Console.

Any host that runs Node (or a platform that supports Next.js) works; the only server code is `/api/contact`.

## Documentation

- `docs/design-audit.md`: what was learned from the four reference projects and the visual direction
- `docs/design-system.md`: tokens, type, motion, components, accessibility
- `docs/architecture.md`: stack, routes, folders, decisions, security
- `docs/content-inventory.md`: every old page, its new home, inconsistencies to confirm
- `docs/asset-inventory.md`: every downloaded file, source URL, size, use (generated)
- `docs/implementation-status.md`: what was verified, what was not, what is still needed
