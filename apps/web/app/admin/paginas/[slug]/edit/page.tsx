"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface ModalityHighlight {
  title: string;
  text: string;
}

interface ModalityValues {
  title: string;
  tagline: string;
  heroDescription: string;
  description: string;
  highlights: ModalityHighlight[];
  ctaLabel: string;
  whatsappMessage: string;
  metaDescription: string;
}

interface VaValues {
  va_intro: string;
  va_nosotros: string;
}

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent";

function ModalityForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [values, setValues] = useState<ModalityValues | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((page) =>
        setValues({
          title: page.title,
          tagline: page.tagline,
          heroDescription: page.heroDescription,
          description: page.description,
          highlights: Array.isArray(page.highlights) ? page.highlights : [],
          ctaLabel: page.ctaLabel,
          whatsappMessage: page.whatsappMessage,
          metaDescription: page.metaDescription,
        })
      )
      .catch(() => setError("No se pudo cargar la pagina"));
  }, [slug]);

  if (!values) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">{error || "Cargando..."}</p>
      </div>
    );
  }

  function set<K extends keyof ModalityValues>(
    key: K,
    value: ModalityValues[K]
  ) {
    setValues((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function setHighlight(
    index: number,
    field: keyof ModalityHighlight,
    value: string
  ) {
    if (!values) return;
    const next = [...values.highlights];
    next[index] = { ...next[index], [field]: value };
    set("highlights", next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          highlights: values!.highlights.filter((h) => h.title.trim()),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al guardar");
        return;
      }

      router.push("/admin/paginas");
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
              Titulo *
            </label>
            <input
              type="text"
              required
              value={values.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputClass}
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
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripcion del hero
          </label>
          <textarea
            rows={2}
            value={values.heroDescription}
            onChange={(e) => set("heroDescription", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripcion principal
          </label>
          <textarea
            rows={10}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">
            Separa los parrafos con una linea en blanco
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Destacados (&quot;¿Por que ... con nosotros?&quot;)
            </label>
            <button
              type="button"
              onClick={() =>
                set("highlights", [
                  ...values.highlights,
                  { title: "", text: "" },
                ])
              }
              className="text-sm text-gold-500 hover:text-gold-600 font-medium"
            >
              + Agregar destacado
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
                    aria-label="Quitar destacado"
                  >
                    ✕
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={h.text}
                  onChange={(e) => setHighlight(i, "text", e.target.value)}
                  className={inputClass}
                  placeholder="Texto"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texto del boton CTA
            </label>
            <input
              type="text"
              value={values.ctaLabel}
              onChange={(e) => set("ctaLabel", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripcion para buscadores (SEO)
            </label>
            <input
              type="text"
              value={values.metaDescription}
              onChange={(e) => set("metaDescription", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje de WhatsApp
          </label>
          <textarea
            rows={2}
            value={values.whatsappMessage}
            onChange={(e) => set("whatsappMessage", e.target.value)}
            className={inputClass}
          />
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
            href="/admin/paginas"
            className="px-8 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

function VaForm() {
  const router = useRouter();
  const [values, setValues] = useState<VaValues | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((settings) =>
        setValues({
          va_intro: settings.va_intro || "",
          va_nosotros: settings.va_nosotros || "",
        })
      )
      .catch(() => setError("No se pudo cargar el contenido"));
  }, []);

  if (!values) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">{error || "Cargando..."}</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
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

      router.push("/admin/paginas");
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texto institucional (&quot;VA Turismo Deportivo&quot;)
          </label>
          <textarea
            rows={8}
            value={values.va_intro}
            onChange={(e) =>
              setValues({ ...values, va_intro: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texto de &quot;Nosotros&quot; (bio del fundador)
          </label>
          <textarea
            rows={10}
            value={values.va_nosotros}
            onChange={(e) =>
              setValues({ ...values, va_nosotros: e.target.value })
            }
            className={inputClass}
          />
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
            href="/admin/paginas"
            className="px-8 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

const PAGE_TITLES: Record<string, string> = {
  practicar: "Practicar",
  participar: "Participar",
  presenciar: "Presenciar",
  va: "VA (Nosotros)",
};

export default function EditPagePage() {
  const params = useParams();
  const slug = String(params.slug);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/paginas"
          className="text-navy-400 hover:text-navy-600 transition-colors"
        >
          ← Volver
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Editar: {PAGE_TITLES[slug] || slug}
        </h1>
      </div>

      {slug === "va" ? <VaForm /> : <ModalityForm slug={slug} />}
    </div>
  );
}
