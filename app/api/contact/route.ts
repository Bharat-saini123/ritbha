import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactAlert } from "@/lib/mailer";

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

  // ── 2. Send notification email ─────────────────────────────────────────────
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    try {
      await sendContactAlert({ name, email, projectType, budget, message });
    } catch (err) {
      // Email failure is non-fatal — log it but still return success to the
      // client so they don't re-submit and create duplicate leads.
      console.error("[contact] email notification failed:", err);
    }
  } else {
    console.warn("[contact] GMAIL_USER / GMAIL_PASS not set — email skipped.");
  }

  return NextResponse.json({ ok: true, persisted: !!savedId, id: savedId });
}
