export const CONTACT_LIMITS = Object.freeze({ name: 120, email: 254, company: 160, brief: 5000 });
const labels = { name: "Your name", email: "Work email", company: "Company or organisation", brief: "Project context" };

export function validateContact(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { error: "Invalid request body.", errors: {}, values: {} };
  const values = {};
  const errors = {};
  for (const [key, limit] of Object.entries(CONTACT_LIMITS)) {
    const raw = body[key] ?? "";
    values[key] = typeof raw === "string" ? raw.trim() : "";
    if (typeof raw !== "string") errors[key] = `${labels[key]} must be text.`;
    else if (raw.length > limit) errors[key] = `${labels[key]} must be ${limit} characters or fewer.`;
    else if (key !== "company" && !values[key]) errors[key] = `${labels[key]} is required.`;
    else if ((key === "brief" ? /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/ : /[\x00-\x1f\x7f]/).test(raw)) errors[key] = `${labels[key]} contains unsupported characters.`;
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email, such as name@company.com.";
  return { values, errors, error: Object.keys(errors).length ? "Please review the highlighted fields." : "" };
}
