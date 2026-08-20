# Drafting brief

Paste everything below the rule into ChatGPT, with the essay title filled in.
It is written to be self-contained, because ChatGPT cannot see this repo.

The brief exists because the binding constraint on this book is not quality, it
is length. A good 3,000-word essay is a failure here. The whole job is to arrive
at 1,100 to 1,400 words that survive being set at 300 mm with pictures.

---

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

**The essay you are drafting is: [TITLE], in Part [N].**

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
