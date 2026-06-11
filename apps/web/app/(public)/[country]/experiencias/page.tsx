import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { ExperienciasFilterBar } from "@/components/shared/ExperienciasFilterBar";
import { City, Modality, Formato, Prisma } from "@prisma/client";
import { countryFromSlug, countryLabel, isCountrySlug } from "@/lib/country";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  if (!isCountrySlug(country)) return { title: "Experiencias" };
  return {
    title: "Experiencias",
    description: `Descubri las mejores experiencias de turismo deportivo en ${countryLabel(country)}`,
  };
}

export default async function ExperienciasPage({
  params,
  searchParams,
}: {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { country: countrySlug } = await params;
  if (!isCountrySlug(countrySlug)) notFound();
  const siteCountry = countryFromSlug(countrySlug);

  const filterParams = await searchParams;
  const modality = filterParams.modality as Modality | undefined;
  const discipline = filterParams.discipline;
  const formato = filterParams.formato as Formato | undefined;
  const destino = filterParams.destino;
  const month = filterParams.month;

  // The site country always applies; "destino" can only narrow down to a city
  const where: Prisma.ExperienceWhereInput = {
    published: true,
    country: siteCountry,
  };

  if (destino && destino.includes(":")) {
    const [, cityPart] = destino.split(":");
    where.city = cityPart as City;
  }

  if (modality) where.modality = modality;
  if (discipline) where.discipline = { slug: discipline };
  if (formato) where.formato = formato;
  if (month) {
    const m = parseInt(month);
    const year = new Date().getFullYear();
    where.startDate = { gte: new Date(year, m - 1, 1), lt: new Date(year, m, 1) };
  }

  const experiences = await prisma.experience.findMany({
    where,
    include: { discipline: true },
    orderBy: { createdAt: "desc" },
  });

  // Pass initial filter values from URL to the client component
  const initialDestino = destino;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Experiencias
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Encontra tu proxima aventura deportiva en{" "}
            {countryLabel(countrySlug)}
          </p>
        </div>
      </section>

      {/* Filters */}
      <ExperienciasFilterBar
        country={countrySlug}
        initialDestino={initialDestino}
        initialFormato={formato}
        initialModality={modality}
        initialDiscipline={discipline}
        initialMonth={month}
      />

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {experiences.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-6">
                {experiences.length} experiencia
                {experiences.length !== 1 ? "s" : ""} encontrada
                {experiences.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experiences.map((exp) => (
                  <ExperienceCard key={exp.id} experience={exp} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🏔</p>
              <h3 className="font-heading text-2xl font-semibold text-navy-700 mb-2">
                No encontramos experiencias
              </h3>
              <p className="text-gray-500 mb-6">
                Proba con otros filtros o explora todas las experiencias
              </p>
              <a
                href={`/${countrySlug}/experiencias`}
                className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
              >
                Ver todas
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
