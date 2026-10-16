const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const html = read('services.html');
assert.equal((html.match(/<dt>Possible outputs<\/dt>/g) || []).length, 4);
assert.equal((html.match(/class="process-output"/g) || []).length, 4);
assert.equal((html.match(/<details>/g) || []).length, 6);
assert.equal((html.match(/<summary>/g) || []).length, 6);
for (const target of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(html.includes(`id="${target[1]}"`), `Broken anchor ${target[1]}`);
}
for (const id of ['product', 'engineering', 'systems', 'immersive']) {
  assert.ok(html.includes(`id="${id}"`), `Preserve capability anchor: ${id}`);
}
for (const phrase of ['revision allowances are agreed', 'Ownership, source-code access', 'who pays recurring charges', 'Ongoing support is not automatically included', 'passwords, API keys']) {
  assert.ok(html.includes(phrase), `Missing scoping clarity: ${phrase}`);
}
assert.ok(html.includes('href="contact.html">Discuss your project'));
assert.ok(html.includes('services.css?v='));
assert.ok(read('experience.js').includes('const stepRects = steps.map(step => step.getBoundingClientRect())'));
assert.doesNotMatch(html, /unlimited revisions|24\/7|guaranteed turnaround/i);
console.log('PASS: 4 engagement outputs, 4 process checkpoints, 6 native FAQs, valid anchors and scoped commercial terms.');
