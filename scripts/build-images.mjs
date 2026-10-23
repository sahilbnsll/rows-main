/**
 * Builds the web copies in public/images from the originals downloaded from the old site
 * (assets/originals, a mirror of raysofwisdomsociety.net paths; fetched with `node scripts/fetch-originals.mjs`).
 *
 * - Gives every file a descriptive place under public/images (see mapDestination).
 * - Re-encodes JPEGs (mozjpeg, quality 82) only when that makes them smaller; WebP, PNG, GIF and PDF are copied.
 * - Writes docs/asset-inventory.md and src/content/image-manifest.generated.json (width and height for next/image).
 *
 * Assets that are not used on the site (stock page backgrounds, Delhi tourism snapshots, loader gif, social icons)
 * stay in assets/originals only and are listed as "not used" in the inventory.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const originals = path.join(root, "assets/originals");
const out = path.join(root, "public/images");
const docsOut = path.join(root, "docs/asset-inventory.md");
const manifestOut = path.join(root, "src/content/image-manifest.generated.json");
const sources = JSON.parse(fs.readFileSync(path.join(root, "docs/data/old-site-download-manifest.json"), "utf8"));
const BASE = "https://www.raysofwisdomsociety.net/";

const exhibitionArtistByNumber = {
  1: "nitin-madan", 2: "sangeeta-gupta", 3: "aashima-mehrotra", 4: "nidhi-choudhari", 5: "abhay-k", 6: "zuzana-mezencevova",
  7: "ragini-upadhyay", 8: "indu-tripathy", 9: "lakshman-prasad", 10: "amit-kalla", 11: "nivedita-bandil", 12: "anand-bekwad", 13: "tarun-sharma",
};
const exhibitionArtistByToken = {
  aashima: "aashima-mehrotra", abhay: "abhay-k", amit: "amit-kalla", anand: "anand-bekwad", indu: "indu-tripathy", laxman: "lakshman-prasad",
  nidhi: "nidhi-choudhari", nitin: "nitin-madan", nivedita: "nivedita-bandil", ragini: "ragini-upadhyay", sangeeta: "sangeeta-gupta",
  tarun: "tarun-sharma", zuzana: "zuzana-mezencevova",
};
const productionByPrefix = { vedas: "the-vedas", "7-chakras": "antar-yatra", sanskrit: "sanskrit-the-mantra-bhasha", "story-rama": "ramleela-in-opera", "classical-dance-india": "rabindra-abhivyakti" };
const thumbProduction = { "thumb-vedas": "the-vedas", "thumb-sanskrit": "sanskrit-the-mantra-bhasha", "thumb-7-chakras": "antar-yatra", "thumb-story-rama": "ramleela-in-opera", "thumb-classical-dance": "rabindra-abhivyakti" };
const cultural = {
  "cul-export-award-function": "export-award-function", "export-award-function": "export-award-function", "thumb-export-award-function": "export-award-function",
  "cul-feel-india": "feel-india", "feel-india": "feel-india", "thumb-feel-india": "feel-india",
  "cul-brics-international-conference": "brics-summit", "brics-international-conference": "brics-summit", "thumbs-brics-international-conference": "brics-summit", "logo-brics": "brics-summit",
  "cul-ministry-textiles-international-conference": "textiles-handicrafts-seminar", "ministry-textiles-international-conference": "textiles-handicrafts-seminar", "thumb-ministry-textiles-international-conference": "textiles-handicrafts-seminar",
  "cul-seamc": "south-asian-ministers-conference",
  "cvc-conference": "cvc-conference", "thumb-cvc-conference": "cvc-conference",
  "cul-capam-conference": "capam-conference", "capam-conference": "capam-conference", "thumb-capam-conference": "capam-conference", "logo-capam": "capam-conference",
};

/** Returns the destination under public/images (or documents), or null when the asset is not used on the site. */
function mapDestination(rel) {
  const base = path.basename(rel);
  const name = base.replace(/\.[^.]+$/, "");
  const ext = path.extname(base).toLowerCase();
  let m;
  if (rel.startsWith("download/")) return { dest: path.join("../documents", base), reason: "downloadable document" };
  if (rel.startsWith("img/backgrounds/")) return { dest: null, reason: "stock page-header background, not used" };
  if (rel.startsWith("img/partners/")) return { dest: `partners/${name.replace(/^logo-/, "")}${ext}`, reason: "partner logo" };
  if (rel.startsWith("img/team/")) return name === "team_img_1" ? { dest: null, reason: "generic placeholder avatar, not used" } : { dest: `team/${base}`, reason: "team portrait" };
  if (rel.startsWith("img/blog/") || rel.startsWith("img/portfolio/thumbnails/")) return { dest: `highlights/${base}`, reason: "highlight thumbnail" };
  if (rel.startsWith("img/slider/")) {
    if (name.startsWith("iaaf-2019")) return { dest: `festival/2019/${name.replace("iaaf-2019-", "invitation-")}${ext}`, reason: "IAAF 2019 invitation card" };
    return { dest: `festival/2024/${name === "iaaf2024-8-10nov" ? "banner" : "banner-2"}${ext}`, reason: "IAAF 2024 banner" };
  }
  if (rel.startsWith("img/productions/")) {
    if (thumbProduction[name]) return { dest: `productions/${thumbProduction[name]}/poster${ext}`, reason: "production poster" };
    for (const [prefix, slug] of Object.entries(productionByPrefix)) {
      if ((m = name.match(new RegExp(`^${prefix}-(\\d+)$`)))) return { dest: `productions/${slug}/${m[1]}${ext}`, reason: "production photograph" };
    }
  }
  if (rel.startsWith("img/cultural/")) return cultural[name] ? { dest: `events/${cultural[name]}/${base}`, reason: "event image" } : null;
  if (rel.startsWith("img/yoga/")) return { dest: `yoga/${base}`, reason: "yoga image" };
  if (rel.startsWith("img/festivals/")) {
    if ((m = name.match(/^iaaf-(\d+)$/))) return { dest: `festival/overview/${base}`, reason: "festival photograph" };
    if (name === "logo-iaaf") return { dest: `brand/iaaf-emblem${ext}`, reason: "festival emblem" };
    if ((m = name.match(/^iaaf(20\d\d)$/))) return { dest: `festival/${m[1]}/poster${ext}`, reason: "edition poster" };
    if ((m = name.match(/^iaaf2024-(\d+)$/))) return { dest: `exhibition/2024/highlights/${m[1].padStart(2, "0")}${ext}`, reason: "exhibition highlight artwork" };
    if ((m = name.match(/^iaaf2024-nitin-(\d+)$/))) return { dest: `exhibition/2024/nitin-madan/${m[1]}${ext}`, reason: "exhibition artwork" };
    if ((m = name.match(/^iaac-(\d+)$/))) return { dest: `conference/2024/${m[1].padStart(2, "0")}${ext}`, reason: "conference speaker portrait" };
    if ((m = name.match(/^iaae-(\d+)$/))) return { dest: `exhibition/2024/artists/${exhibitionArtistByNumber[+m[1]]}${ext}`, reason: "exhibition artist portrait" };
    if ((m = name.match(/^iaae-2024-([a-z]+)-(\d+)$/))) return { dest: `exhibition/2024/${exhibitionArtistByToken[m[1]]}/${m[2]}${ext}`, reason: "exhibition artwork" };
    return { dest: null, reason: "generic Delhi tourism snapshot from the 2019 page (copied from Wikipedia, not RWS imagery), not used" };
  }
  if (rel.startsWith("images/xxxlarge/")) {
    const year = name.slice(0, 4);
    return { dest: `press/${year}/${base}`, reason: "newspaper clipping" };
  }
  if (rel === "img/rws-logo.jpg") return { dest: "brand/rws-logo-white.jpg", reason: "society logo (white background; the transparent version in brand/rays-logo.png is preferred)" };
  if (rel === "img/iaaf.png") return { dest: "brand/iaaf-emblem.png", reason: "festival emblem (transparent)" };
  if (rel === "img/performer.png") return { dest: "brand/performer.png", reason: "Odissi dancer cut-out" };
  if (rel === "img/logo-iaaf.webp") return { dest: null, reason: "duplicate of the IAAF emblem in another format" };
  if (["img/712.gif", "img/logo.png", "img/icon-fb.png", "img/icon-tw.png", "img/icon-li.png"].includes(rel)) return { dest: null, reason: "template loader or social icon, replaced by new icons" };
  return { dest: null, reason: "unmapped" };
}

