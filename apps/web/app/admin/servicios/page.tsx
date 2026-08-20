export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteServiceButton } from "./delete-button";

const CATEGORY_LABELS: Record<string, string> = {
  TRANSPORTE: "Transporte",
  CONCIERGE: "Concierge",
};

export default async function ServiciosAdminPage() {
  const services = await prisma.serviceItem.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-navy-700">
            Servicios
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Items de Transporte y Concierge de la pagina Servicios
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/servicios/contenidos"
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors"
          >
            Editar textos
          </Link>
          <Link
            href="/admin/servicios/new"
            className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Nuevo Servicio
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Imagen
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Titulo
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Categoria
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Etiqueta
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
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="h-12 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-navy-700">
                  {service.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {CATEGORY_LABELS[service.category] || service.category}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {service.badge || "—"}
                </td>
                <td className="px-6 py-4 text-gray-600">{service.order}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      service.published
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {service.published ? "Publicado" : "Oculto"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/servicios/${service.id}/edit`}
                      className="text-sm text-navy-600 hover:text-navy-700 font-medium px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteServiceButton
                      id={service.id}
                      title={service.title}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  No hay servicios creados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Los hospedajes que se muestran en la pagina Servicios se administran
        desde{" "}
        <Link
          href="/admin/hospedajes"
          className="text-navy-600 hover:text-navy-700 font-medium"
        >
          Hospedajes
        </Link>
        .
      </p>
    </div>
  );
}
