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
import { execFileSync } from 'node:child_process';
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
const stripped = html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, '');
const text = stripped.replace(/<[^>]+>/g, ' ')
                     .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
/* Alt text is prose too, and it was invisible to every check on this page for
   as long as they have existed: `alt="..."` lives INSIDE a tag, so stripping
   tags to get readable text throws it away. Nine placed images were carrying
   British spellings in their alt attributes when this was noticed — the house
   style check had never been able to see a word of it.
   It does not print on paper. It is what a screen reader says out loud on the
   hosted preview, and it is the manifest's `subject` field verbatim, so a fault
   here is a fault in the document that describes the book to its own author. */
const altText = [...stripped.matchAll(/\balt="([^"]*)"/g)].map((m) => m[1]).join(' \n ');
const prose = text + ' \n ' + altText;
const { images } = JSON.parse(fs.readFileSync(P('content/images.json'), 'utf8'));
const { facts } = JSON.parse(fs.readFileSync(P('content/facts.json'), 'utf8'));
const KD = { photography: 'photography', illustration: 'illustration', personal: 'personal' };

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
/* Three states, not two. A tick beside "not checked" is a lie told in the
   shape of a pass, and this file's whole purpose is catching those. */
const note = (name, detail) => results.push({ name, info: true, detail });

/* 1. Page count. The 130 in book.config.js is this printer's hard maximum, not
      a target — going over it is not a layout opinion, it is unprintable. */
