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

---

## One margin note was spending a payoff two pages early
*22 Aug 2026*

`why-ordinary-days-may-be-the-point-of-life.md` carried
`marginNote: The route repeats. The world does not.` on the spread ending at
folio 18. That sentence is also the closing line of block **s8a**, on folio 20 —
where it lands as the payoff of a deliberate build:

> The light changes. / Birds arrive and leave. / A house gets painted. /
> Someone who used to walk beside you no longer does.
> **The route repeats. The world does not.**

A reader met the line in the margin, turned one page, and found it again as the
thing the passage had been walking toward. The payoff was spent before it
arrived. The margin note is gone; the body copy keeps it, because that is where
it is earned. The slot is left empty — `.reading__note` is placed at
`grid-column: 8/13; grid-row: 3`, so removing it empties that cell and nothing
reflows; on the page it now reads as air beside the taped-in lake survey.

**Two other things made this a fault rather than a device.** It was the only
margin note in the book that duplicated body copy. And every margin note in
every other essay is a sourced claim from the fact ledger — starlings, Physarum,
the London taxi drivers, the Pew figures. This essay has two aphorisms instead;
the other, "Most of life is not a highlight reel", is not duplicated anywhere
and was left alone.

**The same audit found two more repeated sentences, and neither is a fault.**
Recorded here so a later pass does not "fix" them:

* `It was what happened when a body moved beyond the length of a wire.` —
  body copy near folio 88, restated by the **closing** spread near folio 96. The
  essay ends by returning to its own line. That is a callback, and it works.
* `You have never once experienced a room. You have experienced a paraphrase.` —
  a dedicated `type: pull-quote` spread near folio 22, then the line in flow near
  folio 27. A pull quote is *pulled from* the text by definition; five pages and
  a spread of its own read as foreshadowing, not as an accident.

The third repeat, `Personal data export generated 19 August 2026.`, appears three
times because each of the three reproduced Meta records states its own
provenance. That is correct and must stay.

---

## The book had no ladder protection, only a declaration that said it did
*22 Aug 2026*

`src/styles/typography.css` carried `-webkit-hyphenate-limit-lines: 2` in the
body rule. It is a WebKit property. Blink has never shipped it, and neither it
nor the unprefixed `hyphenate-limit-lines` is supported in the Chromium that
renders this book's press PDF — `CSS.supports` in that same binary answers
**false to both** and true to `hyphenate-limit-chars`. The declaration had never
done anything. Asking for a limit is not the same as getting one, and the rule
read as protection for as long as it sat there.

Two three-line hyphen ladders were sitting in the composed pages as a result:

* folio 64, the closing spread of *The Intelligence Outside Your Head* —
  **vulnerable / database / understanding**
* folio 121, the closing movement of the final essay —
  **photograph / knowledge / attention**

The second is the worse one. That is the last essay in the book arriving at its
point, and it was arriving down a staircase of hyphens.

**The fix is a less eager minimum, not a per-word intervention.** Nothing in
this book is justified — the prose is ragged right — so hyphenation here is
tightening the rag, not preventing rivers, and being less eager about it costs
nothing. Raising `hyphenate-limit-chars` from `8 4 4` to `10 4 4` clears both.
Measured across the whole book:

| minimum | hyphenated lines | ladders |
| --- | --- | --- |
| 8 | 70 of 1074 (6.5%) | 2 |
| 9 | 58 (5.4%) | 0 |
| 10 | 40 (3.7%) | 0 |
| 11 | 27 (2.5%) | 0 |

**9 was rejected even though it passes.** "knowledge" and "attention" are nine
letters, so a minimum of 9 leaves both hyphenatable and clears that ladder only
through a reflow any copy edit could undo. 10 removes them by rule. No page
overflowed at any setting, and the page count held at 130 throughout.

**`npm run breaks` is the real guard**, and it is now the nineteenth check in
`npm run verify`. Worth knowing how it finds a hyphenated line, because the
hyphen is not findable: Chromium inserts it into the line box as generated
content, so it is in no text node and no Range. The script never looks for the
glyph. It maps every character to the line box it landed in, then asks whether
the character following a line's last character is also a letter — if it is, the
browser split a word, which is what a hyphen *is*. Exact, and it cannot be
fooled by a real hyphen in the copy, because a real hyphen is a character and
would be the last one rather than absent.

