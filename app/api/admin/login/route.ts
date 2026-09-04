import { NextRequest, NextResponse } from "next/server";
import {
  adminCookieName,
  adminSessionMaxAge,
  createAdminSession,
  isValidAdminSecret,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { secret } = await request.json().catch(() => ({}));

  if (!isValidAdminSecret(secret)) {
    return NextResponse.json({ error: "That secret is not valid." }, { status: 403 });
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
