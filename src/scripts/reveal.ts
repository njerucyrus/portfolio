// Entrance animations for [data-reveal] elements, run once as they scroll into
// view. global.css only hides them when the html element has the `js` class and
// the visitor has not asked for reduced motion.

const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  targets.forEach((el) => observer.observe(el));
}
