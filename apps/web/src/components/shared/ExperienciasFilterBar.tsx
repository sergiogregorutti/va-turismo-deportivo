"use client";

import { Select } from "@/components/ui/Select";
import { useFilterOptions } from "@/hooks/useFilterOptions";
import { FormatoInfoPopover } from "@/components/shared/FormatoInfoPopover";

interface ExperienciasFilterBarProps {
  initialDestino?: string;
  initialFormato?: string;
  initialModality?: string;
  initialDiscipline?: string;
  initialMonth?: string;
}

export function ExperienciasFilterBar({
  initialDestino,
  initialFormato,
  initialModality,
  initialDiscipline,
  initialMonth,
}: ExperienciasFilterBarProps) {
  const { filters, options, setFilter, activeFilterLabels } = useFilterOptions({
    destino: initialDestino || "",
    formato: initialFormato || "",
    modality: initialModality || "",
    discipline: initialDiscipline || "",
    month: initialMonth || "",
  });

  const hasFilters = activeFilterLabels.length > 0;

  return (
    <section className="bg-white border-b border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <form action="/experiencias" method="GET">
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-end">
            <Select
              name="destino"
              label="Destino"
              placeholder="Todos los destinos"
              value={filters.destino}
              onChange={(v) => setFilter("destino", v)}
              groups={options.destinos}
            />
            <Select
              name="formato"
              label="Formato"
              labelExtra={<FormatoInfoPopover />}
              placeholder="Todos"
              value={filters.formato}
              onChange={(v) => setFilter("formato", v)}
              options={options.formatos}
            />
            <Select
              name="modality"
              label="Modalidad"
              placeholder="Todas"
              value={filters.modality}
              onChange={(v) => setFilter("modality", v)}
              options={options.modalities}
            />
            <Select
              name="discipline"
              label="Disciplina"
              placeholder="Todas"
              value={filters.discipline}
              onChange={(v) => setFilter("discipline", v)}
              options={options.disciplines}
            />
            <Select
              name="month"
              label="Fechas"
              placeholder="Todos los meses"
              value={filters.month}
              onChange={(v) => setFilter("month", v)}
              options={options.months}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Filtrar
              </button>
              {hasFilters && (
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

        {hasFilters && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {activeFilterLabels.map((filter) => (
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
