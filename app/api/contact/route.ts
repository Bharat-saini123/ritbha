import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactAlert, sendConfirmationEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, projectType, budget, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // ── 1. Persist to DB (optional — skipped if DATABASE_URL not set) ──────────
  let savedId: string | undefined;

  if (!process.env.DATABASE_URL) {
    console.log("[contact] (no DATABASE_URL — not persisted):", body);
  } else {
    try {
      const saved = await prisma.contactMessage.create({
        data: { name, email, projectType, budget, message },
      });
      savedId = saved.id;
    } catch (err) {
      console.error("[contact] failed to persist:", err);
      // Non-fatal — still try to send the email so the lead isn't lost.
    }
  }

  // ── 2. Send emails ────────────────────────────────────────────────────────
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    const emailPayload = { name, email, projectType, budget, message };
    // Run both in parallel; one failure won't block the other
    const [alertResult, confirmResult] = await Promise.allSettled([
      sendContactAlert(emailPayload),
      sendConfirmationEmail(emailPayload),
    ]);
    if (alertResult.status === "rejected")
      console.error("[contact] alert email failed:", alertResult.reason);
    if (confirmResult.status === "rejected")
      console.error("[contact] confirmation email failed:", confirmResult.reason);
  } else {
    console.warn("[contact] GMAIL_USER / GMAIL_PASS not set — emails skipped.");
  }

  return NextResponse.json({ ok: true, persisted: !!savedId, id: savedId });
}
