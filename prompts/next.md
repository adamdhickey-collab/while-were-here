# What to do next

Three jobs for ChatGPT. Job 1 is the one that unblocks pages. Job 4 is done.

## Where the book is

| | |
| --- | --- |
| Production system | Done. Build, preview, proof PDF, press PDF, prompt generation all working. |
| Print geometry | 300 × 300 mm, settled, provisional on the printer's own template. |
| Type | Settled. Falutin Title / Familjen Grotesk / IBM Plex Mono / Caveat. |
| Cover | Settled: `bleed`. Subtitle settled. Both closed, see `content/plan/decisions.md`. |
| Essays | **2 of 8** laid out in the repo. Six exist as drafts elsewhere and are not in repo format. |
| Field notes | 4 planned, **1** in the sequence, **0 of 4** paragraphs written. |
| Images | 33 made and placed, including all four field-note photographs. **9 unmade** (8 grounds + the orb cover). |
| Current extent | 42 interior pages. Target is 128. |

The gap between 42 and 128 is almost entirely essays 3 to 8. Everything else is
finishing work.

---

## Job 1 — draft the next essay

The fastest path is one essay at a time: paste the block below, get the draft,
save it to `content/essays/`, run `npm run dev`, and look at the overflow
outlines before commissioning the next one. Do essay 3 first and check the
pacing holds; then the remaining five can go out in a batch.

Each essay has its own file, already filled in with its title, part, stage and
frontmatter values. Open one and paste the whole fenced block into ChatGPT:

| # | File | Essay | Part |
| --- | --- | --- | --- |
| 03 | `prompts/essays/03-systems-nobody-designed.md` | The Beauty of Systems Nobody Designed | II |
| 04 | `prompts/essays/04-intelligence-outside.md` | The Intelligence Outside Your Head | II |
| 05 | `prompts/essays/05-strange-privilege.md` | The Strange Privilege of Being Alive During a Technological Revolution | III |
| 06 | `prompts/essays/06-before-time.md` | The Last Generation That Remembers the Before-Time | III |
| 07 | `prompts/essays/07-pilgrimages.md` | Why Humans Need Pilgrimages | IV |
| 08 | `prompts/essays/08-while-were-here.md` | While We're Here | IV |

They regenerate from [`content/plan/drafting-brief.md`](../content/plan/drafting-brief.md)
with `npm run draft`, so the brief stays the one place to change how all six ask.
Essays 05 and 06 carry an extra line about writing for a dark ground, because
those two are where the page inverts.

When it comes back, save it as `content/essays/<id>.md` using the `id` from its
own frontmatter, add it to `sequence` in `content/book.json`, then run
`npm run dev`. Spreads get assigned in the repo, not by ChatGPT.

---

## Job 2 — generate the eight grounds

These are the faint scientific plates that sit under body copy at 8 percent.
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
