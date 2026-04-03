"use client";

import { useState, useRef, useEffect } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectOptionGroup {
  label: string;
  value?: string;
  options: SelectOption[];
}

interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  options?: SelectOption[];
  groups?: SelectOptionGroup[];
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
}

export function Select({
  name,
  label,
  placeholder = "Seleccionar",
  value: controlledValue,
  defaultValue = "",
  options,
  groups,
  onChange,
  required,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allOptions: SelectOption[] = options
    ? options
    : groups
      ? groups.flatMap((g) => [
          ...(g.value ? [{ value: g.value, label: g.label }] : []),
          ...g.options,
        ])
      : [];

  const selectedLabel =
    allOptions.find((o) => o.value === value)?.label || placeholder;

  function handleSelect(val: string) {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  }

  return (
    <div className={`relative ${className}`} ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-600 mb-2">
          {label}
        </label>
      )}
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white border rounded-lg transition-all text-left cursor-pointer ${
          isOpen
            ? "border-gold-400 ring-2 ring-gold-400/20"
            : "border-gray-200 hover:border-gray-300"
        } ${value ? "text-gray-900" : "text-gray-400"}`}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {placeholder && (
            <button
              type="button"
              onClick={() => handleSelect("")}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                value === ""
                  ? "bg-gold-50 text-gold-700 font-medium"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              {placeholder}
            </button>
          )}

          {options && options.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-400">
              Sin opciones disponibles
            </div>
          )}

          {options &&
            options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                  value === opt.value
                    ? "bg-gold-50 text-gold-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}

          {groups &&
            groups.map((group) => (
              <div key={group.label}>
                <button
                  type="button"
                  onClick={() => group.value && handleSelect(group.value)}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider border-t border-gray-100 transition-colors ${
                    group.value
                      ? "cursor-pointer hover:bg-gray-100"
                      : ""
                  } ${
                    value === group.value
                      ? "bg-gold-50 text-gold-700"
                      : "text-gray-400 bg-gray-50"
                  }`}
                >
                  {group.label}
                </button>
                {group.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-6 py-2.5 text-sm transition-colors cursor-pointer ${
                      value === opt.value
                        ? "bg-gold-50 text-gold-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
