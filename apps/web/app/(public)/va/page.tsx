import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TriadaCards, type TriadaItem } from "@/components/shared/TriadaCards";

export const metadata: Metadata = {
  title: "VA | VA Turismo Deportivo",
  description:
    "VA Turismo Deportivo: una plataforma curadora de experiencias deportivas y de viaje en Argentina, Venezuela y Latinoamerica. Conoce el modelo 3P y nuestros formatos de viaje.",
};

const triada3P: TriadaItem[] = [
  {
    title: "Practicar",
    description: "Aprender, entrenar, perfeccionarse",
    gradient: "from-blue-900/80 to-blue-700/60",
  },
  {
    title: "Participar",
    description:
      "Correr, jugar, desafiarse, sumarse a una prueba o travesia",
    gradient: "from-amber-900/80 to-amber-700/60",
  },
  {
    title: "Presenciar",
    description: "Asistir, vivir el evento, hospitality, VIP, fandom",
    gradient: "from-green-900/80 to-green-700/60",
  },
];

const formatos = [
  {
    title: "Lifestyle",
    description: "En pareja, en familia o con amigos.",
  },
  {
    title: "Corporativo",
    description: "Empresas, marcas y grupos corporativos.",
  },
  {
    title: "Equipos",
    description: "Equipos, delegaciones y grupos deportivos.",
  },
];

export default function VAPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            VA
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Turismo deportivo de autor
          </p>
        </div>
      </section>

      {/* VA Turismo Deportivo intro */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700 mb-6 text-center">
              VA Turismo Deportivo
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Somos una plataforma de experiencias deportivas y de viaje que
              conecta personas, familias, equipos y empresas con las mejores
              propuestas para vivir el deporte en Argentina, Venezuela y
              Latinoamerica. Disenamos y articulamos viajes a medida para
              practicar, participar o presenciar el deporte desde una mirada
              segura, premium y local: entrenamientos, competencias, eventos,
              hospitality, alojamiento, transporte y concierge. Nuestro
              proposito es transformar cada destino en una experiencia
              deportiva integral, combinando deporte, cultura, naturaleza y
              estilo de vida.
            </p>
          </div>
        </div>
      </section>

      {/* El modelo 3P de VA */}
      <section className="bg-navy-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white text-center mb-4">
            El modelo 3P de VA
          </h2>
          <p className="text-navy-300 text-center mb-12 max-w-2xl mx-auto">
            En VA tenemos tres formas de vivir el deporte:
            <br />
            <strong className="text-gold-400">
              Practicarlo, Participar en el o Presenciarlo
            </strong>
          </p>

          <TriadaCards items={triada3P} />
        </div>
      </section>

      {/* Formato de viaje */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-700 text-center mb-4">
            Formato de viaje
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            En VA disenamos propuestas para viajeros corporativos, equipos
            deportivos y experiencias lifestyle para parejas, familias y
            amigos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formatos.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center"
              >
                <h3 className="font-heading text-2xl font-bold text-navy-700 mb-3 uppercase tracking-wide">
                  {f.title}
                </h3>
                <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
                <p className="text-gray-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros (founder) */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <Image
                  src="/images/luismiguelcolmenares.png"
                  alt="Luis Miguel Colmenares"
                  width={500}
                  height={500}
                  className="w-full rounded-xl"
                />
                <div className="mt-6 text-center">
                  <h2 className="font-heading text-2xl font-bold text-navy-700">
                    Luis Miguel Colmenares
                  </h2>
                  <p className="text-gold-500 font-medium mt-1">
                    Fundador de VA Turismo Deportivo
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="font-heading text-2xl font-bold text-navy-700 mb-6 uppercase">
                  Nosotros
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  VA Turismo Deportivo nace de la vision de su fundador,{" "}
                  <strong className="text-navy-700">
                    Luis Miguel Colmenares
                  </strong>
                  , emprendedor, empresario y especialista en negocios
                  deportivos en Latinoamerica, con mas de 15 anos de
                  experiencia desarrollando proyectos, eventos y plataformas
                  vinculadas al deporte, la gestion y el entretenimiento. A lo
                  largo de su trayectoria ha impulsado iniciativas en
                  Argentina, Venezuela, Colombia, entre otros, combinando una
                  mirada estrategica del deporte como industria con una
                  profunda pasion por conectar personas, destinos y
                  experiencias. Desde esa vision, VA fue creada como una
                  plataforma curadora de turismo deportivo, pensada para
                  acercar a viajeros, familias, equipos, empresas y fanaticos
                  a las mejores experiencias deportivas de la region, con
                  seguridad, criterio local y una ejecucion profesional.
                </p>
              </div>

              <div className="text-center lg:text-left">
                <Link
                  href="/contacto"
                  className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  Contactanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
