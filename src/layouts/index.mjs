/* ==========================================================================
   Spread renderers.
   Each returns { pair, pages: [ { spread, folio, cls, html } ] }. A pair always
   occupies verso + recto in that order; the compositor guarantees it.
   No essay copy lives here — only composition.
   ========================================================================== */

import { esc, figure, ground, firstMade, ring, radiant, block } from './helpers.mjs';
import { diagrams } from './diagrams.mjs';

const nb = (s = '') => String(s).replace(/ (\w{1,3})$/, '&nbsp;$1');

/* Stages and parts are NOT the same sequence and must not be assumed to align —
   see content/plan/art-direction.md. The divider printed the part number under
   the word "Stage", which was invisible while the two happened to match and
   wrong the moment Part IV arrived at Stage V. */
const ROMAN = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };

/* Counts on the contents page are set as words, and they are derived rather
   than typed so that re-pacing the book cannot leave the page lying. */
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
  'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const word = (n) => WORDS[n] ?? String(n);
const Word = (n) => word(n).replace(/^./, (c) => c.toUpperCase());

/* ---- Covers -------------------------------------------------------------- */

/* Three cover treatments. `plate` is the quiet one; `bleed` and `window` are
   attempts at the same artwork doing more work. Set `coverVariant` in
   content/book.json; build/cover-options.html shows all three at trim size. */
export const coverVariants = {

  /* PLATE — the artwork sits inside the page as a specimen, with clean paper
     above and below it. Quiet, bookish, and easy to walk past on a shelf. */
  plate: (b, ctx) => `
    <div class="cover__art">${figure(ctx.image('cover-01-watercolor-systems'), { root: ctx.root })}</div>
    <div class="cover__inner">
      <div class="cover__head">
        <h1 class="cover__title"><span>While</span><span>We’re</span><span>Here</span></h1>
        <p class="cover__sub">${esc(b.subtitle)}</p>
      </div>
      <p class="cover__author">${esc(b.author)}</p>
    </div>`,

  /* BLEED — the artwork fills the whole board and the title is set large enough
     to run off the trim. At two metres this reads as one colour and one word,
     which is all a cover gets on a shelf. */
  bleed: (b, ctx) => `
    <div class="cover__art cover__art--bleed">${figure(ctx.image('cover-01-watercolor-systems'), { className: 'figure--bleed', root: ctx.root })}</div>
    <div class="cover__inner cover__inner--bleed">
      <h1 class="cover__title cover__title--huge"><span>While</span><span>We’re</span><span>Here</span></h1>
      <div class="cover__foot">
        <p class="cover__sub">${esc(b.subtitle)}</p>
        <p class="cover__author">${esc(b.author)}</p>
      </div>
    </div>`,

  /* ORB — the artwork as a single circle low on the page, with the title
     sitting above and just over its upper limb. A circle on a square is the
     strongest graphic move a cover has, and it gives the title's "here" a
     somewhere. Falls back to the existing artwork until the circular one is
     made, which is enough to judge the composition. */
  orb: (b, ctx) => `
    <div class="cover__orb">${figure(firstMade([
      ctx.image('cover-03-circular-systems'),
      ctx.image('cover-01-watercolor-systems'),
    ], { root: ctx.root }), { root: ctx.root })}</div>
    <div class="cover__inner cover__inner--orb">
      <div class="cover__head">
        <h1 class="cover__title cover__title--orb"><span>While</span><span>We’re</span><span>Here</span></h1>
      </div>
      <div class="cover__foot">
        <p class="cover__sub">${esc(b.subtitle)}</p>
        <p class="cover__author">${esc(b.author)}</p>
      </div>
    </div>`,

  /* WINDOW — the artwork shows only through the letterforms. The title stops
     being type on top of a picture and becomes the aperture onto it, which is
     the book's argument in one move: the systems are already there, and you see
     them through the thing in front of you. */
  window: (b, ctx) => `
    <div class="cover__inner cover__inner--window">
      <h1 class="cover__title cover__title--window"
          style="background-image:url('${esc(coverArtPath(ctx))}')"><span>While</span><span>We’re</span><span>Here</span></h1>
      <div class="cover__foot">
        <p class="cover__sub">${esc(b.subtitle)}</p>
        <p class="cover__author">${esc(b.author)}</p>
      </div>
    </div>`,
};

const coverArtPath = (ctx) => {
  const img = ctx.image('cover-01-watercolor-systems');
  return img ? `images/illustration/${img.filename}` : '';
};

