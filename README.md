# TripleFive254 Ventures · Website

Website for TripleFive254 Ventures, a technology company in Nairobi, Kenya,
founded by Cyrus Njeru. A static [Astro](https://astro.build) site deployed to
GitHub Pages at **https://njerucyrus.github.io/portfolio/**.

The projects on the site are presented as the founder's track record: products
Cyrus has built or worked on, not client work delivered by the company. Keep new
entries and their `role` text in those terms unless a project was delivered
through TripleFive254 Ventures.

- Home page: hero, filterable project gallery (the founder's track record), services, technical stack, about and founder, process, contact
- `/projects/` and a case-study page for every project at `/projects/<slug>/`
- Real screenshots from each live website and Google Play listing, optimised to WebP
- Contact form with validation and a pluggable submission endpoint
- SEO and social metadata, sitemap, favicon set and a 404 page

## Run it locally

Requires Node 22.

```bash
npm install
npm run dev        # http://localhost:4321/portfolio/
npm run build      # outputs to dist/
npm run preview    # serves dist/
```

## Where things live

| To change… | Edit |
| --- | --- |
| Business name, tagline, location, founder details and photo, email, the founder's GitHub/LinkedIn, contact form endpoint | `src/config/site.ts` |
| Projects (text, links, tags, screenshots, order) | `src/data/projects.ts` |
| Filter categories | `src/data/categories.ts` |
| Skills, service cards, process steps, about highlights | `src/data/skills.ts` |
| Logo | Master files in `brand/` (SVG and PNG, plus Google Play assets in `brand/google-play/`). The site uses the cropped copies in `public/brand/`; after changing them, run `npm run brand` to rebuild the favicons and social image |
| Colours, type scale, spacing | `src/styles/global.css` (tokens at the top) |
| Image sources (Play screenshots, pages to capture) | `scripts/asset-sources.mjs` |

Empty values in `site.ts` hide the matching buttons and links, so nothing on the
site points nowhere.

### Adding or editing a project

Add an entry to `projects` in `src/data/projects.ts`. The card, the filters, the
`/projects/` page and the case-study page are generated from it. Sections such as
`purpose`, `role` (the founder's part) and `implementation` only appear when filled
in. If an image is missing, the site shows a labelled placeholder rather than a
broken image.

### Screenshots

Raw captures go to `assets-src/` (git-ignored); optimised copies go to
`public/images/` and are committed.

```bash
npm run assets           # all of the below, in order
npm run assets:fetch     # Google Play screenshots and the founder's photo
npm run assets:capture   # live websites via Playwright (uses your installed Chrome)
npm run images           # composes app covers, writes WebP sizes + src/data/image-manifest.json
npm run brand            # favicons and the default social image
```

To add a screenshot by hand, put a PNG in `assets-src/web/<slug>/` or
`assets-src/play/<slug>/` and run `npm run images`, or drop a finished image in
`public/images/projects/` and point the project's `cover.src` at it.

### Contact form

The site is static, so messages need a form service. Create a form with a service
that accepts JSON POSTs, such as Formspree, Web3Forms or Getform, and paste its URL
into `contactFormEndpoint` in `src/config/site.ts`. Until then, the form validates
input but states plainly that nothing has been sent, and offers the visitor's
email app when `email` is set.

## Checks

```bash
npm run check    # TypeScript and Astro diagnostics
npm run build && npm run verify
```

`verify` crawls `dist/` and fails on missing pages, images or sections, images
without alt text or dimensions, new-tab links without `rel="noopener"`, and
covers shared between projects. The deploy workflow runs it on every push.

## Deploy to GitHub Pages

1. Push this folder to `main` on `github.com/njerucyrus/portfolio`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds, verifies and deploys.

The workflow reads the site URL and base path from the Pages settings, so a custom
domain works without code changes: add it under **Settings → Pages**, and the next
deploy builds for the domain root.
