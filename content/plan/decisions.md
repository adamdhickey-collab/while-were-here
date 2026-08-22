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
