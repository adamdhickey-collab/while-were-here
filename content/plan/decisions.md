# Decisions

Settled calls, with the reasoning that was on the table when they were made.
**These are not open questions.** If a future pass wants to reopen one, it needs
a new argument, not a restatement of the old one.

---

## The plates may invent their records — 19 Aug 2026

The composited imagery carries survey dates, catalogue numbers, magnifications
and a scale bar on a micrograph that is not of anything.

**Decided: keep as-is.** The records are visual fiction the reader is invited to
enjoy rather than to believe, which is a legitimate position for an art book —
the same one a novel takes when it prints a fictional map.

*The argument against, recorded because it was real:* the book's thesis is to
attend more closely to the actual world, and invented data carrying the visual
authority of a real record works against that from inside. The readers most
likely to buy this book are the ones most likely to notice.

*What follows from the decision:* be consistent about it. If the plates are
fiction, they should not later be mixed with genuine sourced records on the same
spread, because that is the position that cannot hold. If real archival material
is introduced later — Haeckel, Blossfeldt, a Rumsey map — it should sit in a
role the reader can distinguish, and it must still carry its real credit.

## The composites keep their baked-in type — 19 Aug 2026

Nineteen of twenty-three images arrive with labels, captions and data set into
the picture, in faces that are not Falutin, Archivo or Plex Mono.

**Decided: keep the composites.** The mismatch is accepted as part of a collage
aesthetic.

*What follows:* the layout's treatment layer — `.specimen-card`, `.taped`,
`.label`, contact-sheet captions, inset-card chrome — stays switched off wherever
`composite: true` is set. That machinery is built and working; it is dormant, not
dead, and it still runs for any non-composite image. Do not delete it, and do not
"fix" the composite rules by re-enabling the chrome.

The consequence to accept knowingly: baked type cannot be corrected, restyled or
translated later, and it will not match the book's faces at 300 mm.

## The subtitle is "Small essays on attention, time, and being alive" — 19 Aug 2026

**Adam's decision, made in session on 19 August.** Board three's line, "Essays on
ordinary days and hidden worlds," is out.

His words: the old line made the book "feel like it's too much about a mushroom
trip," and he wanted that "a little less obvious." The diagnosis was that
"hidden worlds" agreed with the cover artwork instead of pulling against it — the
art is already watercolour blooms over a contour form with mycelium on the back,
so the words and the picture were saying the same thing and the object tipped
toward the psychedelic. Three replacements were offered and he chose this one,
which is the line the README was already using.

The principle worth keeping: **when the graphic is lush, the words go plain.**

> This entry previously recorded the opposite decision, on the reading that the
> change was an unexplained revert inside an unrelated commit. It was not. It was
> a deliberate choice with a stated reason, and it is restored. Do not revert it
> without asking Adam directly.
>
> **Challenged and upheld, same day.** Another session was told in isolation to
> use board three's line, set it, and was then shown this record. Adam confirmed
> this version stands. The line has now survived being changed twice, which is
> the strongest evidence in this file — treat it as closed.
>
> The argument only got stronger in between: the cover was settled as `bleed`,
> which puts the artwork edge to edge at full strength. "When the graphic is
> lush, the words go plain" applies more now than it did when it was written.

**It appears in exactly two places**, both driven from `subtitle` in
`content/book.json`: the cover footer and the title spread. If it ever reads
differently in those two places, something has edited a template instead of the
data.

## The cover is `bleed` — 19 Aug 2026

Four treatments were built and compared at full trim size: `plate` (artwork as a
specimen inside the page), `bleed` (artwork edge to edge, title running off the
trim), `orb` (the artwork as a single circle with the title over its upper limb)
and `window` (artwork visible only inside the letterforms).

**Decided: `bleed`.** It is the only one of the four that survives being seen
from across a room, which is the job a cover has before any other. A 300 mm
square is read at two metres before it is read at arm's length, and at that
distance a cover gets one shape, one colour and one word cluster.

*What follows from the decision:*

- The artwork carries a soft veil under the title. A 150 pt Didone has large
  counters that fill with whatever is behind them, and without the veil the
  plate and the type competed letter by letter. Do not remove it to "let the
  artwork breathe" — that was the state it was in, and it was the problem.
- **The back cover stays quiet on purpose.** All three mood boards argued for a
  calm cover; `bleed` spends that quiet on the front, so the back — cream, the
  handwritten lake line, one small botanical — is now where the restraint lives.
  Making the back loud too would leave the object with no rest in it.
- The other three variants stay in the codebase and in `cover-options.html`.
  They cost nothing, and the comparison is worth being able to re-run. They are
  not live: `coverVariant` in `content/book.json` is the single switch.
- **Stage 4 is Part III, and the dividers now announce the climax — 21 Aug 2026.**
  The book's most vivid zone was one essay — the quietest one — reached mid-part
  with no announcement, while the divider imperatives read Observe, Notice,
  Understand, Integrate: *Expand* was the one imperative no divider ever said.
  Three changes resolve it as one decision. Essay 05 joins Essay 06 in stage 4,
  so the peak is a pair: the new intelligence arriving and the old default
  dying — expansion forward and backward from the same present. Part III's
  divider becomes that announcement: **Stage IV · Expand the aperture**, on the
  dark ground its machine drawing was always made for. And what EXPAND argues is
  now stated rather than implied: the aperture at its widest, both worlds
  visible from where the reader is standing — which is Essay 06's own closing
  claim. Stage 3 (Understand) becomes the unannounced inversion mid-Part II,
  carried by the one essay literally about understanding; the dark sneaking in
  unannounced is right for it, the peak arriving unannounced was not. Field
  note 03 follows its part to stage 4, keeping the interlude convention of
  breathing at the part's own stage. Essay-level climb: 1 1 · 2 3 · 4 4 · 5 5.

- **The Carson experiment is out, 20 August 2026, the day it went in.** The
  dividers briefly carried a colliding part numeral (340–430pt, tilted, cropped
  by the trim, second impression out of register) and the last essay's closing
  quote ran its final word off the fore-edge. Adam's verdict: not feeling the
  direction — too hard to steer without specific art direction behind it. Both
  reverts are clean (`git log --grep=collision`), so the treatment is fully
  recoverable if a directed version of the idea ever earns its way back. What
  survives from the attempt: the overflow detector's honesty (it flagged the
  intentional overflow, correctly), and the lesson that a borrowed energy needs
  its own art-direction page in `content/plan/` before it touches layouts —
  the same discipline every other visual system in this book already has.

