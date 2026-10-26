// Every project on the site comes from this file. Add, edit, reorder or remove
// entries here; the home page gallery, filters, /projects/ and each
// /projects/<slug>/ page are generated from it.
//
// Descriptions were written from the live websites and Google Play listings on
// 26 October 2026. Technologies listed under `tags` and `stack` are only those
// that could be confirmed from the outside (response headers, page source, store
// listing). Add your own stack details (e.g. Kotlin, Jetpack Compose, Django)
// once you have confirmed them, and fill in `role` to describe your part.
//
// Image paths are relative to /public. Run `npm run images` after adding raw
// screenshots; a missing image falls back to a labelled placeholder. A website's
// `gallery` holds the screenshots beyond its cover, which is shown above it.

import type { CategoryId } from './categories';

export type LinkKind = 'website' | 'google-play' | 'contact';

export interface ProjectLink {
  kind: LinkKind;
  label: string;
  href: string;
}

export interface Shot {
  src: string;
  alt: string;
  caption?: string;
  /** desktop: 16:10 browser capture. phone/tablet: raw device screen. panel: store graphic with its own frame and caption. */
  device: 'desktop' | 'phone' | 'tablet' | 'panel';
  /** Address shown in the browser frame, when it differs from the cover's. */
  host?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Short descriptor shown with the category badges, e.g. "Android app". */
  kind: string;
  categories: CategoryId[];
  /** One or two sentences for the project card. */
  summary: string;
  /** Up to four confirmed technologies or platform facts for the card. */
  tags: string[];
  /** null shows the designed placeholder until a real visual exists. */
  cover: {
    src: string;
    alt: string;
    /** browser: shown inside a browser window. plain: the image fills the frame (already composed). */
    frame: 'browser' | 'plain';
    host?: string;
  } | null;
  /** Background for the card's image area, taken from the product's own colours. */
  ground: string;
  /** The first link is the primary action. */
  links: ProjectLink[];
  overview: string[];
  purpose?: string;
  features: string[];
  /** Your part in the project. Shown only when filled in. */
  role?: string[];
  implementation?: string[];
  stack: string[];
  facts: { label: string; value: string }[];
  gallery: Shot[];
  related?: { slug: string; note: string }[];
  note?: string;
  /** What the description was checked against. */
  sources: { label: string; href: string }[];
}

const img = (path: string) => `images/projects/${path}.webp`;