export const coverFront = (bookData, ctx, variant) => ({

  pair: false,
  pages: [{
    spread: 'cover',
    folio: false,
    cls: `cover cover--${variant || bookData.coverVariant || 'plate'}`,
    label: 'front cover',
    html: (coverVariants[variant || bookData.coverVariant || 'plate'] || coverVariants.plate)(bookData, ctx),
  }],
});

export const coverBack = (bookData, ctx) => ({
  pair: false,
  pages: [{
    spread: 'cover',
    folio: false,
    cls: 'cover cover-back',
    label: 'back cover',
    /* The line in the hand, then the botanical, then the mark. cover.css sets
       five rows for exactly this order — `auto auto 1fr auto auto` — so the
       mark takes the flexible middle and the coda stays pinned to the foot. */
    html: `
      <div class="cover__inner">
        <p class="cover-back__line hand">${esc(bookData.backCoverLine)}</p>
        <div class="cover-back__art">${figure(ctx.image('cover-02-back-botanical'), { root: ctx.root })}</div>
        <div class="cover-back__mark">${radiant(15)}</div>
        <div class="cover-back__meta">
          <p class="cover-back__blurb">${esc(bookData.backCoverBlurb)}</p>
          <div class="cover-back__isbn">ISBN &amp; barcode<br>placement</div>
        </div>
        <p class="cover-back__coda">Look closer. Stay curious. Be kind.</p>
      </div>`,
  }],
});

/* ---- Front matter -------------------------------------------------------- */

export const blank = () => ({
  pair: false,
  pages: [{ spread: 'blank', folio: false, cls: 'page--blank', label: 'blank', html: '' }],
});

export const halfTitle = (bookData) => ({
  pair: false,
  pages: [{
    spread: 'half title',
    folio: false,
    cls: 'halftitle',
    html: `
      <div class="page__block">
        <div class="halftitle__mark">
          <p class="meta">While We’re Here</p>
        </div>
      </div>`,
  }],
});

export const titleSpread = (bookData) => ({
  pair: true,
  pages: [
    {
      spread: 'title spread',
      folio: false,
      cls: 'titlespread',
      html: `
        <div class="page__block">
          <div class="titlespread__foot">
            <span class="dot"></span>
          </div>
        </div>`,
    },
    {
      spread: 'title spread',
      folio: false,
      cls: 'titlespread',
      html: `
        <div class="page__block">
          <h1 class="titlespread__title display">While<br>We’re<br>Here</h1>
          <p class="titlespread__sub deck">${esc(bookData.subtitle)}</p>
          <div class="titlespread__foot">
            <p class="meta meta--ink">${esc(bookData.author)}</p>
          </div>
        </div>`,
    },
  ],
});

export const openingNote = (note) => ({
  pair: false,
  pages: [{
    spread: 'opening note',
    folio: false,
    cls: 'note-page',
    html: `
      <div class="page__block">
        <div class="prose prose--generous">${note.html}</div>
      </div>`,
  }],
});

/* Contents folios are looked up by title, which means a curly apostrophe on one
   side and a straight one on the other silently prints an em dash instead of a
   page number. That is exactly what happened to "While We're Here". Both sides
   go through this. */
export const titleKey = (s = '') =>
  String(s).replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();

export const contents = (bookData, toc, folios = {}) => {
  const essayCount = toc.parts.reduce((n, p) => n + p.essays.length, 0);
  const half = (parts) => parts.map((p) => `
      <section class="contents__part">
        <p class="meta meta--rust">Part ${esc(p.number)}</p>
        <h3 class="contents__part-title">${esc(p.title)}</h3>
        <ul class="contents__essays">
          ${p.essays.map((e) => `
            <li class="${e.status === 'planned' ? 'is-forthcoming' : ''}">
              <span>${esc(e.title)}</span>
              <span class="contents__dots"></span>
              <span class="contents__folio">${folios[titleKey(e.title)] ? String(folios[titleKey(e.title)]).padStart(3, '0') : '—'}</span>
            </li>`).join('')}
        </ul>
      </section>`).join('');

  return {
    pair: true,
    pages: [
      {
        spread: 'contents',
        folio: false,
        cls: 'contents',
        html: `
          <div class="page__block">
            <div class="contents__head">
              <p class="meta">Contents</p>
            </div>
            ${half(toc.parts.slice(0, 2))}
          </div>`,
      },
      {
        spread: 'contents',
        folio: false,
        cls: 'contents',
        html: `
          <div class="page__block">
            <div class="contents__head">
              <p class="meta">${Word(toc.parts.length)} parts &nbsp;·&nbsp; ${word(essayCount)} essays</p>
            </div>
            ${half(toc.parts.slice(2))}
          </div>`,
      },
    ],
  };
};

