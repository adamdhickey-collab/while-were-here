/* Can the type actually be read off the page it is printed on?
 *
 *   npm run contrast              report, always exits 0
 *   npm run contrast -- --strict  exit 1 if anything is flagged
 *   npm run contrast -- --json    machine-readable, for verify.mjs
 *
 * WHY. Two legibility failures went into this book on 23 Aug 2026, both from
 * the same root, and neither was visible to any existing check:
 *
 *   1. The back-cover blurb and coda printed over the busiest corner of a
 *      drawing, in colours chosen against bare cream.
 *   2. The pull quote closing "The Beauty of Systems Nobody Designed" printed
 *      in paper cream ON CREAM, at 1.07:1 — a full page of display type nobody
 *      could read. A rule written to lighten type against a dark photograph
 *      fired on a page that had no photograph.
 *
 * Both are the same mistake: A RULE ASSUMING A BACKGROUND IT CANNOT SEE. CSS
 * cannot see what is behind an element, and neither can a person reading the
 * stylesheet. Only the rendered page knows.
 *
 * WHY COMPUTED STYLE IS NOT ENOUGH, measured rather than assumed. Asking the
 * browser for `backgroundColor` reports the element's own background, which for
 * text over a photograph is `transparent` or the page's paper — so the closing
 * quote over the Año Viejo fire came back as paper-on-paper, 1.00:1, on a page
 * that is in fact perfectly legible at 16.4:1. A check built that way would
 * have raised a false alarm on the good page and stayed silent on the ruined
 * one, which is worse than no check.
 *
 * HOW IT WORKS. Two screenshots of each page: one as printed, and one with
 * every measured element hidden with `visibility: hidden` — which removes the
 * glyphs while leaving layout, photographs and scrims exactly where they are.
 * The second shot is therefore the true background under each piece of type.
 * Ink comes from computed style, which is exact and needs no un-antialiasing.
 *
 * The background is sampled as the MEDIAN luminance under the element's box,
 * not the mean: a line crossing a bright window and a dark wall should be
 * judged on the ground most of it sits on, and a mean would split the
 * difference and call it grey.
 *
 * OCCLUSION IS NOT CHECKED HERE, AND WAS TRIED TWICE. Four captions in this
 * book printed their last words underneath the photograph beside them —
 * "Figure 7. The far wall, for under a minute. The roo…" — because the
 * caption's width and the figure's width were two numbers nobody had tied
 * together. Overflow could not see it, since the text never left its box. This
 * check cannot see it either, since the glyphs are not dim, only buried. It was
 * found by reading a page and noticing a word stop in mid-air.
 *
 * Attempt one compared ink counts with the pictures hidden. That collapses
 * whenever the text's own colour IS the page colour: the quote closing the book
 * is paper cream over a photograph of a fire, so with the photograph hidden
 * every pixel in its box matched "ink" and a perfectly legible page reported as
 * buried.
 *
 * Attempt two raised the type with `z-index` and compared against the page as
 * printed, per line so that one line losing its last word would register.
 * Measured against the real fault, reintroduced on purpose: NOT CAUGHT.
 * `z-index` only orders siblings within a stacking context, and the caption and
 * the figure are not in one — lifting the caption inside its own parent does
 * not raise it above the figure at all.
 *
 * Both attempts were removed rather than left in. A check that cannot be shown
 * to catch its own fault is worse than no check, because the green line is
 * read as evidence. If occlusion is worth catching, the honest instrument is
 * geometric — compare each text line's box against the boxes of opaque
 * elements painted after it — not photographic.
 *
 * THRESHOLDS are WCAG's — 4.5:1, and 3:1 for large type (>=18pt, or >=14pt
 * bold). This is print, not a screen, and ink on paper behaves differently from
 * light on glass. They are used anyway because the failures worth catching are
 * nowhere near the line: 1.07:1 is not a borderline call about a threshold, it
 * is a page that did not print its own sentence.
 */
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { PNG } from 'pngjs';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const asJson = args.includes('--json');
const root = process.cwd();
const build = path.join(root, 'build');
const say = (...a) => { if (!asJson) console.log(...a); };

/* Every element that carries type the reader is meant to read. Decorative
   rules, bars and marks are not here — `.quote-mark` is a painted bar, and a
   contrast score for it means nothing. */
const SELECTORS = [
  '.pull-quote', '.closing__line', '.closing__coda', '.statement', '.display',
  '.essay-title', '.deck', '.subhead', '.prose p', '.caption', 'figcaption',
  '.cover__title', '.cover__sub', '.cover__author', '.cover-back__line',
  '.cover-back__blurb', '.cover-back__coda', '.divider__statement',
  '.material-break__line', '.sequence__pull', '.record__source', '.imprint',
].join(', ');

if (!fs.existsSync(path.join(build, 'book.html'))) {
  if (asJson) console.log(JSON.stringify({ available: false, reason: 'no build' }));
  else say('No build/book.html. Run `npm run build` first.');
  process.exit(strict ? 1 : 0);
}

const CACHES = [`${process.env.HOME}/Library/Caches/ms-playwright`,
  `${process.env.HOME}/.cache/ms-playwright`];
