#!/usr/bin/env python3
"""Reconcile a photo-selection document against an exported library folder.

    ./.venv/bin/python scripts/selection.py [--doc content/plan/photo-selection-04.md]
                                            [--lib DIR ...]

`--lib` may be given more than once, and defaults to every `~/Desktop/photo
library*` folder that exists. A Photos export that dies partway has to be
finished into a SECOND folder rather than re-run into the first: exporting again
over existing files makes Photos rename the collisions to `IMG_1234 2.jpg`, and
that duplicate-suffix naming is what made an earlier version of this script
match a photograph of a cat to a carved magic square.

`photo-selection-04.md` names 41 frames from Adam's iPhoto library, each with a
role, a stage and an argument for why it belongs. Three of them are in the book.
The rest were stranded when the library stayed on the old laptop — see the note
at the foot of that document.

This script answers the only question that matters while an export is running:
**which of the named frames exist yet, at what size, and is that size good
enough for the slot the document asked for.** Run it again as the export grows.

Two details that will bite anyone who skips them:

  · The document writes some frames as `IMG_2946 2` — the space-2 suffix Photos
    adds when two distinct photographs want the same filename. It is NOT an
    alias for the base name. The first version of this script fell back to
    `IMG_2946` when `IMG_2946 2` was absent and cheerfully reported two frames
    as present, at confident dpi; both were wrong. `IMG_2946` is a cat asleep
    under a tarp, not a magic square carved into the Sagrada Família. Only the
    exact spelling and an underscore variant are accepted now.

  · Where the document states a frame's dimensions, they are checked against the
    file and a mismatch is reported rather than silently accepted. This is not
    fussiness. iPhone restarts its IMG_#### counter, so this library holds
    several distinct photographs under one name: `IMG_1638` on disk is a night
    street parade with a brass band, while the document's `IMG_1638` is the
    Alcobaça nave. The dimension check caught that one and two others.

    It is a guard, not a proof — two photographs can share a name AND a shape.
    Open every frame and read it against the document's one-line description
    before placing it.

  · These originals carry EXIF orientation, which the Facebook archive did not
    because Facebook bakes rotation in and strips the tag. Dimensions here are
    reported as DISPLAYED — `shape()` reads orientation tag 274 and swaps the
    axes itself rather than decoding the file, which is the same answer
    `exif_transpose` gives and thousands of times cheaper over a whole library —
    so a portrait frame reports as portrait.
    Anything that crops these files must transpose first or it will place the
    picture on its side.

    There are now three behaviours across the sources this reads, so transpose
    unconditionally rather than by folder: unmodified originals defer rotation
    to the tag; the Facebook archive bakes it in and strips the tag; the edited
    export bakes it in and writes the tag as 1. `exif_transpose` is correct for
    all three. Deciding by which folder a file came from is not.

  · The edited export is PNG and keeps its EXIF, so capture dates come out of
    the file rather than out of an album's HTML. A frame placed from that folder
    should record `capturedSource` as the photograph's own EXIF.
"""
import argparse
import re
from pathlib import Path

from PIL import Image, ImageOps  # noqa: F401  (ImageOps kept for callers)

# HEIC is more than half this library and Pillow cannot open it unaided. Without
# this the reconciler silently skipped 14,110 of 23,912 stills and reported
# frames as "not exported yet" that were sitting on the disk — a false negative
# is the one answer this script must never give, because it sends someone away
# to wait for an export that already finished.
try:
    import pillow_heif
    pillow_heif.register_heif_opener()
    HEIC = True
except ImportError:                                   # pragma: no cover
    HEIC = False

# Orientation values 5-8 mean the stored pixels are rotated a quarter turn, so
# the displayed shape is the transpose. Reading the tag is cheap; decoding the
# whole image to ask exif_transpose is not, and this runs over thousands of files.
SIDEWAYS = {5, 6, 7, 8}

# Above this, a shape is a camera model rather than a fingerprint.
CANDIDATE_CAP = 12