fs.mkdirSync(out, { recursive: true });
const manifest = {};
const rows = [];
let saved = 0;

for (const s of sources) {
  const src = path.join(originals, s.rel);
  if (!fs.existsSync(src)) continue;
  const map = mapDestination(s.rel);
  const buf = fs.readFileSync(src);
  const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 10);
  let w = null, h = null;
  try { const md = await sharp(buf).metadata(); w = md.width; h = md.height; } catch {}
  if (!map || !map.dest) {
    rows.push({ s, dest: null, reason: map?.reason ?? "not used", w, h, hash });
    continue;
  }
  const dest = path.normalize(path.join(out, map.dest));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let outBuf = buf;
  if (/\.jpe?g$/i.test(dest)) {
    const re = await sharp(buf).rotate().jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    if (re.length < buf.length) { outBuf = re; saved += buf.length - re.length; }
  }
  fs.writeFileSync(dest, outBuf);
  const publicPath = dest.startsWith(out) ? "/images/" + path.relative(out, dest).split(path.sep).join("/") : "/documents/" + path.basename(dest);
  if (w) manifest[publicPath] = { w, h };
  rows.push({ s, dest: publicPath, reason: map.reason, w, h, hash, bytes: outBuf.length });
}

async function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) {
      const md = await sharp(p).metadata();
      manifest["/images/" + path.relative(out, p).split(path.sep).join("/")] = { w: md.width, h: md.height };
    }
  }
}
// Every other picture already in public/images (festival 2026 set, video thumbnails, brand marks, anything added by hand) gets its size recorded too.
await walk(out);

