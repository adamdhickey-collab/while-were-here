# Art direction — Field Notes & Hidden Systems

**Status: locked.** Implemented in `src/styles/tokens.css` (spectrum + acts),
`src/styles/typography.css` (third voice), `src/styles/placeholders.css`
(handmade layer). Built at true trim size in `build/direction.html`.

> Design a 300 mm square hardcover art book that begins as a quiet observational
> field journal and gradually evolves into a vibrant, immersive exploration of
> hidden systems, perception, and ordinary life. Use the scientific elegance of
> natural-history books, the tactile intelligence of editorial collage, and the
> colour energy of spectral, ecological, and microscopic imagery. The visual
> language should feel handmade, curious, and alive — never corporate, never
> cliché psychedelic, but increasingly vivid, layered, and adventurous as the
> book progresses.

---

## The progression

From observation to revelation and back. A stage is declared once — `stage: 3`
on a section or an essay — and every page inside it inherits its ground, the ink
that survives on that ground, its three accents, and how dense the annotation
layer may become. `--annotation` is `0` quiet, `1` present, `2` dense.

| | Imperative | Ground | Accents | Visual cues |
| --- | --- | --- | --- | --- |
| **I** Observe the surface | OBSERVE | warm paper | rust · moss · lake | Cream paper and real air between things — but the plates are already in full colour. Specimen cards, annotated diagrams, one saturated microscopy plate per essay. Quiet *pages*, loud *evidence*. |
| **II** Notice the patterns | NOTICE | bone | lake · algae · amber | Specimen plates multiply and start repeating across scales. Diagrams gain keys and callouts. The first crossover plate. |
| **III** Enter the systems | UNDERSTAND | **charcoal** | bioluminescent teal · lake · amber | The page inverts. Layered system diagrams, microscopy, luminous line work on a dark ground. |
| **IV** Expand awareness | EXPAND | **void** | coral · ultraviolet · acid | The most vivid zone in the book. Spectral colour, larger spreads, bolder type, immersive full bleeds. |
| **V** Return with wonder | INTEGRATE | warm paper | rust · amber · moss | Less density, calmer pages, warmer tones, emotionally direct photography. |

Stages III and IV invert to a dark page — this is where the book stops
describing systems and puts you inside one. Stage V has to earn its quiet by
following them, not by avoiding them.

**Stage I is quiet in layout, not in colour.** This changed after the first
generated set came back: twenty photographs of a lake in almost the same light,
mean saturation 0·26, with no blue, green, violet or magenta anywhere in them.
They were a faithful reading of "soft light, sparse photography" and they made
the opening of the book look like a different, smaller book than the one the
spectrum describes. The restraint in Stage I now belongs to the *page* — wide
margins, few elements, one idea at a time — while the plates that sit on it
carry the same colour they would carry anywhere else. A reader should be able to
open to page 20 and see the palette, not wait until Part III for permission.

The recurring device that carries the progression is the **statement spread**:
one declarative line, one imperative beneath it, one image facing it. Built as
spread type `statement`.

## Expanded perception, not psychedelia

The vocabulary is **layered transparencies, moiré, spectral bands, ultraviolet
and infrared interpretation, microscopy, root networks, magnetic-field arcs,
wave patterns, star charts, overprinted diagrams, luminous ecological systems,
repeated marks and notations.**

The feeling to aim at is *your perception is widening*. The feeling to avoid is
*you are looking at psychedelic art*. Sixties poster clichés are out. So is
anything that reads as an effect rather than an observation.

## The spectrum

Not a rainbow — the colour system of stained scientific slides, algae blooms,
topographic maps, thermal diagrams, old field guides, spectral charts and
risograph overprints.

| | | |
| --- | --- | --- |
| Warm paper `#F3EFE5` | Bone `#EDE7DA` | Charcoal `#191919` |
| Moss `#68735B` | Algae `#4E6B4A` | Lake `#3E6B87` |
| Oxidised rust `#A95738` | Amber `#C8862F` | Bioluminescent teal `#2AA79B` |
| Ultraviolet `#6B4E9B` | Coral `#E8705A` | Signal orange `#E44E2D` |
| Acid `#B5C334` | | |

A spread never picks a colour. It uses `--accent-1/2/3`, and the act decides
what those resolve to. Signal orange stays an event, not a colour.

## The turn

An image in this book is not an illustration of the sentence beside it. It is
the sentence taken **completely literally, by someone with instruments**.

