#!/usr/bin/env node
/* Put a generated image into the book.
 *
 *   npm run place -- <file> <manifest-id>
 *   npm run place -- ~/Desktop/whatever.png ordinary-days-01a-dog-afternoon-light
 *
 * Copies the file to the filename the manifest expects, checks it against the
 * declared aspect and target resolution, and marks it generated. The next build
 * swaps the placeholder plate for the real image. Run with no arguments to see
 * what the book is still waiting for.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'content/images.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const KIND_DIR = { photography: 'photography', illustration: 'illustration', personal: 'personal' };

/* The asset roles, and what each one requires. See content/plan/asset-system.md.
   These checks are cheap and they catch the two mistakes that turn a field
   guide into a scrapbook: a specimen with no label, and a micrograph spent
   before the book has earned it. */
const ROLES = {
  plate:      { stages: [2, 3, 4],    note: 'used whole, never cut out or taped; one per spread' },
  specimen:   { stages: [1, 2, 3, 4, 5], note: 'cut out, no drop shadow, must carry a label' },
  figure:     { stages: [2, 3, 4],    note: 'recoloured to the stage; must argue something the prose does not' },
  map:        { stages: [2, 3],       note: 'full bleed or 12–18% ground, nothing between; never beside a plate' },
  micrograph: { stages: [3, 4],       note: 'dark ground, type reversed out, always a scale bar' },
  ephemera:   { stages: [1, 2, 3, 4, 5], note: 'applied to specimen or personal only, never to a plate' },
  texture:    { stages: [1, 2, 3, 4, 5], note: 'set per stage, not per asset; multiply blend' },
  handwriting:{ stages: [1, 2, 3, 4, 5], note: 'placed by the layout, never baked in; multiply blend; must not be legible as sentences' },
  material:   { stages: [2, 3, 4, 5],  note: 'full-bleed crossover on a stage turn; two or three in the whole book' },
  ground:     { stages: [1, 2, 3, 4, 5], note: '8% on cream, 14% on dark; only under pages that are mostly type' },
  personal:   { stages: [1, 5],       note: 'do not retouch; use sparingly so it carries weight' },
};
const dest = (img) => path.join(root, 'public/images', KIND_DIR[img.kind] || 'photography', img.filename);
/* Screen prints resolve by slug to a stack of plates and carry "—" as their
   filename, so the filename alone would report a finished print as waiting. */
const exists = (img) =>
  fs.existsSync(path.join(root, 'public/images/plates', `${img.slug || img.id}-plate-1.png`)) ||
  fs.existsSync(dest(img));

/** macOS ships sips; if it is missing we simply skip the dimension check. */
function dimensions(file) {
  try {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], { encoding: 'utf8' });
    const w = /pixelWidth:\s*(\d+)/.exec(out);
    const h = /pixelHeight:\s*(\d+)/.exec(out);
    return w && h ? { w: +w[1], h: +h[1] } : null;
  } catch { return null; }
}

const ratio = (a) => {
  const [x, y] = a.split(':').map(Number);
  return x && y ? x / y : null;
};

function report() {
  const placed = manifest.images.filter(exists);
  const waiting = manifest.images.filter((i) => !exists(i));
  console.log(`\n${placed.length} of ${manifest.images.length} images placed.\n`);
  if (placed.length) {
    console.log('Placed:');
    for (const i of placed) console.log(`  ✓ ${i.id}`);
    console.log('');
  }
  console.log('Still waiting:');
  const byEssay = new Map();
  for (const i of waiting) {
    if (!byEssay.has(i.essay)) byEssay.set(i.essay, []);
    byEssay.get(i.essay).push(i);
  }
  for (const [essay, list] of byEssay) {
    console.log(`\n  ${essay}`);
    for (const i of list) console.log(`    ${i.id.padEnd(38)} ${i.aspect.padStart(4)}  ${i.spread}`);
  }
  console.log('\nPlace one with:  npm run place -- <file> <id>\n');
}

const [file, id] = process.argv.slice(2);
if (!file || !id) { report(); process.exit(0); }

const img = manifest.images.find((i) => i.id === id);
if (!img) {
  console.error(`✗ No manifest entry "${id}".`);
  const near = manifest.images.filter((i) => i.id.includes(id.split('-')[0])).map((i) => i.id);
  if (near.length) console.error(`  Did you mean:\n    ${near.join('\n    ')}`);
  process.exit(1);
}

const src = path.resolve(file.replace(/^~/, process.env.HOME));
if (!fs.existsSync(src)) { console.error(`✗ No such file: ${src}`); process.exit(1); }

const srcExt = path.extname(src).toLowerCase();
const wantExt = path.extname(img.filename).toLowerCase();
if (srcExt !== wantExt) {
  console.warn(`  ! manifest expects ${wantExt}, file is ${srcExt} — copying as ${wantExt} anyway.`);
  console.warn(`    If the format genuinely differs, change "filename" in content/images.json.`);
}

const target = dest(img);
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.copyFileSync(src, target);

const dim = dimensions(target);
const warn = [];
if (dim) {
  const want = ratio(img.aspect);
  const got = dim.w / dim.h;
  if (want && Math.abs(want - got) / want > 0.04) {
    warn.push(`aspect is ${(got).toFixed(2)}:1, manifest wants ${img.aspect} (${want.toFixed(2)}:1) — it will be cropped`);
  }
  const [tw, th] = (img.target.match(/\d+/g) || []).map(Number);
  if (tw && dim.w < tw * 0.9) warn.push(`${dim.w}×${dim.h} px is under the ${img.target} target`);
}

if (img.role && ROLES[img.role]) {
  console.log(`  role: ${img.role} — ${ROLES[img.role].note}`);
} else if (img.role) {
  warn.push(`unknown role "${img.role}" — see content/plan/asset-system.md`);
} else {
  warn.push('no role set; add one to content/images.json so the asset rules apply');
}
if (img.origin === 'archive' && (!img.source || !img.license)) {
  warn.push('archival asset with no source or licence — record it now, not at press');
}

img.status = 'generated';
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

console.log(`✓ ${img.id}`);
console.log(`  → public/images/${KIND_DIR[img.kind] || 'photography'}/${img.filename}${dim ? `  (${dim.w}×${dim.h})` : ''}`);
console.log(`  ${img.spread}`);
for (const w of warn) console.log(`  ! ${w}`);
console.log(`\n  npm run build   to see it in place\n`);
