/* The characters the Latin faces cannot set, and the files that can.
 *
 * The book prints a verbatim data export and a few of its entries are Korean,
 * Japanese and Chinese. Nothing in the book's own type covers them, and left to
 * the machine's fonts the print path writes them as Type 3 glyph procedures —
 * which prepress cannot subset — or drops them on the floor.
 *
 * Noto answers for them, but it ships ~124 unicode-range subsets per weight and
 * 130 MB across the two families, for the couple of dozen characters this book
 * actually prints. So the subsets that carry them are committed to `fonts-cjk/`
 * and the packages are not a dependency: `npm ci` on the Pages runner should
 * not download 130 MB of font to use 131 KB of it. Same bargain as
 * `public/images-web` — generated here, committed, never rebuilt in CI.
 *
 * `npm run fonts:cjk` regenerates the directory. This module is what the
 * regeneration and the build agree on.
 */

import fs from 'node:fs';
import path from 'node:path';

/** Where the committed subsets and their manifest live. */
export const DIR = 'fonts-cjk';
export const MANIFEST = 'subsets.json';

/* Everything from the CJK radicals up. Below this line the Latin faces cover
   what the book uses, punctuation and dashes included. */
export const FLOOR = 0x2E80;

/* Asked in this order. JP carries the kana and the ideographs; KR is only ever
   reached for Hangul. */
export const FAMILIES = [
  { spec: '@fontsource/noto-sans-jp/400.css', family: 'Noto Sans JP' },
  { spec: '@fontsource/noto-sans-kr/400.css', family: 'Noto Sans KR' },
];

/** The codepoints in a composed document that no Latin face covers. */
export function unlatinChars(html) {
  const need = new Set();
  for (const ch of html) {
    const c = ch.codePointAt(0);
    if (c >= FLOOR) need.add(c);
  }
  return need;
}

/** `U+30a2,U+4e00-9fff` → [[0x30a2,0x30a2],[0x4e00,0x9fff]] */
export function parseRanges(text) {
  return text.split(',').map((r) => {
    const [lo, hi] = r.trim().replace(/^U\+/i, '').split('-');
    return [parseInt(lo, 16), parseInt(hi ?? lo, 16)];
  });
}

/** Does a parsed range list contain this codepoint? */
export const carries = (ranges, c) => ranges.some(([a, b]) => c >= a && c <= b);

/** Every subset a fontsource stylesheet declares. */
export function subsetsOf(cssFile) {
  const css = fs.readFileSync(cssFile, 'utf8');
  const out = [];
  for (const m of css.matchAll(/src:\s*url\(\.\/files\/([^)]+\.woff2)\)[\s\S]*?unicode-range:\s*([^;]+);/g)) {
    out.push({ file: m[1], ranges: parseRanges(m[2]), range: m[2].trim() });
  }
  return out;
}

/** The committed manifest, or null when the directory has not been made yet. */
export function manifest(root) {
  const file = path.join(root, DIR, MANIFEST);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
