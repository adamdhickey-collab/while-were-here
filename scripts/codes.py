#!/usr/bin/env python3
"""Does anything printed in this book scan?

    ./.venv/bin/python scripts/codes.py            report
    ./.venv/bin/python scripts/codes.py --json     machine-readable, for verify.mjs

THE RULE IT ENFORCES is the book's own, written on the field-note spread between
Parts II and III: this book prints no scannable codes and no personal data it
does not mean to. The spread is the most personal paragraph in the book and it
is about a real collar with a real code that really resolves to a page with the
dog's photograph on it.

WHY IT IS A CHECK AND NOT A ONE-OFF. Today both tag plates are GENERATED, and
the square they draw has no finder patterns — the three corner squares every QR
needs. It cannot resolve because it is not a QR code at all. That is safety by
accident. [shot-list.md](../content/plan/shot-list.md) item 0b schedules the
replacement of both plates with photographs of the ACTUAL TAG, whose code does
resolve, and the whole instruction is "shoot the code at an angle, or turned, or
soft". A rule enforced by the photographer's memory on the day is not enforced.

THE POSITIVE CONTROL IS THE POINT OF THIS FILE.

A scanner that reports "nothing decoded" is indistinguishable from a scanner
that is broken, and this session has already found six checks that were looking
at the wrong thing and had never once failed. So every run first encodes a known
string, decodes it back, and REFUSES TO REPORT A RESULT if that round trip
fails. A green line here means "a decoder that provably works could not read
anything on these pages" rather than "something ran".

That distinction is not theoretical. The first attempt at this used a real
photograph of a real QR code from the archive as its control, and the control
did not decode — so the negative result on the tag plates was worth nothing and
had to be thrown away. The synthetic control also fails at 1x, where a 29 px
symbol is too few pixels per module: scale is part of the test, not a detail.

WHAT IT SCANS. Every image the built book actually places, resampled up to a
few absolute working widths and finally binarised, which is roughly what a phone
does. Upscaling matters because the printed page is far larger than the file: a
code too small to read on screen can still be read off a 300 mm board.

Results are cached in `.cache/codes.json` against each file's name, size and
mtime. A cold run over 94 plates is about 85 seconds and a warm one is
instantaneous, which is the difference between a check that runs and a check
that gets skipped. Replace an image and only that image is rescanned.
"""
import argparse
import json
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CONTROL = "WHILE-WE-ARE-HERE-CONTROL-12345"


def detector():
    try:
        import cv2
    except ImportError:
        return None, None, 'opencv is not installed — run `npm run venv`'
    return cv2, cv2.QRCodeDetector(), None


def control_passes(cv2, det):
    """Encode a known string, decode it back. Returns (ok, detail)."""
    try:
        img = cv2.QRCodeEncoder_create().encode(CONTROL)
    except Exception as e:
        return False, f'could not encode a control symbol: {e}'
    for scale in (4, 8):
        a = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_NEAREST)
        try:
            if det.detectAndDecode(a)[0] == CONTROL:
                return True, f'control symbol encoded and read back at {scale}x'
        except Exception:
            pass
    return False, 'a known-good QR code did not decode — the scanner cannot be trusted'


def scan(cv2, det, path):
    """Return the decoded payload, or None.

       BOUNDED, not blind. The first version upscaled every image 4x, 8x and 16x
       with LANCZOS and ran Otsu at each — 94 plates took minutes, which is a
       check nobody will run. A QR needs roughly five pixels per module to
       decode, so what matters is the WORKING WIDTH, not the multiplier: a
       1000 px file and a 4000 px file do not need the same factor. This walks a
       few absolute widths instead, uses BILINEAR (the detector does not care
       about resampling quality, only about module size), and binarises only at
       the widest pass."""
    im = Image.open(path).convert('L')
    w, h = im.size
    for width in (2000, 5000, 9000):
        if width < w:
            continue
        scale = width / w
        a = np.asarray(im.resize((int(w * scale), int(h * scale)), Image.BILINEAR))
        try:
            data = det.detectAndDecode(a)[0]
        except Exception:
            data = ''
        if data:
            return data
    # one hard-binarised pass at the widest size, which is roughly what a phone does
    scale = min(9000 / w, 6)
    a = np.asarray(im.resize((int(w * scale), int(h * scale)), Image.BILINEAR))
    try:
        a = cv2.threshold(a, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        data = det.detectAndDecode(a)[0]
    except Exception:
        data = ''
    return data or None


def cache_load():
    p = ROOT / '.cache' / 'codes.json'
    try:
        return json.loads(p.read_text())
    except Exception:
        return {}


def cache_save(c):
    p = ROOT / '.cache' / 'codes.json'
    p.parent.mkdir(exist_ok=True)
    p.write_text(json.dumps(c))


def key(path):
    st = path.stat()
    return f'{path.name}:{st.st_size}:{int(st.st_mtime)}'


ap = argparse.ArgumentParser()
ap.add_argument('--json', action='store_true')
a = ap.parse_args()

cv2, det, why = detector()
if cv2 is None:
    if a.json:
        print(json.dumps({'available': False, 'reason': why}))
    else:
        print(f'  · codes not checked — {why}')
    sys.exit(0)

ok, detail = control_passes(cv2, det)
if not ok:
    if a.json:
        print(json.dumps({'available': False, 'reason': detail}))
    else:
        print(f'  ✗ {detail}')
    sys.exit(1 if not a.json else 0)

book = (ROOT / 'build' / 'book.html').read_text(encoding='utf-8')
placed = sorted(set(re.findall(r'src="images/[^"]*/([^/"]+)"', book)))
cache = cache_load()
hits, scanned, fresh = [], 0, 0
for name in placed:
    found = list((ROOT / 'public' / 'images').rglob(name))
    if not found:
        continue
    scanned += 1
    k = key(found[0])
    if k in cache:
        data = cache[k]
    else:
        data = scan(cv2, det, found[0])
        cache[k] = data
        fresh += 1
    if data:
        # never echo the payload — it is the thing the rule exists to keep off the page
        hits.append({'image': name, 'chars': len(data)})
cache_save(cache)

if a.json:
    print(json.dumps({'available': True, 'scanned': scanned, 'hits': hits,
                      'control': detail, 'rescanned': fresh}))
else:
    print(f'  control: {detail}')
    if hits:
        print(f'  ✗ {len(hits)} placed image(s) carry a code that DECODES:')
        for h in hits:
            print(f'      {h["image"]} — {h["chars"]} characters (payload deliberately not printed)')
        print('\n  The book prints no scannable codes. Reshoot at an angle, turned, or soft.')
    else:
        print(f'  ✓ nothing scannable on any of {scanned} placed images ({fresh} newly scanned)')
