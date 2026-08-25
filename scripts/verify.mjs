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

/* 2b. Bad line breaks, from the same browser. A word hyphenated across the foot
       of a column means the reader turns the leaf holding half of it, and a
       hyphen ladder is the fault the CSS believed it had already prevented —
       `-webkit-hyphenate-limit-lines` is not implemented in Chromium, so that
       declaration did nothing for as long as it existed. See the note in
       src/styles/typography.css. Same degradation as the overflow check: no
       browser, no claim. */
let breaks = { available: false };
try {
  breaks = JSON.parse(execFileSync('node', [P('scripts/breaks.mjs'), '--json'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
} catch { /* no browser — the note below covers it */ }

if (!breaks.available) {
  note('line breaks', 'no browser here — not checked. Run `npm run breaks` locally.');
} else {
  const bad = breaks.findings || [];
  const t = breaks.tally || {};
  check('no word broken across a column foot, no hyphen ladders', bad.length === 0,
    bad.length
      ? `${bad.length}: ${bad.map((b) => `folio ${b.folio} ${b.kind}`).join(', ')} — run \`npm run breaks\``
      : `${t.lines} lines, ${t.hyphenated} hyphenated (${(t.hyphenated / t.lines * 100).toFixed(1)}%), ragged right`);

  /* The display serif at 900 and no other weight — typography.css states the
     rule, a list of selectors enforces it, and the list has been forgotten
     twice: the dedication, then `.cover-back__line` on the day it moved to the
     display face and printed Medium beside a front board printing Ultra.

     It is surfaced HERE rather than only in breaks.mjs, and that is the whole
     point of this block. scripts/mutate.mjs reads pass/fail by scanning
     verify's ✓/✗ lines; a check that only ever prints inside breaks.mjs is
     invisible to it. The first version of this check lived there alone and
     mutation reported `? display-weight — could not read`. A check nothing can
     prove bites is a check nobody should trust. */
  const w = breaks.weights || [];
  check('every element in the display serif is at weight 900', w.length === 0,
    w.length
      ? `${w.length}: ${w.map((x) => `.${x.cls} at ${x.weight}`).join(', ')} — run \`npm run breaks\``
      : 'one voice, one weight');

  /* Surfaced here for the same reason as the weights above: mutate.mjs reads
     verify's ✓/✗ lines, so a check that only prints inside breaks.mjs cannot be
     proven to bite. This one exists because the dedication printed "and for" and
     "Fabiola" on separate lines — the <br> was right, the 128mm measure was
     narrower than the 149.8mm clause, and the width silently added two breaks of
     its own on top of the one the layout chose. */
  const st = breaks.stacks || [];
  check('every deliberate line break survives the measure', st.length === 0,
    st.length
      ? `${st.map((x) => `.${x.cls.split(' ').pop()} declared ${x.declared}, renders ${x.rendered}`).join('; ')} — run \`npm run breaks\``
      : 'the dedication and the divider titles stack where they were told to');
}

/* 2c. Does anything on these pages actually scan? The field note between Parts
   II and III says this book prints no scannable codes and no personal data it
   does not mean to, and until now nothing enforced it. Both tag plates are
   generated today and their drawn square has no finder patterns, so it is safe
   by accident; shot-list item 0b schedules replacing them with photographs of
   the REAL tag, whose code does resolve.

   scripts/codes.py carries its own positive control — it encodes a known symbol
   and decodes it back, and refuses to report at all if that round trip fails.
   That matters more than usual here: the first version of this check used a
   real photograph of a QR code as its control, the control did not decode, and
   the reassuring negative result on the tag plates was worth nothing. Results
   are cached per file, so this costs about a tenth of a second unless an image
   changed. */
let codes = { available: false };
try {
  codes = JSON.parse(execFileSync(P('.venv/bin/python'), [P('scripts/codes.py'), '--json'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
} catch { /* no venv, or no opencv — reported below, never silently passed */ }
if (!codes.available) {
  note('scannable codes', `${codes.reason || 'not checked'} — run \`npm run codes\``);
} else {
  const hits = codes.hits || [];
  check('nothing printed in this book scans', hits.length === 0,
    hits.length
      ? `${hits.length}: ${hits.map((h) => h.image).join(', ')} — payloads deliberately not printed`
      : `${codes.scanned} placed images, ${codes.control}`);
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
/* STEMS, not whole words, and the reason is that two word boundaries were each
   hiding faults in a different direction.

   The leading one hid compounds: `\bcolour\b` cannot see "watercolour", because
   there is no boundary between "water" and "colour". Three of those and two
   "millimetres" were in printed alt text.

   The trailing one hid inflections: the list held "neighbour" and "realised",
   so "neighbours" and "realise" both walked past it, as did "centred" — the
   list has "centre". A list of base forms cannot be completed by adding more
   base forms; that is what "colours" and "coloured" sitting beside "colour"
   were an attempt at, and it still missed three words on this page.

   So each stem is matched as `\w*stem\w*`, which reaches compounds and
   inflections at once, and the whole offending token is reported rather than the
   stem, so the message says "watercolour" and not "colour". */
const BRIT_STEMS = [
  'colour', 'centre', 'metre', 'neighbour', 'honour', 'behaviour', 'favourit',
  'labour', 'armour', 'harbour', 'rumour', 'vapour', 'flavour', 'parlour',
  'saviour', 'endeavour', 'splendour', 'kerb', 'catalogue', 'licence', 'defence',
  'offence', 'oxidis', 'organis', 'recognis', 'realis', 'apologis', 'criticis',
  'specialis', 'utilis', 'travell', 'labell', 'cancell', 'modell', 'marvell',
  'mould', 'smoulder', 'sombre', 'lustre', 'calibre', 'fibre', 'litre', 'theatre',
  'aluminium', 'programme', 'storey', 'plough', 'draught', 'cheque', 'jewellery',
  'pyjamas', 'sceptic', 'manoeuvre', 'learnt', 'spelt', 'practis', 'skilful', 'wilful',
];
/* Words that CONTAIN a stem and are correct American English. Every one of these
   was a real false positive when the stem list was first run against the book:
   "organism" and "organist" contain `organis`, "programmer" and "programming"
   contain `programme`. Without this set the check would have cried wolf on the
   Physarum credit and on the essay about machines. */
const BRIT_ALLOW = new Set(['greyhound', 'greyhounds', 'organism', 'organisms',
  'organist', 'organists', 'programmer', 'programmers', 'programming']);
/* Quoted titles are exempt, and this is not a loophole — it is the difference
   between house style and misquoting somebody. The imprint credits Rob
   Cruickshank's photograph "Slime mould (P. polycephalum)". That is its title.
   Americanising it would make the attribution wrong, which for a CC BY image is
   the one thing this page exists to get right. Only text in curly quotes is
   skipped, so a British spelling in the book's own prose is still caught. */
/* Citation fields on the sources page are exempt for the same reason and by the
   same principle. "UNESCO World Heritage Centre" is that body's registered name;
   spelling it "Center" would name an organisation that does not exist. Only the
   author and publication runs are skipped \u2014 the subject label beside them is
   Adam's own words and is still held to house style, which matters because at
   least one fact id in the ledger reads `peacock-structural-colour`. */
const citations = stripped
  .replace(/<span class="sources__(?:who|where)">[\s\S]*?<\/span>/g, ' ')
  .replace(/<[^>]+>/g, ' ');
const ownWords = (citations + ' \n ' + altText).replace(/\u201C[^\u201D]*\u201D/g, ' ');
const britHits = new Set();
for (const stem of BRIT_STEMS) {
  for (const m of ownWords.matchAll(new RegExp(`\\w*${stem}\\w*`, 'gi'))) {
    const t = m[0].toLowerCase();
    if (!BRIT_ALLOW.has(t)) britHits.add(t);
  }
}
/* `grey` is the one stem that cannot take a loose tail: "greyhound" is spelled
   that way on both sides of the Atlantic. It keeps an explicit inflection list
   and a hard boundary, so greys/greyed/greying are caught and the dog is not. */
for (const m of ownWords.matchAll(/\w*grey(s|ed|ing)?\b/gi)) {
  const t = m[0].toLowerCase();
  if (!BRIT_ALLOW.has(t)) britHits.add(t);
}
const brit = [...britHits];
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
/* BOTH stage records are checked, because a ground carries two — `section`, a
   string reading "Stage IV", and `stage`, a number — and this check used to read
   only the first. `npm run mutate` found the gap and the gap had a real fault
   sitting in it: ground-05-imagine-to-make said `section: "Stage IV"` and
   `stage: 3`. Its own revision note records the section being corrected from III
   to IV on 22 Aug; the number beside it was left behind, and the check reported
   "8 grounds, all matching their essay" because it never looked at the number.

   That is the same drift this check was written to catch, one field over. The
   numeric field is documentation — the build takes its stage from the essay, not
   from the image record, so nothing printed wrong — but the next drift might not
   be documentation, and a half-checked record is how this one survived a
   correction aimed directly at it. */
const drifted = images.filter((i) => i.role === 'ground' && essayStage[i.essay])
  .flatMap((i) => {
    const want = essayStage[i.essay];
    const out = [];
    if (String(i.section || '').trim() !== `Stage ${romans[want]}`) {
      out.push(`${i.id} section says "${i.section}", essay is Stage ${romans[want]}`);
    }
    if (i.stage !== undefined && Number(i.stage) !== want) {
      out.push(`${i.id} stage says ${i.stage}, essay is ${want}`);
    }
    return out;
  });
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

/* 13b. No essay opener arrives without its lede.

      Every essay opens on a facing pair: a full-bleed plate on the verso, and on
      the recto the eyebrow, the title, the deck, then a paragraph of lede set
      with a small-caps lead-in, with the reading time tucked against its right.
      The lede is the essay's own first block, lifted onto the opener — which is
      why the reading spread's drop cap falls on the SECOND block in all eight.

      On 24 Aug 2026, essay 01 — the first essay in the book — had no `blocks:`
      on its opener spread and no `open` block to name. The lower two-thirds of
      that recto printed blank, "7 MIN" floated alone above the rule, and the
      essay's real opening sentence sat inside the reading spread instead. The
      reader met the pattern in its broken form first and every later opener
      appeared to have gained something.

      Nothing caught it and nothing could. `copy overflow` measures type that is
      too long for its slot and has no opinion about a slot left empty. The
      frontmatter was valid YAML; the layout mapped an absent `blocks` key to an
      empty array and emitted `<div class="prose prose--lead opener__lede">` with
      nothing inside, which collapses to zero height and reads, to every check
      in this file, exactly like a page that was never meant to carry text. The
      fingerprint was in the file rather than the render: all eight essays are
      structurally identical, and essay 01's `dropCap: true` sat on line 19
      where the other seven have it on line 18, short by exactly the missing line.

      MEASURED IN THE COMPOSED HTML, not the frontmatter, and the difference is
      the whole point. `blocks: [opn]` is a typo that passes any check reading the
      YAML — the key is present, the list is non-empty — and still resolves to
      nothing, because the block name matches no comment in the markdown. Only
      the rendered element knows whether words arrived. */
const openerLedes = [...html.matchAll(/<div class="prose prose--lead opener__lede">([\s\S]*?)<\/div>/g)]
  .map((m) => m[1].replace(/<[^>]+>/g, '').trim());
const openerCount = (html.match(/class="page[^"]*\bopener__recto\b/g) || []).length;
const emptyLedes = openerLedes.filter((t) => t.length === 0).length;
check('every essay opener carries its lede', emptyLedes === 0 && openerLedes.length === openerCount,
  emptyLedes
    ? `${emptyLedes} of ${openerLedes.length} opener rectos print an empty lede — the essay is missing \`blocks:\` on its opener spread, or names a block that does not exist`
    : openerLedes.length !== openerCount
      ? `${openerCount} opener rectos but ${openerLedes.length} lede elements — one is not emitting the element at all`
      : `${openerLedes.length} openers, every one carrying words`);

/* 14. Nothing is drawn through a diagram's own labels.

      Twice a figure has printed with a line across a word — Figure 02.1 had the
      Admitted ring between the B and the E of REMEMBERED, and `walking` had its
      curve caption laid over `correction`. Both were invisible at thumbnail
      size and obvious at 4x, and both were found because somebody happened to
      enlarge that corner. `scripts/labels.mjs` does it deliberately: it renders
      each figure twice, once with the labels hidden, and looks for a continuous
      stroke inside each label's box — plus a plain box-overlap test, because
      hiding all the text makes text-on-text collisions invisible to the first
      method. Needs a browser; a note, never a pass, without one. */
let lbl = { available: false };
try {
  lbl = JSON.parse(execFileSync('node', [P('scripts/labels.mjs'), '--json'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
} catch { /* covered by the note below */ }
if (!lbl.available) {
  note('diagram labels', 'no browser here — not checked. Run `npm run labels` locally.');
} else {
  const c = lbl.collisions || [];
  /* `latent` are collisions in figures that exist in src/layouts/diagrams.mjs
     but are on no page — four of the five are unplaced, waiting on the 130-page
     ceiling. They cannot fail the build, because nothing prints them. They are
     carried into this line so the count is not silently dropped: the whole point
     of measuring them is that somebody sees the warning BEFORE placing one. */
  const lat = lbl.latent || [];
  const tail = lat.length ? ` · ${lat.length} in unplaced figures — run \`npm run labels\`` : '';
  check('nothing is drawn through a diagram label', c.length === 0,
    c.length ? c.map((x) => `"${x.text}"`).join(', ')
             : `${lbl.boxes} labels checked, all placed ones clear${tail}`);
}

/* 15. Every number in a margin note traces to the fact ledger.

      The margin notes are this book's factual apparatus — starling flock sizes,
      Pew adoption figures, working-memory capacity, the Camino's distance. Each
      is meant to come from `content/facts.json`, and the facts declare which
      note they serve. Nothing checked the other direction: a number typed into
      a note, or edited afterwards, was answerable to nothing.

      Scope is deliberately just the notes. Body prose is full of numbers that
      are observations rather than claims — a pencil line at thirty-seven and a
      quarter inches, eleven years under a maple, about a meter an hour — and
      demanding a citation for those would make the check noise.

      A note may draw on SEVERAL facts (the before-time note cites broadband and
      smartphone adoption together), so numbers are matched against the whole
      ledger, including source publication years, not against one best-matching
      fact. Matching per-fact was tried first and produced two false positives
      immediately. */
/* SPELLED-OUT numbers count too, and for a long time they did not. This book
   sets most of its figures as words — the attention essay prints "around
   eighty-five times a day" — and `grabNums` only ever matched digits. Three
   margin notes contain no digit at all, so this check was verifying nothing
   whatsoever for them while reporting "150 distinct figures, no margin note
   citing anything else". Two of the three carry the load: "eighty-five" IS
   smartphone-checks, and "four" IS working-memory-four-chunks.

   The words are normalised on BOTH sides rather than evaluated. "thirty
   trillion" contributes 30, not 30000000000000, and the ledger's own "thirty
   trillion" contributes 30 as well, so the two agree without this check having
   to become a number parser. Scale words are deliberately ignored for the same
   reason. Compounds are read before bare words so "eighty-five" gives 85 rather
   than 80 and 5.

   Every spelled number in the book already resolved when this was added — the
   book was right and the check was blind, which is the combination worth fixing
   before it stops being true. */
const UNIT_WORDS = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
  eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19 };
const TENS_WORDS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
  eighty: 80, ninety: 90 };
const TENS_RE = Object.keys(TENS_WORDS).join('|');
const UNIT_RE = Object.keys(UNIT_WORDS).join('|');
const wordNums = (t) => {
  const s = String(t).toLowerCase();
  const out = new Set();
  for (const m of s.matchAll(new RegExp(`\\b(${TENS_RE})[- ](${UNIT_RE})\\b`, 'g'))) {
    out.add(String(TENS_WORDS[m[1]] + UNIT_WORDS[m[2]]));
  }
  const rest = s.replace(new RegExp(`\\b(${TENS_RE})[- ](${UNIT_RE})\\b`, 'g'), ' ');
  for (const [w, v] of Object.entries({ ...UNIT_WORDS, ...TENS_WORDS })) {
    if (new RegExp(`\\b${w}\\b`).test(rest)) out.add(String(v));
  }
  return out;
};

const ledgerNums = new Set();
const grabNums = (t) => String(t).replace(/<[^>]+>/g, ' ').match(/\b\d[\d,.]*\b/g) || [];
const feed = (t) => {
  for (const n of grabNums(t)) ledgerNums.add(n.replace(/,/g, ''));
  for (const n of wordNums(t)) ledgerNums.add(n);
};
/* Citation metadata contributes YEARS ONLY, and this was measured rather than
   assumed. Feeding whole `source` strings in put page ranges, volume numbers and
   issue numbers into the pool — "Behavioral and Brain Sciences 24(1): 87-114"
   alone contributes 24, 1, 87 and 114 — and the pool then answered yes to 28% of
   every integer from 1 to 200. `npm run mutate` caught it: changing the Shikoku
   note from 88 temples to 87 passed silently, because 87 is a page number in an
   unrelated paper about working memory.

   Years still have to be admitted. Notes legitimately cite them — "In a 2008
   field study", "Four experiments published in 2011" — and the Physarum note's
   2010 exists nowhere but its source's publication year. So a four-digit 18xx,
   19xx or 20xx passes and nothing else does.

   That takes the pool from 153 figures to 98 and the automatic-pass rate from
   28% to 22%. Still not tight — the claims themselves hold many small integers,
   and a wrong "four" will always look like some other four — but it closes the
   class of false negative that page ranges were creating. Verified: no real
   margin note fails under the narrower pool. */
const YEAR = /^(18|19|20)\d\d$/;
for (const f of facts) {
  feed(f.claim);
  feed(f.note || '');
  for (const v of Object.values(f.source || {})) {
    for (const n of grabNums(v)) {
      const clean = n.replace(/,/g, '');
      if (YEAR.test(clean)) ledgerNums.add(clean);
    }
  }
}
const unsourced = [];
for (const file of fs.readdirSync(P('content/essays')).filter((n) => n.endsWith('.md'))) {
  const src = fs.readFileSync(P('content/essays', file), 'utf8');
  for (const m of src.matchAll(/^\s*marginNote:\s*>-?\n((?:\s{6,}.*\n)+)/gm)) {
    const note = m[1];
    if (note.length < 60) continue;
    const miss = [...new Set([
      ...grabNums(note).map((n) => n.replace(/,/g, '')),
      ...wordNums(note),
    ])].filter((n) => !ledgerNums.has(n));
    if (miss.length) unsourced.push(`${file.replace('.md','')}: ${miss.join(', ')}`);
  }
}
check('every number in a margin note is in the fact ledger', unsourced.length === 0,
  unsourced.length ? unsourced.join(' · ')
    : `${facts.length} facts, ${ledgerNums.size} distinct figures, no margin note citing anything else`);

/* 16. Vertical text declares its orientation. This is the one check that reads
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

/* 17. Every `usedIn` in the fact ledger points somewhere real. This is the
       check that the sources page rests on, because that page prints exactly
       the claims whose `usedIn` resolves — see scripts/build.mjs.

       It exists because six verified facts were citing passages the book no
       longer contains when the sources page was written, and one of them would
       have printed a citation for a paper about fourth-century monks beside a
       book that never mentions them. Five of the six were the same shape:
       `usedIn` read "photo 177 — specimen label", a numbering from a selection
       pass that stopped resolving to anything in this repo long ago. Nothing
       looked at those strings, so nothing noticed.

       Know its limit. The sixth, `monastic-acedia`, read
       "essays/the-secret-life-of-attention.md — flow-1b" — a real file and a
       real block, both of which still exist. Only the passage inside the block
       changed. No exact check can catch that, which is what the approximate
       report below is for; it did list monastic-acedia. This check catches
       drift in the address, not in the prose behind it. */
/* A claim can be used in two places, so there are two legal address forms: an
   essay ("essays/x.md — block") for body copy and margin notes, and an image id
   ("specimen-01-komodo-tongue — label") for a caption or a specimen label. Both
   are checked against the thing they name. The stale five matched neither. */
const imageIds = new Set(images.map((i) => i.id));
const badUse = [];
for (const f of facts) {
  for (const u of f.usedIn || []) {
    if (String(u).startsWith('Unplaced')) continue;      // deliberately not on a page
    const head = String(u).split('—')[0].trim();
    if (imageIds.has(head)) continue;                    // a caption on a known image
    const m = String(u).match(/^([\w./-]+\.md)(?:\s*—\s*(.+))?$/);
    if (!m) { badUse.push(`${f.id}: "${String(u).slice(0, 40)}" is not an address`); continue; }
    const file = P('content', m[1]);
    if (!fs.existsSync(file)) { badUse.push(`${f.id}: ${m[1]} does not exist`); continue; }
    /* The tail after the em dash may name a block or describe a slot
       ("marginNote"). Only check it when it looks like a block id. */
    const tail = (m[2] || '').trim();
    if (/^[a-z0-9-]+$/.test(tail) && tail !== 'marginNote') {
      const src = fs.readFileSync(file, 'utf8');
      if (!new RegExp(`<!--\\s*block:\\s*${tail}\\s*-->`, 'i').test(src)) {
        badUse.push(`${f.id}: ${m[1]} has no block "${tail}"`);
      }
    }
  }
}
check('every fact says where it is used, and means it', badUse.length === 0,
  badUse.length ? badUse.join(' · ')
    : `${facts.length} facts, every usedIn resolves to a file and block that exist, `
      + `or is marked Unplaced`);

/* 18. Facts that are verified but have not reached a page. Reported, never
       failed: registering a claim before its spread exists is correct. */
const printedLower = text.toLowerCase();
const STOP = new Set(['about','above','after','their','there','these','those','which','while','would','because','between','through','around','other','under','where','with','from','that','this','than','then','they','been','have','into','more','most','only','over','some','such','were','when']);
const unreached = facts.filter((f) => f.status === 'verified').filter((f) => {
  const w = [...new Set((f.claim.toLowerCase().match(/[a-z]{5,}/g) || []))].filter((x) => !STOP.has(x));
  return w.length >= 4 && w.filter((x) => printedLower.includes(x)).length / w.length < 0.5;
});

/* Every `focus:` a spread declares must be a focal class that exists.

   `focus:` was added on 23 Aug 2026 so a spread can say which band of a source
   to keep when the plate and the slot are different shapes. The layout turns
   `focus: low` into `figure--focus-low`, and CSS defines three of those. Write
   `focus: middle` and you get a class nobody styles: no error, no warning, and
   a page that silently crops to the middle exactly as if you had said nothing.

   That is the failure this repository keeps meeting — a rule written down and
   not applied, a property asked for and not supported. `-webkit-hyphenate-limit-
   lines` was one, the display-weight list was two more. A vocabulary that is
   open at the point of use and closed at the point of definition has to be
   checked where the two meet. */
const FOCUS_RE = /^\s*focus:\s*([a-z-]+)\s*$/gm;
const focusCss = fs.readFileSync(P('src/styles/layouts.css'), 'utf8');
const focusDefined = new Set([...focusCss.matchAll(/figure--focus-([a-z-]+)/g)].map((m) => m[1]));
const focusUsed = [];
for (const f of fs.readdirSync(P('content/essays'))) {
  if (!f.endsWith('.md')) continue;
  const src = fs.readFileSync(P('content/essays', f), 'utf8');
  for (const m of src.matchAll(FOCUS_RE)) focusUsed.push({ file: f, value: m[1] });
}
const focusBad = focusUsed.filter((u) => !focusDefined.has(u.value));
check('every focus: names a focal class that exists', focusBad.length === 0,
  focusBad.length
    ? `${focusBad.map((u) => `${u.file}: focus: ${u.value}`).join(', ')} — defined: ${[...focusDefined].join(', ')}`
    : `${focusUsed.length} in use, ${focusDefined.size} defined (${[...focusDefined].join(', ')})`);

/* No photograph may be filed as generated.

   `status` means "the asset is in the repository". `scripts/place.mjs` wrote
   'generated' for everything it placed, so 31 of Adam's own photographs said a
   model had made them — the father portrait, the observation hive, the walk in
   the woods, the whole specimen set.

   It matters because `src/layouts/helpers.mjs` PRINTS `image.status` on a plate
   specimen card. Only two plates use that helper today, and both carry a real
   date, so nothing false has ever reached a page. That is luck. Route one of
   those photographs through the same helper and the book asserts, in its own
   apparatus, that a photograph Adam took was generated — inside a book arguing
   for looking at what is actually there. A claim that is wrong in the data and
   merely unprinted is still wrong.

   ORIGIN, NOT KIND, IS THE DISCRIMINATOR, and the first version of this check
   got it wrong twice over. `kind: photography` covers two images a model made,
   so kind cannot decide it. And `origin: original` does NOT mean an original
   photograph — it means original artwork, which is exactly what the fifteen
   `survey-*` plates are; matching on it turned this check red against records
   that were right all along. Only these three origins mean a camera was
   involved. The eight `archive` ones matter most: each carries a `source` and a
   `licence` naming a real photographer — Yuri Elizegi, Tima Miroshnichenko,
   Artem Podrez, Elle Hughes — beside a field saying a model made the picture. */
const CAMERA = new Set(['own photograph', 'archive', 'personal archive']);
const misfiled = images.filter((i) => CAMERA.has(String(i.origin || '')) && i.status === 'generated');
check('no photograph is filed as generated', misfiled.length === 0,
  misfiled.length
    ? `${misfiled.length}: ${misfiled.slice(0, 4).map((i) => i.id).join(', ')}${misfiled.length > 4 ? '…' : ''}`
    : `${images.filter((i) => CAMERA.has(String(i.origin || ''))).length} photographs, none claiming a model made them`);

/* Nothing filed as placed is off the page, and nothing on the page is filed away.

   `status` is the one field in the manifest that makes a claim about the BOOK
   rather than about the asset, and it is typed by hand, so it drifts. On 24 Aug
   2026 five records said `placed` while their own `spread` field, two lines
   below, began with the word "Unplaced" — material-01, material-03,
   intelligence-03, pilgrimage-06 and here-09. Every one had a real reason to be
   off the page (the 130-page ceiling took four of them; a better photograph
   replaced the fifth), and every one had been swept to `placed` by the pass that
   correctly relabelled 39 photographs whose `generated` was a provenance lie.
   The sweep keyed on origin, which is the right discriminator for provenance and
   the wrong one for placement.

   It matters because `content/plan/` and `npm run brief` read this field to say
   what is outstanding, and a record that claims to be in the book is a record
   nobody looks at again. Four of these five are good images waiting on a freed
   spread; filed as `placed` they were quietly retired instead of queued.

   RESOLVED BY SLUG AS WELL AS FILENAME, and the first version of this check was
   wrong for want of it. A screen-print record carries `filename: "—"` and ships
   as three separations named from its `slug` — `print-01-river-figure-plate-1`
   and so on. Matching on filename alone reported `part-4-divider-return` as
   off the page when its three plates are the Part IV divider, printed. Absence
   of the reference you happened to look for is not absence from the book.

   BOTH DIRECTIONS, from one resolver. Checking only that `placed` is printed
   would let the opposite drift through — a record marked `unplaced` while its
   plate sits on page 90 — and that is the same fault wearing the other shoe.

   WHAT A PASS DOES NOT MEAN, because `status` still does two jobs. Only four of
   its five values say anything about placement: `placed` claims the page,
   `unplaced`, `not generated` and an absent status all disclaim it, and those
   are what this check reads. `generated` says a model made the picture and is
   SILENT about placement — 42 of its 64 records print, 22 do not, and nothing
   distinguishes them. So a generated artwork that quietly falls off a page
   still passes here. Fixing that means splitting provenance from placement
   across 147 records and the plate card in helpers.mjs that prints the field,
   which is not a change to make to a book this close to press. The gap is
   named rather than covered, so the green line is not read as more than it is. */
const CLAIMS_OFF_PAGE = new Set(['unplaced', 'not generated', '']);
const plateDir = P('public/images/plates');
const plateFiles = fs.existsSync(plateDir) ? fs.readdirSync(plateDir) : [];
const assetsOf = (i) => {
  const out = i.filename && i.filename !== '—' ? [i.filename] : [];
  const stem = i.slug || i.id;
  out.push(...plateFiles.filter((f) => f.startsWith(`${stem}-plate-`)));
  return out;
};
const printed = new Set([...html.matchAll(/<img[^>]*src="[^"]*?([^"/]+)"/g)].map((m) => m[1]));
const onPage = (i) => assetsOf(i).some((f) => printed.has(f));
const ghosts = images.filter((i) => i.status === 'placed' && !onPage(i));
const orphans = images.filter((i) => CLAIMS_OFF_PAGE.has(String(i.status || '')) && onPage(i));
const wrong = [...ghosts.map((i) => `${i.id} filed placed, on no page`),
               ...orphans.map((i) => `${i.id} prints but is filed ${i.status || 'nothing'}`)];
const judged = images.filter((i) => i.status === 'placed' || CLAIMS_OFF_PAGE.has(String(i.status || '')));
check('every image filed as placed is on a page, and the reverse', wrong.length === 0,
  wrong.length ? wrong.slice(0, 5).join('; ') + (wrong.length > 5 ? ` … and ${wrong.length - 5} more` : '')
               : `${judged.filter(onPage).length} on the page, ${judged.length - judged.filter(onPage).length} held back, `
                 + `${images.length - judged.length} generated records silent on placement`);

/* Do the frames this book is still waiting on actually resolve?

   Twenty-two records in the manifest describe a photograph in full — subject,
   essay, the slot it was made for — and carry `filename: "—"`, because the file
   is not in the repository yet. Each one names where it lives, and that path is
   the ONLY way back to the frame: the thumbnail is not here, the id is ours not
   the camera's, and the description is prose. Lose the path and the record
   describes a picture nobody can find.

   Every one of them was stale. The libraries were reorganised into
   `~/Desktop/photo libraries/` on 23 Aug 2026 and all 23 recorded paths still
   pointed at `~/Desktop/photo library 2/…` — the Montserrat switchbacks, the
   organ en chamade, the Sagrada magic square, the Granada street flow, the
   Fátima pigeon. Every file was still there under the new location, so nothing
   was lost, but nothing said so either, and the same move had already broken
   five scripts at once (see scripts/lib/library.py). Worse is already true one
   level up: `~/Desktop/Photos from iphoto`, the source cited by photo-selection
   01 through 04 and by five PLACED photographs, no longer exists at all.

   A NOTE, NEVER A PASS OR A FAIL, and that is the honest shape. These paths are
   outside the repository and on one particular Desktop; CI has no libraries and
   neither does a fresh clone, so a check that failed there would be failing on
   the absence of somebody's hard drive. It reports only when a library is
   actually present, which is exactly when the answer means anything. */
const libRefs = images.flatMap((i) =>
  [...String(i.spread || '').matchAll(/`(~\/Desktop\/[^`]+)`/g)].map((m) => ({ id: i.id, p: m[1] })));
const home = process.env.HOME || '';
if (libRefs.length) {
  const abs = (p) => p.replace('~', home);
  const anyLibrary = fs.existsSync(`${home}/Desktop/photo libraries`);
  if (!anyLibrary) {
    note('archive paths', `${libRefs.length} recorded, not checked — no photo library on this machine`);
  } else {
    const gone = libRefs.filter((r) => !fs.existsSync(abs(r.p)));
    if (gone.length) {
      note('archive paths', `${gone.length} of ${libRefs.length} recorded frames no longer resolve — `
        + `${gone.slice(0, 3).map((r) => r.id).join(', ')}${gone.length > 3 ? '…' : ''}. `
        + 'The path is the only way back to an unplaced frame.');
    } else {
      note('archive paths', `all ${libRefs.length} recorded frames still resolve on this machine`);
    }
  }
}

/* The numbered captions run 1, 2, 3 … in page order, under one word.

   The book printed Figure 2 through Figure 7 and, on an earlier page than any of
   them, a single "Plate 3". No Figure 1. No Plate 1 or 2. The first numbered
   thing a reader met was Figure 2, and the only Plate in the book was the third
   one.

   Nothing had been cut. Git history has never contained a Figure 1 or a Plate 1:
   the sequence simply started at 2, and one caption of the seven was called a
   Plate. All seven sit on the same spread type — `image-essay` — so the two words
   were labelling identical layouts, and "Plate" was not marking a distinction.

   FIXED WITH ONE LABEL, which is why it is worth recording. In page order the
   folios run 30, 48, 60, 78, 92, 110, 122, and six of the seven were already
   numbered 2 through 7 correctly. Renaming the odd one out — Plate 3 on folio
   30 — to Figure 1 completed the sequence without touching anything else.

   SAFE TO RENUMBER because nothing points at these numbers: no line of body
   prose in any of the eight essays contains a cross-reference, checked before
   the change. They are apparatus, not navigation. If a "see Figure 4" is ever
   written, this check stops being sufficient and the reference needs one too.

   THE DIAGRAMS ARE NOT PART OF THIS SEQUENCE and must not be folded into it.
   They are labelled `Figure <essay>.1` — Figure 02.1 is the diagram in essay
   two, not the second figure in the book — which is a different scheme doing a
   different job. The pattern below requires a period followed by a space, so
   "Figure 02.1" is not matched. */
const capNums = [];
for (const seg of html.split(/(?=<section class="page)/).slice(1)) {
  const flat = seg.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
  for (const m of flat.matchAll(/\b(Figure|Plate|Table)\s+(\d+)\.\s/g)) {
    capNums.push({ word: m[1], n: Number(m[2]) });
  }
}
const words = new Set(capNums.map((c) => c.word));
const inOrder = capNums.every((c, i) => c.n === i + 1);
const capOk = capNums.length === 0 || (inOrder && words.size === 1);
check('numbered captions run 1, 2, 3 … under one word', capOk,
  capOk ? `${capNums.length} captions, ${[...words][0] || 'none'} 1–${capNums.length}, in page order`
        : `${capNums.map((c) => `${c.word} ${c.n}`).join(', ')} — ${words.size > 1
            ? `${words.size} different words` : 'not a complete sequence from 1'}`);

/* Nothing is marked up two different ways.

   `Physarum polycephalum` printed four times in `<em>` and once in `<i>`. Both
   render italic, so the page looked correct and always would have; the
   difference lived in the markup and in what a screen reader does with it, which
   is stress the emphasised one and read the other flat. The same species name,
   in the same essay, announced two ways.

   It was not a decision. It was a mechanism: body prose is markdown, so `*x*`
   becomes `<em>`, while a margin note lives in YAML where markdown is not
   processed, so somebody typed `<i>` to get the italic they needed. Two routes
   to the same italic, and nothing compared them.

   Generalised deliberately. Checking "taxonomic names all use one element" would
   catch this instance and nothing else. The real rule is that a book should not
   set the same phrase two ways, whatever the phrase and whichever tags, and that
   is what is measured: every run inside em/i/b/strong, grouped by its text.

   WHAT THIS DOES NOT COVER: the same phrase marked up in one place and left
   plain in another. That is usually correct — the first mention of a term is
   often italicised and later ones are not — so flagging it would be noise. */
const marked = [...html.matchAll(/<(em|i|b|strong)>([^<]{2,80})<\/\1>/g)];
const byPhrase = new Map();
for (const m of marked) {
  const text = m[2].trim();
  if (!byPhrase.has(text)) byPhrase.set(text, new Set());
  byPhrase.get(text).add(m[1]);
}
const twoWays = [...byPhrase].filter(([, tags]) => tags.size > 1);
check('nothing is marked up two different ways', twoWays.length === 0,
  twoWays.length
    ? twoWays.map(([t, tags]) => `"${t.slice(0, 40)}" as ${[...tags].join(' and ')}`).join('; ')
    : `${byPhrase.size} marked-up phrases, each set one way`);

/* Can the type be read off the ground it prints on?

   Two legibility failures went into this book on 23 Aug 2026 and no check could
   see either: the back-cover foot printed over the busiest corner of a drawing,
   and the pull quote closing "The Beauty of Systems Nobody Designed" printed
   paper-cream ON CREAM at 1.07:1 — a full page of display type nobody could
   read. Same root both times: a rule assuming a background it cannot see.

   `scripts/contrast.mjs` shoots each page twice, once as printed and once with
   the type hidden, so the second shot is the true ground under every run of
   type — photographs, scrims and all. Computed style cannot do this: asked for
   its background, the quote over the Año Viejo fire reports paper-on-paper,
   1.00:1, on a page that is in fact legible at 16.4:1. A check built that way
   would have cried wolf on the good page and stayed silent on the ruined one. */
let contrast = { available: false };
try {
  contrast = JSON.parse(execFileSync('node', [P('scripts/contrast.mjs'), '--json'],
    { encoding: 'utf8', maxBuffer: 1 << 24, stdio: ['ignore', 'pipe', 'ignore'] }));
} catch { /* no browser here — reported, never silently passed */ }
if (!contrast.available) {
  note('contrast', `${contrast.reason || 'not checked'} — run \`npm run contrast\``);
} else {
  const dim = contrast.findings || [];
  check('every run of type is legible on its own ground', dim.length === 0,
    dim.length
      ? `${dim.length}: ${dim.slice(0, 3).map((f) => `${f.cr.toFixed(2)}:1 .${f.cls}`).join(', ')} — run \`npm run contrast\``
      : `${contrast.measured} runs measured, worst ${contrast.worst ? contrast.worst.cr.toFixed(1) : '—'}:1`);
}

/* Nothing printed may point at where something sits on the page.

   These pages are COMPOSED, not flowed — every one is written to fit its slot —
   and the book has been re-paced hard: spreads were cut to reach the 130-page
   ceiling, a record was withdrawn on 23 Aug 2026 and a plate took its verso,
   two material breaks went entirely. Any sentence that says "the photograph
   opposite" or "overleaf" is a claim about a layout that has already moved
   several times and will move again.

   It holds today: swept across everything the book prints, there are zero.
   That is worth keeping rather than rediscovering, because the sentence that
   breaks it will be written months from now by someone describing a spread
   that is true at the time.

   THE LIST IS DELIBERATELY NARROW. "above", "below" and "opposite" on their own
   are ordinary English and the book uses all three innocently — a flock "not
   controlled from above", a plane passing "above the roof", anxiety producing
   "the opposite in me". Matching those would cry wolf four times on a clean
   book, and a check that cries wolf gets switched off. Only phrases that can
   ONLY mean the page are here. */
const LAYOUT_REF = /\b(overleaf|on the facing page|the facing page|on the next page|the previous page|see page \d+|pictured opposite|shown opposite|photograph opposite|the plate opposite|top of this page|bottom of this page)\b/gi;
const layoutRefs = [...text.matchAll(LAYOUT_REF)].map((m) => m[0]);
check('nothing printed points at where it sits on the page', layoutRefs.length === 0,
  layoutRefs.length
    ? `${layoutRefs.length}: ${[...new Set(layoutRefs)].join(', ')} — composed pages move`
    : 'no page in this book describes its own furniture');

/* Is the spreads PDF on the public site the current book?

   `public/download/while-were-here-spreads.pdf` is committed to this repository
   and published by GitHub Pages, which makes it the one deliverable that can go
   stale WITHOUT ANYONE REBUILDING IT — every other file in dist/ is local until
   someone chooses to send it. A push after a copy change ships whatever spread
   PDF happens to be committed, and it is the version most people will actually
   read. Measured against the newest source, for the same reason pdfcheck is:
   the workflow rebuilds the reader PDF last, so deliverable-to-deliverable
   comparison flags a correct build as behind. */
let spreads = { ok: null };
try {
  const outp = execFileSync(P('.venv/bin/python'), [P('scripts/spreads.py'), '--check'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  spreads = { ok: outp.includes('✓'), detail: outp.trim().split('\n').filter(Boolean) };
} catch { /* no venv or no pymupdf — reported, never silently passed */ }
if (spreads.ok === null) {
  note('spreads PDF', 'not checked — run `npm run spreads:check`');
} else {
  check('the published spreads PDF is the current book', spreads.ok,
    spreads.ok ? '68 spreads, newer than every source'
      : 'out of date — run `npm run spreads`, it is committed and ships on push');
}

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
console.log('    · a printer — Saal was ruled out on price; content/plan/printer-brief.md goes to three or four');
console.log('    · paper caliper — book.config.js still holds a placeholder; it comes from whoever prints it');
console.log('    · a press PDF must come from a run that printed "PRESS: bleed + crop marks"');
console.log('    · consent from everyone identifiable, if this is ever sold');
console.log('');
if (failed) console.log(`  ${failed} check(s) failed.\n`);
if (strict && failed) process.exit(1);
