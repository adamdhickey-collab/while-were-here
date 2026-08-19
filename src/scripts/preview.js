/* Screen preview only — pagination proofing, guides, spread navigation.
   Loaded by build/preview.html and never by build/book.html. */

(function () {
  const body = document.body;
  const pages = Array.from(document.querySelectorAll('.page'));

  /* ---- Group pages into facing spreads ---------------------------------- */
  const stage = document.createElement('div');
  stage.className = 'stage';
  body.appendChild(stage);
  const spreads = [];
  let current = null;

  const openSpread = () => {
    current = document.createElement('div');
    current.className = 'spread';
    spreads.push(current);
    stage.appendChild(current);
    return current;
  };

  pages.forEach((page) => {
    const side = page.dataset.side;
    if (side === 'verso' || !current || current.childElementCount >= 2) openSpread();
    current.appendChild(page);
    if (side === 'recto') current = null;   // a recto closes the spread
  });

  spreads.forEach((spread, i) => {
    const kids = Array.from(spread.children);
    spread.classList.add(kids.length === 2 ? 'spread--pair' : 'spread--single');
    if (kids.length === 1) spread.classList.add('spread--' + kids[0].dataset.side);

    const folios = kids.map((p) => p.dataset.folio || p.dataset.label || '—').join(' · ');
    const types = [...new Set(kids.map((p) => p.dataset.spread).filter(Boolean))].join(' + ');
    const label = document.createElement('div');
    label.className = 'spread__label';
    label.innerHTML = `<b>Spread ${String(i + 1).padStart(2, '0')}</b> &nbsp; ${folios} &nbsp; <i>${types}</i>`;
    spread.appendChild(label);
  });

  /* ---- Guides ------------------------------------------------------------ */
  const cols = Number(getComputedStyle(document.documentElement).getPropertyValue('--grid-cols')) || 12;
  pages.forEach((page) => {
    const g = document.createElement('div');
    g.className = 'guides';
    const grid = document.createElement('div');
    grid.className = 'g-grid';
    for (let i = 0; i < cols; i++) grid.appendChild(document.createElement('span'));

    // margin box mirrors the recto/verso flip
    const margin = document.createElement('div');
    margin.className = 'g-margin';
    const inside = 'var(--m-inside)';
    const outside = 'var(--m-outside)';
    const isRecto = page.dataset.side === 'recto';
    margin.style.top = 'var(--m-top)';
    margin.style.bottom = 'var(--m-bottom)';
    margin.style.left = isRecto ? inside : outside;
    margin.style.right = isRecto ? outside : inside;
    grid.style.position = 'absolute';
    grid.style.top = 'var(--m-top)';
    grid.style.bottom = 'var(--m-bottom)';
    grid.style.left = isRecto ? inside : outside;
    grid.style.right = isRecto ? outside : inside;

    ['g-trim', 'g-bleed', 'g-safe', 'g-baseline'].forEach((cls) => {
      const el = document.createElement('div');
      el.className = cls;
      g.appendChild(el);
    });
    g.append(margin, grid);
    page.appendChild(g);
  });

  /* ---- Overflow detection ------------------------------------------------ */
  const checkOverflow = () => {
    pages.forEach((page) => {
      page.classList.remove('has-overflow');
      page.querySelector('.overflow-flag')?.remove();
      const blocks = page.querySelectorAll('.page__block, .prose, .plate__bottom');
      let bad = false;
      blocks.forEach((b) => {
        if (b.scrollHeight - b.clientHeight > 2 || b.scrollWidth - b.clientWidth > 2) bad = true;
      });
      const pr = page.getBoundingClientRect();
      page.querySelectorAll('.page__block > *').forEach((child) => {
        const cr = child.getBoundingClientRect();
        if (cr.bottom > pr.bottom + 1 || cr.top < pr.top - 1) bad = true;
      });
      if (bad) {
        page.classList.add('has-overflow');
        const flag = document.createElement('div');
        flag.className = 'overflow-flag';
        flag.textContent = 'copy overflow';
        page.appendChild(flag);
      }
    });
  };

  /* ---- Control bar ------------------------------------------------------- */
  const bar = document.createElement('div');
  bar.className = 'bar';
  bar.innerHTML = `
    <span class="bar__brand">While We’re Here</span>
    <span class="bar__sep"></span>
    <span class="bar__group" data-role="guides">
      <button data-toggle="show-trim">Trim</button>
      <button data-toggle="show-bleed">Bleed</button>
      <button data-toggle="show-safe">Safe</button>
      <button data-toggle="show-margin">Margins</button>
      <button data-toggle="show-grid">Grid</button>
      <button data-toggle="show-baseline">Baseline</button>
    </span>
    <span class="bar__sep"></span>
    <span class="bar__group">
      <button data-mode="all" aria-pressed="true">All spreads</button>
      <button data-mode="one">One spread</button>
      <button data-mode="pages">Pages</button>
    </span>
    <span class="bar__spacer"></span>
    <span class="bar__hint">&larr; &rarr; spread &nbsp;·&nbsp; +/&minus; zoom</span>
    <span class="bar__sep"></span>
    <span class="bar__group">
      <button data-zoom="-1">&minus;</button>
      <span class="bar__zoom">—</span>
      <button data-zoom="1">+</button>
      <button data-zoom="fit">Fit</button>
    </span>`;
  body.appendChild(bar);

  bar.querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cls = btn.dataset.toggle;
      const on = body.classList.toggle(cls);
      btn.setAttribute('aria-pressed', String(on));
    });
  });

  let index = 0;
  const setCurrent = () => {
    spreads.forEach((s, i) => s.classList.toggle('is-current', i === index));
    if (!body.classList.contains('mode-one')) {
      spreads[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  bar.querySelectorAll('[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      body.classList.remove('mode-one', 'mode-pages');
      if (btn.dataset.mode !== 'all') body.classList.add('mode-' + btn.dataset.mode);
      setCurrent();
      requestAnimationFrame(checkOverflow);
    });
  });

  /* ---- Zoom -------------------------------------------------------------- */
  const readout = bar.querySelector('.bar__zoom');
  let scale = 1;
  const spreadWidth = () => {
    const pair = spreads.find((s) => s.classList.contains('spread--pair')) || spreads[0];
    return pair ? pair.getBoundingClientRect().width / scale : 1;
  };
  const fit = () => Math.min(1, (window.innerWidth - 140) / spreadWidth());
  const apply = () => {
    stage.style.zoom = scale;
    readout.textContent = Math.round(scale * 100) + '%';
    requestAnimationFrame(checkOverflow);
  };
  const setScale = (v) => { scale = Math.min(1.6, Math.max(0.06, v)); apply(); };

  bar.querySelectorAll('[data-zoom]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const z = btn.dataset.zoom;
      if (z === 'fit') setScale(fit());
      else setScale(scale + Number(z) * 0.08);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { index = Math.min(spreads.length - 1, index + 1); setCurrent(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp')   { index = Math.max(0, index - 1); setCurrent(); }
    if (e.key === '+' || e.key === '=') setScale(scale + 0.08);
    if (e.key === '-') setScale(scale - 0.08);
    if (e.key === '0') setScale(fit());
    if (e.key === 'g') bar.querySelector('[data-toggle="show-grid"]').click();
  });

  /* exposed for automated proofing and for jumping to a spread from the console */
  window.book = {
    goto: (i) => { index = Math.max(0, Math.min(spreads.length - 1, i)); setCurrent(); },
    spreads,
    check: checkOverflow,
  };

  window.addEventListener('resize', () => setScale(fit()));
  scale = 1;
  setScale(fit());
  setCurrent();
  if (document.fonts?.ready) document.fonts.ready.then(checkOverflow);
})();
