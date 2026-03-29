export const COUNTRIES = [
  { value: "ARGENTINA" as const, label: "Argentina" },
  { value: "VENEZUELA" as const, label: "Venezuela" },
];

export const CITIES = {
  ARGENTINA: [
    { value: "BUENOS_AIRES" as const, label: "Buenos Aires" },
    { value: "BARILOCHE" as const, label: "Bariloche" },
    { value: "CORDOBA" as const, label: "Córdoba" },
  ],
  VENEZUELA: [
    { value: "LOS_ROQUES" as const, label: "Los Roques" },
    { value: "MARGARITA" as const, label: "Margarita" },
    { value: "LA_GRAN_SABANA" as const, label: "La Gran Sabana" },
  ],
};

export const ALL_CITIES = [
  ...CITIES.ARGENTINA,
  ...CITIES.VENEZUELA,
];

export const FORMATOS = [
  { value: "SOLO" as const, label: "Solo" },
  { value: "PAREJA" as const, label: "Pareja" },
  { value: "FAMILIA" as const, label: "Familia" },
  { value: "AMIGOS" as const, label: "Amigos" },
  { value: "EQUIPO_DEPORTIVO" as const, label: "Equipo Deportivo" },
  { value: "CORPORATIVO" as const, label: "Corporativo" },
];

export const MODALITIES = [
  {
    value: "PRACTICAR" as const,
    label: "Practicar",
    description: "Perfeccionar la tecnica",
  },
  {
    value: "COMPETIR" as const,
    label: "Competir",
    description: "Desafiar los limites",
  },
  {
    value: "PRESENCIAR" as const,
    label: "Presenciar",
    description: "Vivir la pasion",
  },
];

export const WHATSAPP_NUMBER = "5411153774567";
export const WHATSAPP_BASE_URL = "https://wa.me/";

export const CONTACT_EMAIL = "contacto@vaturismodeportivo.com";
export const SITE_NAME = "VA Turismo Deportivo";