It also checks the fault no CSS property can prevent: a word hyphenated across
the **foot of a column**, where the reader turns the leaf holding half of it.
There are none, and there were none before.

---

## The house-style check was two word boundaries away from working
*22 Aug 2026*

`npm run verify` has policed American spelling since the imprint brought
"colour-graded" onto a printed page. It passed every run. It was matching each
word as `\b<word>\b`, and each of those two boundaries was hiding a different
class of fault.

**The leading boundary hid compounds.** `\bcolour\b` cannot see "watercolour" —
there is no boundary between "water" and "colour". Three of those and two
"millimetres" were in printed alt text.

**The trailing boundary hid inflections.** The list held `neighbour` and
`realised`; "neighbours" and "realise" both walked past, and so did "centred",
because the list has "centre". The list had already tried to solve this by
listing "colours" and "coloured" beside "colour" — which is the tell. A list of
base forms cannot be completed by adding more base forms.

Between them: **`watercolour` ×3, `millimetres` ×2, `realise` ×2, `centred`,
`neighbours`, `kerb`** — nine spellings on the page, every run green.

**Two of them were written by this session.** "Watercolour blooms" went into the
maple alt text an hour after the same check had caught a bare "centre" in the
same field, and "nearest neighbours" went into it in the same edit — while the
three sibling plates got "neighbors". The check looked like it was working, and
it was, on exactly the words nobody compounds or inflects.

**Now matched by stem**, `\w*stem\w*`, which reaches compounds and inflections at
once, with the whole offending token reported rather than the stem. Two guards
were needed and both came from real false positives on the first run:

* `BRIT_ALLOW` — "organism" and "organist" contain `organis`; "programmer" and
  "programming" contain `programme`. All correct American English. Without the
  set the check would have failed on the Physarum credit and on the essay about
  machines.
* **`grey` keeps a hard tail.** It is the one stem that cannot take `\w*`,
  because "greyhound" is spelled that way on both sides of the Atlantic. It gets
  an explicit `(s|ed|ing)?\b` instead, so greys and greyed are caught and the dog
  is not.

Verified in both directions: greyhound, organism and programmer injected into the
built page all pass; "watercolour" and "neighbourhoods" both fail and are named
individually. The stem list also grew from 22 words to 58, which is how `kerb`
was found at all — it was never on the old list in any form.

---

## The fact check could not read the numbers the book actually prints
*22 Aug 2026*

Check 17, "every number in a margin note is in the fact ledger", has been green
since it was written and reported **"150 distinct figures, no margin note citing
anything else."** It matched `\b\d[\d,.]*\b`. Digits only.

**This book sets most of its figures as words.** The attention essay prints
"people picked up their phones around eighty-five times a day". Ten margin notes
contain a spelled-out number, and **three contain no digit at all** — so for
those three the check was verifying nothing whatsoever while reporting a total
that made it sound exhaustive. Two of the three carry the whole claim:
`eighty-five` IS `smartphone-checks`, and `four` IS `working-memory-four-chunks`.

This is the same shape as the two other faults found today — a check that looks
like it works, on exactly the inputs nobody uses. `-webkit-hyphenate-limit-lines`
was a property the engine ignores; `\bcolour\b` could not see "watercolour"; this
one could not see any number the book spells out.

**Numbers words are normalised on both sides, not evaluated.** "thirty trillion"
contributes 30 rather than thirty million million, and the ledger's own "thirty
trillion" contributes 30 as well, so the two agree without this check becoming a
number parser. Scale words are ignored deliberately, and compounds are read
before bare words so "eighty-five" gives 85 and not 80 and 5.

**The book was already right.** All ten notes resolve against the ledger; the
figure count went 150 → 153 and nothing failed. That is the moment worth fixing
a blind check — while it still costs nothing. Verified by changing "eighty-five"
to "ninety-three" in the essay: the old check passed it silently, the new one
reports `the-secret-life-of-attention: 93`.

