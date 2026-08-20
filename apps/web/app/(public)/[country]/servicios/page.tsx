export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  ServiceCarousel,
  type ServiceCarouselItem,
} from "@/components/shared/ServiceCarousel";
import { countryFromSlug, countryLabel, isCountrySlug } from "@/lib/country";
import { getSettings } from "@/lib/settings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const label = isCountrySlug(country) ? countryLabel(country) : "Latinoamerica";
  return {
    title: "Servicios | VA Turismo Deportivo",
    description: `Hospedajes, transporte y concierge: gestionamos cada detalle de tu experiencia deportiva en ${label} y Latinoamerica.`,
  };
}

function truncate(text: string, max = 140) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "...";
}

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountrySlug(country)) notFound();
  const base = `/${country}`;

  const [hospedajes, services, settings] = await Promise.all([
    prisma.hospedaje.findMany({
      where: { published: true, country: countryFromSlug(country) },
      orderBy: { createdAt: "desc" },
    }),
    prisma.serviceItem.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    getSettings(),
  ]);

  const hospedajeItems: ServiceCarouselItem[] = hospedajes.map((h) => ({
    id: h.id,
    title: h.title,
    description: truncate(h.description),
    imageUrl: h.imageUrls[0] ?? "",
    href: `${base}/hospedajes/${h.slug}`,
    badge: h.city ? h.city.replace(/_/g, " ") : undefined,
  }));

  const toCarouselItem = (s: (typeof services)[number]): ServiceCarouselItem => ({
    id: s.id,
    title: s.title,
    description: s.description,
    imageUrl: s.imageUrl,
    badge: s.badge ?? undefined,
  });

  const transporteItems = services
    .filter((s) => s.category === "TRANSPORTE")
    .map(toCarouselItem);
  const conciergeItems = services
    .filter((s) => s.category === "CONCIERGE")
    .map(toCarouselItem);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {settings.servicios_hero_title}
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            {settings.servicios_hero_subtitle}
          </p>
        </div>
      </section>

      {/* Hospedajes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700">
                {settings.servicios_hospedajes_title}
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                {settings.servicios_hospedajes_description}
              </p>
            </div>
            {hospedajeItems.length > 0 && (
              <Link
                href={`${base}/hospedajes`}
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
      {transporteItems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700">
                {settings.servicios_transporte_title}
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                {settings.servicios_transporte_description}
              </p>
            </div>
            <ServiceCarousel items={transporteItems} />
          </div>
        </section>
      )}

      {/* Concierge */}
      {conciergeItems.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700">
                {settings.servicios_concierge_title}
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                {settings.servicios_concierge_description}
              </p>
            </div>
            <ServiceCarousel items={conciergeItems} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            {settings.servicios_cta_title}
          </h2>
          <p className="text-navy-200 mb-8 max-w-2xl mx-auto">
            {settings.servicios_cta_description}
          </p>
          <Link
            href={`${base}/contacto`}
            className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            {settings.servicios_cta_button}
          </Link>
        </div>
      </section>
    </div>
  );
}