/* ---- Section divider ----------------------------------------------------- */

export const divider = (section, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'section divider',
      folio: false,
      cls: 'divider',
      html: `<div class="divider__figure">${figure(ctx.image(section.image), { className: 'figure--bleed', inverse: true, root: ctx.root, dark: (ctx.stage || 1) >= 3 })}</div>`,
    },
    {
      spread: 'section divider',
      folio: false,
      cls: 'divider',
      html: `
        <div class="page__block">
          <div class="divider__stage">
            <p class="label"><b>Stage ${esc(ROMAN[section.stage] || section.number)}</b> ${esc(section.imperative || '')}${
              section.stageTitle ? ' ' + esc(section.stageTitle) : ''}</p>
          </div>
          <div class="divider__head">
            <p class="divider__num numeral">Part ${esc(section.number)}</p>
            <h2 class="display divider__title${section.title.split(/\s+/).length > 3 ? ' display--long' : ''}">${
              section.title.split(/\s+/).map((w) => `<span>${esc(w)}</span>`).join('')}</h2>
            ${section.statement ? `<p class="divider__statement">${esc(section.statement)}</p>` : ''}
          </div>
          <div class="divider__foot">
            <p class="specimen divider__blurb">${esc(section.blurb)}</p>
            <ol class="divider__essays">
              ${(section.essays || []).map((e) => `<li><span class="divider__essay-n"></span>${esc(e)}</li>`).join('')}
            </ol>
          </div>
        </div>`,
    },
  ],
});

/* ---- Field note ----------------------------------------------------------
   A personal interlude between parts. Deliberately the quietest pair in the
   book: one real photograph at size, one short paragraph, a dateline, and a
   hand. No folio, no running head, nothing to navigate by.

   Until the paragraph is written the recto renders as a labelled brief, the
   same way an unmade image renders as a labelled plate. A proof PDF is the
   shot list; now it is the writing list too. */

export const fieldNote = (note, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'field note',
      folio: false,
      /* `band` holds the photograph at its own aspect across the page instead
         of cropping it to the square. A wide frame whose subject is the scale
         of an empty street against two small figures stops being that picture
         the moment it is cropped to fit — the figures come up 1.8x and read as
         a posed portrait. */
      cls: `field-note field-note--plate${note.variant === 'band' ? ' field-note--band' : ''}`,
      html: note.variant === 'band'
        ? `<div class="field-note__band">${figure(ctx.image(note.image), { root: ctx.root })}</div>`
        : figure(ctx.image(note.image), { className: 'figure--bleed', root: ctx.root }),
    },
    {
      spread: 'field note',
      folio: false,
      cls: 'field-note',
      html: `
        <div class="page__block">
          <div class="field-note__head">
            <p class="meta meta--rust">Field note</p>
            <p class="meta">${esc(note.place)}${note.date ? ` &nbsp;·&nbsp; ${esc(note.date)}` : ''}</p>
          </div>
          <div class="field-note__body">
            ${note.status === 'unwritten'
              ? `<div class="field-note__brief">
                   <p class="plate__id">${esc(note.id)}</p>
                   <p class="field-note__brief-text">${esc(note.brief || 'Not written yet.')}</p>
                   <p class="plate__spec">unwritten</p>
                 </div>`
              : `<div class="prose prose--generous">${note.html}</div>`}
          </div>
          ${note.inset
            ? `<div class="field-note__inset">
                 <div class="inset-card taped">
                   <div class="inset-card__plate">${figure(ctx.image(note.inset), { root: ctx.root, compact: true })}</div>
                   ${note.insetCaption ? `<p class="inset-card__caption">${esc(note.insetCaption)}</p>` : ''}
                 </div>
               </div>`
            : ''}
          ${note.hand ? `<p class="hand-scan hand-scan--corner">${esc(note.hand)}</p>` : ''}
        </div>`,
    },
  ],
});

/* ---- Essay spreads ------------------------------------------------------- */

