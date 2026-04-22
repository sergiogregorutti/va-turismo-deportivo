import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMG_BASE = "/images/experiencias";
const YT_CHALTEN = "https://www.youtube.com/watch?v=2nwuHYCS2Hs";

async function main() {
  console.log("Swapping featured: un-feature Padel, re-feature Esqui...");
  await prisma.experience.update({
    where: { slug: "premier-padel-buenos-aires" },
    data: { featured: false },
  });

  console.log("Re-feature Esqui and remove it from calendar (startDate=null)...");
  await prisma.experience.update({
    where: { slug: "esqui-en-bariloche" },
    data: {
      featured: true,
      startDate: null,
      endDate: null,
    },
  });

  console.log("Rebranding Cruce de los Andes -> Trekking El Chalten with ovo.jpeg + YouTube link...");
  await prisma.experience.update({
    where: { slug: "cruce-de-los-andes" },
    data: {
      title: "Trekking El Chaltén",
      description:
        "Descubri los senderos mas iconicos de la Patagonia argentina a los pies del Cerro Fitz Roy. Trekking por la Laguna de los Tres, Laguna Torre y el Loma del Pliegue Tumbado, con guias locales y paisajes de glaciares, bosques y lagos turquesa. Video en vivo desde la expedicion.",
      city: null,
      location: "El Chaltén, Santa Cruz",
      imageUrls: [`${IMG_BASE}/ovo.jpeg`],
      externalUrl: YT_CHALTEN,
    },
  });

  console.log("\nDone. Current state:\n");

  const featured = await prisma.experience.findMany({
    where: { featured: true, published: true },
    include: { discipline: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  console.log("FEATURED (homepage grid):");
  for (const e of featured) {
    const ext = e.externalUrl ? ` [ext: ${e.externalUrl}]` : "";
    console.log(`  - ${e.title} [${e.discipline.name}] → ${e.imageUrls[0]}${ext}`);
  }

  const upcoming = await prisma.experience.findMany({
    where: { published: true, startDate: { gte: new Date() } },
    include: { discipline: true },
    orderBy: { startDate: "asc" },
    take: 12,
  });
  console.log("\nCALENDAR (upcoming):");
  for (const e of upcoming) {
    console.log(`  - ${e.startDate?.toISOString().slice(0, 10)} | ${e.title}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
