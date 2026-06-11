import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { HospedajeCard } from "@/components/shared/HospedajeCard";
import { countryFromSlug, countryLabel, isCountrySlug } from "@/lib/country";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  if (!isCountrySlug(country)) return { title: "Hospedaje" };
  return {
    title: "Hospedaje",
    description: `Descubri los mejores hospedajes tematicos deportivos en ${countryLabel(country)}`,
  };
}

export default async function HospedajesPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountrySlug(country)) notFound();

  const hospedajes = await prisma.hospedaje.findMany({
    where: { published: true, country: countryFromSlug(country) },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Hospedaje
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Hospedajes tematicos deportivos para vivir una experiencia unica
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {hospedajes.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-6">
                {hospedajes.length} hospedaje
                {hospedajes.length !== 1 ? "s" : ""} disponible
                {hospedajes.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hospedajes.map((h) => (
                  <HospedajeCard key={h.id} hospedaje={h} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🏨</p>
              <h3 className="font-heading text-2xl font-semibold text-navy-700 mb-2">
                Proximamente
              </h3>
              <p className="text-gray-500 mb-6">
                Estamos preparando los mejores hospedajes deportivos para vos
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
