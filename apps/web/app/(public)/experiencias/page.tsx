import { prisma } from "@/lib/prisma";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { Country, Modality, Prisma } from "@prisma/client";
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

export default async function ExperienciasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const country = params.country as Country | undefined;
  const modality = params.modality as Modality | undefined;
  const discipline = params.discipline;

  const where: Prisma.ExperienceWhereInput = { published: true };
  if (country) where.country = country;
  if (modality) where.modality = modality;
  if (discipline) where.discipline = { slug: discipline };

  const [experiences, disciplines] = await Promise.all([
    prisma.experience.findMany({
      where,
      include: { discipline: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.discipline.findMany({ orderBy: { name: "asc" } }),
  ]);

  const activeFilters = [
    country && countryLabels[country],
    modality && modalityLabels[modality],
    discipline && disciplines.find((d) => d.slug === discipline)?.name,
  ].filter(Boolean);

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
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <form action="/experiencias" method="GET">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Pais
                </label>
                <select
                  name="country"
                  defaultValue={country || ""}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                >
                  <option value="">Todos</option>
                  <option value="ARGENTINA">Argentina</option>
                  <option value="VENEZUELA">Venezuela</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Modalidad
                </label>
                <select
                  name="modality"
                  defaultValue={modality || ""}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                >
                  <option value="">Todas</option>
                  <option value="PRACTICAR">Practicar</option>
                  <option value="COMPETIR">Competir</option>
                  <option value="PRESENCIAR">Presenciar</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Disciplina
                </label>
                <select
                  name="discipline"
                  defaultValue={discipline || ""}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                >
                  <option value="">Todas</option>
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Filtrar
                </button>
                {activeFilters.length > 0 && (
                  <a
                    href="/experiencias"
                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Limpiar
                  </a>
                )}
              </div>
            </div>
          </form>

          {activeFilters.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="text-xs px-3 py-1.5 rounded-full bg-navy-50 text-navy-600 font-medium"
                >
                  {filter}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

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
                className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-3 rounded-lg transition-colors"
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
