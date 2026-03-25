"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/disciplines", label: "Disciplinas", icon: "🏅" },
  { href: "/admin/experiences", label: "Experiencias", icon: "🌍" },
  { href: "/admin/contacts", label: "Contactos", icon: "📩" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-700 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-navy-600/30">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/images/va_isotipo.svg"
              alt="VA"
              width={40}
              height={40}
              className="invert"
            />
            <span className="font-heading text-xl font-semibold">
              Backoffice
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-navy-600 text-white"
                    : "text-navy-200 hover:bg-navy-600/50 hover:text-white"
                )}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy-600/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-navy-200 hover:bg-navy-600/50 hover:text-white transition-colors"
          >
            <span>🚪</span>
            Cerrar sesion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
