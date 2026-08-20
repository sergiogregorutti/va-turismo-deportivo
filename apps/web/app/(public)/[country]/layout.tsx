import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isCountrySlug } from "@/lib/country";
import { getEnabledCountries, getSettings } from "@/lib/settings";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountrySlug(country)) notFound();

  const [settings, enabledCountries] = await Promise.all([
    getSettings(),
    getEnabledCountries(),
  ]);

  // Pais apagado desde el admin: mandamos al primero habilitado en vez de 404,
  // asi tampoco quedamos en loop con la cookie de pais del middleware
  if (!enabledCountries.includes(country)) {
    redirect(`/${enabledCountries[0]}`);
  }

  return (
    <>
      <Header country={country} countries={enabledCountries} />
      <main className="min-h-screen">{children}</main>
      <Footer
        country={country}
        countries={enabledCountries}
        whatsappNumber={settings.whatsapp_number}
        whatsappDisplay={settings.whatsapp_display}
        contactEmail={settings.contact_email}
      />
    </>
  );
}
