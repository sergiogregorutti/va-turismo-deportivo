import type { Metadata } from "next";
import { Teko, Inter } from "next/font/google";
import "./globals.css";

const teko = Teko({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-teko",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "VA Turismo Deportivo",
    template: "%s | VA Turismo Deportivo",
  },
  description:
    "Experiencias de turismo deportivo en Argentina y Venezuela. Practicar, participar y presenciar los mejores eventos deportivos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${teko.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