The essays keep making small throwaway claims — that walking is an astonishing
biological achievement, that a circular walk accomplishes nothing economically,
that your body is rebuilding itself while you read. Each one is offered as a
figure of speech and each one happens to be true. The graphic is what happens
when somebody refuses to treat it as a figure of speech: it measures the thing,
labels it, gives it a key and a scale bar, and files it as evidence.

That is the joke, and the joke is the argument. The reader smiles at the
over-seriousness, and a half second later notices the diagram is not exaggerating.

Three rules keep it from becoming a gag:

**Deadpan, always.** The plate never winks. No comic exaggeration, no cartoon,
no jokey caption. It is drafted with the same care as a real scientific figure,
and its humour comes entirely from the mismatch between that care and its
subject. A P&L statement for a walk around a lake is funny because it balances.

**The reveal comes after the line, never before.** The text makes its modest
claim; the reader turns, or drops to the foot of the page, and finds it
substantiated at absurd length. Placing the plate first spoils it — the reader
reads the sentence already knowing where it is going, and the turn is gone.

**Never explain it.** The caption is a specimen label: dry, factual, shorter
than feels comfortable. Anything that nudges the reader toward the joke kills
it. Trust the reader to arrive.

The register to aim at is a very calm person telling you something enormous
while doing the washing up. Wonder delivered dry. Never whimsy, never awe as a
performance, and never the cosmic-sounding sentence that congratulates itself.

Worked examples, all from Essay 01:

| The line | The plate |
| --- | --- |
| "Your brain performs an enormous amount of calculation without asking permission." | A patent-style mechanical schematic of one step across a kitchen: vectors, centre-of-mass arc, the firing order of eleven muscles, a control-loop block diagram, fig. numbers. |
| "Economically, almost nothing has happened." | A ledger for a forty-minute walk, ruled and totalled: energy in, energy out, distance closed, net displacement 0 m. It balances. |
| "You would be overwhelmed if every hum, texture, face, smell and background sound felt as intense on the thousandth encounter." | One second of an ordinary room, drawn unfiltered — every sound, wavelength, air current and surface labelled at once, packed to the edges. The plate is exhausting to look at. That is the finding. |
| "A child can spend twenty minutes watching water move through a gutter." | A rigorous fluid-dynamics plate of gutter flow — Reynolds numbers, vortex shedding, a real scale bar. The child was doing science. |
| "Even your body is continuously rebuilding itself." | A shipping manifest of the atoms replaced since the reader started the essay, with tonnage, drawn as a customs form. |

## The colour key

Every essay is a specimen, and specimens are catalogued by colour.

Each essay owns one colour from the spectrum. It is not decoration and it is not
applied evenly — it appears in exactly four places, so it reads as a filing
system rather than a theme:

1. the essay number and the hairline rule under the running head,
2. the specimen-label chip on every plate in that essay,
3. the key line and callout leaders in that essay's diagrams,
4. the wash behind the essay's opener.

Everything else on the page stays in the stage's own accents. One colour, four
jobs, and the reader learns it without being told.

**The order is the argument.** Read the assignments straight down and they run
cool to hot to deep — moss and lake through teal and acid, into amber and signal
orange, out to coral, ultraviolet and indigo. That is the same journey the stages
describe, which means **the contents page is a colour key**: nineteen chips in
spectrum order, and the shape of the whole book visible before a word of it.

| # | Essay | Part | Specimen colour | |
| --- | --- | --- | --- | --- |
| 01 | Why Ordinary Days May Be the Point of Life | I | Moss | `#68735B` |
| 02 | Why We Cry at Beauty | I | Sage | `#8A9A7B` |
| 03 | The Secret Life of Attention | I | Lake | `#3E6B87` |
| 04 | The Lost Art of Wandering | I | Algae | `#4E6B4A` |
| 05 | The Psychology of Enough | I | Slate green | `#5D7D72` |
| 06 | The Intelligence Outside Your Head | II | Bioluminescent teal | `#2AA79B` |
| 07 | What If Consciousness Isn't the Most Important Thing About Us? | II | Cyan | `#2E8FA8` |
| 08 | The Beauty of Systems Nobody Designed | II | Cobalt | `#2B5EA8` |
| 09 | The Most Important Things Are Impossible to Measure | II | Acid | `#B5C334` |
| 10 | Your Body Is a Civilization | II | Viridian | `#1F7A5E` |
| 11 | The Strange Privilege of Being Alive During a Technological Revolution | III | Amber | `#C8862F` |
| 12 | When Your Career Stops Being Your Identity | III | Oxidised rust | `#A95738` |
| 13 | The Last Generation That Remembers the Before-Time | III | Ochre | `#B9932B` |
| 14 | Why We Need Things That Are Useless | III | Signal orange | `#E44E2D` |
| 15 | Why Humans Need Pilgrimages | IV | Coral | `#E8705A` |
| 16 | The People You Love Are Temporary | IV | Magenta | `#C8437E` |
| 17 | The Strange Gift of Getting Older | IV | Ultraviolet | `#6B4E9B` |
| 18 | Can You Become Wiser Without Becoming Smarter? | IV | Iris | `#5A5BA8` |
| 19 | While We're Here | IV | Deep indigo | `#1B2C4E` |

