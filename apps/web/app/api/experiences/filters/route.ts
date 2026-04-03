import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Country, City, Modality, Formato, Prisma } from "@prisma/client";

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

const cityLabels: Record<string, string> = {
  BUENOS_AIRES: "Buenos Aires",
  BARILOCHE: "Bariloche",
  CORDOBA: "Córdoba",
  LOS_ROQUES: "Los Roques",
  MARGARITA: "Margarita",
  LA_GRAN_SABANA: "La Gran Sabana",
};

const cityToCountry: Record<string, string> = {
  BUENOS_AIRES: "ARGENTINA",
  BARILOCHE: "ARGENTINA",
  CORDOBA: "ARGENTINA",
  LOS_ROQUES: "VENEZUELA",
  MARGARITA: "VENEZUELA",
  LA_GRAN_SABANA: "VENEZUELA",
};

const modalityLabels: Record<string, string> = {
  PRACTICAR: "Practicar",
  COMPETIR: "Competir",
  PRESENCIAR: "Presenciar",
};

const formatoLabels: Record<string, string> = {
  SOLO: "Solo",
  PAREJA: "Pareja",
  FAMILIA: "Familia",
  AMIGOS: "Amigos",
  EQUIPO_DEPORTIVO: "Equipo Deportivo",
  CORPORATIVO: "Corporativo",
};

const monthLabels: Record<number, string> = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

function parseDestino(destino: string | null) {
  if (!destino) return {};
  if (destino.includes(":")) {
    const [country, city] = destino.split(":");
    return { country: country as Country, city: city as City };
  }
  return { country: destino as Country };
}

function buildWhere(
  params: {
    destino?: string | null;
    formato?: string | null;
    modality?: string | null;
    discipline?: string | null;
    month?: string | null;
  },
  exclude?: string
): Prisma.ExperienceWhereInput {
  const where: Prisma.ExperienceWhereInput = { published: true };

  if (exclude !== "destino" && params.destino) {
    const { country, city } = parseDestino(params.destino);
    if (country) where.country = country;
    if (city) where.city = city;
  }

  if (exclude !== "formato" && params.formato) {
    where.formato = params.formato as Formato;
  }

  if (exclude !== "modality" && params.modality) {
    where.modality = params.modality as Modality;
  }

  if (exclude !== "discipline" && params.discipline) {
    where.discipline = { slug: params.discipline };
  }

  if (exclude !== "month" && params.month) {
    const m = parseInt(params.month);
    const year = new Date().getFullYear();
    where.startDate = {
      gte: new Date(year, m - 1, 1),
      lt: new Date(year, m, 1),
    };
  }

  return where;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = {
    destino: searchParams.get("destino"),
    formato: searchParams.get("formato"),
    modality: searchParams.get("modality"),
    discipline: searchParams.get("discipline"),
    month: searchParams.get("month"),
  };

  // Run all groupBy queries in parallel
  const [
    countryCounts,
    cityCounts,
    formatoCounts,
    modalityCounts,
    disciplineCounts,
    monthExperiences,
    allDisciplines,
  ] = await Promise.all([
    // Destino: group by country (exclude destino filter)
    prisma.experience.groupBy({
      by: ["country"],
      where: buildWhere(params, "destino"),
      _count: true,
    }),
    // Destino: group by country+city (exclude destino filter)
    prisma.experience.groupBy({
      by: ["country", "city"],
      where: { ...buildWhere(params, "destino"), city: { not: null } },
      _count: true,
    }),
    // Formato (exclude formato filter)
    prisma.experience.groupBy({
      by: ["formato"],
      where: { ...buildWhere(params, "formato"), formato: { not: null } },
      _count: true,
    }),
    // Modality (exclude modality filter)
    prisma.experience.groupBy({
      by: ["modality"],
      where: buildWhere(params, "modality"),
      _count: true,
    }),
    // Discipline (exclude discipline filter)
    prisma.experience.groupBy({
      by: ["disciplineId"],
      where: buildWhere(params, "discipline"),
      _count: true,
    }),
    // Month: fetch startDates (exclude month filter)
    prisma.experience.findMany({
      where: {
        ...buildWhere(params, "month"),
        startDate: { not: null },
      },
      select: { startDate: true },
    }),
    // All disciplines for name lookup
    prisma.discipline.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
    }),
  ]);

  // Build destino groups
  const countryCountMap = new Map(
    countryCounts.map((c) => [c.country, c._count])
  );
  const cityCountMap = new Map(
    cityCounts
      .filter((c) => c.city)
      .map((c) => [`${c.country}:${c.city}`, c._count])
  );

  const destinos = (["ARGENTINA", "VENEZUELA"] as const)
    .map((country) => {
      const countryCount = countryCountMap.get(country) || 0;
      const cities = Object.entries(cityToCountry)
        .filter(([, c]) => c === country)
        .map(([city]) => ({
          value: `${country}:${city}`,
          label: `${cityLabels[city]} (${cityCountMap.get(`${country}:${city}`) || 0})`,
          count: cityCountMap.get(`${country}:${city}`) || 0,
        }))
        .filter((c) => c.count > 0);

      return {
        label: `${countryLabels[country]} (${countryCount})`,
        value: country,
        options: cities,
        count: countryCount,
      };
    })
    .filter((g) => g.count > 0);

  // Build formato options
  const formatos = formatoCounts
    .map((f) => ({
      value: f.formato!,
      label: `${formatoLabels[f.formato!] || f.formato} (${f._count})`,
      count: f._count,
    }))
    .filter((f) => f.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label));

  // Build modality options
  const modalityOrder = ["PRACTICAR", "COMPETIR", "PRESENCIAR"];
  const modalities = modalityCounts
    .map((m) => ({
      value: m.modality,
      label: `${modalityLabels[m.modality]} (${m._count})`,
      count: m._count,
    }))
    .filter((m) => m.count > 0)
    .sort(
      (a, b) => modalityOrder.indexOf(a.value) - modalityOrder.indexOf(b.value)
    );

  // Build discipline options
  const discMap = new Map(allDisciplines.map((d) => [d.id, d]));
  const disciplines = disciplineCounts
    .map((d) => {
      const disc = discMap.get(d.disciplineId);
      return disc
        ? {
            value: disc.slug,
            label: `${disc.name} (${d._count})`,
            count: d._count,
          }
        : null;
    })
    .filter((d): d is NonNullable<typeof d> => d !== null && d.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label));

  // Build month options
  const monthCountMap = new Map<number, number>();
  for (const exp of monthExperiences) {
    if (exp.startDate) {
      const m = exp.startDate.getMonth() + 1;
      monthCountMap.set(m, (monthCountMap.get(m) || 0) + 1);
    }
  }
  const months = Array.from(monthCountMap.entries())
    .map(([m, count]) => ({
      value: String(m),
      label: `${monthLabels[m]} (${count})`,
      count,
    }))
    .filter((m) => m.count > 0)
    .sort((a, b) => parseInt(a.value) - parseInt(b.value));

  return NextResponse.json({
    destinos,
    formatos,
    modalities,
    disciplines,
    months,
  });
}
