/**
 * Draws the favicon, app icons and the 1200 x 630 share card from the society's logo and the festival photographs.
 *   public/icons/icon-192.png, icon-512.png, maskable-512.png   (web app manifest)
 *   src/app/icon.png, src/app/apple-icon.png                    (favicon and iPhone home screen)
 *   src/app/opengraph-image.jpg, twitter-image.jpg              (link previews on WhatsApp, X, LinkedIn, Facebook)
 * Run with `npm run icons` after changing the logo or the photographs below.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const pub = (p) => path.join(root, "public", p);
const cream = "#f6efe0";

fs.mkdirSync(pub("icons"), { recursive: true });

async function icon(size, file, scale = 0.7) {
  const logo = await sharp(pub("images/brand/rays-logo.png")).resize({ width: Math.round(size * scale), height: Math.round(size * scale), fit: "inside" }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: cream } }).composite([{ input: logo, gravity: "center" }]).png().toFile(file);
}
await icon(192, pub("icons/icon-192.png"));
await icon(512, pub("icons/icon-512.png"));
await icon(512, pub("icons/maskable-512.png"), 0.5);
await icon(96, path.join(root, "src/app/icon.png"), 0.8);
await icon(180, path.join(root, "src/app/apple-icon.png"), 0.74);

// Share card: cream paper, the name and the mission on the left, three temple arches on the right.
const W = 1200;
const H = 630;
const archPath = (w, h) => `<svg width="${w}" height="${h}"><path d="M0 ${h} V${w / 2} A${w / 2} ${w / 2} 0 0 1 ${w} ${w / 2} V${h} Z" fill="#fff"/></svg>`;
const photos = [
  { file: "images/iaaf-2026/artists/amrita-red.jpg", w: 150, h: 330, x: 690, y: 210 },
  { file: "images/iaaf-2026/artists/madhavi-color-a.jpg", w: 170, h: 440, x: 850, y: 120 },
  { file: "images/iaaf-2026/artists/gauri-twirl.jpg", w: 150, h: 360, x: 1030, y: 180 },
];
const layers = [];
for (const p of photos) {
  const img = await sharp(pub(p.file)).resize(p.w, p.h, { fit: "cover", position: "attention" }).toBuffer();
  const masked = await sharp(img).composite([{ input: Buffer.from(archPath(p.w, p.h)), blend: "dest-in" }]).png().toBuffer();
  layers.push({ input: masked, left: p.x, top: p.y });
}
const logo = await sharp(pub("images/brand/rays-logo.png")).resize({ height: 110 }).toBuffer();
const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .t { font-family: 'DM Serif Display', Georgia, 'Times New Roman', serif; fill: #1d2714; }
    .s { font-family: Georgia, 'Times New Roman', serif; fill: #565d4a; }
    .m { font-family: Georgia, 'Times New Roman', serif; fill: #8a1c24; }
  </style>
  <text x="70" y="285" class="t" font-size="64">The wisdom behind</text>
  <text x="70" y="358" class="t" font-size="64">ancient rituals</text>
  <text x="70" y="431" class="t" font-size="64">and practices</text>
  <text x="72" y="492" class="s" font-size="27" font-style="italic">Rays of Wisdom Society, New Delhi</text>
  <text x="72" y="540" class="m" font-size="24">IAAF 2026 · 25 to 26 November</text>
  <path d="M70 478 H300" stroke="#b48d3c" stroke-width="1.5" opacity="0"/>
</svg>`);
const card = await sharp({ create: { width: W, height: H, channels: 3, background: cream } })
  .composite([{ input: logo, left: 70, top: 60 }, ...layers, { input: text, left: 0, top: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();
fs.writeFileSync(path.join(root, "src/app/opengraph-image.jpg"), card);
fs.writeFileSync(path.join(root, "src/app/twitter-image.jpg"), card);
console.log("icons and share card written");