def shape(path: Path):
    """Displayed (width, height) without decoding pixels."""
    with Image.open(path) as im:
        w, h = im.size
        try:
            o = (im.getexif() or {}).get(274, 1)
        except Exception:
            o = 1
    return (h, w) if o in SIDEWAYS else (w, h)

ROOT = Path(__file__).resolve().parent.parent

# Page sizes the book actually uses, for the dpi columns. See book.config.js.
SLOTS = {'full bleed 300 mm': 300.0, 'band 236 mm': 236.0, 'inset 92 mm': 92.0}

FRAME = re.compile(r'\*\*([A-Za-z0-9_][A-Za-z0-9_ ]*\d[A-Za-z0-9_ ]*)\*\*\s*·')
EXTS = ('.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG', '.tif', '.tiff', '.TIF',
        '.heic', '.HEIC', '.HEIF', '.heif')


def named(doc: Path):
    """Every frame the document names, in document order, with its section."""
    out, section = [], ''
    for line in doc.read_text(encoding='utf-8').splitlines():
        if line.startswith('### '):
            section = line[4:].strip()
        for m in FRAME.finditer(line):
            for part in re.split(r'\s*/\s*', m.group(1)):
                part = part.strip()
                if re.match(r'^(IMG|P1?0|DSC|DSCF)', part):
                    out.append((part, section))
    seen = set()
    return [(n, s) for n, s in out if not (n in seen or seen.add(n))]


def find(stem: str, libs):
    """The document's exact spelling, or the same name with the space as an
    underscore. NEVER the stripped base: `IMG_2946 2` and `IMG_2946` are two
    different photographs, and treating them as one put a cat where a carved
    magic square was supposed to go."""
    for lib in libs:
        for cand in (stem, stem.replace(' ', '_')):
            for ext in EXTS:
                p = lib / (cand + ext)
                if p.exists():
                    return p
    return None


# "**IMG_2946 2** · 2268 × 4032" — the document states dimensions for most frames.
DIMS = re.compile(r'(\d{3,5})\s*[×x]\s*(\d{3,5})')


def stated_dims(doc_text: str, stem: str):
    """The dimensions the document claims for a frame, if it states any."""
    for line in doc_text.splitlines():
        if f'**{stem}**' in line or f'**{stem} /' in line or f'/ {stem}**' in line:
            m = DIMS.search(line)
            if m:
                return int(m.group(1)), int(m.group(2))
    return None


def crop_verdict(want, got):
    """Could `got` (the file on disk) be the uncropped parent of `want` (the
    shape the document names)?

    photo-selection-04 concluded that its frames were cropped to 16:9 in Photos
    and that an unmodified-original export therefore cannot match them by
    dimension. Once HEIC was readable the arithmetic made that concrete:
    `IMG_0936` wants 4032 x 2268 and the file is 4032 x 3024 — the same width,
    a taller frame. That is exactly a 16:9 crop that kept the full width.
    `IMG_0831` wants 3213 x 5712 against a file of 4284 x 5712: same height,
    and 3213 is 3/4 of 4284.

    So a mismatch is not automatically a wrong file. Three verdicts:

      'crop'      the wanted shape fits inside the file AND shares an edge with
                  it — the signature of a Photos crop. Same photograph.
      'inside'    fits, but shares no edge. Possible, weaker; a hand crop.
      'different' does not fit at all. A different photograph under the same
                  filename, which this library is full of.
    """
    W, H = want
    w, h = got
    if W <= w and H <= h:
        return 'crop' if (W == w or H == h) else 'inside'
    return 'different'


def parent_shape(want):
    """The 4:3 frame a 16:9 shape was most likely cropped out of.

    An unmodified-original export contains no 16:9 stills at all, so telling
    someone "no file of that shape exported yet" for a 5712 x 3213 frame sends
    them away to wait for a file this export mode cannot produce. What they
    should be looking for is its uncropped parent: the same long edge, the short
    edge restored to 3/4 of it.
    """
    W, H = want
    if abs(W / H - 16 / 9) < 0.02:
        return (W, round(W * 3 / 4))
    if abs(H / W - 16 / 9) < 0.02:
        return (round(H * 3 / 4), H)
    return None


