#!/usr/bin/env node
/* Does each check actually bite? — mutation testing for `npm run verify`.
 *
 *   npm run mutate              run every mutation, report, exit 0
 *   npm run mutate -- --strict  exit 1 if any check fails to notice its fault
 *   npm run mutate -- <name>    run only mutations whose id contains <name>
 *
 * WHY THIS EXISTS. Three checks in this suite were found blind on 22 Aug 2026,
 * each by accident, and each had been reporting success for as long as it had
 * existed:
 *
 *   · `-webkit-hyphenate-limit-lines: 2` — a property Chromium does not
 *     implement. Two hyphen ladders were sitting in the composed pages.
 *   · `\bcolour\b` — cannot match "watercolour", because there is no word
 *     boundary between "water" and "colour". Nine British spellings on the page.
 *   · `\b\d[\d,.]*\b` for margin-note figures — digits only, in a book that
 *     prints "around eighty-five times a day". Three notes checked nothing.
 *
 * All three looked like they were working. A green check and an inert check are
 * indistinguishable from the outside, and the only way to tell them apart is to
 * break something on purpose and see whether anyone notices.
 *
 * HOW IT WORKS. Each mutation names a file, an exact string to replace, and the
 * check that should go red. The file is patched in place, `verify` is run, the
 * named check is read out of its output, and the file is put back.
 *
 * SAFETY. This edits real source files, so: it refuses to start unless the
 * working tree is clean, every file is snapshotted in memory before it is
 * touched, restoration happens in a `finally`, and the tree is re-checked at the
 * end. If anything is left modified the script says so loudly rather than
 * exiting quietly.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const P = (...a) => path.join(root, ...a);
const args = process.argv.slice(2);
const strict = args.includes('--strict');
const only = args.filter((a) => !a.startsWith('--'))[0];

const clean = () => execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
if (clean()) {
  console.error('✗ working tree is not clean. Commit or stash first — this script edits source files.');
  process.exit(1);
}

/* Each mutation: what to break, and which check should notice.
   `expect` is matched against the start of the check's printed name. */