- **The cover is `bleed`, re-decided 20 August 2026, the same day `orb` was
  tried.** With the drawing finally made, `orb` went live for a few hours and
  Adam's verdict on seeing it against the proof was unambiguous: the old cover
  was "100% better". So `bleed` is live again and `orb` returns to being a
  comparison in `cover-options.html`. Everything below about the orb treatment
  stays true and stays built — the unclipped `--drawn` handling, the regrounded
  artwork — so the comparison remains honest if it is ever re-run. The lesson
  worth keeping: the composition won the comparison at trim, and lost against
  the felt book. Judge covers on the proof.

  Re-running it turned up a fault the fallback had hidden. `.cover__orb` clips
  to a circle, which is how a square plate became one. The drawn artwork is
  already a circle, and its circle fills only 71% of its canvas, with the inset
  figures and the millimetre-high scale figures outside it in the cream. Clipped,
  those figures are cropped and a ring of the artwork's own cream shows between
  the drawing and the clip edge as a pale disc. So the drawn artwork is not
  clipped: `cover__orb--drawn`, set by the layout when the purpose-made file is
  the one in use, so the fallback keeps the clip it needs.

  **Settled the same day.** The artwork's cream came in at (243, 239, 229)
  against a page of (239, 233, 220) — four, six and nine values light — so
  unclipped it read as a faint lighter panel. Cropping it away was the
  alternative and it costs the scale figures, which are the only thing telling a
  reader the sphere is planet-sized rather than dish-sized.

  So the paper was moved instead of the drawing, with `npm run reground`. The
  correction is weighted by each pixel's distance from the paper colour, so the
  page's cream lands exactly and the artwork does not follow it: measured across
  the file, the drawing inside the sphere moved by 0.1 of a value and **the rust
  bloom moved by zero**. The paper now reads (239, 233, 220) uniformly from the
  circle's edge to the trim.

  A flat shift would have been the obvious way to do this and it is the wrong
  one: it regrades the artwork to fix its margin. `scripts/reground.py` explains
  the rest, and it is worth reaching for whenever an opaque asset arrives on
  somebody else's paper.

## The dedication is set at 900, like every other display line — 21 Aug 2026

`typography.css` states it in capitals: **the display serif appears at 900 and
at no other weight.** A selector list enforces it across the cover title, the
title spread, the dividers, the spine, essay titles, pull quotes, statements,
closing lines and drop caps.

`.dedication__line` was not in that list. It is a `<p>`, so it inherited 400 and
had been the only display type in the book below 900 — provable from the proof
PDF, which carried `FalutinTitle-Ultra` on 37 pages and `FalutinTitle-Regular`
on exactly one: page 5, the dedication.

That was an omission, not an exception. The layout comment on that page records
its two deliberate deviations — not centred, not the hand face — and weight was
never among them.

**Adam's decision, seeing both rendered side by side: 900.** The lighter cut is
genuinely pretty and suits what the code calls "the quietest page in the book",
but at a glance it reads as a different family from the cover and every essay
title the reader has already passed, and the book's own rule exists to stop
exactly that.

*What follows:* the weight is now declared in `layouts.css` rather than
inherited, with a comment saying not to remove it, and `typography.css` carries
a cross-reference at the rule itself. A display element that appears in neither
place is a silent bug — this one survived weeks of proofs.

Verified from the output, not the stylesheet: Ultra on 38 pages, Regular on none.

## Stages III–IV stay unproven until an essay needs them — 19 Aug 2026

The dark-ground inversion at the peak of the arc has never rendered. Every page
in the book so far is Stage I.

**Decided: wait for the essay.** No test spread.

*The risk being carried:* the stage system is the book's main structural idea and
it is currently only tokens. If the inversion does not work when it is finally
built, it will be discovered after the surrounding book is already set.

*Cheapest mitigation if that risk ever needs reducing:* set `stage: 3` on any
existing essay for one build and look. It costs one line and no content.

> **The wait is over and the risk did not land — 21 Aug 2026.** This entry is
> kept because it records what was true on 19 August, but it no longer describes
> the book. Measured in the built HTML today:
>
>     stage 1  40 pages     stage 4  32 pages
>     stage 2  16 pages     stage 5  32 pages
>     stage 3  12 pages
>
> Forty-four pages now carry the dark-ground inversion, across *The Intelligence
> Outside Your Head*, *The Strange Privilege* and *The Last People Who Remember
> Waiting*. It works. The essays arrived and took the stages with them, which is
> exactly what "wait for the essay" was betting on.
>
> One consequence worth chasing: [photo-selection-04](photo-selection-04.md) is
> still written against this entry's premise. It calls `IMG_1112` — the vaulted
> baths reflected in black water — "the single best find in this pass" and adds
> "if decisions.md ever wants to stop deferring the Stage III proof, this is the
> spread to build it on." Stage III is no longer deferred, so that frame is not
> a proof any more. It is simply a very good dark-ground photograph competing
> for a slot in a book with no free spreads, and it should be judged on that
> and not on a job that is already done.

## The press path works; the preflight is a separate question — 21 Aug 2026

Two independent faults were found on the way to the printer's file, and neither
would have shown up in a proof.

`npm run pdf:press` never set `BOOK_PRESS=1`. It built the trimmed proof and
then applied a press-ready preflight, so the file called press-ready would have
carried no bleed and no crop marks — every full-bleed photograph sitting exactly
on the trim, with a millimetre of ordinary cutting variance putting a white
sliver down the edge of the dog, the hive, the staircase and Adam's father.

And the preflight itself cannot run here. `--preflight press-ready` is a wrapper
around Ghostscript, via Docker or a local install, and with neither present it
does not fail — it hangs. Measured at 81 minutes, 0.0% CPU, no output, which is
indistinguishable from a slow build of this book. `npm run press:check` now runs
first and fails in a second.

**A press PDF built without the preflight is verified correct**, which settles
the important half:

    132 pages
    MediaBox   332 × 332 mm
    BleedBox   306 × 306 mm     ← trim + 3 mm all round
    TrimBox    300 × 300 mm     ← the finished book
    7 faces, every one subset-embedded

