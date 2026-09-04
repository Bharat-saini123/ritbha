import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminCookieName, isValidAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function isAuthorized(request: NextRequest) {
  return isValidAdminSession(request.cookies.get(adminCookieName())?.value);
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.type !== "string" || typeof body.id !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    if (body.type === "portfolio") {
      const item = await prisma.portfolioItem.update({
        where: { id: body.id },
        data: {
          title: body.title,
          category: body.category,
          description: body.description,
          stack: body.stack,
          image: body.image,
          liveUrl: body.liveUrl || null,
        },
      });
      revalidatePath("/");
      return NextResponse.json({ item });
    }

    if (body.type === "testimonial") {
      const item = await prisma.testimonial.update({
        where: { id: body.id },
        data: { isVisible: Boolean(body.isVisible) },
      });
      revalidatePath("/");
      return NextResponse.json({ item: { ...item, source: "testimonial" as const } });
    }

    if (body.type === "review") {
      const item = await prisma.review.update({
        where: { id: body.id },
        data: { isVisible: Boolean(body.isVisible) },
      });
      revalidatePath("/");
      return NextResponse.json({ item: {
        id: item.id,
        name: item.name,
        role: "Verified reviewer",
        company: "Google account",
        quote: item.comment,
        isVisible: item.isVisible,
        source: "review" as const,
      } });
    }

    if (body.type === "category") {
      const skills = Array.isArray(body.skills)
        ? body.skills.filter((skill: unknown) => typeof skill === "string" && skill.trim())
        : [];
      const item = await prisma.$transaction(async (transaction) => {
        await transaction.skillCategory.update({ where: { id: body.id }, data: { label: body.label, icon: body.icon } });
        await transaction.skill.deleteMany({ where: { categoryId: body.id } });
        await transaction.skill.createMany({ data: skills.map((name: string) => ({ name: name.trim(), categoryId: body.id })) });
        return transaction.skillCategory.findUnique({ where: { id: body.id }, include: { skills: true } });
      });
      revalidatePath("/");
      return NextResponse.json({ item });
    }

    return NextResponse.json({ error: "Unknown content type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Could not save changes" }, { status: 500 });
  }
}