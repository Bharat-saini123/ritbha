import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, projectType, budget, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // If DATABASE_URL isn't set yet (e.g. first run before Postgres is wired
  // up), don't hard-fail the form — log it and return success so the UI
  // still works with the static/fake-data setup.
  if (!process.env.DATABASE_URL) {
    console.log("[contact] (no DATABASE_URL — not persisted):", body);
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const saved = await prisma.contactMessage.create({
      data: { name, email, projectType, budget, message },
    });
    return NextResponse.json({ ok: true, persisted: true, id: saved.id });
  } catch (err) {
    console.error("[contact] failed to persist:", err);
    return NextResponse.json({ error: "Could not save message." }, { status: 500 });
  }
}
