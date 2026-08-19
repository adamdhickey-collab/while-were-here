# The index of marks

A single black-and-white hairline system that runs the length of the book: one
mark per essay, plus a small vocabulary of concept marks used in margins.

It is the only thing in the book with no colour in it at all. That is the point
— the plates are saturated, the photographs are warm, and the marks are the
skeleton showing through. They also do the quiet structural work: a reader who
has seen essay 03's mark on the contents page recognises it on the running head
two hundred pages later without ever being told what it is.

---

## Where the marks go

A mark that can appear anywhere reads as decoration. These have fixed posts and
a short list of earned ones, and everywhere else is off limits.

Built as `.mark`, sized in millimetres. **Not** `.index-mark` — that class is
already the tiny superscript numeral tying a plate to its note, and the two
should never be confused in the stylesheet or on the page.

### Fixed — every essay, no decision to make

| Where | Which mark | Size | Position |
| --- | --- | --- | --- |
| Contents page | all nineteen essay marks | 7 mm | A column of marks beside a column of colour chips beside the titles. The whole book's spectrum and its whole vocabulary, before page one. |
| Part divider | the part's four or five essay marks | 6 mm | A row at the foot, in reading order. The reader sees what is coming without being told. |
| Essay opener | that essay's mark | 26 mm | Outer margin, its top aligned to the deck's first baseline. The largest any mark ever prints. |
| Running head, verso | that essay's mark | 4 mm | Before the title, optically aligned to the cap height. Recto keeps the folio alone. |
| Closing spread | that essay's mark | 8 mm | Centred below the coda, with air. It is the bookend to the opener and the only centred mark in the book. |

### Earned — never automatic

| Where | Which mark | Rule |
| --- | --- | --- |
| Outer margin, beside a paragraph | a concept mark | **At most two per spread**, and never on a spread that already carries a specimen card or a ledger. It points at the paragraph the way a reader's own pencil would. |
| Visible / Present ledger | one concept mark per row | This is the best use in the book: the ledger stops being a list and becomes a key. Water, soil, signal, system — each entry already has a mark waiting for it. |
| NOTICE panel, steps 01–04 | a concept mark per step | Sits left of the numeral, not instead of it. The numeral carries the sequence; the mark carries the idea. |
| Contact sheet captions | a concept mark before the time stamp | 3.5 mm. Only when the three frames share a theme worth naming. |

### Forbidden

- **Pull-quote spreads.** Already the loudest thing on the page.
- **Full-bleed spreads.** The exhale. Nothing lands on it, including this.
- **Inside a plate.** Diagrams, maps and specimen cards carry their own keys and
  legends; a second symbol system inside them is noise.
- **The folio.** Page numbers stay page numbers.

### And the index itself

The back matter carries **an index of marks**: all thirty-five, printed at 10 mm
in a grid, each named, with its essay number where it has one. No explanations —
a legend, not a glossary.

It is the last page of the book and it is the joke landing one final time: a
reader who has spent two hundred pages being told to look more carefully arrives
at a page that is nothing but the things they were looking at.

---

## Block A — the drawing system

Paste this ahead of every icon request, unchanged.

> A single technical line-art pictogram, black on transparent, in the manner of a
> patent drawing or a nineteenth-century field-guide key.
>
> **Line:** one uniform hairline weight throughout — no tapering, no variable
> stroke, no calligraphy. At a 1000 × 1000 px frame the stroke is 4 px. Butt
> caps, mitred joins. Pure black `#000000`. Nothing else.
>
> **No:** fills, solid shapes, hatching, stippling, shading, gradients, drop
> shadows, colour, texture, outlines of outlines, thick-and-thin contrast,
> hand-drawn wobble, sketchiness, three-quarter perspective, or type of any kind.
>
> **Construction:** orthographic — plan or elevation, straight on. Geometry that
> looks drafted rather than sketched: true circles, consistent radii, deliberate
> tangents. Leader lines, tick marks and centre marks are allowed and encouraged
> where they help; they are part of the language.
>
> **Frame:** square, transparent background, the mark optically centred with a
> consistent margin of roughly 12% on every side. It must survive being printed
> at 4 mm and at 120 mm — so no detail finer than a fifth of the stroke gap, and
> no element that closes up when it is small.
>
> **Register:** deadpan and exact. It is a diagram of an idea, filed by someone
> who does not find the idea unusual.

Ask for **1000 × 1000 px, transparent PNG, one mark per image.**

---

## The nineteen essay marks

Each is a visual aphorism — the essay's argument reduced to one drafted object.
None of them is illustrated literally, and none of them is explained anywhere in
the book.