const SYSTEM = ['/usr/bin/google-chrome', '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const exe = [
  ...CACHES.flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d) : [])
    .filter((n) => n.startsWith('chromium-'))
    .flatMap((n) => [
      path.join(d, n, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
      path.join(d, n, 'chrome-linux', 'chrome')])),
  ...SYSTEM].find((p) => fs.existsSync(p));

if (!exe && !process.env.CHROME) {
  if (asJson) console.log(JSON.stringify({ available: false, reason: 'no chromium' }));
  else say('No Chromium found, so contrast was NOT checked.');
  process.exit(strict ? 1 : 0);
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2' };
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
const page = await browser.newPage({ viewport: { width: 1400, height: 1400 } });
await page.goto(`http://localhost:${port}/book.html`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(500);

const srgb = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (a, b) => { const [hi, lo] = a > b ? [a, b] : [b, a]; return (hi + 0.05) / (lo + 0.05); };

/* Collect every measurable run of type, with the box it occupies on its page. */
const items = await page.evaluate((sel) => {
  const out = [];
  document.querySelectorAll('.page').forEach((pg, pi) => {
    const pr = pg.getBoundingClientRect();
    pg.querySelectorAll(sel).forEach((el) => {
      const txt = (el.textContent || '').trim();
      if (!txt) return;
      /* Only the element that OWNS the text — otherwise a wrapper is measured
         again for its child's type and every finding is reported twice. */
      if ([...el.children].some((c) => (c.textContent || '').trim() === txt)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
      const size = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight, 10) || 400;
      out.push({
        page: pi, text: txt.slice(0, 46), color: cs.color,
        cls: (el.className || el.tagName).toString().split(' ')[0],
        spread: pg.dataset.spread || '', size, weight,
        /* fractions of the page box, so they survive the screenshot scale */
        x: (r.left - pr.left) / pr.width, y: (r.top - pr.top) / pr.height,
        w: r.width / pr.width, h: r.height / pr.height,
      });
    });
  });
  return out;
}, SELECTORS);

/* Hide the type, keep everything else. `visibility: hidden` and not `display:
   none` on purpose — the boxes must not move, or the coordinates collected
   above would describe a page that no longer exists. */
await page.addStyleTag({ content: `${SELECTORS} { visibility: hidden !important; }` });
await page.waitForTimeout(250);

const pages = await page.$$('.page');
const byPage = new Map();
for (const it of items) (byPage.get(it.page) ?? byPage.set(it.page, []).get(it.page)).push(it);

const findings = [];
let measured = 0;
let worst = null;
for (const [pi, list] of byPage) {
  const buf = await pages[pi].screenshot({ type: 'png' });
  const png = PNG.sync.read(buf);
  for (const it of list) {
    const x0 = Math.max(0, Math.round(it.x * png.width));
    const y0 = Math.max(0, Math.round(it.y * png.height));
    const x1 = Math.min(png.width, Math.round((it.x + it.w) * png.width));
    const y1 = Math.min(png.height, Math.round((it.y + it.h) * png.height));
    const ls = [];
    for (let y = y0; y < y1; y += 2) {
      for (let x = x0; x < x1; x += 2) {
        const i = (png.width * y + x) << 2;
        ls.push(lum(png.data[i], png.data[i + 1], png.data[i + 2]));
      }
    }
    if (!ls.length) continue;
    ls.sort((a, b) => a - b);
    const bg = ls[Math.floor(ls.length / 2)];              // median, not mean
    const [r, g, b] = it.color.match(/\d+(\.\d+)?/g).map(Number);
    const ink = lum(r, g, b);
    const cr = ratio(ink, bg);
    measured += 1;
    const pt = it.size * 0.75;                             // css px -> pt
    const large = pt >= 18 || (pt >= 14 && it.weight >= 700);
    const floor = large ? 3 : 4.5;
    if (!worst || cr < worst.cr) worst = { ...it, cr };
    if (cr < floor) findings.push({ ...it, cr, floor, large });
  }
}

await browser.close();
server.close();

findings.sort((a, b) => a.cr - b.cr);

if (asJson) {
  console.log(JSON.stringify({ available: true, measured, findings, worst }));
  process.exit(0);
}

if (!findings.length) {
  say(`  ✓ every measured run of type is legible on the ground it prints on`);
  say(`    ${measured} runs measured · worst ${worst ? worst.cr.toFixed(1) : '—'}:1`
    + `${worst ? ` (${worst.cls} — "${worst.text.slice(0, 34)}")` : ''}`);
} else {
  say(`\n  ⚠ ${findings.length} run(s) of type below the contrast floor:\n`);
  for (const f of findings) {
    say(`    ${f.cr.toFixed(2)}:1  (floor ${f.floor})  ${f.spread || 'page ' + f.page}`);
    say(`        .${f.cls} at ${(f.size * 0.75).toFixed(1)}pt — "${f.text}"`);
  }
  say('\n  Contrast is measured against the RENDERED page, not the stylesheet —');
  say('  a rule that lightens type for a photograph will fire on a bare page too.');
}
process.exit(strict && findings.length ? 1 : 0);
