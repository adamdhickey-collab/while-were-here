/* Effective print resolution for every image, measured in the composed book.
 *
 *   npm run dpi              the bands, and everything under 150
 *   npm run dpi -- --all     every image, worst first
 *   npm run dpi -- --json    for other tools
 *
 * Not computed from the files. The number that matters is the one reaching
 * paper, which depends on the box the image is rendered into and on how much
 * of the file `object-fit: cover` throws away. content/plan/resolution-audit.md
 * was written by hand and said to reproduce it by measuring `img` boxes against
 * a 300 mm `.page`; this does exactly that, so the audit can be re-run instead
 * of re-typed.
 */
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const all = args.includes('--all');
const asJson = args.includes('--json');
const build = path.join(process.cwd(), 'build');

const CACHES = [`${process.env.HOME}/Library/Caches/ms-playwright`, `${process.env.HOME}/.cache/ms-playwright`];
const SYSTEM = ['/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const exe = process.env.CHROME || [
  ...CACHES.flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d) : [])
    .filter((n) => n.startsWith('chromium-'))
    .flatMap((n) => [path.join(d, n, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
                     path.join(d, n, 'chrome-linux', 'chrome')])),
  ...SYSTEM,
].find((p) => fs.existsSync(p));
if (!exe) { console.error('No browser found. Run `npm run pdf` once, or set CHROME.'); process.exit(1); }

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
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

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto(`http://localhost:${port}/preview.html`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(600);

const rows = await page.evaluate(() => {
  const stage = document.querySelector('.stage');
  if (stage) stage.style.zoom = 1;
  const trimMm = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--trim-w')) || 300;
  const anyPage = document.querySelector('.page');
  const perMm = anyPage.getBoundingClientRect().width / trimMm;
  const out = [];
  for (const img of document.querySelectorAll('.page img')) {
    const r = img.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const boxWmm = r.width / perMm, boxHmm = r.height / perMm;
    const nw = img.naturalWidth, nh = img.naturalHeight;
    if (!nw || !nh) continue;
    /* object-fit: cover scales the file so the SHORTER side of the box is
       filled, and crops the rest — so the pixels-per-mm the paper gets is set
       by whichever axis the scale is driven by. contain fills the longer. */
    const fit = getComputedStyle(img).objectFit || 'fill';
    const sx = boxWmm ? nw / boxWmm : 0, sy = boxHmm ? nh / boxHmm : 0;
    const perMmPx = fit === 'contain' ? Math.min(sx, sy) : Math.min(sx, sy);
    out.push({
      file: (img.getAttribute('src') || '').split('/').pop(),
      box: `${boxWmm.toFixed(0)}×${boxHmm.toFixed(0)}mm`,
      natural: `${nw}×${nh}`,
      fit,
      dpi: Math.round(perMmPx * 25.4),
    });
  }
  return out;
});
await browser.close(); server.close();

const seen = new Map();
for (const r of rows) if (!seen.has(r.file) || seen.get(r.file).dpi > r.dpi) seen.set(r.file, r);
const uniq = [...seen.values()].sort((a, b) => a.dpi - b.dpi);

if (asJson) { console.log(JSON.stringify(uniq, null, 2)); process.exit(0); }

const band = (d) => d < 120 ? 'under 120' : d < 150 ? '120–149' : d < 200 ? '150–199' : d < 300 ? '200–299' : '300 +';
const counts = {};
for (const r of uniq) counts[band(r.dpi)] = (counts[band(r.dpi)] || 0) + 1;
console.log(`\n  ${uniq.length} unique images, measured in the composed book\n`);
for (const k of ['under 120', '120–149', '150–199', '200–299', '300 +'])
  if (counts[k]) console.log(`    ${k.padEnd(10)} ${String(counts[k]).padStart(3)}`);
const show = all ? uniq : uniq.filter((r) => r.dpi < 150);
console.log(`\n  ${all ? 'every image' : 'everything under 150 dpi'}, worst first:\n`);
for (const r of show)
  console.log(`   ${String(r.dpi).padStart(5)}  ${r.file.padEnd(38)} ${r.box.padEnd(12)} ${r.natural}`);
console.log('');