That is a file a printer can work from. Bleed and trim boxes are what "press
ready" means for this book.

**Still open, and it is one question to Saal, not a decision to make here.**
Whether they want PDF/X-1a at all. It is an offset-litho convention, and this
book prints photographically on FUJIFILM Crystal Archive HD. If they do want it,
`brew install ghostscript` is the cheapest route. If they do not, the preflight
flags should come out of the script rather than sit there implying a requirement
nobody confirmed.

## Copy overflow became a real check — 21 Aug 2026

`verify.mjs` reported this as *"not checkable here — needs a browser"*. That was
honest, and it was the third state invented specifically so a tick would not sit
beside an unrun check. It was also the least useful line in the file, because
**this is the fault the book is most exposed to**: pages here are composed, not
flowed, so nothing reflows to rescue a paragraph that grew by a line. The copy is
simply past the trim, invisible in the source, and first seen on paper.

`scripts/overflow.mjs` now drives the rule in a headless browser and reports the
folio, the block and the millimetres it runs over by. Three things about how it
was built are worth keeping:

**The rule is not duplicated.** It lives in `src/scripts/preview.js`, which
already exposed `window.book.check()` for automated proofing. The script calls
that. Two copies of an overflow rule would drift, and the copy that drifts is
always the one nobody is looking at.

**It was proven to fail before it was trusted.** Injecting one fat paragraph into
a `.prose` produced `folio 13 · recto · reading · two column` with the overrun in
millimetres. This matters because two checks in this same file had already been
caught passing vacuously — copy overflow tested the built HTML for a class only a
browser adds, and consent was hardcoded `true`. **A check that has never been
seen to fail has not been tested.**

**It found a second bug on the way.** The local server sent `text/html` with no
charset, so Chromium decoded a UTF-8 document as windows-1252 and every middle
dot, curly quote and em dash came back mojibake. `shots.mjs` had the same server
and the same omission — which means every spread PNG rendered to judge
*typography* has been rendering its punctuation wrong. Both now send
`charset=utf-8`.

The check runs in CI as well. `overflow.mjs` looks for Playwright's Chromium and
then for a system Chrome, and a GitHub runner has one, so a push that overflows a
page now fails the build. Where no browser exists it goes back to being a note —
never a pass.

## The handed-over page, and what it is for — 21 Aug 2026

Two objects other people made and gave to Adam, photographed as a catalogue and
printed as the last interior page: a small hardcover with *I love hiking with
you* drawn inside it, and a green construction-paper book he stapled together as
a child. Adam's decision when asked was that these should be **a centerpiece**,
not an appendix, and the final page with a full mount each is that position.

The page is called *Handed over* and it earns the title twice. Both objects were
handed to somebody. So is the book the reader is holding — which is the whole
reason it ends here rather than beginning here.

**The plates are mounts, not boxes.** Both images were `object-fit: contain`
inside a fixed 78 mm box, which is not the same thing as a catalogue plate: a
4:3 object got a letterbox, a 3:4 object got a pillarbox, and `.figure` paints
`--paper-deep`, so each printed with grey bars on two sides, in a different
place for each. The border now shrink-wraps the photograph — a true 4 mm mount
on four sides, and the plate is the shape of the object, which is what the
comment above the rule always claimed it was doing.

**Two open items, both in [open-questions](open-questions.md).** Whether a third
object exists, and whether one word of a transcription is right.

## The spine read "WHILE WE· RE HERE" — 21 Aug 2026

The title of the book, on the spine of the hardcover, with a low round dot and a
word-space where the apostrophe belongs. Found by screenshotting `cover-wrap.html`
at 2× and enlarging, not by reading the CSS.

**It had been looked at twice before and misdiagnosed both times.** The first
look, at a small screenshot, called it broken and applied `margin-inline:
-0.30em`, which made it read *WRRE*. The second look rendered six tracking
values at 4×, concluded the default was correct, and settled on `-0.06em` as a
mild tightening. Both were reasoning about **tracking**, and tracking was never
the cause.

**The cause is `text-orientation`.** The spine is `writing-mode: vertical-rl`
with the default `text-orientation: mixed`. Under UAX #50 that rotates
characters whose Vertical Orientation is `R` — every Latin letter — and leaves
characters marked `U` **upright**, centred in a full-width em box. U+2019 is
`U`. So the letters lay down sideways and the apostrophe stood up, in a box
nearly five times too wide.

Measured rather than argued: the apostrophe's advance was **28 px at a 24 px
font-size**. `text-orientation: sideways` takes it to **5.75 px**, which is the
font's own 0.159 em plus the line's 0.12 em tracking. The typeface was never at
fault — every weight of Falutin Title carries U+2019.

With the orientation right, the negative margin is not merely unnecessary, it is
**wrong**: rendered at 4× across 0, −0.02, −0.06 and −0.10 em, zero is correct
and by −0.06 em the apostrophe crowds the R. The rule and the `.spine__apos`
span the build was emitting for it are both gone.

**The lesson is the one this project keeps relearning.** Two rounds of careful
measurement produced a confident wrong answer because they measured the wrong
property. What finally settled it was reading a single number out of the browser
— the character's advance — and noticing it was impossible. When a fix does not
hold, stop tuning the value and go and find a different quantity to measure.

The spine appears only in `cover-wrap.html`; Saal produce the real wrap from
their own template. That does not make it cosmetic — the mockup is what the wrap
gets checked against, and a spine nobody trusts is a spine nobody checks.

## Do not read letterforms below the resolution that supports reading — 21 Aug 2026

Three times in one day, reading small text off a low-resolution view produced a
confident wrong answer. It is the same mistake each time and it is worth a rule.

**The spine.** An early look at a small screenshot called the apostrophe broken
and applied `margin-inline: -0.30em`, which made the line read *WRRE*. The
screenshot was too small to show what was actually happening; the real fault was
`text-orientation` and needed a measured character advance, not an eye.

**The VHS shelf.** At 1,200 px the third spine read *LIFE IN THE EAST LANE*, and
that was written down as a manifest correction. At 4× magnification the letter
is plainly an **F**. The manifest was right and the correction would have
introduced an error into printed alt text.

