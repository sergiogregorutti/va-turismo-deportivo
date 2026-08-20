/**
 * Seed inicial del contenido administrable (ciudades, hero, aliados,
 * paginas de modalidad, settings) a partir del contenido que estaba
 * hardcodeado en el codigo. Idempotente: upsert por slug/key, y los
 * listados (hero, aliados) solo se crean si la tabla esta vacia.
 *
 * Uso: pnpm exec tsx --env-file=.env scripts/seed-content.ts
 */
import {
  PrismaClient,
  Country,
  Modality,
  Prisma,
} from "@prisma/client";
import { cities } from "./seed-data/cities";
import { services as SERVICES } from "./seed-data/services";

const prisma = new PrismaClient();

const COUNTRY_BY_SLUG: Record<string, Country> = {
  argentina: Country.ARGENTINA,
  venezuela: Country.VENEZUELA,
};

const MODALITY_PAGES = [
  {
    slug: "practicar",
    modality: Modality.PRACTICAR,
    title: "Practicar",
    tagline: "Perfeccionar la tecnica",
    heroDescription:
      "Experiencias disenadas para quienes quieren aprender, mejorar y dominar una disciplina deportiva con la guia de profesionales.",
    description: [
      "Practicar es mucho mas que repetir un movimiento. Es sumergirse en una disciplina deportiva con el objetivo de crecer, mejorar y superar tus propios limites tecnicos. En VA Turismo Deportivo disenamos experiencias que combinan la practica deportiva con destinos increibles, para que cada sesion de entrenamiento sea tambien una aventura.",
      "Nuestras experiencias de practica incluyen acceso a instalaciones de primer nivel, equipamiento profesional y la guia de instructores y coaches con anos de experiencia. Ya sea que estes dando tus primeros pasos en un deporte o que busques perfeccionar tu tecnica, tenemos la experiencia ideal para vos.",
      "Imaginate esquiar en las mejores pistas de Bariloche con un instructor dedicado, hacer buceo en aguas cristalinas con guias certificados, o perfeccionar tu swing de golf en campos de clase mundial. Cada experiencia esta pensada para que progreses mientras disfrutas del viaje.",
    ].join("\n\n"),
    highlights: [
      {
        title: "Instructores profesionales",
        text: "Coaches certificados y con experiencia internacional en cada disciplina",
      },
      {
        title: "Instalaciones de primer nivel",
        text: "Acceso a los mejores centros deportivos y campos de entrenamiento",
      },
      {
        title: "Programas personalizados",
        text: "Planes adaptados a tu nivel, desde principiante hasta avanzado",
      },
      {
        title: "Destinos unicos",
        text: "Practicar tu deporte favorito en los escenarios mas espectaculares",
      },
    ],
    ctaLabel: "Ver experiencias para Practicar",
    whatsappMessage:
      "Hola! Me interesan las experiencias de practica deportiva. Quiero mas informacion.",
    metaDescription:
      "Descubri experiencias deportivas para practicar y perfeccionar tu tecnica con instructores profesionales en destinos increibles.",
  },
  {
    slug: "participar",
    modality: Modality.COMPETIR,
    title: "Participar",
    tagline: "Desafiar los limites",
    heroDescription:
      "Para quienes buscan poner a prueba su preparacion en competencias organizadas, carreras y desafios deportivos alrededor del mundo.",
    description: [
      "Participar es la esencia del espiritu deportivo. Es poner a prueba todo lo que entrenaste, superar tus marcas personales y vivir la adrenalina de medirte con otros atletas. En VA Turismo Deportivo organizamos tu experiencia completa para que solo tengas que concentrarte en dar lo mejor de vos.",
      "Nos encargamos de toda la logistica: inscripcion a la competencia, traslados, alojamiento, y todo lo necesario para que llegues en las mejores condiciones al dia de la carrera o el evento. Ademas, complementamos la experiencia competitiva con actividades turisticas para que conozcas el destino.",
      "Desde maratones en las grandes ciudades hasta travesias de trekking en la Patagonia, pasando por triatlones y carreras de aventura, tenemos opciones para todos los niveles competitivos. Si tu pasion es desafiarte, nosotros te llevamos.",
    ].join("\n\n"),
    highlights: [
      {
        title: "Logistica completa",
        text: "Inscripcion, traslados, alojamiento y todo resuelto para el dia de la competencia",
      },
      {
        title: "Competencias de primer nivel",
        text: "Acceso a las mejores carreras y eventos deportivos de Latinoamerica y el mundo",
      },
      {
        title: "Preparacion integral",
        text: "Asesoramiento sobre entrenamiento previo y condiciones del evento",
      },
      {
        title: "Experiencia completa",
        text: "Combinamos la competencia con turismo y actividades en el destino",
      },
    ],
    ctaLabel: "Ver experiencias para Participar",
    whatsappMessage:
      "Hola! Me interesan las experiencias de competencia deportiva. Quiero mas informacion.",
    metaDescription:
      "Participa en las mejores competencias deportivas con logistica completa. Maratones, triatlones, trekking y mas.",
  },
  {
    slug: "presenciar",
    modality: Modality.PRESENCIAR,
    title: "Presenciar",
    tagline: "Vivir la pasion",
    heroDescription:
      "Vivi la emocion de los grandes eventos deportivos como espectador VIP, con acceso exclusivo y experiencias premium.",
    description: [
      "Presenciar un evento deportivo en vivo es una experiencia que no se compara con nada. La energia del estadio, la pasion de la hinchada, y la emocion de ver a los mejores atletas del mundo en accion. En VA Turismo Deportivo te acercamos a esos momentos inolvidables con experiencias premium.",
      "Ofrecemos acceso VIP a los eventos deportivos mas importantes: desde partidos de futbol en los estadios mas emblematicos, hasta jornadas de polo en Palermo y torneos de tenis de nivel internacional. Cada experiencia incluye entradas premium, hospitality, y servicios exclusivos.",
      "No se trata solo de ver un partido o un evento. Se trata de vivir la experiencia completa: conocer los bastidores, disfrutar de la gastronomia local, compartir con otros apasionados del deporte y llevarte recuerdos que duran toda la vida.",
    ].join("\n\n"),
    highlights: [
      {
        title: "Acceso VIP y premium",
        text: "Entradas preferenciales, palcos y experiencias exclusivas en cada evento",
      },
      {
        title: "Hospitality de primer nivel",
        text: "Gastronomia, bebidas y atencion personalizada durante el evento",
      },
      {
        title: "Eventos de clase mundial",
        text: "Futbol, polo, tenis y mas en los escenarios mas importantes",
      },
      {
        title: "Experiencia integral",
        text: "Combinamos el evento con turismo, gastronomia y cultura del destino",
      },
    ],
    ctaLabel: "Ver experiencias para Presenciar",
    whatsappMessage:
      "Hola! Me interesan las experiencias para presenciar eventos deportivos. Quiero mas informacion.",
    metaDescription:
      "Vivi los mejores eventos deportivos con acceso VIP. Futbol, polo, tenis y mas con experiencias premium.",
  },
];