---

## Mutation testing: who checks the checks
*22 Aug 2026*

Three checks in `npm run verify` were found blind in one day, each by accident,
each having reported success for as long as it existed. A green check and an
inert check are indistinguishable from outside. The only way to tell them apart
is to break something on purpose and see whether anything notices.

`npm run mutate` does that. Each mutation names a file, an exact string, and the
check that should go red; it patches the file, runs `verify`, reads that check's
line, and puts the file back. It refuses to start unless the working tree is
clean, snapshots every file before touching it, restores in a `finally`, and
re-checks the tree at the end.

**Fourteen mutations, and the first run found two problems — one real, one mine.**

**The real one.** Changing the Shikoku margin note from "88 temples" to "87"
passed silently. 87 is in the ledger: it is a page number in *Behavioral and
Brain Sciences* 24(1): 87–114, a paper about working memory. The check pooled
every figure anywhere in the ledger, including page ranges, volumes and issue
numbers, and that pool answered yes to **28% of every integer from 1 to 200**.
Citation metadata now contributes **years only** — notes do legitimately cite
them, and the Physarum note's 2010 exists nowhere but a publication year. Pool
153 → 98 figures, automatic-pass 28% → 22%, and no real margin note fails under
the narrower rule. Still not tight, and it should not be oversold: a wrong
"four" will always resemble some other four. It closes the page-range class.

**Mine.** The alt-text mutation replaced a *prefix* of a subject rather than the
whole value, so the sentence was merely shortened and the alt text was still
present. The check passed — correctly — and I recorded it as blind. A mutation
that does not produce the fault it names slanders the check. Rewritten to empty
the whole value; it bites.

**Fourteen of fourteen now caught. Eight checks have no mutation at all**, and
the script prints them every run with the reason each is awkward to synthesise —
page count cannot be mutated without breaking the build, the diagram-label check
needs geometry moved rather than a string swapped, the derivative check needs a
file deleted from disk. **That list is the honest part of the output.** A suite
that reports "14 proven to bite" and stops is claiming a coverage it does not
have, which is the exact failure this script exists to catch.

---

## The mutation harness found a fault the check was written to catch
*22 Aug 2026*

Three of the eight checks recorded as "awkward to synthesise" were not. Two were
ordinary string edits and the third needed only a moment's thought about what
the check actually reads — the spread check fires on a file that is on disk,
absent from the book, and not marked `Unplaced`, so the mutation is to take a
legitimately unplaced image and delete only its marker. **Listing a check as
hard to mutate is a claim that should be re-tested, not inherited.** Seventeen
mutations now, five checks still uncovered and printed every run.

**One of the three found a live fault, and it is the best argument for the whole
exercise.**

`ground-stage` reported blind. My first instinct was that the mutation was bad
again — it had been twice already. It was not. A ground carries **two** stage
records: `section`, a string reading "Stage IV", and `stage`, a number. The
check read only `section`.

`ground-05-imagine-to-make` said `section: "Stage IV"` and `stage: 3`. Its own
revision note records the section being corrected from III to IV on 22 August —
**the same day, by a correction aimed directly at this drift** — and the number
beside it was left behind. The check then reported "8 grounds, all matching their
essay", because it never looked at the number.

Nothing printed wrong. The build takes its stage from the essay frontmatter, not
from the image record, so the numeric field is documentation and `ctx.stage`
never saw it. But this is precisely the drift the check exists to catch, one
field over, and it survived a correction aimed at it because the check was only
half-looking. Both records are now compared against the essay.

**The pattern across today.** Four checks have now been found looking at the
wrong thing: a CSS property Chromium ignores, a regex that could not see
compounds, a matcher that could not read spelled-out numbers, and a comparison
that read one of two fields. None of them ever failed. All four looked healthy.
The only reason any of them surfaced is that something went looking for faults
they should have caught rather than reading their output.

---

## The label check had been measuring the wrong part of the picture
*22 Aug 2026*

`npm run labels` exists because a leader line once ran through the word
REMEMBERED, between the B and the E, in blue, at 300 mm, and shipped. The fix
moved the label to x=840. The check was written so it could not happen again.

