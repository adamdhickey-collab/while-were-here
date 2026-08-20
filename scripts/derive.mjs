#!/usr/bin/env node
/* Make the screen-resolution derivatives the hosted preview is built from.
 *
 *   npm run derive          refresh anything stale
 *   npm run derive -- --all rebuild every derivative from scratch
 *
 * `public/images` holds press masters. They are Git LFS objects and they run to
 * hundreds of megabytes, which the hosted preview cannot use: a Pages site is
 * capped at 1 GB, and every CI checkout that fetches LFS spends the account's
 * monthly LFS bandwidth. So the web build reads `public/images-web` instead —
 * the same pictures at 1400 px, small enough to be ordinary git objects.
 *
 * That means CI never fetches LFS, and the deploy costs nothing but the
 * derivatives themselves. The price is that these files are generated and
 * committed, so they have to be refreshed when a master changes. This script is
 * the refresh, and it only touches what is actually out of date.
 *
 * Resizing runs through `sips`, which ships with macOS. That is deliberate:
 * derivatives are generated here and committed, never generated in CI, so this
 * script never has to run on a Linux runner and the repo needs no image
 * dependency to build.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'public/images');
const out = path.join(root, 'public/images-web');

/* The long edge, in px. Matches scripts/proof.mjs so the hosted preview and the
   proof PDF are looking at exactly the same pictures. */
const MAX = 1400;

const all = process.argv.includes('--all');

/** Every file under a directory, as paths relative to it. */
function walk(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p, base) : [path.relative(base, p)];
  });
}

/* An LFS pointer is a small text file that begins with the spec URL. Resizing
   one produces nothing useful and the failure is silent later, so catch it here
   where the message can say what to actually do about it. */
function isPointer(file) {
  if (fs.statSync(file).size > 1024) return false;
  return fs.readFileSync(file, 'utf8').startsWith('version https://git-lfs');
}

const images = walk(src).filter((f) => /\.(png|jpe?g|tiff?)$/i.test(f));
if (!images.length) {
  console.error(`✗ No images under ${path.relative(root, src)}.`);
  process.exit(1);
}

const pointers = [];
let made = 0;
let skipped = 0;

for (const rel of images) {
  const from = path.join(src, rel);
  const to = path.join(out, rel);

  if (isPointer(from)) { pointers.push(rel); continue; }

  /* Up to date if the derivative exists and is no older than its master. */
  if (!all && fs.existsSync(to) && fs.statSync(to).mtimeMs >= fs.statSync(from).mtimeMs) {
    skipped += 1;
    continue;
  }

  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  try {
    execFileSync('sips', ['-Z', String(MAX), to], { stdio: 'ignore' });
  } catch {
    fs.rmSync(to, { force: true });
    console.error(`✗ sips could not read ${rel} — left out of the web build.`);
    continue;
  }
  made += 1;
}

/* A derivative whose master is gone is worse than a missing one: the web build
   would keep serving a picture the book no longer contains. */
const live = new Set(images);
let removed = 0;
for (const rel of walk(out)) {
  if (live.has(rel)) continue;
  fs.rmSync(path.join(out, rel), { force: true });
  removed += 1;
}

const bytes = walk(out).reduce((n, f) => n + fs.statSync(path.join(out, f)).size, 0);

if (pointers.length) {
  console.error(`\n✗ ${pointers.length} master${pointers.length > 1 ? 's are' : ' is'} an unfetched LFS pointer:`);
  for (const p of pointers.slice(0, 5)) console.error(`    ${p}`);
  if (pointers.length > 5) console.error(`    …and ${pointers.length - 5} more`);
  console.error(`  Run \`git lfs pull\` first — otherwise these drop out of the web build.\n`);
}

console.log(`✓ ${made} derivative${made === 1 ? '' : 's'} written at ${MAX}px` +
  `${skipped ? `, ${skipped} already current` : ''}` +
  `${removed ? `, ${removed} orphaned removed` : ''}`);
console.log(`  public/images-web is ${(bytes / 1e6).toFixed(1)} MB across ${walk(out).length} files`);
console.log(`  commit it — the hosted preview builds from these, not from LFS.`);

if (pointers.length) process.exit(1);
