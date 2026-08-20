import { ServiceCategory } from "@prisma/client";

// Items de Transporte y Concierge que antes estaban hardcodeados en
// app/(public)/[country]/servicios/page.tsx
export const services: {
  category: ServiceCategory;
  title: string;
  description: string;
  imageUrl: string;
  badge?: string;
}[] = [
  {
    category: ServiceCategory.TRANSPORTE,
    title: "Avion Comercial",
    description:
      "Vuelos comerciales con tarifas optimizadas y conexiones a los principales destinos deportivos de la region.",
    imageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    badge: "Aereo",
  },
  {
    category: ServiceCategory.TRANSPORTE,
    title: "Avion Privado",
    description:
      "Charters privados a medida para equipos, delegaciones y grupos que requieren maxima flexibilidad y privacidad.",
    imageUrl:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200",
    badge: "Aereo",
  },
  {
    category: ServiceCategory.TRANSPORTE,
    title: "Helicoptero",
    description:
      "Traslados rapidos a destinos remotos, sobrevuelos panoramicos y conexion eficiente entre ciudades y estancias.",
    imageUrl:
      "https://images.unsplash.com/photo-1608236415053-3691791bbffe?w=1200",
    badge: "Aereo",
  },
  {
    category: ServiceCategory.TRANSPORTE,
    title: "Autobuses y Vans",
    description:
      "Flota de autobuses y vans para grupos deportivos, con conductores profesionales y rutas adaptadas a cada agenda.",
    imageUrl:
      "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=1200",
    badge: "Terrestre",
  },
  {
    category: ServiceCategory.TRANSPORTE,
    title: "Autos y Alquiler",
    description:
      "Autos con conductor o alquiler con o sin chofer, desde city cars hasta SUVs premium para cada ocasion.",
    imageUrl:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200",
    badge: "Terrestre",
  },
  {
    category: ServiceCategory.TRANSPORTE,
    title: "Veleros",
    description:
      "Charters maritimos para travesias, regatas y experiencias unicas en costas argentinas y caribenas.",
    imageUrl:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200",
    badge: "Maritimo",
  },
  {
    category: ServiceCategory.CONCIERGE,
    title: "Gestion de accesos y reservas",
    description:
      "Coordinacion de tickets, hospitality, eventos deportivos, restaurantes, clubes y experiencias exclusivas en destino.",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200",
  },
  {
    category: ServiceCategory.CONCIERGE,
    title: "Curaduria de experiencias locales",
    description:
      "Seleccion de planes deportivos, gastronomicos, culturales y sociales alineados al perfil del viajero o del grupo.",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
  },
  {
    category: ServiceCategory.CONCIERGE,
    title: "Acompanamiento personalizado",
    description:
      "Asistencia antes y durante el viaje para resolver necesidades operativas, cambios, recomendaciones y coordinacion de agenda.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
  },
  {
    category: ServiceCategory.CONCIERGE,
    title: "Conexion con actores clave del destino",
    description:
      "Acceso a proveedores, clubes, entrenadores, instituciones, espacios deportivos y contactos locales de confianza.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200",
  },
];