const pages = (html.match(/<section class="page/g) || []).length;
const want = geometry.cover.pageCount + 2;   // + two cover surfaces
check('page count', pages === want, `${pages} sections, expected ${want} (${geometry.cover.pageCount} interior + 2 covers)`);

/* 2. Copy overflow cannot be answered by reading the built HTML — `has-overflow`
      is added by src/scripts/preview.js in a live browser, after layout, so
      testing the file for it always passes and proves nothing. That is what
      this line used to say, and saying it was all it did.
      It now hands the question to `scripts/overflow.mjs`, which drives the same
      rule in a real browser. Where there is no browser — CI — it goes back to
      being a note. Three states, and the third one is honest.
      Verified to fail: injecting a fat paragraph into one `.prose` reports
      folio 13, naming the block and the millimetres it runs over by. */
let flow = { available: false };
try {
  flow = JSON.parse(execFileSync('node', [P('scripts/overflow.mjs'), '--json'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
} catch { /* no browser, or the script is unhappy — the note below covers it */ }

if (!flow.available) {
  note('copy overflow',
    'no browser here — not checked. Run `npm run overflow` locally, or open the preview.');
} else {
  const over = flow.overflowing || [];
  check('copy overflow', over.length === 0,
    over.length
      ? `${over.length} page(s): ${over.map((o) => `folio ${o.folio}`).join(', ')} — run \`npm run overflow\` for the millimetres`
      : `${flow.pages} pages measured in a browser, none overflowing`);
}

/* 3. Placeholder text. "ISBN & barcode placement" printed on the back cover of
      every proof for weeks before anyone read it as text rather than as layout. */
const PLACEHOLDERS = [/\bplacement\b(?![^.]*likely)/i, /\bTK\b/, /placeholder/i, /lorem/i, /\bTODO\b/, /\bFIXME\b/, /coming soon/i];
const hits = PLACEHOLDERS.flatMap((re) => {
  const m = text.match(new RegExp(re.source, 'gi')) || [];
  return m.map((s) => s.trim());
}).filter((s) => !/displacement/i.test(s));
check('no placeholder text', hits.length === 0, hits.length ? `found: ${[...new Set(hits)].join(', ')}` : '');

/* 3b. Build artifacts. Template literals are how every page in this book is
       assembled, and a mistake inside one does not throw — it prints.
       Added 22 Aug after `{/* … *\/}` — JSX comment syntax, which is not a
       comment inside a JS template string — was written into an SVG and reached
       build/book.html as visible text on a diagram. Nothing caught it; it was
       found by grepping the output on a hunch.
       All seven of these patterns were absent when this was written, so any of
       them appearing is leakage by definition. */
const ARTIFACTS = [/\{\/\*/, /\*\/\}/, /\$\{/, /\[object Object\]/, /\bundefined\b/, /\bNaN\b/];
const leaked = ARTIFACTS.filter((re) => re.test(allBuilt)).map((re) => String(re));
check('no build artifacts in the output', leaked.length === 0,
  leaked.length ? `found: ${leaked.join(', ')}` : 'checked every page the build emits');

/* 4. American English on the printed page. The manifest's credit fields became
      printed text when the imprint was added, and brought "colour-graded" with
      them. */
const BRIT = ['colour', 'colours', 'coloured', 'oxidised', 'organised', 'recognised', 'realised',
  'centre', 'metre', 'metres', 'grey', 'travelled', 'labelled', 'analyse', 'behaviour',
  'favourite', 'neighbour', 'honour', 'catalogue', 'licence', 'defence', 'practise'];
/* Quoted titles are exempt, and this is not a loophole — it is the difference
   between house style and misquoting somebody. The imprint credits Rob
   Cruickshank's photograph "Slime mould (P. polycephalum)". That is its title.
   Americanising it would make the attribution wrong, which for a CC BY image is
   the one thing this page exists to get right. Only text in curly quotes is
   skipped, so a British spelling in the book's own prose is still caught. */
const ownWords = prose.replace(/\u201C[^\u201D]*\u201D/g, ' ');
const brit = BRIT.filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(ownWords));
check('American English', brit.length === 0, brit.length ? `found: ${brit.join(', ')}` : '');

/* 5. Images: a file on disk is either in the book or says it is not. An entry
      describing a spread it is not on is how two cut material breaks kept
      their credits on the imprint. */
const inBook = (i) => {
  const slug = i.slug || i.id;
  return (i.filename && i.filename !== '—' && html.includes(i.filename)) || html.includes(`${slug}-plate-1.png`);
};
/* "The project holds this image" — master OR derivative. On CI the masters are
   LFS pointer files rather than pixels (the Pages job deliberately does not
   fetch LFS), so testing only the master would be testing for a stub. */
const onDisk = (i) => fs.existsSync(P('public/images', KD[i.kind] || 'photography', i.filename))
  || fs.existsSync(P('public/images-web', KD[i.kind] || 'photography', i.filename))
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
note('consent',
  `${consent.length} image(s) carry a consent note — none are cleared; required before any sale`);

/* 9. Web derivatives, or the hosted preview 404s. */
/* This one must test the master specifically: the question is whether every
   press master has a screen derivative for the hosted preview. */
const hasMaster = (i) => fs.existsSync(P('public/images', KD[i.kind] || 'photography', i.filename));
const noDeriv = images.filter((i) => hasMaster(i) && i.filename !== '—'
  && !fs.existsSync(P('public/images-web', KD[i.kind] || 'photography', i.filename)));
check('every master has a web derivative', noDeriv.length === 0, noDeriv.map((i) => i.id).join(', '));

/* 10. Reproduced records count what they contain. Three spreads print a real
       Meta data export in full — "Cities you have checked into · 23 entries" —
       and the number beside the title is typed while the list underneath is
       edited. A record whose header disagrees with its own body is the exact
       failure this book's argument cannot survive: the spread's whole claim is
       that it reproduces the thing unedited.
       `count` takes two shapes. "23 entries" must equal the list. "7,325
       unique · 154 shown" is a total and a sample, and it is the SHOWN number
       that has to match — reading the first integer would fail a correct page,
       which is worse than not checking. */
const essays = fs.readdirSync(P('content/essays')).filter((f) => f.endsWith('.md'))
  .map((f) => [f, fs.readFileSync(P('content/essays', f), 'utf8')]);
const records = [];
for (const [file, src] of essays) {
  for (const m of src.matchAll(/record:\s*\n((?:[ \t]{6,}.*\n)+)/g)) {
    const blk = m[1];
    const title = (blk.match(/title:\s*(.+)/) || [, ''])[1].trim();
    const count = (blk.match(/count:\s*(.+)/) || [, ''])[1].trim();
    const entries = [...blk.matchAll(/^\s+-\s+"?(.*?)"?\s*$/gm)].map((x) => x[1].trim());
    const items = entries.length;
    if (!count || !items) continue;
    const nums = [...count.matchAll(/([\d,]+)/g)].map((x) => Number(x[1].replace(/,/g, '')));
    const want = /shown/i.test(count) ? nums[nums.length - 1] : nums[0];
    records.push({ file, title, count, items, want, entries });
  }
}
const miscounted = records.filter((r) => r.want !== r.items);
check('every reproduced record counts what it prints', miscounted.length === 0,
  miscounted.length
    ? miscounted.map((r) => `${r.title}: says "${r.count}", prints ${r.items}`).join('; ')
    : `${records.length} record(s), ${records.reduce((a, r) => a + r.items, 0)} entries`);

/* And every entry survives the layout. The count above compares the header to
   the source; this compares the source to the paper. A record that silently
   loses its tail to a column break would pass the first and fail the reader,
   and "reproduced in full, unedited" is printed underneath it as a claim. */
const dropped = records.flatMap((r) => r.entries.filter((e) => !text.includes(e))
  .map((e) => `${r.title}: "${e}"`));
check('every reproduced entry reaches the page', dropped.length === 0,
  dropped.length ? dropped.slice(0, 4).join('; ') + (dropped.length > 4 ? ` (+${dropped.length - 4})` : '')
                 : 'checked entry by entry against the printed text');

/* 11. Every content image says something to a screen reader.

      A plate's alt text is the manifest's `subject` verbatim, and it is the
      only version of the picture a reader using the hosted preview gets. It
      does not print on paper, which is exactly why it rots unnoticed.

      CALIBRATED AGAINST REAL CASES, and the first draft of this check was
      wrong about every one of them. It flagged 19 images with `alt=""` as
      faults; all 19 were correct:

        · the eight grounds sit under body copy at 8 percent opacity and carry
          no information a reader needs — decorative, and `alt=""` is the right
          way to say so;
        · the three screen-print separations layer into ONE picture, and the
          markup already does the textbook thing — `role="img"` and an
          `aria-label` on the containing stack, `alt=""` on each layer.

      So an empty alt is a fault only when nothing else speaks for the image.
      An image inside an aria-labelled container is covered; a ground is
      decorative by role. Anything else with an empty alt is genuinely silent. */
const groundFiles = new Set(images.filter((i) => i.role === 'ground')
  .map((i) => i.filename).filter((f) => f && f !== '—'));
const labelledStacks = [...stripped.matchAll(/aria-label="[^"]+"[\s\S]*?<\/div>/g)].join(' ');
const silent = [...stripped.matchAll(/<img[^>]*>/g)].map((m) => m[0])
  .filter((tag) => /alt=""/.test(tag))
  .map((tag) => (tag.match(/src="[^"]*\/([^"\/]+)"/) || [])[1])
  .filter(Boolean)
  .filter((file) => !groundFiles.has(file) && !labelledStacks.includes(file));
const named = [...stripped.matchAll(/<img[^>]*\balt="([^"]+)"/g)].map((m) => m[1]);
check('every content image speaks to a screen reader', silent.length === 0,
  silent.length ? `silent: ${[...new Set(silent)].join(', ')}`
    : `${named.length} described, ${groundFiles.size} grounds decorative by role, 3 plates covered by their stack's aria-label`);

/* 12. The manifest agrees with the essays about what stage a ground is on.

      Grounds are labelled by STAGE, not by part, because the stage system is
      what decides whether a page is cream or charcoal — and a ground drawn for
      one and printed on the other is nearly invisible. Four of the eight had
      drifted a stage behind their essay when this was written: the essays'
      stages moved as the arc was proved on 21 Aug and the manifest labels did
      not follow. The artwork turned out to be right in every case, so the drift
      was documentation only — but the next drift might not be, and nothing was
      watching. */
const romans = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };
const essayStage = {};
for (const f of fs.readdirSync(P('content/essays')).filter((n) => n.endsWith('.md'))) {
  const src = fs.readFileSync(P('content/essays', f), 'utf8');
  const title = (src.match(/^title:\s*(.+)$/m) || [])[1]?.trim();
  const stage = Number((src.match(/^stage:\s*(\d+)/m) || [])[1]);
  if (title && stage) essayStage[title] = stage;
}
const drifted = images.filter((i) => i.role === 'ground' && essayStage[i.essay])
  .filter((i) => String(i.section || '').trim() !== `Stage ${romans[essayStage[i.essay]]}`)
  .map((i) => `${i.id} says "${i.section}", essay is Stage ${romans[essayStage[i.essay]]}`);
check('every ground agrees with its essay about the stage', drifted.length === 0,
  drifted.length ? drifted.join('; ')
    : `${images.filter((i) => i.role === 'ground').length} grounds, all matching their essay`);

/* 13. The contents page agrees with the book.

      `content/contents.json` restates, by hand, what `book.json` and the essay
      frontmatter already know: the parts, their titles, and the essays under
      each in order. Nothing keeps the two in step. Rename an essay, reorder a
      part, or move an essay between parts and the printed contents keeps the
      old answer — silently, on page five, where it is the first thing a reader
      uses and the last thing anyone re-reads.
      It agreed when this was written. That is the moment to add the check. */
const tocParts = JSON.parse(fs.readFileSync(P('content/contents.json'), 'utf8')).parts;
const seq = JSON.parse(fs.readFileSync(P('content/book.json'), 'utf8')).sequence;
const front = (rel) => fs.readFileSync(P('content', rel), 'utf8');
const field = (src, k) => (src.match(new RegExp(`^${k}:\\s*(.+)$`, 'm')) || [])[1]?.trim().replace(/^["']|["']$/g, '');
const realParts = [];
for (const e of seq) {
  if (e.type === 'divider') realParts.push({ number: field(front(e.source), 'number'), title: field(front(e.source), 'title'), essays: [] });
  if (e.type === 'essay' && realParts.length) realParts.at(-1).essays.push(field(front(e.source), 'title'));
}
const flat = (ps) => ps.map((p) => `${p.number}|${p.title}|${p.essays.join('~')}`).join(' // ');
const tocFlat = flat(tocParts.map((p) => ({ number: p.number, title: p.title, essays: p.essays.map((x) => x.title) })));
const bookFlat = flat(realParts);
check('the contents page agrees with the book', tocFlat === bookFlat,
  tocFlat === bookFlat
    ? `${realParts.length} parts, ${realParts.reduce((a, p) => a + p.essays.length, 0)} essays, same titles in the same order`
    : `contents: ${tocFlat}  ≠  book: ${bookFlat}`);

/* 14. Vertical text declares its orientation. This is the one check that reads
       a stylesheet rather than the built page, and it is here because the book's
       own title printed as "WHILE WE· RE HERE" on the spine for weeks.
       `writing-mode: vertical-rl` with the default `text-orientation: mixed`
       rotates Latin letters and leaves UAX #50 "U" characters — the apostrophe
       among them — standing upright in a full-width em box. Two rounds of
       measuring `letter-spacing` failed to find it because tracking was never
       the cause. Any Latin text set vertically wants `sideways`, so a rule that
       goes vertical without saying which is worth a second look. */
const cssFiles = fs.readdirSync(P('src/styles')).filter((f) => f.endsWith('.css'));
const vertical = [];
for (const f of cssFiles) {
  const css = fs.readFileSync(P('src/styles', f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of css.matchAll(/([^{}]+)\{([^}]*writing-mode\s*:\s*vertical[^}]*)\}/g)) {
    if (!/text-orientation/.test(m[2])) vertical.push(`${f} ${m[1].trim().split('\n').pop().trim()}`);
  }
}
check('vertical text declares text-orientation', vertical.length === 0,
  vertical.length ? vertical.join(', ') : 'no vertical rule leaves orientation to the default');

/* 15. Facts that are verified but have not reached a page. Reported, never
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
  if (!r.info && !r.ok) failed += 1;
  const mark = r.info ? '·' : r.ok ? '✓' : '✗';
  console.log(`  ${mark} ${pad(r.name, 46)} ${r.detail}`);
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
