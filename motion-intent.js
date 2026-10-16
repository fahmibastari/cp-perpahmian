/* Proximity choreography. Stable hit areas; independent transforms coexist with scroll. */
(() => {
  const clamp = (x, min = 0, max = 1) => Math.max(min, Math.min(max, x));
  const smooth = x => x * x * (3 - 2 * x);
  function field(rect, pointer, radius) {
    if (!pointer || !rect.width || !rect.height) return [0, 0, 0];
    const dx = Math.max(rect.left - pointer.x, 0, pointer.x - rect.right);
    const dy = Math.max(rect.top - pointer.y, 0, pointer.y - rect.bottom);
    const strength = smooth(1 - clamp(Math.hypot(dx, dy) / radius));
    return [clamp((pointer.x - rect.left) / rect.width * 2 - 1, -1, 1) * strength,
      clamp((pointer.y - rect.top) / rect.height * 2 - 1, -1, 1) * strength, strength];
  }
  function settle(value, target, dt) {
    const next = value + (target - value) * (1 - Math.exp(-Math.min(dt, 48) / 95));
    return Math.abs(next - target) < .001 ? target : next;
  }
  // Pure geometry is also used by the local regression test; no browser dependency.
  if (typeof document === 'undefined') {
    if (typeof module !== 'undefined') module.exports = { field, settle };
    return;
  }
  const fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 60rem)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const items = [];
  let enabled = false, pointer = null, frame = 0, last = 0, dirty = true;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { const item = items.find(item => item.root === entry.target); if (item) item.visible = entry.isIntersecting; });
    dirty = true; schedule();
  }, { rootMargin: '160px' });
  function register(root, radius, render, measure = root) {
    const item = { root, measure, radius, render, state: [0, 0, 0], target: [0, 0, 0], rect: null, visible: false };
    items.push(item); observer.observe(root); return item;
  }
  function vars(element, [x, y, p]) {
    element.style.setProperty('--intent-x', x.toFixed(4));
    element.style.setProperty('--intent-y', y.toFixed(4));
    element.style.setProperty('--intent-near', p.toFixed(4));
  }
  function schedule() { if (enabled && !document.hidden && !frame) frame = requestAnimationFrame(paint); }
  function paint(now) {
    frame = 0;
    const dt = last ? now - last : 16.67; last = now;
    const dialog = document.querySelector('dialog[open]');
    // All geometry reads happen before visual writes, and only after input/layout changes.
    if (dirty) {
      items.forEach(item => {
        const blocked = item.root.closest('[inert], .site-menu[aria-hidden="true"]');
        item.rect = item.visible && !blocked && (!dialog || dialog.contains(item.root)) && !item.root.matches(':disabled, [aria-disabled="true"]')
          ? item.measure.getBoundingClientRect() : null;
        item.target = item.rect ? field(item.rect, pointer, item.radius) : [0, 0, 0];
      });
      dirty = false;
    }
    let moving = false;
    items.forEach(item => {
      const previous = item.state;
      const next = previous.map((value, i) => settle(value, item.target[i], dt));
      if (next.some((value, i) => value !== previous[i])) { item.state = next; item.render(next); }
      if (next.some((value, i) => value !== item.target[i])) moving = true;
    });
    if (moving) schedule(); else last = 0;
  }
  function invalidate() { dirty = true; schedule(); }
  function release() { pointer = null; invalidate(); }
  function reset() {
    cancelAnimationFrame(frame); frame = 0; last = 0; pointer = null;
    items.forEach(item => { item.state = [0, 0, 0]; item.target = [0, 0, 0]; item.render(item.state); });
    dirty = true;
  }
  function mode() {
    reset(); enabled = fine.matches && !reduced.matches;
    document.documentElement.classList.toggle('intent-enabled', enabled);
  }

  // Arrows lead the gesture; labels and hit areas never chase the mouse.
  document.querySelectorAll('.text-link, .button, .desktop-nav a, .menu-toggle, .site-menu__nav a, .site-menu__close, .filter, .privacy-index a, .product-viewer button').forEach(control => {
    control.classList.add('intent-control');
    register(control, 64, state => vars(control, state));
  });

  // A measured frame precedes the image layers. Each surface uses its own real media.
  document.querySelectorAll('.project-art, .archive-frame > div, .project-gallery__media, .studio-lab__visual').forEach(surface => {
    surface.classList.add('intent-surface');
    const frameEl = document.createElement('span');
    frameEl.className = 'intent-frame'; frameEl.setAttribute('aria-hidden', 'true');
    frameEl.innerHTML = '<i></i><i></i><i></i><i></i>';
    const badge = document.createElement('span');
    badge.className = 'intent-caption'; badge.setAttribute('aria-hidden', 'true');
    badge.innerHTML = `${surface.matches('.project-gallery__media') ? 'Open image' : 'Explore project'} <svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
    surface.append(frameEl, badge);
    register(surface, 96, state => vars(surface, state));
  });

  // Logo tiles are a local elastic field, layered on top of their scroll assembly.
  document.querySelectorAll('.brand-assembly').forEach(assembly => {
    const tiles = [...assembly.querySelectorAll('.brand-assembly__mark i')];
    register(assembly, 120, state => {
      vars(assembly, state);
      const [x, y, p] = state;
      tiles.forEach((tile, i) => {
        const tx = (i % 4) / 3 * 2 - 1, ty = Math.floor(i / 4) / 3 * 2 - 1;
        const distance = Math.hypot(tx - x * 2, ty - y * 2);
        const weight = Math.max(0, 1 - distance / 2.3) * p;
        tile.style.translate = `${((tx - x * 2) * weight * 14).toFixed(2)}px ${((ty - y * 2) * weight * 14).toFixed(2)}px`;
        tile.style.rotate = `${((tx - x) * weight * 4).toFixed(2)}deg`;
      });
    });
  });

  // Editorial rows: one moving registration mark, no text displacement.
  document.querySelectorAll('.capability-editorial article, .service-detail__row, .principle-list article, .legal-copy article').forEach(row => {
    row.classList.add('intent-row');
    const marker = document.createElement('i'); marker.className = 'intent-row__marker'; marker.setAttribute('aria-hidden', 'true'); row.append(marker);
    register(row, 48, state => vars(row, state));
  });

  // Diagram nodes respond independently, without replacing the scroll-selected step.
  document.querySelectorAll('[data-process-node]').forEach(node => {
    node.classList.add('intent-node');
    const rect = node.querySelector('rect');
    const ring = rect.cloneNode(); ring.removeAttribute('id'); ring.classList.add('intent-node__ring'); ring.setAttribute('aria-hidden', 'true');
    node.prepend(ring);
    register(node, 68, state => vars(node, state), rect);
  });

  // Form focus remains primary. Pointer detail only traces the field's left rail.
  document.querySelectorAll('.contact-form .field').forEach(fieldEl => {
    fieldEl.classList.add('intent-field');
    register(fieldEl, 48, state => vars(fieldEl, state));
  });

  window.addEventListener('pointermove', event => {
    if (!enabled || event.pointerType === 'touch') return;
    pointer = { x: event.clientX, y: event.clientY }; invalidate();
  }, { passive: true });
  window.addEventListener('pointerout', event => { if (!event.relatedTarget) release(); }, { passive: true });
  window.addEventListener('pointercancel', release, { passive: true });
  window.addEventListener('blur', reset);
  window.addEventListener('scroll', invalidate, { passive: true, capture: true });
  window.addEventListener('resize', invalidate, { passive: true });
  document.addEventListener('click', invalidate, true);
  document.addEventListener('focusin', () => { release(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); else invalidate(); });
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', invalidate));
  document.fonts.ready.then(invalidate);
  fine.addEventListener('change', mode); reduced.addEventListener('change', mode);
  mode();
})();
