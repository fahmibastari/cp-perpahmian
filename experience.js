/* Page-specific choreography. Native scroll, one scheduled frame, static reduced-motion fallback. */
(() => {
  const page = document.querySelector('[data-project-detail]') ? 'project' : document.body.dataset.page;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compactHeight = matchMedia('(max-height: 659px)');
  const clamp = x => Math.max(0, Math.min(1, x));
  const smooth = x => x * x * (3 - 2 * x);
  const score = [];
  let frame = 0;
  const watch = (root, paint) => { if (root) score.push({ root, paint }); };
  function draw() {
    frame = 0;
    if (document.hidden) return;
    const height = innerHeight;
    const readings = score.map(item => ({ ...item, rect: item.root.getBoundingClientRect() }));
    readings.forEach(({ paint, rect }) => paint({
      rect, height, reduce: reduced.matches,
      arrive: reduced.matches ? 1 : smooth(clamp((height - rect.top) / (height * .82))),
      through: clamp((height * .5 - rect.top) / Math.max(rect.height, 1)),
      pinned: reduced.matches || compactHeight.matches ? 0 : clamp((height * .06 - rect.top) / Math.max(1, rect.height - height * .8))
    }));
    document.documentElement.style.setProperty('--page-progress', clamp(scrollY / Math.max(1, document.documentElement.scrollHeight - height)));
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  function mode() {
    document.documentElement.classList.toggle('motion-allowed', !reduced.matches);
    document.documentElement.classList.toggle('motion-pin', !reduced.matches && !compactHeight.matches);
    schedule();
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', mode, { passive: true });
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', mode);
  compactHeight.addEventListener('change', mode);
  const pageRail = document.createElement('div');
  pageRail.className = 'page-reading-rail';
  pageRail.setAttribute('aria-hidden', 'true');
  document.body.append(pageRail);

  // Real brand artwork is sliced in CSS, not redrawn or replaced with a generic motif.
  function brandAssembly(parent, variant) {
    const figure = document.createElement('div');
    figure.className = `brand-assembly brand-assembly--${variant}`;
    figure.setAttribute('aria-hidden', 'true');
    figure.innerHTML = `<div class="brand-assembly__guides"></div><div class="brand-assembly__mark">${Array.from({length:16}, (_, i) => `<i style="--tile-x:${i % 4};--tile-y:${Math.floor(i / 4)}"></i>`).join('')}</div><span class="brand-assembly__caption">Build What Matters.</span><span class="brand-assembly__axis">01 — 16</span>`;
    parent.append(figure);
    const tiles = [...figure.querySelectorAll('i')];
    watch(parent, ({ rect, height, reduce }) => {
      const base = reduce ? 1 : clamp((height * .42 - rect.top) / Math.max(240, rect.height * .85));
      tiles.forEach((tile, i) => {
        const p = reduce ? 1 : smooth(clamp(base * 1.5 - (i % 4) * .08 - Math.floor(i / 4) * .045));
        const x = ((i % 4) - 1.5) * 78;
        const y = (Math.floor(i / 4) - 1.5) * 62;
        tile.style.transform = `translate(${x * (1-p)}%, ${y * (1-p)}%) rotate(${(i % 2 ? 1 : -1) * (1-p) * 22}deg) scale(${.55 + .45*p})`;
        tile.style.opacity = String(.35 + p * .65);
      });
      figure.style.setProperty('--assembly', base);
    });
    return figure;
  }

  // Intro typography: masked per-word entrance, with the original accessible name intact.
  const heading = document.querySelector('main h1');
  if (heading && page !== 'home') {
    // Keep authored phrase breaks; flattening them changes the typographic composition.
    const lines = [''];
    heading.childNodes.forEach(node => {
      if (node.nodeName === 'BR') lines.push('');
      else lines[lines.length - 1] += node.textContent;
    });
    const label = lines.join(' ').replace(/\s+/g, ' ').trim();
    const escapeWord = word => word.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    let order = 0;
    heading.setAttribute('aria-label', label);
    heading.innerHTML = lines.map(line => line.trim().split(/\s+/).map(word => `<span class="kinetic-word" aria-hidden="true"><span style="--word-order:${order++}">${escapeWord(word)}</span></span>`).join(' ')).join('<br aria-hidden="true">');
  }
  document.querySelectorAll('.site-menu__nav a').forEach((link, i) => link.style.setProperty('--nav-order', i));
  const footer = document.querySelector('.site-footer');
  if (footer) {
    const statement = footer.querySelector('.site-footer__statement');
    watch(footer, ({ arrive, reduce }) => {
      footer.style.setProperty('--footer-reveal', arrive);
      statement.style.transform = reduce ? 'none' : `translateY(${(1-arrive)*48}px)`;
    });
  }

  if (page === 'home') {
    const aside = document.querySelector('.studio-hero__aside');
    if (aside) {
      const assembly = brandAssembly(aside, 'home');
      aside.prepend(assembly);
    }
    document.querySelectorAll('.capability-editorial article').forEach((row, i) => {
      row.dataset.motionNumber = `0${i+1}`;
      watch(row, ({ arrive, reduce }) => {
        row.style.setProperty('--row-reveal', arrive);
        row.querySelector('h3').style.transform = reduce ? 'none' : `translateY(${(1-arrive)*16}px)`;
      });
    });
  }

  if (page === 'work' && typeof getProject === 'function') {
    const picks = [
      ['magicpin', 'image/magicpin/DashboardGuest3.png'],
      ['sicater', 'image/sicater/Web-Dashboard.png'],
      ['ubmstorage', 'image/ubmstorage/PSP - Product Catalog.png'],
      ['flamboys', 'image/flamboys/Admin - DashboardAnalytics.png'],
      ['2watuju', 'image/2watuju/DashboardCatalog.png']
    ];
    const ribbon = document.createElement('section');
    ribbon.className = 'archive-ribbon';
    ribbon.setAttribute('aria-label', 'Project spectrum');
    ribbon.innerHTML = `<div class="archive-ribbon__pin"><div class="archive-ribbon__heading page-shell"><div><p class="studio-label">The project spectrum</p><h2>Different contexts.<br>Working products.</h2></div><p>Operations, communities, and experiences.<br>Scroll through a cross-section of the work.</p></div><div class="archive-ribbon__window"><div class="archive-ribbon__track">${picks.map(([id, src], i) => {const project = getProject(id); return `<a href="project.html?id=${id}" class="archive-frame"><div><img src="${src}" width="1600" height="1000" loading="lazy" alt="${project.name} interface"></div><span><small>0${i+1}</small><strong>${project.name}</strong>${ICON_ARROW_UP_RIGHT}</span><p>${project.workstream}</p></a>`;}).join('')}</div></div><div class="archive-ribbon__bottom page-shell"><span>Selected perspectives / 05</span><div class="archive-ribbon__meter" aria-hidden="true"><i></i></div><a href="#work-index-title">Browse the full archive ${ICON_ARROW_RIGHT}</a></div></div>`;
    document.querySelector('.page-intro').after(ribbon);
    const track = ribbon.querySelector('.archive-ribbon__track');
    const windowEl = ribbon.querySelector('.archive-ribbon__window');
    watch(ribbon, ({ pinned, reduce }) => {
      const enabled = !reduce && !compactHeight.matches;
      const travel = Math.max(0, track.scrollWidth - windowEl.clientWidth);
      track.style.transform = enabled ? `translateX(${-travel*pinned}px)` : 'none';
      ribbon.style.setProperty('--ribbon-progress', enabled ? pinned : 1);
    });
    track.querySelectorAll('a').forEach((link, i) => link.addEventListener('focus', () => {
      if (reduced.matches || compactHeight.matches) return;
      const top = ribbon.getBoundingClientRect().top + scrollY - innerHeight * .06;
      scrollTo({top:top + (ribbon.offsetHeight - innerHeight * .8) * (i / (picks.length-1)), behavior:'instant'});
    }));
    const filters = document.querySelector('.filters');
    filters.classList.add('archive-filters');
    document.querySelectorAll('.project-card').forEach((card, i) => {
      const caption = card.querySelector('.project-card__body');
      watch(card, ({ arrive, reduce }) => {
        card.style.setProperty('--card-rule', arrive);
        if (caption) caption.style.transform = reduce ? 'none' : `translateY(${(1-arrive)*22}px)`;
      });
    });
  }

  if (page === 'services') {
    // The process is an ordinary readable list. Do not wrap it in the retired
    // two-column diagram: that wrapper reserves space for a hidden illustration.
    document.querySelectorAll('.service-detail__row').forEach((row,i) => {
      row.dataset.motionNumber = `0${i+1}`;
      watch(row, ({ arrive, reduce }) => {
        row.style.setProperty('--row-reveal', arrive);
        const proof = row.querySelector('.service-proof');
        if (proof) proof.style.transform = reduce ? 'none' : `translateY(${(1-arrive)*48}px)`;
      });
    });
  }

  if (page === 'about') {
    // Keep the supplied logo in the authored markup, including the no-JS path.
    const lead = document.querySelector('.about-story__lead');
    if (lead) watch(document.querySelector('.about-story'), ({ through, reduce }) => lead.style.setProperty('--reading-fill', `${reduce ? 100 : clamp(through*2.6)*100}%`));
    document.querySelectorAll('.principle-list article').forEach((article,i) => {
      article.dataset.motionNumber = `0${i+1}`;
      watch(article, ({ arrive, reduce }) => {
        article.style.setProperty('--row-reveal', arrive);
        article.style.transform = reduce ? 'none' : `translateY(${(1-arrive)*16}px)`;
      });
    });
  }

  if (page === 'project') {
    const gallery = document.querySelector('.project-gallery');
    if (gallery) {
      const galleryTitle = document.createElement('div');
      galleryTitle.className = 'gallery-heading';
      galleryTitle.innerHTML = '<h2>The product, in view.</h2><p>Open a frame to explore the interface.</p>';
      gallery.prepend(galleryTitle);
      gallery.querySelectorAll('figure').forEach((figure, i) => {
        watch(figure, ({ arrive, reduce }) => {
          figure.style.setProperty('--gallery-reveal', arrive);
          figure.querySelector('.project-gallery__media').style.transform = reduce ? 'none' : `perspective(1200px) translateY(${(1-arrive)*48}px) rotateX(${(1-arrive)*5}deg)`;
        });
      });
      mountLightbox(gallery);
    }
  }

  if (page === 'contact') {
    const form = document.querySelector('[data-contact-form]');
    const signal = document.createElement('div');
    signal.className = 'contact-signal';
    signal.innerHTML = `<div class="contact-signal__heading"><span class="studio-label">Start with a conversation</span><span data-draft-count>0 / 3</span></div><svg viewBox="0 0 440 160" fill="none" aria-hidden="true"><path class="contact-signal__base" d="M35 80H130V40H230V120H325V80H400"/><path class="contact-signal__line" pathLength="1" d="M35 80H130V40H230V120H325V80H400"/>${[[35,80],[230,40],[400,80]].map(([x,y],i)=>`<rect data-draft-node="${i}" x="${x-10}" y="${y-10}" width="20" height="20"/>`).join('')}</svg><div class="contact-signal__labels"><span>Your name</span><span>Reply address</span><span>Your brief</span></div><p data-draft-note>Three essentials. One useful conversation.</p>`;
    document.querySelector('.contact-copy').append(signal);
    const fields = ['name','email','brief'].map(id=>form.querySelector(`#${id}`));
    const updateDraft = () => {
      const completed = fields.map(field=>Boolean(field.value.trim()));
      const count = completed.filter(Boolean).length;
      signal.style.setProperty('--draft-progress', count/3);
      signal.querySelector('[data-draft-count]').textContent = `${count} / 3`;
      signal.querySelectorAll('[data-draft-node]').forEach((node,i)=>node.classList.toggle('is-filled',completed[i]));
      signal.querySelector('[data-draft-note]').textContent = count === 3 ? 'Essentials filled. Review your message before sending.' : 'Three essentials. One useful conversation.';
    };
    form.addEventListener('input', updateDraft);
    form.addEventListener('reset', ()=>requestAnimationFrame(updateDraft));
    form.querySelectorAll('.field').forEach((field,i)=>{
      field.dataset.fieldNumber = `0${i+1}`;
      field.addEventListener('focusin',()=>{signal.dataset.activeField=i;});
    });
    updateDraft();
  }

  if (page === 'privacy') {
    const copy = document.querySelector('.legal-copy');
    const articles = [...copy.querySelectorAll('article')];
    const nav = document.createElement('nav');
    nav.className = 'privacy-index page-shell';
    nav.setAttribute('aria-label', 'Privacy sections');
    articles.forEach((article,i)=>{article.id=`privacy-section-${i+1}`;});
    nav.innerHTML = articles.map((article,i)=>`<a href="#${article.id}"><span>0${i+1}</span>${article.querySelector('h2').textContent}</a>`).join('');
    copy.before(nav);
    const links = [...nav.children];
    watch(copy, ({ through })=>{
      const index = Math.min(3,Math.floor(through*4));
      links.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    });
  }
  if (page === '404') {
    const main = document.querySelector('main');
    if (main) {const symbol=brandAssembly(main,'missing');main.prepend(symbol);}
  }

  function mountLightbox(gallery) {
    const links = [...gallery.querySelectorAll('.project-gallery__media')];
    const dialog = document.createElement('dialog');
    dialog.className = 'product-viewer';
    dialog.setAttribute('aria-label', 'Product image viewer');
    dialog.innerHTML = '<div class="product-viewer__top"><p data-viewer-caption></p><button type="button" data-viewer-close>Close ×</button></div><div class="product-viewer__canvas"><img alt=""></div><div class="product-viewer__bottom"><button type="button" data-viewer-prev>← Previous</button><span data-viewer-count></span><button type="button" data-viewer-next>Next →</button></div>';
    document.body.append(dialog);
    let index = 0;
    let opener = null;
    const image = dialog.querySelector('img');
    image.src = links[0].querySelector('img').src;
    image.alt = links[0].querySelector('img').alt;
    function show(next) {
      index = (next + links.length) % links.length;
      const source = links[index].querySelector('img');
      image.src = source.src;
      image.alt = source.alt;
      dialog.querySelector('[data-viewer-caption]').textContent = source.alt;
      dialog.querySelector('[data-viewer-count]').textContent = `${index + 1} of ${links.length}`;
      if (!reduced.matches) image.animate([{opacity:.25,transform:'translateY(20px) scale(.97)'},{opacity:1,transform:'none'}],{duration:400,easing:'cubic-bezier(.16,1,.3,1)'});
    }
    links.forEach((link,i)=>{
      link.setAttribute('aria-label', `Open image: ${link.querySelector('img').alt}`);
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click',event=>{
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      event.preventDefault();opener=link;show(i);dialog.showModal();document.body.classList.add('viewer-open');dialog.querySelector('[data-viewer-close]').focus();
      });
    });
    dialog.querySelector('[data-viewer-close]').addEventListener('click',()=>dialog.close());
    dialog.querySelector('[data-viewer-prev]').addEventListener('click',()=>show(index-1));
    dialog.querySelector('[data-viewer-next]').addEventListener('click',()=>show(index+1));
    dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(index+1);}if(event.key==='ArrowLeft'){event.preventDefault();show(index-1);}});
    dialog.addEventListener('close',()=>{document.body.classList.remove('viewer-open');opener?.focus({preventScroll:true});});
  }
  document.fonts.ready.then(schedule);
  mode();
})();
