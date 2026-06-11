import type { CountrySlug } from "@/lib/country";

export interface CityHighlight {
  title: string;
  description: string;
}

export interface City {
  slug: string;
  name: string;
  province: string;
  country: string;
  countrySlug: CountrySlug;
  image: string;
  tagline: string;
  intro: string;
  about: string;
  climate: string;
  bestSeasons: string[];
  sports: string[];
  highlights: CityHighlight[];
  gettingThere: string;
}

export const cities: City[] = [
  {
    slug: "buenos-aires",
    name: "Buenos Aires",
    province: "Ciudad Autónoma de Buenos Aires",
    country: "Argentina",
    countrySlug: "argentina",
    image: "/images/destinos/Buenos Aires/Destino Buenos Aires.png",
    tagline: "La capital del fútbol y la pasión deportiva",
    intro:
      "Cuna de clubes legendarios, estadios míticos y la cultura futbolera más intensa del mundo. Buenos Aires combina la mística del deporte rey con polo de nivel mundial, tenis, rugby y una agenda de eventos internacionales durante todo el año.",
    about:
      "Buenos Aires es la puerta de entrada al turismo deportivo en Argentina. La ciudad respira fútbol: La Bombonera, el Monumental y decenas de estadios reciben partidos cada semana. A esto se suma el Abierto Argentino de Polo en Palermo, torneos ATP en el Buenos Aires Lawn Tennis Club, maratones internacionales y una escena de rugby con los mejores clubes del país. Vivir un partido como local, acceder a tours VIP y combinar deporte con la mejor gastronomía, tango y vida nocturna es parte de la experiencia.",
    climate:
      "Templado todo el año. Veranos calurosos y húmedos (diciembre a febrero), inviernos suaves (junio a agosto). Primavera y otoño son ideales para actividades al aire libre.",
    bestSeasons: ["Marzo", "Abril", "Mayo", "Septiembre", "Octubre", "Noviembre"],
    sports: ["Fútbol", "Polo", "Tenis", "Rugby", "Maratón", "Hipismo"],
    highlights: [
      {
        title: "Superclásico en La Bombonera o el Monumental",
        description:
          "Vivir un Boca vs River desde las plateas es una de las experiencias deportivas más intensas del planeta.",
      },
      {
        title: "Abierto Argentino de Polo",
        description:
          "Cada noviembre y diciembre, Palermo reúne a los mejores polistas del mundo en la catedral del polo.",
      },
      {
        title: "Maratón Internacional de Buenos Aires",
        description:
          "Una de las maratones más convocantes de Sudamérica, con circuito urbano que atraviesa los barrios icónicos.",
      },
      {
        title: "Argentina Open de Tenis",
        description:
          "Torneo ATP sobre polvo de ladrillo en el histórico Buenos Aires Lawn Tennis Club.",
      },
    ],
    gettingThere:
      "Aeropuerto Internacional Ezeiza (EZE) y Aeroparque Jorge Newbery (AEP). Conexiones directas desde toda América, Europa y principales ciudades del mundo.",
  },
  {
    slug: "bariloche",
    name: "Bariloche",
    province: "Río Negro",
    country: "Argentina",
    countrySlug: "argentina",
    image: "/images/destinos/Bariloche/Destino Bariloche.png",
    tagline: "El corazón de la Patagonia deportiva",
    intro:
      "Enclavada entre el lago Nahuel Huapi y la cordillera de los Andes, Bariloche es el destino por excelencia para deportes de montaña. Cerro Catedral, trail running, trekking, kayak y pesca con mosca en un entorno de naturaleza imponente.",
    about:
      "San Carlos de Bariloche es la capital del turismo aventura en la Patagonia argentina. En invierno, el Cerro Catedral se transforma en el centro de esquí más grande de Sudamérica, con pistas para todos los niveles y después-ski de primer nivel. En verano, los senderos del Parque Nacional Nahuel Huapi reciben trail runners y trekkers de todo el mundo para competencias míticas como el Patagonia Run. Kayak, pesca deportiva, mountain bike y escalada completan una propuesta deportiva de 365 días.",
    climate:
      "Frío y nevado en invierno (junio a septiembre), con mínimas bajo cero en altura. Verano templado y seco (diciembre a febrero), ideal para trekking y deportes acuáticos.",
    bestSeasons: ["Junio", "Julio", "Agosto", "Septiembre", "Diciembre", "Enero", "Febrero"],
    sports: ["Esquí", "Snowboard", "Trail Running", "Trekking", "Kayak", "Pesca con mosca", "MTB"],
    highlights: [
      {
        title: "Cerro Catedral",
        description:
          "Más de 120 km de pistas, el centro de esquí más grande de Sudamérica con vistas al Nahuel Huapi.",
      },
      {
        title: "Patagonia Run",
        description:
          "Una de las carreras de trail más prestigiosas del mundo, con distancias de 10K a 160K por los Andes.",
      },
      {
        title: "Pesca con mosca",
        description:
          "Ríos y lagos patagónicos con truchas arcoíris y marrones de tamaño récord, temporada noviembre a abril.",
      },
      {
        title: "Circuito Chico en MTB",
        description:
          "Clásico recorrido de 65 km entre lagos, bosques y miradores con opciones para todos los niveles.",
      },
    ],
    gettingThere:
      "Aeropuerto Internacional Teniente Luis Candelaria (BRC), con vuelos diarios desde Buenos Aires y conexiones regionales.",
  },
  {
    slug: "mendoza",
    name: "Mendoza",
    province: "Mendoza",
    country: "Argentina",
    countrySlug: "argentina",
    image: "/images/destinos/Mendoza/Destino Mendoza.png",
    tagline: "Deporte, vino y el Aconcagua de telón de fondo",
    intro:
      "Al pie del Aconcagua, la montaña más alta de América, Mendoza es sinónimo de montañismo, rafting, cicloturismo entre viñedos y un estilo de vida donde el deporte y el vino conviven naturalmente.",
    about:
      "Mendoza combina aventura de alta montaña con una de las regiones vitivinícolas más importantes del mundo. El Aconcagua (6.962 m) atrae a montañistas de todo el planeta entre diciembre y febrero. El río Mendoza ofrece rafting y kayak de clase III y IV. Los caminos entre bodegas de Luján de Cuyo y Valle de Uco son un paraíso para cicloturismo. A esto se suman esquí en Las Leñas y Penitentes, trekking en la Cordillera del Plata y una escena gastronómica premiada a nivel mundial.",
    climate:
      "Clima seco y soleado casi todo el año. Veranos calurosos (diciembre a febrero), inviernos fríos con nevadas en alta montaña (junio a agosto).",
    bestSeasons: ["Marzo", "Abril", "Octubre", "Noviembre", "Diciembre", "Enero", "Febrero"],
    sports: ["Montañismo", "Esquí", "Rafting", "Cicloturismo", "Trekking", "Parapente"],
    highlights: [
      {
        title: "Expedición al Aconcagua",
        description:
          "La cumbre más alta de América y del hemisferio sur. Expediciones de 14 a 20 días entre diciembre y febrero.",
      },
      {
        title: "Wine & Bike en Valle de Uco",
        description:
          "Circuitos en bicicleta entre bodegas de altura, con degustaciones y almuerzos maridados.",
      },
      {
        title: "Rafting en el Río Mendoza",
        description:
          "Bajadas de clase III y IV en un entorno árido espectacular, a 40 minutos de la ciudad.",
      },
      {
        title: "Esquí en Las Leñas",
        description:
          "Uno de los centros de esquí más desafiantes de Sudamérica, con nieve polvo y fuera de pista mítico.",
      },
    ],
    gettingThere:
      "Aeropuerto Internacional Gobernador Francisco Gabrielli (MDZ), con vuelos diarios desde Buenos Aires y conexiones a Chile.",
  },
  {
    slug: "el-chalten",
    name: "El Chaltén",
    province: "Santa Cruz",
    country: "Argentina",
    countrySlug: "argentina",
    image: "/images/destinos/El Chalten/Destino Chalten.png",
    tagline: "La catedral del trekking en la Patagonia",
    intro:
      "El Chaltén, a los pies del Cerro Fitz Roy, es la capital nacional del trekking. Senderos de clase mundial, escalada técnica en granito y paisajes glaciares únicos en el Parque Nacional Los Glaciares.",
    about:
      "El Cerro Fitz Roy (3.405 m) es uno de los íconos de la Patagonia y un símbolo para escaladores de todo el mundo. El pueblo de El Chaltén, fundado en 1985, es la base ideal para explorar senderos como la Laguna de los Tres, Laguna Torre o el mirador Loma del Pliegue Tumbado, todos gratuitos y con salida desde el centro del pueblo. Además del trekking, la zona ofrece escalada en roca de clase mundial, ice climbing en el Glaciar Grande, kayak en el lago Viedma y expediciones al Campo de Hielo Sur.",
    climate:
      "Patagónico extremo: vientos fuertes, clima cambiante. Mejor temporada de octubre a abril. En invierno muchos senderos cierran y el pueblo entra en temporada baja.",
    bestSeasons: ["Octubre", "Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
    sports: ["Trekking", "Escalada en roca", "Ice Climbing", "Kayak", "MTB"],
    highlights: [
      {
        title: "Trekking a Laguna de los Tres",
        description:
          "20 km ida y vuelta hasta el mirador del Fitz Roy, con la laguna turquesa y glaciar al pie de la pared.",
      },
      {
        title: "Escalada técnica en el Fitz Roy",
        description:
          "Vías míticas en granito de alta calidad, destino de escaladores top mundial desde los años 50.",
      },
      {
        title: "Laguna Torre y Glaciar Grande",
        description:
          "Trekking de 18 km con vista al Cerro Torre, uno de los picos más difíciles del mundo.",
      },
      {
        title: "Navegación por el Lago Viedma",
        description:
          "Excursiones al Glaciar Viedma con opción de ice trekking sobre el hielo milenario.",
      },
    ],
    gettingThere:
      "Aeropuerto de El Calafate (FTE) + 3 hs de traslado terrestre a El Chaltén. Vuelos diarios desde Buenos Aires.",
  },
  {
    slug: "los-roques",
    name: "Los Roques",
    province: "Dependencias Federales",
    country: "Venezuela",
    countrySlug: "venezuela",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600",
    tagline: "El paraíso caribeño de los deportes náuticos",
    intro:
      "Un archipiélago de más de 300 cayos e islas con aguas turquesas y arenas blancas. Los Roques es uno de los mejores destinos del mundo para kitesurf, pesca con mosca de macabí, buceo y vela en un parque nacional protegido.",
    about:
      "El Parque Nacional Archipiélago Los Roques es un santuario natural del Caribe venezolano. Sus lagunas de aguas cristalinas y vientos constantes lo convierten en un spot de clase mundial para kitesurf y windsurf, especialmente entre enero y agosto. Los flats de arena blanca atraen a pescadores con mosca de todo el planeta en busca del macabí (bonefish). A esto se suman arrecifes de coral para buceo y snorkel, travesías en velero entre cayos y una atmósfera de pueblo pesquero único en Gran Roque.",
    climate:
      "Tropical seco y soleado todo el año, con temperaturas entre 26°C y 32°C. Vientos alisios constantes de diciembre a agosto, ideales para deportes de vela.",
    bestSeasons: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"],
    sports: ["Kitesurf", "Windsurf", "Pesca con mosca", "Buceo", "Snorkel", "Vela"],
    highlights: [
      {
        title: "Kitesurf en los cayos",
        description:
          "Lagunas planas, vientos constantes y kilómetros de agua turquesa: condiciones de nivel mundial para todos los niveles.",
      },
      {
        title: "Pesca de macabí en los flats",
        description:
          "Uno de los mejores destinos del planeta para pesca con mosca de bonefish, con guías locales expertos.",
      },
      {
        title: "Buceo en arrecifes vírgenes",
        description:
          "Paredes de coral, pecios y una biodiversidad marina protegida dentro del parque nacional.",
      },
      {
        title: "Travesía en velero entre cayos",
        description:
          "Navegar de cayo en cayo, fondear en playas desiertas y vivir el Caribe en estado puro.",
      },
    ],
    gettingThere:
      "Vuelos desde Caracas (Aeropuerto de Maiquetía) al aeródromo de Gran Roque, en aviones regionales. Aproximadamente 40 minutos de vuelo.",
  },
  {
    slug: "margarita",
    name: "Margarita",
    province: "Nueva Esparta",
    country: "Venezuela",
    countrySlug: "venezuela",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600",
    tagline: "La perla del Caribe para el deporte y la playa",
    intro:
      "La isla de Margarita combina playas de clase mundial para windsurf y kitesurf con golf, pesca deportiva y una infraestructura turística completa. El Yaque es reconocida como una de las mejores playas de viento del planeta.",
    about:
      "Margarita es el destino deportivo más completo del Caribe venezolano. Playa El Yaque, con vientos constantes y agua a la cintura, es un spot legendario para windsurf y kitesurf que recibe riders de todo el mundo. La isla ofrece además campos de golf, pesca deportiva de altura (marlin, atún, dorado), surf en la costa norte y una oferta gastronómica y hotelera que permite combinar deporte con descanso en familia.",
    climate:
      "Tropical seco, soleado y ventoso la mayor parte del año, con temperaturas entre 25°C y 33°C. Los vientos más fuertes van de diciembre a julio.",
    bestSeasons: ["Diciembre", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    sports: ["Windsurf", "Kitesurf", "Golf", "Pesca deportiva", "Surf", "Vela"],
    highlights: [
      {
        title: "Windsurf y kite en El Yaque",
        description:
          "Una de las playas de viento más famosas del mundo: condiciones perfectas, escuelas y ambiente internacional.",
      },
      {
        title: "Pesca deportiva de altura",
        description:
          "Salidas en yate en busca de marlin azul y blanco, pez vela, atún y dorado en aguas caribeñas.",
      },
      {
        title: "Golf frente al mar",
        description:
          "Campos de golf con vistas al Caribe para combinar deporte y relax en un mismo viaje.",
      },
      {
        title: "Surf en Playa Parguito",
        description:
          "Las mejores olas de la isla en la costa norte, con escuelas y alquiler de tablas.",
      },
    ],
    gettingThere:
      "Aeropuerto Internacional del Caribe Santiago Mariño (PMV), con vuelos desde Caracas y conexiones internacionales. También ferry desde Puerto La Cruz y Cumaná.",
  },
  {
    slug: "la-gran-sabana",
    name: "La Gran Sabana",
    province: "Bolívar",
    country: "Venezuela",
    countrySlug: "venezuela",
    image:
      "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=1600",
    tagline: "Aventura entre tepuyes y saltos de agua milenarios",
    intro:
      "Un paisaje único en el planeta: mesetas de roca de dos mil millones de años, saltos de agua infinitos y sabanas abiertas. La Gran Sabana es el escenario de trekking, expediciones al Roraima y aventura 4x4 en el Parque Nacional Canaima.",
    about:
      "La Gran Sabana, dentro del Parque Nacional Canaima (Patrimonio de la Humanidad UNESCO), es uno de los destinos de aventura más impactantes de Sudamérica. El trekking al Monte Roraima —el tepuy que inspiró 'El Mundo Perdido'— es una expedición mítica de 6 a 8 días entre paisajes de otro planeta. La región ofrece además rutas 4x4 entre saltos de agua como Kamá Merú y Aponwao, kayak en ríos de aguas rojizas, y la posibilidad de sobrevolar el Salto Ángel, la caída de agua más alta del mundo.",
    climate:
      "Tropical de altura: días cálidos y noches frescas. Temporada seca de diciembre a abril (ideal para trekking), temporada de lluvias de mayo a noviembre (saltos en su máximo caudal).",
    bestSeasons: ["Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
    sports: ["Trekking", "Montañismo", "4x4 Adventure", "Kayak", "Ciclismo de montaña"],
    highlights: [
      {
        title: "Expedición al Monte Roraima",
        description:
          "Trekking de 6 a 8 días a la cima del tepuy más famoso del mundo, entre formaciones rocosas de otro planeta.",
      },
      {
        title: "Sobrevuelo del Salto Ángel",
        description:
          "La caída de agua más alta del mundo (979 m) vista desde el aire, una experiencia que corta la respiración.",
      },
      {
        title: "Ruta 4x4 de los saltos",
        description:
          "Recorrido por Kamá Merú, Aponwao y las quebradas de jaspe rojo de la sabana.",
      },
      {
        title: "Kayak en aguas de jaspe",
        description:
          "Remar en ríos de lecho rojizo único en el mundo, rodeado de tepuyes y sabana infinita.",
      },
    ],
    gettingThere:
      "Vuelos a Puerto Ordaz (PZO) y traslado terrestre por la Troncal 10 hacia Santa Elena de Uairén. Las expediciones parten desde San Francisco de Yuruaní.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByCountry(countrySlug: CountrySlug): City[] {
  return cities.filter((c) => c.countrySlug === countrySlug);
}
