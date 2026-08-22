# While We’re Here

*Small essays about attention, technology, beauty, time, and being alive*
Adam Hickey

A print-first coffee-table book. HTML, CSS and a small amount of JavaScript are
the production system; the deliverable is a press-ready PDF for a 300 × 300 mm
hardcover. It is not a website.

**Status: complete draft, not press-final.** Eight essays laid out across the
full set of spread types, plus covers and front matter — **130 interior pages**,
which is the printer's hard maximum rather than a target. Adding a spread now
means removing one.

Three things stand between this and a press file, and none of them is code:
Saal's real paper caliper, whether Saal wants PDF/X-1a, and consent from anyone
identifiable if the book is ever sold. They live in
[open-questions.md](content/plan/open-questions.md).

---

## Quick start

Install [Git LFS](https://git-lfs.com) **before cloning** — the images are LFS
objects, and a clone made without it gets pointer files instead of pictures.

```bash
git lfs install
npm install
npm run dev
```

Then open <http://localhost:4321/> — a small hub linking the three views.

If you cloned before installing LFS, `git lfs pull` fixes it in place.

| Script | What it does |
| --- | --- |
| `npm run build` | Compose `build/` from content. Fast, no browser. |
| `npm run dev` | Build, watch content, and serve `build/` on port 4321. |
| `npm run preview` | Open the real Vivliostyle paginator on `build/book.html`. |
| `npm run pdf` | Full-resolution PDF → `dist/while-were-here.pdf`. Around 200 MB with real imagery — correct for a printer, unwieldy on a laptop. |
| `npm run pdf:proof` | Review PDF at screen resolution → `dist/while-were-here-proof.pdf`, 90 MB. |
| `npm run pdf:press` | Press PDF → `dist/while-were-here-press.pdf` (bleed + crop marks). **Needs Ghostscript** — `npm run press:check` runs first and says so, because press-ready hangs rather than failing without it. **Check the build line says `PRESS: bleed + crop marks`**: this script once ran the trimmed proof build behind a press-ready preflight, and the file had no bleed at all. |
| `npm run press:check` | Confirm the press preflight can actually run before committing to a long build. |
| `npm run prompts` | Regenerate the full prompt library from the manifest. |
| `npm run brief` | Write a self-contained brief for the assets not yet made. |
| `npm run place` | Put a generated image into the book; bare, it lists what is missing. |
| `npm run derive` | Refresh the screen-resolution derivatives the hosted preview is built from. Run it after placing images. |
| `npm run build:web` | The build the Pages workflow runs: derivatives instead of press masters. |
| `npm run fonts:setup` | One-time: venv + convert the licensed OTFs for press. |
| `npm run fonts:cjk` | Rebuild `fonts-cjk/` when the book gains a character the Latin faces cannot set. |
| `npm run credits` | Rebuild the attribution page from the manifest. |
| `npm run facts` | Check `content/facts.json` and rebuild the sources page. `--strict` fails on anything unverified. |
| `npm run verify` | **The pre-press checks, in one command.** Twelve pass/fail, run against the built pages rather than the sources, plus what it cannot check and says so. `--strict` exits non-zero on any failure, which is what CI uses. |
| `npm run selection` | Reconcile `content/plan/photo-selection-04.md` against the exported photo library — which selected frames exist yet, at what size, and the dpi they would give. |
| `npm run overflow` | Does any page's copy run past the page? Drives the preview's own rule in a headless browser and names the folio and the millimetres. `npm run verify` calls this when a browser is present. |
| `npm run shots` | Render spreads to PNG at trim size. `-- --all` for every spread. |
| `npm run clean` | Remove `build/` and `dist/`. |

`npm run pdf` downloads a Chromium build the first time it runs (~130 MB, via
Playwright). Everything after that is offline.

## The three views

- **`preview.html`** — facing spreads, page shadows, trim / bleed / safe / margin
  / grid / baseline guides, spread navigation, and an overflow detector that
  outlines any page whose copy does not fit. None of this chrome exists in the
  print document; it is a separate file that links one extra stylesheet.
- **`book.html`** — the print document. No preview CSS or JS is linked at all,
  so nothing can leak into the PDF.
- **`cover-wrap.html`** — back | spine | front as one surface, for checking the
  wrap. The spine width shown is provisional.
- **`direction.html`** — the art direction at true trim size: the four acts, the
  spectrum, and the three type voices, built with the book's own page model so
  colour and type are judged at the scale they will print.

---

## Print geometry

**`book.config.js` is the only place print dimensions live.** The build compiles
it into `build/geometry.css`, emitting both custom properties (for layout code)
and literal values inside `@page` (because paged-media engines cannot resolve
`var()` in `size`, `bleed` or `marks`).

Current values — trim 300 × 300 mm, bleed 3 mm, safe area 8 mm, margins
30 / 34 / 30 / 34 mm, a 12-column grid with a 6 mm gutter.

> **Nothing here is press-final.** Bleed, spine, fold and cover geometry are
> provisional until the printer's own production template arrives and page count
> and paper stock are fixed. Target printer is the Saal Digital Professional Line
> 30 × 30 cm photo book, but no Saal-specific number is hard-coded anywhere.

Spine width is computed, not typed: `pages / 2 × caliper + board allowance`. At
130 pp on a 0.17 mm leaf it comes to **15.1 mm**. Change the page count in
`book.config.js` and the wrap mockup follows.

**That 0.17 is a placeholder and the spine is linear in it** — 0.65 mm of spine
per 0.01 mm of caliper, so a guess that is wrong by four hundredths puts the
wrap out by 2.6 mm and the title off centre on a finished book. Get the number
from Saal before anything is printed.

### Proof vs press

The same markup produces both. `--bleed-out` is `0mm` on a proof and the real
allowance on a press build, so a proof is trimmed and readable while the press
file carries live bleed and crop marks. Set by `BOOK_PRESS=1`, which `npm run
pdf:press` does for you.

---

## How the book is composed

Content is separate from layout, and layout is separate from geometry.

```
content/
  book.json          the page sequence
  contents.json      the table of contents
  images.json        every planned image — the manifest source of truth
  essays/            one markdown file per essay, spreads declared in frontmatter
  front-matter/      half title, opening note
  sections/          part dividers
src/
  layouts/           spread renderers — composition only, never copy
  styles/            tokens, typography, page model, layouts, plates, cover
  scripts/           preview chrome (screen only)
prompts/             photography, illustration, and the generated manifest
```

An essay's frontmatter declares its own spreads and which prose blocks land
where. Blocks are marked in the markdown with `<!-- block: id -->`, so the copy
stays readable and editable as prose:

```yaml
spreads:
  - type: opener
    image: attention-01-window-reflection
    blocks: [open]
  - type: reading
    variant: two
    blocks: [flow-1a, flow-1b]
    bandImage: attention-05-crosswalk-strangers
  - type: pull-quote
    quote: You have never once experienced a room. You have experienced a paraphrase.
```

### Pages are composed, not flowed

Every page is a fixed 300 × 300 mm box, placed one per sheet. Nothing reflows
across pages. This is deliberate: it is what lets one spread hold six words and
the next hold six hundred, and it is why the browser preview and the PDF agree
by construction. The cost is that copy must fit its page — which is what the
preview's overflow detector is for.

The compositor assigns recto/verso, numbers folios, suppresses them on spread
types that should not carry one, and inserts a blank when a two-page spread
would otherwise start on the wrong side. Layout code never thinks about any of
this.

### Spread types

`opener` · `reading` (`two` | `aside`) · `pull-quote` · `image-essay` ·
`full-bleed` · `diagram` · `closing`, plus `divider`, `contents`,
`title-spread`, `half-title`, `opening-note`, `blank` and the covers. Add one by
writing a renderer in `src/layouts/index.mjs` and its CSS in
`src/styles/layouts.css`.

---

## Images

`content/images.json` is the source of truth. `prompts/image-manifest.md`
regenerates from it on every build — never edit the markdown.

Images marked `composite` in the manifest arrive already mounted, taped,
captioned or keyed. Where that is true the layout's treatment layer stands down
— tape on tape, or a caption under a caption, reads as a mistake rather than as
richness. Nineteen of the twenty-three current images are composites.

Any image that has not been made yet renders as a **labelled plate** carrying its
manifest ID, subject, aspect, target resolution and status. A proof PDF is
therefore also the shot list. Drop a real file into
`public/images/<kind>/<filename>` and the plate is replaced automatically on the
next build. No layout change, no code change.

`npm run prompts` writes **`prompts/image-prompts.md`** — one self-contained,
copy-paste-ready prompt per image, with the filename to save it under. The
house styles behind those prompts are documented in
`prompts/photography-prompts.md` (QUIET SURREAL DOCUMENTARY) and
`prompts/illustration-prompts.md` (PHILOSOPHICAL FIELD NOTES).
`public/images/personal` is reserved and empty; personal photographs can replace
generated ones one at a time.

Some diagrams are authored as SVG in `src/layouts/diagrams.mjs` rather than
generated, so they inherit the book's exact ink colours and stay vector-sharp at
300 mm.

### Two resolutions, and why

`public/images` holds the press masters. They are **Git LFS objects** — they run
to hundreds of megabytes and the re-render of the still-outstanding photographs
will push them past a gigabyte.

`public/images-web` holds the same pictures at 1400 px as ordinary git objects,
and the hosted preview is built from those. Two things make this necessary
rather than tidy: a published Pages site is capped at 1 GB, and every CI
checkout that fetches LFS spends the account's monthly LFS bandwidth — 1 GB on
the free tier, which is about two pushes. So the workflow does not fetch LFS at
all, and `npm run build:web` reads the derivatives instead.

Derivatives are generated here by `npm run derive` and committed, never
generated in CI. That is also why the resize can go through `sips`: it never has
to run on a Linux runner, so the repo needs no image dependency to build.

**Run `npm run derive` after placing images**, or the hosted preview will keep
showing the previous ones. A press build, a proof and every PDF go on reading
the masters and are unaffected.

---

## The five stages

The book is a progression, not a collection: observe, notice, understand,
expand, integrate. A stage is declared once — `stage: 3` on a section or an
essay — and every page inside it inherits its ground, the ink that survives on
that ground, its three accents, and how dense the annotation layer may become.
Stages III and IV invert to a dark page.

A spread never names a colour. It uses `--accent-1/2/3` and the act decides what
those resolve to, so re-pacing the book is a frontmatter change, not a redesign.
Full direction in [`content/plan/art-direction.md`](content/plan/art-direction.md).

## Typography

### The scale

Two ratios, because one cannot serve both a 104 pt divider and an 8 pt folio
without producing sizes nobody needs: **display ×1.25** anchored on the 84 pt
cover, **text ×1.2** anchored on 11.5 pt body. Fourteen steps, and every size in
the book resolves through one of them — 77 references, zero hardcoded values.

Sizes are in **points, not rem**. This is a paged document with a physical trim:
there is no viewport to scale against and no reader font preference to respect,
and a millimetre on press is a millimetre. The 16 px screen minimum is a rule
about a backlit display; 11.5 pt is mid-range for a book.

**Line length is capped in `ch` and calibrated against real copy**, not against
the nominal number. `ch` is the advance of "0", and how that relates to the
average lowercase letter is a property of the face: Archivo's ran narrower,
Familjen's runs 1.23× wider. Same cap, different result. Re-probe on any body
face change. Every text style currently falls inside 45–75.

**Weight and tracking for display elements live in exactly one block** in
`typography.css`. `layouts.css` and `cover.css` load after it, so a stray
`font-weight` in a component silently wins and the headline quietly reverts —
this happened three times before the rule was made explicit.

### Four voices, set once in `src/styles/tokens.css` and referenced nowhere else:

- `--font-display` — an expressive serif for titles, dividers, pull quotes.
- `--font-text` — a restrained sans for body, captions, folios, metadata.
- `--font-note` — a systems voice for specimen labels, diagram callouts and
  field notations. This is where the book gets its personality.

They currently resolve to open-licence faces vendored from npm and served from
`build/fonts`, so the PDF build is reproducible offline and the exported file
embeds exactly these faces:

| Voice | Board specifies | Currently | Why |
| --- | --- | --- | --- |
| Display | GT Super Bold | **Falutin Title** (purchased), Fraunces fallback | A Didone display cut with teardrop terminals, 7 weights. Licensed from Plattner Type and **not in this repo** — see [LICENSING.md](LICENSING.md). Builds without it fall back to Fraunces automatically. |
| Body | Söhne Buch | **Hanken Grotesk** | A humanist grotesque, the warmest of the four candidates — calligraphic residue in the letterforms. Chosen 20 Aug 2026 for friendliness over Familjen Grotesk, which stays in the type tester for comparison. Body copy re-measured at 65 characters per line after the swap. |
| Annotations | GT America Mono | **IBM Plex Mono** | Neo-grotesque mono, warmer than Roboto Mono. |
| Hand | script accent | **Caveat** | Natural handwriting, closest to the board's sample. |
| CJK | — | **Noto Sans JP / KR** | Last resort in every stack, for the Korean, Japanese and Chinese entries in the advertiser record. Only the unicode-range subsets carrying characters the book prints are committed, in `fonts-cjk/` — 27 characters, 131 KB, against 130 MB for the two packages. Without them the print path writes those glyphs as Type 3 outlines or drops them. Regenerate with `npm run fonts:cjk`. |

### Moving to Adobe Fonts

The three families the boards name are **not available through Creative Cloud**
— Grilli Type (GT Super, GT America Mono) and Klim (Söhne) license direct only.
Freight Text Pro and the DIN families, named on the earlier boards, are on Adobe
Fonts. If you go that route:

1. Activate the desktop fonts in the Creative Cloud app. Vivliostyle renders
   through headless Chromium on this machine, so activated fonts resolve by
   family name and get embedded in the PDF.
2. For the hosted preview, add your Adobe web-project `<link>` to the generated
   HTML. Adobe web fonts cannot be self-hosted or vendored, which is why the
   default path stays on the npm faces.
3. Change the four `--font-*` variables in `src/styles/tokens.css`.

Body size is tuned to the current faces. Changing them changes the copy fit —
run `npm run dev` and watch the overflow outlines before trusting a swap.

---

## Known open questions

- Printer geometry is provisional — see above.
- Body copy currently runs 13 pt. On a 300 mm page that is comfortable but it
  sets the copy-to-page ratio for the whole book; worth deciding deliberately.
- ~~Essay pacing needs a target spread count.~~ **Settled.** Eight essays fit
  130 interior pages, at roughly sixteen pages each: two openers, four
  two-column reading spreads, two asymmetric, two image-and-essay, one pull
  quote, two closing. The remainder is front matter, eight section dividers and
  eight field notes. There is no slack left — 130 is the printer's maximum, so
  a new spread has to displace an existing one, and that trade is the decision,
  not the layout.
- **Image resolution is now set by the generator, not by the press.** Thirty-two
  manifest targets were lowered on 20 August 2026 to the largest canvas ChatGPT
  actually produces — 1024 × 1024, 1536 × 1024, 1024 × 1536 — because the
  previous figures asked for a resolution no available generator could reach.
  The cost, at the sizes these pictures actually print:

  | Placement | Canvas | Effective |
  | --- | --- | --- |
  | Full-bleed page, 306 mm | 1024 × 1024 | **85 dpi** |
  | Image essay, tall, 192 mm | 1024 × 1536 | **135 dpi** |
  | Reading band, 236 mm | 1536 × 512 | **165 dpi** |

  Press work normally wants 300 dpi. Lowering the target changed what the
  manifest asks for, not what the paper will show, so a full-bleed opener is
  the one to revisit first — either upscale a generation already judged good,
  or place it smaller. **Every image has since been measured in the composed
  book** — see [resolution-audit.md](content/plan/resolution-audit.md). Eleven
  are under 120 dpi and all eleven are 300 mm full bleeds; three of those are
  essay closings at 87 dpi, and a phone would take them to 256. Note the band was never the problem it looked like: its
  old 9000 px target implied 969 dpi across a 236 mm placement, because it was
  spec'd as though it ran the full 600 mm across the fold. It does not —
  `.reading__band` sits inside one page's text block.

  Screen prints are exempt. They are separated from personal photographs by
  `scripts/separate.py` at 3000 px and never touch a generator.
