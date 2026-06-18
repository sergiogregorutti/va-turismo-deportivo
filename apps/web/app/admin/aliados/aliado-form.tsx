"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface AliadoFormValues {
  name: string;
  tag: string;
  logoUrl: string;
  published: boolean;
}

export const EMPTY_ALIADO: AliadoFormValues = {
  name: "",
  tag: "",
  logoUrl: "",
  published: true,
};

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent";

export function AliadoForm({
  initial,
  aliadoId,
}: {
  initial: AliadoFormValues;
  aliadoId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState<AliadoFormValues>(initial);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        aliadoId ? `/api/aliados/${aliadoId}` : "/api/aliados",
        {
          method: aliadoId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al guardar");
        return;
      }

      router.push("/admin/aliados");
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            required
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className={inputClass}
            placeholder="Ej: Patagonia Travel"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rubro
          </label>
          <input
            type="text"
            value={values.tag}
            onChange={(e) => setValues({ ...values, tag: e.target.value })}
            className={inputClass}
            placeholder="Ej: Tour Operator"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo (opcional; si no hay logo se muestra el nombre)
          </label>
          <ImageUploader
            value={values.logoUrl ? [values.logoUrl] : []}
            onChange={(urls) =>
              setValues({ ...values, logoUrl: urls[0] || "" })
            }
            folder="aliados"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(e) =>
              setValues({ ...values, published: e.target.checked })
            }
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
              : aliadoId
                ? "Guardar Cambios"
                : "Crear Aliado"}
          </button>
          <Link
            href="/admin/aliados"
            className="px-8 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