Eight of these are new — sage, slate green, cyan, cobalt, viridian, ochre,
magenta and iris — added because nineteen essays need nineteen distinguishable
chips and the spectrum held thirteen. They are steps inside bands the spectrum already
had, not new territory.

Signal orange keeps its old rule and gains a reason: it belongs to essay 14 and
nowhere else, so the one time the book shouts, it is a catalogued shout.

## The handmade layer

Taped-in photographs, handwritten notes, marginalia, underlines, index marks,
collage fragments, specimen labels, rough edges, overprinting, notebook logic,
occasional imperfect alignment — **all of it composed and professional, never
messy.** The imperfection is placed on purpose and the grid is still underneath
it.

Built as `.taped`, `.tag`, `.label`, `.marginalia`, `.index-mark`, `.struck`,
`.specimen`, `.overprint`.

Note on overprint: `mix-blend-mode: multiply` is the only blend that survives
the print path intact. Anything else gets rasterised on the way to PDF.

## Material language

Eight categories the imagery is drawn from, per board three. Every image in the
manifest should be identifiable as one of these:

**Field notes · Diagrams · Specimens · Maps · Microscopy · Overlays · Collage · Archival**

`photography` is not one of them. A photograph reaches the book only *inside* a
category — taped into a field note, printed as a specimen card, overprinted with
a diagram, cut into a collage — and the manifest records the category, never the
camera. The first image plan ignored this: 20 of its 23 entries were typed
`photography`, which is why what came back was a mood board for a quieter book.
An entry whose `kind` is not one of the eight is a planning error, not a style
choice. The two cover artworks are the only exemption — they are typed
`illustration` because they belong to the object, not to an essay, and they
answer to the cover brief instead.

No essay should be built from a single category. **Four of the eight, minimum,
per essay**, and at least one of them saturated.

## Layout rhythm

> Essays average **4–6 spreads**: one opener, two to three reading spreads, one
> visual or diagram, one closer.

Essay 01 currently runs **seven** spreads (14 pp) with every word of the
supplied text intact. Getting to six means cutting roughly 150 words. The
arithmetic for the whole book is in *Open items*.

## Production

| | |
| --- | --- |
| Trim | 12 × 12 in · hardcover |
| Extent | 144 pp (board estimate) |
| Binding | Thread sewn, lay flat, printed endpapers |
| Paper | Uncoated, tactile, warm white with natural fibre |
| Ink | Rich black plus vibrant spot colours; occasional metallic or fluorescent hits |
| Special | Occasional translucent overlays and fold-outs |

## Devices

Taken directly from the interior direction boards and built as reusable parts:

| Device | Where it came from | Built as |
| --- | --- | --- |
| Drop cap | every reading spread on both boards | `.prose--drop` |
| NOTICE THIS panel, numbered 01–04 | essay opener spread | `.notice` + `noticeSteps` |
| Specimen card over a photograph | text + image spread | `.specimen-card` + `specimen:` |
| Sidebar of short observations | "Root Notes" column | `.sidebar` + `sidebar:` |
| Taped inset card, figure or photo | classic reading spread | `.inset-card.taped` + `inset:` |
| Handwritten margin note | both boards | `.hand`, `--font-hand` |
| Visible / Present ledger | field-note label | `.ledger` + `ledger:` |
| Contact sheet with time-stamped captions | observational sequence | `.contact-sheet` |
| Seasonal sequence, one frame repeated | progression strip | spread type `sequence` |
| Image pair, broad and close crop | attention spread | spread type `image-pair` |
| Statement + imperative | stage progression | spread type `statement` |
| Essay mark, opener and running head | the index of marks | `.mark` + `mark:` |
| Concept mark in the margin | the index of marks | `.mark.mark--margin` |
| Index of marks, back matter | the index of marks | sequence type `index-of-marks` |