const SETTINGS: Record<string, string> = {
  whatsapp_number: "5411153774567",
  whatsapp_display: "+54 11 5377-4567",
  contact_email: "contacto@vaturismodeportivo.com",
  va_intro:
    "Somos una plataforma de experiencias deportivas y de viaje que conecta personas, familias, equipos y empresas con las mejores propuestas para vivir el deporte en Argentina, Venezuela y Latinoamerica. Disenamos y articulamos viajes a medida para practicar, participar o presenciar el deporte desde una mirada segura, premium y local: entrenamientos, competencias, eventos, hospitality, alojamiento, transporte y concierge. Nuestro proposito es transformar cada destino en una experiencia deportiva integral, combinando deporte, cultura, naturaleza y estilo de vida.",
  enabled_countries: "argentina",
  social_instagram: "",
  social_linkedin: "",
  social_website: "",
  servicios_hero_title: "Servicios",
  servicios_hero_subtitle:
    "Hospedajes, transporte y concierge para vivir cada destino al maximo",
  servicios_hospedajes_title: "Hospedajes",
  servicios_hospedajes_description:
    "Alojamientos tematicos y propiedades unicas seleccionadas para viajeros, familias y equipos deportivos.",
  servicios_transporte_title: "Transporte",
  servicios_transporte_description:
    "Solucionamos cada tramo del viaje por aire, tierra y mar: Aereo (avion comercial, privado, helicoptero), Terrestre (autobuses, vans, autos, alquiler) y Maritimo (veleros).",
  servicios_concierge_title: "Concierge",
  servicios_concierge_description:
    "Gestionamos accesos, reservas y experiencias en destino para que cada viaje fluya sin friccion.",
  servicios_cta_title: "Armemos tu proximo viaje",
  servicios_cta_description:
    "Contanos a donde queres ir y que querer vivir. Disenamos una propuesta a medida con todos los servicios incluidos.",
  servicios_cta_button: "Consulta tu viaje",
  va_nosotros:
    "VA Turismo Deportivo nace de la vision de su fundador, Luis Miguel Colmenares, emprendedor, empresario y especialista en negocios deportivos en Latinoamerica, con mas de 15 anos de experiencia desarrollando proyectos, eventos y plataformas vinculadas al deporte, la gestion y el entretenimiento. A lo largo de su trayectoria ha impulsado iniciativas en Argentina, Venezuela, Colombia, entre otros, combinando una mirada estrategica del deporte como industria con una profunda pasion por conectar personas, destinos y experiencias. Desde esa vision, VA fue creada como una plataforma curadora de turismo deportivo, pensada para acercar a viajeros, familias, equipos, empresas y fanaticos a las mejores experiencias deportivas de la region, con seguridad, criterio local y una ejecucion profesional.",
};

