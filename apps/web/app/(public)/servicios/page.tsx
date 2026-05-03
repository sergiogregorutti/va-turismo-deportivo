export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  ServiceCarousel,
  type ServiceCarouselItem,
} from "@/components/shared/ServiceCarousel";

export const metadata: Metadata = {
  title: "Servicios | VA Turismo Deportivo",
  description:
    "Hospedajes, transporte y concierge: gestionamos cada detalle de tu experiencia deportiva en Argentina, Venezuela y Latinoamerica.",
};

const TRANSPORTE: ServiceCarouselItem[] = [
  {
    title: "Avion Comercial",
    description:
      "Vuelos comerciales con tarifas optimizadas y conexiones a los principales destinos deportivos de la region.",
    imageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    badge: "Aereo",
  },
  {
    title: "Avion Privado",
    description:
      "Charters privados a medida para equipos, delegaciones y grupos que requieren maxima flexibilidad y privacidad.",
    imageUrl:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200",
    badge: "Aereo",
  },
  {
    title: "Helicoptero",
    description:
      "Traslados rapidos a destinos remotos, sobrevuelos panoramicos y conexion eficiente entre ciudades y estancias.",
    imageUrl:
      "https://images.unsplash.com/photo-1608236415053-3691791bbffe?w=1200",
    badge: "Aereo",
  },
  {
    title: "Autobuses y Vans",
    description:
      "Flota de autobuses y vans para grupos deportivos, con conductores profesionales y rutas adaptadas a cada agenda.",
    imageUrl:
      "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=1200",
    badge: "Terrestre",
  },
  {
    title: "Autos y Alquiler",
    description:
      "Autos con conductor o alquiler con o sin chofer, desde city cars hasta SUVs premium para cada ocasion.",
    imageUrl:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200",
    badge: "Terrestre",
  },
  {
    title: "Veleros",
    description:
      "Charters maritimos para travesias, regatas y experiencias unicas en costas argentinas y caribenas.",
    imageUrl:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200",
    badge: "Maritimo",
  },
];

const CONCIERGE: ServiceCarouselItem[] = [
  {
    title: "Gestion de accesos y reservas",
    description:
      "Coordinacion de tickets, hospitality, eventos deportivos, restaurantes, clubes y experiencias exclusivas en destino.",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200",
  },
  {
    title: "Curaduria de experiencias locales",
    description:
      "Seleccion de planes deportivos, gastronomicos, culturales y sociales alineados al perfil del viajero o del grupo.",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
  },
  {
    title: "Acompanamiento personalizado",
    description:
      "Asistencia antes y durante el viaje para resolver necesidades operativas, cambios, recomendaciones y coordinacion de agenda.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
  },
  {
    title: "Conexion con actores clave del destino",
    description:
      "Acceso a proveedores, clubes, entrenadores, instituciones, espacios deportivos y contactos locales de confianza.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200",
  },
];

function truncate(text: string, max = 140) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "...";
}

export default async function ServiciosPage() {
  const hospedajes = await prisma.hospedaje.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const hospedajeItems: ServiceCarouselItem[] = hospedajes.map((h) => ({
    title: h.title,
    description: truncate(h.description),
    imageUrl: h.imageUrls[0] ?? "",
    href: `/hospedajes/${h.slug}`,
    badge: h.city ? h.city.replace(/_/g, " ") : undefined,
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Servicios
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Hospedajes, transporte y concierge para vivir cada destino al
            maximo
          </p>
        </div>
      </section>

      {/* Hospedajes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700">
                Hospedajes
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Alojamientos tematicos y propiedades unicas seleccionadas para
                viajeros, familias y equipos deportivos.
              </p>
            </div>
            {hospedajeItems.length > 0 && (
              <Link
                href="/hospedajes"
                className="hidden sm:inline-block text-sm font-semibold text-navy-700 hover:text-gold-500 transition-colors"
              >
                Ver todos →
              </Link>
            )}
          </div>

          {hospedajeItems.length > 0 ? (
            <ServiceCarousel items={hospedajeItems} />
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500">
                Estamos sumando nuevos hospedajes. Volve pronto.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Transporte */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700">
              Transporte
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Solucionamos cada tramo del viaje por aire, tierra y mar:
              <strong> Aereo</strong> (avion comercial, privado, helicoptero),{" "}
              <strong>Terrestre</strong> (autobuses, vans, autos, alquiler) y{" "}
              <strong>Maritimo</strong> (veleros).
            </p>
          </div>
          <ServiceCarousel items={TRANSPORTE} />
        </div>
      </section>

      {/* Concierge */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700">
              Concierge
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Gestionamos accesos, reservas y experiencias en destino para que
              cada viaje fluya sin friccion.
            </p>
          </div>
          <ServiceCarousel items={CONCIERGE} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Armemos tu proximo viaje
          </h2>
          <p className="text-navy-200 mb-8 max-w-2xl mx-auto">
            Contanos a donde queres ir y que querer vivir. Disenamos una
            propuesta a medida con todos los servicios incluidos.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Consulta tu viaje
          </Link>
        </div>
      </section>
    </div>
  );
}
