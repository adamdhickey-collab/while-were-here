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
  offset-litho conventions, and this book prints photographically — see
  content/plan/printer-brief.md, which asks each printer directly rather than
  assuming. Without the preflight:

    npm run pdf:press:plain

  That still gives real bleed and crop marks, which is the part that matters.
  It is a script rather than three lines to paste BECAUSE the three lines do
  not work when pasted: vivliostyle is a local devDependency, on PATH only
  inside an npm script. Run from a shell it exits 127 — and if any part of the
  chain is piped, even into \`tail\`, the pipeline reports the pipe's status
  instead and the whole thing prints success while writing no file. That
  happened twice on 24 Aug 2026, to a press PDF that stayed eighteen hours old
  through two builds that both said they had worked.
`);
process.exit(1);