**The child's book.** `intelligence-07-child-hand` is 1536 × 1152 and the four
disputed letters occupy about 230 × 130 real pixels. Enlarged they read as
plausibly `nn`, `rn` or `rin`. That one was **not** written down as a correction,
because the file cannot settle it — see [open-questions](open-questions.md).
That is the right outcome of the same situation.

**The rule.** Before correcting any text read out of an image, enlarge to at
least 4× and confirm the letterform, and check what the *file's* native
resolution actually supports. If a glyph occupies fewer than roughly 40 × 40
real pixels, no amount of enlargement adds information — it only adds
confidence. Then say the file cannot answer, and go to the object.

**What made the difference in the one case that went right** was noticing the
pixel budget before trusting the reading. That check costs one line of
arithmetic and it is the only thing separating a correction from a fabrication.

## The nave takes the closing of essay 07 — 21 Aug 2026, Adam's call

"Place the alcobaca nave." The closing recto of *The Body Cannot Skip the Hill*
now carries `pilgrimage-06-closing-nave` — Adam's photograph of the Alcobaça
nave (29 Sep 2024) — in place of the 87 dpi Pexels composite of a hand on
stone.

**The square crop was chosen by eye from three candidates**: vault-weighted,
centred, and benches-forward. Benches-forward won (full 4284 px width, offset
1128 px from the top) for one reason: it keeps the pool of sunlight lying
across the pavement in the foreground, and the spread's display line is
"carrying the route in its feet." The floor is the argument. Adam's own 9:16
render keeps more vault but yields 272 dpi in a square against the original's
363, so the crop was taken from the original instead, and the entry's revision
records both paths.

**What moved with it:** the imprint dropped from six credits to five without
being touched — the build derives credits from the composed pages, so Elle
Hughes's attribution left when her photograph did. Five of the six remaining
non-Adam images at the start of today are now four. Shot-list item 10 (the hand
on stone) is superseded; items 8 and 9 stand. The three-worst-plates list is
now two: the bench closing and the cursor closing, both still 87 dpi, both
still stock.

**And the prose needed nothing.** The worry recorded this morning — that the
essay "ends on the gesture in the photograph" — turned out to be conservative:
the closing blocks end on the yellow arrow and ordinary steps, not on the hand.
Beside the empty nave, "The visible place cannot contain every reason brought
toward it" reads as a caption that was waiting for this picture.

## The baths open Part III — 21 Aug 2026, Adam's call

"Place the alcazar baths." They had no pre-agreed slot, so the slot was chosen
by the documents' own logic: photo-selection-04 called the frame "the single
best find in this pass" and said Stage III's definition — luminous line work on
a dark ground — "this photograph already is that." The Part III divider is the
page where the book inverts, described in its own manifest entry as "the first
page that is not cream," and it was carrying a generated drawing at 85 dpi.

Now it carries `part-3-divider-alcazar-baths`: the twelfth-century cistern
beneath the Alcázar, gold vaults doubled exactly in still black water, at 363
dpi. The part statement beside it — "You are inside the change, not after it"
— and the blurb's "a world that has already stopped being the previous one"
both read differently, and better, over a piece of infrastructure that has
outlived eight centuries of the world changing around it. The divider's dark
recto now continues the photograph's own water.

The square crop (offset 250 px, full width, from three candidates by eye) keeps
the vault crowns and the pierced window completing its oval in the reflection;
the water-forward candidate carried a soft blur intruding at the original's
bottom edge and was rejected for it. Colour as shot — the selection note's
instruction "do not lift the shadows" is now the entry's standing rule.

What this displaces: the machine drawing's subject (room-sized computer, chip,
cursor) is not lost to the book — the machine timeline plate inside essay 05
carries the same argument, and the cursor still closes that essay. The book's
generated full-bleed count drops by one more; the dividers are now three real
photographs (birds, baths, screen-print) against one generated (branching).

## The FABIOLA sign goes into essay 01, beside the sentence it makes literal — 21 Aug 2026, Adam's call

"Place the fabiola street sign." No pre-agreed slot, so the slot was chosen by
argument: essay 01's third reading spread carries the passage about turning
people into categories — "The label makes someone familiar enough that we
occasionally stop seeing the person underneath it" — and its inset was a
generated survey plate. The photograph of Fabiola smiling from the foot of a
blank Seville wall, under a tiled sign bearing her own name, is that sentence
made literal. Caption: "The label, and the person underneath it."

Two compositional moves rode along, both improvements the swap exposed rather
than costs it imposed: the inset moved from verso to recto, onto the page whose
prose it answers, and the habituation margin note moved from recto to verso,
beside the routine-and-change prose it actually annotates — it had been sitting
next to the people passage, which it has nothing to say about.

The crop (4:3 landscape from the portrait original, offset 900 px, from three
candidates by eye) keeps the sign whole at the top, the blank wall's expanse in
the middle — which is the joke — and her face and smile at the bottom.

**The consent note travels with the entry and is still open.** She is posed and
looking at the lens, so the candid rule never applied — but it is her picture
as much as Adam's, and the manifest still says: ask her before it is printed.
That ask is Adam's, and it is now the ninth on the list.

The book's images by Adam: 38 of 105 in the book. The generated inset count in
essay 01 drops by one; the essay that opens the book now holds a photograph of
the person the dedication will likely name beside the dog, the lake, and the
tree.

## The bridge takes essay 07's image-essay spread — 21 Aug 2026, Adam's call

"Place the cordoba bridge." The slot chose itself once the spread's prose was
read: the image-essay page sits beside flow-2c — the passage about encounters
on the shared route, ending "different lives have been given the same temporary
direction" — and its plate was the generated stamped booklet, which illustrates
the stamps prose from two spreads earlier. Two walkers going away up the Roman
bridge at night, a lantern beside them, the Mezquita floodlit on the far bank:
that is flow-2c photographed.

The caption changed with the picture: "Crossing the Roman bridge at Córdoba,
after dark. The route asks everyone for the same next step." One honesty rule
shaped it — the two walkers are together, so the caption must not borrow
flow-2c's strangers; the tie is the shared next step, not the not-knowing.

The 2:3 crop (offset 336 px from the left, three candidates by eye) holds the
whole floodlit Mezquita and gives the walkers the space they are walking into.
533 dpi at the 192 mm slot. A faint lens flare sits mid-sky: as shot.

