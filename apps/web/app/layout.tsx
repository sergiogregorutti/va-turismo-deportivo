import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VA Turismo Deportivo",
  description: "Turismo deportivo y aventura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
