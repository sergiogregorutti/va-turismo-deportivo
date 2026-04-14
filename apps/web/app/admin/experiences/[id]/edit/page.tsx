"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const COUNTRY_OPTIONS = [
  { value: "ARGENTINA", label: "Argentina" },
  { value: "VENEZUELA", label: "Venezuela" },
];

const CITY_OPTIONS: Record<string, { value: string; label: string }[]> = {
  ARGENTINA: [
    { value: "BUENOS_AIRES", label: "Buenos Aires" },
    { value: "BARILOCHE", label: "Bariloche" },
    { value: "CORDOBA", label: "Córdoba" },
  ],
  VENEZUELA: [
    { value: "LOS_ROQUES", label: "Los Roques" },
    { value: "MARGARITA", label: "Margarita" },
    { value: "LA_GRAN_SABANA", label: "La Gran Sabana" },
  ],
};

const MODALITY_OPTIONS = [
  { value: "PRACTICAR", label: "Practicar" },
  { value: "COMPETIR", label: "Participar" },
  { value: "PRESENCIAR", label: "Presenciar" },
];

const FORMATO_OPTIONS = [
  { value: "SOLO", label: "Solo" },
  { value: "PAREJA", label: "Pareja" },
  { value: "FAMILIA", label: "Familia" },
  { value: "AMIGOS", label: "Amigos" },
  { value: "EQUIPO_DEPORTIVO", label: "Equipo Deportivo" },
  { value: "CORPORATIVO", label: "Corporativo" },
];

interface Discipline {
  id: string;
  name: string;
  modalities: string[];
}

export default function EditExperiencePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [modality, setModality] = useState("");
  const [formato, setFormato] = useState("");
  const [disciplineId, setDisciplineId] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priceInfo, setPriceInfo] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/experiences/${params.id}`).then((r) => r.json()),
      fetch("/api/disciplines").then((r) => r.json()),
    ]).then(([exp, discs]) => {
      setTitle(exp.title);
      setDescription(exp.description);
      setCountry(exp.country);
      setCity(exp.city || "");
      setLocation(exp.location);
      setModality(exp.modality);
      setFormato(exp.formato || "");
      setDisciplineId(exp.disciplineId);
      setImageUrls(exp.imageUrls?.length ? exp.imageUrls : [""]);
      setStartDate(exp.startDate ? exp.startDate.split("T")[0] : "");
      setEndDate(exp.endDate ? exp.endDate.split("T")[0] : "");
      setPriceInfo(exp.priceInfo || "");
      setFeatured(exp.featured);
      setPublished(exp.published);
      setDisciplines(discs);
      setFetching(false);
    });
  }, [params.id]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/experiences/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          country,
          city: city || null,
          location,
          modality,
          formato: formato || null,
          disciplineId,
          imageUrls: imageUrls.filter((u) => u.trim()),
          startDate: startDate || null,
          endDate: endDate || null,
          priceInfo: priceInfo || null,
          featured,
          published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al actualizar");
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

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
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
          Editar Experiencia
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
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripcion *
            </label>
            <textarea
              rows={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pais *
              </label>
              <select
                required
                value={country}
                onChange={(e) => { setCountry(e.target.value); setCity(""); }}
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
                Ciudad
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              >
                <option value="">Seleccionar ciudad</option>
                {country && CITY_OPTIONS[country]?.map((c) => (
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
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modalidad *
              </label>
              <select
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
                Formato
              </label>
              <select
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              >
                <option value="">Seleccionar formato</option>
                {FORMATO_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disciplina *
              </label>
              <select
                required
                value={disciplineId}
                onChange={(e) => setDisciplineId(e.target.value)}
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
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha fin
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio
              </label>
              <input
                type="text"
                value={priceInfo}
                onChange={(e) => setPriceInfo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                placeholder="Ej: Desde USD 850"
              />
            </div>
          </div>

          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
              />
              <span className="text-sm text-gray-700">Destacada</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
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
              {loading ? "Guardando..." : "Guardar Cambios"}
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
