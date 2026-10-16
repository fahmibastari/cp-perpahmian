// Run with: node tests/site-check.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const files = fs.readdirSync(root).filter(name => name.endsWith('.html'));
const records = vm.runInNewContext(`${read('projects.js')}\nPROJECTS`);
const ids = new Set(records.map(project => project.id));
assert.equal(ids.size, records.length, 'Duplicate project ID');
let assetCount = 0;
for (const name of [...files, 'studio.js', 'motion-home.js', 'experience.js', 'motion-intent.js']) {
  const source = read(name);
  for (const match of source.matchAll(/(?:src|href)="([^"$]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|#|\/)/.test(url)) continue;
    const [file, query] = url.split('#')[0].split('?');
    assert.ok(fs.existsSync(path.join(root, decodeURIComponent(file))), `${name}: missing ${file}`);
    if (file === 'project.html' && query?.startsWith('id=')) assert.ok(ids.has(query.slice(3)), `Unknown ${query}`);
  }
  for (const match of source.matchAll(/["'](image\/[^"']+)["']/g)) {
    assert.ok(fs.existsSync(path.join(root, match[1])), `${name}: missing ${match[1]}`);
    assetCount++;
  }
  if (name.endsWith('.html')) {
    assert.ok(source.includes('studio.css'), `${name}: missing shared style`);
    assert.ok(source.includes('studio.js'), `${name}: missing presentation script`);
    assert.ok(source.includes('experience.css') && source.includes('experience.js'), `${name}: missing page choreography`);
    assert.ok(source.includes('motion-intent.css') && source.includes('motion-intent.js'), `${name}: missing pointer choreography`);
    assert.ok(source.includes('family=Manrope:wght@400;500;600;700'), `${name}: missing unified brand font`);
    assert.ok(!/Instrument\+Serif|IBM\+Plex\+Sans|Bricolage\+Grotesque/.test(source), `${name}: outdated font request`);
  }
}
for (const project of records) {
  for (const asset of [project.cover, ...project.images]) {
    assert.ok(fs.existsSync(path.join(root, asset)), `${project.id}: missing ${asset}`);
    assetCount++;
  }
}
console.log(`PASS: ${files.length} HTML routes, ${records.length} projects, ${assetCount} asset references.`);
