#!/usr/bin/env python3
"""Does the PDF contain the book? — the last check, on the thing that is delivered.

    npm run pdfcheck              report, exit 0
    npm run pdfcheck -- --strict  exit 1 on any missing text
    npm run pdfcheck -- --json    machine-readable, for verify.mjs

WHY THIS EXISTS. On 22 Aug 2026 the entire sources page — all 28 entries — was
missing from dist/while-were-here.pdf. The printed page carried a hairline rule
with a blank half-page above it and nothing to say why. It had been like that
since the sources page was written.

Every check in this project passed the whole time, and each of them was right:

  · `npm run overflow` measures a browser. The sources fitted their slot.
  · `npm run verify`   reads build/book.html. The sources were in it, 28 of them.
  · `npm run breaks`, `npm run labels` — also the browser.

The PDF is produced by Vivliostyle, not by Chromium's own print path, and it
lays out CSS Grid differently: `grid-template-rows: auto 1fr auto auto` on that
page dropped its first item. Nothing in the project had ever read what came out
of the PDF, so nothing could have caught it.

WHAT IT CHECKS. Every text-bearing element in the built HTML — paragraphs,
headings, captions, list items, quotes — must appear in the PDF's extracted
text. Comparison keeps letters and digits in ANY script and drops everything
else, because the PDF's text layer breaks lines, drops soft hyphens and spaces
glyphs differently from the DOM; what matters is that the words are there at
all, not how they are spaced. "Any script" is load-bearing: the first version
stripped to ASCII and could not have seen a missing CJK glyph, and this book
embeds 27 of them across 11 subsets.

WHAT IT CANNOT SEE. Whether the text is in the right PLACE, the right size, or
the right colour, and whether an image printed. It answers one question — is the
content there — which is the question nobody was asking.
"""
import json
import re
import sys
import unicodedata
import html as H
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / 'dist' / 'while-were-here.pdf'
HTML = ROOT / 'build' / 'book.html'

args = sys.argv[1:]
strict = '--strict' in args
as_json = '--json' in args


def out(payload, lines):
    if as_json:
        print(json.dumps(payload))
    else:
        for line in lines:
            print(line)


if not HTML.exists():
    out({'available': False, 'why': 'no build/book.html'},
        ['No build/book.html. Run `npm run build` first.'])
    sys.exit(1 if strict else 0)

if not PDF.exists():
    out({'available': False, 'why': 'no PDF'},
        ['No dist/while-were-here.pdf, so the delivered file was NOT checked.',
         'Run `npm run pdf` to build one.'])
    sys.exit(1 if strict else 0)

try:
    import fitz  # pymupdf
except ImportError:
    out({'available': False, 'why': 'pymupdf missing'},
        ['pymupdf is not installed, so the PDF was NOT checked.',
         'Install it with `./.venv/bin/pip install pymupdf`.'])
    sys.exit(1 if strict else 0)

doc = fitz.open(PDF)
pdf_text = ' '.join(doc[i].get_text() for i in range(doc.page_count))
def squash(s):
    """Letters and digits in ANY script, normalised.

    The first version was `re.sub(r'[^a-z0-9]', '', s.lower())`, which silently
    deleted every non-ASCII character before comparing — so this check could not
    have seen a missing CJK glyph, and the book embeds 27 of them across 11
    subsets for the reproduced Meta records. It could not have seen a dropped
    accent either. Found by testing the check rather than reading its output,
    which is the only way any of this session's blind checks surfaced.

    NFKC first, so a PDF text layer that emits a decomposed accent still matches
    a composed one in the DOM."""
    return ''.join(c for c in unicodedata.normalize('NFKC', s).lower() if c.isalnum())
haystack = squash(pdf_text)

raw = HTML.read_text(encoding='utf-8')
body = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', raw, flags=re.S)

TAGS = r'p|h1|h2|h3|figcaption|li|blockquote'
chunks = [H.unescape(re.sub(r'<[^>]+>', '', m))
          for m in re.findall(rf'<(?:{TAGS})[^>]*>(.*?)</(?:{TAGS})>', body, re.S)]
chunks = [re.sub(r'\s+', ' ', c).strip() for c in chunks]

# Short strings are folios, page furniture and single words: too common to
# locate meaningfully, and a false match on them would mean nothing either way.
chunks = [c for c in chunks if 30 <= len(c) <= 300]

missing = [c for c in chunks if squash(c) not in haystack]

payload = {
    'available': True,
    'pages': doc.page_count,
    'checked': len(chunks),
    'missing': missing[:40],
    'missingCount': len(missing),
}

if as_json:
    print(json.dumps(payload))
    sys.exit(0)

if not missing:
    print(f'\n  ✓ the PDF contains the book                       '
          f'{len(chunks)} text elements across {doc.page_count} pages, none missing\n')
    sys.exit(0)

print(f'\n  ⚠ {len(missing)} text element(s) in the HTML are NOT in the PDF:\n')
for c in missing[:20]:
    print(f'    {c[:104]}')
if len(missing) > 20:
    print(f'    … and {len(missing) - 20} more')
print('\n  The PDF is rendered by Vivliostyle, not by the browser. Layout that')
print('  works in the preview can still drop content here — CSS Grid did exactly')
print('  that once. Bisect with a one-page harness rather than full PDF builds.\n')
sys.exit(1 if strict else 0)
