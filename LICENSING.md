# Licensing

## Fonts

| Family | Role | Licence | In this repo? |
| --- | --- | --- | --- |
| **Falutin Title** | Display — titles, cover, pull quotes | Plattner Type EULA (purchased) | **No — and it must not be** |
| Fraunces | Display fallback | SIL OFL | Yes, via npm |
| Archivo | Body | SIL OFL | Yes, via npm |
| IBM Plex Mono | Annotations | SIL OFL | Yes, via npm |
| Caveat | Hand | SIL OFL | Yes, via npm |
| Noto Sans JP / KR | The CJK entries in the advertiser record | SIL OFL | **Yes, as files** — `fonts-cjk/` |

The Noto subsets are the one family committed as actual font files rather than
pulled from npm. The two packages are 130 MB and the book uses 131 KB of them,
which every `npm ci` on the Pages runner would otherwise pay for. The OFL permits
redistribution, and requires the licence travel with the fonts: it is at
`fonts-cjk/OFL.txt`, copied there by `npm run fonts:cjk`. This is the opposite of
the Falutin Title situation below, and for the opposite reason — the OFL allows
what the Plattner EULA forbids.

### Falutin Title — what the EULA permits, and what it doesn't

The purchased package contains **desktop OTFs only**. Read against the Plattner
Type EULA v1:

**Permitted, and what this project relies on**

- **Desktop installation** — no limit on users within the licensed organisation.
- **Ebooks and other digital documents** — this is the clause that covers
  embedding the face in the exported PDF. The print path is clear.
- **Vendor use** — the fonts may be given to a printer working on your behalf,
  provided they keep no copies afterwards.
- **Modification for your own use** — which is what the OTF→TTF outline
  conversion below is. Distribution of the modified font is not permitted, and
  this project does not distribute it.

**Prohibited, and what that changes here**

- **Redistribution.** *"You shall not redistribute Font Software … or other
  means that make the raw fonts accessible to third-parties not covered by your
  license."* **This repository is public.** Committing the OTFs — or the
  converted TTF/WOFF2 — would publish them. They are therefore kept in
  `fonts-licensed/`, which is gitignored, and written only into `build/`, which
  is also gitignored.
- **Serving the desktop OTFs from a website.** *"You must use the webfonts
  provided in your package. Linking to the full OpenType Font Software … is
  prohibited."* No webfonts were included in the package. So the GitHub Pages
  preview **cannot** carry Falutin and correctly falls back to Fraunces. If you
  want the hosted preview to show the real face, buy the webfont licence from
  Plattner Type and add those files — do not convert the desktop OTFs for it.
- **Generative AI training.** The EULA expressly prohibits using the font or its
  output to train generative models. Nothing here does that.

**Worth confirming:** a commercial licence is required if the project has any
financial incentive, even indirect. A book intended for sale qualifies. Check
which tier was purchased at checkout.

### Why the fonts get converted

Falutin ships as CFF (PostScript) outlines. Chromium — which Vivliostyle renders
through — degrades a CFF face to **Type 3 glyph procedures** when writing PDF.
Type 3 fonts cannot be subset by prepress tools and some presses reject them
outright. Repacking as WOFF2 does not help; the container is not the problem.

Converting the outlines to TrueType does. `npm run fonts:convert` runs cu2qu at
1/1000 em — the same conversion used to build variable TTFs from PostScript
sources, and visually indistinguishable at any size this book uses. Verified
with `pdffonts`: every face in the exported PDF now embeds as CID TrueType,
subset and unicode-mapped, with zero Type 3.

### Setting this up on another machine

```bash
# 1. copy the purchased package in (never commit it)
mkdir -p fonts-licensed/falutin
cp /path/to/"Falutin Title"/OTF/*.otf fonts-licensed/falutin/

# 2. one-time: create the venv and convert the outlines
npm run fonts:setup

# 3. build as usual
npm run build
```

Without step 1 the book still builds — the display voice falls back to Fraunces
and the build says so. That is exactly what happens on the GitHub Pages runner.

## Imagery

Three assets are sourced so far, all of them the material breaks. They are
composites: Poly Haven PBR scans released CC0 (`rough_linen`, `rusty_metal_04`)
and three Unsplash photographs, relit and rebalanced so that no original scene
remains legible. CC0 asks nothing; the Unsplash License permits commercial use
including print and does not require attribution, and this book credits anyway.
Neither licence covers resale of the source file itself, which is not what a
material break does.

Every archival asset must record `source`, `license` and `credit` in
`content/images.json` at the moment it is downloaded. `npm run credits` builds
the attribution page and flags anything incomplete.
See `content/plan/asset-sources.md` for the licence rules per service — in
particular, Envato's terms for physical products offered for sale are tighter
than Adobe Stock's, which matters for a book.

---

## The book now prints its image credits — 21 Aug 2026

Until today the credits existed only in `content/plan/credits.md`, a repository
file. **The printed book carried no copyright line, no imprint and no
attribution anywhere.** For seven of the eight sourced images that is merely
impolite — Pexels and Unsplash do not require credit. For the eighth it is a
licence breach on distribution:

> `systems-05-physarum-network` — Rob Cruickshank, "Slime mould (P.
> polycephalum)", via Wikimedia Commons, **CC BY 2.0**.

CC BY requires attribution wherever the work is distributed, which includes a
printed book given away or sold.

The imprint now sits at the foot of the title spread's verso — the page that
previously held a single dot. It is **generated from `content/images.json` at
build time** (`L.imprint`, called by `L.titleSpread`), not typed, so it cannot
drift from the manifest. Anything carrying `origin: archive` appears
automatically, with its `credit` and `license` fields.

**What this means for future work:** if you add a sourced image, fill in
`credit`, `source` and `license` on its manifest entry and the printed page
updates itself. `npm run credits` still flags any entry missing them. Do not
hand-edit the imprint into a template.

Still outstanding before any sale, and not a licensing matter but a consent one:
the `consent` fields on `before-time-01-father-portrait`, `before-time-06-thanksgiving`,
`here-07-ceremony` and `pilgrimage-08-plaza-stones`.

### The spreads PDF on the public site — added 24 Aug 2026

`public/download/while-were-here-spreads.pdf` is published by GitHub Pages and
**embeds Falutin Title**. That is deliberate and it is permitted: the EULA's
*"Ebooks and other digital documents"* clause is exactly this case, and the
faces are embedded subset rather than linked. What stays prohibited is the raw
font software — the OTFs and any WOFF2 conversion of them — which is why
`fonts-licensed/` remains gitignored and the HTML preview still falls back to
Fraunces.

So the hosted site now shows the real typeface in the PDF and the substitute in
the HTML, which is not an inconsistency but the licence drawn accurately: a
document may carry the face, a website may not serve it.

The file is rasterised at 110 dpi — 15 MB against the 394 MB vector original,
which is both over GitHub's 100 MB file limit and pointless on a screen.
