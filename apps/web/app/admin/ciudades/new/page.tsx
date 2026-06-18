"use client";

import Link from "next/link";
import { CityForm, EMPTY_CITY } from "../city-form";

export default function NewCityPage() {
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
          Nueva Ciudad
        </h1>
      </div>

      <CityForm initial={EMPTY_CITY} />
    </div>
  );
}