const HERO_IMAGES = [1, 2, 3, 4, 5, 6].map((n) => `/images/home_hero/${n}.jpg`);

const ALIADOS = [
  { name: "Sport Premium", tag: "Equipamiento" },
  { name: "Andes Club", tag: "Hospedaje" },
  { name: "Patagonia Travel", tag: "Tour Operator" },
  { name: "BA Sports", tag: "Eventos" },
  { name: "Latam Hotels", tag: "Hospedaje" },
  { name: "Aereo Elite", tag: "Transporte" },
  { name: "Events Pro", tag: "Hospitality" },
  { name: "Concierge Plus", tag: "Servicios" },
];

async function main() {
  // Ciudades
  for (const [index, city] of cities.entries()) {
    const data = {
      name: city.name,
      province: city.province,
      country: COUNTRY_BY_SLUG[city.countrySlug],
      imageUrl: city.image,
      tagline: city.tagline,
      intro: city.intro,
      about: city.about,
      climate: city.climate,
      bestSeasons: city.bestSeasons,
      sports: city.sports,
      highlights: city.highlights as unknown as Prisma.InputJsonValue,
      gettingThere: city.gettingThere,
      order: index,
    };
    await prisma.cityPage.upsert({
      where: { slug: city.slug },
      create: { slug: city.slug, ...data },
      update: data,
    });
  }
  console.log(`✔ ${cities.length} ciudades`);

  // Paginas de modalidad
  for (const page of MODALITY_PAGES) {
    const { slug, ...data } = page;
    await prisma.modalityPage.upsert({
      where: { slug },
      create: { slug, ...data },
      update: data,
    });
  }
  console.log(`✔ ${MODALITY_PAGES.length} paginas de modalidad`);

  // Settings
  for (const [key, value] of Object.entries(SETTINGS)) {
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: {}, // no pisar valores ya editados desde el admin
    });
  }
  console.log(`✔ ${Object.keys(SETTINGS).length} settings`);

  // Hero slides (solo si esta vacio)
  const slideCount = await prisma.heroSlide.count();
  if (slideCount === 0) {
    await prisma.heroSlide.createMany({
      data: [Country.ARGENTINA, Country.VENEZUELA].flatMap((country) =>
        HERO_IMAGES.map((imageUrl, order) => ({ country, imageUrl, order }))
      ),
    });
    console.log(`✔ ${HERO_IMAGES.length * 2} hero slides`);
  } else {
    console.log(`- hero slides ya existentes (${slideCount}), no se tocan`);
  }

  // Servicios (solo si esta vacio)
  const serviceCount = await prisma.serviceItem.count();
  if (serviceCount === 0) {
    await prisma.serviceItem.createMany({
      data: SERVICES.map((s, index) => ({ ...s, order: index })),
    });
    console.log(`✔ ${SERVICES.length} servicios`);
  } else {
    console.log(`- servicios ya existentes (${serviceCount}), no se tocan`);
  }

  // Aliados (solo si esta vacio)
  const aliadoCount = await prisma.aliado.count();
  if (aliadoCount === 0) {
    await prisma.aliado.createMany({
      data: ALIADOS.map((a, order) => ({ ...a, order })),
    });
    console.log(`✔ ${ALIADOS.length} aliados`);
  } else {
    console.log(`- aliados ya existentes (${aliadoCount}), no se tocan`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
