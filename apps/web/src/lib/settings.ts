import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { parseEnabledCountries, type CountrySlug } from "@/lib/country";

// Defaults en codigo: si falta una row en la DB el sitio nunca se rompe
const DEFAULTS = {
  whatsapp_number: "5411153774567",
  whatsapp_display: "+54 11 5377-4567",
  contact_email: "contacto@vaturismodeportivo.com",
  va_intro: "",
  va_nosotros: "",
  // Paises visibles en el sitio publico (slugs separados por coma).
  // El admin sigue mostrando todos, para poder cargar contenido antes de abrir un pais.
  enabled_countries: "argentina",
  // Redes de "Nosotros" (vacio = no se muestra el icono)
  social_instagram: "",
  social_linkedin: "",
  social_website: "",
  // Textos de la pagina Servicios
  servicios_hero_title: "Servicios",
  servicios_hero_subtitle:
    "Hospedajes, transporte y concierge para vivir cada destino al maximo",
  servicios_hospedajes_title: "Hospedajes",
  servicios_hospedajes_description:
    "Alojamientos tematicos y propiedades unicas seleccionadas para viajeros, familias y equipos deportivos.",
  servicios_transporte_title: "Transporte",
  servicios_transporte_description:
    "Solucionamos cada tramo del viaje por aire, tierra y mar: Aereo (avion comercial, privado, helicoptero), Terrestre (autobuses, vans, autos, alquiler) y Maritimo (veleros).",
  servicios_concierge_title: "Concierge",
  servicios_concierge_description:
    "Gestionamos accesos, reservas y experiencias en destino para que cada viaje fluya sin friccion.",
  servicios_cta_title: "Armemos tu proximo viaje",
  servicios_cta_description:
    "Contanos a donde queres ir y que querer vivir. Disenamos una propuesta a medida con todos los servicios incluidos.",
  servicios_cta_button: "Consulta tu viaje",
} as const;

export type SettingKey = keyof typeof DEFAULTS;

export const SETTING_KEYS = Object.keys(DEFAULTS) as SettingKey[];

// cache() dedupea la query dentro de un mismo request (layout + page + metadata)
export const getSettings = cache(
  async (): Promise<Record<SettingKey, string>> => {
    const rows = await prisma.siteSetting.findMany();
    const fromDb = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...DEFAULTS, ...fromDb };
  }
);

export const getEnabledCountries = cache(async (): Promise<CountrySlug[]> => {
  const settings = await getSettings();
  return parseEnabledCountries(settings.enabled_countries);
});
