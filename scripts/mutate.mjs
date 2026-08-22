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

  { id: 'overflow', file: 'content/essays/while-were-here.md',
    from: 'Technology changes what can happen inside that interval.',
    to:   'Technology changes what can happen inside that interval. ' + 'The interval widens. '.repeat(120),
    expect: 'copy overflow', why: 'a paragraph grown past its slot' },

  { id: 'contents-drift', file: 'content/contents.json',
    from: 'Most of Life Is a Tuesday', to: 'Most of Life Is a Wednesday',
    expect: 'the contents page agrees', why: 'a contents title that no longer matches the essay' },
];

const runVerify = () => {
  try {
    return execFileSync('node', [P('scripts/verify.mjs')],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    return `${e.stdout || ''}${e.stderr || ''}`;   // non-zero exit is the normal case here
  }
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
  const file = P(m.file);
  const before = fs.readFileSync(file, 'utf8');
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
    fs.writeFileSync(file, before);
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

const missed = results.filter((r) => r.state === 'MISSED');
const caught = results.filter((r) => r.state === 'caught');
const other = results.filter((r) => r.state === 'skipped' || r.state === 'unreadable');

console.log(`\n  ${caught.length} check(s) proven to bite · ${missed.length} blind · ${other.length} not run`);
console.log('  Working tree restored and clean.');
if (missed.length) {
  console.log('\n  A check that cannot fail is not a check. Blind:');
  for (const r of missed) console.log(`    · ${r.id}`);
}
console.log('');
process.exit(strict && missed.length ? 1 : 0);
