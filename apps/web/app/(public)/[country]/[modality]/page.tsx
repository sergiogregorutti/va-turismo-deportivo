export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getWhatsAppUrl } from "@/lib/utils";
import { getSettings } from "@/lib/settings";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { countryFromSlug, isCountrySlug } from "@/lib/country";
import type { Metadata } from "next";

type ModalityHighlight = { title: string; text: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; modality: string }>;
}): Promise<Metadata> {
  const { modality } = await params;
  const data = await prisma.modalityPage.findUnique({
    where: { slug: modality },
  });
  if (!data) return { title: "Pagina no encontrada" };

  return {
    title: `${data.title} | VA Turismo Deportivo`,
    description: data.metaDescription,
  };
}

export default async function ModalityPage({
  params,
}: {
  params: Promise<{ country: string; modality: string }>;
}) {
  const { country, modality } = await params;
  if (!isCountrySlug(country)) notFound();

  const data = await prisma.modalityPage.findUnique({
    where: { slug: modality },
  });
  if (!data) notFound();

  const countryEnum = countryFromSlug(country);
  const base = `/${country}`;
  const paragraphs = data.description.split("\n\n").filter(Boolean);
  const highlights =
    (data.highlights as unknown as ModalityHighlight[]) || [];

  const [disciplines, experiences, settings] = await Promise.all([
    prisma.discipline.findMany({
      where: {
        modalities: { has: data.modality },
        experiences: {
          some: {
            published: true,
            modality: data.modality,
            country: countryEnum,
          },
        },
      },
      orderBy: { name: "asc" },
    }),
    prisma.experience.findMany({
      where: {
        published: true,
        modality: data.modality,
        country: countryEnum,
      },
      include: { discipline: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    getSettings(),
  ]);

  return (
    <div className="bg-white">
      {/* Hero/Header */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-navy-300 mb-6">
            <Link href={base} className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-white">{data.title}</span>
          </nav>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 uppercase tracking-wider">
            {data.title}
          </h1>
          <p className="text-gold-400 text-xl font-medium mb-4">
            {data.tagline}
          </p>
          <p className="text-navy-200 max-w-3xl text-lg">
            {data.heroDescription}
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Text Content */}
            <div className="lg:col-span-3 space-y-4">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights Card */}
            {highlights.length > 0 && (
              <div className="lg:col-span-2">
                <div className="bg-navy-700 rounded-2xl p-8 text-white sticky top-28">
                  <h3 className="font-heading text-xl font-bold mb-6">
                    ¿Por que {data.title.toLowerCase()} con nosotros?
                  </h3>
                  <ul className="space-y-4">
                    {highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-gold-400 text-lg mt-0.5">✓</span>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-navy-200 text-sm mt-1">
                            {item.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Disciplines */}
      {disciplines.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700 text-center mb-4">
              Disciplinas para {data.title}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Explora las disciplinas deportivas disponibles en esta modalidad
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {disciplines.map((discipline) => (
                <Link
                  key={discipline.id}
                  href={`${base}/experiencias?modality=${data.modality}&discipline=${discipline.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-gold-400/50 transition-all duration-300"
                >
                  <div className="relative h-40 bg-navy-100">
                    {discipline.imageUrl ? (
                      <Image
                        src={discipline.imageUrl}
                        alt={discipline.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-navy-50">
                        <span className="text-4xl">⚽</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-heading text-lg font-semibold text-navy-700 group-hover:text-gold-500 transition-colors">
                      {discipline.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Experiences */}
      {experiences.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700 text-center mb-4">
              Experiencias para {data.title}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Descubri las experiencias disponibles en esta modalidad
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>

            {/* CTA to filtered experiences */}
            <div className="text-center mt-12">
              <Link
                href={`${base}/experiencias?modality=${data.modality}`}
                className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                {data.ctaLabel}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA if no experiences yet */}
      {experiences.length === 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Link
              href={`${base}/experiencias?modality=${data.modality}`}
              className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              {data.ctaLabel}
            </Link>
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      <section className="bg-navy-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Queres {data.title.toLowerCase()} un deporte?
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            Consultanos por WhatsApp y armamos tu experiencia deportiva a medida
          </p>
          <a
            href={getWhatsAppUrl(settings.whatsapp_number, data.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultanos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
