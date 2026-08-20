# What to do next

Three jobs for ChatGPT and one for you. Do them in any order; job 1 is the one
that unblocks pages.

## Where the book is

| | |
| --- | --- |
| Production system | Done. Build, preview, proof PDF, press PDF, prompt generation all working. |
| Print geometry | 300 × 300 mm, settled, provisional on the printer's own template. |
| Type | Settled. Falutin Title / Familjen Grotesk / IBM Plex Mono / Caveat. |
| Cover | Settled: `bleed`. Subtitle settled. Both closed, see `content/plan/decisions.md`. |
| Essays | **2 of 8** laid out in the repo. Six exist as drafts elsewhere and are not in repo format. |
| Field notes | 4 planned, **1** in the sequence, **0 of 4** paragraphs written. |
| Images | 28 made and placed. **9 unmade** (8 grounds + the orb cover). 4 personal photographs chosen but not copied in. |
| Current extent | 42 interior pages. Target is 128. |

The gap between 42 and 128 is almost entirely essays 3 to 8. Everything else is
finishing work.

---

## Job 1 — draft the next essay

The fastest path is one essay at a time: paste the block below, get the draft,
save it to `content/essays/`, run `npm run dev`, and look at the overflow
outlines before commissioning the next one. Do essay 3 first and check the
pacing holds; then the remaining five can go out in a batch.

The block is written for the third essay. For the others, change the title and
part in the one bolded line near the middle and change `part`, `stage`,
`partTitle` and `number` in the frontmatter example:

| # | Essay | Part | stage |
| --- | --- | --- | --- |
| 03 | The Beauty of Systems Nobody Designed | II | 2 |
| 04 | The Intelligence Outside Your Head | II | 3 |
| 05 | The Strange Privilege of Being Alive During a Technological Revolution | III | 3 |
| 06 | The Last Generation That Remembers the Before-Time | III | 4 |
| 07 | Why Humans Need Pilgrimages | IV | 5 |
| 08 | While We're Here | IV | 5 |

**Paste everything in this block into ChatGPT:**

````text

You are drafting one essay for a printed book. Read all of this before writing.

## The book

*While We're Here* by Adam Hickey. A 300 x 300 mm hardcover, printed layflat on
heavy photographic paper. Eight essays, 128 pages, roughly half of it imagery.
It is a coffee-table book you can read straight through, or open at random on a
Tuesday. Subject matter is attention, weather, water, machines that are learning
to think, and the people who will not always be here.

It is not a blog, not a newsletter, and not a self-help book. There is no
listicle structure, no "here are five ways," no takeaway box, and no second
person imperative telling the reader to live differently.

## The eight essays and their parts

**I. Look Again** — Why Ordinary Days May Be the Point of Life · The Secret Life
of Attention
**II. What Are We?** — The Beauty of Systems Nobody Designed · The Intelligence
Outside Your Head
**III. The World Is Changing** — The Strange Privilege of Being Alive During a
Technological Revolution · The Last Generation That Remembers the Before-Time
**IV. While We're Here** — Why Humans Need Pilgrimages · While We're Here

The book is a progression, not a collection: observe, notice, understand,
expand, integrate. Part I is calm and domestic and light. Parts II and III get
denser and darker, literally so, since those pages invert to a dark ground. Part
IV comes back down. Write to the register of the part the essay sits in.

**The essay you are drafting is: The Beauty of Systems Nobody Designed, in Part II.**

## The length budget, which is not negotiable

An essay occupies five to eight spreads. A spread is two facing pages. The two
finished essays run:

| Essay | Spreads | Words |
| --- | --- | --- |
| Why Ordinary Days May Be the Point of Life | 6 | 1,389 |
| The Secret Life of Attention | 8 | 1,005 |

**Target 1,100 to 1,400 words of body prose.** Not 2,000. The pages are large,
the type is 13 pt, and images take roughly half the space. Prose arrives in
discrete blocks of **60 to 210 words**, each of which has to fit inside a fixed
page. Nothing reflows. A block that runs long does not push to the next page, it
overflows and breaks the layout.

Write to the budget from the start. Do not write long and offer to cut.

## What an essay actually consists of

Body prose is maybe 60% of the work. The rest is apparatus, and it is what makes
the book feel like a field guide rather than a document. Deliver all of it.

- **Deck.** One sentence under the title. States the turn the essay makes, not
  what the essay is about. Existing example: *"Attention is not a beam you point
  at the world. It is the thing quietly deciding what the world is going to be."*
