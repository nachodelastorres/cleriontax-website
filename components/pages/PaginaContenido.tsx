import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import HeroPagina from "@/components/layout/HeroPagina";
import IndiceServicio from "@/components/services/IndiceServicio";
import SeccionesServicio, { type Seccion } from "@/components/services/SeccionesServicio";
import FormularioDiagnostico from "@/components/cta/FormularioDiagnostico";
import BarraAccion from "@/components/cta/BarraAccion";
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from "@/lib/schemas";
import { SITE_URL, canonicalFor, type Locale } from "@/lib/site";

/**
 * Página de contenido con la misma plantilla que las de servicio: cabecera
 * con patrón, índice que sigue la lectura, secciones tipadas y el diagnóstico
 * como acción de cierre.
 *
 * El contenido vive en messages/pages/{idioma}/{slug}.json con la misma forma
 * que los servicios, para que un solo renderizador sirva a las dos familias.
 */
export interface ContenidoPagina {
  title: string;
  slug: string;
  excerpt: string;
  hero: {
    etiqueta?: string;
    h1: string;
    subheading: string;
    cta?: { label: string; href: string };
    secundaria?: { label: string; href: string };
  };
  toc: { id: string; label: string }[];
  sections: Seccion[];
  cierre?: { h2: string; body: string; button?: { label: string; href: string } };
}

export async function cargarPagina(locale: string, slug: string): Promise<ContenidoPagina | null> {
  try {
    const p = path.join(process.cwd(), "messages", "pages", locale, `${slug}.json`);
    return JSON.parse(await fs.readFile(p, "utf-8"));
  } catch {
    // Sin traducción propia se recurre al español antes de dar la página por perdida.
    if (locale !== "es") return cargarPagina("es", slug);
    return null;
  }
}

export default async function PaginaContenido({
  locale,
  datos,
  accionBarra,
}: {
  locale: string;
  datos: ContenidoPagina | null;
  accionBarra: string;
}) {
  if (!datos) notFound();

  const { hero, toc, sections, cierre, slug, title, excerpt } = datos;
  const url = canonicalFor(locale as Locale, `/${slug}`);

  const breadcrumb = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}/${slug}`,
    baseUrl: SITE_URL,
  });

  const webpage = generateWebPageSchema({
    locale: locale as Locale,
    title,
    description: excerpt,
    url,
    breadcrumb,
    baseUrl: SITE_URL,
  });

  const faq = sections.find((s) => s.id === "faq");
  const faqSchema = faq?.items
    ? generateFAQSchema({
        locale: locale as Locale,
        items: faq.items as { q: string; a: string }[],
        url,
      })
    : null;

  const esquemas = [breadcrumb, webpage, faqSchema].filter(Boolean);

  return (
    <>
      {esquemas.map((e, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(e) }}
        />
      ))}

      <HeroPagina
        id={slug}
        etiqueta={hero.etiqueta}
        titulo={hero.h1}
        entrada={hero.subheading}
        accion={hero.cta}
        secundaria={hero.secundaria}
        simbolo={slug === "metodo"}
      />

      <IndiceServicio items={toc} />

      <SeccionesServicio secciones={sections} />

      {cierre ? (
        <section id="cierre" className="scroll-mt-20 bg-papel py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 grid grid-cols-[44px_1fr] gap-3">
              <span className="pt-2 font-semibold text-dato text-rojo">&rarr;</span>
              <div>
                <h2 className="text-seccion text-azul">{cierre.h2}</h2>
                <p className="mt-4 max-w-[68ch] text-lectura text-pizarra">{cierre.body}</p>
              </div>
            </div>

            <div className="md:pl-[56px]">
              <FormularioDiagnostico
                situacion={title}
                accion={cierre.button?.label ?? accionBarra}
              />
            </div>
          </div>
        </section>
      ) : null}

      <BarraAccion contexto={title} href="/contacto" accion={accionBarra} />
    </>
  );
}
