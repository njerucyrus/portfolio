import fs from 'node:fs';
import path from 'node:path';
import manifest from '../data/image-manifest.json';
import { url } from './url';

interface Entry {
  width: number;
  height: number;
  variants: { width: number; src: string }[];
}

const entries = manifest as Record<string, Entry>;

export interface ResolvedImage {
  src: string;
  srcset?: string;
  width?: number;
  height?: number;
}

/**
 * Resolves an image path (relative to /public) to what an <img> needs.
 * Returns null when the file does not exist, so callers can show a placeholder.
 */
export function resolveImage(src: string | null | undefined): ResolvedImage | null {
  if (!src) return null;
  const entry = entries[src];
  if (entry) {
    return {
      src: url(src),
      srcset: entry.variants.map((v) => `${url(v.src)} ${v.width}w`).join(', '),
      width: entry.width,
      height: entry.height,
    };
  }
  // Not built by the image pipeline: use the file as-is if it is present.
  if (fs.existsSync(path.join(process.cwd(), 'public', src))) return { src: url(src) };
  return null;
}
