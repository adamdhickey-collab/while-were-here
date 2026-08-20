/* What the build scripts agree on about pictures.
 *
 * Two of them make screen-resolution copies: `npm run derive` writes the
 * derivatives the hosted preview is built from, and `npm run pdf:proof` shrinks
 * build/ in place for the review PDF. They are looking at the same pictures and
 * should reach the same answer about what counts as an image, how big "screen
 * resolution" is, and how the resize happens — so both read it from here rather
 * than each keeping its own copy.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

/* The long edge, in px, of every screen-resolution picture in the project. */
export const MAX = 1400;

/** Every file under a directory, as paths relative to it. */
export function walk(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p, base) : [path.relative(base, p)];
  });
}

/* The formats the book's pictures actually arrive in. */
const IMAGE = /\.(png|jpe?g|tiff?)$/i;

/** Every image under a directory, at any depth, as paths relative to it. */
export function images(dir) {
  return walk(dir).filter((f) => IMAGE.test(f));
}

/** Longest edge in px, or Infinity if sips cannot read it — so an unreadable
    file falls through to the resize path and reports its failure there. */
export function longEdge(file) {
  try {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], { encoding: 'utf8' });
    const w = /pixelWidth:\s*(\d+)/.exec(out);
    const h = /pixelHeight:\s*(\d+)/.exec(out);
    return w && h ? Math.max(+w[1], +h[1]) : Infinity;
  } catch { return Infinity; }
}

/* Resizing runs through `sips`, which ships with macOS. That is deliberate:
   screen copies are made here and committed, never made in CI, so this never
   has to run on a Linux runner and the repo needs no image dependency to build.

   Returns false rather than throwing — a picture sips cannot read is a line of
   output, not a reason to abandon the other two hundred. */
export function resize(file, max = MAX) {
  try {
    execFileSync('sips', ['-Z', String(max), file], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}
