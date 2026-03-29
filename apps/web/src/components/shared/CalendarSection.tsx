import Link from "next/link";

interface Experience {
  id: string;
  title: string;
  slug: string;
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

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

export function CalendarSection({ experiences }: CalendarSectionProps) {
  const upcomingExperiences = experiences
    .filter((e) => e.startDate)
    .sort(
      (a, b) =>
        new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime()
    );

  const grouped = upcomingExperiences.reduce(
    (acc, exp) => {
      const date = new Date(exp.startDate!);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!acc[key]) {
        acc[key] = {
          month: monthNames[date.getMonth()],
          year: date.getFullYear(),
          experiences: [],
        };
      }
      acc[key].experiences.push(exp);
      return acc;
    },
    {} as Record<
      string,
      { month: string; year: number; experiences: Experience[] }
    >
  );

  const months = Object.values(grouped);

  if (months.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-700 text-center mb-4">
          Calendario de Experiencias
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Competencias, eventos y actividades organizadas por fecha
        </p>

        <div className="space-y-8">
          {months.map((group) => (
            <div key={`${group.month}-${group.year}`}>
              <h3 className="font-heading text-2xl font-bold text-navy-700 mb-4 border-b border-gray-200 pb-2">
                {group.month} {group.year}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.experiences.map((exp) => {
                  const start = new Date(exp.startDate!);
                  const end = exp.endDate ? new Date(exp.endDate) : null;
                  return (
                    <Link
                      key={exp.id}
                      href={`/experiencias/${exp.slug}`}
                      className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-gold-400/50 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 text-center bg-navy-700 text-white rounded-lg px-3 py-2 min-w-[60px]">
                          <div className="text-2xl font-bold leading-tight">
                            {start.getDate()}
                          </div>
                          <div className="text-xs uppercase text-navy-200">
                            {monthNames[start.getMonth()].slice(0, 3)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-navy-700 group-hover:text-gold-500 transition-colors truncate">
                            {exp.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {exp.location}, {countryLabels[exp.country]}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className={`w-2 h-2 rounded-full ${modalityColors[exp.modality] || "bg-gray-400"}`}
                            />
                            <span className="text-xs text-gray-400">
                              {exp.discipline.name}
                            </span>
                            {end && (
                              <span className="text-xs text-gray-400">
                                &middot; hasta {end.getDate()}/
                                {end.getMonth() + 1}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
