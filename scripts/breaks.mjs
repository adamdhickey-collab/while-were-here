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

await browser.close();
server.close();

if (asJson) {
  console.log(JSON.stringify({ available: true, findings: report, tally }));
  process.exit(0);
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

process.exit(strict && report.length ? 1 : 0);
