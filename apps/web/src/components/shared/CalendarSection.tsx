import Image from "next/image";
import Link from "next/link";

interface Experience {
  id: string;
  title: string;
  slug: string;
  imageUrls: string[];
  startDate: Date | null;
  endDate: Date | null;
  country: string;
  location: string;
  modality: string;
  discipline: { name: string };
}

interface CalendarSectionProps {
  experiences: Experience[];
}

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const modalityColors: Record<string, string> = {
  PRACTICAR: "bg-blue-500",
  COMPETIR: "bg-amber-500",
  PRESENCIAR: "bg-green-500",
};

const modalityLabels: Record<string, string> = {
  PRACTICAR: "Practicar",
  COMPETIR: "Competir",
  PRESENCIAR: "Presenciar",
};

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

export function CalendarSection({ experiences }: CalendarSectionProps) {
  // Group experiences by month, sorted chronologically
  const grouped = experiences
    .filter((e) => e.startDate)
    .sort(
      (a, b) =>
        new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime()
    )
    .reduce(
      (acc, exp) => {
        const date = new Date(exp.startDate!);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (!acc[key]) {
          acc[key] = {
            month: date.getMonth(),
            year: date.getFullYear(),
            label: monthNames[date.getMonth()],
            experiences: [],
          };
        }
        acc[key].experiences.push(exp);
        return acc;
      },
      {} as Record<
        string,
        {
          month: number;
          year: number;
          label: string;
          experiences: Experience[];
        }
      >
    );

  // Take the first 3 months that have experiences, max 4 per month
  const columns = Object.values(grouped)
    .slice(0, 3)
    .map((col) => ({
      ...col,
      experiences: col.experiences.slice(0, 4),
    }));

  if (columns.length === 0) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-700 text-center mb-4">
          Calendario de Experiencias
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Competencias, eventos y actividades organizadas por fecha
        </p>

        {/* 3-column layout: stacks on mobile, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={`${col.month}-${col.year}`}>
              {/* Month header */}
              <div className="bg-navy-700 rounded-t-xl px-5 py-3">
                <h3 className="font-heading text-xl font-bold text-white">
                  {col.label}{" "}
                  <span className="text-navy-300 font-normal">{col.year}</span>
                </h3>
              </div>

              {/* Events list */}
              <div className="bg-white rounded-b-xl border border-t-0 border-gray-100 divide-y divide-gray-100">
                {col.experiences.map((exp) => {
                    const start = new Date(exp.startDate!);
                    const end = exp.endDate ? new Date(exp.endDate) : null;
                    const imageUrl = exp.imageUrls?.[0];

                    return (
                      <Link
                        key={exp.id}
                        href={`/experiencias/${exp.slug}`}
                        className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group"
                      >
                        {/* Image */}
                        <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={exp.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="96px"
                            />
                          ) : (
                            <div className="w-full h-full bg-navy-100 flex items-center justify-center">
                              <span className="text-navy-300 text-2xl">
                                🏔
                              </span>
                            </div>
                          )}
                          {/* Date badge */}
                          <div className="absolute bottom-1 left-1 bg-navy-700/90 text-white text-xs font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                            {start.getDate()}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-navy-700 text-sm leading-tight group-hover:text-gold-500 transition-colors line-clamp-2">
                            {exp.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {exp.location},{" "}
                            {countryLabels[exp.country] || exp.country}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span
                              className={`w-2 h-2 rounded-full flex-shrink-0 ${modalityColors[exp.modality] || "bg-gray-400"}`}
                            />
                            <span className="text-xs text-gray-400">
                              {modalityLabels[exp.modality] || exp.modality}
                            </span>
                            {end && (
                              <span className="text-xs text-gray-400">
                                &middot; hasta {end.getDate()}/
                                {end.getMonth() + 1}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
