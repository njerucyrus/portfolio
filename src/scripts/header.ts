// Site header: switches between dark and light while it sits over a dark hero,
// highlights the section in view, and runs the mobile menu.

const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('mobile-menu');

if (header) {
  // Theme: dark while a [data-hero-dark] section is under the header.
  const hero = document.querySelector<HTMLElement>('[data-hero-dark]');
  const setScrolled = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  if (hero) {
    const update = () => {
      header.dataset.theme = hero.getBoundingClientRect().bottom > header.offsetHeight / 2 ? 'dark' : 'light';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }

  // Section highlighting on the home page.
  const links = [...header.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const sections = links
    .map((link) => document.getElementById(link.dataset.navLink!))
    .filter((el): el is HTMLElement => Boolean(el));
  if (sections.length && 'IntersectionObserver' in window) {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        links.forEach((link) => {
          const on = Boolean(best && best[1] > 0 && link.dataset.navLink === best[0]);
          if (on) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
  }
}

// Mobile menu. While it is open, the rest of the page is inert, so focus and
// screen readers stay inside the header.
if (header && toggle && menu) {
  const outside = () => [...document.body.children].filter((el) => el !== header && el.tagName !== 'SCRIPT') as HTMLElement[];

  const setOpen = (open: boolean, { returnFocus = true } = {}) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    header.classList.toggle('menu-is-open', open);
    document.body.classList.toggle('menu-open', open);
    outside().forEach((el) => (el.inert = open));
    if (open) menu.querySelector<HTMLElement>('a, button')?.focus();
    else if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false, { returnFocus: false });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false, { returnFocus: false });
  });
}
