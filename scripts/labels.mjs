/* Does anything cross a diagram's own labels?
 *
 *   npm run labels             report
 *   npm run labels -- --json   for verify.mjs
 *
 * The book's figures are SVGs with hand-placed <text>. Twice now a label has
 * been printed with a line drawn through it — Figure 02.1 had the Admitted ring
 * running between the B and the E of REMEMBERED, and `walking` had its rust
 * curve caption laid across the word `correction`. Both were invisible at
 * thumbnail size, obvious at 4x, and caught only because somebody happened to
 * enlarge that corner.
 *
 * The method needs no geometry. Render the page twice — once as it is, once
 * with every <text> hidden — and look inside each label's box in the SECOND
 * render. Whatever ink is there is ink that will print underneath the words.
 * Curved paths, dashes, stipple and rings all get caught the same way, without
 * anyone computing a bounding box for a bezier.
 */
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const build = path.join(process.cwd(), 'build');
const say = (...a) => { if (!asJson) console.log(...a); };

const CACHES = [`${process.env.HOME}/Library/Caches/ms-playwright`, `${process.env.HOME}/.cache/ms-playwright`];
const SYSTEM = ['/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const exe = process.env.CHROME || [
  ...CACHES.flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d) : [])
    .filter((n) => n.startsWith('chromium-'))
    .flatMap((n) => [path.join(d, n, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
                     path.join(d, n, 'chrome-linux', 'chrome')])),
  ...SYSTEM,
].find((p) => fs.existsSync(p));
if (!exe) { if (asJson) console.log(JSON.stringify({ available: false })); else say('No browser — labels not checked.'); process.exit(0); }

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  const f = path.join(build, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
    res.end(d);
  });
});
await new Promise((r) => server.listen(0, r));
const port = server.address().port;

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1500, height: 1100 }, deviceScaleFactor: 2 });
await page.goto(`http://localhost:${port}/book.html`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(500);

/* Per-figure, never the whole book. A full-page shot of 132 pages at 300 mm
   exhausts Chromium's tile memory and the renderer dies — measured. Each
   fieldnote SVG is small, so shoot the element itself, twice. */
const figures = await page.$$('svg.fieldnote');
const findings = [];
let boxes = 0;
for (const fig of figures) {
  const meta = await fig.evaluate((svg) => {
    const r = svg.getBoundingClientRect();
    const labels = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBoundingClientRect();
      return { text: (t.textContent || '').trim().slice(0, 40),
               x: b.x - r.x, y: b.y - r.y, w: b.width, h: b.height };
    }).filter((l) => l.w > 3 && l.h > 3);
    return { name: (svg.getAttribute('aria-label') || 'figure').slice(0, 46), labels, figW: r.width };
  });
  if (!meta.labels.length) continue;
  boxes += meta.labels.length;
  const setHide = (hide) => fig.evaluate((svg, h) => {
    svg.querySelectorAll('text').forEach((t) => { t.style.visibility = h ? 'hidden' : ''; });
  }, hide);
  await setHide(true);
  const bare = await fig.screenshot({ type: 'png' });
  await setHide(false);
  fs.writeFileSync('/tmp/.labels-bare.png', bare);
  findings.push({ name: meta.name, labels: meta.labels, bare: '/tmp/.labels-bare.png' });
  /* measure immediately, one figure at a time, so the buffer is never stale */
  const out = JSON.parse(execSync(`./.venv/bin/python scripts/label_ink.py /tmp/.labels-bare.png '${JSON.stringify(meta.labels).replace(/'/g, "")}' ${meta.figW}`).toString());
  /* Text-on-text is invisible to the render method, because that method hides
     ALL text to see what is underneath. `walking` failed exactly this way — its
     curve caption lay across the word `correction`, both of them text. So the
     boxes are also compared with each other. */
  const L = meta.labels;
  for (let m = 0; m < L.length; m++) {
    for (let n = m + 1; n < L.length; n++) {
      const a2 = L[m], b2 = L[n];
      const ox = Math.min(a2.x + a2.w, b2.x + b2.w) - Math.max(a2.x, b2.x);
      const oy = Math.min(a2.y + a2.h, b2.y + b2.h) - Math.max(a2.y, b2.y);
      if (ox > 1 && oy > 1) out.push({ text: `${a2.text}" over "${b2.text}`, pct: Math.round(100 * ox * oy / (a2.w * a2.h)), axis: 'label-on-label' });
    }
  }
  findings[findings.length - 1].hits = out;
}
await browser.close(); server.close();

const bad = findings.flatMap((f) => (f.hits || []).map((h) => ({ figure: f.name, ...h })));
if (asJson) { console.log(JSON.stringify({ available: true, boxes, collisions: bad })); process.exit(0); }
if (!bad.length) { say(`\n  ✓ diagram labels                                 ${boxes} labels across ${findings.length} figure(s), nothing drawn through any of them\n`); process.exit(0); }
say(`\n  ⚠ ${bad.length} label(s) obstructed:\n`);
for (const b of bad) say(b.axis === 'label-on-label'
  ? `    "${b.text}"  in ${b.figure}  — labels overlap by ${b.pct}% of a box`
  : `    "${b.text}"  in ${b.figure}  — a stroke runs ${b.axis} it, ${b.pct}% of the box`);
say('');
process.exit(0);
