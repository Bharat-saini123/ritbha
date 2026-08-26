import { PrismaClient } from "@prisma/client";
import { skillCategories, services, portfolio, testimonials } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  await prisma.contactMessage.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();

  for (let i = 0; i < skillCategories.length; i++) {
    const cat = skillCategories[i];
    await prisma.skillCategory.create({
      data: {
        id: cat.id,
        label: cat.label,
        icon: cat.icon,
        order: i,
        skills: { create: cat.skills.map((name) => ({ name })) },
      },
    });
  }

  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    await prisma.service.create({ data: { ...s, order: i } });
  }

  for (let i = 0; i < portfolio.length; i++) {
    const p = portfolio[i];
    await prisma.portfolioItem.create({ data: { ...p, order: i } });
  }

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    await prisma.testimonial.create({ data: { ...t, order: i } });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
