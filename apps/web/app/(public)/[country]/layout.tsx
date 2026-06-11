import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { COUNTRY_SLUGS, isCountrySlug } from "@/lib/country";

export function generateStaticParams() {
  return COUNTRY_SLUGS.map((country) => ({ country }));
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountrySlug(country)) notFound();

  return (
    <>
      <Header country={country} />
      <main className="min-h-screen">{children}</main>
      <Footer country={country} />
    </>
  );
}