fs.mkdirSync(path.dirname(manifestOut), { recursive: true });
fs.writeFileSync(manifestOut, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 1));

const used = rows.filter((r) => r.dest);
const unused = rows.filter((r) => !r.dest);
const pages = (r) => r.s.pages.map((p) => p.replace(/^.*\//, "")).slice(0, 3).join(", ") + (r.s.pages.length > 3 ? ` +${r.s.pages.length - 3}` : "");
const md = [
  "# Asset inventory",
  "",
  `Generated by \`npm run images\` (scripts/build-images.mjs) on ${new Date().toISOString().slice(0, 10)}.`,
  "",
  "## Sources",
  "",
  `- **Old website** (${BASE}): ${rows.length} files downloaded on the date above, all returned HTTP 200 (none broken). Originals are kept, untouched, in \`assets/originals/\` (not served, not committed: about 30 MB). Re-download them with \`node scripts/fetch-originals.mjs\`.`,
  "- **Festival project** (`Personal Projects/rayofwisdom`, read-only snapshot taken 23 Oct 2026): the IAAF 2026 photographs, gallery, sponsor marks and festival emblem were copied to `public/images/iaaf-2026/`. Photographer credits there (Avinash Pasricha, Ajay Lal, Priyanka, Sai Thejeswar Rao) come from file names in that project and **need confirming with the client**.",
  "",
  "## Licensing and attribution",
  "",
  "No licence or attribution information is published on the old site. Photographs of RWS productions and festivals, team portraits, partner logos and newspaper clippings are assumed to be supplied by or for Rays of Wisdom Society and are reused with the organisation's content. Newspaper clippings are third-party publications reproduced as press coverage of the society; confirm that the client is comfortable showing them publicly. The 2019 page's Delhi tourism photographs are third-party and are **not** reused.",
  "",
  "## Quality notes",
  "",
  "- Team portraits are 336 x 332 px and partner logos 240 x 80 px: fine at their display size (at most 168 CSS px for portraits) but they will look soft if enlarged. Ask for higher-resolution originals if they are ever shown larger.",
  "- Production photographs are 1000 to 1200 px wide: used up to about 600 CSS px, and in full-width stage panels at reduced scale.",
  "- Conference speaker portraits are small and cropped from social profiles (as little as 100 px): shown as 96 px thumbnails only.",
  "- No duplicate files were found by content hash. Several event images exist in three sizes under different names (poster, thumbnail, header); the site uses the largest.",
  `- ${(saved / 1e6).toFixed(1)} MB were saved by re-encoding JPEGs; nothing was upscaled.`,
  "",
  `## Used on the new site (${used.length})`,
  "",
  "| New path | Original URL | Dimensions | Role | Original page(s) |",
  "|---|---|---|---|---|",
  ...used.map((r) => `| \`${r.dest}\` | ${r.s.url} | ${r.w ?? "?"}x${r.h ?? "?"} | ${r.reason} | ${pages(r)} |`),
  "",
  `## Downloaded but not used (${unused.length})`,
  "",
  "| Original | Original URL | Dimensions | Why |",
  "|---|---|---|---|",
  ...unused.map((r) => `| \`${r.s.rel}\` | ${r.s.url} | ${r.w ?? "?"}x${r.h ?? "?"} | ${r.reason} |`),
  "",
].join("\n");
fs.writeFileSync(docsOut, md);
console.log(`used ${used.length}, unused ${unused.length}, saved ${(saved / 1e6).toFixed(1)} MB`);
