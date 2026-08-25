# Printer brief — send to several, compare the answers

Saal Digital priced out. This replaces [saal-email.md](saal-email.md), which
was written for one printer and assumed its product line. The enquiry below
asks nothing printer-specific: it states what the book IS and asks what each
printer can do with it.

**Send it to three or four.** The answers are directly comparable.

**Updated 25 Aug 2026.** The book now exists in two finished lengths — 130 pages
and 94 — so the enquiry asks for both prices side by side rather than describing
one book. It also asks the question that was missing and may matter more than
the edit did: **what does the same book cost without layflat?** Layflat is in the
specification because images cross the gutter, it is the most expensive binding
there is, and nobody has ever priced the alternative.

---

**Subject:** Square hardcover photo book, 94 or 130 pp — specification and five questions

Hello,

I have a finished square photo book and I'm choosing a printer. The files are
complete and press-ready; I'd rather send you the specification and ask what
fits than guess at your product line.

**The book**

* Square format, currently laid out at 300 × 300 mm
* **It exists in two lengths, and the price may well decide which one I print:**
  a 130-page edition and a 94-page one. Both are finished and both are
  press-ready — I am not asking you to wait for anything.
* Photographic and illustrated throughout, many full-bleed pages, several
  images crossing the gutter from one page to the next
* PDF with 3 mm bleed on all four sides, crop marks, 9 embedded and subset
  fonts, images 150–400 dpi at final size
* One copy initially; possibly a handful later

**Five questions**

1. **What would each length cost?** 94 pages and 130 pages, same trim, same
   binding. I would like the two figures side by side.
2. **What does the same book cost WITHOUT layflat binding?** Several spreads run
   a single image across the gutter, so layflat matters to this book — but I have
   never been quoted the alternative and I would like to know what the premium
   actually is before paying it.
3. **What square sizes do you offer?** 300 × 300 mm and 12 × 12 inch are both
   ideal. Smaller sizes are possible but would mean rewriting text, so it is
   worth me knowing the exact options before assuming.
4. **What is your maximum page count** at that size and binding?
5. **What is the caliper of the stock, per leaf, in millimetres?** I need it to
   draw the cover wrap. The spine is `pages ÷ 2 × caliper + board allowance`, so
   a 0.01 mm error moves it 0.65 mm at 130 pages and 0.47 mm at 94.

**Two smaller things, if you have a view**

* Do you want **PDF/X-1a** or a plain PDF? My understanding is that PDF/X is an
  offset convention and may not apply to a photographic or digital press.
* Do you want **one file including the cover**, or the interior separately with
  the cover built on your own wrap template? I have both.

Two plates in the book sit at 81 and 108 dpi at full size — a photograph I may
re-shoot and a scan of a 1980s print I may re-scan. If you have a view on
whether those would hold up at this size on your stock, I would value it.

Thank you,
Adam Hickey

---

## Reading the answers

**Size is the decisive one, and it is measured, not guessed.** Every page in
this book is composed to fit its slot rather than flowed, so shrinking the trim
does not reflow text — it overflows it. Measured 23 Aug 2026 by rebuilding at
each size and counting:

| trim | pages overflowing, of 132 | what it would take |
| --- | --- | --- |
| **305 mm** (12 × 12 in) | **0** | nothing — drop-in |
| 285 mm | 3 | an afternoon of copy edits |
| 254 mm (10 × 10 in) | 19 | a serious editing pass |
| 210 mm (8 × 8 in) | 64 | rewriting half the book |

So **12 × 12 inch is free** — 304.8 mm, 1.6% larger than the current layout,
and a standard size almost everywhere. Anything below about 285 mm is a
different project.

**Page ceiling may be an opportunity, not a constraint.** The 130-page limit
was Saal's, and it has cost this book real material: two material breaks cut,
a reproduced record withdrawn, spreads that had to pay for each other. A
printer allowing 150 or 180 pages would give some of that back. Worth noticing
if one of the quotes offers it.

**Layflat is the premium worth paying for; the paper probably is not.** The
crossover spreads are the reason. FUJIFILM Crystal Archive was Saal's stock,
not a requirement of the book — a good digital press on heavy matte would serve
these images perfectly well.

## What changes in this repository, per answer

| answer | change |
| --- | --- |
| **12 × 12 in** | `trimWidth`/`trimHeight` → 304.8 in `book.config.js`. Nothing else; verified zero overflow. |
| **any smaller size** | same two numbers, then `npm run overflow` and edit every page it names. Budget by the table above. |
| **caliper** | `paperCaliper` in `book.config.js`; the spine and wrap follow automatically. |
| **max pages > 130** | `pageCount`, and the ceiling comment in `book.config.js` stops being true — several cut spreads become recoverable from git history. |
| **PDF/X wanted** | `brew install ghostscript`, then `npm run pdf:press`. |
| **PDF/X not wanted** | remove the `--preflight` flags from the `pdf:press` script. |
| **interior only** | send `dist/while-were-here-interior.pdf` (130 pp). |
| **single file** | send `dist/while-were-here-press.pdf` (132 pp). |

Everything printer-specific lives in `book.config.js` and nowhere else, by
design. Whichever printer wins, the change is a handful of numbers in one file.
