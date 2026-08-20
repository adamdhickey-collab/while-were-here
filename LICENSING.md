# Licensing

## Fonts

| Family | Role | Licence | In this repo? |
| --- | --- | --- | --- |
| **Falutin Title** | Display — titles, cover, pull quotes | Plattner Type EULA (purchased) | **No — and it must not be** |
| Fraunces | Display fallback | SIL OFL | Yes, via npm |
| Archivo | Body | SIL OFL | Yes, via npm |
| IBM Plex Mono | Annotations | SIL OFL | Yes, via npm |
| Caveat | Hand | SIL OFL | Yes, via npm |

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