Putting the label back at x=768 — the exact geometry that shipped, with the
leader `M613 300 L 832 300` running straight through it — the check reported
**"6 labels across 1 figure, nothing drawn through any of them."**

`scripts/label_ink.py` was deriving its pixels-per-CSS-pixel scale from the
label boxes themselves:

```python
scale = W / max(1, max(b['x'] + b['w'] for b in boxes))
```

That assumes the rightmost label touches the right edge of the figure. **No
label does.** Every box was placed a few percent too far right, so the check
sampled a window offset from the word it was guarding. On the mutated diagram
the window caught only the tail of the leader — about 52% of the box against a
55% threshold — and passed **by three points.**

The scale is now the figure's own CSS width, which `labels.mjs` already knew
exactly and simply was not passing. With that one argument the same mutation
reports *"a stroke runs down it, 100% of the box."*

**This is the fifth check today found looking at the wrong thing**, and the
sharpest of them. The other four were blind to a category of input — a property
the engine ignores, compounds, spelled-out numbers, one of two fields. This one
was blind to *the fault it was built for*, on the exact geometry that caused it,
and it had been reporting all clear the whole time.

Twenty of twenty-two checks are now proven to bite. The two without mutations
are printed every run: `page count`, which cannot be mutated without breaking
the build, and `every reproduced entry reaches the page`, where the build prints
every entry it has so a discrepancy has to be manufactured somewhere the harness
cannot reach with a string swap.

---

## Auditing the PDF, and auditing the checker that audits it
*22 Aug 2026*

With `pdfcheck` in place, four more questions were put to the delivered file.
All four came back clean, which is worth recording — a negative result measured
is worth more than an assumption held.

* **Images.** Every page whose HTML carries an `<img>` or `<svg>` has an image
  or drawing on the corresponding PDF page. None dropped. The gap between "93
  unique images" from `npm run dpi` and 78 XObjects in the PDF is deduplication:
  a ground spans two pages and is embedded once.
* **Dark grounds.** Stages III and IV invert — `--ground: charcoal/void`,
  `--ink: paper`. If one of those grounds failed to print, pale ink would land
  on cream and the page would be blank. 29 stage-3/4 text pages measured, all
  dark. And the inverse, which is just as bad: 40 stage-1/2/5 text pages, none
  printing dark.
* **CJK.** All 24 CJK characters in the book reach the PDF. They appear in the
  reproduced Meta advertiser list — "Yuguo雨果跨境" on page 75 — where a missing
  glyph would be a hole in a record the book reproduces *because* it is exact.

**And the check itself was wrong.** `pdfcheck` compared text after
`re.sub(r'[^a-z0-9]', '', s.lower())`, which deletes every non-ASCII character
before comparing. It could not have seen a missing CJK glyph or a dropped
accent — the very thing the third bullet was testing. Written this session,
blind from birth, and found the same way everything else was found today: by
testing the check instead of reading its output.

Now `''.join(c for c in unicodedata.normalize('NFKC', s).lower() if c.isalnum())`
— letters and digits in any script, NFKC first so a decomposed accent from the
PDF matches a composed one in the DOM. Proven both directions: a real string
containing 雨果跨境 is found, the same string with one glyph changed is not, and
the old ASCII-only comparison **passed the corrupted string**.

That makes six checks in one day found looking at the wrong thing. The last one
was mine, written an hour earlier, to catch exactly this class of fault.

---

## Block paragraphs, not indented ones
*22 Aug 2026 — Adam's call*

The indents read as unclean. They were also doing the job twice: an indent and
the ragged line above it both mark a paragraph break, and one of them is
redundant. The book now sets paragraphs flush left with a **6 mm gap**.

**6 mm is not a new number.** `.note-page .prose p + p` has used `margin-top:
var(--sp-4); text-indent: 0` since the note page was built, so the rest of the
book now agrees with a decision it had already taken in one place. At 11.5 pt on
1.62 the line is about 6.6 mm, so the gap is a little under one blank line —
enough to separate decisively without the column falling apart. **3 mm was tried
and rejected**: the break is there but you have to look for it.

