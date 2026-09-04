import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_EMAIL,
  adminCookieName,
  adminSessionMaxAge,
  createAdminSession,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { email } = await request.json().catch(() => ({}));

  if (typeof email !== "string" || email.trim().toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "This email is not authorized." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: adminCookieName(),
    value: createAdminSession(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: adminSessionMaxAge(),
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({ name: adminCookieName(), value: "", maxAge: 0, path: "/" });
  return response;
}