The stamps lose nothing — flow-1b still carries them in prose, and the field
notes sidebar still mentions the booklets. Essay 07 is now photographed by Adam
end to end: opener, band insets, image-essay plate, and closing, with only the
two generated bands (yellow arrow, tending feet) remaining.

## The dome enters beside the honeycomb, named as the exception — 21 Aug 2026, Adam's call

"Place the muqarnas dome." The frame carried a condition from photo-selection-04
— it is designed, which is the objection; it looks grown, which is the use;
caption it as the exception or not at all — so the slot had to be one with a
caption. Essay 03's image-essay spread had the right prose and the wrong plate:
its text is flow-2c, the honeycomb passage ("the geometry tempts us to imagine
a diagram passed through the hive"), while its termite drawing illustrates
flow-2b, one spread earlier. Same mispairing the bridge fixed in essay 07,
found the same way: by reading what actually sits beside the slot.

The dome now faces the honeycomb prose as the case where the temptation was
true. The caption names it — "The essay's exception — this ceiling had a
diagram" — and the spread's handwritten annotation changed from "without a
foreman" to **"this one had a foreman"**, which had to change anyway: the old
note would have printed a false claim beside a royal commission. A terminology
gloss ("honeycomb vaulting") was drafted and dropped rather than introduce an
unsourced naming claim; the visual rhyme is already on the page.

Centre crop, 3808 × 5712 — the vault is symmetric — for 755 dpi at the 192 mm
slot, the sharpest plate in the book. The termite section is Unplaced; its
argument lives whole in flow-2b's prose. Essay 03's plates are now the hive,
the dome, and Adam's two insets, with the two archive bands (starlings, slime
mold) as the only pictures in it he didn't take.

## The light on the wall enters essay 02, and the crop found the phone — 21 Aug 2026, Adam's call

"Place the light on a wall." The slot: essay 02's image-essay spread, whose
prose is flow-2 — "Sitting still works. Ten minutes in front of one painting
works better than a museum" — and whose plate was the generated dog time-motion
diagram. She is the prose's argument performed: alone in a stone room, watching
colored light on a bare wall.

**The vertical crop found something the landscape reading missed: her phone is
in her hands, behind her back.** In the essay whose narrator confesses to
"usually checking something I do not need to check," that gesture — the thing
carried, held, and pointed away — is the argument's cost photographed. It was
first seen at crop scale, which is the day's oldest lesson arriving one more
time: the subject line was rewritten from the crop, not from memory. The
sidebar names the phone once, flatly, and nothing else points at it.

The copy that traveled with the swap: caption rewritten to the room and the
light; all four field-note lines rewritten against what the crop contains
(rope, window out of frame, phone, the hour); the hand note is now "ten
minutes, one wall." The spelling check caught "coloured" in the new copy before
it reached a proof — the first time that check has fired on live copy, and it
paid for itself.

Crop A of three (offset 600 px): full light scatter, rope, receding amphorae;
the rejected slice admitted a stacked chair. 566 dpi at the tall slot. The dog
time-motion plate is Unplaced — the dog's argument stays in flow-2's prose, and
the dog herself is in six real photographs elsewhere.

## The esplanade takes essay 07's first band, and a layout rule surfaced — 21 Aug 2026, Adam's call

"Place the fatima esplanade." The first library frame horizontal enough for a
3:1 band, and the band under flow-1a/1b is the right one: "A shrine reached
after forty days is physically the same structure that could be reached by
bus," over the shrine itself — basilica, colonnade, the gilded Sacred Heart on
its column, crowd barriers ready across wet paving, and a few dozen people on
ground built for a hundred thousand. The band crop (offset 1300 px, three
candidates by eye) is the only slice that holds both verticals complete.

**The placement surfaced a layout rule nobody had written down: a verso inset
card covers the left two-fifths of the band beneath it.** The yellow arrow —
a kerb close-up — survived that occlusion for weeks without anyone noticing
the overlap was structural. The esplanade's basilica vanished behind the gorge
card on the first composed render, which is what made the rule visible. Fix:
the inset moved to the recto (where "worn by something that only went one way"
sits happily beside the Henro and Camino prose), and the margin note stayed
recto after a second discovery — **a note assigned to the verso of a banded
spread is silently covered by the band.** It rendered in the HTML and appeared
nowhere on the page; only looking caught it, twice in one placement.

The yellow arrow is Unplaced but not diminished: flow-4b closes the essay on
it in prose, which is where its real work always was. 615 dpi at the band. The
consent note was rewritten for the band scale — every figure under a
centimeter — with the old full-bleed caution kept for anyone who enlarges it.

## The cloud takes the last generated band in essay 07 — 22 Aug 2026, Adam's call

"Place the montserrat cloud." A portrait frame and a 3:1 slot — the hardest
pairing yet, and it worked because the pour crosses the frame diagonally: the
middle slice carries cloud breaking over the dark cliff with the Catalan plain
running to weather at the left. Three candidates: the higher slice holds the
summit cross but loses the pour's force (and the cross would print three
millimetres at band scale); the lower is inside the cloud and loses the plain.
The pour won.

It sits under flow-2a — "Heat decides when to stop... attention returns to
water, grade, weather, and the next marker" — weather as the route's arbiter.
The tending-feet band is Unplaced; the blister keeps its life in the prose.

The switchbacks inset moved to the recto, per the occlusion rule the esplanade
surfaced yesterday, and its caption lands beside "the path is a social
structure. Someone maintains the marker" — which a mule train on a canyon wall
answers exactly. **Essay 07's two reading spreads are now architecturally
symmetric**: full band on the verso, inset card and margin note on the recto.
The essay carries eight of Adam's photographs and zero generated images — the
first essay in the book to get there.

## Alt text was invisible to every check on the page — 22 Aug 2026

Found by auditing the eight images placed on 21 August, not by a failure. The
audit asked a narrow question — do the subject lines I wrote in a hurry describe
the pictures? — and turned up something structural underneath.

**`verify.mjs` could not see alt text at all.** It builds its readable text by
stripping tags, and `alt="..."` lives inside a tag, so every check that reads
prose has been blind to it for as long as the checks have existed. Nine placed
images were carrying British spellings in their alt attributes; the house-style
check had never been able to read a word of any of them. Fixed: the checks now
read printed text **plus** alt text. It fired immediately on all nine.

