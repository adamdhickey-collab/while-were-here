# What to do next

Three jobs for ChatGPT. Job 1 is the one that unblocks pages. Job 4 is done.

## Where the book is

| | |
| --- | --- |
| Production system | Done. Build, preview, proof PDF, press PDF, prompt generation all working. |
| Print geometry | 300 × 300 mm, settled, provisional on the printer's own template. |
| Type | Settled. Falutin Title / Familjen Grotesk / IBM Plex Mono / Caveat. |
| Cover | Settled: `bleed`. Subtitle settled. Both closed, see `content/plan/decisions.md`. |
| Essays | **All eight laid out.** Four parts, four dividers, four field notes. |
| Field notes | All four written and all four placed, one per part. |
| Images | 33 made and placed. **42 unmade**, which is now the book's largest open job. |
| Current extent | **138 interior pages. The printer's ceiling is 130.** |

The gap between 42 and 128 is almost entirely essays 3 to 8. Everything else is
finishing work.

---

## Job 1 — decide where eight pages come from

The whole book is laid out and it is **138 pages against a 130 ceiling**. That
is the binding problem now, and it is a decision rather than a task.

Every essay runs seven spreads: opener, reading, pull quote, reading, image
essay, asymmetric reading, closing. Essays 01 and 02 run six and eight. The
arithmetic:

| Change | Pages saved |
| --- | --- |
| Drop one reading spread from four of the six new essays | 8 |
| Drop the second band spread from every new essay | 10 |
| Cut one field note | 2 |
| Merge the two Part IV essays into one closing sequence | 4 |

Dropping a reading spread means folding two prose blocks onto one spread, which
the fixed-page model will refuse if the copy does not fit. The overflow detector
will tell you immediately, so this is cheap to try.

**The other option is a different printer.** Nothing in the build is
Saal-specific; 130 is their Professional Line maximum, not a law.

---

## Job 2 — generate the images

**42 images are unmade**, up from nine, because five essays arrived and each one
brought its own shot list. `prompts/image-prompts.md` carries a paste-ready
prompt for every one; `prompts/outstanding-brief.md` carries the same list with
the production rules at the top.

Start with the eight grounds. They are the faint scientific plates that sit
under body copy at 8 percent.
Every prompt is already written and copy-paste ready in
**`prompts/outstanding-brief.md`** — one fenced block per image. Read the two
rules at the top of that file once, then work down the list.

| Image | Aspect | Save as |
| --- | --- | --- |
| ground-01-habituation-decay | 1:1 | `public/images/illustration/ground-01-habituation-decay.png` |
| ground-02-attention-filter | 1:1 | `public/images/illustration/ground-02-attention-filter.png` |
| ground-03-local-rules-flocking | 2:1 | `public/images/illustration/ground-03-local-rules-flocking.png` |
| ground-04-extended-cognition | 1:1 | `public/images/illustration/ground-04-extended-cognition.png` |
| ground-05-imagine-to-make | 2:1 | `public/images/illustration/ground-05-imagine-to-make.png` |
| ground-06-density-thinning | 1:1 | `public/images/illustration/ground-06-density-thinning.png` |
| ground-07-convergent-routes | 2:1 | `public/images/illustration/ground-07-convergent-routes.png` |
| ground-08-nested-systems | 1:1 | `public/images/illustration/ground-08-nested-systems.png` |

Two things ChatGPT reliably gets wrong on these, so check before saving:
**transparent background** (no cream, no paper, no card), and **no text,
numerals or labels anywhere**. Ground 5 and ground 6 sit on dark pages and want
pale, near-white ink rather than charcoal.

The ninth unmade image, `cover-03-circular-systems`, is only worth making if you
want to re-open the cover comparison. The cover is settled as `bleed` and does
not need it.

Filenames must match exactly or the build will not pick the image up. Drop the
file in and the labelled plate is replaced on the next build.

---

## Job 3 — write the four field notes

One paragraph each, and they carry the only personal voice in the book. Paste
this whole block:

