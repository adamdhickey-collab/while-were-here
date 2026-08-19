/* ==========================================================================
   Spread renderers.
   Each returns { pair, pages: [ { spread, folio, cls, html } ] }. A pair always
   occupies verso + recto in that order; the compositor guarantees it.
   No essay copy lives here — only composition.
   ========================================================================== */

import { esc, figure, ring, block } from './helpers.mjs';
import { diagrams } from './diagrams.mjs';

const nb = (s = '') => String(s).replace(/ (\w{1,3})$/, '&nbsp;$1');

/* ---- Covers -------------------------------------------------------------- */

export const coverFront = (bookData) => ({
  pair: false,
  pages: [{
    spread: 'cover',
    folio: false,
    cls: 'cover',
    label: 'front cover',
    html: `
      <div class="cover__inner">
        <div class="cover__mark">${ring(15)}</div>
        <h1 class="cover__title"><span>While</span><span>We’re</span><span>Here</span></h1>
        <p class="cover__author">${esc(bookData.author)}</p>
      </div>`,
  }],
});

export const coverBack = (bookData) => ({
  pair: false,
  pages: [{
    spread: 'cover',
    folio: false,
    cls: 'cover cover-back',
    label: 'back cover',
    html: `
      <div class="cover__inner">
        <p class="cover-back__line">${esc(bookData.backCoverLine)}</p>
        <div class="cover-back__meta">
          <p class="cover-back__blurb">${esc(bookData.backCoverBlurb)}</p>
          <div class="cover-back__isbn">ISBN &amp; barcode<br>placement</div>
        </div>
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

export const contents = (bookData, toc) => {
  const half = (parts) => parts.map((p) => `
      <section class="contents__part">
        <p class="meta meta--rust">Part ${esc(p.number)}</p>
        <h3 class="contents__part-title">${esc(p.title)}</h3>
        <ul class="contents__essays">
          ${p.essays.map((e) => `
            <li class="${e.status === 'planned' ? 'is-forthcoming' : ''}">
              <span>${esc(e.title)}</span>
              <span class="contents__dots"></span>
              <span class="contents__folio">${e.status === 'laid-out' ? '013' : '—'}</span>
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
              <p class="meta">Four parts &nbsp;·&nbsp; eighteen essays</p>
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
      html: `<div class="divider__figure">${figure(ctx.image(section.image), { className: 'figure--bleed', inverse: true, root: ctx.root })}</div>`,
    },
    {
      spread: 'section divider',
      folio: false,
      cls: 'divider',
      html: `
        <div class="page__block">
          <p class="divider__num numeral">Part ${esc(section.number)}</p>
          <h2 class="display">${esc(section.title)}</h2>
          <ul class="divider__list">
            <li><p class="caption">${esc(section.blurb)}</p></li>
          </ul>
        </div>`,
    },
  ],
});

/* ---- Essay spreads ------------------------------------------------------- */

const openerSpread = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'essay opener',
      folio: false,
      cls: 'opener opener__verso',
      html: figure(ctx.image(spread.image), { className: 'figure--bleed', inverse: true, root: ctx.root }),
    },
    {
      spread: 'essay opener',
      folio: false,
      cls: 'opener opener__recto',
      html: `
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
            <div class="prose prose--lead opener__lede">${spread.blocks.map((b) => block(ctx.blocks, b)).join('')}</div>
            <p class="meta">${essay.readingTime} min</p>
          </div>
        </div>`,
    },
  ],
});

const readingTwo = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'reading · two column',
      folio: true,
      cls: 'reading reading--two',
      html: `
        <div class="page__block">
          <div class="reading__running">
            <p class="meta">${esc(essay.runningHead)}</p>
            <p class="meta">Part ${esc(essay.part)}</p>
          </div>
          <div class="prose prose--cols">${block(ctx.blocks, spread.blocks[0])}</div>
          ${spread.bandImage ? `<div class="reading__band">${figure(ctx.image(spread.bandImage), { root: ctx.root })}</div>` : ''}
        </div>`,
    },
    {
      spread: 'reading · two column',
      folio: true,
      cls: 'reading reading--two',
      html: `
        <div class="page__block">
          <div class="reading__running">
            <p class="meta">&nbsp;</p>
            <p class="meta">${esc(essay.partTitle)}</p>
          </div>
          <div class="prose prose--cols">${block(ctx.blocks, spread.blocks[1])}</div>
          ${spread.marginNote ? `<div class="reading__note"><p class="margin-note">${spread.marginNote}</p></div>` : ''}
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
        <div class="page__block">
          <div class="reading__running">
            <p class="meta">${esc(essay.runningHead)}</p>
            <p class="meta">Part ${esc(essay.part)}</p>
          </div>
          <div class="prose prose--generous">${block(ctx.blocks, spread.blocks[0])}</div>
        </div>`,
    },
    {
      spread: 'reading · asymmetric',
      folio: true,
      cls: 'reading reading--aside',
      html: `
        <div class="page__block">
          <div class="prose prose--generous">${block(ctx.blocks, spread.blocks[1])}</div>
          ${spread.notice ? `
            <aside class="notice">
              <p class="notice__label">Notice this</p>
              <p class="notice__body">${spread.notice}</p>
            </aside>` : ''}
        </div>`,
    },
  ],
});

const pullQuote = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'pull quote',
      folio: false,
      cls: 'quote-spread quote-spread--verso',
      html: `
        <div class="quote-spread__figure">${figure(ctx.image(spread.image), { root: ctx.root })}</div>
        <div class="page__block">
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

const imageEssay = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'image + essay',
      folio: true,
      cls: 'image-essay image-essay--tall',
      html: `
        <div class="image-essay__figure">${figure(ctx.image(spread.image), { root: ctx.root })}</div>
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
          <div class="prose prose--generous image-essay__text">${spread.blocks.map((b) => block(ctx.blocks, b)).join('')}</div>
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
          <div class="prose diagram__note">${spread.blocks.map((b) => block(ctx.blocks, b)).join('')}</div>
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

const closing = (spread, essay, ctx) => ({
  pair: true,
  pages: [
    {
      spread: 'closing',
      folio: true,
      cls: 'closing',
      html: `
        <div class="page__block">
          <div class="prose prose--generous">${spread.blocks.map((b) => block(ctx.blocks, b)).join('')}</div>
        </div>`,
    },
    {
      spread: 'closing',
      folio: false,
      cls: 'closing closing--line',
      html: `
        <div class="page__block">
          <p class="closing__line pull-quote">${nb(esc(spread.line))}</p>
          <div class="closing__mark">
            <span class="dot"></span>
            <p class="meta">${esc(essay.title)}</p>
          </div>
        </div>`,
    },
  ],
});

export const essaySpreads = {
  opener: openerSpread,
  'reading-two': readingTwo,
  'reading-aside': readingAside,
  'pull-quote': pullQuote,
  'image-essay': imageEssay,
  'full-bleed': fullBleed,
  diagram: diagramSpread,
  closing,
};
