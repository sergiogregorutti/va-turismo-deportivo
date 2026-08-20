"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CityForm, type CityFormValues } from "../../city-form";

export default function EditCityPage() {
  const params = useParams();
  const [initial, setInitial] = useState<CityFormValues | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/cities/${params.id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((city) =>
        setInitial({
          name: city.name,
          province: city.province || "",
          country: city.country,
          imageUrl: city.imageUrl || "",
          heroImageUrl: city.heroImageUrl || "",
          tagline: city.tagline || "",
          intro: city.intro || "",
          about: city.about || "",
          climate: city.climate || "",
          bestSeasons: city.bestSeasons || [],
          sports: city.sports || [],
          highlights: Array.isArray(city.highlights) ? city.highlights : [],
          gettingThere: city.gettingThere || "",
          order: city.order ?? 0,
          published: city.published ?? true,
        })
      )
      .catch(() => setNotFound(true));
  }, [params.id]);

  if (notFound) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">Ciudad no encontrada</p>
      </div>
    );
  }

  if (!initial) {
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
          href="/admin/ciudades"
          className="text-navy-400 hover:text-navy-600 transition-colors"
        >
          ← Volver
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Editar Ciudad
        </h1>
      </div>

      <CityForm initial={initial} cityId={String(params.id)} />
    </div>
  );
}
