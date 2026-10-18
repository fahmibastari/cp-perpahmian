// Visual audit and explicit proportion guards. Local only; no form submissions.
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { Browser, sleep } from '../.codex/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const base = process.argv[2] || 'http://127.0.0.1:4187';
const out = '.taste-skill/desktop-proportions';
mkdirSync(out, { recursive: true });
const projects = vm.runInNewContext(readFileSync('projects.js', 'utf8') + '; PROJECTS');
const browser = await Browser.launch();
const results = [];
try {
  const page = await browser.newPage();
  for (const [width, height] of [[1440,900], [1536,775], [1920,1080], [768,1024], [390,844]]) {
    await page.setViewport({ width, height, mobile: width < 600 });
    await page.goto(`${base}/index.html`);
    await sleep(700);
    const result = await page.eval(() => {
      const r = s => document.querySelector(s).getBoundingClientRect();
      const image = r('.merbaoe-preview > a'), feature = r('.merbaoe-feature');
      return { width: innerWidth, imageHeight: image.height, imageShare: image.width / feature.width,
        selectedTop: r('.studio-selected').top + scrollY, overflow: document.documentElement.scrollWidth > innerWidth };
    });
    assert.equal(result.overflow, false);
    assert.ok(result.imageHeight <= 561, `Preview too tall @${width}: ${result.imageHeight}`);
    if (width > 1024) {
      assert.ok(result.imageShare <= .66, `Preview too wide @${width}`);
      assert.ok(result.selectedTop < 1150, `Selected work buried @${width}`);
    }
    results.push(result);
    await page.screenshot({ path: `${out}/home-${width}.jpg` });
  }
  const sections = {
    work: ['.work-proof', '.work-index'],
    services: ['.service-detail', '.engagements', '.process', '.services-faq'],
    about: ['.about-hero', '.about-story', '.founder-profile', '.principles'],
    contact: ['.contact-layout'],
    privacy: ['.legal-copy'],
    '404': ['main']
  };
  const auditImages = [];
  await page.setViewport({ width: 1440, height: 900 });
  for (const [route, selectors] of Object.entries(sections)) {
    await page.goto(`${base}/${route}.html`);
    const height = await page.eval(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 700) { await page.eval(y => scrollTo({top:y,behavior:'instant'}), y); await sleep(80); }
    for (const [i, selector] of selectors.entries()) {
      const found = await page.eval(selector => { const el = document.querySelector(selector); if (!el) return false; el.scrollIntoView({ behavior: 'instant', block: 'start' }); return true; }, selector);
      if (!found) continue;
      await sleep(500);
      const name = `${route}-${i}.jpg`;
      await page.screenshot({ path: `${out}/${name}` });
      auditImages.push({ name, label: `${route}: ${selector}` });
    }
    assert.equal(await page.eval(() => document.documentElement.scrollWidth <= innerWidth), true, route);
    if (route === 'about') assert.ok(await page.eval(() => [...document.querySelectorAll('.principle-list article')].every(el => el.getBoundingClientRect().height < 220)), 'Principles stretched');
  }
  const caseImages = [];
  for (const project of projects) {
    await page.goto(`${base}/project.html?id=${project.id}`);
    await page.eval(() => document.fonts.ready.then(() => true));
    await sleep(1400);
    const name = `case-${project.id}.jpg`;
    await page.screenshot({ path: `${out}/${name}` });
    caseImages.push({ name, label: project.name });
    assert.equal(await page.eval(() => document.documentElement.scrollWidth <= innerWidth), true, project.id);
  }
  // Four native viewport captures per review sheet, not a compressed full-page thumbnail.
  for (const [group, images] of [['sections',auditImages], ['cases',caseImages]]) {
    for (let offset = 0; offset < images.length; offset += 4) {
      const entries = images.slice(offset, offset + 4);
      await page.setViewport({ width: 1440, height: 980 });
      await page.goto(base + '/404.html');
      await page.eval(({base,out,entries}) => {
        document.head.innerHTML = '<style>*{box-sizing:border-box}body{margin:0;background:#e7e7e7;font:16px Arial;display:grid;grid-template-columns:1fr 1fr;gap:8px}figure{margin:0}figcaption{height:30px;padding:6px;background:white}img{display:block;width:100%}</style>';
        document.body.innerHTML = entries.map(e => `<figure><figcaption>${e.label}</figcaption><img src="${base}/${out}/${e.name}"></figure>`).join('');
      }, {base,out,entries});
      await page.eval(() => Promise.all([...document.images].map(img => img.decode())));
      await page.screenshot({ path: `${out}/${group}-sheet-${offset/4+1}.jpg` });
    }
  }
  writeFileSync(`${out}/report.json`, JSON.stringify({ results, sectionCaptures: auditImages, caseCaptures: caseImages }, null, 2));
  console.log(`PASS: 5 viewport proportions, ${auditImages.length} section captures, ${caseImages.length} project covers; image <=560px, desktop share <=66%, no horizontal overflow.`);
} finally { await browser.close(); }
