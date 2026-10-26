// Category filters for the project gallery. The chosen category is kept in the
// URL (?category=mobile) so a filtered view can be linked to.

export function initGalleries() {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach(setup);
}

function setup(root: HTMLElement) {
  const bar = root.querySelector<HTMLElement>('[data-filters]');
  const status = root.querySelector<HTMLElement>('[data-filter-status]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const indicator = root.querySelector<HTMLElement>('.filter-indicator');
  if (!bar || !status || !empty || !indicator) return;

  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('button[data-filter]')];
  const items = [...root.querySelectorAll<HTMLElement>('[data-categories]')];
  const ids = buttons.map((b) => b.dataset.filter!);
  const labelOf = (id: string) => buttons.find((b) => b.dataset.filter === id)?.firstChild?.textContent?.trim() ?? id;
  let current = 'all';

  bar.hidden = false;

  const place = (button: HTMLElement) => {
    indicator.style.width = `${button.offsetWidth}px`;
    indicator.style.transform = `translateX(${button.offsetLeft}px)`;
  };

  function apply(filter: string, { animate = true, updateUrl = true } = {}) {
    current = filter;
    let shown = 0;
    for (const item of items) {
      const match = filter === 'all' || item.dataset.categories!.split(' ').includes(filter);
      const wasHidden = item.hidden;
      item.hidden = !match;
      if (!match) continue;
      shown++;
      item.classList.add('is-visible');
      if (wasHidden && animate) {
        item.classList.remove('is-entering');
        void item.offsetWidth;
        item.classList.add('is-entering');
      }
    }

    const active = buttons.find((b) => b.dataset.filter === filter)!;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === active)));
    place(active);
    bar!.scrollTo({ left: Math.max(0, active.offsetLeft - 24), behavior: animate ? 'smooth' : 'auto' });

    status!.textContent =
      filter === 'all'
        ? `Showing all ${shown} projects`
        : `Showing ${shown} ${shown === 1 ? 'project' : 'projects'} in ${labelOf(filter)}`;
    empty!.hidden = shown > 0;

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (filter === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', filter);
      history.replaceState(history.state, '', url);
    }
  }

  buttons.forEach((button) => button.addEventListener('click', () => apply(button.dataset.filter!)));
  root.querySelector('[data-filter-reset]')?.addEventListener('click', () => {
    apply('all');
    buttons[0].focus();
  });

  const requested = new URL(window.location.href).searchParams.get('category');
  apply(requested && ids.includes(requested) ? requested : 'all', { animate: false, updateUrl: false });

  const replace = () => place(buttons.find((b) => b.dataset.filter === current)!);
  window.addEventListener('resize', replace, { passive: true });
  document.fonts?.ready.then(replace);
}
