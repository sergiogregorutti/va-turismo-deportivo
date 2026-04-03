import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | VA Turismo Deportivo",
  description:
    "Conoce a Luis Miguel Colmenares, fundador de VA Turismo Deportivo. Mas de 15 anos de experiencia en la industria deportiva de Latinoamerica.",
};

export default function NosotrosPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Nosotros
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            La pasion por el deporte hecha experiencia
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
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
                  Sobre Luis Miguel
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Ingeniero Industrial egresado de la Universidad Catolica
                    Andres Bello (UCAB) en Caracas, Venezuela, con posgrado en
                    Project Management y especializacion en Coaching. Luis Miguel
                    combina una solida formacion academica con una pasion
                    inquebrantable por el deporte.
                  </p>
                  <p>
                    Con mas de 15 anos de experiencia como emprendedor y mas de
                    una decada dedicada exclusivamente a la industria deportiva
                    en Latinoamerica, ha construido una amplia red de contactos
                    en Venezuela, Argentina, Colombia, Estados Unidos y China,
                    conectando a personas con experiencias deportivas unicas.
                  </p>
                  <p>
                    Su trayectoria emprendedora comenzo a los 19 anos, cuando
                    cofundo el primer equipo vehicular de Venezuela en competir
                    en las competencias de la SAE (Society of Automotive
                    Engineers) en Troy, Ohio, Estados Unidos. Desde entonces, no
                    ha dejado de innovar en el cruce entre deporte y negocios.
                  </p>
                  <p>
                    Actualmente radicado en Buenos Aires, Luis Miguel canaliza
                    toda su experiencia a traves de{" "}
                    <strong className="text-navy-700">
                      VA Turismo Deportivo
                    </strong>
                    , disenando experiencias personalizadas que combinan la
                    pasion por la competencia y la aventura con servicios de
                    primer nivel.
                  </p>
                </div>
              </div>

              <div className="bg-navy-700 rounded-2xl p-8 text-white">
                <h3 className="font-heading text-xl font-bold mb-6">
                  ¿Por que VA Turismo Deportivo?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">
                        +15 anos de experiencia emprendedora
                      </p>
                      <p className="text-navy-200 text-sm mt-1">
                        Trayectoria comprobada en la industria deportiva de
                        Latinoamerica
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">Red internacional de contactos</p>
                      <p className="text-navy-200 text-sm mt-1">
                        Conexiones en Venezuela, Argentina, Colombia, USA y China
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">Experiencias a medida</p>
                      <p className="text-navy-200 text-sm mt-1">
                        Viajes personalizados que combinan deporte, competencia y
                        aventura
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">
                        Especialista en turismo deportivo
                      </p>
                      <p className="text-navy-200 text-sm mt-1">
                        Practicar, competir o presenciar: de norte a sur
                      </p>
                    </div>
                  </li>
                </ul>
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
