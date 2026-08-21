#!/usr/bin/env node
/* Fail fast if the press pipeline cannot actually run.
 *
 * `npm run pdf:press` asks vivliostyle for `--preflight press-ready`, and
 * press-ready is a wrapper around GHOSTSCRIPT — run either through Docker or
 * from a local install. With neither present it does not error. It hangs.
 * Measured: 81 minutes at 0.0% CPU with no output and no file, which reads
 * exactly like a slow build of a 130-page book full of photographs.
 *
 * This runs first and says so in a second.
 */
import { execFileSync } from 'node:child_process';

const has = (cmd) => {
  try { execFileSync('which', [cmd], { stdio: 'pipe' }); return true; } catch { return false; }
};

const gs = has('gs');
const docker = has('docker');

if (gs || docker) {
  console.log(`  press preflight available via ${gs ? 'local Ghostscript' : 'Docker'}`);
  process.exit(0);
}

console.error(`
✗ Cannot build a press PDF: press-ready needs Ghostscript and it is not here.

  --preflight press-ready runs Ghostscript, through Docker or a local install.
  Neither 'gs' nor 'docker' is on PATH, and press-ready HANGS rather than
  failing when they are missing.

  Pick one:

    brew install ghostscript        simplest; press-ready then runs locally
    Docker Desktop                  heavier, matches press-ready's own docs

  Or decide the preflight is not wanted. PDF/X-1a and the grayscale flag are
  offset-litho conventions. This book prints photographically at Saal on
  FUJIFILM Crystal Archive HD, and that workflow may not want PDF/X at all —
  worth asking them before installing anything. Without the preflight:

    BOOK_PRESS=1 node scripts/build.mjs && \\
      vivliostyle build build/book.html -o dist/while-were-here-press.pdf && \\
      npm run build

  That still gives real bleed and crop marks, which is the part that matters.
`);
process.exit(1);
