"use client";

import { Select } from "@/components/ui/Select";
import { CITIES, FORMATOS } from "@/lib/constants";

interface Discipline {
  id: string;
  name: string;
  slug: string;
}

interface ExperienciasFilterBarProps {
  disciplines: Discipline[];
  currentDestino?: string;
  currentCountry?: string;
  currentFormato?: string;
  currentModality?: string;
  currentDiscipline?: string;
  activeFilters: string[];
}

export function ExperienciasFilterBar({
  disciplines,
  currentDestino,
  currentCountry,
  currentFormato,
  currentModality,
  currentDiscipline,
  activeFilters,
}: ExperienciasFilterBarProps) {
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

  const defaultDestino = currentDestino || currentCountry || "";

  return (
    <section className="bg-white border-b border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <form action="/experiencias" method="GET">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end">
            <Select
              name="destino"
              label="Destino"
              placeholder="Todos los destinos"
              defaultValue={defaultDestino}
              groups={destinoGroups}
            />
            <Select
              name="formato"
              label="Formato"
              placeholder="Todos"
              defaultValue={currentFormato || ""}
              options={FORMATOS}
            />
            <Select
              name="modality"
              label="Modalidad"
              placeholder="Todas"
              defaultValue={currentModality || ""}
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
              defaultValue={currentDiscipline || ""}
              options={disciplines.map((d) => ({
                value: d.slug,
                label: d.name,
              }))}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Filtrar
              </button>
              {activeFilters.length > 0 && (
                <a
                  href="/experiencias"
                  className="px-4 py-3 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Limpiar
                </a>
              )}
            </div>
          </div>
        </form>

        {activeFilters.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="text-xs px-3 py-1.5 rounded-full bg-navy-50 text-navy-600 font-medium"
              >
                {filter}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
