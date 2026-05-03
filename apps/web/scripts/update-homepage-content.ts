import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/lib/utils";

const prisma = new PrismaClient();

const IMG_BASE = "/images/experiencias";

async function main() {
  console.log("Upserting new disciplines (Ciclismo, Motociclismo, Padel)...");

  const ciclismo = await prisma.discipline.upsert({
    where: { slug: "ciclismo" },
    update: {},
    create: {
      name: "Ciclismo",
      slug: "ciclismo",
      description:
        "Rutas de montaña, gran fondo y cicloturismo entre paisajes de la Patagonia y los valles andinos.",
      imageUrl: `${IMG_BASE}/EXP Gran Fondo 7 lagos Participar Bariloche.png`,
      modalities: ["PRACTICAR", "COMPETIR"],
      countries: ["ARGENTINA"],
      cities: ["BARILOCHE"],
    },
  });

  const motociclismo = await prisma.discipline.upsert({
    where: { slug: "motociclismo" },
    update: {},
    create: {
      name: "Motociclismo",
      slug: "motociclismo",
      description:
        "Paseos en moto por rutas de alta montaña, bodegas y caminos escénicos.",
      imageUrl: `${IMG_BASE}/EXP Paseo en motos Practicar Mendoza.png`,
      modalities: ["PRACTICAR"],
      countries: ["ARGENTINA"],
      cities: [],
    },
  });

  const padel = await prisma.discipline.upsert({
    where: { slug: "padel" },
    update: {},
    create: {
      name: "Padel",
      slug: "padel",
      description:
        "Uno de los deportes de mayor crecimiento en el país, con torneos internacionales y eventos Premier Padel.",
      imageUrl: `${IMG_BASE}/Calendario evento Premier Padel Buenos Aires.png`,
      modalities: ["PRACTICAR", "COMPETIR", "PRESENCIAR"],
      countries: ["ARGENTINA"],
      cities: ["BUENOS_AIRES"],
    },
  });

  const golf = await prisma.discipline.findUnique({ where: { slug: "golf" } });
  if (!golf) throw new Error("Discipline 'golf' no existe en DB");

  console.log("Un-featuring: esqui, kite, buceo...");
  await prisma.experience.updateMany({
    where: { slug: { in: ["esqui-en-bariloche", "kite-en-los-roques", "buceo-en-isla-margarita"] } },
    data: { featured: false },
  });

  console.log("Updating imageUrls of existing experiences (Monumental, Polo, Maraton)...");
  await prisma.experience.update({
    where: { slug: "river-plate-experiencia-vip" },
    data: {
      imageUrls: [`${IMG_BASE}/EXP Monumental Presenciar Buenos Aires.png`],
      featured: true,
    },
  });

  await prisma.experience.update({
    where: { slug: "polo-en-palermo" },
    data: {
      imageUrls: [`${IMG_BASE}/Calendario Abierto Argentino de Polo Buenos Aires Presenciar.png`],
    },
  });

  await prisma.experience.update({
    where: { slug: "maraton-de-buenos-aires" },
    data: {
      imageUrls: [`${IMG_BASE}/Calendario Maraton Participar Buenos Aires.png`],
    },
  });

  console.log("Bumping Cruce de los Andes startDate to Feb 2027...");
  await prisma.experience.update({
    where: { slug: "cruce-de-los-andes" },
    data: {
      startDate: new Date("2027-02-15T00:00:00.000Z"),
      endDate: new Date("2027-02-20T00:00:00.000Z"),
      featured: true,
    },
  });

  console.log("Upserting new featured experiences...");

  const padelExperience = {
    title: "Premier Padel Buenos Aires",
    description:
      "Vivi en vivo uno de los eventos mas convocantes del circuito Premier Padel. Las mejores duplas del mundo compiten en la capital argentina con un publico apasionado y un clima unico. Palcos VIP, acceso a prueba de canchas y experiencias exclusivas para vivir el padel desde adentro.",
    country: "ARGENTINA" as const,
    city: "BUENOS_AIRES" as const,
    location: "Buenos Aires",
    modality: "PRESENCIAR" as const,
    formato: "LIFESTYLE" as const,
    disciplineId: padel.id,
    imageUrls: [`${IMG_BASE}/Calendario evento Premier Padel Buenos Aires.png`],
    startDate: new Date("2026-12-03T00:00:00.000Z"),
    endDate: new Date("2026-12-07T00:00:00.000Z"),
    priceInfo: "Desde USD 180",
    featured: true,
    published: true,
  };

  const golfBarilocheExperience = {
    title: "Golf en Llao Llao - Bariloche",
    description:
      "Jugar en uno de los campos mas escenicos del mundo, rodeado por el lago Nahuel Huapi y la cordillera de los Andes. El Llao Llao Golf Club ofrece 18 hoyos de diseno clasico, con vistas que quitan el aliento en cada tiro. Incluye green fee, buggy y acceso al spa del resort.",
    country: "ARGENTINA" as const,
    city: "BARILOCHE" as const,
    location: "Bariloche",
    modality: "PRACTICAR" as const,
    formato: "LIFESTYLE" as const,
    disciplineId: golf.id,
    imageUrls: [`${IMG_BASE}/EXP Golf Practicar Bariloche.png`],
    startDate: null,
    endDate: null,
    priceInfo: "Desde USD 280",
    featured: true,
    published: true,
  };

  const paseoMotoExperience = {
    title: "Paseo en Moto - Alta Montaña Mendoza",
    description:
      "Recorre los caminos mas espectaculares de Mendoza sobre dos ruedas: Alta Montaña, Cacheuta, Potrerillos y los valles entre bodegas. Rutas guiadas con motos adventure, equipo completo y paradas fotograficas en los mejores miradores. Experiencia ideal para moteros y aventureros.",
    country: "ARGENTINA" as const,
    city: null,
    location: "Mendoza",
    modality: "PRACTICAR" as const,
    formato: "LIFESTYLE" as const,
    disciplineId: motociclismo.id,
    imageUrls: [`${IMG_BASE}/EXP Paseo en motos Practicar Mendoza.png`],
    startDate: null,
    endDate: null,
    priceInfo: "Desde USD 220",
    featured: true,
    published: true,
  };

  const granFondoExperience = {
    title: "Gran Fondo 7 Lagos - Bariloche",
    description:
      "Una de las carreras de ciclismo de ruta mas emblematicas de la Patagonia. 110 km por la Ruta de los 7 Lagos, entre Villa La Angostura y San Martin de los Andes, atravesando bosques, lagos y paisajes andinos. Incluye inscripcion, kit de corredor y asistencia en ruta.",
    country: "ARGENTINA" as const,
    city: "BARILOCHE" as const,
    location: "Bariloche",
    modality: "COMPETIR" as const,
    formato: "EQUIPOS" as const,
    disciplineId: ciclismo.id,
    imageUrls: [`${IMG_BASE}/EXP Gran Fondo 7 lagos Participar Bariloche.png`],
    startDate: new Date("2027-03-14T00:00:00.000Z"),
    endDate: new Date("2027-03-14T00:00:00.000Z"),
    priceInfo: "Desde USD 150",
    featured: true,
    published: true,
  };

  for (const exp of [padelExperience, golfBarilocheExperience, paseoMotoExperience, granFondoExperience]) {
    const slug = slugify(exp.title);
    await prisma.experience.upsert({
      where: { slug },
      update: { ...exp, slug },
      create: { ...exp, slug },
    });
    console.log(`  ✓ upserted ${slug}`);
  }

  console.log("\nDone. Current featured experiences:");
  const featured = await prisma.experience.findMany({
    where: { featured: true, published: true },
    include: { discipline: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  for (const e of featured) {
    console.log(`  - ${e.title} [${e.discipline.name}] → ${e.imageUrls[0]}`);
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
