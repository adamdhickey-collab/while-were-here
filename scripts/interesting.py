#!/usr/bin/env python3
"""Rank archive frames by whether they are worth LOOKING at, and drop the paperwork.

    ./.venv/bin/python scripts/interesting.py <name> --city Minneapolis --top 36
    ./.venv/bin/python scripts/interesting.py <name> --year 2024 --top 36 --skip 36

WHY THIS EXISTS. The first sweep of the home archive filtered on `edited` on the
assumption that it marked frames Adam had chosen. It does not — it marks what
has been processed. A 36-frame sample of 3,296 "edited" Minneapolis frames came
back as a flight itinerary, a bank deposit slip, a handwritten ledger, a car
odometer, a clothing label, an empty room and a lightbulb box. Sampling at
random from a phone library mostly returns the thing a phone is mostly used
for, which is remembering paperwork.

TWO JOBS, AND THE SECOND ONE IS NOT OPTIONAL.

1. RANK by how much photograph is in the frame: edge energy plus tonal range.
   This knows nothing about what a good picture is. It knows the difference
   between a scene and a sheet of paper, which is the difference that was
   wasting the looking.

2. REJECT documents and screenshots BEFORE they are ever drawn. That sample put
   a passport with a name and number, an airline itinerary, a bank deposit slip
   and an email carrying somebody's phone number on screen. This is a personal
   archive full of ordinary private life. content/plan/personal-data.md already
   governs what the BOOK may print; nothing governed what a contact sheet may
   surface, and the sheet is where a frame first gets seen.

   Paperwork is dropped on two signals, either one being enough:
     · a bimodal histogram piled at both ends       — ink on white
     · many adjacent rows nearly identical          — ruled forms, tables, UI
   Coarse on purpose. A missed document costs one thumbnail; a wrongly dropped
   photograph costs nothing, because this only ever shows the top of a ranking
   of thousands.

IT READS THE THUMBNAIL CACHE AND DECODES NOTHING. The first two versions
decoded every HEIC in the selection through a multiprocessing Pool, and both
died: macOS starts children with `spawn`, so each worker re-imported this file,
re-ran the argparse block, and exited on argparse's own SystemExit while the
parent waited on results that were never coming. Measured at 0.0% CPU across
every process — a deadlock, not slow work.

A `__main__` guard fixes that bug, and the bug was still the wrong thing to fix:
`.cache/archive-index.npz` ALREADY holds a 96 px grayscale thumbnail for 23,250
frames, built once for scripts/findsource.py. Scoring reads that array. No
decode, no Pool, no guard needed, and the whole library ranks in about a second.

The cost of using it is colour: the cache is grayscale, so Hasler and
Susstrunk's colourfulness is not available and the pale-and-desaturated
document signal went with it. Both were worth losing. Keeping colour meant
decoding, decoding meant the Pool, and the Pool is what never returned.

TWO LIMITS TO KNOW. The cache skips frames whose short edge is under 2,200 px,
so about 1,200 of 24,418 are not rankable here. And the score cannot see
meaning, which is most of what makes a frame worth printing: the Año Viejo
effigy slumped in the dirt would rank modestly and it closes the book. This says
where to look. It does not decide anything.
"""
import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except Exception:
    pass

# ABOVE ITS FIRST USE, and it was not. `from lib.library import originals` sat
# 64 lines below `ORIGINALS = originals()`, so this script raised NameError on
# import and had not run since the libraries were reorganised on 23 Aug 2026 —
# the same fault, in the same place, that broke sheet.py. A resolver import
# belongs with the other imports; putting it beside the code that uses argparse
# results reads tidy and executes in the wrong order.
sys.path.insert(0, str(Path(__file__).resolve().parent))
from lib.library import originals, edits          # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
ORIGINALS = originals()
PLACES = ROOT / '.cache' / 'places.json'
CACHE = ROOT / '.cache' / 'archive-index.npz'
SCRATCH = Path('/private/tmp/claude-501/-Users-adamhickey-Projects-while-were-here'
               '/a381c33c-d901-4a4e-a0a0-f30f201837c5/scratchpad')


def looks_like_paper(t):
    """Document / screenshot / form, from a grayscale thumbnail."""
    h, _ = np.histogram(t, bins=32, range=(0, 255))
    h = h / max(h.sum(), 1)
    if h[:3].sum() + h[-4:].sum() > 0.55 and h[6:26].sum() < 0.24:
        return True
    rows = t.astype(np.float32).mean(axis=1)
    if len(rows) > 2 and (np.abs(np.diff(rows)) < 1.2).mean() > 0.72:
        return True
    return False