const openerSpread = (spread, essay, ctx) => {
  const over = spread.variant === 'over';
  const img = ctx.image(spread.image);
  return {
  pair: true,
  pages: [
    {
      spread: over ? 'essay opener · over' : 'essay opener',
      folio: false,
      cls: 'opener opener__verso' + (over ? ' opener--over' : ''),
      html: figure(img, {
        className: 'figure--bleed',
        half: over ? 'left' : null,
        inverse: true,
        root: ctx.root,
      }),
    },
    {
      spread: over ? 'essay opener · over' : 'essay opener',
      folio: false,
      cls: 'opener opener__recto' + (over ? ' opener--over' : ''),
      html: `
        ${over ? figure(img, { className: 'figure--bleed', half: 'right', inverse: true, root: ctx.root }) : ''}
        <div class="page__block">
          <div class="opener__eyebrow">
            <p class="meta">Part ${esc(essay.part)} &nbsp;·&nbsp; ${esc(essay.partTitle)}</p>
            <p class="numeral">${esc(essay.number)}</p>
          </div>
          <div class="opener__head">
            <h2 class="essay-title">${esc(essay.title)}</h2>
            <p class="deck">${esc(essay.deck)}</p>
          </div>
          <div class="opener__foot">
            <div class="prose prose--lead opener__lede">${(spread.blocks || []).map((b) => block(ctx.blocks, b)).join('')}</div>
            <p class="meta">${essay.readingTime} min</p>
          </div>
        </div>`,
    },
  ],
  };
};

/* A scanned hand, laid over the page by the layout rather than baked into a
   picture — so it can sit in a margin on one spread and across a figure on the
   next, and so it can be moved without regenerating an image. */
const handScan = (h, ctx) => h ? `
  <div class="hand-scan hand-scan--${esc(h.at || 'margin')}"
       style="${h.rotate ? `--hand-rotate:${h.rotate}deg;` : ''}${h.width ? `--hand-width:${h.width};` : ''}">
    ${figure(ctx.image(h.image), { root: ctx.root })}
  </div>` : '';

const subhead = (s) => s.subhead ? `<h3 class="subhead">${esc(s.subhead)}</h3>` : '';

/* The taped card, whether it holds a drawn figure or a small photograph. */
const insetCard = (inset, ctx) => {
  if (!inset) return '';
  const guts = inset.image
    ? `<div class="inset-card__plate">${figure(ctx.image(inset.image), { root: ctx.root, compact: true })}</div>`
    : (diagrams[inset.figure] || (() => ''))();
  return `
    <div class="reading__inset">
      <div class="inset-card taped">
        ${inset.title ? `<p class="inset-card__title">${esc(inset.title)}</p>` : ''}
        ${guts}
        ${inset.caption ? `<p class="inset-card__caption">${esc(inset.caption)}</p>` : ''}
      </div>
      ${inset.hand ? `<p class="hand hand--under">${esc(inset.hand)}</p>` : ''}
    </div>`;
};

/* VISIBLE / PRESENT — what a place is doing versus what it is showing you.
   A quiet foreshadow of the hidden-systems stages. */
const ledger = (l) => l ? `
  <aside class="ledger">
    <p class="ledger__title">${esc(l.title)}</p>
    <dl class="ledger__row">
      <dt>Visible</dt><dd>${l.visible.map(esc).join(', ')}</dd>
    </dl>
    <dl class="ledger__row ledger__row--present">
      <dt>Present</dt><dd>${l.present.map(esc).join(', ')}</dd>
    </dl>
  </aside>` : '';

/* NOTICE THIS, in either form: a single understated line, or a short numbered
   sequence. Both are optional and neither is homework. */
const noticeBlock = (spread) => {
  if (!spread.notice && !spread.noticeSteps) return '';
  return `
    <aside class="notice">
      <p class="notice__label">Notice this</p>
      ${spread.noticeLede ? `<p class="notice__lede">${esc(spread.noticeLede)}</p>` : ''}
      ${spread.noticeSteps
        ? `<ol class="notice__steps">${spread.noticeSteps.map((s) => `<li><span>${s}</span></li>`).join('')}</ol>`
        : `<p class="notice__body">${spread.notice}</p>`}
    </aside>`;
};

const contactSheet = (cs, ctx) => cs ? `
  <div class="contact-sheet">
    ${cs.images.map((id, i) => `
      <figure class="contact-sheet__cell">
        <div class="contact-sheet__plate">${figure(ctx.image(id), { root: ctx.root, compact: true })}</div>
        <figcaption class="specimen">${esc(cs.captions[i] || '')}</figcaption>
      </figure>`).join('')}
  </div>` : '';