- **Prose blocks.** Six to ten of them, 60 to 210 words each, in reading order.
- **One pull quote.** Under 20 words, aphoristic, load-bearing. It gets a whole
  spread to itself, so it has to survive that. Existing example: *"You have never
  once experienced a room. You have experienced a paraphrase."*
- **Two or three margin notes.** 25 to 45 words. **Factual, with real numbers.**
  This is where the science lives. Existing example: *"The average smartphone is
  unlocked between 58 and 80 times a day. Nobody decided this. It is the sum of
  very small decisions, none of which felt like a decision."* If you are not
  certain of a figure, say so explicitly in brackets so it can be checked. Do
  not invent statistics.
- **One set of field notes.** Three to five observational lines, present tense,
  no conclusion drawn. They read as somebody watching, not somebody explaining.
- **One notice.** Two or three sentences instructing the reader to do one small
  thing. This is the only place the imperative is allowed. Existing example:
  *"Walk five minutes of a route you know by heart. Find one thing you have never
  seen before. It is there. It has been there the whole time."*
- **Two or three image subjects.** Plain description of what should be
  photographed or drawn, one sentence each. Documentary and quiet. No one
  looking at the camera. Say what the picture is evidence of.
- **One hand annotation.** Two to four words, as if scribbled in the margin. It
  must not read as a sentence. Existing example: *"it isn't trying."*
- **One closing.** 50 to 80 words. It lands, it does not summarize.

## Voice

Plain, concrete, unhurried. Short declaratives. Specific nouns. The science is
load-bearing and always arrives as fact rather than as wonder, because the
wonder is the reader's job and the book does not do it for them.

Do this:
- Open on a physical particular, not on a thesis
- Let one concrete observation carry a paragraph
- Trust the reader to make the leap and then stop talking
- Use real numbers, real species, real mechanisms

Do not do this:
- No em dashes anywhere. Use a period or a comma.
- No rhetorical questions
- No "imagine that," "picture this," "here's the thing," "the truth is"
- No three-item parallel lists where two would do
- No paragraph that restates the previous paragraph in warmer language
- No sentence a picture is already making
- Nothing mystical or psychedelic in register. This is a book about noticing,
  and it must never sound like a book about transcendence.

## Deliver it in exactly this format

Markdown, frontmatter first, then prose with block markers. Copy the shape
literally.

```markdown
---
id: short-slug
number: "04"
part: II
stage: 2
partTitle: What Are We?
title: The Full Title of the Essay
deck: One sentence stating the turn.
runningHead: Short Title
readingTime: 6
pullQuote: Under twenty words, aphoristic.
marginNotes:
  - Factual note with a real number in it.
  - A second one.
fieldNotes:
  - Observational line, present tense.
  - Another.
  - A third.
notice: >-
  Two or three sentences telling the reader to do one small thing.
hand: two to four words
images:
  - One sentence describing a picture, and what it is evidence of.
  - A second.
closing: Fifty to eighty words that land rather than summarize.
---

<!-- block: open -->
The opening block. Sixty to two hundred and ten words.

<!-- block: flow-1a -->
The next block.

<!-- block: flow-1b -->
And so on, six to ten blocks in reading order.
```

Do not add spread types or layout instructions. Layout is decided in the repo,
not in the draft. Your job is the writing and the apparatus.

Before you send it back, count the words in the body blocks and state the total.
If it is over 1,400, cut it yourself and send the cut version.
````

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

## Job 4 — yours, not ChatGPT's

Four personal photographs are chosen but the files are not in the repo. They are
identified in `content/plan/photo-selection-02.md` (the lake is B011 /
IMG_5212). Export them at the longest edge available, crop square, do not
retouch, and save as:

```
public/images/personal/field-note-01-lake.jpg
public/images/personal/field-note-02-engine-plate.jpg
public/images/personal/field-note-03-street-and-dog.jpg
public/images/personal/field-note-04-firepit.jpg
```

Target 3600 × 3600 px. Preserve the imperfection, per the PERSONAL role.

---

## Two questions still open, for you not for ChatGPT

- **Where are the six existing essay drafts?** `content/contents.json` records
  essays 3 to 8 as "drafted", but nothing is in the repo. If those drafts are
  good, job 1 becomes a rewrite to the format and the length budget rather than
  a fresh commission, which is faster and keeps your voice.
- **Stages III and IV have never rendered.** The dark-ground inversion is the
  book's main structural idea and it is currently only colour tokens. Essay 4 or
  5 will be the first to use it. Setting `stage: 3` on an existing essay for one
  build would prove it now, and costs one line.
