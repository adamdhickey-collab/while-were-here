#!/usr/bin/env node
/* Build a review proof: the same book with images downsampled to screen
 * resolution. The press file embeds every image at full size and lands around
 * 200 MB, which is right for a printer and useless for looking at on a laptop.
 *
 *   npm run pdf:proof
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { MAX, images, resize, longEdge } from './lib/images.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'build', 'images');

if (!fs.existsSync(dir)) {
  console.error('✗ build/images does not exist — run `npm run build` first.');
  process.exit(1);
}

/* Walk the whole tree rather than naming the kinds. A folder that nobody
   remembered to add to a list — `plates`, say — would otherwise stay at press
   resolution and quietly make the proof several times the size it promises. */
const found = images(dir);
let touched = 0;
let already = 0;
const failed = [];
for (const rel of found) {
  const file = path.join(dir, rel);
  /* `sips -Z` resamples in BOTH directions, so a picture already under the cap
     would be blown up to it — more bytes, no more detail. The same guard
     `npm run derive` keeps, for the same reason. */
  if (longEdge(file) <= MAX) { already += 1; continue; }
  if (resize(file)) touched += 1;
  else failed.push(rel);
}

const bytes = found.reduce((n, f) => n + fs.statSync(path.join(dir, f)).size, 0);

if (failed.length) {
  console.error(`✗ sips could not read ${failed.length} file${failed.length === 1 ? '' : 's'} — left at full size:`);
  for (const f of failed.slice(0, 5)) console.error(`    ${f}`);
  if (failed.length > 5) console.error(`    …and ${failed.length - 5} more`);
}

console.log(`✓ downsampled ${touched} image${touched === 1 ? '' : 's'} to ${MAX}px for the proof` +
  `${already ? `, ${already} already at or under it` : ''}`);
console.log(`  build/images is now ${(bytes / 1e6).toFixed(1)} MB across ${found.length} files`);
console.log('  build/ is now proof-resolution — run `npm run build` before any press export.');
