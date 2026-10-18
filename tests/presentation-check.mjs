// Local, read-only presentation regression checks. Never submits the contact form.
// Usage: node tests/presentation-check.mjs http://127.0.0.1:4187
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { Browser, sleep } from '../.codex/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const base = process.argv[2] || 'http://127.0.0.1:4187';
const out = '.taste-skill/merbaoe-regression';
mkdirSync(out, { recursive: true });
const projects = vm.runInNewContext(readFileSync('projects.js', 'utf8') + '; PROJECTS');
const routes = ['index.html', 'work.html', 'services.html', 'about.html', 'contact.html', 'privacy.html', '404.html', 'project.html?id=sicater', 'project.html?id=merbaoe'];
const browser = await Browser.launch();
const results = [];
const failures = [];

async function pressKey(page, key, keyCode) {
  // Native dialog dismissal needs a complete browser key event, not just a DOM key name.
  for (const type of ['rawKeyDown', 'keyUp']) {
    await page.send('Input.dispatchKeyEvent', { type, key, code: key, windowsVirtualKeyCode: keyCode });
  }
  await sleep(100);
}

function inspectLayout() {
  const issues = [];
  const width = document.documentElement.clientWidth;
  const visible = el => el.getClientRects().length && !el.closest('[hidden],[inert]');
  const rgb = value => (value.match(/[\d.]+/g) || []).map(Number);
  const luminance = color => rgb(color).slice(0, 3).map(n => {
    n /= 255;
    return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4;
  }).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
  if (document.documentElement.scrollWidth > width + 1) issues.push('Document overflow');
  for (const el of document.querySelectorAll('h1,h2,h3,.kinetic-word')) {
    // Screen-reader-only headings are intentionally clipped; do not confuse
    // their accessible naming technique with unintended visible clipping.
    if (!visible(el) || el.closest('.sr-only')) continue;
    const r = el.getBoundingClientRect();
    if (r.right > width + 2 || r.left < -2 || el.scrollWidth > el.clientWidth + 3) issues.push('Clipped heading: ' + el.textContent.trim());
  }
  for (const el of document.querySelectorAll('.process-list h3,.process-list p,.case-decisions h3,.case-decisions p,.case-decisions a,.studio-lab__copy p,.studio-capabilities p,.service-detail__row li,.about-hero p,.founder-profile__role')) {
    if (!visible(el)) continue;
    let parent = el;
    while (parent && rgb(getComputedStyle(parent).backgroundColor)[3] === 0) parent = parent.parentElement;
    const bg = parent ? getComputedStyle(parent).backgroundColor : 'rgb(255,255,255)';
    const style = getComputedStyle(el);
    const a = luminance(style.color), b = luminance(bg);
    const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    const minimum = parseFloat(style.fontSize) >= 24 ? 3 : 4.5;
    if (ratio < minimum) issues.push(`Contrast ${ratio.toFixed(2)}: ${el.textContent.trim().slice(0, 60)}`);
  }
  for (const img of document.querySelectorAll('.project-art img')) {
    if (visible(img) && getComputedStyle(img).objectFit !== 'contain') issues.push('Cropped product screenshot: ' + img.alt);
  }
  for (const art of document.querySelectorAll('.project-art--paired')) {
    const a = art.querySelector('.project-art__primary').getBoundingClientRect();
    const b = art.querySelector('.project-art__secondary').getBoundingClientRect();
    if (a.width && b.width && a.right > b.left + 1) issues.push('Overlapping product screens');
  }
  for (const img of document.images) {
    if (visible(img) && img.complete && !img.naturalWidth) issues.push('Broken image: ' + img.getAttribute('src'));
  }
  const showcase = document.querySelector('.showcase');
  if (showcase && (!visible(showcase) || !showcase.offsetHeight)) issues.push('Showcase hidden');
  if (document.querySelector('.delivery-stage')) issues.push('Retired process wrapper still mounted');
  const card = document.querySelector('.project-card__body');
  if (card && ![...card.children].some(el => el.tagName === 'P' && !el.className && visible(el))) issues.push('Project summary hidden');
  return { issues, width, height: document.documentElement.scrollHeight };
}

