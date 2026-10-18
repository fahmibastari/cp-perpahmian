// Local-only checks for the sandbox showcase. Never submits an enquiry.
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';
import { Browser, sleep } from '../.codex/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const base = process.argv[2] || 'http://127.0.0.1:4187';
const out = '.taste-skill/merbaoe-details';
mkdirSync(out, { recursive: true });
const project = vm.runInNewContext(readFileSync('projects.js', 'utf8') + '; getProject("merbaoe")');
assert.equal(project.kind, 'Project showcase');
assert.equal(project.status, 'Sandbox preview');
assert.equal(project.role, undefined);
assert.equal(project.timeline, undefined);
assert.equal(project.tech.length, 0);
assert.equal(project.images.length, 5);
assert.match(project.mediaNote, /not the operating account/);
const html = readFileSync('index.html', 'utf8');
assert.match(html, /Independent product · In development/);
assert.doesNotMatch(html, /data-showcase-stage/);

const browser = await Browser.launch();
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(base + '/index.html');
  for (const view of ['reports', 'shift']) {
    await page.eval(view => document.querySelector(`[data-merbaoe-view="${view}"]`).click(), view);
    for (let i = 0; i < 50; i++) {
      if (await page.eval(view => document.querySelector(`[data-merbaoe-view="${view}"]`).getAttribute('aria-pressed') === 'true', view)) break;
      await sleep(100);
    }
    assert.equal(await page.eval(view => document.querySelector(`[data-merbaoe-view="${view}"]`).getAttribute('aria-pressed'), view), 'true');
    await page.eval(() => document.querySelector('.merbaoe-feature').scrollIntoView({ behavior: 'instant', block: 'start' }));
    await sleep(300);
    await page.screenshot({ path: `${out}/${view}-desktop.jpg` });
  }
  await page.eval(() => {
    for (const view of ['reports', 'shift', 'cashier']) document.querySelector(`[data-merbaoe-view="${view}"]`).click();
  });
  await sleep(1000);
  assert.equal(await page.eval(() => document.querySelector('[data-merbaoe-view="cashier"]').getAttribute('aria-pressed')), 'true');
  assert.equal(await page.eval(() => document.querySelectorAll('[data-merbaoe-view][aria-busy]').length), 0);
  await page.eval(() => document.querySelector('[data-merbaoe-view="reports"]').focus());
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', windowsVirtualKeyCode: 13 });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  await sleep(700);
  assert.equal(await page.eval(() => document.querySelector('[data-merbaoe-view="reports"]').getAttribute('aria-pressed')), 'true');

  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 900, mobile: width < 600 });
    await page.goto(base + '/project.html?id=merbaoe');
    assert.equal(await page.eval(() => document.querySelectorAll('.project-gallery figure').length), 5);
    assert.equal(await page.eval(() => getComputedStyle(document.querySelector('.case-facts')).gridTemplateColumns.split(' ').length), 2);
    assert.equal(await page.eval(() => [...document.querySelectorAll('.case-facts dt')].some(el => el.textContent === 'Screens captured')), true);
    assert.equal(await page.eval(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent)).find(item => item['@type'] === 'CreativeWork').dateCreated), undefined);
    assert.equal(await page.eval(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: `${out}/case-${width}-fold.jpg` });
    await page.eval(() => document.querySelector('.case-story').scrollIntoView({ behavior: 'instant' }));
    await sleep(800);
    await page.screenshot({ path: `${out}/case-${width}-story.jpg` });
  }
  await page.send('Emulation.setScriptExecutionDisabled', { value: true });
  await page.goto(base + '/index.html');
  assert.equal(await page.eval(() => document.querySelector('.merbaoe-controls').hidden), true);
  assert.equal(await page.eval(() => document.querySelector('[data-merbaoe-image]').naturalWidth > 0), true);
  assert.match(await page.eval(() => document.querySelector('.merbaoe-preview > a').getAttribute('href')), /merbaoe/);
  console.log('PASS: sandbox facts, 5 galleries, Phera status, keyboard selection, rapid selection, no-JS image/link fallback, desktop/mobile project.');
} finally {
  await browser.close();
}
