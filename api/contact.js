import { createHmac, randomBytes } from "node:crypto";
import { validateContact } from "../contact-rules.mjs";

// Best-effort per-instance protection, not a distributed/serverless rate limiter.
export function createContactHandler({ fetchImpl = fetch, env = process.env, now = Date.now, timeoutMs = 12000 } = {}) {
  const attempts = new Map();
  const salt = randomBytes(32);
  const windowMs = 15 * 60 * 1000;
  return async function contactHandler(request, response) {
    response.setHeader("Cache-Control", "no-store");
    const fail = (code, error, extra = {}) => response.status(code).json({ error, ...extra });
    if (request.method !== "POST") {
      response.setHeader("Allow", "POST");
      return fail(405, "Method not allowed.");
    }
    const headers = request.headers || {};
    if (headers.origin) {
      try {
        if (new URL(headers.origin).host !== headers.host) return fail(403, "Send your enquiry from this website.");
      } catch { return fail(403, "Invalid request origin."); }
    }
    if (!/^application\/json(?:\s*;|$)/i.test(headers["content-type"] || "")) return fail(415, "This form requires JSON. You can also contact us by email.");
    const timestamp = now();
    for (const [key, entry] of attempts) if (entry.until <= timestamp) attempts.delete(key);
    // Vercel overwrites X-Forwarded-For. Outside Vercel, trust only the socket.
    const ip = env.VERCEL === "1" ? String(headers["x-forwarded-for"] || "unknown").split(",")[0].trim() : request.socket?.remoteAddress || "unknown";
    const fingerprint = createHmac("sha256", salt).update(ip).digest("hex");
    let entry = attempts.get(fingerprint);
    if (!entry && attempts.size >= 5000) {
      response.setHeader("Retry-After", "900");
      return fail(429, "The contact form is busy. Please try again later or email us directly.");
    }
    if (!entry) { entry = { count: 0, until: timestamp + windowMs }; attempts.set(fingerprint, entry); }
    if (++entry.count > 5) {
      response.setHeader("Retry-After", String(Math.ceil((entry.until - timestamp) / 1000)));
      return fail(429, "Too many attempts. Please wait before trying again, or email us directly.");
    }
    let body = request.body;
    try {
      const raw = typeof body === "string" ? body : JSON.stringify(body);
      if (!raw) return fail(400, "Invalid request body.");
      if (Buffer.byteLength(raw) > 32768) return fail(413, "Your enquiry is too large. Please shorten it and try again.");
      body = JSON.parse(raw);
    } catch { return fail(400, "Invalid request body."); }
    const validation = validateContact(body);
    if (!body || typeof body !== "object" || Array.isArray(body)) return fail(400, validation.error);
    if (body.website != null && typeof body.website !== "string") return fail(400, "Invalid request body.");
    if (body.website?.trim()) return response.status(200).json({ ok: true });
    if (validation.error) return fail(400, validation.error, { fields: validation.errors });
    if (!env.RESEND_API_KEY) return fail(503, "The contact service is unavailable. Please email us directly.");
    const { name, email, company, brief } = validation.values;
    const payload = JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "perpahmian.tech <onboarding@resend.dev>",
      to: [env.CONTACT_TO_EMAIL || "perpahmian.tech@gmail.com"],
      reply_to: email,
      subject: `New project enquiry — ${name}`,
      text: ["New project enquiry from perpahmian.tech", "", `Name: ${name}`, `Email: ${email}`, `Company: ${company || "Not provided"}`, "", "Project context:", brief].join("\n")
    });
    // Identical retries share a key across instances. Resend retains keys for 24 hours.
    const idempotencyKey = `enquiry/${createHmac("sha256", env.RESEND_API_KEY).update(payload).digest("hex")}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const result = await fetchImpl("https://api.resend.com/emails", {
        method: "POST", signal: controller.signal,
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
        body: payload
      });
      if (!result.ok) {
        if (result.status === 429 || result.status === 409) {
          response.setHeader("Retry-After", "60");
          return fail(429, "The email service is busy. Please wait a minute before retrying.");
        }
        return fail(502, "The email service could not accept your enquiry. Your draft is still here; please retry or email us.");
      }
      const receipt = await result.json();
      if (typeof receipt?.id !== "string" || !receipt.id) return fail(502, "Delivery could not be confirmed. Please retry or email us.");
      return response.status(200).json({ ok: true });
    } catch {
      return fail(controller.signal.aborted ? 504 : 502, "Delivery could not be confirmed. Your draft is still here; please retry or email us.");
    } finally { clearTimeout(timer); }
  };
}

export default createContactHandler();
