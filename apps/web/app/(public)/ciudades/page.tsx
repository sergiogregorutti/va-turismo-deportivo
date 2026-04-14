import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cities } from "@/data/cities";

export const metadata: Metadata = {
  title: "Ciudades | VA Turismo Deportivo",
  description:
    "Descubrí los destinos más icónicos del turismo deportivo en Argentina: Buenos Aires, Bariloche, Mendoza y Fitz Roy.",
};

export default function CitiesPage() {
  return (
    <div className="bg-white">
      <section className="bg-navy-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
            Ciudades
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Los destinos más icónicos del turismo deportivo en Argentina
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/ciudades/${city.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                      {city.name}
                    </h2>
                    <p className="text-gold-400 text-sm font-medium mt-1">
                      {city.province}, {city.country}
                    </p>
                    <p className="text-white/90 text-sm mt-3 line-clamp-2">
                      {city.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
