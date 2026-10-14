"use client";

import { useEffect, useState } from "react";

/**
 * Índice de la página de servicio.
 *
 * Se queda fijo al llegar a él y marca la sección en la que estás. Ocupa una
 * sola línea: en una página larga el índice tiene que orientar, no competir
 * con el contenido.
 */
interface IndiceServicioProps {
  items: { id: string; label: string }[];
}

export default function IndiceServicio({ items }: IndiceServicioProps) {
  const [activo, setActivo] = useState<string | null>(null);

  useEffect(() => {
    const secciones = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (secciones.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActivo(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    secciones.forEach((s) => observador.observe(s));
    return () => observador.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Contenido de la página"
      className="sticky top-16 z-20 border-b border-niebla bg-blanco"
    >
      <div className="mx-auto max-w-5xl px-6">
        <ul className="scrollbar-hide flex gap-1 overflow-x-auto py-2">
          {items.map((item) => {
            const esActivo = activo === item.id;
            return (
              <li key={item.id} className="flex-none">
                <a
                  href={`#${item.id}`}
                  aria-current={esActivo ? "true" : undefined}
                  className={`inline-block whitespace-nowrap px-3 py-2.5 text-nota transition-colors ${
                    esActivo
                      ? "font-semibold text-rojo"
                      : "text-pizarra hover:text-azul"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
