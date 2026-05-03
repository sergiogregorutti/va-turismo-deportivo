import { PrismaClient, Country, Modality, City, Formato } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@vaturismodeportivo.com" },
    update: {},
    create: {
      email: "admin@vaturismodeportivo.com",
      password: hashedPassword,
      name: "Administrador",
      role: "ADMIN",
    },
  });
  console.log("Admin user created: admin@vaturismodeportivo.com / admin123");

  // Create disciplines
  const disciplines = await Promise.all([
    prisma.discipline.upsert({
      where: { slug: "esqui" },
      update: {},
      create: {
        name: "Esqui",
        slug: "esqui",
        description: "Deslizate por las mejores pistas de nieve",
        imageUrl:
          "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800",
        modalities: [Modality.PRACTICAR, Modality.COMPETIR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "surf" },
      update: {},
      create: {
        name: "Surf",
        slug: "surf",
        description: "Domina las olas en los mejores spots",
        imageUrl:
          "https://images.unsplash.com/photo-1502680390548-bdbac40e4a27?w=800",
        modalities: [Modality.PRACTICAR, Modality.COMPETIR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "kite" },
      update: {},
      create: {
        name: "Kite",
        slug: "kite",
        description: "Vuela sobre el agua con el poder del viento",
        imageUrl:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
        modalities: [Modality.PRACTICAR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "trekking" },
      update: {},
      create: {
        name: "Trekking",
        slug: "trekking",
        description: "Explora senderos y montanas increibles",
        imageUrl:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
        modalities: [Modality.PRACTICAR, Modality.COMPETIR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "futbol" },
      update: {},
      create: {
        name: "Futbol",
        slug: "futbol",
        description: "Vivi la pasion del futbol en los mejores estadios",
        imageUrl:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
        modalities: [Modality.PRESENCIAR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "polo" },
      update: {},
      create: {
        name: "Polo",
        slug: "polo",
        description: "El deporte de los reyes en la tierra del polo",
        imageUrl:
          "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=800",
        modalities: [Modality.PRESENCIAR, Modality.PRACTICAR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "buceo" },
      update: {},
      create: {
        name: "Buceo",
        slug: "buceo",
        description: "Descubri el mundo submarino",
        imageUrl:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
        modalities: [Modality.PRACTICAR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "golf" },
      update: {},
      create: {
        name: "Golf",
        slug: "golf",
        description: "Disfruta de los mejores campos de golf",
        imageUrl:
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800",
        modalities: [Modality.PRACTICAR, Modality.COMPETIR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "tenis" },
      update: {},
      create: {
        name: "Tenis",
        slug: "tenis",
        description: "Jugá en canchas de primer nivel",
        imageUrl:
          "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800",
        modalities: [Modality.PRACTICAR, Modality.COMPETIR, Modality.PRESENCIAR],
      },
    }),
    prisma.discipline.upsert({
      where: { slug: "maraton" },
      update: {},
      create: {
        name: "Maraton",
        slug: "maraton",
        description: "Corré en las carreras mas emocionantes",
        imageUrl:
          "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800",
        modalities: [Modality.COMPETIR, Modality.PRESENCIAR],
      },
    }),
  ]);

  // Create sample experiences
  const esqui = disciplines[0];
  const kite = disciplines[2];
  const trekking = disciplines[3];
  const futbol = disciplines[4];
  const polo = disciplines[5];
  const buceo = disciplines[6];
  const golf = disciplines[7];
  const maraton = disciplines[9];

  await Promise.all([
    prisma.experience.upsert({
      where: { slug: "esqui-en-bariloche" },
      update: { city: City.BARILOCHE, formato: Formato.LIFESTYLE },
      create: {
        title: "Esqui en Cerro Catedral - Bariloche",
        slug: "esqui-en-bariloche",
        description:
          "Vivi la experiencia de esquiar en el centro de esqui mas grande de Sudamerica. Cerro Catedral ofrece mas de 120 km de pistas para todos los niveles, desde principiantes hasta expertos. Disfruta de paisajes increibles con vista al lago Nahuel Huapi mientras desciendes por pistas de nieve de calidad internacional.",
        country: Country.ARGENTINA,
        city: City.BARILOCHE,
        location: "Bariloche, Rio Negro",
        modality: Modality.PRACTICAR,
        formato: Formato.LIFESTYLE,
        disciplineId: esqui.id,
        imageUrls: [
          "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200",
          "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=1200",
          "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200",
        ],
        startDate: new Date("2026-06-15"),
        endDate: new Date("2026-10-15"),
        priceInfo: "Desde USD 850",
        featured: true,
        published: true,
      },
    }),
    prisma.experience.upsert({
      where: { slug: "kite-en-los-roques" },
      update: { city: City.LOS_ROQUES, formato: Formato.LIFESTYLE },
      create: {
        title: "Kite Paradise - Los Roques",
        slug: "kite-en-los-roques",
        description:
          "Los Roques es uno de los destinos de kitesurf mas exclusivos del Caribe. Con vientos constantes de 15 a 20 nudos, aguas cristalinas y temperaturas de 28°C, es el lugar perfecto para practicar kite en un entorno paradisiaco. Condiciones ideales tanto para principiantes como para riders avanzados.",
        country: Country.VENEZUELA,
        city: City.LOS_ROQUES,
        location: "Archipielago Los Roques",
        modality: Modality.PRACTICAR,
        formato: Formato.LIFESTYLE,
        disciplineId: kite.id,
        imageUrls: [
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
          "https://images.unsplash.com/photo-1621451683023-4f70b7c80521?w=1200",
        ],
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-12-31"),
        priceInfo: "Desde USD 1.200",
        featured: true,
        published: true,
      },
    }),
    prisma.experience.upsert({
      where: { slug: "cruce-de-los-andes" },
      update: { city: City.BARILOCHE, formato: Formato.EQUIPOS },
      create: {
        title: "Cruce de los Andes - Bariloche",
        slug: "cruce-de-los-andes",
        description:
          "Un desafio epico de trekking de alta montaña. Cruza la Cordillera de los Andes en una travesia de 40 km que te llevara por paisajes de ensueño, glaciares milenarios y bosques patagonicos. Altitud maxima: 2500m. Nivel: avanzado. Una experiencia que cambiara tu vida.",
        country: Country.ARGENTINA,
        city: City.BARILOCHE,
        location: "Bariloche, Rio Negro",
        modality: Modality.COMPETIR,
        formato: Formato.EQUIPOS,
        disciplineId: trekking.id,
        imageUrls: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
          "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200",
        ],
        startDate: new Date("2026-02-15"),
        endDate: new Date("2026-02-20"),
        priceInfo: "Desde USD 1.500",
        featured: true,
        published: true,
      },
    }),
    prisma.experience.upsert({
      where: { slug: "river-plate-experiencia-vip" },
      update: { city: City.BUENOS_AIRES, formato: Formato.LIFESTYLE },
      create: {
        title: "Estadio Mas Monumental - Experiencia VIP",
        slug: "river-plate-experiencia-vip",
        description:
          "Vivi la pasion del futbol argentino desde el mejor lugar. Experiencia VIP en el Estadio Mas Monumental de River Plate. Incluye acceso a palco preferencial, catering exclusivo y la energia de mas de 80.000 hinchas. Una experiencia unica para los amantes del futbol.",
        country: Country.ARGENTINA,
        city: City.BUENOS_AIRES,
        location: "Buenos Aires",
        modality: Modality.PRESENCIAR,
        formato: Formato.LIFESTYLE,
        disciplineId: futbol.id,
        imageUrls: [
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
          "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200",
        ],
        startDate: new Date("2026-03-24"),
        endDate: new Date("2026-11-30"),
        priceInfo: "Desde USD 450",
        featured: true,
        published: true,
      },
    }),
    prisma.experience.upsert({
      where: { slug: "buceo-en-isla-margarita" },
      update: { city: City.MARGARITA, formato: Formato.LIFESTYLE },
      create: {
        title: "Buceo en Isla Margarita",
        slug: "buceo-en-isla-margarita",
        description:
          "Descubri los arrecifes de coral y la vida marina del Caribe venezolano. Inmersiones guiadas para todos los niveles en las aguas cristalinas de Isla Margarita. Avistamiento de tortugas marinas, rayas y una gran variedad de peces tropicales.",
        country: Country.VENEZUELA,
        city: City.MARGARITA,
        location: "Isla Margarita, Nueva Esparta",
        modality: Modality.PRACTICAR,
        formato: Formato.LIFESTYLE,
        disciplineId: buceo.id,
        imageUrls: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200",
          "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200",
        ],
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-12-31"),
        priceInfo: "Desde USD 350",
        featured: true,
        published: true,
      },
    }),
    prisma.experience.upsert({
      where: { slug: "polo-en-palermo" },
      update: { city: City.BUENOS_AIRES, formato: Formato.CORPORATIVO },
      create: {
        title: "Abierto de Polo de Palermo",
        slug: "polo-en-palermo",
        description:
          "Presencia el torneo de polo mas prestigioso del mundo. El Abierto Argentino de Polo en el Campo Argentino de Polo en Palermo reune a los mejores jugadores del planeta. Una experiencia unica que combina deporte, elegancia y tradicion argentina.",
        country: Country.ARGENTINA,
        city: City.BUENOS_AIRES,
        location: "Palermo, Buenos Aires",
        modality: Modality.PRESENCIAR,
        formato: Formato.CORPORATIVO,
        disciplineId: polo.id,
        imageUrls: [
          "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=1200",
        ],
        startDate: new Date("2026-11-01"),
        endDate: new Date("2026-12-10"),
        priceInfo: "Desde USD 200",
        featured: false,
        published: true,
      },
    }),
    prisma.experience.upsert({
      where: { slug: "golf-en-nordelta" },
      update: { city: City.BUENOS_AIRES, formato: Formato.LIFESTYLE },
      create: {
        title: "Golf en Nordelta - Buenos Aires",
        slug: "golf-en-nordelta",
        description:
          "Disfruta de una jornada de golf en uno de los campos mas modernos de Argentina. El campo de Nordelta ofrece 18 hoyos de nivel internacional rodeados de lagunas y naturaleza. Ideal para golfistas de todos los niveles.",
        country: Country.ARGENTINA,
        city: City.BUENOS_AIRES,
        location: "Nordelta, Buenos Aires",
        modality: Modality.PRACTICAR,
        formato: Formato.LIFESTYLE,
        disciplineId: golf.id,
        imageUrls: [
          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200",
        ],
        priceInfo: "Desde USD 180",
        featured: false,
        published: true,
      },
    }),
    prisma.experience.upsert({
      where: { slug: "maraton-de-buenos-aires" },
      update: { city: City.BUENOS_AIRES, formato: Formato.LIFESTYLE },
      create: {
        title: "Maraton Internacional de Buenos Aires",
        slug: "maraton-de-buenos-aires",
        description:
          "Corré la maraton mas importante de Sudamerica. El recorrido de 42 km te lleva por los puntos mas iconicos de Buenos Aires: el Obelisco, Puerto Madero, La Boca y Palermo. Miles de corredores de todo el mundo participan en esta fiesta del running.",
        country: Country.ARGENTINA,
        city: City.BUENOS_AIRES,
        location: "Buenos Aires",
        modality: Modality.COMPETIR,
        formato: Formato.LIFESTYLE,
        disciplineId: maraton.id,
        imageUrls: [
          "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200",
          "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200",
        ],
        startDate: new Date("2026-10-18"),
        endDate: new Date("2026-10-18"),
        priceInfo: "Desde USD 120",
        featured: false,
        published: true,
      },
    }),
  ]);

  // Create sample hospedajes
  await prisma.hospedaje.upsert({
    where: { slug: "departamento-tematico-futbol-palermo" },
    update: {
      city: City.BUENOS_AIRES,
      imageUrls: [
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200",
      ],
    },
    create: {
      title: "Departamento Tematico Futbolistico - Palermo Soho",
      slug: "departamento-tematico-futbol-palermo",
      description:
        "Un Airbnb de tematica futbolistica. Unico. Invitando a cada huesped a vivir una experiencia inolvidable.\n\nLa ambientacion se basa en la pasion por el futbol, destacando principalmente la figura de Lionel Messi. La historia, los colores, las texturas y los elementos iconicos del deporte. Se busca que tanto los aficionados como aquellos que no son tan entusiastas se sientan inmersos en la emocion del futbol.\n\nLa experiencia esta inmersa en dos pilares fundamentales:\n\nAmbientacion: mobiliario, graficas, elementos de decoracion e iluminacion. Cesped sintetico completo con detalles de lineas de cancha, neon de cancha en el cielorraso, pared detras de la cama con mural/vinilo impreso con grafica, banco de simil cemento con butacas estilo banco de suplentes, vitrina museo con camisetas y memorabilia.\n\nExperiencias adicionales: pantalla LED gigante, experiencia olfativa y ambiente sonoro con ambientacion acustica con parlantes.\n\nEl bano cuenta con interiorismo tematico: vinilo sobre espejo, alfombra de pelota, pelotas reales colgando del techo, tubo fluorescente verde y toallas brandeadas Messi 10.\n\nUbicado en el corazon de Palermo Soho, sobre la calle Borges, a pasos de los mejores restaurantes, bares y tiendas de Buenos Aires.",
      country: Country.ARGENTINA,
      city: City.BUENOS_AIRES,
      location: "Palermo Soho - Borges, Buenos Aires",
      imageUrls: [
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200",
      ],
      priceInfo: "Consultar",
      featured: true,
      published: true,
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
