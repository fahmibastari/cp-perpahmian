// Read-only local checks: no external links or contact submissions.
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser, sleep } from '../.codex/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const base = process.argv[2] || 'http://127.0.0.1:4187';
const out = '.taste-skill/desktop-craft';
mkdirSync(out, { recursive: true });
const browser = await Browser.launch();
const results = [];
try {
  const page = await browser.newPage();
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewport({ width, height: 900, mobile: width < 600 });
    await page.goto(`${base}/index.html`);
    await sleep(1700);
    const result = await page.eval(() => {
      const rect = selector => document.querySelector(selector).getBoundingClientRect();
      const logo = rect('.site-logo');
      const heading = document.querySelector('h1');
      const style = getComputedStyle(heading);
      const h1 = heading.getBoundingClientRect();
      const nav = document.querySelector('.desktop-nav');
      return {
        width: innerWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        navVisible: getComputedStyle(nav).display !== 'none',
        logoCenterError: Math.abs(logo.x + logo.width / 2 - innerWidth / 2),
        headerEdgeError: Math.abs(rect('.site-header__inner').x - rect('.studio-hero').x),
        headingLines: h1.height / parseFloat(style.lineHeight),
        heroButtonHeight: rect('.studio-hero__action').height,
        navButtonHeight: nav.lastElementChild.getBoundingClientRect().height,
        textVisible: h1.height > 0 && getComputedStyle(heading).opacity === '1'
      };
    });
    assert.equal(result.overflow, false, `Overflow @${width}`);
    assert.ok(result.headingLines <= 2.1, `Headline wraps @${width}`);
    assert.equal(result.textVisible, true);
    if (width > 1024) {
      assert.equal(result.navVisible, true);
      assert.ok(result.logoCenterError < 1, `Off-centre logo @${width}`);
      assert.ok(result.headerEdgeError < 1, `Different header/hero margins @${width}`);
      assert.ok(Math.abs(result.heroButtonHeight - result.navButtonHeight) < 1, `Button height drift @${width}`);
    }
    results.push(result);
    await page.screenshot({ path: `${out}/home-${width}.jpg` });
    console.log(`PASS home @${width}: ${result.headingLines.toFixed(1)} heading lines, logo offset ${result.logoCenterError.toFixed(1)}px`);
  }
  await page.setViewport({ width: 1920, height: 1080 });
  for (const route of ['work.html', 'services.html', 'about.html', 'contact.html', 'project.html?id=magicpin']) {
    await page.goto(`${base}/${route}`);
    await page.eval(() => scrollTo({ top: 0, behavior: 'instant' }));
    await sleep(1200);
    await page.screenshot({ path: `${out}/${route.replace(/[.?=]/g, '-')}-1920.jpg` });
    assert.equal(await page.eval(() => document.documentElement.scrollWidth > innerWidth), false, route);
  }
  await page.goto(`${base}/index.html`);
  await page.eval(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await sleep(1200);
  await page.screenshot({ path: `${out}/footer-1920.jpg` });
  await page.eval(() => scrollTo({ top: 0, behavior: 'instant' }));
  const point = await page.eval(() => { const r = document.querySelector('.desktop-nav a').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
  await sleep(400);
  await page.screenshot({ path: `${out}/nav-hover-1920.jpg` });
  await page.eval(() => document.querySelector('.desktop-nav a').focus());
  assert.notEqual(await page.eval(() => getComputedStyle(document.activeElement).outlineStyle), 'none');
  await page.screenshot({ path: `${out}/nav-focus-1920.jpg` });
  assert.equal(page.consoleErrors.length, 0, page.consoleErrors.join('\n'));
  console.log('PASS: wide route overflow, navigation hover/focus, no captured console errors.');
} finally {
  await browser.close();
  writeFileSync(`${out}/report.json`, JSON.stringify(results, null, 2));
}
