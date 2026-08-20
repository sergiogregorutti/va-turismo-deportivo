"use client";

import Link from "next/link";
import { ServiceForm, EMPTY_SERVICE } from "../service-form";

export default function NewServicePage() {
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
          Nuevo Servicio
        </h1>
      </div>

      <ServiceForm initial={EMPTY_SERVICE} />
    </div>
  );
}
