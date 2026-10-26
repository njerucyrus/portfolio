// Builds links that respect the deploy base path (e.g. /portfolio on GitHub Pages).

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Internal page or file path, e.g. url('projects/dartiq/') → /portfolio/projects/dartiq/ */
export function url(path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return `${BASE}/${clean}`;
}

/** A section on the home page, e.g. section('contact') → /portfolio/#contact */
export function section(hash: string): string {
  return `${url()}#${hash}`;
}

/** Absolute URL for metadata (canonical, Open Graph). */
export function absolute(path: string, site: URL | undefined): string {
  return new URL(url(path), site ?? 'http://localhost').href;
}