const MUTATIONS = [
  { id: 'american-compound', file: 'content/images.json',
    from: 'A large organic form built from fine contour lines',
    to:   'A large watercolour organic form built from fine contour lines',
    expect: 'American English', why: 'a British spelling hidden inside a compound' },

  { id: 'american-inflection', file: 'content/images.json',
    from: 'A large organic form built from fine contour lines',
    to:   'A large organic form built from fine centred contour lines',
    expect: 'American English', why: 'a British spelling in an inflected form' },

  { id: 'placeholder', file: 'content/essays/while-were-here.md',
    from: 'Technology changes what can happen inside that interval.',
    to:   'Technology changes what can happen inside that interval. TODO fix this.',
    expect: 'no placeholder text', why: 'a TODO left in the copy' },

  { id: 'build-artifact', file: 'content/essays/while-were-here.md',
    from: 'Technology changes what can happen inside that interval.',
    to:   'Technology changes what can happen inside that ${interval}.',
    expect: 'no build artifacts', why: 'an unresolved template literal reaching the page' },

  { id: 'margin-note-digits', file: 'content/essays/why-humans-need-pilgrimages.md',
    from: 'links 88 temples', to: 'links 87 temples',
    expect: 'every number in a margin note', why: 'a margin-note figure not in the ledger' },

  { id: 'margin-note-words', file: 'content/essays/the-secret-life-of-attention.md',
    from: 'around eighty-five times a day', to: 'around ninety-three times a day',
    expect: 'every number in a margin note', why: 'a SPELLED-OUT figure not in the ledger' },

  { id: 'fact-usedin-shape', file: 'content/facts.json',
    from: '"essays/the-secret-life-of-attention.md — marginNote"',
    to:   '"photo 177 — specimen label"',
    expect: 'every fact says where it is used', why: 'a usedIn that resolves to nothing' },

  { id: 'fact-usedin-block', file: 'content/facts.json',
    from: '"essays/the-secret-life-of-attention.md — marginNote"',
    to:   '"essays/the-secret-life-of-attention.md — flow-99z"',
    expect: 'every fact says where it is used', why: 'a usedIn naming a block that does not exist' },

  { id: 'vertical-orientation', file: 'src/styles/cover.css',
    from: 'text-orientation: sideways;', to: '/* mutated */',
    expect: 'vertical text declares', why: 'vertical text left to the default orientation' },

  /* The first version of this mutation truncated the subject instead of emptying
     it — it replaced a prefix, so the tail of the sentence survived and the alt
     text was merely shorter. The check passed, correctly, and was recorded as
     blind when it was not. A mutation has to produce the fault it names. */
  { id: 'alt-text', file: 'content/images.json',
    from: '"subject": "A tablet propped on a speckled counter running a grill controller: grill 190 °F, food 124 °F, a countdown at 03:09:35, and a button reading Select Grill Profile."',
    to:   '"subject": ""',
    expect: 'every content image speaks', why: 'a placed photograph with no description' },

  { id: 'licence', file: 'content/images.json',
    from: '"license": "Pexels License"', to: '"license": ""',
    expect: 'every sourced image has source', why: 'a sourced image missing its licence' },

  { id: 'hyphen-ladder', file: 'src/styles/typography.css',
    from: 'hyphenate-limit-chars: 10 4 4;', to: 'hyphenate-limit-chars: 4 2 2;',
    expect: 'no word broken across a column foot', why: 'hyphenation loose enough to ladder' },

  /* The display serif at the wrong weight. This one is aimed at a rule that
     has now been broken TWICE in this repository — the dedication, and then
     `.cover-back__line` on the day it moved to the display face — and both
     times nothing caught it. The check that catches it lives in breaks.mjs.
     The mutation puts the fault where it actually occurred both times: a
     component stylesheet, loading after typography.css, quietly winning. */
  { id: 'display-weight', file: 'src/styles/cover.css',
    from: '.cover-back__line {\n  align-self: center;',
    to:   '.cover-back__line {\n  font-weight: 500;\n  align-self: center;',
    expect: 'every element in the display serif is at weight 900',
    why: 'a display-serif element dropped below black by a component stylesheet' },

  { id: 'overflow', file: 'content/essays/while-were-here.md',
    from: 'Technology changes what can happen inside that interval.',
    to:   'Technology changes what can happen inside that interval. ' + 'The interval widens. '.repeat(120),
    expect: 'copy overflow', why: 'a paragraph grown past its slot' },

  /* A focal name nobody styles. `focus:` is an open vocabulary at the point of
     use and a closed one at the point of definition, and the gap between them
     is silent: an unstyled class crops to the middle exactly as if the line had
     never been written. */
  { id: 'focus-vocabulary', file: 'content/essays/why-humans-need-pilgrimages.md',
    from: '    focus: low', to: '    focus: middle',
    expect: 'every focus: names a focal class that exists',
    why: 'a focus: naming a focal class that does not exist' },

  /* A photograph refiled as something a model made. The fault is invisible on
     the page today and would not be if a plate specimen card ever rendered it.

     THE ANCHOR HAS TO CARRY THE LINE ABOVE IT. The first version of this
     mutation INSERTED `"status": "generated"` after the id line, which changed
     nothing: the record already had a `status` further down, and a JSON parser
     takes the last of two duplicate keys. It reported blind, and the check was
     fine — the mutation was. `"status": "placed"` on its own is not unique
     either; `ephemera-01-window-plant` is the one record whose preceding line
     makes the pair unique in the file. */
  { id: 'photograph-generated', file: 'content/images.json',
    from: '"target": "1200 \u00d7 1200 px (native \u2014 435 dpi at 70 mm, and nothing larger)",\n      "status": "placed"',
    to:   '"target": "1200 \u00d7 1200 px (native \u2014 435 dpi at 70 mm, and nothing larger)",\n      "status": "generated"',
    expect: 'no photograph is filed as generated',
    why: 'one of Adam\'s own photographs filed as generated' },

  /* The two Año Viejo photographs are the same figure six hours apart, and they
     mutate in opposite directions, because a placement field can lie both ways.
     here-09 sits on no page — filing it `placed` retires a good image nobody
     will look at again, which is the fault found on 24 Aug 2026 in five records
     at once. here-10 is printed on the closing recto — filing it `unplaced`
     is the same fault wearing the other shoe, and a check written in one
     direction only would sail past it.

     The `target` line above each is what makes the pair unique: both records
     carry a 3024 × 3024 square crop and differ only in how it was taken. */
  { id: 'placed-but-off-page', file: 'content/images.json',
    from: 'biased down the frame to keep the feet and the ground)",\n      "status": "unplaced"',
    to:   'biased down the frame to keep the feet and the ground)",\n      "status": "placed"',
    expect: 'every image filed as placed is on a page, and the reverse',
    why: 'an image filed as placed that is on no page' },

  { id: 'on-page-but-filed-away', file: 'content/images.json',
    from: 'biased right to centre the fire and clip the UNAD sign)",\n      "status": "placed"',
    to:   'biased right to centre the fire and clip the UNAD sign)",\n      "status": "unplaced"',
    expect: 'every image filed as placed is on a page, and the reverse',
    why: 'an image printed in the book but filed as unplaced' },

  /* An essay opener with nothing on its recto below the deck. This is the fault
     of 24 Aug 2026 put back exactly: essay 01 shipped with no `blocks:` on its
     opener spread, so two-thirds of the first essay page in the book printed
     blank and the reading time floated alone above the rule. */
  { id: 'opener-no-lede', file: 'content/essays/why-ordinary-days-may-be-the-point-of-life.md',
    from: '    image: ordinary-days-01a-dog-afternoon-light\n    blocks: [open]',
    to:   '    image: ordinary-days-01a-dog-afternoon-light',
    expect: 'every essay opener carries its lede',
    why: 'an essay opener with no lede declared' },

  /* The same emptiness reached by a typo rather than an omission, and the reason
     that check reads the composed HTML instead of the frontmatter: `blocks` is
     present and non-empty here, so every YAML-level test passes, and the named
     block still matches no comment in the markdown. The page comes out blank
     either way. */
  { id: 'opener-lede-misnamed', file: 'content/essays/the-secret-life-of-attention.md',
    from: '    image: attention-01-familiar-room\n    blocks: [open]',
    to:   '    image: attention-01-familiar-room\n    blocks: [opn]',
    expect: 'every essay opener carries its lede',
    why: 'an opener naming a lede block that does not exist' },

  /* Every contents number off by one. `openings[...] = n + 2` is the whole folio
     derivation: an opener is a pair, so the title recto is two pages past the
     spread's start. Make it n + 1 and all eight numbers move together.

     THE FIRST VERSION OF THIS MUTATION REPORTED BLIND, and the reason is worth
     keeping. It added a divider before essay 08 to shift the pages without
     touching the contents — the way a contents page goes wrong in a book set by
     hand. Here it changed nothing, because the folios are DERIVED: pass one
     found the new page and pass two printed it, so the contents corrected
     itself and the check stayed green. It was right to stay green.

     That is the actual fault surface for this check. Content cannot drift away
     from the contents page in this build. Only the arithmetic that produces the
     numbers can be wrong, and if it is, it is wrong for all eight at once and
     looks like a formatting change in a diff. */
  { id: 'contents-folio', file: 'scripts/build.mjs',
    from: 'openings[L.titleKey(essay.title)] = n + 2;',
    to:   'openings[L.titleKey(essay.title)] = n + 1;',
    expect: 'the contents page points at the right pages',
    why: 'an off-by-one in the folio derivation' },

  /* A fact whose ledger entry claims a page it is not on. `mimosa-thigmonasty`
     is honestly declared Unplaced — neither "mimosa" nor "pulvinus" appears
     anywhere in the content. Pointing its `usedIn` at a real essay and a real
     block instead makes it claim to be printed, which is what a fact looks like
     after the spread carrying it has been cut and nobody updated the ledger.

     It has to be a REAL file and block or the wrong check fires: "every fact says
     where it is used, and means it" already tests that `usedIn` resolves, so an
     invented path would trip that one instead and this mutation would prove the
     wrong thing. */
  { id: 'fact-left-the-page', file: 'content/facts.json',
    from: '"Unplaced — was \'photo 358 — figure caption\', a numbering from an older selection pass.',
    to:   '"essays/beauty-of-systems-nobody-designed.md — flow-2b (was photo 358).',
    expect: 'every placed fact is still on the page',
    why: 'a fact the ledger says is printed, that is on no page' },

  /* An inset card laid on top of a band image. This is the condensed edition's
     state before 25 Aug 2026: the Physarum dish occupies the left third of a 3:1
     band, the jellyfish inset sat exactly there, and the page printed a grey
     rectangle with a polaroid on it. The image was never the problem. */
  { id: 'figure-over-figure', file: 'content/essays/nobody-is-holding-the-drawing.md',
    from: '    insetOn: recto\n    inset:\n      image: systems-07-moon-jelly',
    to:   '    insetOn: verso\n    inset:\n      image: systems-07-moon-jelly',
    expect: 'no figure is drawn over another figure',
    why: 'an inset card drawn on top of a band image' },

  /* The numbered captions with a hole in them. This restores exactly what the
     book printed until 24 Aug 2026: a lone "Plate 3" on folio 30, followed by
     Figure 2 through Figure 7, so the first numbered thing a reader met was
     Figure 2 and the only Plate in the book was the third one. */
  { id: 'caption-numbering', file: 'content/essays/the-secret-life-of-attention.md',
    from: '<b>Figure 1.</b>', to: '<b>Plate 3.</b>',
    expect: 'numbered captions run 1, 2, 3',
    why: 'a caption sequence starting at 2, with a stray Plate' },

  /* The same phrase set two ways. This is the state the book shipped in until
     24 Aug 2026: Physarum polycephalum in `<em>` four times in the prose and in
     `<i>` once in a margin note, because the prose is markdown and the note is
     YAML. Identical on the page, different to a screen reader, and invisible to
     every other check in the file. */
  { id: 'markup-two-ways', file: 'content/essays/beauty-of-systems-nobody-designed.md',
    from: 'In a 2010 experiment, <em>Physarum polycephalum</em> was given food at',
    to:   'In a 2010 experiment, <i>Physarum polycephalum</i> was given food at',
    expect: 'nothing is marked up two different ways',
    why: 'one species name italicised with two different elements' },

  /* A word broken across a column break. Putting `hyphens: auto` back restores
     the exact state the book shipped in until 24 Aug 2026: "them-/selves" on
     folio 21 and "measure-/ment" on folio 120, the second across the gutter.

     THIS MUTATION WOULD HAVE REPORTED BLIND BEFORE THE SAME DAY, and that is
     the point of it. breaks.mjs tested `lines.length - 1` — the last line of the
     PARAGRAPH, which is a column foot only when the paragraph happens to end
     there. Both real faults were mid-paragraph, so the check looked straight
     past them and printed a ✓. The check now tests every boundary, found by the
     one thing that moves text upward: the next line's top jumping back. */
  { id: 'hyphen-across-column', file: 'src/styles/typography.css',
    from: '  hyphens: none;\n  text-wrap: pretty;', to: '  hyphens: auto;\n  text-wrap: pretty;',
    expect: 'no word broken across a column foot',
    why: 'a word hyphenated across a column break' },

  /* The measure narrower than the line the layout chose to set. 128mm is the
     value that shipped on 24 Aug 2026, and it broke the dedication's second
     clause in the middle of "and for Fabiola" — the <br> intact, two more
     breaks added underneath it by the width. */
  { id: 'stack-remeasured', file: 'src/styles/layouts.css',
    from: '  max-width: 168mm;\n}', to: '  max-width: 128mm;\n}',
    expect: 'every deliberate line break survives the measure',
    why: 'a decided line stack re-broken by too narrow a measure' },

  /* Type that cannot be read on the ground it prints on. This puts back the
     exact fault of 23 Aug 2026: a rule that lightens type for a dark photograph,
     keyed on a class that is also true of pages with no photograph at all. */
  { id: 'contrast', file: 'src/styles/layouts.css',
    from: '.closing--onplate.closing--quote .pull-quote { color: var(--paper); }',
    to:   '.closing--plate.closing--quote .pull-quote { color: var(--paper); }',
    expect: 'every run of type is legible on its own ground',
    why: 'display type set light on a light page' },

  /* Copy that describes a layout. The book has been re-paced repeatedly; a
     sentence pointing at the facing page is a claim with a shelf life. */
  { id: 'layout-reference', file: 'content/essays/why-humans-need-pilgrimages.md',
    from: 'The body supplies a measure that cannot be argued with for long.',
    to:   'The body supplies a measure that cannot be argued with for long, as the photograph opposite shows.',
    expect: 'nothing printed points at where it sits on the page',
    why: 'copy that points at the facing page in a book whose spreads move' },

  /* A spreads PDF older than the book. It is the only deliverable committed to
     the repository, so a stale one ships to the public site on the next push
     without anyone choosing to send it. Touching a source file is enough to put
     the committed PDF behind. */
  { id: 'spreads-stale', file: 'content/book.json',
    from: '"dedication"', to: '"dedication "',
    expect: 'the published spreads PDF is the current book',
    why: 'a spreads PDF older than the sources it was built from' },

  { id: 'contents-drift', file: 'content/contents.json',
    from: 'Most of Life Is a Tuesday', to: 'Most of Life Is a Wednesday',
    expect: 'the contents page agrees', why: 'a contents title that no longer matches the essay' },

  /* Three that the first version of this file listed as "awkward to synthesise"
     and gave up on. Two were ordinary string edits and the third needed only a
     moment's thought about what the check actually reads. Listing a check as
     hard to mutate is a claim that should be re-tested, not inherited. */

  { id: 'ground-stage', file: 'content/images.json',
    from: '"stage": 3', to: '"stage": 2',
    expect: 'every ground agrees with its essay', why: 'a ground labelled a stage behind its essay' },

  { id: 'record-count', file: 'content/essays/the-secret-life-of-attention.md',
    from: 'count: 31 entries', to: 'count: 32 entries',
    expect: 'every reproduced record counts', why: 'a record whose stated count is not what it prints' },

  /* The spread check fires on an image that is on disk, absent from the book,
     and NOT marked Unplaced. So take one that is legitimately unplaced and
     delete only the marker — the file and the manifest stay as they are. */
  { id: 'spread-claim', file: 'content/images.json',
    from: '"spread": "Unplaced, replaced 21 Aug 2026.',
    to:   '"spread": "Reading · two column, inset. Replaced 21 Aug 2026.',
    expect: 'no entry claims a spread', why: 'an image claiming a spread it is not on' },

  /* The label check was recorded as needing "geometry moved, not a string
     swapped". It needs a string swapped: the geometry IS a string, and
     diagrams.mjs records the exact historical fault in a comment above it —
     the Remembered label sat at x=768 and the Admitted ring ran through the
     word, between the B and the E, in blue, at 300 mm. Putting it back is a
     one-token edit and reproduces a fault that actually shipped once. */
  { id: 'diagram-label', file: 'src/layouts/diagrams.mjs',
    from: '<text x="840" y="304"', to: '<text x="768" y="304"',
    expect: 'nothing is drawn through a diagram label', why: 'a leader line drawn through its own label' },

  /* The imprint check flags an archive image that is NOT in the book but whose
     credit label appears in the printed text. linen weave is one of the two
     material breaks cut when spreads were trimmed to 130 — the exact pair that
     were being credited to Poly Haven and Unsplash while appearing nowhere in
     the object. Putting the phrase into an essay recreates that. */
  { id: 'imprint-phantom', file: 'content/essays/while-were-here.md',
    from: 'Technology changes what can happen inside that interval.',
    to:   'Technology changes what can happen inside that interval, like linen weave.',
    expect: 'imprint credits only what is in the book', why: 'a credit for something not in the book' },

  /* Not a text edit — the only mutation here that touches the filesystem. */
  { id: 'web-derivative', deletePath: null,
    expect: 'every master has a web derivative', why: 'a press master with no screen derivative' },
];

