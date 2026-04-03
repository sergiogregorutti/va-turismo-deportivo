"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectOptionGroup {
  label: string;
  value?: string;
  options: SelectOption[];
}

interface FilterOptions {
  destinos: SelectOptionGroup[];
  formatos: SelectOption[];
  modalities: SelectOption[];
  disciplines: SelectOption[];
  months: SelectOption[];
}

export interface FilterValues {
  destino: string;
  formato: string;
  modality: string;
  discipline: string;
  month: string;
}

const EMPTY_OPTIONS: FilterOptions = {
  destinos: [],
  formatos: [],
  modalities: [],
  disciplines: [],
  months: [],
};

const monthLabels: Record<string, string> = {
  "1": "Enero", "2": "Febrero", "3": "Marzo", "4": "Abril",
  "5": "Mayo", "6": "Junio", "7": "Julio", "8": "Agosto",
  "9": "Septiembre", "10": "Octubre", "11": "Noviembre", "12": "Diciembre",
};

const modalityLabels: Record<string, string> = {
  PRACTICAR: "Practicar",
  COMPETIR: "Competir",
  PRESENCIAR: "Presenciar",
};

function stripCount(label: string): string {
  return label.replace(/\s*\(\d+\)$/, "");
}

export function useFilterOptions(initialValues?: Partial<FilterValues>) {
  const [filters, setFilters] = useState<FilterValues>({
    destino: initialValues?.destino || "",
    formato: initialValues?.formato || "",
    modality: initialValues?.modality || "",
    discipline: initialValues?.discipline || "",
    month: initialValues?.month || "",
  });

  const [options, setOptions] = useState<FilterOptions>(EMPTY_OPTIONS);
  const abortRef = useRef<AbortController | null>(null);

  const fetchOptions = useCallback(async (currentFilters: FilterValues) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const params = new URLSearchParams();
    if (currentFilters.destino) params.set("destino", currentFilters.destino);
    if (currentFilters.formato) params.set("formato", currentFilters.formato);
    if (currentFilters.modality) params.set("modality", currentFilters.modality);
    if (currentFilters.discipline) params.set("discipline", currentFilters.discipline);
    if (currentFilters.month) params.set("month", currentFilters.month);

    try {
      const res = await fetch(`/api/experiences/filters?${params}`, {
        signal: controller.signal,
      });
      if (res.ok) {
        const data = await res.json();
        setOptions(data);
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
    }
  }, []);

  useEffect(() => {
    fetchOptions(filters);
  }, [filters, fetchOptions]);

  const setFilter = useCallback(
    (name: keyof FilterValues, value: string) => {
      setFilters((prev) => {
        // If the selected value no longer exists in options after other filter changes,
        // this handles the case naturally since the user is explicitly selecting it
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
      destino: "",
      formato: "",
      modality: "",
      discipline: "",
      month: "",
    });
  }, []);

  // Build active filter labels from current options (which have the display labels)
  const activeFilterLabels: string[] = [];

  if (filters.destino) {
    // Find label from options
    for (const group of options.destinos) {
      if (group.value === filters.destino) {
        activeFilterLabels.push(stripCount(group.label));
        break;
      }
      const cityOpt = group.options.find((o) => o.value === filters.destino);
      if (cityOpt) {
        activeFilterLabels.push(stripCount(cityOpt.label));
        break;
      }
    }
  }
  if (filters.formato) {
    const opt = options.formatos.find((o) => o.value === filters.formato);
    activeFilterLabels.push(opt ? stripCount(opt.label) : filters.formato);
  }
  if (filters.modality) {
    activeFilterLabels.push(modalityLabels[filters.modality] || filters.modality);
  }
  if (filters.discipline) {
    const opt = options.disciplines.find((o) => o.value === filters.discipline);
    activeFilterLabels.push(opt ? stripCount(opt.label) : filters.discipline);
  }
  if (filters.month) {
    activeFilterLabels.push(monthLabels[filters.month] || filters.month);
  }

  return {
    filters,
    options,
    setFilter,
    clearFilters,
    activeFilterLabels,
  };
}