const readingTwo = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'reading · two column',
      folio: true,
      cls: 'reading reading--two',
      html: `
        ${ground(ctx.image(spread.ground), { root: ctx.root, side: 'left' })}
        <div class="page__block">
          <div class="reading__running">
            <p class="meta">${esc(essay.runningHead)}</p>
            <p class="meta">Part ${esc(essay.part)}</p>
          </div>
          ${subhead(spread)}
          <div class="prose prose--cols${spread.dropCap ? ' prose--drop' : ''}">${block(ctx.blocks, spread.blocks[0])}</div>
          ${spread.bandImage ? `<div class="reading__band">${figure(ctx.image(spread.bandImage), { root: ctx.root, dark: (ctx.stage || 1) >= 3 })}</div>` : ''}
          ${spread.insetOn === 'recto' ? '' : insetCard(spread.inset, ctx)}
          ${spread.handOn === 'recto' ? '' : handScan(spread.hand, ctx)}
          ${spread.noteOn === 'verso' && spread.marginNote ? `<div class="reading__note"><p class="margin-note">${spread.marginNote}</p></div>` : ''}
        </div>`,
    },
    {
      spread: 'reading · two column',
      folio: true,
      cls: 'reading reading--two',
      html: `
        ${ground(ctx.image(spread.ground), { root: ctx.root, side: 'right' })}
        <div class="page__block">
          <div class="reading__running">
            <p class="meta">&nbsp;</p>
            <p class="meta">${esc(essay.partTitle)}</p>
          </div>
          <div class="prose prose--cols">${block(ctx.blocks, spread.blocks[1])}</div>
          ${contactSheet(spread.contactSheet, ctx)}
          ${spread.insetOn === 'recto' ? insetCard(spread.inset, ctx) : ''}
          ${spread.handOn === 'recto' ? handScan(spread.hand, ctx) : ''}
          ${spread.noteOn === 'verso' || !spread.marginNote ? '' : `<div class="reading__note"><p class="margin-note">${spread.marginNote}</p></div>`}
        </div>`,
    },
  ],
});

const readingAside = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'reading · asymmetric',
      folio: true,
      cls: 'reading reading--aside',
      html: `
        ${ground(ctx.image(spread.ground), { root: ctx.root })}
        <div class="page__block">
          <div class="reading__running">
            <p class="meta">${esc(essay.runningHead)}</p>
            <p class="meta">Part ${esc(essay.part)}</p>
          </div>
          ${subhead(spread)}
          <div class="prose prose--generous${spread.dropCap ? ' prose--drop' : ''}">${block(ctx.blocks, spread.blocks[0])}</div>
          ${spread.image ? `<div class="reading__plate">${figure(ctx.image(spread.image), { root: ctx.root })}</div>` : ''}
        </div>`,
    },
    {
      spread: 'reading · asymmetric',
      folio: true,
      cls: 'reading reading--aside',
      html: `
        ${ground(ctx.image(spread.ground), { root: ctx.root })}
        <div class="page__block">
          <div class="prose prose--generous">${block(ctx.blocks, spread.blocks[1])}</div>
          ${spread.figure ? `
            <div class="reading__figure">
              <p class="label"><b>Fig.</b> ${esc(spread.figureTitle || '')}</p>
              ${(diagrams[spread.figure] || (() => ''))()}
            </div>` : ''}
          ${spread.marginNote ? `<div class="reading__note"><p class="margin-note">${spread.marginNote}</p></div>` : ''}
          ${noticeBlock(spread)}
        </div>`,
    },
  ],
});

/* A real record, reproduced. The book sets its own specimen labels in mono with
   codes and dates; this is one that already existed, about the reader's author,
   made by something else. It carries its source the way a fact does, because it
   IS a fact and it is registered as one. */
const record = (r) => {
  if (!r) return '';
  return `
    <div class="quote-spread__record record${r.variant ? ` record--${esc(r.variant)}` : ''}">
      <div class="record__head">
        <p class="label">${esc(r.title)}</p>
        <p class="record__count">${esc(r.count)}</p>
      </div>
      <ul class="record__list">
        ${(r.items || []).map((i) => `<li>${esc(i)}</li>`).join('')}
      </ul>
      <p class="record__source">${esc(r.source)}</p>
    </div>`;
};