const runVerify = () => {
  try {
    return execFileSync('node', [P('scripts/verify.mjs')],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    return `${e.stdout || ''}${e.stderr || ''}`;   // non-zero exit is the normal case here
  }
};

/* Pick a web derivative that has a master beside it, so deleting it produces
   exactly the fault the check names and nothing else. */
const pickDerivative = () => {
  const webRoot = P('public/images-web');
  if (!fs.existsSync(webRoot)) return null;
  for (const dir of fs.readdirSync(webRoot)) {
    const d = path.join(webRoot, dir);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (fs.existsSync(P('public/images', dir, f))) return path.join(d, f);
    }
  }
  return null;
};

const build = () => {
  try {
    execFileSync('npm', ['run', 'build'], { stdio: 'ignore' });
    return true;
  } catch { return false; }
};

/* Read one check's status out of verify's output. Returns 'pass' | 'fail' | null. */
const statusOf = (out, name) => {
  for (const line of out.split('\n')) {
    const m = line.match(/^\s*([✓✗])\s+(.+?)\s{2,}/) || line.match(/^\s*([✓✗])\s+(.+)$/);
    if (m && m[2].trim().startsWith(name.slice(0, Math.min(name.length, 44)))) {
      return m[1] === '✓' ? 'pass' : 'fail';
    }
  }
  return null;
};

