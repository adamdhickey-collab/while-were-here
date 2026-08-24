#!/usr/bin/env python3
"""Cut the 130-page interior out of the 132-page press PDF.

    ./.venv/bin/python scripts/interior.py

WHY A SCRIPT. Printer intake asks for one of two shapes: a single file with the
covers as pages 1 and 132, or the interior alone with the cover built on the
printer's own wrap template. Both are ready, and the interior is DERIVED — it is
the press file with its first and last pages removed and nothing else touched.

It was cut by hand the first time. That is a drift source with a check watching
it: `pdfcheck` reports the interior's age along with the other deliverables, so
every content change makes it stale and every rebuild needs somebody to remember
an unwritten command. A derived file with no derivation is a file that will one
day go to a printer three revisions behind the book.

WHAT IT REFUSES TO DO. It will not cut pages 1 and 132 because they are pages 1
and 132. It reads them and requires the first to carry the book's title and
subtitle and the last to carry the back-cover line from content/book.json. If
the sequence in book.json ever changes so the covers are not the outer pages,
this stops rather than quietly shipping an interior with a cover bound into it
and a page of prose missing from the end.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRESS = ROOT / 'dist' / 'while-were-here-press.pdf'
OUT = ROOT / 'dist' / 'while-were-here-interior.pdf'

try:
    import fitz
except ImportError:
    print('  · interior not cut — pymupdf is not installed')
    sys.exit(0)

if not PRESS.exists():
    print(f'  ✗ {PRESS.name} does not exist. Run `npm run pdf:press` first.')
    sys.exit(1)

book = json.loads((ROOT / 'content' / 'book.json').read_text(encoding='utf-8'))
doc = fitz.open(PRESS)

# Vivliostyle letterspaces the cover type, so "WHILE WE'RE HERE" comes back as
# "W H I L E  W E ' R E  H E R E". Compare on letters alone, in order, and the
# tracking stops mattering.
letters = lambda s: ''.join(c for c in s.lower() if c.isalnum())
first, last = letters(doc[0].get_text()), letters(doc[-1].get_text())
want_first = letters(book['title']) + letters(book['subtitle'])
want_last = letters(book['backCoverLine'])

if doc.page_count != 132:
    print(f'  ✗ press PDF has {doc.page_count} pages, expected 132 — not cutting blind')
    sys.exit(1)
if want_first not in first:
    print('  ✗ page 1 does not carry the title and subtitle — it is not the front cover')
    sys.exit(1)
if want_last not in last:
    print('  ✗ page 132 does not carry the back-cover line — it is not the back cover')
    sys.exit(1)

doc.select(range(1, doc.page_count - 1))
n = doc.page_count
doc.save(OUT, garbage=4, deflate=True)
doc.close()
print(f'  ✓ {OUT.name} — {n} interior pages, covers verified by their own text and removed')
