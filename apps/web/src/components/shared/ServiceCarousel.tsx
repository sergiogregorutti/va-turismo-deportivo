"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export type ServiceCarouselItem = {
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
  badge?: string;
};

export function ServiceCarousel({ items }: { items: ServiceCarouselItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item) => {
          const card = (
            <div
              data-carousel-card
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 80vw, 33vw"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-gold-400 text-navy-900 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-heading text-xl font-bold text-navy-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            </div>
          );

          return (
            <div
              key={item.title}
              className="snap-start shrink-0 w-[80%] sm:w-[45%] lg:w-[31%]"
            >
              {item.href ? (
                <Link href={item.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </div>
          );
        })}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Anterior"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 z-10"
        >
          <svg
            className="w-5 h-5 text-navy-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Siguiente"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 z-10"
        >
          <svg
            className="w-5 h-5 text-navy-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