const chosen = MUTATIONS.filter((m) => !only || m.id.includes(only));
console.log(`\n  Mutating ${chosen.length} of ${MUTATIONS.length} checks. Each fault should turn its check red.\n`);

const results = [];
for (const m of chosen) {
  /* A deletePath mutation moves a real file aside instead of editing text.
     Restoration is the same shape: remember what was there, put it back in the
     `finally`. */
  if ('deletePath' in m) {
    const target = m.deletePath || pickDerivative();
    let verdict;
    if (!target) {
      verdict = { id: m.id, state: 'skipped', note: 'no derivative found to move aside' };
    } else {
      const kept = fs.readFileSync(target);
      const keptTimes = fs.statSync(target);
      try {
        fs.unlinkSync(target);
        build();
        const st = statusOf(runVerify(), m.expect);
        verdict = { id: m.id,
          state: st === 'fail' ? 'caught' : st === 'pass' ? 'MISSED' : 'unreadable',
          note: st === 'fail' ? m.why : st === 'pass' ? `${m.why} — NOT NOTICED` : `could not read "${m.expect}"` };
      } finally {
        fs.writeFileSync(target, kept);
        if (keptTimes) fs.utimesSync(target, keptTimes.atime, keptTimes.mtime);
      }
    }
    results.push(verdict);
    const mk = { caught: '✓', MISSED: '✗', skipped: '·', unreadable: '?' }[verdict.state];
    console.log(`  ${mk} ${verdict.id.padEnd(22)} ${verdict.note}`);
    continue;
  }

  const file = P(m.file);
  const before = fs.readFileSync(file, 'utf8');
  const beforeTimes = fs.statSync(file);   // captured BEFORE the mutation, see the restore
  let verdict;
  try {
    if (!before.includes(m.from)) {
      verdict = { id: m.id, state: 'skipped', note: 'anchor text not found — mutation is stale' };
    } else {
      const count = before.split(m.from).length - 1;
      fs.writeFileSync(file, before.replace(m.from, m.to));   // first occurrence only
      build();
      const out = runVerify();
      const st = statusOf(out, m.expect);
      verdict = {
        id: m.id, state: st === 'fail' ? 'caught' : st === 'pass' ? 'MISSED' : 'unreadable',
        note: st === 'fail' ? m.why : st === 'pass' ? `${m.why} — NOT NOTICED` : `could not read "${m.expect}"`,
        occurrences: count,
      };
    }
  } finally {
    /* CONTENT AND TIMESTAMP BOTH. Restoring only the bytes leaves the file
       looking newer than it is, and this project has three mtime-based
       staleness checks — pdfcheck, spreads:check and their siblings — so a
       mutation run used to end by making every deliverable report as out of
       date. The `spreads-stale` mutation was the worst of them: it edits
       content/book.json, so it tripped its own check permanently after
       running. Restoring the mtime leaves no trace at all, which is what
       "working tree restored and clean" is supposed to mean.

       The timestamp is captured with `before`, ABOVE, and not here: the first
       version of this stat'd the file inside the `finally`, by which point it
       held the mutation's own write time, so it restored the clock to the very
       value it was trying to undo. It reported success and changed nothing. */
    fs.writeFileSync(file, before);
    fs.utimesSync(file, beforeTimes.atime, beforeTimes.mtime);
  }
  results.push(verdict);
  const mark = { caught: '✓', MISSED: '✗', skipped: '·', unreadable: '?' }[verdict.state];
  console.log(`  ${mark} ${verdict.id.padEnd(22)} ${verdict.note}`);
}

