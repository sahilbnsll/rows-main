/**
 * Re-downloads the original images and documents of the old website (raysofwisdomsociety.net) into assets/originals,
 * using the list recorded when the site was crawled (docs/data/old-site-download-manifest.json).
 * Existing files are skipped. Run `npm run images` afterwards to rebuild public/images.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const list = JSON.parse(fs.readFileSync(path.join(root, "docs/data/old-site-download-manifest.json"), "utf8"));
let fetched = 0, skipped = 0, failed = 0;
let i = 0;
async function worker() {
  while (i < list.length) {
    const item = list[i++];
    const dest = path.join(root, "assets/originals", item.rel);
    if (fs.existsSync(dest)) { skipped++; continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    try {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(String(res.status));
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      fetched++;
    } catch (e) {
      failed++;
      console.warn("failed", item.url, String(e));
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log({ fetched, skipped, failed });
