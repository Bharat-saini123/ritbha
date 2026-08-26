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

// ---------------------------------------------------------------------------
// sendContactAlert — fires when someone submits the contact / booking form.
// ---------------------------------------------------------------------------
export async function sendContactAlert({
  name,
  email,
  projectType,
  budget,
  message,
}: {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
}) {
  const to = process.env.NOTIFY_EMAIL ?? "sainibharat277@gmail.com";

  await mailer.sendMail({
    from: `"Ritbha Website" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: email,           // clicking Reply goes straight to the client
    subject: `🔔 New enquiry from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
        <h2 style="margin:0 0 16px;font-size:18px;color:#111">New contact form submission</h2>

        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151">
          <tr>
            <td style="padding:8px 0;color:#6b7280;width:120px">Name</td>
            <td style="padding:8px 0;font-weight:600">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280">Email</td>
            <td style="padding:8px 0">
              <a href="mailto:${email}" style="color:#84cc16">${email}</a>
            </td>
          </tr>
          ${projectType ? `
          <tr>
            <td style="padding:8px 0;color:#6b7280">Project type</td>
            <td style="padding:8px 0">${projectType}</td>
          </tr>` : ""}
          ${budget ? `
          <tr>
            <td style="padding:8px 0;color:#6b7280">Budget</td>
            <td style="padding:8px 0">${budget}</td>
          </tr>` : ""}
        </table>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />

        <p style="font-size:14px;color:#6b7280;margin:0 0 6px">Message</p>
        <p style="font-size:15px;color:#111;margin:0;white-space:pre-wrap">${message}</p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
        <p style="font-size:12px;color:#9ca3af;margin:0">Sent from ritbha.com contact form</p>
      </div>
    `,
  });
}
