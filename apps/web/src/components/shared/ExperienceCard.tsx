import Image from "next/image";
import Link from "next/link";
import type { Experience, Discipline } from "@prisma/client";

const modalityLabels: Record<string, string> = {
  PRACTICAR: "Practicar",
  COMPETIR: "Competir",
  PRESENCIAR: "Presenciar",
};

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

type ExperienceWithDiscipline = Experience & { discipline: Discipline };

export function ExperienceCard({
  experience,
}: {
  experience: ExperienceWithDiscipline;
}) {
  const imageUrl = experience.imageUrls[0];

  return (
    <Link
      href={`/experiencias/${experience.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={experience.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-navy-100 flex items-center justify-center">
            <span className="text-navy-300 text-4xl">🏔</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-navy-700/80 text-white font-medium backdrop-blur-sm">
            {countryLabels[experience.country]}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gold-400/90 text-navy-900 font-medium backdrop-blur-sm">
            {modalityLabels[experience.modality]}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs text-gold-500 font-semibold uppercase tracking-wider mb-1">
          {experience.discipline.name}
        </p>
        <h3 className="font-heading text-xl font-semibold text-navy-700 mb-2 group-hover:text-gold-500 transition-colors">
          {experience.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{experience.location}</p>
        {experience.priceInfo && (
          <p className="text-sm font-semibold text-navy-600">
            {experience.priceInfo}
          </p>
        )}
      </div>
    </Link>
  );
}
