const assert = require('node:assert/strict');
const { field, settle } = require('../motion-intent.js');
const box = { left:100, right:300, top:100, bottom:200, width:200, height:100 };
assert.deepEqual(field(box, null, 100), [0,0,0]);
assert.deepEqual(field(box, {x:200,y:150}, 100), [0,0,1]);
assert.equal(field(box, {x:350,y:150}, 100)[2], .5, 'Respond before entering the target');
assert.equal(field(box, {x:450,y:150}, 100)[2], 0);
assert.equal(field({...box,width:0}, {x:200,y:150}, 100)[2], 0);
assert.ok(field(box, {x:350,y:250}, 100)[2] < .5, 'Use radial corner distance');
let value = 1;
for(let i=0;i<120;i++) value=settle(value,0,1000/60);
assert.equal(value,0,'Returns to an idle state without a perpetual frame loop');
let at60=0,at120=0;
for(let i=0;i<6;i++)at60=settle(at60,1,1000/60);
for(let i=0;i<12;i++)at120=settle(at120,1,1000/120);
assert.ok(Math.abs(at60-at120)<.001,'Refresh-rate independent damping');
assert.ok(settle(0,1,500)<1,'No jump after a stalled frame');
// Exercise the actual media-mode/event lifecycle without a browser or external packages.
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../motion-intent.js'),'utf8');
function modeHarness({fine, reduced}) {
  const handlers = {}, queries = [], frames = [];
  let active = false;
  const context = {
    document: {
      hidden: false, querySelectorAll: () => [], querySelector: () => null,
      documentElement: {classList: {toggle: (_, value) => {active=value;}}},
      addEventListener: (name, fn) => {handlers[name]=fn;},
      fonts: {ready: {then() {}}}
    },
    window: {addEventListener: (name, fn) => {handlers[name]=fn;}},
    matchMedia: query => {
      const media = {matches: query.includes('reduced') ? reduced : fine,
        addEventListener: (_, fn) => {media.change=fn;}};
      queries.push(media); return media;
    },
    IntersectionObserver: class {observe() {}},
    requestAnimationFrame: fn => {frames.push(fn); return frames.length;},
    cancelAnimationFrame() {}
  };
  vm.runInNewContext(source, context);
  return {handlers,queries,frames,active:()=>active};
}
for (const options of [{fine:false,reduced:false},{fine:true,reduced:true}]) {
  const app=modeHarness(options);
  app.handlers.pointermove({pointerType:'mouse',clientX:100,clientY:100});
  assert.equal(app.active(),false);
  assert.equal(app.frames.length,0,'No mouse animation in touch/reduced-motion mode');
}
const app=modeHarness({fine:true,reduced:false});
assert.equal(app.active(),true);
app.handlers.pointermove({pointerType:'touch',clientX:100,clientY:100});
assert.equal(app.frames.length,0,'Ignore touch input on hybrid devices');
app.handlers.pointermove({pointerType:'mouse',clientX:100,clientY:100});
assert.equal(app.frames.length,1);
app.queries[1].matches=true; app.queries[1].change();
assert.equal(app.active(),false,'Respond to reduced-motion changes without reloading');
console.log('PASS: proximity geometry, idle settling, refresh-rate damping, touch/reduced-motion modes and live preference changes.');
