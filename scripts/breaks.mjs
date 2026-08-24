/* Where does the type break badly? — the second question that cannot be
 * answered by reading the built HTML.
 *
 *   npm run breaks              report, always exits 0
 *   npm run breaks -- --strict  exit 1 if anything is flagged
 *   npm run breaks -- --json    machine-readable, for verify.mjs
 *
 * `src/styles/typography.css` already asks for the right things — orphans 3,
 * widows 3, `hyphens: auto` with `hyphenate-limit-chars: 8 4 4`, a two-line
 * hyphen limit, `text-wrap: pretty` — and `bindWidows` in the build binds the
 * last word of every paragraph with a non-breaking space. All of that is
 * *configuration*. None of it is *measurement*, and two faults survive a
 * correct configuration:
 *
 *   1. A word hyphenated across the FOOT of a column or page. The reader turns
 *      the leaf holding half a word. No CSS property prevents this — the
 *      hyphen limits count lines within a block, not lines against a boundary
 *      the block cannot see.
 *   2. A hyphen ladder. `-webkit-hyphenate-limit-lines: 2` is a prefixed
 *      property; asking for it is not the same as getting it, and this book is
 *      set in a Chromium that has changed its hyphenation more than once.
 *
 * HOW A HYPHENATED LINE IS FOUND, since the hyphen itself is not in the DOM.
 * Chromium inserts it into the line box as generated content, so no amount of
 * reading `textContent` will show it and no Range contains it. It is not
 * detected by looking for a glyph at all. Instead: map every character to the
 * line box it landed in, then look at each line's last character. If the next
 * character in the source is also a letter — no space between them — then the
 * browser broke a word, which is what a hyphen IS. That test is exact, needs no
 * glyph, and cannot be fooled by a real hyphen in the copy, because a real
 * hyphen is a character and would be the last character rather than absent.
 */
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const asJson = args.includes('--json');
const root = process.cwd();
const build = path.join(root, 'build');
const say = (...a) => { if (!asJson) console.log(...a); };

if (!fs.existsSync(path.join(build, 'preview.html'))) {
  if (asJson) console.log(JSON.stringify({ available: false }));
  else say('No build/preview.html. Run `npm run build` first.');
  process.exit(strict ? 1 : 0);
}

/* Same browser discovery as overflow.mjs, and deliberately the same list: a
   machine that can answer one of these questions can answer both. */
const CACHES = [
  `${process.env.HOME}/Library/Caches/ms-playwright`,
  `${process.env.HOME}/.cache/ms-playwright`,
];
const SYSTEM = [
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium',
  '/usr/bin/chromium-browser', '/snap/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const exe = [
  ...CACHES.flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d) : [])
    .filter((n) => n.startsWith('chromium-'))
    .flatMap((n) => [
      path.join(d, n, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
      path.join(d, n, 'chrome-linux', 'chrome'),
    ])),
  ...SYSTEM,
].find((p) => fs.existsSync(p));

