import Image from "next/image";
import Link from "next/link";
import { cities } from "@/data/cities";

export function CitiesSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-700">
              Ciudades
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl">
              Descubrí los destinos más icónicos del turismo deportivo en
              Argentina
            </p>
          </div>
          <Link
            href="/ciudades"
            className="inline-flex items-center gap-2 text-navy-700 hover:text-gold-500 font-semibold text-sm transition-colors"
          >
            Ver todas las ciudades
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/ciudades/${city.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-navy-700 mt-4 uppercase tracking-wider group-hover:text-gold-500 transition-colors">
                {city.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{city.province}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
