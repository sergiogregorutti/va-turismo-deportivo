"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cityCountry, setCityCountry] = useState("");
  const [services, setServices] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, cityCountry, services, date, message }),
      });

      // Build WhatsApp message
      const parts = [`Hola! Soy ${name}.`];
      if (cityCountry) parts.push(`Ciudad/Pais: ${cityCountry}`);
      if (services) parts.push(`Servicios de interes: ${services}`);
      if (date) parts.push(`Fecha tentativa: ${date}`);
      if (message) parts.push(`Consulta: ${message}`);

      const whatsappUrl = getWhatsAppUrl(WHATSAPP_NUMBER, parts.join("\n"));
      window.open(whatsappUrl, "_blank");
    } catch {
      alert("Error al enviar. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Contacto
          </h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Realiza tu consulta y te responderemos a la brevedad
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-heading text-2xl font-bold text-navy-700 mb-6 uppercase">
                  Realiza tu consulta
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad / Pais
                    </label>
                    <input
                      type="text"
                      value={cityCountry}
                      onChange={(e) => setCityCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                      placeholder="Ej: Buenos Aires, Argentina"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servicios de interes
                    </label>
                    <input
                      type="text"
                      value={services}
                      onChange={(e) => setServices(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                      placeholder="Ej: Pases, Alojamiento, Equipos"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de actividad
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consulta adicional
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                      placeholder="Escribi aqui cualquier consulta adicional (equipo necesario, nivel de experiencia, alojamiento, etc.)..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {loading ? "Enviando..." : "Enviar por WhatsApp"}
                  </button>
                </form>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="font-heading text-xl font-bold text-navy-700 mb-4">
                  Informacion de contacto
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-navy-700 font-medium hover:text-gold-500 transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefono / WhatsApp</p>
                    <a
                      href={`tel:+${WHATSAPP_NUMBER}`}
                      className="text-navy-700 font-medium hover:text-gold-500 transition-colors"
                    >
                      +54 11 5377-4567
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-navy-700 rounded-2xl p-8 text-white">
                <h3 className="font-heading text-xl font-bold mb-6">
                  ¿Por que VA Turismo Deportivo?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg mt-0.5">✓</span>
                    <p className="text-navy-200 text-sm">
                      Experiencias curadas en Argentina y Venezuela
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg mt-0.5">✓</span>
                    <p className="text-navy-200 text-sm">
                      Atencion personalizada por WhatsApp
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg mt-0.5">✓</span>
                    <p className="text-navy-200 text-sm">
                      Fechas flexibles para tu conveniencia
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-400 text-lg mt-0.5">✓</span>
                    <p className="text-navy-200 text-sm">
                      Practicar, competir o presenciar: vos elegis
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