export const projects: Project[] = [
  {
    slug: 'novia-digital',
    name: 'Novia Digital',
    kind: 'SaaS platform',
    categories: ['web', 'automation'],
    summary:
      'Software for embroidery and print shops: an online shop, quotes customers accept and pay, artwork approval, production and dispatch in one place.',
    tags: ['Next.js', 'Tailwind CSS', 'Stripe', 'Vercel'],
    cover: {
      src: img('novia-digital'),
      alt: 'Novia Digital home page: "The software your print shop runs on", above screens from Acme Printing, a demo shop.',
      frame: 'browser',
      host: 'noviadigital.io',
    },
    ground: '#26262b',
    links: [
      { kind: 'website', label: 'Visit live website', href: 'https://www.noviadigital.io/' },
      { kind: 'website', label: 'Quotes by Novia Digital', href: 'https://quotes.noviadigital.io/' },
    ],
    overview: [
      'Novia Digital is the software an embroidery or print shop runs on. It covers a job from the first click to the courier: an online shop, quotes customers accept and pay, artwork they approve in writing, the jobs on the production floor and the parcels going out.',
      'Each stage hands the job to the next, so nothing is typed twice and nothing reaches the machines unpaid. Quoting is also offered on its own as Quotes by Novia Digital.',
    ],
    purpose:
      'Shops that sell printed and embroidered work need a storefront, a way to price and win custom jobs, and a clear view of production. Novia Digital puts those in one system built around how this trade actually works.',
    features: [
      'Customers design their own: they put their logo on a garment, choose where it goes and how it is made, and the artwork arrives with the order.',
      'Quotes customers can change, sign and pay a deposit on from their phone; an accepted quote becomes the order.',
      'A shop on the business’s own domain, with its catalogue, prices and colours, taking card payments.',
      'The production floor in order: what is waiting on artwork, ready to start, on the machines and out the door.',
      'Artwork proofs approved in writing, with the customer’s answer kept on the job.',
      'Pick lists by size, courier and tracking, with the customer told when an order ships.',
      'Catalogue import from a spreadsheet or an existing website, photos included.',
    ],
    implementation: [
      'Built with Next.js and Tailwind CSS and deployed on Vercel, as served by the live site.',
      'Card payments run through Stripe, with the platform’s share taken as each payment is made.',
      'The same platform serves shop storefronts on their own domains and on noviadigital.io subdomains, such as Standard Print and Stitch and Oliver Embroidery, and works with the Novia Scan app on the shop floor.',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Stripe', 'Vercel'],
    facts: [
      { label: 'Type', value: 'Multi-shop SaaS platform' },
      { label: 'For', value: 'Embroidery and print shops' },
      { label: 'Payments', value: 'Stripe' },
      { label: 'Hosting', value: 'Vercel' },
    ],
    gallery: [
      { src: img('novia-digital/features'), device: 'desktop', alt: 'Feature section showing the customer design tool and a quote on a phone.', caption: 'From the first click to the courier' },
      { src: img('novia-digital/pricing'), device: 'desktop', alt: 'Pricing plans: Quotes, Starter, Growth and Enterprise.', caption: 'Plans per shop' },
      { src: img('novia-digital/quotes'), device: 'desktop', alt: 'Quotes by Novia Digital home page: "Price the job while they are still on the phone."', caption: 'Quotes by Novia Digital', host: 'quotes.noviadigital.io' },
      { src: img('novia-digital/mobile'), device: 'phone', alt: 'Novia Digital home page on a phone.', caption: 'On a phone' },
    ],
    related: [
      { slug: 'novia-digital-scan', note: 'The Android scanner for the shop floor' },
      { slug: 'standard-print-stitch', note: 'A storefront on its own domain' },
      { slug: 'oliver-embroidery', note: 'A storefront on a Novia subdomain' },
    ],
    sources: [
      { label: 'noviadigital.io', href: 'https://www.noviadigital.io/' },
      { label: 'quotes.noviadigital.io', href: 'https://quotes.noviadigital.io/' },
    ],
  },

  {
    slug: 'dartiq',
    name: 'DartsIQ',
    kind: 'Android app',
    categories: ['mobile'],
    summary:
      'A darts scorer that keeps the score, calls each visit aloud and remembers every dart, with six games, checkout routes and detailed statistics.',
    tags: ['Android', 'Offline-first', 'Phone & tablet', 'Google Play'],
    cover: {
      src: img('dartiq'),
      alt: 'Three DartsIQ screens: the home screen, scoring a visit on the dartboard, and career statistics.',
      frame: 'plain',
    },
    ground: '#0f1613',
    links: [{ kind: 'google-play', label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=ai.macaws.dartiq' }],
    overview: [
      'DartsIQ turns any dartboard into a scored match. Players throw, say what landed, and the app keeps the score, calls it out the way a referee does and remembers every dart.',
      'It covers six games, from 501 to Killer, for up to eight players on one phone or against a computer opponent, and keeps a full record of every match.',
    ],
    purpose:
      'Scoring darts by hand means arithmetic between throws, working out checkouts and keeping a record nobody can read later. DartsIQ handles the rules, the maths and the history so players can concentrate on throwing.',
    features: [
      'Automatic scoring with busts, double-in and double-out handled.',
      'A caller that reads out every visit, checkout and game shot.',
      'Checkout routes on screen, from 170 down.',
      'Six games: X01 (301, 501, 701 or any start), Cricket, Around the Clock, Shanghai, Killer and High Score.',
      'Pass-and-play for up to eight people, a computer opponent with eight levels, and drills for doubles, checkouts and scoring.',
      'Two ways to score: type the visit total, or tap the board dart by dart with a magnifier under your finger.',
      'Statistics over time: three-dart average, checkout percentage, 180s, best finish, head-to-head records and a dart-by-dart match replay.',
      'Works offline with no account, no ads and no tracking; everything stays on the device, with backup and restore to a file.',
    ],
    implementation: [
      'Phone and tablet layouts, light and dark themes, and the screen kept awake during play, as described on the store listing.',
      'Published on Google Play by Hudutech Solutions.',
    ],
    stack: ['Android', 'On-device storage', 'Google Play'],
    facts: [
      { label: 'Platform', value: 'Android phone and tablet' },
      { label: 'Data', value: 'On-device, works offline' },
      { label: 'Publisher', value: 'Hudutech Solutions' },
    ],
    gallery: [
      { src: img('dartiq/welcome'), device: 'phone', alt: 'DartsIQ welcome screen: "Darts, scored properly."', caption: 'Welcome' },
      { src: img('dartiq/home'), device: 'phone', alt: 'DartsIQ home screen with quick-play games and personal stats.', caption: 'Home' },
      { src: img('dartiq/scoring'), device: 'phone', alt: 'Scoring a 301 leg with the keypad and a checkout route.', caption: 'Keypad scoring' },
      { src: img('dartiq/board'), device: 'phone', alt: 'Tapping darts on the board during a 301 leg.', caption: 'Board scoring' },
      { src: img('dartiq/computer'), device: 'phone', alt: 'Setting up a match against a computer opponent.', caption: 'Play the computer' },
      { src: img('dartiq/practice'), device: 'phone', alt: 'Practice drills: checkouts, doubles, scoring, around the clock and 180 practice.', caption: 'Practice drills' },
      { src: img('dartiq/stats'), device: 'phone', alt: 'Statistics screen with averages, checkout percentage and a form chart.', caption: 'Statistics' },
      { src: img('dartiq/history'), device: 'phone', alt: 'Match history grouped by day.', caption: 'Match history' },
      { src: img('dartiq/tablet-board'), device: 'tablet', alt: 'DartsIQ on a tablet in landscape, scoring on the board.', caption: 'Tablet layout' },
      { src: img('dartiq/tablet-stats'), device: 'tablet', alt: 'DartsIQ statistics on a tablet.', caption: 'Statistics on a tablet' },
    ],
    sources: [{ label: 'Google Play listing', href: 'https://play.google.com/store/apps/details?id=ai.macaws.dartiq' }],
  },

  {
    slug: 'nexus-portal',
    name: 'Nexus Portal',
    kind: 'SaaS · CRM',
    categories: ['web', 'automation'],
    summary:
      'A white-label CRM for agencies: contacts, conversations, pipeline and calendar across every client sub-account, under the agency’s own brand.',
    tags: ['Next.js', 'Tailwind CSS', 'Multi-tenant', 'Vercel'],
    cover: {
      src: img('nexus-portal'),
      alt: 'NexusPortal home page: "The CRM your agency runs on — under your brand", with a dashboard preview.',
      frame: 'browser',
      host: 'nexusportal.digital',
    },
    ground: '#dfe7fb',
    links: [{ kind: 'website', label: 'Visit live website', href: 'https://nexusportal.digital/' }],
    overview: [
      'NexusPortal gives agencies a focused CRM to put in front of their clients. Contacts, conversations, pipeline and calendar live in one workspace for every client sub-account, presented as the agency’s own product.',
      'It connects to an agency’s existing CRM sub-accounts, so clients get a clean, modern interface instead of a raw platform UI.',
    ],
    purpose:
      'Agencies managing many client accounts need something their clients will actually open each morning. NexusPortal keeps the daily work in one fast workspace and keeps the machinery underneath out of sight.',
    features: [
      'Contacts that stay tidy: search, filter, tag and enrich, with notes and activity beside each record.',
      'SMS, email, WhatsApp and internal notes in a single conversation thread.',
      'A Kanban pipeline where deal values roll up automatically.',
      'Week and month calendar views with one-click booking.',
      'A command palette on ⌘K, number-key navigation and keyboard shortcuts throughout, plus a full dark mode.',
      'White-label branding, instant switching between isolated sub-accounts, and an admin panel for workspaces, users and credentials.',
    ],
    implementation: [
      'Built with Next.js and Tailwind CSS and deployed on Vercel, as served by the live site.',
      'Multi-tenant by design: each client workspace is isolated, and switching between them takes a click.',
      'Also runs as the Nexus CRM offered by Macaws.ai at crm.macaws.ai.',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    facts: [
      { label: 'Type', value: 'White-label, multi-tenant CRM' },
      { label: 'For', value: 'Agencies and their clients' },
      { label: 'Channels', value: 'SMS, email, WhatsApp' },
      { label: 'Hosting', value: 'Vercel' },
    ],
    gallery: [
      { src: img('nexus-portal/features'), device: 'desktop', alt: 'Feature overview: contacts, channels, pipeline, calendar, speed and dark mode.', caption: 'Everything the team needs' },
      { src: img('nexus-portal/agencies'), device: 'desktop', alt: '"Your brand. Your workspace. Every client." White-label features for agencies.', caption: 'Built for agencies' },
      { src: img('nexus-portal/sign-in'), device: 'desktop', alt: 'NexusPortal sign-in page beside a workspace preview.', caption: 'Workspace sign-in' },
      { src: img('nexus-portal/mobile'), device: 'phone', alt: 'NexusPortal home page on a phone.', caption: 'On a phone' },
    ],
    related: [{ slug: 'macaws-ai', note: 'Runs as the Nexus CRM at crm.macaws.ai' }],
    sources: [
      { label: 'nexusportal.digital', href: 'https://nexusportal.digital/' },
      { label: 'crm.macaws.ai', href: 'https://crm.macaws.ai/' },
    ],
  },

  {
    slug: 'inr-notebook',
    name: 'INR Notebook',
    kind: 'Android app · Health records',
    categories: ['mobile'],
    summary:
      'A private record book for people taking warfarin: INR results, clinic dose instructions, the doses actually taken and clinic visits, together on the phone.',
    tags: ['Android', 'Encrypted backups', 'Biometric lock', 'Play Billing'],
    cover: {
      src: img('inr-notebook'),
      alt: 'Three INR Notebook store screenshots: INR results against a target range, the home screen, and the clinic’s dose instruction.',
      frame: 'plain',
    },
    ground: '#0a4b45',
    links: [{ kind: 'google-play', label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=com.inrnotebook.app' }],
    overview: [
      'INR Notebook is a private record book for people taking warfarin. It keeps INR results, the dose instructions a clinic gives, the doses actually taken and clinic visits together, and shows them clearly whenever they are needed.',
      'It is a notebook, not a clinician. The app never calculates or changes a warfarin dose and never tells anyone what to do about a result; it shows what the person and their clinic have recorded.',
    ],
    purpose:
      'People on warfarin track results, changing doses and appointments over years, often on paper cards. INR Notebook keeps that record in one private place and makes it easy to share with the clinic.',
    features: [
      'INR results with the clinic’s target range and a chart of every reading against it, plus a change history on every result.',
      'Dose instructions recorded exactly as the clinic wrote them, including alternating doses and holds, kept separate from the doses actually taken.',
      'Clinic visits, with the next appointment and next INR test on the home screen, and reminders for doses, tests and appointments.',
      'A vitamin K food guide and meal planner, and the warfarin card’s bleeding danger signs one tap from the home screen.',
      'Everything stored on the phone with no account, an optional PIN or fingerprint lock, daily encrypted backups and an optional weekly encrypted copy to Google Drive.',
      'PDF and CSV reports to share with the clinic.',
      'Free for three months, then a Google Play subscription; the safety essentials stay free for everyone.',
    ],
    implementation: [
      'Subscriptions through Google Play, encrypted backups with a 64-digit recovery code, and an optional weekly copy to a Google Drive folder the user chooses, as described on the store listing.',
      'Published on Google Play by Hudutech Solutions.',
    ],
    stack: ['Android', 'Google Play Billing', 'Google Drive backup', 'Biometric authentication'],
    facts: [
      { label: 'Platform', value: 'Android' },
      { label: 'Data', value: 'On-device, encrypted backups' },
      { label: 'Publisher', value: 'Hudutech Solutions' },
    ],
    note: 'INR Notebook is not a medical device and does not give medical advice.',
    gallery: [
      { src: img('inr-notebook/inr-chart'), device: 'panel', alt: 'Store screenshot: every INR result charted against the target range.', caption: 'INR against target range' },
      { src: img('inr-notebook/home'), device: 'panel', alt: 'Store screenshot: the latest INR and upcoming test and clinic visit.', caption: 'Home' },
      { src: img('inr-notebook/warfarin'), device: 'panel', alt: 'Store screenshot: the clinic’s current instruction and the week’s doses.', caption: 'Clinic instruction and doses' },
      { src: img('inr-notebook/clinic'), device: 'panel', alt: 'Store screenshot: clinic visits with the next appointment.', caption: 'Clinic visits' },
      { src: img('inr-notebook/vitamin-k'), device: 'panel', alt: 'Store screenshot: estimated vitamin K by day.', caption: 'Vitamin K by day' },
      { src: img('inr-notebook/diary'), device: 'panel', alt: 'Store screenshot: health diary of symptoms and events.', caption: 'Health diary' },
      { src: img('inr-notebook/safety'), device: 'panel', alt: 'Store screenshot: danger signs from the warfarin card.', caption: 'Danger signs' },
      { src: img('inr-notebook/food'), device: 'panel', alt: 'Store screenshot: a photographed meal logged with its vitamin K.', caption: 'Meal logging' },
    ],
    sources: [{ label: 'Google Play listing', href: 'https://play.google.com/store/apps/details?id=com.inrnotebook.app' }],
  },

  {
    slug: 'macaws-ai',
    name: 'Macaws AI',
    kind: 'AI products for small businesses',
    categories: ['web', 'ai', 'automation'],
    summary:
      'Three tools for small businesses, set up for them: Signal, an AI receptionist that answers and books calls; Nexus, a CRM for every conversation; and Google profile management.',
    tags: ['Voice AI', 'CRM', 'Stripe', 'Vercel'],
    cover: {
      src: img('macaws-ai'),
      alt: 'Macaws.ai home page: "Never miss a customer again."',
      frame: 'browser',
      host: 'macaws.ai',
    },
    ground: '#e5e3dc',
    links: [
      { kind: 'website', label: 'Visit live website', href: 'https://www.macaws.ai/' },
      { kind: 'website', label: 'Signal, the AI receptionist', href: 'https://signal.macaws.ai/' },
    ],
    overview: [
      'Macaws.ai sells three simple tools to small businesses and sets them up for them. Signal answers the phone, Nexus keeps every customer and follow-up in one place, and the Google service gets the business found first in local search.',
      'Each tool works on its own; together they cover the journey from someone searching for a service to the day they come back.',
    ],
    purpose:
      'Small businesses lose work to missed calls, quotes nobody chased and Google listings nobody looks after. Each Macaws.ai product addresses one of those, and the team runs the setup so owners do not have to.',
    features: [
      'Signal: an AI receptionist that picks up within three rings, day or night, knows the business’s services, prices and hours, books the job into the diary during the call and puts urgent callers straight through.',
      'Every call recorded, transcribed and written up in the owner’s inbox when the caller hangs up.',
      'Self-serve Signal setup at signal.macaws.ai: describe the business, pick a voice, and a dedicated number is provisioned.',
      'Nexus: calls, texts, emails and WhatsApp in one inbox, with quote chasing, appointment reminders and review requests sent automatically.',
      'Google: a free Google Business Profile audit at local.macaws.ai, then monthly upkeep of photos, posts, review replies, hours and services.',
      'Checkout through Stripe payment links.',
    ],
    role: [
      'I’m part of the Macaws.ai team on engineering: the integrations underneath the products, the part that makes Signal, Nexus and a business’s diary talk to each other.',
    ],
    implementation: [
      'Marketing site deployed on Vercel, with Signal, Nexus and the Google audit running on their own subdomains.',
      'Nexus is served by the Nexus Portal CRM platform.',
    ],
    stack: ['Voice AI', 'Stripe', 'Vercel'],
    facts: [
      { label: 'Products', value: 'Signal, Nexus, Google profile management' },
      { label: 'For', value: 'Small businesses in the UK' },
      { label: 'Payments', value: 'Stripe' },
      { label: 'Hosting', value: 'Vercel' },
    ],
    gallery: [
      { src: img('macaws-ai/call'), device: 'desktop', alt: 'A late-night call answered by Signal, with the job booked into the diary.', caption: 'The call you’d have missed' },
      { src: img('macaws-ai/signal'), device: 'desktop', alt: 'Signal home page: "Never miss another call", with sample calls to play.', caption: 'Signal, the AI receptionist', host: 'signal.macaws.ai' },
      { src: img('macaws-ai/local'), device: 'desktop', alt: 'The free Google Business Profile audit at local.macaws.ai.', caption: 'Google profile audit', host: 'local.macaws.ai' },
      { src: img('macaws-ai/mobile'), device: 'phone', alt: 'Macaws.ai home page on a phone.', caption: 'On a phone' },
    ],
    related: [
      { slug: 'nexus-portal', note: 'The CRM platform behind Nexus' },
      { slug: 'ai-voice-agents', note: 'More on voice agents and automation' },
    ],
    sources: [
      { label: 'macaws.ai', href: 'https://www.macaws.ai/' },
      { label: 'signal.macaws.ai', href: 'https://signal.macaws.ai/' },
      { label: 'local.macaws.ai', href: 'https://local.macaws.ai/' },
    ],
  },

  {
    slug: 'novia-digital-scan',
    name: 'Novia Scan',
    kind: 'Android app · Shop floor',
    categories: ['mobile', 'automation'],
    summary:
      'The workstation scanner for shops on Novia Digital. Scan a job sheet or item label at a machine and the order moves on to that stage, under the name of whoever scanned it.',
    tags: ['Android', 'Barcode scanning', 'Biometric sign-in', 'Novia Digital'],
    cover: {
      src: img('novia-digital-scan'),
      alt: 'Novia Scan on a tablet: an item label scanned at Embroidery 1, with the order’s progress beside it.',
      frame: 'plain',
    },
    ground: '#000d59',
    links: [{ kind: 'google-play', label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=io.noviadigital.scan' }],
    overview: [
      'Novia Scan is the shop-floor companion to Novia Digital. A phone or tablet sits at each machine; staff scan the barcode on a job sheet or an item label, and the order moves on to that machine’s stage, recorded under their name.',
      'The job sheets and item labels printed from the Novia Digital console carry the barcodes the app reads. A Novia Digital account, created by the business in its console, is needed to sign in.',
    ],
    purpose:
      'Knowing where every order is in a busy embroidery or print shop usually means walking the floor. Scanning at each workstation moves orders through production as the work happens.',
    features: [
      'Scan with the camera, a handheld scanner that types the code, a built-in scanner trigger, or by typing the code.',
      'A job sheet moves the whole order; item labels are counted one by one, and the order moves on when all of its items are in.',
      'Each result shown large and in colour with a beep and a buzz, readable from the bench; a label left under the camera counts once.',
      'History of every scan that moved something, at this machine, by you or by everyone, with the order behind each scan.',
      'One device, any machine: switch stations in one tap, and managers can add machines from the app.',
      'Sign in once with console credentials, then with a fingerprint or face; the sign-in is kept encrypted on the device.',
      'Side-by-side layouts on tablets, with the camera and the answer next to each other.',
    ],
    implementation: [
      'Works against the Novia Digital platform: scans update the order’s production stage, and the console shows which device and person each scan came from.',
      'Published on Google Play by Hudutech Solutions.',
    ],
    stack: ['Android', 'Camera barcode scanning', 'Biometric authentication', 'Novia Digital platform'],
    facts: [
      { label: 'Platform', value: 'Android phones, tablets and scanner devices' },
      { label: 'Requires', value: 'A Novia Digital account' },
      { label: 'Publisher', value: 'Hudutech Solutions' },
    ],
    gallery: [
      { src: img('novia-digital-scan/job-sheet'), device: 'panel', alt: 'Store screenshot: scanning a job sheet moves the order on.', caption: 'Scan the job sheet' },
      { src: img('novia-digital-scan/item-counted'), device: 'panel', alt: 'Store screenshot: an item label counted towards its order.', caption: 'Every item counted' },
      { src: img('novia-digital-scan/order'), device: 'panel', alt: 'Store screenshot: the order behind a scan, with items and stages.', caption: 'The order behind a scan' },
      { src: img('novia-digital-scan/history'), device: 'panel', alt: 'Store screenshot: history of who scanned what, where and when.', caption: 'Scan history' },
      { src: img('novia-digital-scan/machines'), device: 'panel', alt: 'Store screenshot: the list of work stations.', caption: 'Machines' },
      { src: img('novia-digital-scan/sign-in'), device: 'panel', alt: 'Store screenshot: signing in with a fingerprint or face.', caption: 'Biometric sign-in' },
      { src: img('novia-digital-scan/settings'), device: 'panel', alt: 'Store screenshot: settings for camera, scanner and sounds.', caption: 'Made for the shop floor' },
      { src: img('novia-digital-scan/tablet-history'), device: 'tablet', alt: 'Store screenshot: history and the selected order side by side on a tablet.', caption: 'Tablet: scan and order side by side' },
      { src: img('novia-digital-scan/tablet-machines'), device: 'tablet', alt: 'Store screenshot: work stations on a tablet.', caption: 'Tablet: every work station' },
    ],
    related: [{ slug: 'novia-digital', note: 'The platform it scans into' }],
    sources: [{ label: 'Google Play listing', href: 'https://play.google.com/store/apps/details?id=io.noviadigital.scan' }],
  },

  {
    slug: 'viyu-hub',
    name: 'ViYu Hub',
    kind: 'SaaS platform',
    categories: ['web', 'ai', 'automation'],
    summary:
      'An operating system for serviced accommodation: bookings, guest messaging, payments and operations in one platform, with voice AI answering calls and enquiries.',
    tags: ['Next.js', 'Tailwind CSS', 'Voice AI', 'Vercel'],
    cover: {
      src: img('viyu-hub'),
      alt: 'ViYu Hub home page: "The operating system for serviced accommodation", with a live pricing calculator.',
      frame: 'browser',
      host: 'viyu-hub-mu.vercel.app',
    },
    ground: '#f7dde5',
    links: [{ kind: 'website', label: 'Visit live website', href: 'https://viyu-hub-mu.vercel.app/' }],
    overview: [
      'ViYu Hub brings the work of running serviced accommodation into one system: bookings, guest communication, payments and day-to-day operations, automated from booking to departure.',
      'It is aimed at operators who currently join several separate tools together, often with a virtual assistant filling the gaps between them.',
    ],
    purpose:
      'As a portfolio grows, every new unit adds more tools, messages and payments to keep track of. ViYu puts them on one login and one system of record.',
    features: [
      'Booking control: every reservation, calendar and channel in one place, synced both ways to avoid double bookings.',
      'Guest automation: ID checks, agreements, messaging and check-in from booking to departure.',
      'Payments and revenue: deposits, balances and extras collected on schedule against the booking that owes them.',
      'Voice AI operations: calls and enquiries answered by AI, escalating to the operator only when it should.',
      'A live per-unit pricing calculator on the home page.',
      'An operator dashboard behind sign-in (not shown here).',
    ],
    implementation: ['Built with Next.js and Tailwind CSS and deployed on Vercel, as served by the live site.'],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    facts: [
      { label: 'Type', value: 'Operations platform' },
      { label: 'For', value: 'Serviced accommodation operators' },
      { label: 'Hosting', value: 'Vercel' },
    ],
    gallery: [
      { src: img('viyu-hub/platform'), device: 'desktop', alt: 'The four platform areas: booking control, guest automation, payments and voice AI operations.', caption: 'Four jobs in one place' },
      { src: img('viyu-hub/pricing'), device: 'desktop', alt: 'Per-unit pricing bands and who the platform is built for.', caption: 'Per-unit pricing' },
      { src: img('viyu-hub/mobile'), device: 'phone', alt: 'ViYu Hub home page on a phone.', caption: 'On a phone' },
    ],
    sources: [{ label: 'viyu-hub-mu.vercel.app', href: 'https://viyu-hub-mu.vercel.app/' }],
  },

  {
    slug: 'standard-print-stitch',
    name: 'Standard Print and Stitch',
    kind: 'E-commerce storefront',
    categories: ['web'],
    summary:
      'An online shop for embroidered and printed workwear from Cambridge. Customers upload a logo or design it in the browser, approve the proof and order.',
    tags: ['Next.js', 'Tailwind CSS', 'Novia Digital', 'Vercel'],
    cover: {
      src: img('standard-print-stitch'),
      alt: 'Standard Print and Stitch home page: "Your logo on everything."',
      frame: 'browser',
      host: 'standardprintstitch.co.uk',
    },
    ground: '#e4e4e1',
    links: [{ kind: 'website', label: 'Visit live website', href: 'https://standardprintstitch.co.uk/' }],
    overview: [
      'Standard Print and Stitch sells workwear, uniforms and teamwear, embroidered or printed, from Cambridge. Customers browse the range, put their logo on a garment in the design studio, approve the proof and order, or ask for a quick quote.',
      'Price breaks start from 10 units, there is no minimum order, and delivery is free over £250.',
    ],
    features: [
      'Catalogue by category, brand and popularity, with filters, sorting and ex-VAT prices with quantity breaks.',
      'Product pages with colour swatches, mixed sizes and quantities on one line, and an optional logo.',
      'A design studio in the browser: pick a garment, add a logo and see it before ordering.',
      'Quick quote requests for embroidery or print.',
      'Customer accounts, saved products and a basket.',
    ],
    implementation: [
      'Runs on the Novia Digital platform on the business’s own domain.',
      'Next.js and Tailwind CSS, deployed on Vercel, as served by the live site.',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Novia Digital platform', 'Vercel'],
    facts: [
      { label: 'Type', value: 'Custom workwear shop' },
      { label: 'Location', value: 'Cambridge, UK' },
      { label: 'Platform', value: 'Novia Digital' },
    ],
    gallery: [
      { src: img('standard-print-stitch/designer'), device: 'desktop', alt: 'Design studio: pick a garment to start with.', caption: 'Design your own' },
      { src: img('standard-print-stitch/product'), device: 'desktop', alt: 'Product page for a cuffed beanie with colours and quantities.', caption: 'Product page' },
      { src: img('standard-print-stitch/category'), device: 'desktop', alt: 'Hoodies category with sub-categories, brand filters and products.', caption: 'Category with filters' },
      { src: img('standard-print-stitch/mobile'), device: 'phone', alt: 'Standard Print and Stitch home page on a phone.', caption: 'On a phone' },
    ],
    related: [
      { slug: 'novia-digital', note: 'The platform the shop runs on' },
      { slug: 'oliver-embroidery', note: 'Another storefront on the same platform' },
    ],
    sources: [{ label: 'standardprintstitch.co.uk', href: 'https://standardprintstitch.co.uk/' }],
  },

  {
    slug: 'oliver-embroidery',
    name: 'Oliver Embroidery',
    kind: 'E-commerce storefront',
    categories: ['web'],
    summary:
      'The online shop for Oliver Embroidery in Reading, Berkshire: personalised workwear with a design studio, quick quotes and school, club and company uniform shops.',
    tags: ['Next.js', 'Tailwind CSS', 'Novia Digital', 'Vercel'],
    cover: {
      src: img('oliver-embroidery'),
      alt: 'Oliver Embroidery product page for a waterproof bomber jacket, with colours and sizes.',
      frame: 'browser',
      host: 'oliver-embroidery.noviadigital.io',
    },
    ground: '#f5dcda',
    links: [{ kind: 'website', label: 'Visit live website', href: 'https://oliver-embroidery.noviadigital.io/' }],
    overview: [
      'Oliver Embroidery supplies embroidered and printed workwear from Reading, Berkshire. Its storefront carries a catalogue of 89 brands the business decorates, alongside dedicated school uniform, club uniform and company uniform shops.',
      'The shop is hosted on the Novia Digital platform, on a noviadigital.io subdomain.',
    ],
    features: [
      'Catalogue by category and by brand, with ex-VAT prices and quantity price breaks.',
      'A design studio: upload a logo, place it on the garment and see it before ordering.',
      'Product pages with colours, mixed sizes and quantities on one line.',
      'School uniform, club uniform and company uniform sections.',
      'Quick quote requests and customer accounts.',
    ],
    implementation: ['Next.js and Tailwind CSS on Vercel, as served by the live site, running on the Novia Digital platform.'],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Novia Digital platform', 'Vercel'],
    facts: [
      { label: 'Type', value: 'Custom workwear shop' },
      { label: 'Location', value: 'Reading, Berkshire, UK' },
      { label: 'Platform', value: 'Novia Digital' },
    ],
    gallery: [
      { src: img('oliver-embroidery/designer'), device: 'desktop', alt: 'Design studio: put your logo on a cuffed beanie.', caption: 'Design studio' },
      { src: img('oliver-embroidery/category'), device: 'desktop', alt: 'Polo shirts category with filters.', caption: 'Category with filters' },
      { src: img('oliver-embroidery/mobile'), device: 'phone', alt: 'Oliver Embroidery product page on a phone.', caption: 'On a phone' },
    ],
    related: [
      { slug: 'novia-digital', note: 'The platform the shop runs on' },
      { slug: 'standard-print-stitch', note: 'Another storefront on the same platform' },
    ],
    sources: [{ label: 'oliver-embroidery.noviadigital.io', href: 'https://oliver-embroidery.noviadigital.io/' }],
  },

  {
    slug: 'ai-voice-agents',
    name: 'AI Voice Agents & Conversational Automation',
    kind: 'Capability',
    categories: ['ai', 'automation'],
    summary:
      'Conversational voice agents built with Retell AI, added to websites and connected to business systems through APIs, webhooks and workflow automation.',
    tags: ['Retell AI', 'REST APIs', 'Webhooks', 'n8n'],
    cover: null,
    ground: '#101828',
    links: [{ kind: 'contact', label: 'Discuss an AI project', href: '#contact' }],
    overview: [
      'I build AI agents and voice agents with Retell AI and integrate them into websites and business systems. A voice agent can answer a phone call or a website visitor, hold a natural conversation, and act on what it hears: look something up, book an appointment or pass the details on.',
      'The work that makes an agent useful is usually the integration: giving it the right information during the call and making sure what it learns ends up in the systems the business already uses.',
    ],
    features: [
      'Voice agents built with Retell AI: prompts, conversation design, voice choice and call handling.',
      'Agents added to existing websites so visitors can talk to them directly.',
      'Actions during a conversation through REST APIs and webhooks: lookups, bookings and hand-offs to other systems.',
      'Workflow automation, for example with n8n, for what happens after a call: notifications, records updated and follow-ups sent.',
    ],
    stack: ['Retell AI', 'REST APIs', 'Webhooks', 'n8n'],
    facts: [
      { label: 'Type', value: 'Capability and services' },
      { label: 'Status', value: 'Case studies to follow' },
    ],
    note: 'This entry describes a capability rather than one named project. Screenshots, a demo, audio samples or an anonymised case study will be added here as they become available to share.',
    gallery: [],
    related: [{ slug: 'macaws-ai', note: 'Signal, the AI receptionist I work on integrations for' }],
    sources: [],
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<string, Project>;
