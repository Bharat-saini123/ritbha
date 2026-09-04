import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Please sign in with Google first." }, { status: 401 });

  const body = await request.json();
  const rating = Number(body?.rating);
  const comment = typeof body?.comment === "string" ? body.comment.trim() : "";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5 || comment.length < 10 || comment.length > 500) {
    return NextResponse.json({ error: "Choose 1-5 stars and write 10-500 characters." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "Your account could not be found." }, { status: 404 });

  const review = await prisma.review.upsert({
    where: { userId: user.id },
    update: { name: session.user.name || "Google user", image: session.user.image, rating, comment, isVisible: true },
    create: { userId: user.id, name: session.user.name || "Google user", image: session.user.image, rating, comment },
  });
  return NextResponse.json({ review });
}
