export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteDisciplineButton } from "./delete-button";

export default async function DisciplinesPage() {
  const disciplines = await prisma.discipline.findMany({
    include: { _count: { select: { experiences: true } } },
    orderBy: { name: "asc" },
  });

  const modalityLabels: Record<string, string> = {
    PRACTICAR: "Practicar",
    COMPETIR: "Participar",
    PRESENCIAR: "Presenciar",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Disciplinas
        </h1>
        <Link
          href="/admin/disciplines/new"
          className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Nueva Disciplina
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Nombre
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Modalidades
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Experiencias
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {disciplines.map((discipline) => (
              <tr key={discipline.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-navy-700">
                  {discipline.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    {discipline.modalities.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2.5 py-1 rounded-full bg-navy-50 text-navy-600 font-medium"
                      >
                        {modalityLabels[m]}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {discipline._count.experiences}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/disciplines/${discipline.id}/edit`}
                      className="text-sm text-navy-600 hover:text-navy-700 font-medium px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteDisciplineButton
                      id={discipline.id}
                      name={discipline.name}
                      hasExperiences={discipline._count.experiences > 0}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {disciplines.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                  No hay disciplinas creadas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
