import { CONTACT_LIMITS, validateContact } from "./contact-rules.mjs?v=20261016-contact1";

const form = document.querySelector("[data-contact-form]");
if (form) {
  const submit = form.querySelector("button[type='submit']");
  const label = submit.querySelector("span");
  const status = form.querySelector("[data-form-status]");
  const defaultStatus = status.textContent;
  const fields = Object.keys(CONTACT_LIMITS).map(name => form.elements.namedItem(name));
  const helpers = new Map(fields.map(field => [field.name, field.closest(".field").querySelector(".field__help").textContent]));
  let inFlight = false;
  let retryAt = 0;
  const values = () => Object.fromEntries(new FormData(form));
  const setState = (state, text) => { submit.dataset.state = state; label.textContent = text; };
  function showField(field, error = "") {
    field.setAttribute("aria-invalid", String(Boolean(error)));
    field.closest(".field").dataset.state = error ? "error" : "success";
    field.closest(".field").querySelector(".field__help").textContent = error || helpers.get(field.name);
  }
  function failure(message) {
    setState("error", "Try sending again");
    status.textContent = `${message} You can also email `;
    const link = document.createElement("a");
    link.href = "mailto:perpahmian.tech@gmail.com";
    link.textContent = "perpahmian.tech@gmail.com";
    status.append(link, ".");
  }
  fields.forEach(field => {
    field.maxLength = CONTACT_LIMITS[field.name];
    field.addEventListener("blur", () => {
      if (inFlight) return;
      field.dataset.touched = "true";
      showField(field, validateContact(values()).errors[field.name]);
    });
    field.addEventListener("input", () => {
      if (field.dataset.touched) showField(field, validateContact(values()).errors[field.name]);
      if (submit.dataset.state === "success") { setState("", "Send project enquiry"); status.textContent = defaultStatus; }
    });
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (inFlight) return;
    const data = values();
    const validation = validateContact(data);
    fields.forEach(field => { field.dataset.touched = "true"; showField(field, validation.errors[field.name]); });
    if (validation.error) {
      setState("error", "Review highlighted fields");
      status.textContent = validation.error;
      fields.find(field => validation.errors[field.name])?.focus();
      return;
    }
    if (Date.now() < retryAt) { failure(`Please wait ${Math.ceil((retryAt - Date.now()) / 1000)} seconds before retrying. Your draft has been kept.`); return; }
    inFlight = true;
    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    fields.forEach(field => { field.readOnly = true; });
    setState("loading", "Sending enquiry…");
    status.textContent = "Sending your message. Your draft will stay here if delivery cannot be confirmed.";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {
        method: "POST", signal: controller.signal,
        headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => null);
      if (response.status === 429) {
        const seconds = Number(response.headers.get("Retry-After"));
        retryAt = Date.now() + (Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds, 900) : 60) * 1000;
      }
      if (!response.ok || result?.ok !== true) {
        if (response.status === 400 && result?.fields) {
          fields.forEach(field => { if (typeof result.fields[field.name] === "string") showField(field, result.fields[field.name]); });
          fields.find(field => field.getAttribute("aria-invalid") === "true")?.focus();
        }
        throw new Error(typeof result?.error === "string" ? result.error : "Delivery could not be confirmed. Your draft has been kept.");
      }
      form.reset();
      fields.forEach(field => {
        field.removeAttribute("aria-invalid");
        delete field.dataset.touched;
        delete field.closest(".field").dataset.state;
        field.closest(".field").querySelector(".field__help").textContent = helpers.get(field.name);
      });
      setState("success", "Enquiry sent");
      status.textContent = "Thank you. Your enquiry was accepted for delivery. We will reply to the email address you provided.";
    } catch (error) {
      failure(controller.signal.aborted ? "The request timed out; delivery could not be confirmed. Your draft has been kept. You can safely retry." : error.message);
    } finally {
      clearTimeout(timer);
      inFlight = false;
      submit.disabled = false;
      form.removeAttribute("aria-busy");
      fields.forEach(field => { field.readOnly = false; });
    }
  });
}
