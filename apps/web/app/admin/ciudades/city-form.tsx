"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MONTHS } from "@/lib/constants";

export interface CityHighlightInput {
  title: string;
  description: string;
}

export interface CityFormValues {
  name: string;
  province: string;
  country: string;
  imageUrl: string;
  heroImageUrl: string;
  tagline: string;
  intro: string;
  about: string;
  climate: string;
  bestSeasons: string[];
  sports: string[];
  highlights: CityHighlightInput[];
  gettingThere: string;
  order: number;
  published: boolean;
}

export const EMPTY_CITY: CityFormValues = {
  name: "",
  province: "",
  country: "",
  imageUrl: "",
  heroImageUrl: "",
  tagline: "",
  intro: "",
  about: "",
  climate: "",
  bestSeasons: [],
  sports: [],
  highlights: [],
  gettingThere: "",
  order: 0,
  published: true,
};

const COUNTRY_OPTIONS = [
  { value: "ARGENTINA", label: "Argentina" },
  { value: "VENEZUELA", label: "Venezuela" },
];

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent";

export function CityForm({
  initial,
  cityId,
}: {
  initial: CityFormValues;
  cityId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState<CityFormValues>(initial);
  const [sportsDraft, setSportsDraft] = useState(initial.sports.join(", "));

  function set<K extends keyof CityFormValues>(
    key: K,
    value: CityFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleSeason(month: string) {
    set(
      "bestSeasons",
      values.bestSeasons.includes(month)
        ? values.bestSeasons.filter((m) => m !== month)
        : [...values.bestSeasons, month]
    );
  }

  function setHighlight(
    index: number,
    field: keyof CityHighlightInput,
    value: string
  ) {
    const next = [...values.highlights];
    next[index] = { ...next[index], [field]: value };
    set("highlights", next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const body = {
      ...values,
      sports: sportsDraft
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      highlights: values.highlights.filter((h) => h.title.trim()),
    };

    try {
      const res = await fetch(cityId ? `/api/cities/${cityId}` : "/api/cities", {
        method: cityId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al guardar");
        return;
      }

      router.push("/admin/ciudades");
      router.refresh();
    } catch {
      setError("Error de conexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              required
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputClass}
              placeholder="Ej: Bariloche"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Provincia / Region
            </label>
            <input
              type="text"
              value={values.province}
              onChange={(e) => set("province", e.target.value)}
              className={inputClass}
              placeholder="Ej: Rio Negro"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pais *
            </label>
            <select
              required
              value={values.country}
              onChange={(e) => set("country", e.target.value)}
              className={inputClass}
            >
              <option value="">Seleccionar pais</option>
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Orden
            </label>
            <input
              type="number"
              value={values.order}
              onChange={(e) => set("order", parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen vertical *
          </label>
          <p className="text-xs text-gray-400 mb-2">
            Se usa en los listados de ciudades. Formato vertical (3:4).
          </p>
          <ImageUploader
            value={values.imageUrl ? [values.imageUrl] : []}
            onChange={(urls) => set("imageUrl", urls[0] || "")}
            folder="ciudades"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen horizontal (header del detalle)
          </label>
          <p className="text-xs text-gray-400 mb-2">
            Se usa como portada de la pagina de la ciudad. Formato apaisado
            (16:9). Si no cargas ninguna se usa la vertical.
          </p>
          <ImageUploader
            value={values.heroImageUrl ? [values.heroImageUrl] : []}
            onChange={(urls) => set("heroImageUrl", urls[0] || "")}
            folder="ciudades"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tagline
          </label>
          <input
            type="text"
            value={values.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            className={inputClass}
            placeholder="Ej: El corazon de la Patagonia deportiva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intro
          </label>
          <textarea
            rows={3}
            value={values.intro}
            onChange={(e) => set("intro", e.target.value)}
            className={inputClass}
            placeholder="Parrafo introductorio que se muestra debajo del hero"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sobre la ciudad
          </label>
          <textarea
            rows={5}
            value={values.about}
            onChange={(e) => set("about", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deportes (separados por coma)
          </label>
          <input
            type="text"
            value={sportsDraft}
            onChange={(e) => setSportsDraft(e.target.value)}
            className={inputClass}
            placeholder="Ej: Esqui, Trekking, Kayak"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mejor epoca
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {MONTHS.map((m) => (
              <label
                key={m.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={values.bestSeasons.includes(m.label)}
                  onChange={() => toggleSeason(m.label)}
                  className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
                />
                <span className="text-sm text-gray-700">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clima
          </label>
          <textarea
            rows={2}
            value={values.climate}
            onChange={(e) => set("climate", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Como llegar
          </label>
          <textarea
            rows={2}
            value={values.gettingThere}
            onChange={(e) => set("gettingThere", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Imperdibles deportivos
            </label>
            <button
              type="button"
              onClick={() =>
                set("highlights", [
                  ...values.highlights,
                  { title: "", description: "" },
                ])
              }
              className="text-sm text-gold-500 hover:text-gold-600 font-medium"
            >
              + Agregar imperdible
            </button>
          </div>
          <div className="space-y-4">
            {values.highlights.map((h, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={h.title}
                    onChange={(e) => setHighlight(i, "title", e.target.value)}
                    className={inputClass}
                    placeholder="Titulo"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "highlights",
                        values.highlights.filter((_, idx) => idx !== i)
                      )
                    }
                    className="px-3 text-red-400 hover:text-red-600 transition-colors"
                    aria-label="Quitar imperdible"
                  >
                    ✕
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={h.description}
                  onChange={(e) =>
                    setHighlight(i, "description", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Descripcion"
                />
              </div>
            ))}
            {values.highlights.length === 0 && (
              <p className="text-sm text-gray-400">
                Sin imperdibles cargados
              </p>
            )}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(e) => set("published", e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
          />
          <span className="text-sm text-gray-700">Publicada</span>
        </label>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading
              ? "Guardando..."
              : cityId
                ? "Guardar Cambios"
                : "Crear Ciudad"}
          </button>
          <Link
            href="/admin/ciudades"
            className="px-8 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
