#!/usr/bin/env python3
"""Where the photo library actually is, asked rather than assumed.

    from lib.library import originals, edits, folder
    ORIGINALS = originals()

WHY THIS EXISTS. Five scripts each hardcoded `~/Desktop/photo library 2`, and on
23 Aug 2026 the libraries were reorganised into `~/Desktop/photo libraries/` —
so every one of them broke at once. `findsource.py` did not report a moved
library; it opened the first hit unconditionally and died on a FileNotFoundError
deep inside a results loop, which reads like a bug in the matcher rather than a
path that no longer exists.

The libraries also GREW in the same move: `photo library 2` went from 24,418
frames to 32,533. So a stale path and a stale index arrive together, and the
scripts that depend on them need to say so plainly instead of guessing or dying.

Search order, most specific first, so an explicit override always wins:
  1. $BOOK_PHOTO_LIBRARY, if set
  2. ~/Desktop/photo libraries/<name>      (where they live now)
  3. ~/Desktop/<name>                      (where they used to)
  4. any ~/Desktop/**/<name> one level down

`folder()` raises with every path it tried rather than returning None. A script
that carries on with a library it could not find produces empty contact sheets
and zero matches, which look like findings.
"""
import os
from pathlib import Path

HOME = Path.home()


def folder(name, required=True):
    """Resolve one library folder by name, or raise saying where it looked."""
    env = os.environ.get('BOOK_PHOTO_LIBRARY')
    tried = []
    if env:
        p = Path(env)
        cand = p if p.name == name else p / name
        tried.append(cand)
        if cand.is_dir():
            return cand
    for cand in (HOME / 'Desktop' / 'photo libraries' / name,
                 HOME / 'Desktop' / name):
        tried.append(cand)
        if cand.is_dir():
            return cand
    for parent in sorted(HOME.joinpath('Desktop').glob('*/')):
        cand = parent / name
        if cand.is_dir():
            return cand
        tried.append(cand)
    if not required:
        return None
    raise SystemExit(
        f"✗ photo library folder {name!r} not found. Looked in:\n"
        + '\n'.join(f'    {t}' for t in tried[:6])
        + "\n  Set BOOK_PHOTO_LIBRARY to the folder that holds it."
    )


def originals(required=True):
    return folder('photo library 2', required)


def edits(required=True):
    return folder('photo library edits', required)
