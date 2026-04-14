export interface CityHighlight {
  title: string;
  description: string;
}

export interface City {
  slug: string;
  name: string;
  province: string;
  country: string;
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
    image: "/images/destinos/Buenos Aires/6.jpg",
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
    image: "/images/home_hero/4.jpg",
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
    image: "/images/destinos/Mendoza/MENDOZA 2.jpg",
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
    slug: "fitz-roy",
    name: "Fitz Roy",
    province: "Santa Cruz",
    country: "Argentina",
    image: "/images/destinos/Fitz Roy/FITZ ROY.jpg",
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
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
