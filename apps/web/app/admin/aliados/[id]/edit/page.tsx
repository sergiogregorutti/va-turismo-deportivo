"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AliadoForm, type AliadoFormValues } from "../../aliado-form";

export default function EditAliadoPage() {
  const params = useParams();
  const [initial, setInitial] = useState<AliadoFormValues | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/aliados/${params.id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((aliado) =>
        setInitial({
          name: aliado.name,
          tag: aliado.tag || "",
          logoUrl: aliado.logoUrl || "",
          published: aliado.published ?? true,
        })
      )
      .catch(() => setNotFound(true));
  }, [params.id]);

  if (notFound) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">Aliado no encontrado</p>
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
          href="/admin/aliados"
          className="text-navy-400 hover:text-navy-600 transition-colors"
        >
          ← Volver
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Editar Aliado
        </h1>
      </div>

      <AliadoForm initial={initial} aliadoId={String(params.id)} />
    </div>
  );
}
