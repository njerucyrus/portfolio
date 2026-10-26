// Turns the raw captures in assets-src/ into optimised WebP files under
// public/images/projects/ and records their dimensions in
// src/data/image-manifest.json, which the site uses for srcset and to reserve
// space before each image loads.
//
// Mobile app covers are compositions of the apps' own store screenshots on a
// ground colour taken from those screenshots. No interface is redrawn.

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'assets-src');
const PUBLIC = path.join(ROOT, 'public');
const OUT_DIR = 'images/projects';
const OG_DIR = 'images/og';
const MANIFEST = path.join(ROOT, 'src/data/image-manifest.json');

const manifest = {};

const exists = (p) => fs.access(p).then(() => true, () => false);

/**
 * Writes `input` as WebP at each width (never upscaling). The largest copy is
 * saved at `<dir>/<name>.webp`, smaller ones at `<dir>/<name>-<width>.webp`.
 */
async function emit(input, name, widths, dir = OUT_DIR) {
  const source = await sharp(input).metadata();
  const largest = Math.min(source.width, Math.max(...widths));
  const sizes = widths.filter((w) => w < largest).concat(largest);
  const width = largest;
  const height = Math.round((source.height * largest) / source.width);
  const variants = [];
  for (const w of sizes) {
    const rel = w === largest ? `${dir}/${name}.webp` : `${dir}/${name}-${w}.webp`;
    const file = path.join(PUBLIC, rel);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await sharp(input).resize({ width: w }).webp({ quality: 82, effort: 5 }).toFile(file);
    variants.push({ width: w, src: rel });
  }
  manifest[`${dir}/${name}.webp`] = { width, height, variants };
  console.log(`✓ ${dir}/${name}.webp  ${width}×${height}  [${sizes.join(', ')}]`);
}

/** A 1200×630 JPEG for link previews, cropped from the top of a cover. */
async function emitOg(input, name) {
  const file = path.join(PUBLIC, OG_DIR, `${name}.jpg`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await sharp(input).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 82, mozjpeg: true }).toFile(file);
  console.log(`✓ ${OG_DIR}/${name}.jpg  1200×630`);
}

/** Crops a desktop capture to 16:10 from the top, losing nothing above the fold. */
async function crop1610(file) {
  const { width, height } = await sharp(file).metadata();
  const h = Math.min(height, Math.round((width * 10) / 16));
  return sharp(file).extract({ left: 0, top: 0, width, height: h }).png().toBuffer();
}

function roundedMask(w, h, r) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`);
}

/** A plain phone body around an authentic screenshot. */
async function phone(file, screenWidth) {
  const meta = await sharp(file).metadata();
  const screenHeight = Math.round((screenWidth * meta.height) / meta.width);
  const bezel = Math.round(screenWidth * 0.027);
  const radius = Math.round(screenWidth * 0.1);
  const screen = await sharp(file)
    .resize(screenWidth, screenHeight)
    .composite([{ input: roundedMask(screenWidth, screenHeight, radius - bezel), blend: 'dest-in' }])
    .png()
    .toBuffer();
  const w = screenWidth + bezel * 2;
  const h = screenHeight + bezel * 2;
  const body = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="${radius}" fill="#020303" stroke="#3a423e" stroke-width="2"/>
    </svg>`,
  );
  return {
    width: w,
    height: h,
    buffer: await sharp(body).composite([{ input: screen, left: bezel, top: bezel }]).png().toBuffer(),
  };
}

const W = 2400;
const H = 1500;

