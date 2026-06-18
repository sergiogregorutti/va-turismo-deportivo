"use client";

import { useRouter } from "next/navigation";

export function DeleteCityButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`¿Estas seguro de eliminar "${name}"?`)) return;

    const res = await fetch(`/api/cities/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Error al eliminar");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
    >
      Eliminar
    </button>
  );
}