def score(t):
    """Higher is more photograph. Returns None for paperwork.

       WHAT THIS SCORE IS AND IS NOT. Edge energy plus tonal range. It finds
       TEXTURE, and texture is not interest. Measured over the whole library the
       top six are hoarfrost, a striped shirt at ranks two, three and five, and
       bare branches on sky. The shirt is the proof: the score is reading
       stripes. It still earns its place, because the frost at rank one is a
       real find nobody would have reached by scrolling 24,418 frames.

       A `--spare` mode was added and REMOVED on 23 Aug 2026. The reasoning was
       that this book's photographs are nearly all one subject on a plain ground
       in strong light — the dog in a rectangle of light, the effigy against a
       wall, the walkers against white plaster — so inverting the edge term
       should surface them. It does not. `2*tonal - 0.85*edges` over the home
       archive returns pocket shots, dark blurry indoor snaps and a finger over
       the lens, because "few edges and a wide tonal range" is a precise
       description of OUT OF FOCUS AND BADLY LIT. Restraint and failure look
       identical to a grayscale statistic. Do not re-add it.

       So: the filter below is the part of this script that works. The ranking
       is a way of shuffling the deck, not a judgement — and every sheet still
       has to be looked at."""
    if looks_like_paper(t):
        return None
    g = t.astype(np.float32)
    edges = (np.abs(np.diff(g, axis=0)).mean() + np.abs(np.diff(g, axis=1)).mean()) / 22.0
    tonal = (np.percentile(g, 97) - np.percentile(g, 3)) / 200.0
    return float(edges + tonal)


ap = argparse.ArgumentParser()
ap.add_argument('name')
ap.add_argument('--city', nargs='*', default=[])
ap.add_argument('--country', nargs='*', default=[])
ap.add_argument('--year', nargs='*', default=[])
ap.add_argument('--top', type=int, default=36)
ap.add_argument('--skip', type=int, default=0, help='skip N from the top, to page deeper')
ap.add_argument('--cols', type=int, default=6)
ap.add_argument('--thumb', type=int, default=300)
a = ap.parse_args()

import importlib.util

spec = importlib.util.spec_from_file_location('places', ROOT / 'scripts' / 'places.py')
places = importlib.util.module_from_spec(spec)
spec.loader.exec_module(places)

rows = json.loads(PLACES.read_text())
sel = rows
if a.city or a.country:
    sel = [r for r in sel if r.get('lat')]
    for r in sel:
        r['_city'] = places.nearest_city(r['lat'], r['lon'])
        r['_country'] = places.country(r['lat'], r['lon'])
    if a.city:
        sel = [r for r in sel if r.get('_city') in a.city]
    if a.country:
        sel = [r for r in sel if r.get('_country') in a.country]
if a.year:
    sel = [r for r in sel if (r.get('day') or '')[:4] in a.year]
want = {r['f'] for r in sel}
day = {r['f']: (r.get('day') or '') for r in rows}
print(f"{len(want)} frames selected")

z = np.load(CACHE, allow_pickle=False)
names, data, offs, shapes = z['names'], z['data'], z['offs'], z['shapes']
scored, paper, missing = [], 0, 0
for i, nm in enumerate(names):
    if nm not in want:
        continue
    h, w = shapes[i]
    s = score(data[offs[i]:offs[i + 1]].reshape(h, w))
    if s is None:
        paper += 1
    else:
        scored.append((nm, s))
missing = len(want) - (len(scored) + paper)
scored.sort(key=lambda s: -s[1])
print(f"{paper} rejected as paperwork · {len(scored)} ranked · "
      f"{missing} not in the cache (under 2200 px)")

pick = scored[a.skip:a.skip + a.top]
TH, COLS = a.thumb, a.cols
rowsn = max(1, (len(pick) + COLS - 1) // COLS)
sheet = Image.new('RGB', (COLS * TH, rowsn * TH), (238, 233, 220))
draw = ImageDraw.Draw(sheet)
for i, (nm, sc) in enumerate(pick):
    try:
        im = ImageOps.exif_transpose(Image.open(ORIGINALS / nm))
        im.thumbnail((TH - 10, TH - 30))
        im = im.convert('RGB')
    except Exception:
        continue
    x, y = (i % COLS) * TH, (i // COLS) * TH
    sheet.paste(im, (x + (TH - im.width) // 2, y + 24 + (TH - 30 - im.height) // 2))
    draw.text((x + 6, y + 6), f"{nm[:17]} {day.get(nm, '')} {sc:.2f}", fill=(40, 38, 34))

out = SCRATCH / f'rank-{a.name}.jpg'
sheet.save(out, quality=88)
print(f"drawn {len(pick)} (rank {a.skip + 1}–{a.skip + len(pick)}) -> {out}")
