// Full-size screenshot viewer for project pages. Each thumbnail is a plain link
// to the full image, so it still works without JavaScript.

export function initLightbox() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox][href]')];
  if (!dialog || !links.length || typeof dialog.showModal !== 'function') return;

  const img = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]')!;
  const prev = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]')!;
  const next = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]')!;
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number) => {
    index = (i + links.length) % links.length;
    const link = links[index];
    img.src = link.href;
    img.alt = link.querySelector('img')?.alt ?? '';
    caption.textContent = `${link.dataset.caption ?? ''} · ${index + 1} of ${links.length}`;
  };

  prev.hidden = next.hidden = links.length < 2;

  links.forEach((link, i) =>
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      opener = link;
      show(i);
      dialog.showModal();
      document.body.classList.add('menu-open');
    }),
  );

  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-lightbox-close]')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || (event.target as HTMLElement).classList.contains('lightbox-frame')) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('menu-open');
    img.removeAttribute('src');
    opener?.focus();
  });
}
