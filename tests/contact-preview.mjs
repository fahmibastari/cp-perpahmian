// Local-only QA server: NEVER sends mail; no real environment configuration used.
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createContactHandler } from "../api/contact.js";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seen = new Set();
const handler = createContactHandler({
  env: { RESEND_API_KEY: "local-mock-only", CONTACT_TO_EMAIL: "qa@example.test" },
  fetchImpl: async (_url, { body }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    // Every unique draft fails once, then succeeds: verifies retained draft and retry.
    if (!seen.has(body)) { seen.add(body); return { ok: false, status: 503 }; }
    return { ok: true, json: async () => ({ id: "mock-accepted" }) };
  }
});
const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2" };
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname === "/api/contact") {
      let raw = "";
      for await (const chunk of req) { raw += chunk; if (raw.length > 40000) { res.writeHead(413).end(); return; } }
      req.body = raw;
      res.status = code => { res.statusCode = code; return res; };
      res.json = body => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(body)); return res; };
      await handler(req, res);
      console.log("Mock contact:", res.statusCode);
      return;
    }
    const file = path.resolve(root, "." + (pathname === "/" ? "/contact.html" : pathname));
    const relative = path.relative(root, file);
    if (relative.startsWith("..") || relative.split(path.sep).some(p => p.startsWith(".")) || /^(api|tests)([\\/]|$)/.test(relative) || !types[path.extname(file)]) { res.writeHead(404).end(); return; }
    const content = await readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)], "Cache-Control": "no-store" });
    res.end(content);
  } catch { res.writeHead(404).end(); }
}).listen(4187, "127.0.0.1", () => console.log("Mock-only contact QA: http://127.0.0.1:4187/contact.html"));