## Four voices

| | Role | Brief's preference | Currently |
| --- | --- | --- | --- |
| One | Titles, dividers, large quotes | GT Super · Canela · Lyon Display | Hoefler Text |
| Two | Body, captions, folios | Söhne · Founders Grotesk · ABC Diatype | Avenir Next |
| Three | Specimen notes, diagram labels, callouts | GT America Mono · DIN Condensed · IBM Plex Mono | DIN Condensed / Menlo |
| Four | Field-note script, margin hand | Reckless Neue Italic · a scanned hand | Bradley Hand |

**The named families are commercial licences this project does not hold.** The
three-voice *system* is wired and working; the faces are substitutes that swap
in `tokens.css` and nowhere else. Preferred pairings, in the brief's order:

- **Boards' own choice.** Freight Text Pro Semibold · GT America Regular ·
  DIN Condensed, with Reckless Neue Italic for notes and prompts.
- **A — literary + scientific.** GT Super · Söhne · GT America Mono.
- **B — elegant + warmer.** Canela · Founders Grotesk · Freight Sans.

## Cover

The cover stays calm even as the interior becomes vivid — the contrast is the
point. Cream or pale oat cloth with blind deboss and foil stamp, minimal front
typography, and one scientific gesture: **a dot with rays**, half compass rose
and half dandelion, drawn slightly irregular. Built as `radiant()` and used at
21 mm on the front, 15 mm on the back, and small on the bare pull-quote spread.

Back cover carries the coda: *Look closer. Stay curious. Be kind.*

The mood boards show the title on a single letterspaced line; the written brief
specifies a three-line stack. Currently the three-line stack, with the mark
moved below it as the boards show. **Worth deciding.**

> The cover should whisper *this is elegant*, while the interior reveals *this is
> surprisingly alive*.

---

## Open items

- **Cosmos references.** The direction cites roughly 28 public Cosmos
  collections. Cosmos's Explore page and individual public clusters are readable
  without an account, but **search and the element grids are gated for logged-out
  visitors**, so those specific collections could not be verified here. They are
  recorded as supplied.
- **New essays.** The act assignments name essays that do not exist yet: *The
  Lake Is Not a Thing*, *The Air Is Full of Life*, *A Tree Is Mostly Made From
  Air*, *The Ground Is Alive*, *The World You Cannot Sense*, *Your Body Is
  Predicting the World Before You Notice It*, *Recovery Is More Than Stopping*.
  None are in `content/contents.json` and the four-part structure in the brief
  does not yet accommodate them — see the conflict noted in
  [`storyboard.md`](storyboard.md).
- **Stages vs parts.** Five stages and four parts are not the same thing and
  should not be assumed to align. Worth deciding explicitly before Part II is
  laid out.
- **Trim.** The boards say 12 × 12 in, which is 304.8 mm. The build is 300 mm,
  matching Saal's 30 × 30 cm. One number has to give — `book.config.js` is the
  only place it lives.
- **Extent.** Board three sets 144 pp and 4–6 spreads per essay. Essay 01 fits
  its full text in seven spreads (14 pp). Eighteen essays at seven spreads is
  252 pp of essays before front matter and dividers. Three levers: cut ~150
  words per essay to reach six spreads (≈216 pp), raise the extent, or accept
  denser pages. **This one needs deciding before Part II is laid out.**
- **Stage count.** Board two names five stages (observe / notice / understand /
  expand / integrate); board three's journey bar names four (calm &
  observational / discovery / expansion / integration). The build uses five,
  which subdivides board three's first zone. Harmless, but worth confirming.
- **Cover.** Board three replaces the bare cream field with watercolour-and-ink
  artwork and a new subtitle, *Essays on ordinary days and hidden worlds*. Both
  are in. The artwork is a placeholder plate until generated —
  `cover-01-watercolor-systems`.
- **Colour on press.** Bioluminescent teal, ultraviolet and acid are outside a
  comfortable CMYK gamut. On a photo-book press they will shift. Either accept
  the shift, restrict Act III's saturation, or plan for a printer that can hit
  them.

