/* Does any page's copy run past the page? — the one pre-press check that
 * cannot be answered by reading the built HTML.
 *
 *   npm run overflow            report, always exits 0
 *   npm run overflow -- --strict  exit 1 if anything overflows
 *   npm run overflow -- --json    machine-readable, for verify.mjs
 *
 * Pages in this book are COMPOSED, not flowed: every page is written to fit its
 * slot, and nothing reflows to rescue a paragraph that grew by a line. So the
 * failure mode is silent — the copy is simply past the trim, and the first time
 * anyone finds out is on paper. `verify.mjs` reported this check as "not
 * checkable here" for exactly that reason, which was honest and useless.
 *
 * The rule lives in src/scripts/preview.js and is deliberately NOT duplicated
 * here. That file exposes `window.book.check()` for automated proofing; this
 * script drives it and reads the result. Two copies of an overflow rule would
 * drift, and the copy that drifts is always the one nobody is looking at.
 *
 * Zoom is forced to 1 before measuring. The preview fits the stage to the
 * window with `zoom`, and a scaled box rounds its scrollHeight differently from
 * an unscaled one — enough to move a two-pixel threshold either way.
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
  say('No build/preview.html. Run `npm run build` first.');
  process.exit(strict ? 1 : 0);
}

// Playwright's own Chromium, fetched the first time `npm run pdf` runs. Absent
// in CI, which is the whole reason this is a separate script from verify.
const exe = [`${process.env.HOME}/Library/Caches/ms-playwright`]
  .flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d) : [])
    .filter((n) => n.startsWith('chromium-'))
    .map((n) => path.join(d, n, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium')))
  .find((p) => fs.existsSync(p));

if (!exe && !process.env.CHROME) {
  if (asJson) console.log(JSON.stringify({ available: false }));
  else {
    say('No Chromium found, so overflow was NOT checked.');
    say('Run `npm run pdf` once to let Playwright fetch one, or set CHROME=/path/to/chrome.');
  }
  process.exit(strict ? 1 : 0);
}

// The charset is NOT optional here. Without it Chromium falls back to
// windows-1252 for a served document, and every curly quote, em dash and
// middle dot in this book comes back as mojibake — in shot PNGs used to judge
// typography, and in the page labels this reports. The file is UTF-8; say so.
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

const report = await page.evaluate(() => {
  const stage = document.querySelector('.stage');
  if (stage) stage.style.zoom = 1;
  window.book.check();

  // px per mm, from the page box itself rather than from a constant, so this
  // stays right if the trim in book.config.js ever changes.
  const trimMm = parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue('--trim-w')) || 300;
  const any = document.querySelector('.page');
  const perMm = any ? any.getBoundingClientRect().width / trimMm : 1;
  const mm = (px) => Math.round((px / perMm) * 10) / 10;

  return Array.from(document.querySelectorAll('.page.has-overflow')).map((p) => {
    const pr = p.getBoundingClientRect();
    const by = [];
    p.querySelectorAll('.page__block, .prose, .plate__bottom').forEach((b) => {
      const over = b.scrollHeight - b.clientHeight;
      if (over > 2) by.push({ what: b.className.split(' ')[0], mm: mm(over), how: 'taller than its box' });
    });
    p.querySelectorAll('.page__block > *').forEach((c) => {
      const cr = c.getBoundingClientRect();
      if (cr.width < 1 && cr.height < 1) return;
      if (cr.bottom > pr.bottom + 1) by.push({ what: c.className.split(' ')[0] || c.tagName.toLowerCase(), mm: mm(cr.bottom - pr.bottom), how: 'past the foot of the page' });
      if (cr.top < pr.top - 1) by.push({ what: c.className.split(' ')[0] || c.tagName.toLowerCase(), mm: mm(pr.top - cr.top), how: 'above the head of the page' });
    });
    return {
      folio: p.dataset.folio || p.dataset.label || '—',
      side: p.dataset.side || '',
      spread: p.dataset.spread || '',
      by,
    };
  });
});

const pages = await page.locator('.page').count();
await browser.close();
server.close();

if (asJson) {
  console.log(JSON.stringify({ available: true, pages, overflowing: report }));
  process.exit(strict && report.length ? 1 : 0);
}

if (!report.length) {
  say(`\n  ✓ copy overflow                                  ${pages} pages measured in a browser, none overflowing\n`);
  process.exit(0);
}

say(`\n  ⚠ ${report.length} of ${pages} page(s) overflow:\n`);
for (const r of report) {
  say(`    folio ${r.folio}  ${r.side}  ${r.spread}`);
  const seen = new Set();
  for (const b of r.by) {
    const key = `${b.what}${b.how}`;
    if (seen.has(key)) continue;
    seen.add(key);
    say(`        .${b.what} — ${b.mm} mm ${b.how}`);
  }
}
say('\n  Pages here are composed, not flowed. Nothing reflows to fix this: cut the');
say('  copy, or change the slot. Open build/preview.html to see it.\n');
process.exit(strict ? 1 : 0);
