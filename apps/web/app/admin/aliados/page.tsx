export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteAliadoButton } from "./delete-button";

export default async function AliadosAdminPage() {
  const aliados = await prisma.aliado.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Aliados
        </h1>
        <Link
          href="/admin/aliados/new"
          className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Nuevo Aliado
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
                Rubro
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Logo
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
            {aliados.map((aliado) => (
              <tr key={aliado.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-navy-700">
                  {aliado.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{aliado.tag || "—"}</td>
                <td className="px-6 py-4">
                  {aliado.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={aliado.logoUrl}
                      alt={aliado.name}
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Sin logo</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      aliado.published
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {aliado.published ? "Publicado" : "Oculto"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/aliados/${aliado.id}/edit`}
                      className="text-sm text-navy-600 hover:text-navy-700 font-medium px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteAliadoButton id={aliado.id} name={aliado.name} />
                  </div>
                </td>
              </tr>
            ))}
            {aliados.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  No hay aliados creados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
