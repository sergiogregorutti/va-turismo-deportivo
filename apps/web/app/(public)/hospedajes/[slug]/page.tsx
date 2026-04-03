import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { HospedajeCard } from "@/components/shared/HospedajeCard";
import type { Metadata } from "next";

const countryLabels: Record<string, string> = {
  ARGENTINA: "Argentina",
  VENEZUELA: "Venezuela",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hospedaje = await prisma.hospedaje.findUnique({
    where: { slug },
  });

  if (!hospedaje) return { title: "Hospedaje no encontrado" };

  return {
    title: hospedaje.title,
    description: hospedaje.description.substring(0, 160),
    openGraph: {
      title: hospedaje.title,
      description: hospedaje.description.substring(0, 160),
      images: hospedaje.imageUrls[0] ? [hospedaje.imageUrls[0]] : [],
    },
  };
}

export default async function HospedajeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const hospedaje = await prisma.hospedaje.findUnique({
    where: { slug, published: true },
  });

  if (!hospedaje) notFound();

  const relatedHospedajes = await prisma.hospedaje.findMany({
    where: {
      published: true,
      id: { not: hospedaje.id },
    },
    take: 3,
  });

  const whatsappMessage = `Hola! Me interesa el hospedaje: ${hospedaje.title} en ${hospedaje.location}`;

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] bg-navy-900">
        {hospedaje.imageUrls[0] && (
          <Image
            src={hospedaje.imageUrls[0]}
            alt={hospedaje.title}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-4 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link
                href="/hospedajes"
                className="hover:text-white transition-colors"
              >
                Hospedaje
              </Link>
              <span>/</span>
              <span className="text-white">{hospedaje.title}</span>
            </nav>

            <div className="flex gap-3 mb-4 flex-wrap">
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm">
                {countryLabels[hospedaje.country]}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-gold-400/90 text-navy-900 font-medium">
                Hospedaje
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {hospedaje.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {hospedaje.description.split("\n").map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Image Gallery */}
            {hospedaje.imageUrls.length > 1 && (
              <div className="mt-10">
                <h3 className="font-heading text-2xl font-semibold text-navy-700 mb-6">
                  Galeria
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hospedaje.imageUrls.slice(1).map((url, i) => (
                    <div
                      key={i}
                      className="relative h-48 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={url}
                        alt={`${hospedaje.title} - Imagen ${i + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-28 space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Ubicacion</p>
                <p className="font-semibold text-navy-700">
                  {hospedaje.location}
                </p>
              </div>

              {hospedaje.priceInfo && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Precio</p>
                  <p className="font-heading text-2xl font-bold text-gold-500">
                    {hospedaje.priceInfo}
                  </p>
                </div>
              )}

              <a
                href={getWhatsAppUrl(WHATSAPP_NUMBER, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedHospedajes.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-bold text-navy-700 mb-8">
              Otros Hospedajes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedHospedajes.map((h) => (
                <HospedajeCard key={h.id} hospedaje={h} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
