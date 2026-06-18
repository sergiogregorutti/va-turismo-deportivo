"use client";

import Link from "next/link";
import { AliadoForm, EMPTY_ALIADO } from "../aliado-form";

export default function NewAliadoPage() {
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
          Nuevo Aliado
        </h1>
      </div>

      <AliadoForm initial={EMPTY_ALIADO} />
    </div>
  );
}
