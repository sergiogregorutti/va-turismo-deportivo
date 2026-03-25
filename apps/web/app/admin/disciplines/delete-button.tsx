"use client";

import { useRouter } from "next/navigation";

export function DeleteDisciplineButton({
  id,
  name,
  hasExperiences,
}: {
  id: string;
  name: string;
  hasExperiences: boolean;
}) {
  const router = useRouter();

  async function handleDelete() {
    if (hasExperiences) {
      alert("No se puede eliminar una disciplina que tiene experiencias asociadas.");
      return;
    }

    if (!confirm(`¿Estas seguro de eliminar "${name}"?`)) return;

    const res = await fetch(`/api/disciplines/${id}`, { method: "DELETE" });
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
