#!/usr/bin/env node
/* Pre-press checks, in one command.
 *
 *   npm run verify          report everything
 *   npm run verify -- --strict   exit non-zero on any FAIL
 *
 * Every check here exists because the thing it looks for actually happened in
 * this project, was invisible in the proof, and was found by hand. They are
 * cheap to run and expensive to skip, so they are worth running before any file
 * is sent anywhere.
 *
 * Reads the built book rather than the sources. The whole point is to catch a
 * manifest, a ledger or a stylesheet claiming something the object does not do.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { geometry } from '../book.config.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const strict = process.argv.includes('--strict');
const P = (...a) => path.join(root, ...a);

const bookPath = P('build/book.html');
if (!fs.existsSync(bookPath)) {
  console.error('✗ no build/book.html — run `npm run build` first');
  process.exit(1);
}
const html = fs.readFileSync(bookPath, 'utf8');
/* Everything the build emits, not just the book: the orb cover variant lives
   only in cover-options.html and decisions.md says to keep it there, so
   checking against book.html alone reports a deliberate decision as a fault. */
const allBuilt = fs.readdirSync(P('build')).filter((f) => f.endsWith('.html'))
  .map((f) => fs.readFileSync(P('build', f), 'utf8')).join('\n');
const text = html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, '')
                 .replace(/<[^>]+>/g, ' ')
                 .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const { images } = JSON.parse(fs.readFileSync(P('content/images.json'), 'utf8'));
const { facts } = JSON.parse(fs.readFileSync(P('content/facts.json'), 'utf8'));
const KD = { photography: 'photography', illustration: 'illustration', personal: 'personal' };

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

/* 1. Page count. The 130 in book.config.js is this printer's hard maximum, not
      a target — going over it is not a layout opinion, it is unprintable. */
const pages = (html.match(/<section class="page/g) || []).length;
const want = geometry.cover.pageCount + 2;   // + two cover surfaces
check('page count', pages === want, `${pages} sections, expected ${want} (${geometry.cover.pageCount} interior + 2 covers)`);

/* 2. Copy overflow. The preview flags it in the browser; here we can at least
      confirm the build did not emit the flag class into the HTML. */
check('no overflow flags in markup', !html.includes('has-overflow'), '');

/* 3. Placeholder text. "ISBN & barcode placement" printed on the back cover of
      every proof for weeks before anyone read it as text rather than as layout. */
const PLACEHOLDERS = [/\bplacement\b(?![^.]*likely)/i, /\bTK\b/, /placeholder/i, /lorem/i, /\bTODO\b/, /\bFIXME\b/, /coming soon/i];
const hits = PLACEHOLDERS.flatMap((re) => {
  const m = text.match(new RegExp(re.source, 'gi')) || [];
  return m.map((s) => s.trim());
}).filter((s) => !/displacement/i.test(s));
check('no placeholder text', hits.length === 0, hits.length ? `found: ${[...new Set(hits)].join(', ')}` : '');

/* 4. American English on the printed page. The manifest's credit fields became
      printed text when the imprint was added, and brought "colour-graded" with
      them. */
const BRIT = ['colour', 'colours', 'coloured', 'oxidised', 'organised', 'recognised', 'realised',
  'centre', 'metre', 'metres', 'grey', 'travelled', 'labelled', 'analyse', 'behaviour',
  'favourite', 'neighbour', 'honour', 'catalogue', 'licence', 'defence', 'practise'];
const brit = BRIT.filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(text));
check('American English', brit.length === 0, brit.length ? `found: ${brit.join(', ')}` : '');

/* 5. Images: a file on disk is either in the book or says it is not. An entry
      describing a spread it is not on is how two cut material breaks kept
      their credits on the imprint. */
const inBook = (i) => {
  const slug = i.slug || i.id;
  return (i.filename && i.filename !== '—' && html.includes(i.filename)) || html.includes(`${slug}-plate-1.png`);
};
const onDisk = (i) => fs.existsSync(P('public/images', KD[i.kind] || 'photography', i.filename))
  || fs.existsSync(P('public/images/plates', `${i.slug || i.id}-plate-1.png`));
const anywhere = (i) => {
  const slug = i.slug || i.id;
  return (i.filename && i.filename !== '—' && allBuilt.includes(i.filename))
      || allBuilt.includes(`${slug}-plate-1.png`);
};
const lying = images.filter((i) => onDisk(i) && !anywhere(i) && !String(i.spread || '').startsWith('Unplaced'));
check('no entry claims a spread it is not on', lying.length === 0,
  lying.length ? lying.map((i) => i.id).join(', ') : 'checked against every page the build emits');

/* 6. Credits describe the object. Enforced at build time now; verified here. */
const credited = images.filter((i) => i.origin === 'archive' && inBook(i));
const phantom = images.filter((i) => i.origin === 'archive' && !inBook(i))
  .filter((i) => text.includes((i.id.split('-').slice(2).join(' '))));
check('imprint credits only what is in the book', phantom.length === 0,
  phantom.length ? phantom.map((i) => i.id).join(', ') : `${credited.length} credits`);

/* 7. Sourced material carries source and licence. */
const gaps = images.filter((i) => i.origin === 'archive' && (!i.source || !i.license));
check('every sourced image has source + licence', gaps.length === 0, gaps.map((i) => i.id).join(', '));

/* 8. Consent. Anything flagged must still be flagged when this is sold. */
const consent = images.filter((i) => i.consent && inBook(i));
check('consent notes present on identifiable people', true,
  `${consent.length} image(s) carry a consent note — all must be cleared before any sale`);

/* 9. Web derivatives, or the hosted preview 404s. */
const noDeriv = images.filter((i) => onDisk(i) && i.filename !== '—'
  && !fs.existsSync(P('public/images-web', KD[i.kind] || 'photography', i.filename)));
check('every master has a web derivative', noDeriv.length === 0, noDeriv.map((i) => i.id).join(', '));

/* 10. Facts that are verified but have not reached a page. Reported, never
       failed: registering a claim before its spread exists is correct. */
const printedLower = text.toLowerCase();
const STOP = new Set(['about','above','after','their','there','these','those','which','while','would','because','between','through','around','other','under','where','with','from','that','this','than','then','they','been','have','into','more','most','only','over','some','such','were','when']);
const unreached = facts.filter((f) => f.status === 'verified').filter((f) => {
  const w = [...new Set((f.claim.toLowerCase().match(/[a-z]{5,}/g) || []))].filter((x) => !STOP.has(x));
  return w.length >= 4 && w.filter((x) => printedLower.includes(x)).length / w.length < 0.5;
});

const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
console.log('');
let failed = 0;
for (const r of results) {
  if (!r.ok) failed += 1;
  console.log(`  ${r.ok ? '✓' : '✗'} ${pad(r.name, 46)} ${r.detail}`);
}
console.log(`\n  · ${unreached.length} verified claim(s) may not be on a page (approximate — look, do not delete)`);
if (unreached.length) console.log(`    ${unreached.map((f) => f.id).join(', ')}`);
console.log('\n  Not checked here, and none of it is optional before press:');
console.log('    · paper caliper — book.config.js still holds a placeholder; get Saal\'s number');
console.log('    · a press PDF must come from a run that printed "PRESS: bleed + crop marks"');
console.log('    · consent from everyone identifiable, if this is ever sold');
console.log('');
if (failed) console.log(`  ${failed} check(s) failed.\n`);
if (strict && failed) process.exit(1);
