export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteHospedajeButton } from "./delete-button";

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

export default async function HospedajesPage() {
  const hospedajes = await prisma.hospedaje.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Hospedajes
        </h1>
        <Link
          href="/admin/hospedajes/new"
          className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Nuevo Hospedaje
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
                  Estado
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hospedajes.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-navy-700">{h.title}</p>
                      <p className="text-sm text-gray-400">{h.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {countryLabels[h.country]}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          h.published
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {h.published ? "Publicado" : "Borrador"}
                      </span>
                      {h.featured && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-gold-50 text-gold-600 font-medium">
                          Destacado
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/hospedajes/${h.id}/edit`}
                        className="text-sm text-navy-600 hover:text-navy-700 font-medium px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
                      >
                        Editar
                      </Link>
                      <DeleteHospedajeButton id={h.id} title={h.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {hospedajes.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No hay hospedajes creados
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
