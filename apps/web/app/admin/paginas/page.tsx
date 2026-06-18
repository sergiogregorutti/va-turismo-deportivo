import Link from "next/link";

const PAGES = [
  {
    slug: "practicar",
    label: "Practicar",
    description: "Pagina de la modalidad Practicar",
  },
  {
    slug: "participar",
    label: "Participar",
    description: "Pagina de la modalidad Participar",
  },
  {
    slug: "presenciar",
    label: "Presenciar",
    description: "Pagina de la modalidad Presenciar",
  },
  {
    slug: "va",
    label: "VA (Nosotros)",
    description: "Textos institucionales de la pagina VA",
  },
];

export default function PaginasAdminPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Paginas
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Textos de las paginas institucionales del sitio
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {PAGES.map((page) => (
          <div
            key={page.slug}
            className="flex items-center justify-between px-6 py-5"
          >
            <div>
              <p className="font-medium text-navy-700">{page.label}</p>
              <p className="text-sm text-gray-400">{page.description}</p>
            </div>
            <Link
              href={`/admin/paginas/${page.slug}/edit`}
              className="text-sm text-navy-600 hover:text-navy-700 font-medium px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
            >
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
