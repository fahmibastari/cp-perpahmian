/* Native scroll is the timeline. No wheel interception, autoplay, or animation loop. */
window.PerpahmianMotion = {
  mount({ art }) {
    const section = document.querySelector('.showcase');
    if (!section) return;
    const chapters = [
      { id: 'magicpin', name: 'Magic Pin', short: 'Magic Pin', category: 'Production app · International client', title: 'One community.<br>Across every screen.', copy: 'A collector platform for an international client, with production iOS and Android apps connecting discovery, maps, and trading.' },
      { id: 'sicater', name: 'SiCater Ultimate', short: 'SiCater', category: 'PDAM · Operational systems', title: 'Connected.<br>From field to office.', copy: 'Built for PDAM operations: connecting meter-reading teams, field data, and the people managing a regional water utility.' },
      { id: 'ubmstorage', name: 'UBM Storage 3D', short: 'UBM Storage', category: 'Interactive experiences', title: 'A different way<br>to explore.', copy: 'A product catalog reimagined as an interactive 3D experience, directly in the browser.' }
    ];
    const arrow = '<svg class="ui-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
    section.classList.add('motion-story');
    section.setAttribute('aria-label', 'Selected projects — scroll story');
    section.innerHTML = `<div class="motion-story__pin">
      <div class="motion-story__top"><span class="motion-story__brand studio-label"><img src="image/profile/Logo Icon.png" width="28" height="24" alt="">Built for real work</span><span class="motion-story__hint"><span data-story-hint>Scroll to explore</span><a class="motion-story__skip" href="#selected-title">Skip to work</a></span></div>
      <div class="motion-story__canvas">${chapters.map((chapter, index) => `<article class="motion-scene motion-scene--${index}${index === 0 ? ' is-active' : ''}" data-chapter="${index}" ${index ? 'inert aria-hidden="true"' : ''}>
        <div class="motion-scene__copy"><span class="motion-scene__number">0${index + 1} / ${chapter.category}</span><h2>${chapter.title}</h2><p>${chapter.copy}</p><a class="text-link" href="project.html?id=${chapter.id}">Explore ${chapter.name} ${arrow}</a></div>
        <a class="motion-scene__media" href="project.html?id=${chapter.id}" aria-label="View ${chapter.name}">${art(chapter.id, chapter.name, '', index === 0)}</a>
      </article>`).join('')}</div>
      <div class="motion-story__nav" role="group" aria-label="Choose project chapter">${chapters.map((chapter, index) => `<button type="button" data-chapter-button="${index}" aria-pressed="${index === 0}"><span>0${index + 1}</span>${chapter.short}<span class="motion-story__progress" aria-hidden="true"></span></button>`).join('')}</div>
      </div>`;
    const pin = section.querySelector('.motion-story__pin');
    const scenes = [...section.querySelectorAll('.motion-scene')];
    const buttons = [...section.querySelectorAll('[data-chapter-button]')];
    const copy = scenes.map(scene => scene.querySelector('.motion-scene__copy'));
    const media = scenes.map(scene => scene.querySelector('.motion-scene__media'));
    const layers = scenes.map(scene => [...scene.querySelectorAll('.project-art img')]);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const shortViewport = matchMedia('(max-height: 659px)');
    const clamp = value => Math.max(0, Math.min(1, value));
    const ease = value => value * value * (3 - 2 * value);
    let active = -1;
    let frame = 0;
    let start = 0;
    let distance = 1;
    let enabled = false;
    let manualIndex = 0;
    const lab = document.querySelector('.studio-lab__visual');
    const hero = document.querySelector('.studio-hero__heading');
    const accents = [...document.querySelectorAll('.editorial-card__media')];
    function setActive(index) {
      if (active === index) return;
      active = index;
      scenes.forEach((scene, i) => {
        const selected = i === index;
        scene.classList.toggle('is-active', selected);
        scene.inert = !selected;
        scene.setAttribute('aria-hidden', String(!selected));
        buttons[i].setAttribute('aria-pressed', String(selected));
      });
    }
    function paint() {
      frame = 0;
      const progress = enabled ? clamp((scrollY - start) / distance) : manualIndex / 2;
      // Each chapter holds before the next begins: .00–.25, .38–.62, .75–1.
      const reveals = [1, ease(clamp((progress - .25) / .13)), ease(clamp((progress - .62) / .13))];
      const current = reveals[2] >= .5 ? 2 : reveals[1] >= .5 ? 1 : 0;
      setActive(enabled ? current : manualIndex);
      scenes.forEach((scene, index) => {
        const reveal = enabled ? reveals[index] : Number(index <= manualIndex);
        scene.style.clipPath = `inset(0 ${(1 - reveal) * 100}% 0 0)`;
        const outgoing = enabled ? (reveals[index + 1] || 0) : 0;
        copy[index].style.transform = `translateY(${enabled ? (1 - reveal) * 32 - outgoing * 16 : 0}px)`;
        copy[index].style.opacity = String(enabled ? 1 - outgoing * .7 : 1);
        media[index].style.transform = `translateY(${enabled ? (1 - reveal) * 50 : 0}px) scale(${enabled ? 1 - outgoing * .04 : 1})`;
        layers[index].forEach((image, layer) => {
          const drift = clamp(progress * 3 - index) * (layer ? -12 : 6);
          image.style.transform = `translateY(${enabled ? (1 - reveal) * (layer ? 48 : 16) + drift : 0}px)`;
        });
        const chapterProgress = enabled ? clamp(progress * 3 - index) : Number(index <= manualIndex);
        buttons[index].style.setProperty('--chapter-progress', chapterProgress);
      });
      if (enabled) {
        if (hero) hero.style.transform = `translateY(${-Math.min(scrollY, 500) * .08}px)`;
        [...accents, lab].filter(Boolean).forEach(element => {
          const rect = element.closest('.editorial-card, .studio-lab').getBoundingClientRect();
          const enter = clamp((innerHeight - rect.top) / (innerHeight * .8));
          element.style.transform = `translateY(${(1 - ease(enter)) * 24}px) scale(${.96 + ease(enter) * .04})`;
        });
      }
    }
    function requestPaint() { if (!frame) frame = requestAnimationFrame(paint); }
    function measure() {
      enabled = !reduced.matches && !shortViewport.matches;
      section.classList.toggle('is-scroll-driven', enabled);
      section.querySelector('[data-story-hint]').textContent = enabled ? 'Scroll to explore' : 'Choose a project';
      start = section.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(pin).top || 0);
      if (!Number.isFinite(start)) start = 0;
      distance = Math.max(1, section.offsetHeight - pin.offsetHeight - 40);
      if (!enabled) {
        manualIndex = Math.max(0, active);
        [hero, lab, ...accents].filter(Boolean).forEach(element => element.style.removeProperty('transform'));
      }
      requestPaint();
    }
    buttons.forEach((button, index) => button.addEventListener('click', () => {
      manualIndex = index;
      if (enabled) {
        // Explicit chapter navigation only; ordinary scrolling is never intercepted.
        const positions = [.08, .48, .88];
        window.scrollTo({ top: start + distance * positions[index], behavior: 'instant' });
      }
      requestPaint();
    }));
    // Load all three story previews before their chapter is reached, without blocking reading.
    section.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
    window.addEventListener('scroll', requestPaint, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('pageshow', measure);
    reduced.addEventListener('change', measure);
    shortViewport.addEventListener('change', measure);
    document.fonts.ready.then(measure);
    new ResizeObserver(measure).observe(document.querySelector('.studio-hero'));
    measure();
  }
};
