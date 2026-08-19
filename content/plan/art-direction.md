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
| **I** Observe the surface | OBSERVE | warm paper | rust · moss · lake | Cream paper, soft light, sparse photography, smaller moments, restrained annotation, breathing room. |
| **II** Notice the patterns | NOTICE | bone | lake · algae · amber | Specimen plates, repetition across scales, the first diagrams. |
| **III** Enter the systems | UNDERSTAND | **charcoal** | bioluminescent teal · lake · amber | The page inverts. Layered system diagrams, microscopy, luminous line work on a dark ground. |
| **IV** Expand awareness | EXPAND | **void** | coral · ultraviolet · acid | The most vivid zone in the book. Spectral colour, larger spreads, bolder type, immersive full bleeds. |
| **V** Return with wonder | INTEGRATE | warm paper | rust · amber · moss | Less density, calmer pages, warmer tones, emotionally direct photography. |

Stages III and IV invert to a dark page — this is where the book stops
describing systems and puts you inside one. Stage V has to earn its quiet by
following them, not by avoiding them.

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
- **Extent.** The boards say ~200 pages. Essay 01 alone runs 22 pages at this
  density; eighteen essays at that rate is roughly 400. Either the page count
  rises, the density does, or essays get fewer spreads.
- **Colour on press.** Bioluminescent teal, ultraviolet and acid are outside a
  comfortable CMYK gamut. On a photo-book press they will shift. Either accept
  the shift, restrict Act III's saturation, or plan for a printer that can hit
  them.