**It cost nothing.** The obvious worry was that this book is composed, not
flowed — every page is written to fit its slot, so adding space to every
paragraph should push copy past the trim. Swept at 2, 2.5, 3, 4 and 6 mm:
**zero pages overflow at any of them.** 130 interior pages, unchanged, and the
hyphenation figures barely move (1077 lines to 1073). The composed pages had
more slack than anyone had measured.

**One trap, and it is the reason to write this down.** There are TWO indent
rules. `.prose p + p` in typography.css is the obvious one; `.prose--cols > p +
p` in layouts.css is more specific and covers the two-column reading pages,
which is most of the book. Changing only the first produces a page that has
gained its paragraph gap AND kept its indent — which looks, at a glance, like
the change half worked. It had: the rule applied everywhere except where it
mattered. **Both have to move together**, and each now carries a note pointing
at the other.

## The weight check, and why it had to move — 23 Aug 2026

`typography.css` states the house rule plainly: *the display serif appears at
900 and at no other weight.* A list of selectors enforces it. **The list has now
been forgotten twice** — the dedication, which read as a different family on the
page that gets read hardest, and `.cover-back__line`, which printed
FalutinTitle-Medium on the back board while the front board two inches away
printed Ultra.

Both times the rule was written down and simply not applied, and both times it
was found by eye long afterwards. So the check stopped trusting the list and
started asking the browser: every element that actually renders in the display
family and is not at 900. It caught the fault on its first run.

**And then mutation testing caught the check.** It reported
`? display-weight — could not read`. Not a failure of the check — a failure to
be *readable*: `scripts/mutate.mjs` decides pass or fail by scanning verify's
✓/✗ lines, and the check lived only inside `breaks.mjs`, which prints `⚠`. It
was invisible to the one tool whose job is proving checks bite.

`hyphen-ladder` had the answer already: breaks emits `--json` and verify
consumes it and prints its own line. The weight findings now travel the same
way. Verify has twenty checks, and mutation reports **21 of 21 proven to bite,
0 blind.**

The general rule, worth keeping: **a check that cannot be mutated is a check
nobody should trust.** If a new check lives in a browser script, surface it
through verify's JSON handoff, and add the mutation in the same edit — not the
next one.

## A pull quote nobody could read — 23 Aug 2026

`closing--plate` goes on every closing recto. It names the SLOT, not the
contents: the figure inside it renders only when the spread declares an
`image:`. Two closings declare none.

Earlier today the closing quote over the Año Viejo fire got a scrim and pale
type, keyed on `.closing--plate.closing--quote`. That selector is true of pages
with no photograph at all, so the rule fired on a bare cream page and set a full
page of display type in paper cream on cream. **Measured 1.07:1.** It is the
pull quote that closes "The Beauty of Systems Nobody Designed" — *Order is
sometimes a verb performed by many small things* — and it was invisible.

The class now tells the truth: `closing--onplate` is added only when a
photograph exists, and the three lightening rules key on that.

**The other imageless closing was fine, and knowing why matters.** "The Last
People Who Remember Waiting" closes at stage 4, where the ground is already
dark, so its pale quote read at 16.23:1 — not because the rule was right but
because the page happened to be dark under it. One bug, two pages, and only one
of them showed it.

Measured after, on rendered pixels rather than computed styles — computed style
cannot see a photograph behind text, and reported a meaningless 1.00:1 for the
page that was always fine:

| closing | ground | before | after |
| --- | --- | --- | --- |
| Beauty of Systems | cream, no plate | **1.07:1** | **14.27:1** |
| Last Generation | dark, no plate | 16.23:1 | 16.23:1 |
| While We're Here | the fire, scrimmed | — | **16.36:1** |

## Numbers in the body copy — swept 23 Aug 2026, and deliberately NOT made a check

`verify.mjs` checks that every figure in a MARGIN NOTE is in the fact ledger.
The body prose was never swept, and it carries figures too. It has now been
swept: eleven numeric claims across the essays, six of them in the ledger and
five not.

**All five are correctly outside it**, and the line the book is drawing is
sharp:

