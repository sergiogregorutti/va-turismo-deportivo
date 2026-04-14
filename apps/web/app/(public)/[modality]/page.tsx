import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import type { Metadata } from "next";
import type { Modality } from "@prisma/client";

const MODALITY_DATA: Record<
  string,
  {
    title: string;
    prismaModality: Modality;
    tagline: string;
    heroDescription: string;
    description: string[];
    highlights: { title: string; text: string }[];
    gradient: string;
    ctaLabel: string;
    whatsappMessage: string;
    metaDescription: string;
  }
> = {
  practicar: {
    title: "Practicar",
    prismaModality: "PRACTICAR",
    tagline: "Perfeccionar la tecnica",
    heroDescription:
      "Experiencias disenadas para quienes quieren aprender, mejorar y dominar una disciplina deportiva con la guia de profesionales.",
    description: [
      "Practicar es mucho mas que repetir un movimiento. Es sumergirse en una disciplina deportiva con el objetivo de crecer, mejorar y superar tus propios limites tecnicos. En VA Turismo Deportivo disenamos experiencias que combinan la practica deportiva con destinos increibles, para que cada sesion de entrenamiento sea tambien una aventura.",
      "Nuestras experiencias de practica incluyen acceso a instalaciones de primer nivel, equipamiento profesional y la guia de instructores y coaches con anos de experiencia. Ya sea que estes dando tus primeros pasos en un deporte o que busques perfeccionar tu tecnica, tenemos la experiencia ideal para vos.",
      "Imaginate esquiar en las mejores pistas de Bariloche con un instructor dedicado, hacer buceo en aguas cristalinas con guias certificados, o perfeccionar tu swing de golf en campos de clase mundial. Cada experiencia esta pensada para que progreses mientras disfrutas del viaje.",
    ],
    highlights: [
      {
        title: "Instructores profesionales",
        text: "Coaches certificados y con experiencia internacional en cada disciplina",
      },
      {
        title: "Instalaciones de primer nivel",
        text: "Acceso a los mejores centros deportivos y campos de entrenamiento",
      },
      {
        title: "Programas personalizados",
        text: "Planes adaptados a tu nivel, desde principiante hasta avanzado",
      },
      {
        title: "Destinos unicos",
        text: "Practicar tu deporte favorito en los escenarios mas espectaculares",
      },
    ],
    gradient: "from-blue-900/80 to-blue-700/60",
    ctaLabel: "Ver experiencias para Practicar",
    whatsappMessage:
      "Hola! Me interesan las experiencias de practica deportiva. Quiero mas informacion.",
    metaDescription:
      "Descubri experiencias deportivas para practicar y perfeccionar tu tecnica con instructores profesionales en destinos increibles.",
  },
  participar: {
    title: "Participar",
    prismaModality: "COMPETIR",
    tagline: "Desafiar los limites",
    heroDescription:
      "Para quienes buscan poner a prueba su preparacion en competencias organizadas, carreras y desafios deportivos alrededor del mundo.",
    description: [
      "Competir es la esencia del espiritu deportivo. Es poner a prueba todo lo que entrenaste, superar tus marcas personales y vivir la adrenalina de medirte con otros atletas. En VA Turismo Deportivo organizamos tu experiencia completa para que solo tengas que concentrarte en dar lo mejor de vos.",
      "Nos encargamos de toda la logistica: inscripcion a la competencia, traslados, alojamiento, y todo lo necesario para que llegues en las mejores condiciones al dia de la carrera o el evento. Ademas, complementamos la experiencia competitiva con actividades turisticas para que conozcas el destino.",
      "Desde maratones en las grandes ciudades hasta travesias de trekking en la Patagonia, pasando por triatlones y carreras de aventura, tenemos opciones para todos los niveles competitivos. Si tu pasion es desafiarte, nosotros te llevamos.",
    ],
    highlights: [
      {
        title: "Logistica completa",
        text: "Inscripcion, traslados, alojamiento y todo resuelto para el dia de la competencia",
      },
      {
        title: "Competencias de primer nivel",
        text: "Acceso a las mejores carreras y eventos deportivos de Latinoamerica y el mundo",
      },
      {
        title: "Preparacion integral",
        text: "Asesoramiento sobre entrenamiento previo y condiciones del evento",
      },
      {
        title: "Experiencia completa",
        text: "Combinamos la competencia con turismo y actividades en el destino",
      },
    ],
    gradient: "from-amber-900/80 to-amber-700/60",
    ctaLabel: "Ver experiencias para Participar",
    whatsappMessage:
      "Hola! Me interesan las experiencias de competencia deportiva. Quiero mas informacion.",
    metaDescription:
      "Participa en las mejores competencias deportivas con logistica completa. Maratones, triatlones, trekking y mas.",
  },
  presenciar: {
    title: "Presenciar",
    prismaModality: "PRESENCIAR",
    tagline: "Vivir la pasion",
    heroDescription:
      "Vivi la emocion de los grandes eventos deportivos como espectador VIP, con acceso exclusivo y experiencias premium.",
    description: [
      "Presenciar un evento deportivo en vivo es una experiencia que no se compara con nada. La energia del estadio, la pasion de la hinchada, y la emocion de ver a los mejores atletas del mundo en accion. En VA Turismo Deportivo te acercamos a esos momentos inolvidables con experiencias premium.",
      "Ofrecemos acceso VIP a los eventos deportivos mas importantes: desde partidos de futbol en los estadios mas emblematicos, hasta jornadas de polo en Palermo y torneos de tenis de nivel internacional. Cada experiencia incluye entradas premium, hospitality, y servicios exclusivos.",
      "No se trata solo de ver un partido o un evento. Se trata de vivir la experiencia completa: conocer los bastidores, disfrutar de la gastronomia local, compartir con otros apasionados del deporte y llevarte recuerdos que duran toda la vida.",
    ],
    highlights: [
      {
        title: "Acceso VIP y premium",
        text: "Entradas preferenciales, palcos y experiencias exclusivas en cada evento",
      },
      {
        title: "Hospitality de primer nivel",
        text: "Gastronomia, bebidas y atencion personalizada durante el evento",
      },
      {
        title: "Eventos de clase mundial",
        text: "Futbol, polo, tenis y mas en los escenarios mas importantes",
      },
      {
        title: "Experiencia integral",
        text: "Combinamos el evento con turismo, gastronomia y cultura del destino",
      },
    ],
    gradient: "from-green-900/80 to-green-700/60",
    ctaLabel: "Ver experiencias para Presenciar",
    whatsappMessage:
      "Hola! Me interesan las experiencias para presenciar eventos deportivos. Quiero mas informacion.",
    metaDescription:
      "Vivi los mejores eventos deportivos con acceso VIP. Futbol, polo, tenis y mas con experiencias premium.",
  },
};