build();   // leave the tree with a build matching the restored sources

const dirty = clean();
if (dirty) {
  console.error('\n  ✗ FILES LEFT MODIFIED — restore them by hand:\n' + dirty);
  process.exit(1);
}

/* Which checks have no mutation at all. Reported because a suite that says
   "14 proven to bite" and stops is claiming a coverage it does not have — the
   same failure mode as the checks this script exists to catch. These are the
   ones whose faults are awkward to synthesise, not ones believed to be fine. */
const UNMUTATED = [
  ['page count', 'needs a page added or removed, and every edit that does so also breaks the build'],
  ['every reproduced entry reaches the page', 'needs an entry present in the record but absent from the page — the build prints all of them'],
  /* This one is NOT untested — it is untested HERE. Every mutation in this file
     is a text substitution, and the fault this check exists to catch is a real
     QR code inside a binary image, which no `from`/`to` pair can produce. It was
     proven by hand twice on 23 Aug 2026: a working QR was encoded into
     field-note-02-tag-code.png, the check went red and named the file, and the
     plate was restored from a copy taken first — once against the original scan
     and again after that scan was rewritten to be bounded and cached, because an
     optimisation is exactly the kind of edit that can quietly blind a check.
     scripts/codes.py also carries a positive control on every run, which is a
     stronger guarantee than a mutation: it refuses to report at all unless it
     has just encoded a known symbol and decoded it back. */
  ['nothing printed in this book scans', 'needs a real QR code inside a binary image — proven by hand instead, and the check carries its own positive control'],
];

const missed = results.filter((r) => r.state === 'MISSED');
const caught = results.filter((r) => r.state === 'caught');
const other = results.filter((r) => r.state === 'skipped' || r.state === 'unreadable');

console.log(`\n  ${caught.length} check(s) proven to bite · ${missed.length} blind · ${other.length} not run`);
console.log('  Working tree restored and clean.');
if (missed.length) {
  console.log('\n  A check that cannot fail is not a check. Blind:');
  for (const r of missed) console.log(`    · ${r.id}`);
}
if (!only) {
  console.log(`\n  ${UNMUTATED.length} check(s) in the suite have NO mutation here, so nothing`);
  console.log('  below is known to bite. Not a clean bill of health — a gap:');
  for (const [name, why] of UNMUTATED) console.log(`    · ${name}\n        ${why}`);
}
console.log('');
process.exit(strict && missed.length ? 1 : 0);