Fifty-two manifest fields were corrected to American spellings by a pass that
**skips anything inside curly quotes**, so Rob Cruickshank's "Slime mould
(P. polycephalum)" is untouched on the imprint — the exemption written this
morning doing its job unattended.

**Four subject lines described the crop instead of the picture** — "cropped
square", "a 3:1 band from the Montserrat frame". That is the format, not the
content, and a screen reader would have read the aspect ratio aloud in place of
the mountain. All four rewritten as pure description; the crop reasoning was
already in `revision`, which is where it belongs. **New rule: `subject` is what
is in the frame. How the frame was made goes in `revision`.**

**A twelfth check now guards this**, and its first draft was wrong about every
case it found. It flagged 19 empty alts as faults; all 19 were correct — eight
decorative grounds at 8 percent opacity, and three screen-print separations
whose containing stack already carries `role="img"` and an accurate
`aria-label`. The check now knows both exemptions, and the comment in the file
records the calibration so nobody re-litigates it. Verified to fail by
silencing one real plate, and to keep passing with the grounds still empty.

While checking that aria-label's claim — "watching a dog swim" — the frame was
enlarged 3× and the dog is there: a head with an ear, and a wake ring around
it, abstracted by the screen-print reduction but present. The label is honest.

## Resolution is not the brief — 22 Aug 2026, Adam's correction

Adam, mid-audit: *"Don't be overly concerned about maximizing the DPI on the
images. I'm more concerned about getting the right imagery in there in the first
place to tell a compelling story alongside the text."*

Recorded because the work was actively going the wrong way when he said it. A
measuring tool (`npm run dpi`) had just been built, the composed book measured,
and the two lowest plates identified as Adam's own Facebook-capped frames — and
the next step underway was swapping the essay-08 opener for the same photograph
at three times the pixels. **The same picture. No storytelling gain whatsoever.**
That swap was abandoned mid-crop.

**The standing priority, from here:** does each picture earn its place beside the
text it sits with? Resolution is a constraint to respect, not a target to chase.
An 81 dpi photograph that is the right photograph beats a 363 dpi one that is
merely available — and this book already has an example, `before-time-01-father-portrait`
at 108 dpi, kept deliberately because the frame was chosen on the photograph and
not on the arithmetic.

`npm run dpi` stays. It answers "will this print acceptably", which is a real
question at the end. It must not be allowed to become the question that drives
selection.

**One thing worth keeping from the abandoned line:** the entire 21 Oct 2018 dog
walk is in the library at 4000 × 3000 — 175 frames, camera times matching the
Facebook "Taken" times exactly, including all four the book uses. That matters
not because of pixels but because **the book currently shows four small crops of
a walk it has 175 frames of.** If the contact sheet or the essay-08 opener is
ever reconsidered, there is a whole afternoon to choose from rather than four
squares somebody already picked.

## The essay-01 closing photograph is real now, and the page around it is not — 22 Aug 2026, Adam's call

"place P1080416." The closing plate of *Most of Life Is a Tuesday* is a drawn
field-notebook leaf with a photograph taped to it, and the photograph was
generated. Its own subject line could not decide what it showed: *"late-afternoon
lake, an empty path, **or** a dog walking away."*

**The photograph was swapped, not the plate.** The mount was measured
(568,505–2232,1558 at 4000 px, axis-aligned, no rotation) and the real frame
composited into it. The ruled leaf, the tape, the print border, the illegible
squiggle and the blank three-quarters are original artwork and are untouched —
including the instruction that came with them, *"the blank is doing the work —
do not fill it."*

That treatment was worth keeping and the imagery audit's own argument says why.
The leaf does not pretend to be a moment that happened; it is openly a drawing,
and a good one. What was wrong was the photograph inside it claiming to be a
day. Now it is one: **21 Oct 2018, 3:34 p.m.** — the same walk the contact sheet
three spreads earlier is drawn from, twenty-three minutes after the last of
those three frames. The essay ends on the end of the afternoon it has been
showing, under "Maybe the ordinary days were the important parts."

Chosen from a 132-frame contact sheet of the whole walk, and deliberately not
`P1080372`, which is lovely and is another dog-nose-down-in-leaves — it would
have echoed both `walk-01` on the same spread and the essay-08 opener.

The 4:3 original was cropped to the mount's 1.58, trimming empty sky from the
top. The crop is better than the full frame, which is worth saying plainly: the
mount's shape improved the photograph.

**One honesty note carried in the entry.** It now reads `origin: own photograph`
because the photograph is the subject, but `composite: true` and the revision
both state that the leaf around it is still drawn. The book's tally of Adam's
photographs should be read with that in mind — this is a real picture in a drawn
mount, not a photograph of a notebook.

## Two more checks, both added while the answer was still correct — 22 Aug 2026

Written during the imagery audit, not after a failure. Both guard things that
were right at the time, which is the only moment worth adding a check: a fault
found by a reader is a fault that already printed.

**Grounds agree with their essays about the stage.** Grounds are labelled by
stage, not by part, because the stage decides whether a page is cream or
charcoal — and a ground drawn for one and printed on the other is nearly
invisible. Four of the eight had already drifted a stage behind when this was
noticed: the essays' stages moved as the arc was proved on 21 Aug and the
manifest labels did not follow. Every one of the four turned out to be right
artistically — checked on the page, pale linework on charcoal where it belonged
— so the drift was documentation only. Nothing was watching, and now something
is.

**The contents page agrees with the book.** `contents.json` restates by hand
what `book.json` and the essay frontmatter already know: four parts, their
titles, and the essays under each in order. Nothing kept them in step. Rename an
essay, reorder a part, move one between parts, and the printed contents keeps
the old answer — silently, on page five, where it is the first thing a reader
uses and the last thing anyone re-reads. Verified to fail on both drift modes:
one word changed in a title, and two essays swapped within a part.

Fourteen checks now. The three added in the last day — alt text, grounds,
contents — all guard things no proof would show and no reader would report
politely.

## The back cover's drawing was printing as a pasted box — 22 Aug 2026

Found by looking at the back cover, which had never been examined closely — it
is the surface Adam's parents will read first when they pick the book up.

