export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteCityButton } from "./delete-button";

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

export default async function CiudadesAdminPage() {
  const cities = await prisma.cityPage.findMany({
    orderBy: [{ country: "asc" }, { order: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Ciudades
        </h1>
        <Link
          href="/admin/ciudades/new"
          className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Nueva Ciudad
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
                Pais
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Orden
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
            {cities.map((city) => (
              <tr key={city.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-navy-700">
                  {city.name}
                  <span className="block text-xs text-gray-400 font-normal">
                    {city.province}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {countryLabels[city.country]}
                </td>
                <td className="px-6 py-4 text-gray-600">{city.order}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      city.published
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {city.published ? "Publicada" : "Borrador"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/ciudades/${city.id}/edit`}
                      className="text-sm text-navy-600 hover:text-navy-700 font-medium px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteCityButton id={city.id} name={city.name} />
                  </div>
                </td>
              </tr>
            ))}
            {cities.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  No hay ciudades creadas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
