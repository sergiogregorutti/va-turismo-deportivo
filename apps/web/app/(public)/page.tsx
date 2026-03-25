export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { ExperienceCard } from "@/components/shared/ExperienceCard";

const triada = [
  {
    title: "Practicar",
    description: "Perfeccionar la tecnica",
    sports: "Esqui | Buceo | Surf | Kite | Golf",
    modality: "PRACTICAR",
    gradient: "from-blue-900/80 to-blue-700/60",
  },
  {
    title: "Competir",
    description: "Desafiar los limites",
    sports: "Maraton | Triatlon | Trekking",
    modality: "COMPETIR",
    gradient: "from-amber-900/80 to-amber-700/60",
  },
  {
    title: "Presenciar",
    description: "Vivir la pasion",
    sports: "Futbol | Polo | Tenis",
    modality: "PRESENCIAR",
    gradient: "from-green-900/80 to-green-700/60",
  },
];

export default async function HomePage() {
  const featuredExperiences = await prisma.experience.findMany({
    where: { published: true, featured: true },
    include: { discipline: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const disciplines = await prisma.discipline.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-700/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">
          <Image
            src="/images/va_isotipo.svg"
            alt="VA"
            width={100}
            height={100}
            className="invert mx-auto mb-8"
            priority
          />
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4">
            VA Turismo Deportivo
          </h1>
          <p className="text-xl md:text-2xl text-navy-200 max-w-2xl mx-auto mb-10">
            Experiencias de turismo deportivo de elite en Argentina y Venezuela
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/experiencias?country=ARGENTINA"
              className="bg-white text-navy-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Argentina
            </Link>
            <Link
              href="/experiencias?country=VENEZUELA"
              className="bg-gold-400 text-navy-900 hover:bg-gold-500 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Venezuela
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <form action="/experiencias" method="GET">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Destino
                </label>
                <select
                  name="country"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option value="">Todos los paises</option>
                  <option value="ARGENTINA">Argentina</option>
                  <option value="VENEZUELA">Venezuela</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Modalidad
                </label>
                <select
                  name="modality"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option value="">Todas</option>
                  <option value="PRACTICAR">Practicar</option>
                  <option value="COMPETIR">Competir</option>
                  <option value="PRESENCIAR">Presenciar</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Disciplina
                </label>
                <select
                  name="discipline"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option value="">Todas</option>
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* La Triada */}
      <section className="bg-navy-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white text-center mb-4">
            La Triada de Experiencias
          </h2>
          <p className="text-navy-300 text-center mb-12 max-w-2xl mx-auto">
            Tres formas de vivir el deporte. Elegí la tuya.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {triada.map((item) => (
              <Link
                key={item.title}
                href={`/experiencias?modality=${item.modality}`}
                className="group relative bg-navy-700 rounded-2xl overflow-hidden border border-navy-600/30 hover:border-gold-400/50 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative p-8 text-center">
                  <h3 className="font-heading text-3xl font-bold text-white mb-2 uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-gold-400 font-medium mb-6">
                    {item.description}
                  </p>
                  <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-6" />
                  <p className="text-navy-300 text-sm">{item.sports}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      {featuredExperiences.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-700 text-center mb-4">
              Experiencias Destacadas
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Descubri las mejores experiencias de turismo deportivo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/experiencias"
                className="inline-block bg-navy-700 hover:bg-navy-800 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Ver todas las experiencias
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      <section className="bg-navy-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Listo para tu proxima aventura?
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            Consultanos por WhatsApp y armamos tu experiencia deportiva a
            medida
          </p>
          <a
            href={getWhatsAppUrl(
              WHATSAPP_NUMBER,
              "Hola! Quiero mas informacion sobre experiencias de turismo deportivo"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultanos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
