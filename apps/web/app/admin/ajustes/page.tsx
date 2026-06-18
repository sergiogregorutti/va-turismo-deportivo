"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AjustesValues {
  whatsapp_number: string;
  whatsapp_display: string;
  contact_email: string;
}

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent";

export default function AjustesPage() {
  const router = useRouter();
  const [values, setValues] = useState<AjustesValues | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((settings) =>
        setValues({
          whatsapp_number: settings.whatsapp_number || "",
          whatsapp_display: settings.whatsapp_display || "",
          contact_email: settings.contact_email || "",
        })
      )
      .catch(() => setError("No se pudieron cargar los ajustes"));
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
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Ajustes
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Datos de contacto que se muestran en todo el sitio
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
            Ajustes guardados
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numero de WhatsApp (solo digitos, con codigo de pais)
            </label>
            <input
              type="text"
              required
              value={values.whatsapp_number}
              onChange={(e) =>
                setValues({ ...values, whatsapp_number: e.target.value })
              }
              className={inputClass}
              placeholder="Ej: 5411153774567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefono como se muestra en el sitio
            </label>
            <input
              type="text"
              value={values.whatsapp_display}
              onChange={(e) =>
                setValues({ ...values, whatsapp_display: e.target.value })
              }
              className={inputClass}
              placeholder="Ej: +54 11 5377-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email de contacto
            </label>
            <input
              type="email"
              required
              value={values.contact_email}
              onChange={(e) =>
                setValues({ ...values, contact_email: e.target.value })
              }
              className={inputClass}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Ajustes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
