// Checks the built site in dist/ before deploying:
//  - every local link, image, srcset entry, script and stylesheet exists
//  - links to #sections point at ids that exist on the target page
//  - every <img> has alt text and, unless it is a placeholder, width and height
//  - no two project cards use the same cover image
//  - every external link that opens a new tab has rel="noopener"
//
//   npm run build && npm run verify

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BASE = (process.env.BASE_PATH ?? '/portfolio').replace(/\/+$/, '');

const problems = [];
const pages = new Map();

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith('.html')) pages.set(full, await fs.readFile(full, 'utf8'));
  }
}

const exists = (p) => fs.access(p).then(() => true, () => false);
// Script bodies are skipped so markup inside JavaScript strings is not scanned.
const markup = (html) => html.replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, '$1$2');
const attrs = (html, tag) => [...markup(html).matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map((m) => m[0]);
// A bare attribute (e.g. `alt`, which is how an empty alt is written out) reads as ''.
const attr = (tagHtml, name) => {
  const m = tagHtml.match(new RegExp(`\\s${name}(?:="([^"]*)")?(?=[\\s/>])`, 'i'));
  return m ? (m[1] ?? '') : undefined;
};
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

/** Maps a site URL path to the file that serves it. */
function fileFor(urlPath) {
  if (!urlPath.startsWith(`${BASE}/`) && urlPath !== BASE) return null;
  let rel = decodeURIComponent(urlPath.slice(BASE.length)) || '/';
  if (rel.endsWith('/')) rel += 'index.html';
  return path.join(DIST, rel);
}

await walk(DIST);
if (!pages.size) {
  console.error('No pages in dist/. Run npm run build first.');
  process.exit(1);
}

for (const [file, html] of pages) {
  const page = path.relative(DIST, file);
  const refs = [];
  for (const tag of attrs(html, 'a')) refs.push(['link', attr(tag, 'href'), tag]);
  for (const tag of attrs(html, 'link')) refs.push(['asset', attr(tag, 'href'), tag]);
  for (const tag of attrs(html, 'script')) if (attr(tag, 'src')) refs.push(['asset', attr(tag, 'src'), tag]);
  for (const tag of attrs(html, 'img')) {
    // The lightbox <img> gets its src when opened.
    if (!attr(tag, 'src')) continue;
    refs.push(['image', attr(tag, 'src'), tag]);
    for (const part of (attr(tag, 'srcset') ?? '').split(',').map((s) => s.trim().split(/\s+/)[0]).filter(Boolean)) refs.push(['image', part, tag]);
    if (attr(tag, 'alt') === undefined) problems.push(`${page}: <img> without alt: ${tag.slice(0, 120)}`);
    if (!attr(tag, 'width') || !attr(tag, 'height')) problems.push(`${page}: <img> without width/height (layout shift): ${attr(tag, 'src')}`);
  }

  for (const [kind, ref, tag] of refs) {
    if (!ref || ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('data:')) continue;
    if (/^https?:\/\//.test(ref)) {
      if (attr(tag, 'target') === '_blank' && !/noopener/.test(attr(tag, 'rel') ?? '')) problems.push(`${page}: new-tab link without rel=noopener: ${ref}`);
      continue;
    }
    const [pathPart, hash] = ref.split('#');
    if (!pathPart) {
      if (hash && !ids(html).has(hash)) problems.push(`${page}: #${hash} has no matching id on the page`);
      continue;
    }
    const target = fileFor(pathPart.split('?')[0]);
    if (!target) {
      problems.push(`${page}: ${kind} outside the base path: ${ref}`);
      continue;
    }
    const resolved = (await exists(target)) ? target : (await exists(path.join(target, 'index.html'))) ? path.join(target, 'index.html') : null;
    if (!resolved) {
      problems.push(`${page}: missing ${kind}: ${ref}`);
      continue;
    }
    if (hash && resolved.endsWith('.html')) {
      const other = pages.get(resolved) ?? (await fs.readFile(resolved, 'utf8'));
      if (!ids(other).has(hash)) problems.push(`${page}: ${ref} points at a missing section`);
    }
  }
}

// Each project card on the home page must have its own cover.
const home = pages.get(path.join(DIST, 'index.html')) ?? '';
const covers = [...home.matchAll(/<article class="project-card[^"]*"[^>]*>[\s\S]*?<\/article>/g)]
  .map((m) => m[0].match(/<img[^>]+src="([^"]+)"/)?.[1])
  .filter(Boolean);
const seen = new Set();
for (const src of covers) {
  if (seen.has(src)) problems.push(`index.html: cover image used by more than one project: ${src}`);
  seen.add(src);
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${pages.size} pages checked: links, images, alt text, dimensions and covers are all in order (${covers.length} unique covers).`);