try {
  const page = await browser.newPage();
  for (const width of [1440, 768, 390]) {
    await page.setViewport({ width, height: width === 390 ? 844 : 900, mobile: width < 600 });
    for (const route of routes) {
      page.consoleErrors.length = 0;
      await page.goto(`${base}/${route}`, { timeoutMs: 10000, settleMs: 900 });
      await page.eval('document.fonts.ready.then(() => true)');
      const key = route.replace('.html', '').replace('?id=', '-');
      await page.screenshot({ path: `${out}/${key}-${width}-fold.jpg` });
      const height = await page.eval('document.documentElement.scrollHeight');
      for (let y = 0; y < height; y += 700) {
        await page.eval(y => scrollTo({ top: y, behavior: 'instant' }), y);
        await sleep(100);
      }
      await sleep(500);
      await page.eval('scrollTo({top:0,behavior:"instant"})');
      await sleep(200);
      const result = await page.eval(inspectLayout);
      result.issues.push(...page.consoleErrors);
      results.push({ route, ...result });
      if (result.issues.length) failures.push({ route, ...result });
      await page.screenshot({ path: `${out}/${key}-${width}-page.jpg`, fullPage: true });
      console.log(`${result.issues.length ? 'FAIL' : 'PASS'} ${route} @${width}: ${result.issues.join('; ')}`);
    }
  }
  // Every factual project title, not just the short SiCater name, must fit.
  for (const width of [320, 1440]) {
    await page.setViewport({ width, height: 900, mobile: width < 600 });
    for (const project of projects) {
      await page.goto(`${base}/project.html?id=${project.id}`, { timeoutMs: 10000, settleMs: 250 });
      const result = await page.eval(inspectLayout);
      results.push({ route: project.id, ...result });
      if (result.issues.length) failures.push({ route: project.id, ...result });
    }
  }
  await page.setViewport({ width: 390, height: 844, mobile: true });
  await page.goto(`${base}/index.html`);
  for (const id of ['reports', 'shift', 'cashier']) {
    await page.eval(id => document.querySelector(`[data-merbaoe-view="${id}"]`).click(), id);
    for (let i = 0; i < 30; i++) {
      if (await page.eval(id => document.querySelector(`[data-merbaoe-view="${id}"]`).getAttribute('aria-pressed') === 'true', id)) break;
      await sleep(100);
    }
    assert.equal(await page.eval(id => document.querySelector(`[data-merbaoe-view="${id}"]`).getAttribute('aria-pressed'), id), 'true', `Sandbox view ${id}`);
    assert.equal(await page.eval(() => document.querySelectorAll('[data-merbaoe-view][aria-pressed="true"]').length), 1);
    assert.match(await page.eval(() => document.querySelector('[data-merbaoe-image]').alt), /sandbox/i);
  }
  const beforeFailure = await page.eval(() => document.querySelector('[data-merbaoe-image]').src);
  await page.send('Network.enable');
  await page.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.send('Network.setBlockedURLs', { urls: ['*admin-reports-profit*'] });
  await page.eval(() => document.querySelector('[data-merbaoe-view="reports"]').click());
  await sleep(750);
  assert.match(await page.eval(() => document.querySelector('[data-merbaoe-status]').textContent), /could not load/);
  assert.equal(await page.eval(() => document.querySelector('[data-merbaoe-image]').src), beforeFailure);
  await page.send('Network.setBlockedURLs', { urls: [] });
  await page.eval(() => { const toggle = document.querySelector('.menu-toggle'); toggle.focus(); toggle.click(); });
  assert.equal(await page.eval(() => document.querySelector('.site-menu').inert), false);
  await pressKey(page, 'Escape', 27);
  assert.equal(await page.eval(() => document.querySelector('.site-menu').inert), true);
  assert.equal(await page.eval(() => document.activeElement.matches('.menu-toggle')), true);
  await page.goto(`${base}/work.html`);
  for (const [filter, count] of [['rd', 5], ['client', 13], ['all', 19]]) {
    await page.eval(filter => document.querySelector(`[data-filter="${filter}"]`).click(), filter);
    await sleep(750);
    assert.equal(await page.eval(() => [...document.querySelectorAll('.project-card')].filter(el => el.getClientRects().length > 0 && !el.hidden).length), count, `Filter ${filter}`);
  }
  await page.goto(`${base}/project.html?id=sicater`);
  await page.eval(() => { const link = document.querySelector('.project-gallery figure a'); link.focus(); link.click(); });
  assert.equal(await page.eval(() => !!document.querySelector('dialog[open]')), true);
  const firstImage = await page.eval(() => document.querySelector('dialog img').src);
  await pressKey(page, 'ArrowRight', 39);
  assert.notEqual(await page.eval(() => document.querySelector('dialog img').src), firstImage);
  await pressKey(page, 'Escape', 27);
  assert.equal(await page.eval(() => !!document.querySelector('dialog[open]')), false);
  assert.equal(await page.eval(() => document.activeElement.matches('.project-gallery figure a')), true);
  await page.goto(`${base}/index.html`);
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await sleep(250);
  assert.equal(await page.eval(() => [...document.querySelectorAll('[data-board-reveal]')].every(el => getComputedStyle(el).opacity === '1')), true);
  console.log('PASS: sandbox selector and loading failure, menu Escape/focus, filters, viewer Escape/focus, live reduced motion. No enquiry sent.');
} catch (error) {
  failures.push({ test: 'interaction', error: error.message });
  console.error(error);
} finally {
  await browser.close();
  writeFileSync(`${out}/report.json`, JSON.stringify({ results, failures }, null, 2));
}
console.log(`${results.length} layout checks, ${failures.length} failing checks.`);
process.exitCode = failures.length ? 1 : 0;
