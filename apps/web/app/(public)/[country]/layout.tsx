import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isCountrySlug } from "@/lib/country";
import { getSettings } from "@/lib/settings";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountrySlug(country)) notFound();

  const settings = await getSettings();

  return (
    <>
      <Header country={country} />
      <main className="min-h-screen">{children}</main>
      <Footer
        country={country}
        whatsappNumber={settings.whatsapp_number}
        whatsappDisplay={settings.whatsapp_display}
        contactEmail={settings.contact_email}
      />
    </>
  );
}
