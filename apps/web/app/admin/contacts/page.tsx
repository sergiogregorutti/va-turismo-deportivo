export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function ContactsPage() {
  const contacts = await prisma.contactLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Contactos
        </h1>
        <span className="text-sm text-gray-500">
          {contacts.length} consulta{contacts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Nombre
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Ciudad / Pais
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Servicios
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Fecha
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Recibido
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-700">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {contact.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {contact.cityCountry || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {contact.services || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {contact.date || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {formatDate(contact.createdAt)}
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No hay consultas recibidas
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
