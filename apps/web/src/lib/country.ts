import type { Country } from "@prisma/client";

export type CountrySlug = "argentina" | "venezuela";

export const COUNTRY_COOKIE = "va-country";

export const COUNTRIES_INFO: Record<
  CountrySlug,
  { enum: Country; label: string }
> = {
  argentina: { enum: "ARGENTINA", label: "Argentina" },
  venezuela: { enum: "VENEZUELA", label: "Venezuela" },
};

export const COUNTRY_SLUGS = Object.keys(COUNTRIES_INFO) as CountrySlug[];

export function isCountrySlug(value: string): value is CountrySlug {
  return value in COUNTRIES_INFO;
}

export function countryFromSlug(slug: CountrySlug): Country {
  return COUNTRIES_INFO[slug].enum;
}

export function slugFromCountry(country: Country): CountrySlug {
  return country === "VENEZUELA" ? "venezuela" : "argentina";
}

export function countryLabel(slug: CountrySlug): string {
  return COUNTRIES_INFO[slug].label;
}

/**
 * Parsea la lista de paises habilitados (slugs separados por coma) preservando
 * el orden canonico. Nunca devuelve vacio: si no hay ninguno valido cae en
 * Argentina, para que el sitio publico siempre tenga al menos un pais.
 */
export function parseEnabledCountries(value: string | undefined): CountrySlug[] {
  const wanted = new Set(
    (value || "").split(",").map((s) => s.trim().toLowerCase())
  );
  const enabled = COUNTRY_SLUGS.filter((slug) => wanted.has(slug));
  return enabled.length > 0 ? enabled : ["argentina"];
}
