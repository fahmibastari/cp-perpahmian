// Run with node tests/case-study-check.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const projects = vm.runInNewContext(read('projects.js') + '; PROJECTS');
const studies = projects.filter(project => project.caseStudy);
assert.equal(studies.length, 8);
for (const project of studies) {
  const study = project.caseStudy;
  assert.equal(project.kind, 'Client work');
  for (const field of ['title', 'contribution', 'delivery']) {
    assert.ok(study[field].trim().length > 20, `${project.id}: ${field}`);
  }
  assert.equal(study.decisions.length, 3);
  const screens = new Set();
  for (const decision of study.decisions) {
    assert.ok(Number.isInteger(decision.screen));
    assert.ok(project.gallery[decision.screen - 1], `${project.id}: invalid screen target`);
    assert.ok(decision.title && decision.body);
    screens.add(decision.screen);
  }
  assert.equal(screens.size, 3, `${project.id}: distinct implementation examples`);
  assert.ok(!/<|>/.test(JSON.stringify(study)), 'Editorial fields are plain text');
}
assert.match(projects.find(p => p.id === 'magicpin').caseStudy.contribution, /collaborative/);
assert.match(projects.find(p => p.id === 'justspeak').caseStudy.contribution, /Back-end/);
assert.match(projects.find(p => p.id === 'ubmstorage').caseStudy.contribution, /Front-end/);
assert.doesNotMatch(JSON.stringify(projects.find(p => p.id === 'digivass').caseStudy), /politic|party|campaign/i);
assert.ok(projects.filter(p => p.kind === 'Independent R&D').every(p => !p.caseStudy));
const renderer = read('script.js');
assert.ok(renderer.includes('id="project-screen-${index + 1}" tabindex="-1"'));
assert.ok(renderer.includes('href="#project-screen-${decision.screen}"'));
assert.ok(renderer.includes('What the experiment demonstrates'));
assert.ok(!renderer.includes('Shipped outcome'));
console.log('PASS: 8 case studies, 24 valid screen references, scoped contributions and separate R&D framing.');