if (!exe && !process.env.CHROME) {
  if (asJson) console.log(JSON.stringify({ available: false }));
  else {
    say('No Chromium found, so line breaks were NOT checked.');
    say('Run `npm run pdf` once to let Playwright fetch one, or set CHROME=/path/to/chrome.');
  }
  process.exit(strict ? 1 : 0);
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2' };

const server = createServer((req, res) => {
  const file = path.join(build, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});
await new Promise((r) => server.listen(0, r));
const port = server.address().port;

const browser = await chromium.launch({ executablePath: process.env.CHROME || exe });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto(`http://localhost:${port}/preview.html`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(400);

const { out: report, tally } = await page.evaluate(() => {
  const stage = document.querySelector('.stage');
  if (stage) stage.style.zoom = 1;

  const LETTER = /\p{L}/u;
  const out = [];
  const tally = { paragraphs: 0, lines: 0, hyphenated: 0 };

  /* Only running copy. Display type, folios, captions on a single line and the
     reproduced records are set to their own rules and are not the subject. */
  const paras = document.querySelectorAll('.prose p, .reading__prose p, p.body');

  for (const p of paras) {
    // Flatten the paragraph's text nodes so a character index maps to a Range.
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let text = '';
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      nodes.push({ node: n, start: text.length });
      text += n.nodeValue;
    }
    if (text.trim().length < 40) continue;

    const at = (i) => {
      // Which text node holds character i, and at what offset.
      for (let k = nodes.length - 1; k >= 0; k--) {
        if (i >= nodes[k].start) return { node: nodes[k].node, off: i - nodes[k].start };
      }
      return null;
    };

    const r = document.createRange();
    let lines = [];      // { top, lastIdx }
    let curTop = null;

    for (let i = 0; i < text.length; i++) {
      if (!LETTER.test(text[i]) && text[i] !== '-') continue;   // cheap: only letters matter
      const pos = at(i);
      if (!pos || pos.off >= pos.node.nodeValue.length) continue;
      r.setStart(pos.node, pos.off);
      r.setEnd(pos.node, pos.off + 1);
      const box = r.getBoundingClientRect();
      if (!box.height) continue;
      const top = Math.round(box.top * 2) / 2;
      if (curTop === null || Math.abs(top - curTop) > 1) {
        lines.push({ top, lastIdx: i });
        curTop = top;
      } else {
        lines[lines.length - 1].lastIdx = i;
      }
    }
    if (lines.length < 2) continue;

    /* A line is hyphenated when the character after its last one is also a
       letter: the browser split a word. The hyphen glyph is never consulted. */
    const hyph = lines.map((L) => {
      const a = text[L.lastIdx];
      const b = text[L.lastIdx + 1];
      return !!(a && b && LETTER.test(a) && LETTER.test(b));
    });

    tally.paragraphs++;
    tally.lines += lines.length;
    tally.hyphenated += hyph.filter(Boolean).length;

    const word = (idx) => {
      let s = idx, e = idx;
      while (s > 0 && LETTER.test(text[s - 1])) s--;
      while (e < text.length - 1 && LETTER.test(text[e + 1])) e++;
      return text.slice(s, e + 1);
    };

    const pg = p.closest('.page');
    const label = {
      folio: pg?.dataset.folio || pg?.dataset.label || '—',
      side: pg?.dataset.side || '',
      spread: pg?.dataset.spread || '',
    };

    // 1. A word broken across the last line of the block.
    const lastLine = lines.length - 1;
    if (hyph[lastLine]) {
      out.push({ ...label, kind: 'split at the foot of a column',
        detail: word(lines[lastLine].lastIdx) });
    }

    /* 2. Hyphen ladders: three or more consecutive broken lines. Reported once
          per ladder, naming every word in it — the fix is always to change one
          of them, so all of them have to be on screen. */
    let run = [];
    const flush = () => {
      if (run.length >= 3) {
        out.push({ ...label, kind: 'hyphen ladder',
          detail: `${run.length} lines in a row: ${run.map((w) => `"${w}"`).join(', ')}` });
      }
      run = [];
    };
    for (let i = 0; i < hyph.length; i++) {
      if (hyph[i]) run.push(word(lines[i].lastIdx));
      else flush();
    }
    flush();
  }
  return { out, tally };
});

/* THE DISPLAY SERIF AT THE WRONG WEIGHT — a third fault a correct
   configuration does not prevent.

   typography.css states the house rule plainly: "the display serif appears at
   900 and at no other weight. Anything that is not black is set in the text
   face." It enforces that with a LIST OF SELECTORS, and a list is only as good
   as the last person to remember it. It has now been forgotten twice — the
   dedication, which read as a different family on the one page everybody
   opens, and `.cover-back__line`, which printed FalutinTitle-Medium on the back
   board while the front board two inches away printed Ultra. Both times the
   rule was written down, both times nothing caught it, and both times it was
   found by eye long after the fact.

   So this stops trusting the list and asks the browser instead: find every
   element that actually renders in the display family and is not at 900. That
   is the rule as stated, measured rather than configured, and it cannot be
   fooled by a selector nobody added. */
const weights = await page.evaluate(() => {
  const disp = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-display').split(',')[0].replace(/["']/g, '').trim().toLowerCase();
  const bad = [];
  for (const el of document.querySelectorAll('.page *')) {
    if (!el.textContent.trim()) continue;
    const cs = getComputedStyle(el);
    const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
    if (fam !== disp) continue;
    /* Only the element that OWNS the text, or every ancestor of a heading is
       reported for the heading's own type. */
    if ([...el.children].some((c) => c.textContent.trim() === el.textContent.trim())) continue;
    if (cs.fontWeight === '900') continue;
    const pg = el.closest('.page');
    bad.push({ weight: cs.fontWeight, cls: el.className || el.tagName.toLowerCase(),
               spread: pg?.dataset.spread || '?', text: el.textContent.trim().slice(0, 46) });
  }
  return bad;
});

