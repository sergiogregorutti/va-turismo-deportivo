type Aliado = {
  name: string;
  tag?: string;
};

const ALIADOS: Aliado[] = [
  { name: "Sport Premium", tag: "Equipamiento" },
  { name: "Andes Club", tag: "Hospedaje" },
  { name: "Patagonia Travel", tag: "Tour Operator" },
  { name: "BA Sports", tag: "Eventos" },
  { name: "Latam Hotels", tag: "Hospedaje" },
  { name: "Aereo Elite", tag: "Transporte" },
  { name: "Events Pro", tag: "Hospitality" },
  { name: "Concierge Plus", tag: "Servicios" },
];

function AliadoBadge({ aliado }: { aliado: Aliado }) {
  return (
    <div className="shrink-0 flex flex-col items-center justify-center w-48 h-24 rounded-xl border border-gray-200 bg-white px-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:border-gold-400 transition-all">
      <p className="font-heading text-xl font-bold text-navy-700 uppercase tracking-wide leading-none">
        {aliado.name}
      </p>
      {aliado.tag && (
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">
          {aliado.tag}
        </p>
      )}
    </div>
  );
}

export function AliadosMarquee() {
  if (ALIADOS.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-700 mb-2">
          Nuestros aliados
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          Las marcas y organizaciones que respaldan cada experiencia VA
        </p>
      </div>

      <div className="marquee-container relative overflow-hidden">
        <div
          className="marquee-track flex gap-6"
          aria-hidden="false"
        >
          {ALIADOS.map((a, i) => (
            <AliadoBadge key={`a-${i}`} aliado={a} />
          ))}
          {ALIADOS.map((a, i) => (
            <AliadoBadge key={`b-${i}`} aliado={a} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent" />
      </div>
    </section>
  );
}
