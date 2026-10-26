// Builds the favicon set and the default social sharing image (og-image.png)
// into public/. The sharing image is rendered with Playwright so it uses the
// site's own typeface, and it shows real project screenshots.
//
//   node scripts/build-brand.mjs   (run after npm run images)

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="9" fill="#635BFF"/>
  <path d="M14.5 10.4a6 6 0 1 0 0 11.2" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M17.6 21.6V10.4l7 11.2V10.4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

await fs.writeFile(path.join(PUBLIC, 'favicon.svg'), mark);
await sharp(Buffer.from(mark), { density: 384 }).resize(32, 32).png().toFile(path.join(PUBLIC, 'favicon-32.png'));
// Apple touch icons are shown on a square tile, so give the mark some padding.
const touch = await sharp(Buffer.from(mark), { density: 768 }).resize(140, 140).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#635BFF' } })
  .composite([{ input: touch, left: 20, top: 20 }])
  .png()
  .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
console.log('✓ favicon.svg, favicon-32.png, apple-touch-icon.png');

// Inlined as data URIs: a page built with setContent cannot read local files.
const inline = async (p, type) => `data:${type};base64,${(await fs.readFile(path.join(ROOT, p))).toString('base64')}`;
const font = await inline('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2', 'font/woff2');
const screen = await inline('public/images/projects/novia-digital-1600.webp', 'image/webp');
const phone = await inline('public/images/projects/dartiq/home.webp', 'image/webp');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: Geist; src: url(${font}) format('woff2'); font-weight: 100 900; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #0b1020; color: #f5f7fb; font-family: Geist, sans-serif; position: relative; }
  .copy { position: absolute; left: 72px; top: 68px; width: 540px; }
  .brand { display: flex; align-items: center; gap: 14px; font-size: 26px; font-weight: 650; letter-spacing: -0.02em; }
  .brand svg { width: 44px; height: 44px; }
  h1 { margin-top: 56px; font-size: 54px; line-height: 1.04; letter-spacing: -0.045em; font-weight: 600; }
  p { margin-top: 22px; font-size: 22px; color: #a6aec4; line-height: 1.4; }
  .list { position: absolute; left: 72px; bottom: 64px; font-size: 20px; color: #f5f7fb; }
  .list span { color: #a5a1ff; margin: 0 10px; }
  .browser { position: absolute; left: 660px; top: 92px; width: 620px; border-radius: 14px; overflow: hidden; background: #fff; box-shadow: 0 30px 60px -20px rgba(0,0,0,.6); }
  .bar { height: 30px; background: #eef0f4; display: flex; align-items: center; gap: 6px; padding: 0 12px; }
  .bar i { width: 9px; height: 9px; border-radius: 50%; background: #d0d5dd; display: block; }
  .browser img { display: block; width: 100%; aspect-ratio: 16/10; object-fit: cover; object-position: top; }
  .phone { position: absolute; left: 1000px; top: 220px; width: 160px; padding: 5px; border-radius: 26px; background: #05070a; box-shadow: 0 30px 60px -20px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.1); }
  .phone img { display: block; width: 100%; border-radius: 21px; }
</style></head><body>
  <div class="copy">
    <div class="brand">${mark}Cyrus Njeru</div>
    <h1>Digital products, mobile apps &amp; AI&#8209;powered experiences.</h1>
    <p>Full-Stack Software Developer · AI &amp; Voice Automation Engineer</p>
  </div>
  <div class="list">Web applications<span>·</span>Android apps<span>·</span>AI agents<span>·</span>Voice automation</div>
  <div class="browser"><div class="bar"><i></i><i></i><i></i></div><img src="${screen}"></div>
  <div class="phone"><img src="${phone}"></div>
</body></html>`;

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL === 'chromium' ? undefined : 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(PUBLIC, 'og-image.png') });
await browser.close();
console.log('✓ og-image.png 1200×630');
