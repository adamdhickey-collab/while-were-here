#!/usr/bin/env python3
"""Contact sheets from the places index, for looking at a trip quickly.

    ./.venv/bin/python scripts/sheet.py <name> --city Rome Venice --month 2019-05
    ./.venv/bin/python scripts/sheet.py <name> --country Italy --edited

Reads `.cache/places.json` (built by scripts/places.py) and writes a grid of
thumbnails to the scratch directory.

LOADS FROM THE ORIGINALS, ALWAYS, and that is not an implementation detail. The
first version preferred the file of the same name from `photo library edits`,
keyed on stem alone — and iPhone filenames REPEAT. IMG_0856 exists in 2019 and
again in 2024. The sheet showed Granada's Generalife gardens captioned "Rome
2019-05-27", and a Montserrat viewpoint captioned "Amalfi". The metadata was
right and the picture beside it was a different photograph entirely.

Anything that pairs a frame with its metadata has to key on the actual file the
metadata came from. The edits folder cannot be addressed by name alone.
"""
import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / '.cache' / 'places.json'
ORIGINALS = Path.home() / 'Desktop' / 'photo library 2'
SCRATCH = Path('/private/tmp/claude-501/-Users-adamhickey-Projects-while-were-here'
               '/a381c33c-d901-4a4e-a0a0-f30f201837c5/scratchpad')

ap = argparse.ArgumentParser()
ap.add_argument('name')
ap.add_argument('--city', nargs='*', default=[])
ap.add_argument('--country', nargs='*', default=[])
ap.add_argument('--month', nargs='*', default=[])
ap.add_argument('--edited', action='store_true')
ap.add_argument('--max', type=int, default=30)
ap.add_argument('--cols', type=int, default=6)
ap.add_argument('--thumb', type=int, default=330)
a = ap.parse_args()

import importlib.util
spec = importlib.util.spec_from_file_location('places', ROOT / 'scripts' / 'places.py')
places = importlib.util.module_from_spec(spec)
spec.loader.exec_module(places)

rows = [r for r in json.loads(INDEX.read_text()) if r.get('lat')]
for r in rows:
    r['country'] = places.country(r['lat'], r['lon'])
    r['city'] = places.nearest_city(r['lat'], r['lon'])

sel = rows
if a.country:
    sel = [r for r in sel if r.get('country') in a.country]
if a.city:
    sel = [r for r in sel if r.get('city') in a.city]
if a.month:
    sel = [r for r in sel if (r.get('day') or '')[:7] in a.month]
if a.edited:
    sel = [r for r in sel if r['edited']]
sel.sort(key=lambda r: (r.get('day') or '', r['f']))

if not sel:
    raise SystemExit('nothing matched')

step = max(1, len(sel) // a.max)
pick = sel[::step][:a.max]

TH, COLS = a.thumb, a.cols
rowsn = (len(pick) + COLS - 1) // COLS
sheet = Image.new('RGB', (COLS * TH, rowsn * TH), (238, 233, 220))
draw = ImageDraw.Draw(sheet)
placed = 0
for i, r in enumerate(pick):
    src = ORIGINALS / r['f']
    try:
        im = Image.open(src)
        # EXIF orientation, or half the sheet arrives upside down and gets
        # judged as a bad photograph when it is a bad reader. scripts/selection.py
        # already carries this warning about cropping these files.
        im = ImageOps.exif_transpose(im)
        im.thumbnail((TH - 10, TH - 30))
        im = im.convert('RGB')
    except Exception:
        continue
    x, y = (i % COLS) * TH, (i // COLS) * TH
    sheet.paste(im, (x + (TH - im.width) // 2, y + 24 + (TH - 30 - im.height) // 2))
    label = f"{r['f'][:18]}  {r.get('city') or ''} {(r.get('day') or '')}"
    draw.text((x + 6, y + 6), label, fill=(40, 38, 34))
    placed += 1

out = SCRATCH / f'sheet-{a.name}.jpg'
sheet.save(out, quality=87)
print(f"{len(sel)} matched, {placed} drawn (every {step}) -> {out}")