/* A DECIDED LINE STACK THAT THE MEASURE OVERRODE — a fourth fault of the same
   family, and the one that reached a printed page.

   Some lines in this book are broken on purpose rather than by width: the
   dedication breaks at a comma, the divider titles stack by phrase. The rule
   they share is stated in index.mjs — "the stack is a decision, not a
   by-product of the measure" — and a decision expressed as `<br>` is only kept
   while every resulting line still fits. Past that the measure re-breaks it,
   silently, wherever the width happens to fall.

   On 24 Aug 2026 the dedication printed:

     For my parents,
     who taught me to look, and for
     Fabiola, who looks with me

   The `<br>` was placed correctly; the second line was 149.8mm of type in a
   128mm measure, so the width picked the other two breaks and put a person's
   name on a different line from the preposition introducing her. The layout
   had been tested against five candidate dedications and passed all five. It
   then got a sixth, longer than any of them, on the page that opens the book.

   Measured by counting rendered line boxes against declared breaks: a decided
   stack is correct only when it renders in exactly `<br>` + 1 lines. Nothing
   here says which break is right — only that the one somebody chose survived. */
const stacks = await page.evaluate(() => {
  const bad = [];
  for (const el of document.querySelectorAll('.dedication__line, .divider__title')) {
    /* Two ways this book declares a stack. The dedication uses <br>; the
       divider titles wrap each phrase in a span set to display:block. Count
       whichever is in use, or one line if neither. */
    const brs = el.querySelectorAll('br').length;
    const blocks = [...el.children]
      .filter((c) => getComputedStyle(c).display === 'block').length;
    const declared = brs ? brs + 1 : (blocks || 1);

    /* Distinct line-box tops, taken one character at a time — the same method
       the hyphenation pass above uses, and for the same reason. Asking a Range
       spanning the whole element for its rects does NOT give line boxes: over
       block-level children it returns a rect per block on top of the per-line
       ones, and the divider titles, whose phrases are spans set to block,
       came back as six lines for three. Characters have exactly one box each. */
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const r = document.createRange();
    const tops = new Set();
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const v = n.nodeValue;
      for (let i = 0; i < v.length; i++) {
        if (!/\S/.test(v[i])) continue;
        r.setStart(n, i);
        r.setEnd(n, i + 1);
        const box = r.getBoundingClientRect();
        if (box.height) tops.add(Math.round(box.top * 2) / 2);
      }
    }
    // Sub-pixel baselines can split one line across two neighbouring tops.
    const sorted = [...tops].sort((a, b) => a - b);
    let rendered = 0, last = -Infinity;
    for (const t of sorted) { if (t - last > 1) { rendered++; last = t; } }

    if (rendered !== declared) {
      bad.push({ cls: el.className, declared, rendered,
                 text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 60) });
    }
  }
  return bad;
});

await browser.close();
server.close();

if (asJson) {
  console.log(JSON.stringify({ available: true, findings: report, tally, weights, stacks }));
  process.exit(0);
}

if (weights.length) {
  say(`\n  ⚠ ${weights.length} element(s) set in the display serif below weight 900:\n`);
  for (const w of weights) {
    say(`    ${w.spread}`);
    say(`        .${w.cls} at ${w.weight} — "${w.text}"`);
  }
  say('\n  typography.css: the display serif appears at 900 and at no other weight.');
  say('  Add the selector to the 900 list there, not to the component stylesheet —');
  say('  cover.css and layouts.css load later and a stray font-weight silently wins.');
} else {
  say(`  ✓ every element in the display serif is at weight 900`);
}

if (stacks.length) {
  say(`\n  ⚠ ${stacks.length} decided line stack(s) re-broken by the measure:\n`);
  for (const s2 of stacks) {
    say(`    .${s2.cls} — declared ${s2.declared} line(s), renders ${s2.rendered}`);
    say(`        "${s2.text}"`);
  }
  say('\n  The <br> was kept; the measure added its own breaks on top of it.');
  say('  Widen the max-width to fit the longest declared line, or shorten the line.');
} else {
  say(`  ✓ every deliberate line break survives the measure`);
}

if (!report.length) {
  say(`  ✓ no word is broken across the foot of a column, and no hyphen ladders`);
  say(`    ${tally.paragraphs} paragraphs · ${tally.lines} lines · `
    + `${tally.hyphenated} hyphenated (${(tally.hyphenated / tally.lines * 100).toFixed(1)}%)`);
} else {
  say(`\n  ⚠ ${report.length} bad break(s) in ${tally.paragraphs} paragraphs / ${tally.lines} lines `
    + `(${tally.hyphenated} hyphenated, ${(tally.hyphenated / tally.lines * 100).toFixed(1)}%):\n`);
  for (const f of report) {
    say(`    folio ${String(f.folio).padStart(3)}  ${f.side.padEnd(6)} ${f.spread}`);
    say(`        ${f.kind} — ${f.detail}`);
  }
  say('\n  Pages here are composed, not flowed. Fix by editing the copy, changing');
  say('  the slot, or setting `hyphens: none` on the block that is misbehaving.');
}

process.exit(strict && (report.length || weights.length) ? 1 : 0);
