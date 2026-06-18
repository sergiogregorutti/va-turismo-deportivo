import { cache } from "react";
import { prisma } from "@/lib/prisma";

// Defaults en codigo: si falta una row en la DB el sitio nunca se rompe
const DEFAULTS = {
  whatsapp_number: "5411153774567",
  whatsapp_display: "+54 11 5377-4567",
  contact_email: "contacto@vaturismodeportivo.com",
  va_intro: "",
  va_nosotros: "",
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