**The index of marks is unbuilt.** `prompts/icon-prompts.md` specifies thirty-five
hairline marks — nineteen essay marks and sixteen concept marks — and where each
one sits. Three things are needed before it can be laid in: a `.mark` class
(distinct from `.index-mark`, which is already the superscript numeral), a
`mark:` key on essay front-matter, and a back-matter sequence type for the index
page itself. None of it blocks the imagery.

---

## Future Fonts shortlist

Five faces looked at properly. All are sold as works in progress — you buy a
version and get free updates as it develops, which for a book going to press is
both the appeal and the risk: freeze the version you buy, and re-proof if you
take an update.

| | Version | Price | What it is | Verdict |
| --- | --- | --- | --- | --- |
| **Mirta** — Michelangelo Nigra | 0.3 | **$60** | Roman inscriptional proportions crossed with early-transitional Caslon. Sharp flared serifs, high contrast, genuinely odd in the details. | **Best display fit.** Literary authority with the strangeness the direction asked for, and it does not read as fashion. |
| **Tuplet** — Jakob Fangmeier | 0.3 | **$65** | A slab-serif **monospace** with a swashy italic and arrow / sunburst ornaments. Regular and double-width alternates. | **Best annotation fit.** Turns every specimen card and plate label into a nineteenth-century catalogue while staying monospaced, so tabular data still aligns. |
| **Mara des Bois** — A+ | 0.3 | **$95** | Drawn from David Lance Goines' Chez Panisse lettering: inscriptional Roman, Art Nouveau gesture, triangular serifs, linocut warmth. Works at label size as well as display. | The warm alternative. Most on-theme conceptually — botanical poster heritage — but less strange than Mirta. |
| **Falutin** — James Plattner | 1.0 | — | Didone with fluid curves and teardrop terminals. 7 weights across 3 optical sizes. | Beautiful and the most complete family, but **no longer sold on Future Fonts** — plattnertype.com — and its register is closer to fashion than natural history. |
| **Lifted** — Regan Fred Johnson | 0.2 | $30 | Serif and sans pair built around oversized dots and ball terminals. | Charming and cheap, but hairline-thin and one-note. A short-burst personality face, not a system. |

**Recommendation: Mirta for display, Tuplet for annotations — about $125 together.**
That pairing changes the book more than anything else on the list: Mirta carries
the titles and pull quotes, Tuplet makes the entire specimen layer feel found
rather than set. Body copy stays on Archivo, and the hand stays on Caveat.

All five are wired into `build/type.html` as candidate stacks. They render as
soon as the fonts are installed on the machine — no code change.

---

## Generated pictures may not contain legible text — 21 Aug 2026

A rule arrived at by enlarging every generated image in the book to the size it
prints at and reading what is written in it.

**The rule.** Any text inside a generated image must sit **below the legibility
threshold at trim size** — small enough, soft enough or abstract enough that the
eye reads *handwriting* or *a shelf of books* without ever being invited to read
a word. The moment a viewer can start decoding, the picture has to survive being
decoded, and a generated picture never does.

**The book already gets this right almost everywhere, and it is worth saying how.**

- `hand-01-marginalia-set` and `hand-02-overwriting-diagram` are pure abstract
  cursive — struck-through lines, an ink blot, a bracket, an arrow. They read
  unmistakably as annotation and as a passage being revised, and they claim no
  words at all. This is the correct pattern.
- `before-time-05-artifact-array` puts a phone book and two handwritten notes on
  a table and keeps them small and slightly out of focus. The columns and the
  script stay below the threshold. Also correct.
- `field-note-02-tag-code` is framed, by its own brief, so that no code content
  and no name is legible.

**One image breaks it,** and it is the full-bleed opener of the essay about
looking closely: `attention-01-familiar-room`. Its coffee table carries a
readable *The Hidden Life of Trees* — a real book on a fabricated cover — above
five spines that say things like *Hnadtoo drdrtatr*. See
[open-questions](open-questions.md) item 8.

**Why the threshold is the right rule rather than "no text".** Text at the
threshold is doing real work in all three good cases: the marginalia has to look
like writing or the overlay means nothing. What fails is not the presence of
text but the *promise* of it. Legible-looking text is a promise, and a generated
image cannot keep one.

**And it matters more in this book than in most.** The argument here is
attending to the actual world. The reader is told, in as many words, to look
again. A picture that punishes the second look is arguing against the page it
sits on.

---

## The hierarchy of visual languages — 21 Aug 2026, from the editorial pass

