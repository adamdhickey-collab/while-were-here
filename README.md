# While We’re Here

*Small essays about attention, technology, beauty, time, and being alive*
Adam Hickey

A print-first coffee-table book. HTML, CSS and a small amount of JavaScript are
the production system; the deliverable is a press-ready PDF for a 300 × 300 mm
hardcover. It is not a website.

**Status: prototype.** One complete essay laid out across eight spread types,
plus covers and front matter — 28 interior pages. The point is to prove the
design language before scaling to eighteen essays.

---

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:4321/> — a small hub linking the three views.

| Script | What it does |
| --- | --- |
| `npm run build` | Compose `build/` from content. Fast, no browser. |
| `npm run dev` | Build, watch content, and serve `build/` on port 4321. |
| `npm run preview` | Open the real Vivliostyle paginator on `build/book.html`. |
| `npm run pdf` | Proof PDF → `dist/while-were-here.pdf` (trimmed, no marks). |
| `npm run pdf:press` | Press PDF → `dist/while-were-here-press.pdf` (bleed + crop marks). |
| `npm run prompts` | Regenerate `prompts/image-prompts.md` from the manifest. |
| `npm run place` | Put a generated image into the book; bare, it lists what is missing. |
| `npm run fonts:setup` | One-time: venv + convert the licensed OTFs for press. |
| `npm run credits` | Rebuild the attribution page from the manifest. |
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
120 pp on a 0.14 mm leaf it comes to **12.4 mm**. Change the page count in
`book.config.js` and the wrap mockup follows.

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

Three voices, set once in `src/styles/tokens.css` and referenced nowhere else:

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
| Body | Söhne Buch | **Archivo** | Grotesque in the Akzidenz/Franklin line that Söhne descends from, drawn for text. |
| Annotations | GT America Mono | **IBM Plex Mono** | Neo-grotesque mono, warmer than Roboto Mono. |
| Hand | script accent | **Caveat** | Natural handwriting, closest to the board's sample. |

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
- The prototype is 28 interior pages for one essay. Eighteen essays at that
  density would overshoot 130 pp, so essay pacing needs a target spread count.
