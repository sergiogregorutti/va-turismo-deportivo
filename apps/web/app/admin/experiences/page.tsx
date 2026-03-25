export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteExperienceButton } from "./delete-button";

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

const modalityLabels: Record<string, string> = {
  PRACTICAR: "Practicar",
  COMPETIR: "Competir",
  PRESENCIAR: "Presenciar",
};

export default async function ExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    include: { discipline: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Experiencias
        </h1>
        <Link
          href="/admin/experiences/new"
          className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Nueva Experiencia
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Titulo
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Pais
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Modalidad
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Disciplina
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Estado
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {experiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-navy-700">{exp.title}</p>
                      <p className="text-sm text-gray-400">{exp.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {countryLabels[exp.country]}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-navy-50 text-navy-600 font-medium">
                      {modalityLabels[exp.modality]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {exp.discipline.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          exp.published
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {exp.published ? "Publicada" : "Borrador"}
                      </span>
                      {exp.featured && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-gold-50 text-gold-600 font-medium">
                          Destacada
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/experiences/${exp.id}/edit`}
                        className="text-sm text-navy-600 hover:text-navy-700 font-medium px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
                      >
                        Editar
                      </Link>
                      <DeleteExperienceButton id={exp.id} title={exp.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {experiences.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No hay experiencias creadas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
