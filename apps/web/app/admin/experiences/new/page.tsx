"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const COUNTRY_OPTIONS = [
  { value: "ARGENTINA", label: "Argentina" },
  { value: "VENEZUELA", label: "Venezuela" },
];

const MODALITY_OPTIONS = [
  { value: "PRACTICAR", label: "Practicar" },
  { value: "COMPETIR", label: "Competir" },
  { value: "PRESENCIAR", label: "Presenciar" },
];

interface Discipline {
  id: string;
  name: string;
  modalities: string[];
}

export default function NewExperiencePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [modality, setModality] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  useEffect(() => {
    fetch("/api/disciplines")
      .then((res) => res.json())
      .then(setDisciplines);
  }, []);

  const filteredDisciplines = modality
    ? disciplines.filter((d) => d.modalities.includes(modality))
    : disciplines;

  function addImageUrl() {
    setImageUrls([...imageUrls, ""]);
  }

  function updateImageUrl(index: number, value: string) {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  }

  function removeImageUrl(index: number) {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
      country: formData.get("country"),
      location: formData.get("location"),
      modality: formData.get("modality"),
      disciplineId: formData.get("disciplineId"),
      imageUrls: imageUrls.filter((u) => u.trim()),
      startDate: formData.get("startDate") || null,
      endDate: formData.get("endDate") || null,
      priceInfo: formData.get("priceInfo") || null,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    };

    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al crear");
        return;
      }

      router.push("/admin/experiences");
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
          href="/admin/experiences"
          className="text-navy-400 hover:text-navy-600 transition-colors"
        >
          ← Volver
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Nueva Experiencia
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titulo *
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="Ej: Esqui en Cerro Catedral"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripcion *
            </label>
            <textarea
              name="description"
              rows={5}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="Descripcion detallada de la experiencia"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pais *
              </label>
              <select
                name="country"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
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
                Ubicacion *
              </label>
              <input
                name="location"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                placeholder="Ej: Bariloche, Rio Negro"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modalidad *
              </label>
              <select
                name="modality"
                required
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              >
                <option value="">Seleccionar modalidad</option>
                {MODALITY_OPTIONS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disciplina *
              </label>
              <select
                name="disciplineId"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              >
                <option value="">Seleccionar disciplina</option>
                {filteredDisciplines.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagenes (URLs)
            </label>
            <div className="space-y-3">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => updateImageUrl(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrl}
                className="text-sm text-gold-500 hover:text-gold-600 font-medium"
              >
                + Agregar otra imagen
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha inicio
              </label>
              <input
                name="startDate"
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha fin
              </label>
              <input
                name="endDate"
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio
              </label>
              <input
                name="priceInfo"
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                placeholder="Ej: Desde USD 850"
              />
            </div>
          </div>

          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="featured"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
              />
              <span className="text-sm text-gray-700">Destacada</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="published"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
              />
              <span className="text-sm text-gray-700">Publicada</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Creando..." : "Crear Experiencia"}
            </button>
            <Link
              href="/admin/experiences"
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