def index(libs):
    """Every still in the libraries, keyed by displayed shape."""
    by = {}
    for lib in libs:
        for f in sorted(lib.iterdir()):
            if f.suffix not in EXTS:
                continue
            try:
                by.setdefault(shape(f), []).append(f)
            except Exception:
                pass
    return by


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--doc', default='content/plan/photo-selection-04.md')
    ap.add_argument('--lib', action='append', default=None)
    a = ap.parse_args()

    doc = ROOT / a.doc
    libs = ([Path(x).expanduser() for x in a.lib] if a.lib
            else sorted(Path.home().glob('Desktop/photo library*')))
    libs = [d for d in libs if d.is_dir()]
    if not libs:
        raise SystemExit("✗ no library folder found (looked for ~/Desktop/photo library*)")

    frames = named(doc)
    doc_text = doc.read_text(encoding='utf-8')
    found, missing, suspect = [], [], []
    for stem, section in frames:
        p = find(stem, libs)
        if not p:
            missing.append((stem, section))
            continue
        w, h = shape(p)
        want = stated_dims(doc_text, stem)
        if want and sorted(want) != sorted((w, h)):
            suspect.append((stem, want, (w, h), p.name, 'shape'))
            continue
        # Orientation is not cosmetic. A portrait and a landscape frame off the
        # same sensor are different photographs, and comparing sorted dimensions
        # hid that: IMG_5483 is described as 3024×4032, the file is 4032×3024,
        # and it is a garden bed rather than an artisan at a bench. Flag rather
        # than reject, because a stray EXIF tag can also transpose a right file.
        if want and tuple(want) != (w, h):
            suspect.append((stem, want, (w, h), p.name, 'turned'))
            continue
        found.append((stem, section, p, w, h))

    where = ' + '.join(str(d) for d in libs)
    total = sum(1 for d in libs for _ in d.iterdir())
    # Two kinds of found. A frame matched at its stated dimensions is here as
    # the document describes it. A frame whose UNCROPPED PARENT is on disk is
    # also here — with more pixels than the document asked for — and reporting
    # only the first number told the reader eight fewer frames were available
    # than actually were.
    resolved_crops = [x for x in suspect
                      if x[4] == 'shape' and crop_verdict(x[1], x[2]) == 'crop']
    n_found = len(found) + len(resolved_crops)
    extra = f" ({len(found)} at the stated size, {len(resolved_crops)} as uncropped originals)" \
        if resolved_crops else ""
    print(f"\n  {doc.name} names {len(frames)} frames · {n_found} found{extra}")
    print(f"  searched {where} ({total} files)\n")
    if found:
        head = ' '.join(f"{k.split()[0]:>11}" for k in SLOTS)
        print(f"  {'frame':<15}{'pixels':>12}   {head}   section")
        for stem, section, p, w, h in found:
            dpis = ' '.join(f"{min(w, h) / (mm / 25.4):>11.0f}" for mm in SLOTS.values())
            print(f"  {stem:<15}{w}×{h:<6}   {dpis}   {section[:34]}")
        print("\n  dpi columns use the SHORT edge — the honest number for a square crop.")
    if suspect:
        crops   = [x for x in suspect if x[4] == 'shape' and crop_verdict(x[1], x[2]) == 'crop']
        inside  = [x for x in suspect if x[4] == 'shape' and crop_verdict(x[1], x[2]) == 'inside']
        differs = [x for x in suspect if x[4] == 'shape' and crop_verdict(x[1], x[2]) == 'different']
        turned  = [x for x in suspect if x[4] != 'shape']

        if crops:
            print(f"\n  ✓ THE UNCROPPED ORIGINAL IS HERE — {len(crops)}:")
            print("    The document's shape fits inside the file and shares an edge with it:")
            print("    a Photos crop, same photograph, more pixels than the document asked for.")
            for stem, want, got, name, _ in crops:
                print(f"    {stem:<15} doc {want[0]}×{want[1]}  ·  {name} is {got[0]}×{got[1]}"
                      f"   ({got[0]*got[1]/(want[0]*want[1]):.2f}x the area)")
            print("    Still open each one: a shape is a filter, not a proof.")

        if inside:
            print(f"\n  ? MIGHT BE A CROP — {len(inside)}:")
            print("    Fits inside the file but shares no edge, so it is a weaker signal.")
            for stem, want, got, name, _ in inside:
                print(f"    {stem:<15} doc {want[0]}×{want[1]}, {name} is {got[0]}×{got[1]}")

        if differs or turned:
            print(f"\n  ⚠ DOES NOT MATCH the document — {len(differs) + len(turned)}:")
            for stem, want, got, name, why in differs + turned:
                note = ('the wanted shape does not fit inside the file — a different photograph'
                        if why == 'shape' else 'same shape, TURNED — verify by eye')
                print(f"    {stem:<15} doc {want[0]}×{want[1]}, {name} is {got[0]}×{got[1]}  ({note})")
            print("    None counted as found.")
    # Name matching cannot be relied on here: the frames this document wants are
    # mostly the duplicates, and a fresh export disambiguates them differently.
    # So for anything unresolved, offer every file of exactly the stated shape.
    unresolved = [(s, sec) for s, sec in missing]
    # A frame whose uncropped original is on disk is resolved, not unresolved —
    # listing it again under "candidates by stated shape" would send someone
    # looking for a file they have already been handed.
    unresolved += [(s, '') for s, _, _, _, _ in suspect
                   if (s, ) not in [(c[0],) for c in
                       [x for x in suspect if x[4] == 'shape' and crop_verdict(x[1], x[2]) == 'crop']]]
    if unresolved:
        by = index(libs)
        print(f"\n  candidates by stated shape — open these and read them against"
              f" the document's description:")
        for stem, _ in unresolved:
            want = stated_dims(doc_text, stem)
            if not want:
                print(f"    {stem:<15} (document states no dimensions)")
                continue
            hits = by.get(tuple(want), []) + ([] if want[0] == want[1] else by.get((want[1], want[0]), []))
            hits = [h for h in hits if h.stem != stem]
            # A shape shared by hundreds of files identifies nothing. 3264×2448
            # and 4000×3000 are simply "the old iPhone" and "the Panasonic", and
            # printing a thousand names is worse than printing none.
            if not hits:
                par = parent_shape(want)
                kin = (by.get(par, []) if par else [])
                if par and kin:
                    print(f"    {stem:<15} {want[0]}×{want[1]}  →  a 16:9 crop; no original has this shape."
                          f" Look for its uncropped parent at {par[0]}×{par[1]}"
                          f" — {len(kin)} file(s) of that shape are here")
                elif par:
                    print(f"    {stem:<15} {want[0]}×{want[1]}  →  a 16:9 crop; an originals export"
                          f" will never hold this shape. Its parent would be {par[0]}×{par[1]},"
                          f" and none is exported yet either")
                else:
                    print(f"    {stem:<15} {want[0]}×{want[1]}  →  no file of that shape exported yet")
            elif len(hits) <= CANDIDATE_CAP:
                print(f"    {stem:<15} {want[0]}×{want[1]}  →  {', '.join(h.name for h in hits)}")
            else:
                print(f"    {stem:<15} {want[0]}×{want[1]}  →  {len(hits)} files share this shape;"
                      f" too common to identify by it")
    if missing:
        print(f"\n  not exported yet — {len(missing)}:")
        for i in range(0, len(missing), 5):
            print('   ', '  '.join(f"{s:<14}" for s, _ in missing[i:i + 5]))
    print()


if __name__ == '__main__':
    main()
