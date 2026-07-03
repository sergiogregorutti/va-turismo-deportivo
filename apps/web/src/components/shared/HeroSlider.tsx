"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface HeroSlideItem {
  src: string;
  alt: string;
}

// Fallback si todavia no hay slides cargados en el admin
const DEFAULT_SLIDES: HeroSlideItem[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `/images/home_hero/${n}.jpg`,
  alt: `Turismo deportivo ${n}`,
}));

const INTERVAL = 5000;

export function HeroSlider({
  countryName,
  slides,
}: {
  countryName: string;
  slides?: HeroSlideItem[];
}) {
  const items = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  // Resaltamos la pasión de Argentina y la energía de Venezuela
  const tagline =
    countryName === "Venezuela" ? "Vive la energía" : "Viví la pasión";
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Slides */}
      {items.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-white">
            {tagline}
            <br />
            <span className="text-gold-400">de {countryName}</span>
            <br />
            a través del deporte
          </h1>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-gold-400 scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
