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
