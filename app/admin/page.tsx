import AdminPanel from "@/components/AdminPanel";
import AdminLogin from "@/components/AdminLogin";
import { adminCookieName, isValidAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = cookies().get(adminCookieName())?.value;

  if (!isValidAdminSession(session)) {
    return <AdminLogin />;
  }

  const [messages, services, portfolio, testimonials, categories] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.portfolioItem.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    prisma.skillCategory.findMany({ orderBy: { order: "asc" }, include: { skills: true } }),
  ]);

  return (
    <AdminPanel
      initialData={{
        messages: messages.map((message) => ({
          ...message,
          createdAt: message.createdAt.toISOString(),
        })),
        services,
        portfolio,
        testimonials,
        categories,
      }}
    />
  );
}
