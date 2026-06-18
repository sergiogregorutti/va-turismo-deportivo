"use client";

import { useCallback, useEffect, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface HeroSlide {
  id: string;
  country: "ARGENTINA" | "VENEZUELA";
  imageUrl: string;
  alt: string | null;
  order: number;
  published: boolean;
}

const COUNTRIES: { value: HeroSlide["country"]; label: string }[] = [
  { value: "ARGENTINA", label: "Argentina" },
  { value: "VENEZUELA", label: "Venezuela" },
];

export default function HeroAdminPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/hero-slides");
    if (res.ok) setSlides(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addSlide(country: HeroSlide["country"], url: string) {
    await fetch("/api/hero-slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, imageUrl: url }),
    });
    load();
  }

  async function removeSlide(slide: HeroSlide) {
    if (!confirm("¿Eliminar esta imagen de la portada?")) return;
    await fetch(`/api/hero-slides/${slide.id}`, { method: "DELETE" });
    load();
  }

  async function togglePublished(slide: HeroSlide) {
    await fetch(`/api/hero-slides/${slide.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !slide.published }),
    });
    load();
  }

  async function move(
    countrySlides: HeroSlide[],
    index: number,
    delta: -1 | 1
  ) {
    const target = index + delta;
    if (target < 0 || target >= countrySlides.length) return;
    const a = countrySlides[index];
    const b = countrySlides[target];
    await Promise.all([
      fetch(`/api/hero-slides/${a.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: b.order }),
      }),
      fetch(`/api/hero-slides/${b.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: a.order }),
      }),
    ]);
    load();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Portada
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Imagenes del slider principal de la home, por pais. La primera imagen
          es la que se ve al entrar al sitio.
        </p>
      </div>

      <div className="space-y-10">
        {COUNTRIES.map((c) => {
          const countrySlides = slides
            .filter((s) => s.country === c.value)
            .sort((a, b) => a.order - b.order);

          return (
            <section
              key={c.value}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="font-heading text-xl font-semibold text-navy-700 mb-6">
                {c.label}
              </h2>

              {countrySlides.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {countrySlides.map((slide, i) => (
                    <div
                      key={slide.id}
                      className={`relative border rounded-lg overflow-hidden ${
                        slide.published
                          ? "border-gray-200"
                          : "border-dashed border-gray-300 opacity-60"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.imageUrl}
                        alt={slide.alt || `Slide ${i + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="flex items-center justify-between px-2 py-1.5 bg-gray-50 border-t border-gray-100">
                        <div className="flex gap-1">
                          <button
                            onClick={() => move(countrySlides, i, -1)}
                            disabled={i === 0}
                            className="text-xs px-1.5 py-0.5 rounded hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                            aria-label="Mover antes"
                          >
                            ←
                          </button>
                          <button
                            onClick={() => move(countrySlides, i, 1)}
                            disabled={i === countrySlides.length - 1}
                            className="text-xs px-1.5 py-0.5 rounded hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                            aria-label="Mover despues"
                          >
                            →
                          </button>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => togglePublished(slide)}
                            className="text-xs px-1.5 py-0.5 rounded hover:bg-gray-200 cursor-pointer"
                            title={slide.published ? "Ocultar" : "Publicar"}
                          >
                            {slide.published ? "👁" : "🚫"}
                          </button>
                          <button
                            onClick={() => removeSlide(slide)}
                            className="text-xs px-1.5 py-0.5 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                            aria-label="Eliminar"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 mb-6">
                  Sin imagenes cargadas
                </p>
              )}

              <ImageUploader
                value={[]}
                onChange={(urls) => {
                  if (urls[0]) addSlide(c.value, urls[0]);
                }}
                folder={`hero/${c.value.toLowerCase()}`}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
