import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { COUNTRY_SLUGS, countryLabel } from "@/lib/country";
import { CountryFlag } from "@/components/shared/CountryFlag";

export const metadata: Metadata = {
  title: "VA Turismo Deportivo | Seleccioná tu país",
  description:
    "Experiencias de turismo deportivo en Argentina y Venezuela. Seleccioná tu país para descubrir experiencias, hospedajes y destinos.",
};

export default function CountrySelectPage() {
  return (
    <div className="min-h-screen bg-navy-800 flex items-center justify-center px-4">
      <div className="text-center py-16">
        {/* Logo */}
        <Image
          src="/images/va_logo_inverted.svg"
          alt="VA Turismo Deportivo"
          width={280}
          height={78}
          className="h-20 w-auto mx-auto mb-12"
          priority
        />

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-2">
          Seleccioná tu país
        </h1>
        <p className="text-navy-300 mb-10">
          Para mostrarte las experiencias deportivas de tu destino
        </p>

        {/* Country options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {COUNTRY_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="group w-64 bg-navy-700 border border-navy-600/40 hover:border-gold-400/60 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CountryFlag
                country={slug}
                className="w-24 h-16 mx-auto rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <p className="font-heading text-2xl font-bold text-white uppercase tracking-wider mt-6 group-hover:text-gold-400 transition-colors">
                {countryLabel(slug)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