const covers = {
  // Three raw DartsIQ phone screenshots, framed, on the app's own near-black.
  async dartiq() {
    const dir = path.join(SRC, 'play/dartiq');
    const [left, centre, right] = await Promise.all(['home', 'board', 'stats'].map((n) => phone(path.join(dir, `${n}.png`), 600)));
    const gap = 70;
    const cx = Math.round((W - centre.width) / 2);
    return sharp({ create: { width: W, height: H, channels: 3, background: '#0f1613' } })
      .composite([
        { input: left.buffer, left: cx - gap - left.width, top: 230 },
        { input: right.buffer, left: cx + centre.width + gap, top: 230 },
        { input: centre.buffer, left: cx, top: 110 },
      ])
      .png()
      .toBuffer();
  },

  // Three INR Notebook store panels side by side. The panels share one
  // background, so placed edge to edge they read as a single strip.
  async 'inr-notebook'() {
    const dir = path.join(SRC, 'play/inr-notebook');
    const panelWidth = W / 3;
    const panels = await Promise.all(
      ['inr-chart', 'home', 'warfarin'].map(async (n) => {
        const resized = await sharp(path.join(dir, `${n}.png`)).resize({ height: H }).png().toBuffer();
        const { width } = await sharp(resized).metadata();
        return sharp(resized).extract({ left: Math.round((width - panelWidth) / 2), top: 0, width: panelWidth, height: H }).png().toBuffer();
      }),
    );
    return sharp({ create: { width: W, height: H, channels: 3, background: '#0a4b45' } })
      .composite(panels.map((input, i) => ({ input, left: i * panelWidth, top: 0 })))
      .png()
      .toBuffer();
  },

  // The store's own landscape tablet panel, trimmed from 16:9 to 16:10.
  async 'novia-digital-scan'() {
    const file = path.join(SRC, 'play/novia-digital-scan/tablet-item.png');
    const { width, height } = await sharp(file).metadata();
    const w = Math.round((height * 16) / 10);
    return sharp(file).extract({ left: Math.round((width - w) / 2), top: 0, width: w, height }).png().toBuffer();
  },
};

// Which captured page becomes the card cover for each website.
const webCovers = {
  'novia-digital': 'home',
  'nexus-portal': 'home',
  'macaws-ai': 'home',
  'standard-print-stitch': 'home',
  'oliver-embroidery': 'product',
  'viyu-hub': 'home',
};

const DESKTOP_WIDTHS = [800, 1600, 2400];
const PHONE_WIDTHS = [360, 720];
const TABLET_WIDTHS = [800, 1600];

// Mobile app covers and store screenshots.
for (const [slug, compose] of Object.entries(covers)) {
  const dir = path.join(SRC, 'play', slug);
  if (!(await exists(dir))) {
    console.warn(`… skipped ${slug}: no screenshots in ${path.relative(ROOT, dir)} (run npm run assets:fetch)`);
    continue;
  }
  const cover = await compose();
  await emit(cover, slug, DESKTOP_WIDTHS);
  await emitOg(cover, slug);
  for (const file of (await fs.readdir(dir)).filter((f) => f.endsWith('.png'))) {
    const name = path.basename(file, '.png');
    await emit(path.join(dir, file), `${slug}/${name}`, name.startsWith('tablet-') ? TABLET_WIDTHS : PHONE_WIDTHS);
  }
}

// Website captures.
for (const [slug, coverPage] of Object.entries(webCovers)) {
  const dir = path.join(SRC, 'web', slug);
  if (!(await exists(dir))) {
    console.warn(`… skipped ${slug}: no captures in ${path.relative(ROOT, dir)} (run npm run assets:capture)`);
    continue;
  }
  for (const file of (await fs.readdir(dir)).filter((f) => f.endsWith('.png'))) {
    const name = path.basename(file, '.png');
    const full = path.join(dir, file);
    if (name === 'mobile') {
      await emit(full, `${slug}/${name}`, PHONE_WIDTHS);
      continue;
    }
    const cropped = await crop1610(full);
    await emit(cropped, `${slug}/${name}`, DESKTOP_WIDTHS);
    if (name === coverPage) {
      await emit(cropped, slug, DESKTOP_WIDTHS);
      await emitOg(cropped, slug);
    }
  }
}

// Profile photo.
const profileDir = path.join(SRC, 'profile');
if (await exists(profileDir)) {
  const photo = (await fs.readdir(profileDir)).find((f) => /^cyrus\.(webp|jpe?g|png|avif)$/i.test(f));
  if (photo) await emit(path.join(profileDir, photo), 'cyrus', [240, 480], 'images');
} else {
  console.warn('… skipped profile photo: none in assets-src/profile (run npm run assets:fetch)');
}

// Keep entries for images that were built earlier but not rebuilt this run.
const previous = (await exists(MANIFEST)) ? JSON.parse(await fs.readFile(MANIFEST, 'utf8')) : {};
const merged = Object.fromEntries(Object.entries({ ...previous, ...manifest }).sort(([a], [b]) => a.localeCompare(b)));
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
await fs.writeFile(MANIFEST, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`\n${Object.keys(manifest).length} images built, manifest at ${path.relative(ROOT, MANIFEST)}`);
