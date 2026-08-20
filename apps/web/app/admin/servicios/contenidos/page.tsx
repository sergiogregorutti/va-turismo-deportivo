"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FIELDS = [
  {
    section: "Portada",
    fields: [
      { key: "servicios_hero_title", label: "Titulo", rows: 1 },
      { key: "servicios_hero_subtitle", label: "Bajada", rows: 2 },
    ],
  },
  {
    section: "Hospedajes",
    fields: [
      { key: "servicios_hospedajes_title", label: "Titulo", rows: 1 },
      { key: "servicios_hospedajes_description", label: "Descripcion", rows: 3 },
    ],
  },
  {
    section: "Transporte",
    fields: [
      { key: "servicios_transporte_title", label: "Titulo", rows: 1 },
      { key: "servicios_transporte_description", label: "Descripcion", rows: 3 },
    ],
  },
  {
    section: "Concierge",
    fields: [
      { key: "servicios_concierge_title", label: "Titulo", rows: 1 },
      { key: "servicios_concierge_description", label: "Descripcion", rows: 3 },
    ],
  },
  {
    section: "Cierre (CTA)",
    fields: [
      { key: "servicios_cta_title", label: "Titulo", rows: 1 },
      { key: "servicios_cta_description", label: "Descripcion", rows: 3 },
      { key: "servicios_cta_button", label: "Texto del boton", rows: 1 },
    ],
  },
] as const;

const ALL_KEYS = FIELDS.flatMap((g) => g.fields.map((f) => f.key));

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent";

export default function ServiciosContenidosPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((settings) =>
        setValues(
          Object.fromEntries(ALL_KEYS.map((k) => [k, settings[k] ?? ""]))
        )
      )
      .catch(() => setError("No se pudieron cargar los contenidos"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setLoading(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al guardar");
        return;
      }

      setSaved(true);
      router.refresh();
    } catch {
      setError("Error de conexion");
    } finally {
      setLoading(false);
    }
  }

  if (!values) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">{error || "Cargando..."}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/servicios"
          className="text-navy-400 hover:text-navy-600 transition-colors"
        >
          ← Volver
        </Link>
        <div>
          <h1 className="font-heading text-3xl font-semibold text-navy-700">
            Textos de Servicios
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Titulos y descripciones de cada seccion de la pagina
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
            Contenidos guardados
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {FIELDS.map((group) => (
            <div key={group.section} className="space-y-4">
              <h2 className="font-heading text-lg font-semibold text-navy-700 border-b border-gray-100 pb-2">
                {group.section}
              </h2>
              {group.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {field.rows > 1 ? (
                    <textarea
                      rows={field.rows}
                      value={values[field.key]}
                      onChange={(e) =>
                        setValues({ ...values, [field.key]: e.target.value })
                      }
                      className={inputClass}
                    />
                  ) : (
                    <input
                      type="text"
                      value={values[field.key]}
                      onChange={(e) =>
                        setValues({ ...values, [field.key]: e.target.value })
                      }
                      className={inputClass}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
