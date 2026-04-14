import type { Experience, Discipline } from "@prisma/client";
import { ExperienceCard } from "./ExperienceCard";

type ExperienceWithDiscipline = Experience & { discipline: Discipline };

export function FeaturedExperiencesGrid({
  experiences,
}: {
  experiences: ExperienceWithDiscipline[];
}) {
  if (experiences.length === 0) return null;

  // Asymmetric layout needs at least 6 items at positions 0 and 2 as tall.
  // With fewer items, fall back to a uniform 3-col grid.
  const useAsymmetric = experiences.length >= 6;

  if (!useAsymmetric) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    );
  }

  const tallIndices = new Set([0, 2]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] gap-6">
      {experiences.slice(0, 6).map((exp, i) => {
        const isTall = tallIndices.has(i);
        return (
          <div
            key={exp.id}
            className={isTall ? "lg:row-span-2" : "lg:row-span-1"}
          >
            <ExperienceCard
              experience={exp}
              variant={isTall ? "tall" : "standard"}
            />
          </div>
        );
      })}
    </div>
  );
}