const pullQuote = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'pull quote',
      folio: false,
      cls: 'quote-spread quote-spread--verso',
      html: `
        ${record(spread.record)}
        ${spread.image && !spread.record ? `<div class="quote-spread__figure">${figure(ctx.image(spread.image), { root: ctx.root, dark: (ctx.stage || 1) >= 3 })}</div>` : ''}
        <div class="page__block">
          ${spread.variant === 'bare' && !spread.notice && !spread.noticeSteps
            ? `<div class="quote-spread__mark">${radiant(16, 24)}</div>` : ''}
          ${noticeBlock(spread)}
          ${contactSheet(spread.contactSheet, ctx)}
          <p class="quote-spread__lede meta">${esc(spread.lede)}</p>
        </div>`,
    },
    {
      spread: 'pull quote',
      folio: false,
      cls: 'quote-spread',
      html: `
        <div class="page__block">
          <span class="quote-mark"></span>
          <blockquote class="pull-quote">${esc(spread.quote)}</blockquote>
        </div>`,
    },
  ],
});

const imageEssayBand = (spread, essay, ctx) => {
  const img = ctx.image(spread.image);
  return {
    pair: true,
    pages: [
      {
        spread: 'image + essay · band',
        folio: true,
        cls: 'image-essay image-essay--band',
        html: `
          <div class="image-essay__figure">${figure(img, { half: 'left', root: ctx.root })}</div>
          <div class="page__block">
            ${subhead(spread)}
            <div class="prose image-essay__text">${block(ctx.blocks, spread.blocks[0])}</div>
            <p class="caption image-essay__caption-flow">${spread.caption || ''}</p>
          </div>`,
      },
      {
        spread: 'image + essay · band',
        folio: true,
        cls: 'image-essay image-essay--band',
        html: `
          <div class="image-essay__figure">${figure(img, { half: 'right', root: ctx.root })}</div>
          <div class="page__block">
            <div class="prose image-essay__text">${block(ctx.blocks, spread.blocks[1])}</div>
          </div>`,
      },
    ],
  };
};

/* A field of marks that is really a diagram wearing an image's clothes. */
const markField = (spread, essay, ctx) => {
  const render = diagrams[spread.figure] || (() => '');
  const foot = (side) => side === 'verso'
    ? `<div class="mark-field__foot">
         <div class="prose mark-field__note">${(spread.blocks || []).map((b) => block(ctx.blocks, b)).join('')}</div>
       </div>`
    : `<div class="mark-field__foot mark-field__legend">
         <p class="meta">${esc(spread.label || '')}</p>
         <p class="meta meta--rust"><span class="mark-field__swatch"></span>${esc(spread.sublabel || '')}</p>
       </div>`;
  return {
    pair: true,
    pages: ['verso', 'recto'].map((side, i) => ({
      spread: 'mark field',
      folio: false,
      cls: 'mark-field',
      html: `<div class="mark-field__stage">${render(i)}</div>${foot(side)}`,
    })),
  };
};

/* A sequence of images, deliberately unequal, with almost no text. */
const visualEssay = (spread, essay, ctx) => {
  const img = (id, cls) => `<div class="${cls}">${figure(ctx.image(id), { root: ctx.root })}</div>`;
  const [a, b, c, d, e] = spread.images;
  return {
    pair: true,
    pages: [
      {
        spread: 'visual essay',
        folio: true,
        cls: 'visual-essay',
        html: `
          <div class="visual-essay__grid">
            <div class="ve-note">
              <p class="meta meta--rust">${esc(spread.title || '')}</p>
              <p class="caption">${spread.note || ''}</p>
            </div>
            ${img(a, 've-a')}
            ${img(b, 've-b')}
          </div>`,
      },
      {
        spread: 'visual essay',
        folio: true,
        cls: 'visual-essay',
        html: `
          <div class="visual-essay__grid">
            ${img(c, 've-c')}
            ${img(d, 've-d')}
            ${img(e, 've-e')}
          </div>`,
      },
    ],
  };
};

/* An archival collection record laid over a photograph. With `image:` it also
   carries its own small plate, which is the only place in the book where a
   1,280 px source is at home: at 66 mm that is 493 dpi. */
