/* Render spreads to PNG at trim size, so a layer that is only visible in the
   paginator can be judged without opening one.
 *
 * Built for the grounds. A ground sits under body copy at 8 percent, which
 * means the file you generated and the thing the reader sees are barely the
 * same image: the only honest test is the composed spread. Two treatments have
 * already been pulled at this stage after looking correct as files.
 *
 *   npm run shots            every spread carrying a ground
 *   npm run shots -- --all   every spread in the book
 *   npm run shots -- ground-04-extended-cognition
 */
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = process.cwd();
const build = path.join(root, 'build');
const outDir = path.join(root, 'dist', 'shots');
const args = process.argv.slice(2);
const all = args.includes('--all');
const only = args.filter((a) => !a.startsWith('--'));

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

const exe = process.env.CHROME || [
  `${process.env.HOME}/Library/Caches/ms-playwright`,
].flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d) : [])
  .filter((n) => n.startsWith('chromium-'))
  .map((n) => path.join(d, n, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium')))
  .find((p) => fs.existsSync(p));

if (!exe) {
  console.error('No Chromium found. Run `npm run pdf` once to let Playwright fetch it.');
  process.exit(1);
}

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
await page.goto(`http://localhost:${port}/preview.html`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const targets = await page.evaluate(({ all, only }) => {
  const out = [];
  document.querySelectorAll('.spread').forEach((el, i) => {
    const g = el.querySelector('.ground img');
    const id = g ? g.getAttribute('src').split('/').pop().replace(/\.[a-z]+$/, '') : null;
    const head = el.querySelector('.reading__running .meta, .divider__title, .essay-title');
    if (all || (g && (!only.length || only.includes(id)))) {
      out.push({ i, id, label: (head?.textContent || 'spread').trim().slice(0, 40) });
    }
  });
  return out;
}, { all, only });

/* CLEAR THE DIRECTORY FIRST. It was never cleared, so renders from earlier runs
   sat alongside current ones and looked identical. On 23 Aug 2026 the book went
   from 68 spreads to 61; `spread-068.png` stayed behind, twenty hours stale,
   showing a back cover that had since been replaced — the handwriting face and
   the botanical, both long gone. It was mistaken for the current page.

   The same staleness sent a search for a spread to three wrong pages earlier
   the same day. A render nobody re-made is not evidence, and there is no way to
   tell one from a fresh one by looking. */
fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith('.png')) fs.unlinkSync(path.join(outDir, f));
}
for (const t of targets) {
  const name = `${t.id || `spread-${String(t.i).padStart(3, '0')}`}.png`;
  await page.locator('.spread').nth(t.i).screenshot({ path: path.join(outDir, name) });
  console.log(`  ${name}  ·  ${t.label}`);
}

const flagged = await page.locator('.page.has-overflow').count();
await browser.close();
server.close();

if (!targets.length) {
  console.log('No grounds are rendering yet. A ground renders nothing until its file exists —');
  console.log('drop a PNG into public/images/illustration/ and run `npm run build` first.');
} else {
  console.log(`\n✓ ${targets.length} spread${targets.length === 1 ? '' : 's'} → dist/shots/`);
}
if (flagged) console.log(`⚠ ${flagged} page(s) flagged for copy overflow`);
