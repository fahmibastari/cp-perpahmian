const MAX_LENGTHS = {
  name: 120,
  email: 254,
  company: 160,
  brief: 5000
};

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

export default async function contactHandler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  let body = request.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ error: "Invalid request body." });
    }
  }

  if (clean(body.website, 200)) {
    return response.status(200).json({ ok: true });
  }

  const name = clean(body.name, MAX_LENGTHS.name);
  const email = clean(body.email, MAX_LENGTHS.email);
  const company = clean(body.company, MAX_LENGTHS.company);
  const brief = clean(body.brief, MAX_LENGTHS.brief);

  if (!name || !email || !brief) {
    return response.status(400).json({ error: "Name, email, and project context are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(503).json({ error: "The contact service is not configured yet." });
  }

  const destination = process.env.CONTACT_TO_EMAIL || "perpahmian.tech@gmail.com";
  const sender = process.env.CONTACT_FROM_EMAIL || "perpahmian.tech <onboarding@resend.dev>";
  const message = [
    "New project enquiry from perpahmian.tech",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    "",
    "Project context:",
    brief
  ].join("\n");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "perpahmian.tech-contact/1.0"
      },
      body: JSON.stringify({
        from: sender,
        to: [destination],
        reply_to: email,
        subject: `New project enquiry — ${name.replace(/[\r\n]/g, " ")}`,
        text: message
      })
    });

    if (!resendResponse.ok) {
      console.error("Resend delivery failed", resendResponse.status, await resendResponse.text());
      return response.status(502).json({ error: "The email service could not accept the message." });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact delivery failed", error);
    return response.status(500).json({ error: "The message could not be sent right now." });
  }
};
