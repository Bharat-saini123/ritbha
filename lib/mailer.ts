import nodemailer from "nodemailer";

// Reuse a single transporter instance across requests (hot-reload safe via globalThis).
const globalForMailer = globalThis as unknown as {
  mailer?: nodemailer.Transporter;
};

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,   // your Gmail address
      pass: process.env.GMAIL_PASS,   // 16-char Gmail App Password (NOT your real password)
    },
  });
}

export const mailer =
  globalForMailer.mailer ?? createTransporter();

if (process.env.NODE_ENV !== "production") {
  globalForMailer.mailer = mailer;
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

  await mailer.sendMail({
    from: `"Ritbha Website" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: email,           // clicking Reply goes straight to the client
    subject: `🔔 New enquiry from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:580px;margin:auto;padding:28px;
                  background:#0d1f15;border:1px solid #1e3a24;border-radius:14px;color:#e8f5e9">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
          <div style="width:10px;height:10px;border-radius:50%;background:#c9f169"></div>
          <span style="font-size:13px;color:#c9f169;letter-spacing:0.1em;text-transform:uppercase">
            New Lead · Ritbha
          </span>
        </div>

        <h2 style="margin:0 0 20px;font-size:20px;font-weight:700;color:#fff">
          ${name} wants to work with you
        </h2>

        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr>
            <td style="padding:10px 0;color:#84cc16;width:130px;vertical-align:top">Name</td>
            <td style="padding:10px 0;color:#fff;font-weight:600">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#84cc16;vertical-align:top">Email</td>
            <td style="padding:10px 0">
              <a href="mailto:${email}" style="color:#c9f169;text-decoration:none">${email}</a>
            </td>
          </tr>
          ${projectType ? `
          <tr>
            <td style="padding:10px 0;color:#84cc16;vertical-align:top">Project type</td>
            <td style="padding:10px 0;color:#fff">${projectType}</td>
          </tr>` : ""}
          ${budget ? `
          <tr>
            <td style="padding:10px 0;color:#84cc16;vertical-align:top">Budget</td>
            <td style="padding:10px 0;color:#fff">${budget}</td>
          </tr>` : ""}
        </table>

        <div style="margin:20px 0;height:1px;background:#1e3a24"></div>

        <p style="font-size:13px;color:#84cc16;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.08em">
          Message
        </p>
        <p style="font-size:15px;color:#e8f5e9;margin:0;line-height:1.7;white-space:pre-wrap">${message}</p>

        <div style="margin:28px 0 0">
          <a href="mailto:${email}"
             style="display:inline-block;background:#c9f169;color:#0d1f15;font-weight:700;
                    font-size:14px;padding:12px 28px;border-radius:999px;text-decoration:none">
            Reply to ${name} →
          </a>
        </div>

        <div style="margin:24px 0 0;height:1px;background:#1e3a24"></div>
        <p style="font-size:12px;color:#4a7c59;margin:12px 0 0">
          Sent automatically from the Ritbha contact form · ritbha.com
        </p>
      </div>
    `,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Confirmation to the person who submitted the form
// ─────────────────────────────────────────────────────────────────────────────
export async function sendConfirmationEmail(payload: ContactPayload) {
  const { name, email, projectType, budget, message } = payload;

  await mailer.sendMail({
    from: `"Bharat @ Ritbha" <${process.env.GMAIL_USER}>`,
    to: email,
    replyTo: process.env.NOTIFY_EMAIL ?? "sainibharat277@gmail.com",
    subject: `Thanks for reaching out, ${name}! 🌱`,
    html: `
      <div style="font-family:sans-serif;max-width:580px;margin:auto;padding:28px;
                  background:#0d1f15;border:1px solid #1e3a24;border-radius:14px;color:#e8f5e9">

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px">
          <div style="width:10px;height:10px;border-radius:50%;background:#c9f169"></div>
          <span style="font-size:13px;color:#c9f169;letter-spacing:0.1em;text-transform:uppercase">
            Ritbha · Root. Build. Grow.
          </span>
        </div>

        <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#fff;line-height:1.3">
          Hey ${name}, we got your message! 👋
        </h2>

        <p style="font-size:15px;color:#c8e6c9;line-height:1.8;margin:0 0 16px">
          Thank you for reaching out to <strong style="color:#c9f169">Ritbha</strong>.
          We've received your enquiry and will review it carefully.
        </p>

        <p style="font-size:15px;color:#c8e6c9;line-height:1.8;margin:0 0 24px">
          You can expect a reply from us within
          <strong style="color:#fff">24 hours</strong> — usually sooner.
          In the meantime, feel free to reply to this email if you have
          any additional details to share.
        </p>

        <!-- Summary box -->
        <div style="background:#0a1a10;border:1px solid #1e3a24;border-radius:10px;padding:18px 20px;margin-bottom:24px">
          <p style="font-size:12px;color:#84cc16;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.1em">
            Your submission summary
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${projectType ? `
            <tr>
              <td style="padding:6px 0;color:#6b7280;width:120px">Project</td>
              <td style="padding:6px 0;color:#fff">${projectType}</td>
            </tr>` : ""}
            ${budget ? `
            <tr>
              <td style="padding:6px 0;color:#6b7280">Budget</td>
              <td style="padding:6px 0;color:#fff">${budget}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:6px 0;color:#6b7280;vertical-align:top">Message</td>
              <td style="padding:6px 0;color:#c8e6c9;line-height:1.6">${message}</td>
            </tr>
          </table>
        </div>

        <p style="font-size:15px;color:#c8e6c9;line-height:1.8;margin:0 0 28px">
          Looking forward to hearing more about your project. Let's build something great together! 🚀
        </p>

        <p style="font-size:15px;color:#fff;margin:0">
          Warm regards,<br/>
          <strong style="color:#c9f169">Bharat Saini</strong><br/>
          <span style="color:#6b7280;font-size:13px">Founder, Ritbha · Full-Stack Web Studio</span>
        </p>

        <div style="margin:28px 0 0;height:1px;background:#1e3a24"></div>
        <p style="font-size:12px;color:#4a7c59;margin:12px 0 0">
          Ritbha · Narnaul, Haryana, India · ritbha.com
        </p>
      </div>
    `,
  });
}
