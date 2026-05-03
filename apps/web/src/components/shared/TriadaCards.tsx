import Link from "next/link";

export type TriadaItem = {
  title: string;
  description: string;
  detail?: string;
  href?: string;
  gradient: string;
};

export function TriadaCards({ items }: { items: TriadaItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item) => {
        const content = (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <div className="relative p-8 text-center">
              <h3 className="font-heading text-3xl font-bold text-white mb-2 uppercase tracking-wider">
                {item.title}
              </h3>
              <p className="text-gold-400 font-medium mb-6">
                {item.description}
              </p>
              {item.detail && (
                <>
                  <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-6" />
                  <p className="text-navy-300 text-sm">{item.detail}</p>
                </>
              )}
            </div>
          </>
        );

        const baseClasses =
          "group relative bg-navy-700 rounded-2xl overflow-hidden border border-navy-600/30 hover:border-gold-400/50 transition-all duration-300";

        if (item.href) {
          return (
            <Link key={item.title} href={item.href} className={baseClasses}>
              {content}
            </Link>
          );
        }

        return (
          <div key={item.title} className={baseClasses}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
