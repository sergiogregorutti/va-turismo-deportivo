import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-heading text-8xl font-bold text-navy-200 mb-4">
          404
        </p>
        <h1 className="font-heading text-3xl font-bold text-navy-700 mb-4">
          Pagina no encontrada
        </h1>
        <p className="text-gray-500 mb-8">
          La pagina que buscas no existe o fue movida
        </p>
        <Link
          href="/"
          className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
