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
    file and a mismatch is reported rather than silently accepted. That is the
    structural guard: a wrong file of the right name cannot pass twice.

  · These originals carry EXIF orientation, which the Facebook archive did not
    because Facebook bakes rotation in and strips the tag. Dimensions here are
    reported AFTER `exif_transpose`, so a portrait frame reports as portrait.
    Anything that crops these files must transpose first or it will place the
    picture on its side.
"""
import argparse
import re
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent

# Page sizes the book actually uses, for the dpi columns. See book.config.js.
SLOTS = {'full bleed 300 mm': 300.0, 'band 236 mm': 236.0, 'inset 92 mm': 92.0}

FRAME = re.compile(r'\*\*([A-Za-z0-9_][A-Za-z0-9_ ]*\d[A-Za-z0-9_ ]*)\*\*\s*·')
EXTS = ('.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG', '.tif', '.tiff', '.TIF')


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
        w, h = ImageOps.exif_transpose(Image.open(p)).size
        want = stated_dims(doc_text, stem)
        if want and sorted(want) != sorted((w, h)):
            suspect.append((stem, want, (w, h), p.name))
            continue
        found.append((stem, section, p, w, h))

    where = ' + '.join(str(d) for d in libs)
    total = sum(1 for d in libs for _ in d.iterdir())
    print(f"\n  {doc.name} names {len(frames)} frames · {len(found)} found")
    print(f"  searched {where} ({total} files)\n")
    if found:
        head = ' '.join(f"{k.split()[0]:>11}" for k in SLOTS)
        print(f"  {'frame':<15}{'pixels':>12}   {head}   section")
        for stem, section, p, w, h in found:
            dpis = ' '.join(f"{min(w, h) / (mm / 25.4):>11.0f}" for mm in SLOTS.values())
            print(f"  {stem:<15}{w}×{h:<6}   {dpis}   {section[:34]}")
        print("\n  dpi columns use the SHORT edge — the honest number for a square crop.")
    if suspect:
        print(f"\n  ⚠ WRONG FILE under the right name — {len(suspect)}:")
        for stem, want, got, name in suspect:
            print(f"    {stem:<15} document says {want[0]}×{want[1]}, {name} is {got[0]}×{got[1]}")
        print("    Not counted as found. Check before trusting either.")
    if missing:
        print(f"\n  not exported yet — {len(missing)}:")
        for i in range(0, len(missing), 5):
            print('   ', '  '.join(f"{s:<14}" for s, _ in missing[i:i + 5]))
    print()


if __name__ == '__main__':
    main()
