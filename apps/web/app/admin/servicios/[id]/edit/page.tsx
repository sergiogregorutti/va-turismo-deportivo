"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ServiceForm, type ServiceFormValues } from "../../service-form";

export default function EditServicePage() {
  const params = useParams();
  const [initial, setInitial] = useState<ServiceFormValues | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/services/${params.id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((service) =>
        setInitial({
          category: service.category,
          title: service.title,
          description: service.description || "",
          imageUrl: service.imageUrl || "",
          badge: service.badge || "",
          order: service.order ?? 0,
          published: service.published ?? true,
        })
      )
      .catch(() => setNotFound(true));
  }, [params.id]);

  if (notFound) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400">Servicio no encontrado</p>
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
          href="/admin/servicios"
          className="text-navy-400 hover:text-navy-600 transition-colors"
        >
          ← Volver
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-navy-700">
          Editar Servicio
        </h1>
      </div>

      <ServiceForm initial={initial} serviceId={String(params.id)} />
    </div>
  );
}
