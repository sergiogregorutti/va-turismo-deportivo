export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getWhatsAppUrl } from "@/lib/utils";
import { getSettings } from "@/lib/settings";
import { countryLabel, isCountrySlug, slugFromCountry } from "@/lib/country";

type CityHighlight = { title: string; description: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = await prisma.cityPage.findUnique({ where: { slug } });
  if (!city) return { title: "Ciudad no encontrada" };
  return {
    title: `${city.name} | VA Turismo Deportivo`,
    description: city.tagline,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await params;
  if (!isCountrySlug(country)) notFound();

  const city = await prisma.cityPage.findUnique({ where: { slug } });
  if (!city || !city.published) notFound();

  // If the URL country does not match the city, send to the correct URL
  const ownCountry = slugFromCountry(city.country);
  if (ownCountry !== country) {
    redirect(`/${ownCountry}/ciudades/${city.slug}`);
  }

  const [otherCities, settings] = await Promise.all([
    prisma.cityPage.findMany({
      where: {
        country: city.country,
        published: true,
        id: { not: city.id },
      },
      orderBy: { order: "asc" },
    }),
    getSettings(),
  ]);

  const highlights = (city.highlights as unknown as CityHighlight[]) || [];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] w-full">
        <Image
          src={city.imageUrl}
          alt={city.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/40 to-navy-900/20" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-12">
            <Link
              href={`/${country}/ciudades`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Ver todas las ciudades
            </Link>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-2">
              {city.province}, {countryLabel(country)}
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white uppercase tracking-wider">
              {city.name}
            </h1>
            <p className="text-white/90 text-lg md:text-xl mt-4 max-w-3xl">
              {city.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {city.intro}
          </p>
        </div>
      </section>

      {/* Sports */}
      {city.sports.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-2xl font-bold text-navy-700 text-center mb-6">
              Deportes y actividades
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {city.sports.map((sport) => (
                <span
                  key={sport}
                  className="bg-white border border-gray-200 text-navy-700 font-medium px-5 py-2.5 rounded-full shadow-sm"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700 mb-6">
            Sobre {city.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{city.about}</p>
        </div>
      </section>

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="py-16 bg-navy-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Imperdibles deportivos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="bg-navy-800 rounded-xl p-6 border border-navy-600/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold-400 text-navy-900 font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white mb-2">
                        {h.title}
                      </h3>
                      <p className="text-navy-200 leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Practical info */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-lg font-bold text-navy-700 mb-3 uppercase tracking-wider">
                Clima
              </h3>
              <p className="text-gray-600 leading-relaxed">{city.climate}</p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-navy-700 mb-3 uppercase tracking-wider">
                Mejor época
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {city.bestSeasons.join(" · ")}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-navy-700 mb-3 uppercase tracking-wider">
                Cómo llegar
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {city.gettingThere}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-gold-400 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Armamos tu experiencia en {city.name}
          </h2>
          <p className="text-navy-800 text-lg mb-8 max-w-2xl mx-auto">
            Contanos qué querés vivir y preparamos un plan a medida
          </p>
          <a
            href={getWhatsAppUrl(
              settings.whatsapp_number,
              `Hola! Quiero mas informacion sobre experiencias deportivas en ${city.name}`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-navy-700 hover:bg-navy-800 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors"
          >
            Consultanos por WhatsApp
          </a>
        </div>
      </section>

      {/* Other cities */}
      {otherCities.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-700 text-center mb-10">
              Otras ciudades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${country}/ciudades/${c.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={c.imageUrl}
                      alt={c.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
                        {c.name}
                      </h3>
                      <p className="text-white/80 text-xs mt-1">{c.province}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
