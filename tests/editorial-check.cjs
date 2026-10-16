// Run with node tests/editorial-check.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const projects = vm.runInNewContext(read('projects.js') + '; PROJECTS');
const expected = {all:18,client:13,rd:5,operations:3,platforms:12,immersive:3};
for (const [filter, count] of Object.entries(expected)) {
  assert.equal(projects.filter(p => filter === 'all' || p.filters.includes(filter)).length, count, `${filter} count`);
}
for (const project of projects) {
  assert.equal(project.filters.filter(f => ['operations','platforms','immersive'].includes(f)).length,1,`${project.id}: unambiguous workstream`);
  assert.equal(project.gallery.length,project.images.length);
  for (const [index, image] of project.gallery.entries()) {
    assert.equal(image.src, project.images[index]);
    assert.ok(fs.existsSync(path.join(root,image.src)),image.src);
    assert.ok(typeof image.title === 'string' && image.title.trim().length > 8,`${project.id}: missing caption`);
    assert.ok(!/DashboardGuest|FullMapTiles|\.png|\.jpg|undefined/.test(image.title),image.title);
  }
}
const magic = projects.find(p=>p.id==='magicpin');
assert.equal(magic.gallery.length,4);
assert.ok(!magic.gallery.some(image=>image.src.includes('Marketplace')),'Do not republish test-data screenshot');
assert.ok(fs.existsSync(path.join(root,'image/magicpin/Web - Marketplace.png')),'Preserve original source image');
assert.equal(projects.find(p=>p.id==='flamboys').linkLabel,'View project file');
assert.ok(read('styles.css').includes('.filter:not(.is-active):not([data-state="success"]):hover'));
assert.ok(read('script.js').includes('[data-group-count]'));
assert.ok(read('experience.js').includes("link.setAttribute('aria-haspopup', 'dialog')"));
console.log('PASS: 18 galleries, 6 filter totals, exclusive workstream mapping, curated Magic Pin media, file CTA, viewer semantics.');
