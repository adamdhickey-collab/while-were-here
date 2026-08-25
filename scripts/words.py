#!/usr/bin/env python3
"""How long is each essay, actually?

    npm run words

WHY THIS IS A COMMAND AND NOT A COMMENT. Six of the eight essays carried a
`<!-- body word count: NNNN -->` line at the foot of the file. Two of the six
were wrong on 24 Aug 2026 — The Strange Privilege said 1,115 against a real 992,
a drift of 123 words, and Systems Nobody Designed was out by 27 — and the other
two essays had never had one at all.

A hand-typed number that restates something derivable will drift, and this one
did more than sit there being wrong: a plan for the condensed edition quoted the
recorded figures, computed its compression rate from them, and published the
wrong rate. The same fault as an image record claiming to be `placed` when it is
on no page. Derive it or check it; do not type it.
"""
import re
from pathlib import Path

ESSAYS = Path(__file__).resolve().parent.parent / 'content' / 'essays'


def body_words(text):
    """Prose only: after the frontmatter, with block comments stripped."""
    parts = text.split('\n---\n', 1)
    body = parts[1].split('---', 1)[-1] if len(parts) > 1 else text
    body = re.sub(r'<!--.*?-->', '', body, flags=re.S)
    return len([w for w in body.split() if re.search(r'[A-Za-z]', w)])


rows = []
for f in sorted(ESSAYS.glob('*.md')):
    t = f.read_text(encoding='utf-8')
    title = re.search(r'^title:\s*(.+)$', t, re.M)
    rows.append(((title.group(1) if title else f.stem), body_words(t)))

total = sum(n for _, n in rows)
width = max(len(t) for t, _ in rows)
for t, n in sorted(rows, key=lambda r: -r[1]):
    print(f"  {t:<{width}}  {n:>5}")
print(f"  {'':<{width}}  {'-' * 5}")
print(f"  {'TOTAL':<{width}}  {total:>5} words across {len(rows)} essays")
print(f"\n  The eight essays occupy 106 pages, so this book runs "
      f"{total / 106:.0f} prose-words per essay page.")