The book runs many visual languages — photography, survey overlay, field note,
diagram, handwriting, specimen card, metadata record, map, macro texture — and
the outside read found them independently good but competing for equal
authority. The fix is not removal. It is a stated order, so the outliers read
as intentional rather than eclectic:

1. **Primary — documentary observation.** The photographs. What was actually
   there, at the size and prominence of testimony.
2. **Secondary — analytical and survey overlay.** The drafted diagrams and
   surveys, always in service of a photograph or an observation, never
   free-floating.
3. **Tertiary — found record, archive, specimen.** The Meta records, catalogue
   cards, handwriting, ephemera. Small, boxed, labelled; the register where
   *numbers* live (a spread says a figure once, here, not twice).

Two corollaries already applied: the 4004's transistor count comes out of body
prose because the margin note owns it, and no fourth reproduced dataset joins
the three records — three is intentional, six is a device.

And one push the critique made that this document endorses: **Part II may get
stranger, never tamer.** The hidden-systems material is the book's
distinctiveness — "the reader should feel the aperture opening."

---

## Four finished diagrams are sitting unused — 22 Aug 2026

`src/layouts/diagrams.mjs` exports five original figures, drawn in code so they
inherit the book's inks and stay vector-sharp at 300 mm. **Only one is placed.**
The other four are written, registered in the `diagrams` map, and appear nowhere
in the book. Rendered and looked at for the first time today; all four work.

| figure | what it is | where it obviously belongs |
| --- | --- | --- |
| **`punctuation`** | A life as a single line from **birth** to **not birth**, with seven rust ticks on it and nothing else | The whole book's thesis in one mark. Essay 01 argues that chapter headings are not the book; this draws the headings and leaves the rest as line |
| **`dayField`** | **Thirty thousand marks** — one per day of a long life — across a two-page spread, with **two hundred picked out in rust**: the ones that end up in an album | Essay 01, or the Part I divider. It is the single most on-thesis image in the repository and it has never been on a page |
| **`observational`** | Concentric ripples from a point of entry, scaled `0 … ≈ 4 s` | The lake field note, whose prose is *"the same motions to repeat without becoming identical"* |
| **`walking`** | A figure and four systems — balance, vision, placement, correction — with *continuous, unasked* | Essay 01's walking passage: *"You shift your weight forward. One leg catches you. Then the other."* |

**`dayField` deserves its own sentence.** Thirty thousand days is about
eighty-two years; two hundred of them are marked. The book's argument is that
the marked ones are not the life. Drawn, working, unplaced.

**One defect found and fixed while looking.** `walking` had the same collision
Figure 02.1 had: the rust curve's caption sat at x=60, y=110 and ran straight
through the word `correction` at x=92. It now sits under the curve at x=18,
y=127, clear of the stack's column and far enough below its last sub-label to
read as its own line. Latent — the diagram is unused — but it would have
printed the first time anyone placed it.

**Placing any of these costs a page**, and the book is at its 130-page ceiling.
That is the only reason they are not proposals. `punctuation` is small enough to
sit in a margin or an inset and might cost nothing at all.

---

## The divider labels lost their numerals — 22 Aug 2026, Adam's call

The four part dividers used to print **Stage I, Stage II, Stage IV, Stage V**.
Stage III never appeared, because the book has five stages and four parts: Part
II contains both Stage II (*The Beauty of Systems Nobody Designed*, cream) and
Stage III (*The Intelligence Outside Your Head*, charcoal), and a divider can
only name the stage its part opens in. So the page inverted to a dark ground in
the middle of a part, under a label that still said Stage II, and the next
divider jumped to Stage IV.

The numerals are gone. The labels are now the phrases alone:

    — OBSERVE the surface
    — NOTICE the patterns
    — EXPAND the aperture
    — INTEGRATE what is left

The imperative keeps its weight and the object stays light, so the two-tone the
design relies on is unchanged; only the counting has stopped. They read as
instructions to the reader rather than as an index to a system, which suits a
book that never explains its own devices.

**What this preserves deliberately:** the inversion still arrives unannounced,
mid-part, with no label to warn of it. That is the effect the alternative
options would have cost — naming "Stages II–III" on Part II's divider gives away
the turn sixteen pages early. *A revolution is easiest to miss when it arrives
as a convenience.*

`stage` remains in the section and essay frontmatter and still drives every
page's ground, ink and ground-opacity. It is now a private structure, which is
what it always was.