| # | Essay | The mark |
| --- | --- | --- |
| 01 | Why Ordinary Days May Be the Point of Life | A month grid of plain squares. Four squares carry a small mark — the events. One unmarked square, elsewhere, is circled. |
| 02 | Why We Cry at Beauty | A single tear, drawn as an optical lens in section, with one light ray entering and refracting through it to a focus. |
| 03 | The Secret Life of Attention | A field of identical small circles. A narrow cone opens from one edge and falls on exactly one of them. |
| 04 | The Lost Art of Wandering | A continuous path that loops, crosses itself twice and returns to its own starting point. A start dot. No destination. |
| 05 | The Psychology of Enough | A balance scale at perfect rest. One pan holds a single small sphere. The other is empty. |
| 06 | The Intelligence Outside Your Head | A head in profile as a simple outline. The dense network of nodes and edges is entirely outside it, filling the surrounding frame. |
| 07 | What If Consciousness Isn't the Most Important Thing About Us? | A body drawn in section with dozens of processes marked by leader lines; only one leader is numbered, and it is the shortest. |
| 08 | The Beauty of Systems Nobody Designed | A honeycomb lattice, geometrically perfect, with no set square, compass or drafting mark anywhere near it. |
| 09 | The Most Important Things in Life Are Impossible to Measure | A ruler with precise graduations that thin, widen and stop two-thirds along. The remaining third is blank rule. |
| 10 | Your Body Is a Civilization | A human silhouette whose interior is drawn as a city plan — street grid, blocks, a river running through. |
| 11 | The Strange Privilege of Being Alive During a Technological Revolution | A hand crank connected through gearing to an output that is a single lightning bolt. |
| 12 | When Your Career Stops Being Your Identity | A name badge, drawn exactly, with the lower line — the role — left as an empty rule. |
| 13 | The Last Generation That Remembers the Before-Time | Two tape reels connected by a ribbon. The left reel is full. The right one is empty and still turning. |
| 14 | Why We Need Things That Are Useless | A beautifully drafted mechanism — gears, linkage, bearings, all correct — with no output shaft of any kind. |
| 15 | Why Humans Need Pilgrimages | A footpath with distance markers counting down — 40, 30, 20, 10 as tick marks, not numerals — ending at one plain undecorated stone. |
| 16 | The People You Love Are Temporary | Two chairs side by side, identical, drawn in elevation. One seat is worn concave. |
| 17 | The Strange Gift of Getting Older | A cross-section of tree rings in which the outermost rings are the widest. |
| 18 | Can You Become Wiser Without Becoming Smarter? | A maze in plan. The solution line does not run the corridors — it crosses the walls in a straight diagonal. |
| 19 | While We're Here | One very small standing figure inside an enormous pair of brackets that run nearly the full height of the frame. |

---

## The concept marks

Sixteen recurring marks, used as `.index-mark` in the margin beside the
paragraph they belong to. These repeat across essays, so they must read as one
family and never compete with the essay marks.

Draw these smaller in intent — simpler, fewer elements, no leader lines.

| Mark | The drawing |
| --- | --- |
| Attention | A narrow cone from a point, falling on a single dot. |
| Filter | A sieve in section. Many marks above it, three below. |
| Repetition | Five identical vertical strokes. The fourth is a hair shorter. |
| Scale | Four squares nested concentrically, each half the last. |
| System | Seven nodes joined by edges, none central, none isolated. |
| Threshold | A doorway in elevation, open, with nothing drawn beyond it. |
| Decay | A solid line that becomes dashed, then dotted, then stops. |
| Measurement | A pair of calipers closed on nothing. |
| Signal | A flat waveform with exactly one spike. |
| Time | An arc across a horizon line with three tick marks along it. |
| Water | Three parallel lines, the middle one broken. |
| Soil | Four stacked horizon bands, the top one thinnest. |
| Breath | A bellows in elevation, half compressed. |
| Memory | A rectangle with one corner folded forward. |
| Chance | A scatter of twelve dots with a fitted straight line through them. |
| Wonder | A hand magnifier held over an empty patch of ground. |

---

## Notes for the generator

**One mark per image.** Asking for a sheet of icons returns a sheet in which no
two strokes match, and the whole value of this set is that they match.

**Weight before likeness.** If a returned mark is charming but its stroke varies,
it is unusable — the set has to look machined. Regenerate rather than accept.

**The commonest failure is fills.** Generators reach for a solid black shape the
moment an object is recognisable — the tear, the chairs, the figure. Every one of
these is an outline. Say so again in the request if it comes back filled.

**Second commonest is thick-and-thin.** Anything that reads as brush, ink pen or
woodcut is wrong. The reference is a drafting pen with one nib.

**Do not add type.** Numerals, labels and captions all come from the layout. A
mark with text baked into it cannot be reused at 4 mm.

**Keep the originals at 1000 px on transparent.** They are traced to vector
before they go into the book, and a mark on a white square cannot be traced
cleanly.
