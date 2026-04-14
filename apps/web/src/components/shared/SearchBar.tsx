"use client";

import { Select } from "@/components/ui/Select";
import { useFilterOptions } from "@/hooks/useFilterOptions";

export function SearchBar() {
  const { filters, options, setFilter } = useFilterOptions();

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-700 text-center mb-8 max-w-4xl mx-auto leading-snug">
          Armamos Experiencias a medida para que descubras y disfrutes los
          mejores escenarios deportivos de Argentina, jugando como local
        </h2>
        <form action="/experiencias" method="GET">
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
              Buscar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