```text
You are writing four short interludes for a printed book of essays.

The book is "While We're Here" by Adam Hickey, a 300 x 300 mm hardcover of short
essays on attention, ordinary life, hidden systems and being alive. Between the
parts sit four FIELD NOTES. Each one is a spread: a real photograph from the
author's own life on the left-hand page at full size, and on the right-hand page
a single short paragraph with a place and a month under it. Nothing else. No
page number, no running head, no title.

A field note is not a small essay. It has no argument, no turn, and no lesson.
It is one person recording what was in front of them. The essays do the
thinking; these do the looking.

## Rules

- ONE paragraph. 70 to 110 words. This is a hard ceiling: the page is fixed and
  a long paragraph overflows it rather than continuing.
- Past tense, first person, plain. Specific nouns. Short declaratives.
- Describe what was actually there. Physical particulars only.
- End on an observation, not a conclusion. Do not tell the reader what it meant.
- No em dashes anywhere. Use a period or a comma.
- No rhetorical questions. No "and maybe that's the point". No mysticism, no
  transcendence, nothing psychedelic in register.
- Do not restate the photograph. The reader can see it. Write what the picture
  does not show: what came before, what was audible, how long you stood there.

## The four

1. THE LAKE, Lake Harriet, October. Photograph: the lake on an ordinary
   afternoon, boats moored, bright, nothing happening at length.
   Write: what the lake was doing, in plain sight, while you assumed it was
   doing nothing. No conclusion.

2. THE MOWER, the garage, October. Photograph: the serial plate on a lawnmower
   engine, model number, barcode, QR code, and the words "Data Rates apply".
   Write: a machine that would like to talk to your phone, found in a shed. Dry,
   not wry. Do not make a joke of it.

3. THE STREET, a street with nothing on it, October. Photograph: an empty
   suburban street, wires overhead, two small figures stopped on the sidewalk.
   Write: somebody stopping in the middle of an errand, and why that is the only
   part of the walk you will remember.

4. THE FIRE, the back deck, October. Photograph: a fire pit at dusk, a figure
   seated in profile watching it, trees behind.
   Write: the last evening warm enough to sit outside, written as if you did not
   know at the time that it was the last one.

## Deliver it as four blocks in exactly this shape

FIELD NOTE 1 - THE LAKE
[paragraph]
(word count: NN)

...and so on through 4. Nothing else. No preamble, no commentary.
```

Save each paragraph as the body of the matching file in
`content/field-notes/`, under the existing frontmatter, and change
`status: unwritten` to `status: written`. Until then the recto prints the brief
instead, which is why a proof PDF is also the writing list.

---

## Job 4 — done

All four field-note photographs are in the repo, square, at native resolution,
unretouched. Two things came out of it that need you:

- **Field note 2 changed subject.** The engine plate is 883 px and cannot hold a
  300 mm page, so the verso is now the mower from above and the plate runs as a
  taped specimen card on the recto at 70 mm. That is the size
  [photo-selection-02](../content/plan/photo-selection-02.md) always specified
  for it.
- **Field note 3 cannot be square.** At square, the two figures stop being
  incidental and become a couple facing the camera, which is the one thing the
  candid rule forbids. Run it as a wide band, or give the slot to another frame.
  See [photo-selection-04](../content/plan/photo-selection-04.md).

---

## The library has been read again

All 672 unique frames across all three folders, against what the book is short
of now. 41 selected, 6 blocked on rights, written up in
[photo-selection-04](../content/plan/photo-selection-04.md).

The one to look at first is the vaulted underground baths at 3213 × 5712. Stage
III is specified as "the page inverts, luminous line work on a dark ground" and
that photograph already is one. [decisions.md](../content/plan/decisions.md)
currently defers the Stage III proof until an essay needs it; this is the
cheapest way to stop deferring it.

Five things the library does not contain and no re-reading will produce. They
have to be shot, and four of them are within a mile of the house: a kitchen
table with a laptop while domestic life goes on around it, the dog under the
desk, before-time objects, a desire path, and a repeated view across four
seasons.

---

## Still open, for you not for ChatGPT

- **The six essay drafts are not on this machine.** `content/contents.json`
  records essays 3 to 8 as "drafted"; nothing matching those titles exists
  anywhere under `~/dev`, `~/Desktop`, `~/Documents` or `~/Downloads`. If they
  exist they are in ChatGPT. Worth searching that thread before commissioning
  fresh ones, because a rewrite to the format and the length budget keeps your
  voice and a fresh draft does not.
- **Stages III and IV have never rendered.** The dark-ground inversion is the
  book's main structural idea and it is still only colour tokens. Essay 05 will
  be the first to need it, and the baths photograph would prove it now.

- **The four field-note paragraphs are scene drafts, not verified memoir.** They
  were written from the photographs and the briefs, so the small physical
  details are plausible rather than remembered: what the garage sounded like,
  how long you stood at the seawall, which log hissed. Read them against memory
  and correct anything that did not happen. They are marked
  `status: written`, which means they set as prose rather than as a brief, not
  that they have been checked.

- **Part II now ends on a dark page and nothing warns the reader.** Essay 04 is
  Part II but stage 3, so the ground inverts halfway through a part whose
  divider is cream. Either move the inversion to the Part III divider by making
  essay 04 stage 2, or accept it as a deliberate mid-part turn. It is currently
  the second, by accident rather than by decision.
- **The two dark stages have now rendered.** Stage III sets cream on charcoal
  and Stage IV on near-black, both legible at trim size, with the display serif
  holding up at quote size. This was the risk carried in decisions.md and it is
  discharged.
