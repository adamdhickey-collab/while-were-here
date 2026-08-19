#!/usr/bin/env node
/* Build a review proof: the same book with images downsampled to screen
 * resolution. The press file embeds every image at full size and lands around
 * 200 MB, which is right for a printer and useless for looking at on a laptop.
 *
 *   npm run pdf:proof
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'build');
const MAX = 1400;                       // px on the long edge — plenty on screen

let touched = 0;
for (const dir of ['photography', 'illustration', 'personal']) {
  const d = path.join(out, 'images', dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    const file = path.join(d, f);
    try {
      execFileSync('sips', ['-Z', String(MAX), file], { stdio: 'ignore' });
      touched += 1;
    } catch { /* leave anything sips cannot read */ }
  }
}
console.log(`✓ downsampled ${touched} images to ${MAX}px for the proof`);
console.log('  build/ is now proof-resolution — run `npm run build` before any press export.');
