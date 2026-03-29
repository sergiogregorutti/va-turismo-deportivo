import { prisma } from "@/lib/prisma";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { ExperienciasFilterBar } from "@/components/shared/ExperienciasFilterBar";
import { Country, Modality, City, Formato, Prisma } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Descubri las mejores experiencias de turismo deportivo en Argentina y Venezuela",
};

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

const modalityLabels: Record<string, string> = {
  PRACTICAR: "Practicar",
  COMPETIR: "Competir",
  PRESENCIAR: "Presenciar",
};

const cityLabels: Record<string, string> = {
  BUENOS_AIRES: "Buenos Aires",
  BARILOCHE: "Bariloche",
  CORDOBA: "Córdoba",
  LOS_ROQUES: "Los Roques",
  MARGARITA: "Margarita",
  LA_GRAN_SABANA: "La Gran Sabana",
};

const formatoLabels: Record<string, string> = {
  SOLO: "Solo",
  PAREJA: "Pareja",
  FAMILIA: "Familia",
  AMIGOS: "Amigos",
  EQUIPO_DEPORTIVO: "Equipo Deportivo",
  CORPORATIVO: "Corporativo",
};

export default async function ExperienciasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const country = params.country as Country | undefined;
  const modality = params.modality as Modality | undefined;
  const discipline = params.discipline;
  const formato = params.formato as Formato | undefined;
  const destino = params.destino;

  const where: Prisma.ExperienceWhereInput = { published: true };

  // Handle destino param (can be "COUNTRY" or "COUNTRY:CITY")
  if (destino) {
    if (destino.includes(":")) {
      const [countryPart, cityPart] = destino.split(":");
      where.country = countryPart as Country;
      where.city = cityPart as City;
    } else {
      where.country = destino as Country;
    }
  } else if (country) {
    where.country = country;
  }

  if (modality) where.modality = modality;
  if (discipline) where.discipline = { slug: discipline };
  if (formato) where.formato = formato;

  const [experiences, disciplines] = await Promise.all([
    prisma.experience.findMany({
      where,
      include: { discipline: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.discipline.findMany({ orderBy: { name: "asc" } }),
  ]);

  const activeFilters: string[] = [];
  if (destino) {
    activeFilters.push(
      destino.includes(":")
        ? cityLabels[destino.split(":")[1]]
        : countryLabels[destino]
    );
  } else if (country) {
    activeFilters.push(countryLabels[country]);
  }
  if (formato) activeFilters.push(formatoLabels[formato]);
  if (modality) activeFilters.push(modalityLabels[modality]);
  if (discipline) {
    const d = disciplines.find((d) => d.slug === discipline);
    if (d) activeFilters.push(d.name);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Experiencias
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Encontra tu proxima aventura deportiva en Argentina y Venezuela
          </p>
        </div>
      </section>

      {/* Filters */}
      <ExperienciasFilterBar
        disciplines={disciplines}
        currentDestino={destino}
        currentCountry={country}
        currentFormato={formato}
        currentModality={modality}
        currentDiscipline={discipline}
        activeFilters={activeFilters}
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
                href="/experiencias"
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
