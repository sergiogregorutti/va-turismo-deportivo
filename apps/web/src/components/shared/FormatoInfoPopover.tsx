"use client";

import { useEffect, useRef, useState } from "react";
import { FORMATOS } from "@/lib/constants";

export function FormatoInfoPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Que es el formato de viaje?"
        aria-expanded={open}
        className="w-4 h-4 rounded-full border border-gray-400 text-gray-500 hover:text-navy-700 hover:border-navy-700 flex items-center justify-center text-[10px] font-bold leading-none transition-colors cursor-pointer"
      >
        i
      </button>

      {open && (
        <div className="absolute z-50 top-6 left-0 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <p className="text-xs font-semibold text-navy-700 uppercase tracking-wider mb-3">
            Formato de viaje
          </p>
          <ul className="space-y-3">
            {FORMATOS.map((f) => (
              <li key={f.value}>
                <p className="text-sm font-semibold text-navy-700">
                  {f.label}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {f.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
