import type { Experience, Discipline } from "@prisma/client";
import { ExperienceCard } from "./ExperienceCard";

type ExperienceWithDiscipline = Experience & { discipline: Discipline };

// Rotating heights so cards in each column stagger vertically
const imageHeights = ["h-80", "h-52", "h-64", "h-44", "h-72", "h-56"];

export function FeaturedExperiencesGrid({
  experiences,
}: {
  experiences: ExperienceWithDiscipline[];
}) {
  if (experiences.length === 0) return null;

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
      {experiences.map((exp, i) => (
        <div key={exp.id} className="break-inside-avoid mb-6">
          <ExperienceCard
            experience={exp}
            imageHeightClass={imageHeights[i % imageHeights.length]}
          />
        </div>
      ))}
    </div>
  );
}
