// Downloads the remote images listed in asset-sources.mjs: the Google Play
// screenshots (at their original resolution) into assets-src/play/<project>/,
// and the profile photo into assets-src/profile/.
//
//   node scripts/fetch-assets.mjs            download everything
//   node scripts/fetch-assets.mjs --list     print every screenshot URL currently
//                                            on each Google Play listing

import fs from 'node:fs/promises';
import path from 'node:path';
import { playApps, profilePhoto } from './asset-sources.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36';

async function listScreenshots(packageId) {
  const res = await fetch(`https://play.google.com/store/apps/details?id=${packageId}&hl=en&gl=US`, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${packageId}: HTTP ${res.status}`);
  const html = await res.text();
  const urls = [...html.matchAll(/<img[^>]+src="(https:\/\/play-lh\.googleusercontent\.com\/[^"=]+)[^"]*"[^>]*alt="Screenshot image"/g)].map((m) => m[1]);
  return [...new Set(urls)];
}

if (process.argv.includes('--list')) {
  for (const [slug, app] of Object.entries(playApps)) {
    console.log(`\n${slug} (${app.packageId})`);
    (await listScreenshots(app.packageId)).forEach((u, i) => console.log(`  ${String(i).padStart(2, '0')} ${u}`));
  }
  process.exit(0);
}

let failures = 0;

async function download(url, file) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) {
    console.error(`✗ ${path.relative(ROOT, file)}: HTTP ${res.status}`);
    failures++;
    return;
  }
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${path.relative(ROOT, file)}`);
}

for (const [slug, app] of Object.entries(playApps)) {
  for (const [name, url] of Object.entries(app.shots)) {
    // "=s0" asks Google's image server for the original upload size.
    await download(`${url}=s0`, path.join(ROOT, 'assets-src/play', slug, `${name}.png`));
  }
}

await download(profilePhoto, path.join(ROOT, 'assets-src/profile', `cyrus${path.extname(new URL(profilePhoto).pathname)}`));

if (failures) {
  console.error(`\n${failures} download(s) failed. Run with --list to see what the listings currently serve.`);
  process.exit(1);
}
