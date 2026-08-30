# Working in this repository

The deliverable is a **press-ready PDF for a 300 × 300 mm hardcover**, not a
website. HTML, CSS and a little JavaScript are the production system. `README.md`
documents the whole toolchain — the scripts, the print geometry, the spread
types, the type scale. This file is the operating rules that sit around it.

## Git LFS, and the thing that goes wrong without it

`public/images/**` — 124 files, the full-resolution originals — is Git LFS.
**A clone made without `git lfs install` gets 133-byte pointer files instead of
pictures**, and nothing announces it; the files are there, they are just not
images. `git lfs pull` fixes it in place.

What is worth knowing precisely, because it decides what a session can and
cannot do:

| | Needs the LFS originals? |
| --- | --- |
| `npm run build:web`, `npm run verify` | **No.** `BOOK_WEB=1` reads `public/images-web/`, which is committed normally |
| `npm run dev`, `npm run preview` | No, same reason |
| `npm run pdf`, `pdf:press`, `spreads` | **Yes.** Full resolution is the entire point of a press file |

That is why `.github/workflows/pages.yml` checks out without `lfs: true` and is
right to: it builds only the web preview. Do not "fix" it by adding LFS — it
would pull 124 full-resolution originals on every run to build something that
never reads them.

## Git, and what a push to `main` does

`pages.yml` builds the web preview and publishes it on every push to `main`.
**Work on a branch and never push to `main` directly.**

One consequence deserves naming. The published spreads PDF is **committed to the
repository** and ships with that deploy, and neither CI nor `verify --strict`
checks whether it is current — `verify` says so in its own output, `spreads PDF:
not checked`. So a stale one ships silently. `npm run spreads:check` is the
check, it is a manual pre-push step, and it needs the Python venv (`npm run
venv`) rather than just Node.

The Python side does not currently install on Linux at all: `requirements.txt`
lists `osxphotos`, which is macOS-only. That is fine for a toolchain that runs on
the Mac and is the reason none of the Python steps are in CI.

## What CI does and does not cover

```bash
npm run build:web            # compose build/ from content, no browser
npm run verify -- --strict   # what CI runs; exits non-zero on a real fault
```

Both pass on a clone with no LFS content, which is what CI has.

`verify --strict` is deliberately loud about what it is **not** checking, and
that list is not a to-do for a coding session: a printer, the paper caliper,
consent from anyone identifiable, and the opening plate of essay one, whose
drawing is right but whose six text values are baked into a 4000 × 4000 JPEG.
`content/images.json` holds the fix. None of those are code problems and none of
them should be worked around in code.

## Where your session is running, and what changes

| | Sees | Use it for |
| --- | --- | --- |
| **Local** (`claude` on the Mac) | Everything: LFS originals, the Python venv, Ghostscript, the fonts | Anything producing a PDF, and all press work |
| **Remote Control** (`claude --rc`, or `/rc` mid-session) | The same — Claude runs on the Mac; claude.ai and the phone are windows onto it | Steering that work from away |
| **Cloud** (`claude --cloud`, or claude.ai/code) | A fresh clone: **pointer files, not images**, no venv, no Ghostscript | Content, CSS, composition logic, the web build and `verify` — everything that does not need a picture at full resolution |

A cloud session should say plainly that it cannot render a press file rather than
producing one from pointer files, which would succeed and be wrong. `claude
--teleport` pulls a cloud session down to the Mac, branch and history intact,
which is the way to start something in the cloud and finish it where the images
are.

## House style

The comments in this repository record what went wrong once — that `pdf:press`
ran the trimmed proof build behind a press preflight and produced a file with no
bleed, that piping a `vivliostyle` command reports the pipe's status and prints
success while writing nothing. Keep writing them that way: name the failure the
rule prevents, so the next person cannot mistake it for a preference.
