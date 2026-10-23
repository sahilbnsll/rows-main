/**
 * Crawls a running copy of the site (default http://localhost:3200, or pass a base URL) starting at every URL in
 * /sitemap.xml, follows every internal link and every image it finds, and reports anything that is not a 200.
 * Usage: node scripts/check-links.mjs [baseUrl]
 */
const base = (process.argv[2] ?? "http://localhost:3200").replace(/\/$/, "");
const seen = new Map();
const queue = [];

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const u = new URL(m[1]);
  queue.push(u.pathname + u.search);
}
if (!queue.includes("/")) queue.push("/");

const assets = new Set();
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await fetch(base + path, { redirect: "manual" });
  seen.set(path, res.status);
  if (res.status !== 200) continue;
  const html = await res.text();
  for (const m of html.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)) {
    const h = m[1].replace(/&amp;/g, "&");
    if (h.startsWith("/") && !h.startsWith("//") && !/\.(?:png|jpg|pdf|webp|ico|xml|webmanifest|txt)$/.test(h) && !h.startsWith("/_next")) queue.push(h);
    else if (h.startsWith("/documents/") || h.startsWith("/icons/")) assets.add(h);
  }
  for (const m of html.matchAll(/(?:src|srcSet)="(\/_next\/image\?[^"\s,]+)/g)) assets.add(m[1].replace(/&amp;/g, "&"));
}
const bad = [...seen].filter(([, s]) => s !== 200);
let badAssets = 0;
for (const a of assets) {
  const r = await fetch(base + a);
  if (!r.ok) { badAssets++; console.log("ASSET", r.status, a); }
}
console.log(`${seen.size} pages checked, ${bad.length} not OK; ${assets.size} assets checked, ${badAssets} not OK`);
for (const [p, s] of bad) console.log(s, p);
process.exit(bad.length || badAssets ? 1 : 0);