const VALID_MODALITIES = Object.keys(MODALITY_DATA);

export function generateStaticParams() {
  return VALID_MODALITIES.map((modality) => ({ modality }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modality: string }>;
}): Promise<Metadata> {
  const { modality } = await params;
  const data = MODALITY_DATA[modality];
  if (!data) return { title: "Pagina no encontrada" };

  return {
    title: `${data.title} | VA Turismo Deportivo`,
    description: data.metaDescription,
  };
}

export default async function ModalityPage({
  params,
}: {
  params: Promise<{ modality: string }>;
}) {
  const { modality } = await params;
  const data = MODALITY_DATA[modality];

  if (!data) notFound();

  const [disciplines, experiences] = await Promise.all([
    prisma.discipline.findMany({
      where: {
        modalities: { has: data.prismaModality },
        experiences: {
          some: { published: true, modality: data.prismaModality },
        },
      },
      orderBy: { name: "asc" },
    }),
    prisma.experience.findMany({
      where: { published: true, modality: data.prismaModality },
      include: { discipline: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="bg-white">
      {/* Hero/Header */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
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
              {data.description.map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights Card */}
            <div className="lg:col-span-2">
              <div className="bg-navy-700 rounded-2xl p-8 text-white sticky top-28">
                <h3 className="font-heading text-xl font-bold mb-6">
                  ¿Por que {data.title.toLowerCase()} con nosotros?
                </h3>
                <ul className="space-y-4">
                  {data.highlights.map((item, i) => (
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
                  href={`/experiencias?modality=${data.prismaModality}&discipline=${discipline.slug}`}
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
                href={`/experiencias?modality=${data.prismaModality}`}
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
              href={`/experiencias?modality=${data.prismaModality}`}
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
            href={getWhatsAppUrl(WHATSAPP_NUMBER, data.whatsappMessage)}
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