The botanical drawing sat in a **visible rectangle**: its ground measured
(238,232,217) against a cover of (243,239,230) beside it, a hard-edged panel
about 92 mm wide on cream. Δ of (4,7,13), and the eye finds that instantly on a
flat field.

**A note already in this file said the drawing needed no blend, and it was right
about the wrong thing.** It compared the drawing's ground to `--linen` and found
them within a value or two, which is true. But the rendered cover at that spot
is not `--linen`: `.cover::before` lays a white highlight, a warm lower gradient
and the linen texture across the whole field, and `.cover__inner` carried
`z-index: 2` — so every child of it, this drawing included, painted **above**
that overlay. The paper got lit. The drawing did not.

**Two baked fixes were tried and both failed. They are worth recording because
each looked obviously right.**

*Keying the paper to alpha.* A line drawing should not carry an opaque ground at
all, so the plan was to make the paper transparent and let the cover show
through the ink. It cannot be done on this artwork: pure paper runs 230.4–234.2
and **the faintest mycorrhizal lines sit at 232.3 — inside the paper's own
variation.** No threshold keeps the lines and drops the ground. The first
attempt erased the quietest passage of the drawing and I only caught it by
comparing renders.

*A flat colour correction.* Shift the ground by the measured Δ and leave the ink
alone. Also fails: the drawing carries its own vertical tone and the cover
carries its own gradient, so matching the top overcorrects the bottom. It
produced a box that was too light instead of too dark.

**The fix is three lines of CSS and no change to the artwork.** `isolation:
isolate` on `.cover-back` to contain a negative z-index, `z-index: auto` on its
inner grid so it stops forcing a stacking context, and `z-index: -1` on the art
so the overlay falls across it. The drawing now receives exactly the light the
paper beside it receives — measured Δ **(0,1,2)** — and it will keep doing so at
any position, at any cover size, if the gradients are ever retuned.

The ink lightens very slightly under the overlay. That is correct: it is the
same veil the cover's own texture sits under, and the drawing now belongs to the
page instead of resting on it.

**The lesson is the one this project keeps paying for.** The earlier note did
real work — it measured, it reasoned, and it wrote down a conclusion. It
compared the asset to a token instead of to the composed page, and a token is
not what prints.

## A diagram label had the ring drawn through it — 22 Aug 2026

Figure 02.1, *What the editor kept*, on the attention essay's diagram spread.
The word **REMEMBERED** sat at x=768 while the Admitted ring reaches x≈817, so
the blue ring ran straight through the word, between the B and the E, in colour,
at 300 mm. Found by enlarging the composed spread — invisible at thumbnail size
and obvious at 4×. The leader now runs to 832 and the label starts at 840.

**And fixing it introduced a worse bug, which is the part worth recording.** The
note explaining the geometry was written as `{/* … */}` — JSX comment syntax —
*inside a JavaScript template literal*, where it is not a comment at all. It
printed. Four lines of explanation went into the SVG as visible text on a
diagram, the build succeeded, and every one of the fourteen checks passed.

It was caught by grepping the built HTML on a hunch, which is not a system.

**So there is a fifteenth check now: no build artifacts in the output.** It
looks in every emitted page for `{/*`, `*/}`, `${`, `[object Object]`,
`undefined` and `NaN`. All six were absent when it was written, which is what
makes it a clean signal — any of them appearing is leakage by definition. Proven
to fail by injecting a stray JSX comment.

Every page of this book is assembled from template literals. A mistake inside
one does not throw. **It prints.** That was worth learning cheaply.

