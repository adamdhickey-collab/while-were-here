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
- `cover-03-circular-systems` remains unmade. If it is ever generated, `orb`
  becomes worth re-comparing — it was judged on the square plate clipped to a
  circle, which is enough to judge a composition and not enough to judge a
  drawing.

## Stages III–IV stay unproven until an essay needs them — 19 Aug 2026

The dark-ground inversion at the peak of the arc has never rendered. Every page
in the book so far is Stage I.

**Decided: wait for the essay.** No test spread.

*The risk being carried:* the stage system is the book's main structural idea and
it is currently only tokens. If the inversion does not work when it is finally
built, it will be discovered after the surrounding book is already set.

*Cheapest mitigation if that risk ever needs reducing:* set `stage: 3` on any
existing essay for one build and look. It costs one line and no content.
