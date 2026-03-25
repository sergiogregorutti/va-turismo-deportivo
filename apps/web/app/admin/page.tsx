export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    totalExperiences,
    publishedExperiences,
    featuredExperiences,
    totalDisciplines,
    totalContacts,
  ] = await Promise.all([
    prisma.experience.count(),
    prisma.experience.count({ where: { published: true } }),
    prisma.experience.count({ where: { featured: true } }),
    prisma.discipline.count(),
    prisma.contactLead.count(),
  ]);

  const stats = [
    {
      label: "Total Experiencias",
      value: totalExperiences,
      href: "/admin/experiences",
    },
    {
      label: "Publicadas",
      value: publishedExperiences,
      href: "/admin/experiences",
    },
    {
      label: "Destacadas",
      value: featuredExperiences,
      href: "/admin/experiences",
    },
    {
      label: "Disciplinas",
      value: totalDisciplines,
      href: "/admin/disciplines",
    },
    { label: "Contactos", value: totalContacts, href: "/admin/contacts" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="font-heading text-3xl font-bold text-navy-700 mt-1">
              {stat.value}
            </p>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="/admin/disciplines/new"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gold-50 rounded-lg flex items-center justify-center text-2xl">
            🏅
          </div>
          <div>
            <p className="font-semibold text-navy-700">Nueva Disciplina</p>
            <p className="text-sm text-gray-500">
              Agregar una nueva disciplina deportiva
            </p>
          </div>
        </a>
        <a
          href="/admin/experiences/new"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gold-50 rounded-lg flex items-center justify-center text-2xl">
            🌍
          </div>
          <div>
            <p className="font-semibold text-navy-700">Nueva Experiencia</p>
            <p className="text-sm text-gray-500">
              Crear una nueva experiencia deportiva
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
