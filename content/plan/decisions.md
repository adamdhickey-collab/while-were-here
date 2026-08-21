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

## Stages III–IV stay unproven until an essay needs them — 19 Aug 2026

The dark-ground inversion at the peak of the arc has never rendered. Every page
in the book so far is Stage I.

**Decided: wait for the essay.** No test spread.

*The risk being carried:* the stage system is the book's main structural idea and
it is currently only tokens. If the inversion does not work when it is finally
built, it will be discovered after the surrounding book is already set.

*Cheapest mitigation if that risk ever needs reducing:* set `stage: 3` on any
existing essay for one build and look. It costs one line and no content.
