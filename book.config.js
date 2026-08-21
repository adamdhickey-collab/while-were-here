/**
 * WHILE WE'RE HERE — physical book configuration.
 *
 * This file is the single source of truth for print geometry. `scripts/build.mjs`
 * compiles it into `build/geometry.css`, emitting both CSS custom properties
 * (for layout code) and literal values inside `@page` rules (because paged-media
 * engines cannot reliably resolve `var()` inside `size`, `bleed` or `marks`).
 *
 * NOTHING printer-specific is hard-coded anywhere else in the project. When the
 * Saal Digital production template arrives, change the numbers here only.
 */

export const geometry = {
  // ---- Finished trim -------------------------------------------------------
  trimWidth: 300,      // mm
  trimHeight: 300,     // mm

  // ---- Production allowances (provisional — confirm against printer template)
  bleed: 3,            // mm of image beyond trim on all four sides
  safeArea: 8,         // mm inside trim where no critical content may sit
  crossoverGutter: 6,  // mm swallowed either side of the fold by the binding

  // ---- Page margins (text block) ------------------------------------------
  marginInside: 30,    // mm — spine side
  marginOutside: 34,   // mm — fore edge
  marginTop: 30,       // mm
  marginBottom: 34,    // mm

  // ---- Typographic grid ----------------------------------------------------
  columns: 12,
  gutter: 6,           // mm between grid columns
  baseline: 5.5,       // mm vertical rhythm unit

  // ---- Cover wrap (PROVISIONAL — do not send to press) ---------------------
  // Spine width cannot be calculated until final page count and paper stock are
  // fixed. Formula: pages / 2 * caliper + boardAllowance.
  cover: {
    // Saal Digital Professional Line 30 x 30 accepts a minimum of 26 pages
    // and a MAXIMUM OF 130. 128 is the working target: eight essays at the
    // density Part I already proves, plus front matter, dividers, material
    // breaks and credits, with a spread of slack.
    // MEASURED 19 Aug 2026: the full eight-essay book builds to exactly 130
    // pages, which is the ceiling. This is now the actual count, not a target.
    // There is no slack left: any spread added has to take one out. That has
    // already happened once — essay 01's seventh spread came back and the
    // blank between the cover and the half title paid for it.
    pageCount: 130,        // actual, and the ceiling at this printer
    paperCaliper: 0.17,    // mm per leaf — PROVISIONAL AND ALMOST CERTAINLY LOW.
                           // Saal prints this book on FUJIFILM Crystal Archive HD
                           // at 368 g/m2, layflat, not on the uncoated stock this
                           // number assumes. Replace from the production template.
                           //
                           // HOW WRONG THIS CAN BE, 21 Aug 2026. spineWidth() is
                           // linear: at 130 pages it is 65 x caliper + 4, so every
                           // 0.01 mm of caliper moves the spine 0.65 mm. A caliper
                           // of 0.26 gives a 20.9 mm spine and 0.31 gives 24.15,
                           // against the 15.05 this file currently reports — a
                           // cover wrap out by six to nine millimetres, which is
                           // not a rounding error, it is a misprinted case.
                           //
                           // Nothing here asserts what the true caliper IS. That
                           // number comes from Saal's production template for this
                           // exact product and nowhere else. Get it before the
                           // cover wrap is sent, and treat every spine figure the
                           // build prints as provisional until it is in.
    boardAllowance: 4,     // mm added for hardcover board and hinge
    wrapTurnIn: 15,        // mm folded around the board
    hingeGap: 8,           // mm groove either side of the spine
  },
};

export const spineWidth = () => {
  const { pageCount, paperCaliper, boardAllowance } = geometry.cover;
  return Number(((pageCount / 2) * paperCaliper + boardAllowance).toFixed(2));
};

/** Press build adds bleed + printer marks; screen/proof build is trim-only. */
export const press = process.env.BOOK_PRESS === '1';

/**
 * Web build reads the committed screen-resolution derivatives in
 * `public/images-web` instead of the press masters in `public/images`.
 *
 * The masters live in Git LFS and run to hundreds of megabytes, which is two
 * problems for the hosted preview and not one: a Pages site is capped at 1 GB,
 * and every CI checkout that fetches LFS spends the account's monthly LFS
 * bandwidth. The derivatives are ordinary git objects, so a web build needs no
 * LFS at all. Run `npm run derive` after placing images to refresh them.
 */
export const web = process.env.BOOK_WEB === '1';

export default geometry;

/* PRESS BUILD, 21 Aug 2026 — read this before changing the pdf scripts.
 *
 * `npm run pdf:press` did not build in press mode. It ran `npm run build`, the
 * plain proof build, and then asked vivliostyle for a press-ready preflight —
 * so the file called press-ready had `--bleed-out: 0mm` and no crop marks, with
 * every full-bleed photograph sitting exactly on the trim. Normal cutting
 * variance is around a millimetre either way, which on that file is a white
 * sliver down the edge of the dog, the hive, the staircase and Adam's father.
 *
 * The preflight flags were never the problem; the build behind them was. The
 * script now sets BOOK_PRESS=1 explicitly and restores the proof build after,
 * so a stray press build cannot leave bleed and crop marks in the preview.
 *
 * Check it the same way every time: the build prints which mode it used.
 *   proof  →  "proof: trimmed, no marks"
 *   press  →  "PRESS: bleed + crop marks"
 * If a press deliverable was made by a run that printed the first line, it is
 * the wrong file.
 */

/* PRESS PREFLIGHT NEEDS GHOSTSCRIPT — 21 Aug 2026.
 *
 * `--preflight press-ready` runs Ghostscript, via Docker or a local install.
 * With neither present press-ready does not error: it HANGS. Measured here at
 * 81 minutes, 0.0% CPU, no output and no file — indistinguishable from a slow
 * build of a 130-page book full of photographs, which is why it went unnoticed.
 * `npm run press:check` now runs first and fails in a second.
 *
 * Before installing anything, decide whether the preflight is wanted at all.
 * PDF/X-1a and the grayscale flag are offset-litho conventions. This book
 * prints photographically at Saal on FUJIFILM Crystal Archive HD, and that
 * workflow may not ask for PDF/X — worth one question to them. Dropping the
 * preflight still leaves real bleed and crop marks, which is the part that
 * makes a file press-ready in the sense this book needs.
 */
