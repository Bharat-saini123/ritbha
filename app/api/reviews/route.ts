import { Prisma } from "@prisma/client";
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

  const existingReview = await prisma.review.findUnique({ where: { userId: user.id } });
  if (existingReview) return NextResponse.json({ error: "You have already submitted a review." }, { status: 409 });

  let review;
  try {
    review = await prisma.review.create({
      data: { userId: user.id, name: session.user.name || "Google user", image: session.user.image, rating, comment },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "You have already submitted a review." }, { status: 409 });
    }
    throw error;
  }
  return NextResponse.json({ review });
}
