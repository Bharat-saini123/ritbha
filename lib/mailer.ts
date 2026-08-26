import nodemailer from "nodemailer";

// Reuse a single transporter instance across requests (hot-reload safe via globalThis).
const globalForMailer = globalThis as unknown as {
  mailer?: nodemailer.Transporter;
};

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

export const mailer = globalForMailer.mailer ?? createTransporter();

if (process.env.NODE_ENV !== "production") {
  globalForMailer.mailer = mailer;
}

// ── Design tokens (matches tailwind.config.ts) ────────────────────────────
const C = {
  bg:       "#0B0F1A",
  surface:  "#111827",
  surface2: "#1a2235",
  accent:   "#818cf8",   // electric indigo
  accent2:  "#c084fc",   // violet
  ink:      "#f1f5f9",
  muted:    "#64748b",
  line:     "rgba(129,140,248,0.18)",
  border:   "#1e293b",
};

// ── Shared email wrapper ──────────────────────────────────────────────────
function wrap(body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:24px 16px;background:${C.bg};font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:580px;margin:0 auto;background:${C.surface};border:1px solid ${C.line};border-radius:16px;overflow:hidden">

    <!-- Header bar -->
    <div style="background:linear-gradient(135deg,${C.surface2} 0%,${C.bg} 100%);border-bottom:1px solid ${C.line};padding:20px 28px;display:flex;align-items:center;gap:10px">
      <div style="width:8px;height:8px;border-radius:50%;background:${C.accent};box-shadow:0 0 8px ${C.accent}"></div>
      <span style="font-size:11px;color:${C.accent};letter-spacing:0.12em;text-transform:uppercase;font-weight:600">Ritbha · Root. Build. Grow.</span>
    </div>

    <!-- Body -->
    <div style="padding:28px">
      ${body}
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid ${C.line};padding:16px 28px">
      <p style="margin:0;font-size:11px;color:${C.muted}">Ritbha · Narnaul, Haryana, India · ritbha.com</p>
    </div>
  </div>
</body>
</html>`;
}

// ── Shared row helper ─────────────────────────────────────────────────────
function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;color:${C.accent};font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:130px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;color:${C.ink};font-size:14px;vertical-align:top">${value}</td>
  </tr>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Alert to the studio owner — fires on every form submission
// ─────────────────────────────────────────────────────────────────────────────
export async function sendContactAlert(payload: ContactPayload) {
  const { name, email, projectType, budget, message } = payload;
  const to = process.env.NOTIFY_EMAIL ?? "sainibharat277@gmail.com";

  const body = `
    <h2 style="margin:0 0 6px;font-size:22px;font-weight:700;color:${C.ink};line-height:1.3">
      New lead from <span style="color:${C.accent}">${name}</span>
    </h2>
    <p style="margin:0 0 22px;font-size:14px;color:${C.muted}">
      Someone just filled in the contact form on Ritbha.
    </p>

    <table style="width:100%;border-collapse:collapse">
      ${row("Name",  name)}
      ${row("Email", `<a href="mailto:${email}" style="color:${C.accent};text-decoration:none">${email}</a>`)}
      ${projectType ? row("Project", projectType) : ""}
      ${budget      ? row("Budget",  budget)       : ""}
    </table>

    <!-- Divider -->
    <div style="height:1px;background:${C.line};margin:20px 0"></div>

    <p style="margin:0 0 8px;font-size:11px;color:${C.accent};text-transform:uppercase;letter-spacing:0.1em">Message</p>
    <p style="margin:0 0 26px;font-size:15px;color:${C.ink};line-height:1.75;white-space:pre-wrap">${message}</p>

    <!-- CTA button -->
    <a href="mailto:${email}"
       style="display:inline-block;background:${C.accent};color:${C.bg};font-weight:700;
              font-size:14px;padding:13px 30px;border-radius:999px;text-decoration:none;
              letter-spacing:0.02em">
      Reply to ${name} →
    </a>
  `;

  await mailer.sendMail({
    from:    `"Ritbha Website" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: email,
    subject: `🔔 New enquiry from ${name}`,
    html:    wrap(body),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Confirmation to the person who submitted the form
// ─────────────────────────────────────────────────────────────────────────────
export async function sendConfirmationEmail(payload: ContactPayload) {
  const { name, email, projectType, budget, message } = payload;
  const replyTo = process.env.NOTIFY_EMAIL ?? "sainibharat277@gmail.com";

  const body = `
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${C.ink};line-height:1.3">
      Hey ${name}, we got your message! 👋
    </h2>

    <p style="font-size:15px;color:#94a3b8;line-height:1.8;margin:0 0 14px">
      Thank you for reaching out to <strong style="color:${C.accent}">Ritbha</strong>.
      We've received your enquiry and will review it carefully.
    </p>
    <p style="font-size:15px;color:#94a3b8;line-height:1.8;margin:0 0 24px">
      Expect a reply within <strong style="color:${C.ink}">24 hours</strong> — usually sooner.
      Feel free to reply to this email if you have anything to add.
    </p>

    <!-- Summary card -->
    <div style="background:${C.bg};border:1px solid ${C.line};border-radius:12px;padding:20px 22px;margin-bottom:26px">
      <p style="margin:0 0 14px;font-size:11px;color:${C.accent};text-transform:uppercase;letter-spacing:0.1em">
        Your submission summary
      </p>
      <table style="width:100%;border-collapse:collapse">
        ${projectType ? row("Project", projectType) : ""}
        ${budget      ? row("Budget",  budget)       : ""}
        ${row("Message", `<span style="color:#94a3b8;line-height:1.65">${message}</span>`)}
      </table>
    </div>

    <p style="font-size:15px;color:#94a3b8;line-height:1.8;margin:0 0 28px">
      Looking forward to hearing more about your project.
      Let&apos;s build something great together! 🚀
    </p>

    <!-- Signature -->
    <p style="font-size:15px;color:${C.ink};margin:0 0 4px;font-weight:600">Bharat Saini</p>
    <p style="font-size:13px;color:${C.muted};margin:0">Founder, Ritbha · Full-Stack Web Studio</p>

    <!-- Gradient accent line -->
    <div style="height:3px;margin-top:28px;border-radius:999px;
                background:linear-gradient(90deg,${C.accent},${C.accent2},transparent)"></div>
  `;

  await mailer.sendMail({
    from:    `"Bharat @ Ritbha" <${process.env.GMAIL_USER}>`,
    to:      email,
    replyTo,
    subject: `Thanks for reaching out, ${name}! ✦`,
    html:    wrap(body),
  });
}
