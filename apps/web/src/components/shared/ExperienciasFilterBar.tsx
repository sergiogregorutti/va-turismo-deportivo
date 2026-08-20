"use client";

import { Select } from "@/components/ui/Select";
import { useFilterOptions } from "@/hooks/useFilterOptions";
import { FormatoInfoPopover } from "@/components/shared/FormatoInfoPopover";
import {
  countryFromSlug,
  countryLabel,
  type CountrySlug,
} from "@/lib/country";

interface ExperienciasFilterBarProps {
  country: CountrySlug;
  initialDestino?: string;
  initialFormato?: string;
  initialModality?: string;
  initialDiscipline?: string;
  initialMonth?: string;
}

export function ExperienciasFilterBar({
  country,
  initialDestino,
  initialFormato,
  initialModality,
  initialDiscipline,
  initialMonth,
}: ExperienciasFilterBarProps) {
  const { filters, options, setFilter, activeFilterLabels } = useFilterOptions(
    countryFromSlug(country),
    {
      destino: initialDestino || "",
      formato: initialFormato || "",
      modality: initialModality || "",
      discipline: initialDiscipline || "",
      month: initialMonth || "",
    }
  );

  const hasFilters = activeFilterLabels.length > 0;

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-700 text-center mb-8 max-w-4xl mx-auto leading-snug">
          Filtrá por destino, formato, modalidad o fecha y encontrá tu próxima
          experiencia deportiva en {countryLabel(country)}
        </h2>
        <form action={`/${country}/experiencias`} method="GET">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
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
            <button
              type="submit"
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap h-[48px] cursor-pointer"
            >
              Filtrar
            </button>
          </div>
        </form>

        {hasFilters && (
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {activeFilterLabels.map((filter) => (
              <span
                key={filter}
                className="text-xs px-3 py-1.5 rounded-full bg-navy-50 text-navy-600 font-medium"
              >
                {filter}
              </span>
            ))}
            <a
              href={`/${country}/experiencias`}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium transition-colors cursor-pointer"
            >
              Limpiar filtros
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
