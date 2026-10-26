// Captures the live project websites listed in asset-sources.mjs with Playwright.
// Only public pages are visited; nothing behind a login is captured.
//
//   node scripts/capture-websites.mjs                 every project
//   node scripts/capture-websites.mjs nexus-portal    one project
//
// Uses the locally installed Google Chrome. Set PW_CHANNEL=chromium to use
// Playwright's bundled browser instead (run `npx playwright install chromium` first).

import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { webPages } from './asset-sources.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'assets-src/web');
const DESKTOP = { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 };
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

const only = process.argv.slice(2);
const channel = process.env.PW_CHANNEL === 'chromium' ? undefined : 'chrome';
const browser = await chromium.launch({ channel });

// Cookie banners are declined, never accepted.
async function dismissBanners(page) {
  for (const label of [/^no thanks$/i, /^reject all$/i, /^decline$/i, /^only necessary$/i]) {
    const button = page.getByRole('button', { name: label }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      await page.waitForTimeout(400);
    }
  }
}

// Scroll through the page so lazy images and scroll-triggered sections load.
async function warmUp(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(1200);
}

async function capture(slug, shot) {
  const context = await browser.newContext({ ...(shot.mobile ? MOBILE : DESKTOP), reducedMotion: 'reduce', locale: 'en-GB' });
  const page = await context.newPage();
  try {
    await page.goto(shot.url, { waitUntil: 'networkidle', timeout: 60_000 });
    await page.waitForTimeout(1500);
    await dismissBanners(page);
    await warmUp(page);
    if (shot.scrollTo) {
      const target = page.locator(shot.scrollTo).first();
      await target.waitFor({ timeout: 10_000 });
      const top = await target.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
      await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 96)), top);
      await page.waitForTimeout(900);
    }
    const file = path.join(OUT, slug, `${shot.name}.png`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await page.screenshot({ path: file });
    console.log(`✓ ${path.relative(ROOT, file)}`);
    return true;
  } catch (error) {
    console.error(`✗ ${slug}/${shot.name}: ${error.message.split('\n')[0]}`);
    return false;
  } finally {
    await context.close();
  }
}

const jobs = Object.entries(webPages)
  .filter(([slug]) => !only.length || only.includes(slug))
  .flatMap(([slug, shots]) => shots.map((shot) => [slug, shot]));

let failures = 0;
const workers = Array.from({ length: 4 }, async () => {
  while (jobs.length) {
    const [slug, shot] = jobs.shift();
    if (!(await capture(slug, shot))) failures++;
  }
});
await Promise.all(workers);
await browser.close();
if (failures) process.exit(1);
