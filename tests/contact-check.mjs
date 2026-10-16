// No credentials or external network: every provider request is mocked.
import assert from "node:assert/strict";
import { createContactHandler } from "../api/contact.js";
import { CONTACT_LIMITS, validateContact } from "../contact-rules.mjs";
const valid = { name: "Test Person", email: "person@example.test", company: "", brief: "A test project.", website: "" };
const env = { RESEND_API_KEY: "test-only", CONTACT_TO_EMAIL: "studio@example.test", CONTACT_FROM_EMAIL: "Studio <sender@example.test>" };
const calls = [];
const provider = async (_url, options) => { calls.push(options); return { ok: true, json: async () => ({ id: "mock-id" }) }; };
function handler(options = {}) { return createContactHandler({ env, fetchImpl: provider, ...options }); }
async function send(fn, body = valid, extra = {}) {
  const response = { code: 200, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
  await fn({ method: "POST", body, headers: { "content-type": "application/json", host: "localhost", origin: "http://localhost" }, socket: { remoteAddress: "127.0.0.1" }, ...extra }, response);
  return response;
}
let checks = 0;
async function check(name, run) { await run(); checks++; console.log("PASS:", name); }
await check("shared validation: required, email, types, controls, length boundaries", async () => {
  for (const body of [null, [], "text"]) assert.ok(validateContact(body).error);
  for (const field of ["name", "email", "brief"]) assert.ok(validateContact({ ...valid, [field]: " " }).errors[field]);
  for (const value of ["a@@b.co", "a b@c.co", "a@b", "a@b."]) assert.ok(validateContact({ ...valid, email: value }).errors.email);
  for (const field of Object.keys(CONTACT_LIMITS)) {
    assert.ok(validateContact({ ...valid, [field]: {} }).errors[field]);
    assert.ok(validateContact({ ...valid, [field]: "x".repeat(CONTACT_LIMITS[field] + 1) }).errors[field]);
    if (field !== "email") assert.equal(validateContact({ ...valid, [field]: "x".repeat(CONTACT_LIMITS[field]) }).error, "");
  }
  assert.ok(validateContact({ ...valid, name: "name\nBcc: injected" }).errors.name);
  assert.equal(validateContact({ ...valid, brief: "Line one\nLine two\tallowed" }).error, "");
});
await check("invalid request shapes, JSON, oversize, honeypot never reach provider", async () => {
  const before = calls.length;
  for (const body of [null, [], "{invalid", { ...valid, email: {} }, { ...valid, brief: "x".repeat(5001) }]) assert.equal((await send(handler(), body)).code, 400);
  assert.equal((await send(handler(), "x".repeat(33000))).code, 413);
  assert.deepEqual((await send(handler(), { website: "spam" })).body, { ok: true });
  assert.equal(calls.length, before);
});
await check("method, origin, content type and missing configuration", async () => {
  assert.equal((await send(handler(), valid, { method: "GET" })).code, 405);
  assert.equal((await send(handler(), valid, { headers: { origin: "https://other.test", host: "localhost" } })).code, 403);
  assert.equal((await send(handler(), valid, { headers: { "content-type": "text/plain" } })).code, 415);
  assert.equal((await send(handler({ env: {} }))).code, 503);
});
await check("valid delivery uses destination, reply-to, and stable retry keys across instances", async () => {
  assert.equal((await send(handler())).code, 200);
  const first = calls.at(-1);
  const payload = JSON.parse(first.body);
  assert.deepEqual(payload.to, [env.CONTACT_TO_EMAIL]);
  assert.equal(payload.reply_to, valid.email);
  assert.ok(payload.text.endsWith(valid.brief));
  await send(handler());
  assert.equal(first.headers["Idempotency-Key"], calls.at(-1).headers["Idempotency-Key"]);
  await send(handler(), { ...valid, brief: "Changed enquiry" });
  assert.notEqual(first.headers["Idempotency-Key"], calls.at(-1).headers["Idempotency-Key"]);
});
await check("provider rejection, malformed receipt, throttling, network errors", async () => {
  for (const status of [400, 401, 500]) assert.equal((await send(handler({ fetchImpl: async () => ({ ok: false, status }) }))).code, 502);
  for (const status of [409, 429]) {
    const result = await send(handler({ fetchImpl: async () => ({ ok: false, status }) }));
    assert.equal(result.code, 429); assert.equal(result.headers["Retry-After"], "60");
  }
  assert.equal((await send(handler({ fetchImpl: async () => ({ ok: true, json: async () => ({}) }) }))).code, 502);
  assert.equal((await send(handler({ fetchImpl: async () => { throw Error("private provider detail"); } }))).code, 502);
});
await check("provider timeout aborts request", async () => {
  const result = await send(handler({ timeoutMs: 10, fetchImpl: (_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(Error("aborted")), { once: true })) }));
  assert.equal(result.code, 504);
});
await check("per-instance rate limit, retry-after and expiry", async () => {
  let time = 1000;
  const fn = handler({ now: () => time });
  for (let n = 0; n < 5; n++) assert.equal((await send(fn)).code, 200);
  const limited = await send(fn);
  assert.equal(limited.code, 429); assert.equal(limited.headers["Retry-After"], "900");
  time += 900001;
  assert.equal((await send(fn)).code, 200);
});
await check("outside Vercel, spoofed proxy headers cannot bypass limiter", async () => {
  const fn = handler();
  for (let n = 0; n < 5; n++) await send(fn);
  assert.equal((await send(fn, valid, { headers: { "content-type": "application/json", "x-forwarded-for": "new-ip" } })).code, 429);
});
console.log(`${checks} contact test groups passed; no real emails sent.`);
