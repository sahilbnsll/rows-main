/**
 * Draws the two gold-line ornaments that sit in the page margins (public/bg/mandala.svg and public/bg/vine.svg).
 * Both are tall, mostly empty canvases so they can repeat down the page with a long gap between motifs.
 * Run with `node scripts/build-backgrounds.mjs`.
 */
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "../public/bg");
fs.mkdirSync(out, { recursive: true });
const gold = "#b48d3c";
const sage = "#8fa05f";
const r = (n) => Math.round(n * 100) / 100;
const pt = (cx, cy, rad, deg) => [r(cx + Math.cos((deg * Math.PI) / 180) * rad), r(cy + Math.sin((deg * Math.PI) / 180) * rad)];

/** A lotus mandala: rings, two tiers of petals, a ring of dots, a seed in the centre. */
function mandala(H = 2800) {
  const W = 700, cx = 350, cy = 350;
  let g = "";
  for (const rad of [26, 64, 118, 176, 236, 292, 330]) g += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${gold}" stroke-width="${rad === 330 ? 0.7 : 1}" opacity="${rad > 290 ? 0.5 : 0.8}"/>`;
  // outer petals (24), pointed
  for (let i = 0; i < 24; i++) {
    const a = (i * 360) / 24;
    const [x1, y1] = pt(cx, cy, 236, a - 5.2), [x2, y2] = pt(cx, cy, 236, a + 5.2), [tx, ty] = pt(cx, cy, 330, a);
    const [c1x, c1y] = pt(cx, cy, 300, a - 7.5), [c2x, c2y] = pt(cx, cy, 300, a + 7.5);
    g += `<path d="M${x1} ${y1} C${c1x} ${c1y} ${tx} ${ty} ${tx} ${ty} C${tx} ${ty} ${c2x} ${c2y} ${x2} ${y2}" fill="${sage}" fill-opacity="0.12" stroke="${gold}" stroke-width="0.9"/>`;
  }
  // inner petals (16), rounder
  for (let i = 0; i < 16; i++) {
    const a = (i * 360) / 16 + 11.25;
    const [x1, y1] = pt(cx, cy, 118, a - 7), [x2, y2] = pt(cx, cy, 118, a + 7), [tx, ty] = pt(cx, cy, 228, a);
    const [c1x, c1y] = pt(cx, cy, 190, a - 15), [c2x, c2y] = pt(cx, cy, 190, a + 15);
    g += `<path d="M${x1} ${y1} C${c1x} ${c1y} ${tx} ${ty} ${tx} ${ty} C${tx} ${ty} ${c2x} ${c2y} ${x2} ${y2}" fill="none" stroke="${gold}" stroke-width="0.9" opacity="0.9"/>`;
  }
  // dots
  for (let i = 0; i < 48; i++) {
    const [x, y] = pt(cx, cy, 262, (i * 360) / 48);
    g += `<circle cx="${x}" cy="${y}" r="${i % 2 ? 1.6 : 2.4}" fill="${gold}" opacity="0.8"/>`;
  }
  // fine spokes
  for (let i = 0; i < 12; i++) {
    const [x1, y1] = pt(cx, cy, 26, (i * 360) / 12), [x2, y2] = pt(cx, cy, 118, (i * 360) / 12);
    g += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${gold}" stroke-width="0.7" opacity="0.7"/>`;
  }
  g += `<circle cx="${cx}" cy="${cy}" r="9" fill="${gold}" opacity="0.7"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`;
}

/** A curving gold vine with leaves and small blossoms. */
function vine() {
  const W = 420, H = 2800;
  let g = "";
  const stem = "M210 40 C 330 200 90 360 210 560 C 330 760 90 920 210 1120 C 300 1260 160 1380 210 1500";
  g += `<path d="${stem}" fill="none" stroke="${gold}" stroke-width="1.5" opacity="0.8"/>`;
  const leaves = [
    [262, 120, -35], [150, 250, 215], [270, 330, -50], [140, 460, 200], [262, 600, -30], [150, 720, 210], [268, 800, -55], [145, 930, 205], [262, 1070, -30], [190, 1210, 215], [240, 1330, -20],
  ];
  for (const [x, y, rot] of leaves) {
    g += `<path d="M0 0 C 14 -22 44 -26 64 -8 C 44 8 14 10 0 0 Z" transform="translate(${x} ${y}) rotate(${rot})" fill="${sage}" fill-opacity="0.16" stroke="${gold}" stroke-width="1" opacity="0.9"/>`;
    g += `<path d="M0 0 L 56 -9" transform="translate(${x} ${y}) rotate(${rot})" stroke="${gold}" stroke-width="0.6" opacity="0.7"/>`;
  }
  // blossoms: five-petal flowers
  for (const [x, y, s] of [[300, 200, 1], [120, 540, 1.15], [300, 880, 1], [130, 1160, 0.9]]) {
    for (let i = 0; i < 5; i++) {
      const a = (i * 360) / 5 - 90;
      const [px, py] = pt(x, y, 17 * s, a);
      g += `<ellipse cx="${px}" cy="${py}" rx="${11 * s}" ry="${17 * s}" transform="rotate(${a + 90} ${px} ${py})" fill="${gold}" fill-opacity="0.1" stroke="${gold}" stroke-width="1" opacity="0.9"/>`;
    }
    g += `<circle cx="${x}" cy="${y}" r="${4 * s}" fill="${gold}" opacity="0.8"/>`;
  }
  for (const [x, y] of [[210, 40], [210, 1500], [60, 400], [360, 700], [70, 1000], [350, 1300]]) g += `<circle cx="${x}" cy="${y}" r="2.6" fill="${gold}" opacity="0.7"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`;
}

fs.writeFileSync(path.join(out, "mandala.svg"), mandala());
fs.writeFileSync(path.join(out, "mandala-solo.svg"), mandala(700));
fs.writeFileSync(path.join(out, "vine.svg"), vine());
console.log("backgrounds written");
