"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface ServiceFormValues {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  badge: string;
  order: number;
  published: boolean;
}

export const EMPTY_SERVICE: ServiceFormValues = {
  category: "TRANSPORTE",
  title: "",
  description: "",
  imageUrl: "",
  badge: "",
  order: 0,
  published: true,
};

export const SERVICE_CATEGORIES = [
  { value: "TRANSPORTE", label: "Transporte" },
  { value: "CONCIERGE", label: "Concierge" },
];

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent";

export function ServiceForm({
  initial,
  serviceId,
}: {
  initial: ServiceFormValues;
  serviceId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState<ServiceFormValues>(initial);

  function set<K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        serviceId ? `/api/services/${serviceId}` : "/api/services",
        {
          method: serviceId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al guardar");
        return;
      }

      router.push("/admin/servicios");
      router.refresh();
    } catch {
      setError("Error de conexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              required
              value={values.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputClass}
            >
              {SERVICE_CATEGORIES.map((c) => (
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
            Titulo *
          </label>
          <input
            type="text"
            required
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            className={inputClass}
            placeholder="Ej: Avion Privado"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripcion
          </label>
          <textarea
            rows={4}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Etiqueta (opcional)
          </label>
          <input
            type="text"
            value={values.badge}
            onChange={(e) => set("badge", e.target.value)}
            className={inputClass}
            placeholder="Ej: Aereo, Terrestre, Maritimo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen *
          </label>
          <p className="text-xs text-gray-400 mb-2">
            Se muestra en formato apaisado (4:3) dentro del carrusel.
          </p>
          <ImageUploader
            value={values.imageUrl ? [values.imageUrl] : []}
            onChange={(urls) => set("imageUrl", urls[0] || "")}
            folder="servicios"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(e) => set("published", e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-gold-400 focus:ring-gold-400"
          />
          <span className="text-sm text-gray-700">Publicado</span>
        </label>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading
              ? "Guardando..."
              : serviceId
                ? "Guardar Cambios"
                : "Crear Servicio"}
          </button>
          <Link
            href="/admin/servicios"
            className="px-8 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
