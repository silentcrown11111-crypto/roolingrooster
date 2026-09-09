/* ==========================================================================
   THE ROLLING ROOSTER — main.js
   Render (menu, deals, phones) → navigation → scroll-linked motion.
   GSAP + ScrollTrigger drive every scene; Lenis smooths the scroll.
   prefers-reduced-motion: everything renders static, nothing pins.
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const desktop = () => matchMedia('(min-width: 1024px)').matches;
  const MENU = window.RR_MENU, U = window.RR_UTIL;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);

  /* -------------------------------------------------------------- render */
  function renderMenu() {
    const tabs = $('#menuTabs'), body = $('#menuBody');
    tabs.innerHTML = MENU.categories.map((c, i) => `<a class="menu__tab${i ? '' : ' is-active'}" href="#cat-${c.id}" data-cat="${c.id}">${c.short}</a>`).join('');
    body.innerHTML = MENU.categories.map((cat, ci) => {
      const n = String(ci + 1).padStart(2, '0');
      let items;
      if (cat.sized) {
        items = `<div class="menu__sizes" aria-hidden="true"><span>${cat.sizeLabel || 'Sizes'}</span><div>${MENU.sizes.map(s => `<span>${s}</span>`).join('')}</div></div>` +
          cat.items.map(it => `<div class="mi${it.star ? ' mi--star' : ''}">
            <div class="mi__name">${it.name}${it.star ? '<span class="mi__star">Popular</span>' : ''}</div>
            <div class="mi__prices" aria-label="${MENU.sizes.map((s, i) => `${s} ${U.money(it.prices[i])}`).join(', ')}">
              ${it.prices.map((p, i) => `<span><small>${MENU.sizes[i]}</small><b>${p.toLocaleString()}</b></span>`).join('')}</div></div>`).join('');
      } else {
        items = cat.items.map(it => `<div class="mi${it.image ? ' mi--img' : ''}${it.star ? ' mi--star' : ''}">
            ${it.image ? `<img src="${it.image}" alt="${it.name}" width="56" height="56" loading="lazy">` : ''}
            <div class="mi__name">${it.name}${it.note ? `<span class="mi__note">${it.note}</span>` : ''}${it.star ? '<span class="mi__star">Popular</span>' : ''}</div>
            <div class="mi__price">${it.priceLabel ? `<small>${it.priceLabel}</small>` : `<small>Rs</small>${it.price.toLocaleString()}`}</div></div>`).join('');
      }
      return `<section class="menu__cat" id="cat-${cat.id}" data-cat="${cat.id}" aria-labelledby="cat-${cat.id}-t">
        <div class="menu__cat-head">
          ${cat.image ? `<img src="${cat.image}" alt="" width="110" height="110" loading="lazy">` : ''}
          <span class="menu__cat-n">${n} — ${cat.items.length} item${cat.items.length > 1 ? 's' : ''}</span>
          <h3 class="menu__cat-title" id="cat-${cat.id}-t">${cat.name}</h3>
          <p class="menu__cat-blurb">${cat.blurb || ''}</p>
        </div>
        <div class="menu__items">${items}</div></section>`;
    }).join('');
  }

  function renderDeals() {
    const track = $('#railTrack');
    const skins = ['a', 'b', 'c', 'd', 'e', 'f'];
    track.innerHTML = MENU.deals.map((d, i) => {
      const msg = `Hi Rolling Rooster, I'd like to order ${d.title} (${d.persons})${d.price ? ' — Rs ' + d.price : ''}.`;
      const price = d.tiers
        ? `<div class="deal__tiers">${d.includes.map(x => { const [k, v] = x.split(' — Rs '); return `<span><small>${k}</small><b>${v}</b></span>`; }).join('')}</div>`
        : `<div class="deal__price"><small>Rs</small>${d.price.toLocaleString()}</div>`;
      const list = d.tiers ? '<ul class="deal__list"><li>Two pizzas, one price</li><li>Pick any size</li></ul>' : `<ul class="deal__list">${d.includes.map(x => `<li>${x}</li>`).join('')}</ul>`;
      return `<article class="deal deal--${skins[i]}">
        <div><div class="deal__n">Deal ${d.n} · ${d.persons}</div><h3 class="deal__title">${d.title === 'Deal ' + d.n ? d.persons : d.title}</h3></div>
        <img class="deal__img" src="${d.image}" alt="" width="440" height="440" loading="lazy">
        ${list}${price}
        <a class="btn btn--solid" href="${U.wa(MENU.business.deliveryPhones[0], msg)}" target="_blank" rel="noopener"><span>Order this</span><b aria-hidden="true">→</b></a>
      </article>`;
    }).join('');
  }

  function renderPhones() {
    const wa = '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8m-3 4.3c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.6 0 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.5-.3-1.9-.9c-.3-.1-.4-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5l-.8-2c-.2-.5-.4-.4-.6-.4Z"/></svg>';
    $('#phoneList').innerHTML = MENU.business.phones.map(p => `<li><a class="order__wa" href="${U.wa(p)}" target="_blank" rel="noopener" aria-label="WhatsApp ${p}">${wa}</a><a href="${U.tel(p)}">${p}</a>${MENU.business.deliveryPhones.includes(p) ? '<small>Delivery</small>' : ''}</li>`).join('');
    $('#year').textContent = new Date().getFullYear();
  }

  /* Wrap words of [data-split] and .manifesto__text in spans */
  function splitWords(el, inner) {
    const html = el.innerHTML.split(/<br\s*\/?>/i).map(line =>
      line.trim().split(/\s+/).filter(Boolean).map(w => inner ? `<span class="w"><span>${w}</span></span>` : `<span class="w">${w}</span>`).join(' ')
    ).join('<br>');
    el.innerHTML = html;
  }

  /* ---------------------------------------------------------- navigation */
  let lenis = null;
  function scrollTo(target) {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }
  function navigation() {
    const nav = $('#nav'), toggle = $('#navToggle'), mnav = $('#mnav');
    let lastY = 0;
    const onScroll = (y) => {
      nav.classList.toggle('is-solid', y > 30);
      if (y > innerHeight && y > lastY + 8 && !mnav.classList.contains('is-open')) nav.classList.add('is-hidden');
      else if (y < lastY - 8 || y < 120) nav.classList.remove('is-hidden');
      lastY = y;
    };
    window.addEventListener('scroll', () => onScroll(scrollY), { passive: true });
    const setOpen = o => {
      toggle.setAttribute('aria-expanded', String(o)); toggle.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      mnav.classList.toggle('is-open', o); mnav.setAttribute('aria-hidden', String(!o));
      document.body.classList.toggle('is-locked', o); if (lenis) o ? lenis.stop() : lenis.start();
      if (o) nav.classList.remove('is-hidden');
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && mnav.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
    // in-page anchors through Lenis
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href'); if (id.length < 2 || !$(id)) return;
      e.preventDefault(); if (mnav.classList.contains('is-open')) setOpen(false);
      setTimeout(() => scrollTo(id), mnav.classList.contains('is-open') ? 300 : 0);
      history.replaceState(null, '', id);
    }));
    // active link
    const links = $$('.nav__links a');
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
    links.map(a => $(a.getAttribute('href'))).filter(Boolean).forEach(s => io.observe(s));
    // light nav over cream sections
    const lio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) nav.classList.toggle('is-light', en.target.dataset.nav === 'light'); }), { rootMargin: '-0% 0px -92% 0px' });
    $$('main > section, footer').forEach(s => { if (['manifesto', 'menu', 'collage', 'order'].includes(s.id)) s.dataset.nav = 'light'; lio.observe(s); });
  }

  function menuTabs() {
    const tabs = $$('.menu__tab'), wrap = $('#menuTabs');
    const activate = id => tabs.forEach(t => { const on = t.dataset.cat === id; t.classList.toggle('is-active', on); if (on) wrap.scrollTo({ left: t.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' }); });
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) activate(en.target.dataset.cat); }), { rootMargin: '-20% 0px -70% 0px' });
    $$('.menu__cat').forEach(c => io.observe(c));
  }

  function signatureSpy() {
    const imgs = $$('#sigVisual img'), items = $$('.sig__item');
    const set = i => { imgs.forEach(im => im.classList.toggle('is-active', +im.dataset.i === i)); items.forEach(it => it.classList.toggle('is-active', +it.dataset.i === i)); };
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) set(+en.target.dataset.i); }), { rootMargin: '-35% 0px -55% 0px' });
    items.forEach(it => { io.observe(it); it.addEventListener('mouseenter', () => set(+it.dataset.i)); });
  }

  /* ---------------------------------------------------------- pointer fx */
  function pointerFX() {
    if (!fine || reduce) return;
    $$('[data-magnetic]').forEach(b => {
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* -------------------------------------------------------------- loader */
  function loader() {
    const el = $('#loader');
    if (reduce) { el.remove(); return Promise.resolve(); }
    document.body.classList.add('is-locked');
    return new Promise(res => setTimeout(() => { el.classList.add('is-done'); document.body.classList.remove('is-locked'); setTimeout(() => { el.remove(); res(); }, 900); }, 1250));
  }

  /* --------------------------------------------------------------- motion */
  function motion() {
    if (!hasGSAP || reduce) { staticFallback(); return; }
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll
    if (window.Lenis) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* ---- S01 · HERO — pinned product campaign ----
       Timeline is scrubbed to scroll: every value maps to scroll position (forwards and back).
       Phases: focus (0–.25) → depth (.25–.55) → statement (.5–.85) → hand-off (.85–1) */
    const layers = $$('.burger__layer');
    const seeds = $('#burgerSeeds'), shadow = $('#burgerShadow'), floatEl = $('#burgerFloat');
    const stmt = $$('.hero__stmt-w i');
    const mobile = () => innerWidth < 1024;
    const vw = v => innerWidth * v / 100, vh = v => innerHeight * v / 100;

    // Intro (load only): quiet, no bounce
    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
    intro.to('.hero__w', { yPercent: 0, duration: 1.2, stagger: .09 })
      .to('#burger', { yPercent: 0, scale: 1, opacity: 1, duration: 1.6 }, .3)
      .fromTo(layers, { yPercent: i => [-10, -4, 3, 8][i] }, { yPercent: 0, duration: 1.4, stagger: .04 }, .38)
      .fromTo(shadow, { opacity: 0, scaleX: .5 }, { opacity: 1, scaleX: 1, duration: 1.4 }, .5)
      .fromTo(seeds, { opacity: 0, y: -40 }, { opacity: .9, y: 0, duration: 1.6, ease: 'power3.out' }, .55)
      .to('#heroFront', { yPercent: 0, opacity: 1, duration: 1.2 }, .55)
      .to('#heroCopy', { y: 0, opacity: 1, duration: 1 }, .9)
      .to('#heroHint', { opacity: 1, duration: .8 }, 1.2);

    // A very slow breathe while idle; paused the moment the scroll sequence starts
    const idle = gsap.to(floatEl, { y: -8, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
    intro.add(() => idle.play(), 1.3);

    // Pointer depth (desktop): near layers move more than far ones
    if (fine) {
      const qx = layers.map(l => gsap.quickTo(l, 'x', { duration: .9, ease: 'power3' }));
      const qs = gsap.quickTo(seeds, 'x', { duration: 1.3, ease: 'power3' });
      $('.hero__stage').addEventListener('pointermove', e => {
        const nx = e.clientX / innerWidth - .5;
        qx.forEach((q, i) => q(nx * [16, 8, -4, -12][i]));
        qs(nx * -22);
      });
    }

    const heroTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero', start: 'top top', end: () => '+=' + (mobile() ? 230 : 320) + '%',
        pin: '.hero__stage', scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: s => {
          if (s.progress > .01) { if (idle.isActive()) { idle.pause(); gsap.to(floatEl, { y: 0, duration: .6, overwrite: 'auto' }); } }
          else if (!idle.isActive() && intro.progress() === 1) idle.play();
        },
      },
      defaults: { ease: 'none' },
    });

    heroTL
      /* Phase 1 · focus: burger comes forward to the focal point, UI copy clears */
      .to('#heroCopy', { y: 36, opacity: 0, duration: .1 }, 0)
      .to('#heroHint', { opacity: 0, duration: .06 }, 0)
      .to('#burger', { y: () => (mobile() ? -vh(1) : -vh(13)), scale: () => (mobile() ? 1.22 : 1.24), rotation: -2, duration: .28, ease: 'power1.inOut' }, 0)
      .to(shadow, { opacity: .35, scaleX: 1.2, y: 10, duration: .28 }, 0)
      .to(seeds, { y: () => vh(6), opacity: .5, duration: .28 }, 0)
      .to('#heroGlow', { scale: 1.25, opacity: 1.2, duration: .5 }, 0)
      // typography at different speeds: THE lifts, ROLLING sinks slowly behind the burger, ROOSTER (back) drops
      .to('.hero__l--1 .hero__w', { y: () => -vh(18), opacity: 0, duration: .32 }, 0)
      .to('.hero__l--2 .hero__w', { y: () => -vh(4), duration: .5 }, 0)
      .to('.hero__l--3 .hero__w', { y: () => vh(3), duration: .5 }, 0)
      // the front ROOSTER copy recedes: its clip rises so the burger emerges through the word
      .to('#heroFront', { y: () => vh(3), clipPath: 'inset(100% 0 -20% 0)', duration: .3 }, .05)
      .to('#heroMark', { y: () => -vh(10), scale: 1.12, duration: 1 }, 0)

      /* Phase 2 · depth: layers separate a touch, type drifts outward and dims */
      .to(layers, { yPercent: i => [-5, -1.5, 1.5, 5][i], scale: i => [1.03, 1.01, .995, .975][i], duration: .25, stagger: { each: .015, from: 'center' } }, .22)
      .to('#burger', { rotation: 1, duration: .3 }, .28)
      .to('.hero__l--2 .hero__w', { x: () => (mobile() ? -vw(10) : -vw(14)), opacity: .1, duration: .3 }, .3)
      .to('.hero__l--3 .hero__w', { x: () => (mobile() ? vw(10) : vw(14)), opacity: .1, duration: .3 }, .3)
      .to(seeds, { opacity: 0, y: () => vh(14), duration: .2 }, .3)

      /* Phase 3 · statement: three words wipe in progressively; old title fully out */
      .to('.hero__l--2 .hero__w, .hero__l--3 .hero__w', { opacity: 0, duration: .12 }, .5)
      .to(stmt[0], { yPercent: -105, duration: .1 }, .5)
      .to(stmt[1], { yPercent: -105, duration: .1 }, .58)
      .to(stmt[2], { yPercent: -105, duration: .1 }, .66)
      .to('#burger', { y: () => (mobile() ? vh(1) : -vh(11)), rotation: -1, duration: .25 }, .5)

      /* Phase 4 · hand-off: layers close, burger shrinks toward the top-right and leaves through the next section */
      .to(layers, { yPercent: 0, scale: 1, duration: .15 }, .82)
      .to(stmt, { yPercent: -215, duration: .12, stagger: .03 }, .84)
      .to('#burger', { x: () => (mobile() ? vw(20) : vw(22)), y: () => (mobile() ? -vh(30) : -vh(20)), scale: () => (mobile() ? .55 : .7), rotation: 7, duration: .18, ease: 'power1.inOut' }, .84)
      .to(shadow, { opacity: 0, duration: .1 }, .84)
      .to('#heroGlow', { opacity: .4, y: () => vh(20), duration: .18 }, .84)
      .fromTo('#heroProduct', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .1, onStart: () => $('#heroProduct').classList.add('is-live'), onReverseComplete: () => $('#heroProduct').classList.remove('is-live') }, .86);

    // The manifesto inherits the product: it rises into the same corner and parallaxes slowly through the type
    gsap.fromTo('#manifestoBurger', { y: () => vh(-4), rotation: 8 }, { y: () => vh(28), rotation: -4, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* ---- S03 · MANIFESTO kinetic rows + word wash ---- */
    $$('.kinetic__row').forEach(row => {
      const dir = +row.dataset.dir;
      gsap.fromTo(row, { xPercent: dir > 0 ? -30 : 0 }, { xPercent: dir > 0 ? 0 : -30, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    const words = $$('.manifesto__text .w');
    ScrollTrigger.create({ trigger: '.manifesto__inner', start: 'top 80%', end: 'bottom 55%', scrub: true,
      onUpdate: s => { const n = Math.round(s.progress * words.length); words.forEach((w, i) => w.classList.toggle('is-on', i < n)); } });

    /* ---- Split headings reveal (once, entrance only) ---- */
    $$('.split').forEach(h => gsap.to(h.querySelectorAll('.w > span'), { yPercent: 0, y: 0, duration: 1.1, ease: 'expo.out', stagger: .05, scrollTrigger: { trigger: h, start: 'top 88%', once: true } }));

    /* ---- S04 · signature list stagger ---- */
    gsap.from('.sig__item', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: '.sig__list', start: 'top 85%', once: true } });

    /* ---- S05 · campaign parallax ---- */
    const camp = { trigger: '.campaign', start: 'top bottom', end: 'bottom top', scrub: true };
    gsap.fromTo('#campaignPrice', { yPercent: 25, scale: .9 }, { yPercent: -15, scale: 1, ease: 'none', scrollTrigger: camp });
    gsap.fromTo('#campChicken', { yPercent: 40, rotation: -16 }, { yPercent: -30, rotation: 8, ease: 'none', scrollTrigger: camp });
    gsap.fromTo('#campBurger', { yPercent: 25, rotation: 6 }, { yPercent: -20, rotation: -6, ease: 'none', scrollTrigger: camp });
    gsap.to('#campBurger', { y: '-=16', duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.from('.campaign__copy > *', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: '.campaign__copy', start: 'top 85%', once: true } });

    /* ---- S05b · deals rail: horizontal pin on desktop ---- */
    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        const track = $('#railTrack');
        const dist = () => track.scrollWidth - innerWidth + 1;
        gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.rail', start: 'top top', end: () => '+=' + dist(), pin: '.rail__pin', scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true } });
      },
    });

    /* ---- S07 · story: pinned, 4 beats ---- */
    const beats = ['#120f0e', '#d9600f', '#c8231b', '#120f0e'];
    const sWords = $$('.story__word'), sImgs = $$('.story__product img'), sCopy = $$('.story__copy p'), dots = $$('.story__dots i');
    const story = gsap.timeline({ scrollTrigger: { trigger: '.story', start: 'top top', end: '+=400%', pin: '.story__stage', scrub: 0.5, anticipatePin: 1, onUpdate: s => { const i = Math.min(3, Math.floor(s.progress * 4)); dots.forEach((d, k) => d.classList.toggle('is-on', k === i)); } }, defaults: { ease: 'none' } });
    sWords.forEach((w, i) => {
      const t = i, last = i === sWords.length - 1;
      if (i === 0) { gsap.set([w, sImgs[0], sCopy[0]], { opacity: 1 }); }
      else {
        story.fromTo(w, { opacity: 0, scale: 1.2, yPercent: 8 }, { opacity: 1, scale: 1, yPercent: 0, duration: .22 }, t);
        story.fromTo(sImgs[i], { opacity: 0, rotation: -30, scale: .7 }, { opacity: 1, rotation: 0, scale: 1, duration: .25 }, t);
        story.fromTo(sCopy[i], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .18 }, t + .12);
        story.to('#storyStage', { backgroundColor: beats[i], duration: .25 }, t - .1);
      }
      if (!last) {
        story.to(w, { opacity: 0, yPercent: -25, duration: .18 }, t + .82);
        story.to(sImgs[i], { opacity: 0, rotation: 25, scale: .8, duration: .18 }, t + .82);
        story.to(sCopy[i], { opacity: 0, y: -16, duration: .14 }, t + .84);
      }
    });
    story.to({}, { duration: .15 });
    gsap.to('#storyProduct', { rotation: 360, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top top', end: '+=400%', scrub: true } });

    /* ---- S09 · text through food ---- */
    gsap.fromTo('#hungryWord', { backgroundPositionY: '20%' }, { backgroundPositionY: '80%', ease: 'none', scrollTrigger: { trigger: '.hungry', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* ---- S09b · collage rows ---- */
    $$('.collage__row').forEach(row => {
      const dir = +row.dataset.speed;
      gsap.fromTo(row, { xPercent: dir > 0 ? 0 : -22 }, { xPercent: dir > 0 ? -22 : 0, ease: 'none', scrollTrigger: { trigger: '.collage', start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* ---- S11 · footer rooster ---- */
    gsap.fromTo('.footer__rooster', { yPercent: 40, rotation: 14 }, { yPercent: -10, rotation: 4, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

    addEventListener('load', () => ScrollTrigger.refresh());
  }

  function prepHero() {
    if (!hasGSAP || reduce) return;
    gsap.set('.hero__w', { yPercent: 110 });
    gsap.set('#burger', { yPercent: 40, scale: .8, opacity: 0 });
    gsap.set(['#burgerSeeds', '#burgerShadow'], { opacity: 0 });
    gsap.set('#heroFront', { clipPath: 'inset(40% 0 -20% 0)' });
    gsap.set('#heroFront', { yPercent: 110, opacity: 0 });
    gsap.set('#heroCopy', { y: 30, opacity: 0 });
    gsap.set('#heroHint', { opacity: 0 });
  }

  function staticFallback() {
    $$('.split .w > span').forEach(s => (s.style.transform = 'none'));
    $$('.manifesto__text .w').forEach(w => w.classList.add('is-on'));
    $$('.hero__w').forEach(s => (s.style.transform = 'none'));
    $('#heroProduct').classList.add('is-live');
    $$('.story__dots i')[0].classList.add('is-on');
  }

  /* ----------------------------------------------------------------- init */
  renderMenu(); renderDeals(); renderPhones();
  $$('[data-split]').forEach(h => splitWords(h, true));
  splitWords($('#manifestoText'), false);
  navigation(); menuTabs(); signatureSpy(); pointerFX();
  document.documentElement.classList.add('js');
  prepHero();
  loader().then(motion);
})();
