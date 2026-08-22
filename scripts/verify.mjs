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
  check('nothing is drawn through a diagram label', c.length === 0,
    c.length ? c.map((x) => `"${x.text}"`).join(', ')
             : `${lbl.boxes} labels checked, all clear`);
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
