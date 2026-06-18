export const dynamic = "force-dynamic";

import { getSettings } from "@/lib/settings";
import { ContactoForm } from "./ContactoForm";

export default async function ContactoPage() {
  const settings = await getSettings();

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

      <ContactoForm
        whatsappNumber={settings.whatsapp_number}
        whatsappDisplay={settings.whatsapp_display}
        contactEmail={settings.contact_email}
      />
    </div>
  );
}
