"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { COUNTRY_SLUGS, countryLabel, type CountrySlug } from "@/lib/country";
import { CountryFlag } from "@/components/shared/CountryFlag";

const navLinks = [
  { href: "", label: "Inicio" },
  { href: "/experiencias", label: "Experiencias" },
  { href: "/ciudades", label: "Ciudades" },
  { href: "/servicios", label: "Servicios" },
  { href: "/va", label: "VA" },
];

function CountrySwitcher({ country }: { country: CountrySlug }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-navy-200 hover:text-white transition-colors cursor-pointer"
        aria-label="Cambiar país"
        aria-expanded={open}
      >
        <CountryFlag country={country} className="w-6 h-4 rounded-sm" />
        <span className="hidden lg:inline">{countryLabel(country)}</span>
        <svg
          className={cn("w-3 h-3 transition-transform", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[160px] z-50">
          {COUNTRY_SLUGS.map((slug) => {
            // Keep the current page when switching country
            const subpath = pathname.replace(/^\/(argentina|venezuela)/, "");
            return (
              <Link
                key={slug}
                href={`/${slug}${subpath}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors",
                  slug === country ? "text-navy-900 bg-gray-50" : "text-gray-600"
                )}
              >
                <CountryFlag country={slug} className="w-6 h-4 rounded-sm" />
                {countryLabel(slug)}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Header({ country }: { country: CountrySlug }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const base = `/${country}`;

  return (
    <header className="bg-navy-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={base} className="flex items-center gap-3">
            <Image
              src="/images/va_logo_inverted.svg"
              alt="VA Turismo Deportivo"
              width={200}
              height={56}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`${base}${link.href}`}
                className="text-sm font-medium text-navy-200 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <CountrySwitcher country={country} />
            <Link
              href={`${base}/contacto`}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Consultar
            </Link>
          </nav>

          {/* Mobile: country switcher + menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <CountrySwitcher country={country} />
            <button
              className="p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`${base}${link.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-navy-200 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${base}/contacto`}
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold text-center px-5 py-2.5 rounded-lg transition-colors"
            >
              Consultar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
