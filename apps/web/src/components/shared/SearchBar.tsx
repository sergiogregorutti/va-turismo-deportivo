"use client";

import { Select } from "@/components/ui/Select";
import { CITIES, FORMATOS, MONTHS } from "@/lib/constants";

interface Discipline {
  id: string;
  name: string;
  slug: string;
}

interface SearchBarProps {
  disciplines: Discipline[];
}

export function SearchBar({ disciplines }: SearchBarProps) {
  const destinoGroups = [
    {
      label: "Argentina",
      value: "ARGENTINA",
      options: CITIES.ARGENTINA.map((c) => ({
        value: `ARGENTINA:${c.value}`,
        label: c.label,
      })),
    },
    {
      label: "Venezuela",
      value: "VENEZUELA",
      options: CITIES.VENEZUELA.map((c) => ({
        value: `VENEZUELA:${c.value}`,
        label: c.label,
      })),
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <form action="/experiencias" method="GET">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <Select
              name="destino"
              label="Destino"
              placeholder="Todos los destinos"
              groups={destinoGroups}
            />
            <Select
              name="formato"
              label="Formato"
              placeholder="Todos"
              options={FORMATOS}
            />
            <Select
              name="modality"
              label="Modalidad"
              placeholder="Todas"
              options={[
                { value: "PRACTICAR", label: "Practicar" },
                { value: "COMPETIR", label: "Competir" },
                { value: "PRESENCIAR", label: "Presenciar" },
              ]}
            />
            <Select
              name="discipline"
              label="Disciplina"
              placeholder="Todas"
              options={disciplines.map((d) => ({
                value: d.slug,
                label: d.name,
              }))}
            />
            <Select
              name="month"
              label="Fechas"
              placeholder="Todos los meses"
              options={MONTHS}
            />
            <button
              type="submit"
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap h-[48px] cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