const specimenCard = (rows, position = 'br', ctx = null) => {
  if (!rows) return '';
  const { notes, image, ...fields } = rows;
  const plate = image && ctx
    ? `<div class="specimen-card__plate">${figure(ctx.image(image), { root: ctx.root, compact: true })}</div>`
    : '';
  return `
    <div class="specimen-card specimen-card--${position}${image ? ' specimen-card--plated' : ''}">
      ${plate}
      ${Object.entries(fields).map(([k, v]) =>
        `<dl class="specimen-card__row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></dl>`).join('')}
      ${notes ? `<p class="specimen-card__notes">${esc(notes)}</p>` : ''}
    </div>`;
};

const imageEssay = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'image + essay',
      folio: true,
      cls: 'image-essay image-essay--tall' + (spread.blocks && spread.blocks.length > 1 ? ' image-essay--split' : ''),
      html: `
        <div class="image-essay__figure">${figure(ctx.image(spread.image), { root: ctx.root, dark: (ctx.stage || 1) >= 3 })}
          ${specimenCard(spread.specimen, 'bl', ctx)}</div>
        ${spread.blocks && spread.blocks.length > 1 ? `
          <div class="page__block">
            ${subhead(spread)}
            <div class="prose image-essay__text">${block(ctx.blocks, spread.blocks[0])}</div>
          </div>` : ''}
        <div class="image-essay__caption">
          <p class="caption">${spread.caption || ''}</p>
        </div>`,
    },
    {
      spread: 'image + essay',
      folio: true,
      cls: 'image-essay image-essay--text',
      html: `
        <div class="page__block">
          ${spread.blocks && spread.blocks.length > 1 ? '' : subhead(spread)}
          <div class="prose prose--generous image-essay__text${spread.dropCap ? ' prose--drop' : ''}">${
            spread.blocks && spread.blocks.length > 1
              ? block(ctx.blocks, spread.blocks[1])
              : (spread.blocks || []).map((b) => block(ctx.blocks, b)).join('')}</div>
          ${spread.figure ? `
            <div class="image-essay__figure-note">
              <p class="label"><b>Fig.</b> ${esc(spread.figureTitle || '')}</p>
              ${(diagrams[spread.figure] || (() => ''))()}
            </div>` : ''}
          ${spread.sidebar ? `
            <aside class="sidebar">
              <p class="sidebar__title">${esc(spread.sidebar.title)}</p>
              <ul class="sidebar__list">${spread.sidebar.lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
            </aside>` : ''}
          ${spread.hand ? `<p class="hand">${esc(spread.hand)}</p>` : ''}
          <div class="image-essay__mark"><span class="dot"></span></div>
        </div>`,
    },
  ],
});

const fullBleed = (spread, essay, ctx) => {
  const img = ctx.image(spread.image);
  return {
    pair: true,
    pages: [
      {
        spread: 'full bleed',
        folio: false,
        cls: 'bleed-spread',
        html: figure(img, { className: 'figure--bleed', half: 'left', inverse: true, root: ctx.root }),
      },
      {
        spread: 'full bleed',
        folio: false,
        cls: 'bleed-spread',
        html: `
          ${figure(img, { className: 'figure--bleed', half: 'right', inverse: true, root: ctx.root })}
          ${spread.caption ? `<p class="bleed-spread__caption caption">${esc(spread.caption)}</p>` : ''}`,
      },
    ],
  };
};

const diagramSpread = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'diagram',
      folio: true,
      cls: 'diagram-spread',
      html: `
        <div class="page__block">
          <div class="diagram__head">
            <p class="meta meta--rust">Figure ${esc(essay.number)}.1</p>
            <h3 class="diagram__title">${esc(spread.title)}</h3>
          </div>
          <div class="prose diagram__note">${(spread.blocks || []).map((b) => block(ctx.blocks, b)).join('')}</div>
        </div>`,
    },
    {
      spread: 'diagram',
      folio: true,
      cls: 'diagram-spread',
      html: `
        <div class="diagram__stage">${(diagrams[spread.figure] || (() => ''))()}</div>
        <div class="diagram__legend">
          ${(spread.legend || []).map((l) => `<p class="caption">${l}</p>`).join('')}
        </div>`,
    },
  ],
});

/* The closer: the last words on the verso, one photograph facing them. Text
   left, image right — the return-to-calm cadence. */
const closing = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'closing',
      folio: true,
      cls: 'closing closing--words',
      html: `
        <div class="page__block">
          ${subhead(spread)}
          <div class="prose prose--generous">${(spread.blocks || []).map((b) => block(ctx.blocks, b)).join('')}</div>
          <div class="closing__end">
            <p class="closing__line">${nb(esc(spread.line))}</p>
            ${spread.coda ? `<p class="closing__coda">${esc(spread.coda)}</p>` : ''}
          </div>
        </div>`,
    },
    {
      spread: 'closing',
      folio: false,
      cls: `closing closing--plate${spread.quote ? ' closing--quote' : ''}`,
      /* The recto of a closing spread is otherwise blank. An essay that has no
         pull-quote spread of its own puts its sentence here, which is the
         treatment a pull quote wanted anyway — one line alone on a page — at no
         cost in extent. */
      html: `${spread.image
        ? `<div class="closing__figure">${figure(ctx.image(spread.image), { className: 'figure--bleed', inverse: true, root: ctx.root })}</div>`
        : ''}${spread.quote ? `
        <div class="page__block">
          <span class="quote-mark"></span>
          <blockquote class="pull-quote">${esc(spread.quote)}</blockquote>
        </div>` : ''}`,
    },
  ],
});

/* The device that carries the progression: one declarative line, one
   imperative under it, and an image or diagram facing it. */
const statement = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'stage statement',
      folio: false,
      cls: 'statement-spread',
      html: `
        <div class="page__block">
          <p class="stage-mark">${esc(spread.stageMark || '')}</p>
          <p class="statement">${esc(spread.statement)}</p>
          <p class="imperative">${esc(spread.imperative)}</p>
        </div>`,
    },
    {
      spread: 'stage statement',
      folio: false,
      cls: 'statement-spread statement-spread--figure',
      html: `${figure(ctx.image(spread.image), { className: 'figure--bleed', inverse: true, root: ctx.root })}
        ${spread.caption ? `<p class="caption statement__caption">${spread.caption}</p>` : ''}`,
    },
  ],
});

/* The same place twice: the view you would describe, and the one you would
   only find by standing still. */
const imagePair = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'image pair',
      folio: true,
      cls: 'image-pair',
      html: `
        <div class="image-pair__figure image-pair__figure--broad">${figure(ctx.image(spread.images[0]), { root: ctx.root })}</div>
        <div class="page__block">
          ${subhead(spread)}
          <div class="prose prose--generous">${block(ctx.blocks, spread.blocks[0])}</div>
        </div>`,
    },
    {
      spread: 'image pair',
      folio: true,
      cls: 'image-pair',
      html: `
        <div class="image-pair__figure image-pair__figure--detail">${figure(ctx.image(spread.images[1]), { root: ctx.root })}</div>
        <div class="page__block">
          <div class="prose prose--generous">${block(ctx.blocks, spread.blocks[1])}</div>
          ${ledger(spread.ledger)}
        </div>`,
    },
  ],
});

/* One subject, four visits. The frame holds still so the world can be seen
   moving. */
const sequence = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'sequence',
      folio: true,
      cls: 'sequence-spread',
      html: `
        <div class="page__block">
          ${subhead(spread)}
          <div class="prose prose--generous">${block(ctx.blocks, spread.blocks[0])}</div>
          ${spread.marginNote ? `<p class="sequence__pull">${esc(spread.marginNote)}</p>` : ''}
        </div>`,
    },
    {
      spread: 'sequence',
      folio: true,
      cls: 'sequence-spread',
      html: `
        <div class="sequence__strip">
          ${spread.images.map((id) => `<div class="sequence__cell">${figure(ctx.image(id), { root: ctx.root, compact: true })}</div>`).join('')}
        </div>
        <div class="page__block sequence__block">
          <div class="prose prose--generous">${block(ctx.blocks, spread.blocks[1])}</div>
        </div>`,
    },
  ],
});

/* A material break. Everything else in the book is pigment on paper; this is a
   spread of something that is not. Placed on a stage turn, so the change of
   substance and the change of register land together. */
const materialBreak = (spread, essay, ctx) => {
  const img = ctx.image(spread.image);
  return {
    pair: true,
    pages: ['left', 'right'].map((half) => ({
      spread: 'material break',
      folio: false,
      cls: 'material-break',
      html: `${figure(img, { className: 'figure--bleed', half, inverse: true, root: ctx.root })}
        ${half === 'right' && spread.line
          ? `<p class="material-break__line">${esc(spread.line)}</p>` : ''}
        ${half === 'left' && spread.label
          ? `<p class="material-break__label specimen">${esc(spread.label)}</p>` : ''}`,
    })),
  };
};

export const essaySpreads = {
  statement,
  'material-break': materialBreak,
  'image-pair': imagePair,
  sequence,
  opener: openerSpread,
  'reading-two': readingTwo,
  'reading-aside': readingAside,
  'pull-quote': pullQuote,
  'image-essay': imageEssay,
  'image-essay-band': imageEssayBand,
  'mark-field': markField,
  'visual-essay': visualEssay,
  'full-bleed': fullBleed,
  diagram: diagramSpread,
  closing,
};