Also checked and left alone on that spread: the diagram's proportions are
unsourced — Admitted reads as 24% of Available, Remembered as 0.1% — and its
code comment called them "to scale". No source exists for such a ratio and none
is claimed on the page: the prose hedges precisely ("something like them is the
shape of a life"), the legend is qualitative, and the axis is labelled *one
afternoon*, which makes the drawing about a duration rather than a measurement.
The page is honest. Only the code comment overstated, and it is the sort of
thing that misleads the next person to open the file.

## A check for lines drawn through words — 22 Aug 2026

Two figures have now printed with something across a label: Figure 02.1 had the
Admitted ring between the B and the E of REMEMBERED, and `walking` had its rust
curve caption laid over the word `correction`. A third turned up while building
the check — the Available frame's bottom edge running two units under the
baseline of *You, arriving*, through its descenders.

Three of the same fault, all found by chance, all invisible at thumbnail size.
That is a check.

**`npm run labels`** renders each code-drawn figure twice — once with every
`<text>` hidden — and looks inside each label's box in the second render. Whatever
ink is there is ink that prints under the words. No bounding boxes for beziers,
no geometry: the browser has already done the drawing.

**Two calibrations were needed, and the first version was wrong.**

*Ink percentage is the wrong measure.* `attention-diagram` lays a 1,400-dot
stipple across its whole field, so every label inside it reads 5–6% ink. The
first run flagged all of them. What separates a fault from texture is
CONTINUITY: a stroke crossing a word leaves a long unbroken run across the box;
stipple leaves specks. It now measures the longest consecutive run of ink in any
row and column and flags only runs spanning more than half the box.

*Hiding all the text hides text-on-text.* The `walking` fault was two labels
overlapping — invisible to a method whose whole trick is hiding labels. So the
boxes are also compared with each other, pairwise.

Verified to fail on both modes: restoring the frame line under *You, arriving*
reports a 100% horizontal run; adding a second label over `Admitted` reports a
40% box overlap. Sixteen checks now, and this is the second in two days that
exists because the same mistake happened twice.

## The advertisers page said eleven and meant forty-six — 22 Aug 2026

The reproduced-record spread in *The Strange Privilege* prints 154 advertiser
names on one charcoal page and explains itself underneath:

> Meta Platforms, "Advertisers using your activity or information". Personal
> data export generated 19 August 2026. Of the first 160 entries in export
> order, 154 are printed here unedited and unsorted; six are withheld. The 7,165
> beyond them are not printed because they would fill **eleven more pages**.

Two of the three claims check out — 160 − 154 = six withheld, and
7,325 − 160 = 7,165 beyond. The third is wrong and wrong by a lot. At the
density actually on the page, 7,165 names need **46.5 pages**. Eleven would
require 651 names per page, **4.2× what is printed**.

It matters more than an ordinary slip because this spread's whole claim is
fidelity — *"printed here unedited and unsorted"* — and it is a page a reader
can audit by counting one column and multiplying. The one number that was not
derived from the data was the one that was wrong.

Now: *"they would fill this page forty-six times over."* The page the reader is
holding becomes the unit, which is both accurate and better writing than a bare
page count.

**Checked at the same time and clean:** the other two reproduced records claim
only *"Reproduced in full, unedited"*, and their counts match their items
exactly — 31 and 23. No arithmetic to get wrong, which is the safer design.

## The margin notes were verified, and now they stay verified — 22 Aug 2026

The margin notes are the book's factual apparatus: starling flock sizes, Pew
adoption figures, working-memory capacity, the Camino's distance, how long
sunlight takes to arrive. Twenty substantive ones, against a 35-fact ledger.

**Checked in both directions for the first time and they are clean.** Every note
matches a fact; twenty facts declare a `usedIn` margin note; and **every number
printed in a note traces to the ledger** — 150 distinct figures, nothing typed
in from memory.

Nothing checked the second direction before. Facts declared which note they
served; no note declared which facts it drew on. A figure edited by hand after
the fact was written would have been answerable to nothing.

**A seventeenth check now closes that**, and building it needed one correction.
The first version matched each note to its single best-matching fact and
immediately reported two failures — both false. The before-time note draws on
**two** facts at once (home broadband and smartphone ownership), and the Physarum
note's "2010" lives in the source's publication year rather than in the claim
text. So numbers are matched against the whole ledger, source metadata included,
not against one fact. Verified to fail by changing 35 percent to 37.

**Scope is deliberately narrow.** Body prose is full of numbers that are
observations rather than claims — a pencil line at thirty-seven and a quarter
inches, eleven years under a maple, about a meter an hour, thirty minutes on a
Thursday afternoon. Demanding a citation for those would drown the signal. The
margin note is where this book makes claims, so the margin note is where the
check lives.

---

## The sources page, and the six citations it did not print
*22 Aug 2026*

Adam asked for a sources page. The book has no pacing blanks — 130 interior
pages, all of them used, and the ending is fixed: closing spread at 126–127,
field note at 128–129, handed-over on 130. A new leaf would have made 131.

It did not need one. The verso of the title spread was empty from the head down
to the imprint at its foot, and that page is already the book's apparatus page:
copyright, photograph credits, licences. Sources went above them under a 0.3pt
rule, in the same 7pt monospace. **The book is still 130 pages.**

**Titles are not printed.** With them the block ran 74 mm past the head of the
page — measured in a browser, not estimated — and the choice was between
dropping the titles and dropping the page. Author, publication and year locate
any of these in one search, which is the whole job of the line. The full
citation, title and URL included, stays in `content/plan/sources.md`.

**The real work was deciding what the page is allowed to say.**

`src/layouts/index.mjs` already carried a warning about this, written when the
imprint was built: the manifest outlives the layout. Two material breaks were
cut when spreads were trimmed to 130, their entries stayed in
`content/images.json`, and the printed imprint credited Poly Haven and two
Unsplash photographers for work that is not in the object — two of eight lines,
on the page whose entire job is to be accurate. The fix was to derive the
credits from the composed HTML, so a credit cannot appear unless its file does.

The fact ledger had drifted the same way, further. Six of 35 verified facts were
for passages the book no longer contains, and a sources page generated from the
ledger would have printed all six: an Apollo heat shield and a Block Island
meteorite whose material breaks went in the same trim, a peacock and a mimosa
from an older selection pass, a Sagrada magic square whose photograph is still
not in this repository, and `monastic-acedia`.

**No text matcher can decide this, and both were tried.** Matching a claim's
numbers against the composed book misses every figure the book spells out — the
attention essay prints "around eighty-five times a day", so `smartphone-checks`
reads as absent — while matching looser numbers picks up folios instead
(`sagrada-magic-square` "matched" on 14 and 33). Matching a claim's words is
worse: `peacock-structural-colour` matched, and the hit was **Peacock TV**, in a
list of streaming services. `scripts/facts.mjs` makes the same point about its
own matcher and reports rather than gates, which is correct and was left alone.

So the printed page filters on `usedIn`, and `usedIn` was made trustworthy. All
six are marked `Unplaced` — the marker `content/images.json` already uses for a
cut asset, and the predicate `scripts/credits.mjs` already tests — with the
reason and the date. The research is kept, because a claim whose passage was cut
may come back. 28 claims print.

**`monastic-acedia` is the one to remember.** The other five said things like
`"photo 177 — specimen label"`, a numbering from a selection pass that stopped
resolving to anything here long ago; unreadable as an address the moment you
look at one. This one said `"essays/the-secret-life-of-attention.md — flow-1b"`.
The file exists. The block exists. Only the prose inside it changed, and the word
"acedia" is on no page of this book. It looked resolvable right up until someone
grepped for the word.

**An eighteenth check now guards the address**: every `usedIn` must name an
essay file — and a block, if it names one — or an image id that exists, or be
marked `Unplaced`. Verified to fail in both shapes by reintroducing them. It
catches five of the six and **cannot catch the sixth**; the check's own comment
says so rather than implying a coverage it does not have. The approximate
reporter that runs alongside it did list `monastic-acedia`.

**Two smaller things fixed while setting it.** Page ranges now take an en dash
at the point of setting, leaving the ledger's plain hyphens as the publisher
wrote them. And where an institution is both author and publication the echo is
dropped — "Pew Research Center. Pew Research Center, 2025" and "Vodafone.
Vodafone newsroom, 2017". The first version of that test compared the authors
against publication *plus year*, so "nasaspaceplace" was measured against
"nasa2024" and no NASA line ever collapsed.

**The American-English check was taught one narrow exemption.** "UNESCO World
Heritage Centre" is that body's registered name; spelling it "Center" would name
an organisation that does not exist. Only the author and publication runs are
skipped, by class — the subject label beside them is Adam's own words and is
still held to house style, which matters, because one fact id in the ledger
reads `peacock-structural-colour`. The exemption was tested in both directions:
"colour" injected into a subject label still fails the check; injected into a
citation field it passes.
