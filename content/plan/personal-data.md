# The other half of the archive

The Facebook export is not mainly photographs. It is **a record of a person kept
by a machine**, and that is a much better fit for this book than the pictures
are.

Everything below is real, already on disk, and needs no shoot, no generation and
no resolution. Critically, **none of it costs a page.** It lands inside existing
spreads as margin notes, specimen cards and captions. The book is currently 138
pages against a 130 ceiling, so density is the only kind of addition that helps.

It also settles something. [decisions.md](decisions.md) records a live tension:
the plates carry invented survey dates and catalogue numbers, and the book's
thesis is to attend to the actual world. These are actual records of an actual
person. Wherever one of them replaces an invented one, the book gets stronger by
its own argument.

---

## 1. Seven thousand three hundred advertisers · The Strange Privilege

`ads_information/advertisers_using_your_activity_or_information.html`

**7,325 unique advertisers** hold or have used Adam's activity or information.
Two independent extractions of the file agree to within a rounding error;
7,499 entries, 7,325 unique.

The list itself is the artefact. LEGO, IKEA, A24, Disney, the Huntington
National Bank, four separate IKEA country accounts, a Japanese ad agency, and a
long tail of entries with names like *Non ddtc 1 zocket manager* and
*Mushrooms 3* that nobody would recognise as a company at all.

**Where.** A margin note in *The Strange Privilege*, and a specimen card
reproducing a hundred or so names in mono at 6 pt as a solid grey block, so the
reader sees the shape of the list rather than reads it. The count is the point.
The unreadability is the second point.

## 2. Thirty-one categories · The Secret Life of Attention

`ads_information/other_categories_used_to_reach_you.html`

Thirty-one inferred categories. Among them: *Away from family. Away from
hometown. Family of those who live abroad. Birthday in November. Frequent
international travellers. Console gamers.*

That is a system's description of a person, and the essay's pull quote is
already **"You have never once experienced a room. You have experienced a
paraphrase."** Here is the paraphrase, of him, printed.

**Where.** A specimen card on the *Attention* image essay. Set the categories as
a plain list, credit the file, and let it sit there. It does not need a caption
arguing anything.

**This is the strongest single idea in the export.** It is personal without a
photograph, factual without a study, and it is the book's own thesis arriving as
evidence about the author.

## 3. Twenty-three cities · Why Humans Need Pilgrimages

`your_facebook_activity/your_places/cities_you_have_checked_into.html`

Bloomington · Dubai · Egg Harbor · Johnson Creek · Wayzata · Baileys Harbor ·
Waukesha · Fish Creek · Taylors Falls · Little Falls · Afton · Edina · Ephraim ·
Sister Bay · Milwaukee · Ramsey · Grand Marais · Richfield · Oconomowoc ·
Ellison Bay · Lutsen · Minneapolis · Seattle

Five of them are Door County. Two are the North Shore. One is Dubai. A real
route list, and the essay already wants pilgrimage drawn as data rather than as
devotion — `ground-07-convergent-routes` is specified as exactly that.

**Where.** Set the list as the pilgrimage essay's specimen card, or draw the
ground from these points instead of from invented ones.

## 4. Two hundred and seventeen dead apps · The Last Generation

`apps_and_websites_off_of_facebook/connected_apps_and_websites.html`

217 connected apps, most long expired, the earliest dated **4 October 2013**.
The names are a graveyard of a former internet: *Pay with a Post*,
*Birthday Chart Toppers*.

**Where.** A margin note or a taped list in *The Last Generation*. It is the
essay's argument as a receipt.

## 5. Six emoji, with the date each was last used

`your_facebook_activity/other_activity/your_recently_used_emojis.html`

😀 used once, last on 18 August 2017. ✌️ used once, last on 25 November 2019.

Six entries, each with a total and a last-used timestamp. Small, exact, and
quietly devastating in the register the book already writes in.

**Where.** A field-note sidebar, or the smallest possible specimen card.

## 6. Forty-two businesses reporting him from off Facebook

`apps_and_websites_off_of_facebook/your_activity_off_meta_technologies.html`

Peacock, Lowe's, Adobe, StubHub, TripAdvisor, The Home Depot, Cloudflare,
TurboTax, Chewy, HelloFresh, `thek9coach.com`.

Not advertisers he saw. Businesses that told Meta what he did somewhere else.
The distinction is the whole of *The Strange Privilege*.

## 7. Seventy-two searches, with timestamps

`logged_information/search/your_search_history.html`

Real, dated, and genuinely revealing. **Adam's call, and probably no.** Some of
it is nobody's business, and a book does not become more honest by being less
discreet. Listed here so the decision is explicit rather than accidental.

---

## What this is not

**Not a data-visualisation section.** These arrive as apparatus — margin notes,
specimen cards, captions in mono — in exactly the places the book already puts
its numbers. If it turns into a chapter of charts it has become a different
book, and one the art direction already rejects as "corporate infographic
style".

**Not a substitute for a fact entry.** Every figure above goes into
[facts.json](../facts.json) first, with the file it came from and the date the
export was generated, the same as any published study. The source happens to be
Adam rather than PNAS. The rule does not change.

## Where to start

Number 2. It is one specimen card, it costs no pages, and it puts the book's own
sentence about paraphrase next to a machine's paraphrase of its author.

---

## Consent, audited by eye rather than by keyword — 21 Aug 2026

`verify.mjs` reports how many images carry a `consent` note. It cannot report a
**missing** one, and that is not a small gap: a note is written by a person who
noticed, so the check measures attention already paid, not risk. It counted seven
and everything looked settled.

Thirty-five of Adam's own photographs are in the book. Reading every subject line
and opening the ones that could hold a person found **one image with an
identifiable stranger and no note — the largest such figure in the book.**

**`field-note-01-lake`** · full bleed, 300 mm, Lake Harriet, October. A child is
fishing at the railing in the lower left, in profile, face clearly visible. At
trim the figure stands about 55 mm and the face reads at roughly 8 mm. Not
Adam's child. It now carries a note. Nobody should quietly crop the child out
either: the figure is the only human scale in a picture whose whole subject is a
lake where nothing is happening, and removing it to avoid a conversation is the
wrong order of operations.

Two more were opened and are **clear**, recorded so they are not re-opened:

| image | placement | what is actually in it |
| --- | --- | --- |
| `pilgrimage-01-worn-threshold` | opener, 300 mm full bleed | Nobody. The only human trace is **Adam's own shadow** thrown down the steps, which is the picture's subject. A yellow `X ING TRAFFIC` sign is the only text. |
| `privilege-07-grill-screen` | inset, 92 mm | A grill app: temperatures, a countdown, *Select Grill Profile*. **No name, no account, no network, no code.** The field-note rule that this book prints no scannable codes and no personal data it does not mean to holds here. |

The rest of the thirty-five are animals, landscapes, objects and the dog.
`pilgrimage-07-switchbacks` has walkers and riders, but they are a few
millimetres at a 92 mm inset and the manifest already says so.

**The lesson is about the check, not the picture.** A count of notes cannot find
the image nobody looked at. The only thing that finds it is opening the file —
the same conclusion the frame-verification pass reached from the other
direction, where the dimension guard caught eight wrong files and only looking
caught two wrong descriptions. Any future pass that adds photographs has to
include a looking step, and it cannot be delegated to a keyword match over the
`subject` field: a match over people-words returned 47 of 90 images, almost all
of them animals, diagrams, and the words "nobody in frame."
