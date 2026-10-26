export const categories = [
  { id: 'web', label: 'Web Applications', badge: 'Web Application' },
  { id: 'mobile', label: 'Mobile Applications', badge: 'Mobile Application' },
  { id: 'ai', label: 'AI & Voice Agents', badge: 'AI & Voice' },
  { id: 'automation', label: 'Automation & Integrations', badge: 'Automation' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  CategoryId,
  (typeof categories)[number]
>;
