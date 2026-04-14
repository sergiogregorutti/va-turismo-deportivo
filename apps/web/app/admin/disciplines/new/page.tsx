"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MODALITY_OPTIONS = [
  { value: "PRACTICAR", label: "Practicar" },
  { value: "COMPETIR", label: "Participar" },
  { value: "PRESENCIAR", label: "Presenciar" },
];

const COUNTRY_OPTIONS = [
  { value: "ARGENTINA", label: "Argentina" },
  { value: "VENEZUELA", label: "Venezuela" },
];

const CITY_OPTIONS = [
  { value: "BUENOS_AIRES", label: "Buenos Aires", country: "ARGENTINA" },
  { value: "BARILOCHE", label: "Bariloche", country: "ARGENTINA" },
  { value: "CORDOBA", label: "Córdoba", country: "ARGENTINA" },
  { value: "LOS_ROQUES", label: "Los Roques", country: "VENEZUELA" },
  { value: "MARGARITA", label: "Margarita", country: "VENEZUELA" },
  { value: "LA_GRAN_SABANA", label: "La Gran Sabana", country: "VENEZUELA" },
];

export default function NewDisciplinePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const modalities = MODALITY_OPTIONS.filter((m) =>
      formData.get(`modality-${m.value}`)
    ).map((m) => m.value);

    const countries = COUNTRY_OPTIONS.filter((c) =>
      formData.get(`country-${c.value}`)
    ).map((c) => c.value);

    const cities = CITY_OPTIONS.filter((c) =>
      formData.get(`city-${c.value}`)
    ).map((c) => c.value);

    const body = {
      name: formData.get("name"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl") || null,
      modalities,
      countries,
      cities,
    };

    try {
      const res = await fetch("/api/disciplines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al crear");
        return;
      }

      router.push("/admin/disciplines");
      router.refresh();
    } catch {
      setError("Error de conexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/disciplines"
          className="text-navy-400 hover:text-navy-600 transition-colors"
        >
          ← Volver
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Nueva Disciplina
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="Ej: Esqui"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripcion
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="Breve descripcion de la disciplina"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de Imagen
            </label>
            <input
              name="imageUrl"
              type="url"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Modalidades *
            </label>
            <div className="flex gap-6">
              {MODALITY_OPTIONS.map((m) => (
                <label key={m.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    name={`modality-${m.value}`}
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
                  />
                  <span className="text-sm text-gray-700">{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Paises donde esta disponible
            </label>
            <div className="flex gap-6">
              {COUNTRY_OPTIONS.map((c) => (
                <label key={c.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    name={`country-${c.value}`}
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
                  />
                  <span className="text-sm text-gray-700">{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ciudades donde esta disponible
            </label>
            <div className="grid grid-cols-2 gap-3">
              {CITY_OPTIONS.map((c) => (
                <label key={c.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    name={`city-${c.value}`}
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
                  />
                  <span className="text-sm text-gray-700">{c.label} ({c.country === "ARGENTINA" ? "AR" : "VE"})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Creando..." : "Crear Disciplina"}
            </button>
            <Link
              href="/admin/disciplines"
              className="px-8 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