| in the copy | what it actually is |
| --- | --- |
| a maple "I did not see for **eleven years**" | Adam's own life |
| "in the last **twenty years** an entire industry has been built" | general history |
| "a feed is **ten thousand** suggestions" | deliberate rhetoric |
| "if you live for **eighty years**" | a hypothetical |
| "a child can spend **twenty minutes** watching water move" | illustrative |

Every number that is a claim ABOUT THE WORLD is in the ledger — four chunks of
working memory, ninety seconds, the eight minutes of sunlight. Every number that
is personal, hypothetical or rhetorical is not. That is the correct rule and the
book already follows it.

**So this is not becoming a check, and that is the finding.** A checker that
flagged body figures against the ledger would report all five of these on a
clean book. Five false positives is not a strict check, it is a check that gets
switched off — and the same reasoning kept the layout-reference check's phrase
list narrow on the same day. The distinction between a claim and a turn of
phrase is not mechanical, and pretending otherwise would cost more than it
catches.

## The press PDF did not bleed, and nothing could see it — 23 Aug 2026

**The file that goes to Saal carried live bleed on 11 of its 132 pages.** The
closings, field-note plates and dividers extended their 3 mm; the cover, all
eight essay openers, and every page's own ground — cream and dark stages alike —
stopped dead at the trim line. Any outward drift in the cut would have printed a
paper-white sliver along the fore-edge of nearly every page, most visibly on the
dark spreads.

No check could see it. `verify` reads the composed HTML, where `--bleed-out` is
0 by design. `pdfcheck` reads the text layer, and bleed has no words. The @page
rule reserved the bleed box and drew the crop marks, so the file looked like a
press file in every viewer, including this project's own.

**The cause took three wrong hypotheses to reach**, each killed by a
one-page harness rather than a seven-minute build: not the pseudo-element's
z-index, not `var()` resolution, not `marks: crop cross`. The harness matrix
settled it: **Vivliostyle fragments any layout box that crosses the page's
bottom edge.** Ink may overhang the top, left and right; the bottom is clipped
dead. The first harness "proved" bleed worked because it only measured the top —
the same one-edge blindness that made 11 pages look like a working system.

**Two escapes survive fragmentation, both paint rather than layout:**

* every page's ground now bleeds through a `box-shadow` ring on `.page::before`
  — a shadow is ink, not a box, and fragmentation never sees it;
* every full-bleed photograph keeps its layout box at the trim and scales its
  paint by `--bleed-scale` (306/300 on press, 1 on proof). For `object-fit:
  cover` imagery the visible crop is identical to the old inset extension.

The directional cases — band tops, field-note sides — were already correct,
because only the bottom edge fragments. The scrim gradients that cross the
bottom still stop at trim; their residual exposure is an unscrimmed photograph
sliver, not white, and is accepted.

`scripts/bleed.py` (`npm run bleed`) keeps it fixed: it walks in from every
trim edge of every page and fails when ink that touches the trim does not
continue past it. Its own history is part of the record — its first threshold
counted the book's cream as bare paper and reported 64 failures on a file with
eleven, and its success path crashed the first time it ever passed, because
the failure path had been exercised all afternoon and the success path never
once. **526 edges judged across 132 pages, all clean.**

### The fix validated against the proof, not just against its own check

Two follow-ups the same afternoon, because the surgery created a new class of
risk — press-only differences that no proof check can see:

* **No text sits inside a scaled element.** Swept the composed book: every
  `figure--bleed` and `.bleed` element contains imagery only. Had a caption
  lived inside one, it would have printed 2% larger on press than on every
  proof anyone had ever reviewed.
* **Every press page was diffed against its proof page inside the trim.**
  Median difference across 132 pages: **0.17** — identical. The full-bleed
  pages differ exactly as designed: counter-scaling the press render by 1/1.02
  about the centre collapses page 117 from 39.8 to 13.4, page 103 from 31.2 to
  9.9, page 43 from 24.2 to 6.6 — the residue being resampling noise on busy
  foliage. A wrong image would not respond to counter-scaling at all. The 2%
  centre-magnification is the same visible-crop change the old inset extension
  produced; what the reader sees is unchanged.
