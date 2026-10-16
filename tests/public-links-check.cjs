const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
const projects = vm.runInNewContext(read('projects.js') + '; PROJECTS');
const magic = projects.find(p => p.id === 'magicpin');
assert.equal(magic.publicLinks.length, 2);
assert.equal(new URL(magic.publicLinks[0].url).hostname, 'apps.apple.com');
assert.ok(magic.publicLinks[0].url.endsWith('/id1554341677'));
const play = new URL(magic.publicLinks[1].url);
assert.equal(play.hostname, 'play.google.com');
assert.equal(play.searchParams.get('id'), 'freshworks.io.magicpintrading');
assert.match(magic.caseStudy.contribution, /collaborative/);
for (const p of projects) {
  for (const link of p.publicLinks || []) {
    assert.equal(new URL(link.url).protocol, 'https:');
    assert.ok(link.label && link.platform);
  }
}
for (const id of ['sicater', 'digivass', 'cced']) {
  const p = projects.find(p => p.id === id);
  assert.ok(!p.url && !p.publicLinks, `${id}: do not invent internal access links`);
}
assert.equal(projects.find(p => p.id === 'flamboys').linkLabel, 'View project file');
assert.equal(projects.find(p => p.id === 'ubmstorage').linkLabel, 'Open browser demo');
assert.ok(read('script.js').includes('rel="noopener noreferrer"'));
assert.ok(read('script.js').includes('opens in a new tab'));
console.log('PASS: official Magic Pin store IDs, safe external-link semantics, distinct demo/file labels and private-project fallback.');
