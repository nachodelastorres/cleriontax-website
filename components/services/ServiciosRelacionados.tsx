import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { formaDeLinea } from "@/components/brand/lineas";
import type { Locale } from "@/lib/site";

/**
 * Las otras líneas de servicio, al pie de una página de servicio.
 *
 * Cada una se identifica con su forma del símbolo (§08), no con una
 * fotografía: así ninguna línea depende de tener imagen propia y las cuatro
 * se leen como un sistema.
 */
interface ServiciosRelacionadosProps {
  locale: string;
  enlaces: { label: string; href: string }[];
  titulo: string;
  subtitulo: string;
  verDetalles: string;
  verTodos: string;
}

export default async function ServiciosRelacionados({
  locale,
  enlaces,
  titulo,
  subtitulo,
  verDetalles,
  verTodos,
}: ServiciosRelacionadosProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "servicesPages.relatedServices",
  });

  // Se descarta el enlace al índice y se elimina cualquier destino repetido:
  // el slug es la clave de React, y un duplicado rompería el render.
  const vistos = new Set<string>();
  const otros = enlaces.filter((e) => {
    if (e.href === "/servicios" || e.href.includes("/servicios#")) return false;
    const slug = e.href.split("/").pop() ?? "";
    if (!slug || vistos.has(slug)) return false;
    vistos.add(slug);
    return true;
  });

  if (otros.length === 0) return null;

  return (
    <section className="bg-blanco py-14 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-seccion text-azul">{titulo}</h2>
        <p className="mt-3 max-w-[62ch] text-lectura text-pizarra">{subtitulo}</p>

        <div className="mt-9 grid gap-px border border-niebla bg-niebla md:grid-cols-3">
          {otros.map((enlace) => {
            const slug = enlace.href.split("/").pop() ?? "";
            const linea = formaDeLinea(slug);
            if (!linea) return null;

            const { Forma, acento } = linea;
            let descripcion: string;
            try {
              descripcion = t(`descriptions.${slug}` as never);
            } catch {
              return null;
            }

            return (
              <a
                key={slug}
                href={`/${locale}${enlace.href}`}
                className="group bg-blanco transition-colors duration-200 hover:bg-papel"
              >
                <div className="flex h-28 items-center justify-center bg-papel">
                  <Forma tam={48} className={acento ? "text-rojo" : "text-azul"} />
                </div>

                <div className="p-6">
                  <h3 className="text-subtitulo text-azul">{enlace.label}</h3>
                  <p className="mt-3 text-nota text-pizarra">{descripcion}</p>

                  <span className="mt-5 inline-flex items-center gap-2 text-nota font-semibold text-rojo">
                    {verDetalles}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <a
          href={`/${locale}/servicios`}
          className="mt-8 inline-flex items-center gap-2 text-lectura font-semibold text-azul hover:text-rojo"
        >
          {verTodos}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
