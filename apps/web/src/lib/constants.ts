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
  {
    value: "LIFESTYLE" as const,
    label: "Lifestyle",
    description: "En pareja, en familia o con amigos.",
  },
  {
    value: "CORPORATIVO" as const,
    label: "Corporativo",
    description: "Empresas, marcas y grupos corporativos.",
  },
  {
    value: "EQUIPOS" as const,
    label: "Equipos",
    description: "Equipos, delegaciones y grupos deportivos.",
  },
];

export const MODALITIES = [
  {
    value: "PRACTICAR" as const,
    label: "Practicar",
    description: "Perfeccionar la tecnica",
  },
  {
    value: "COMPETIR" as const,
    label: "Participar",
    description: "Desafiar los limites",
  },
  {
    value: "PRESENCIAR" as const,
    label: "Presenciar",
    description: "Vivir la pasion",
  },
];

export const MONTHS = [
  { value: "1", label: "Enero" },
  { value: "2", label: "Febrero" },
  { value: "3", label: "Marzo" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Mayo" },
  { value: "6", label: "Junio" },
  { value: "7", label: "Julio" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

export const WHATSAPP_NUMBER = "5411153774567";
export const WHATSAPP_BASE_URL = "https://wa.me/";

export const CONTACT_EMAIL = "contacto@vaturismodeportivo.com";
export const SITE_NAME = "VA Turismo Deportivo";
