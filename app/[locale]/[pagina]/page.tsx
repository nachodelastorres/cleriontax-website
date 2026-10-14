import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateDetailedServiceSchema,
} from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";
import { PAGINAS, paginaPorSlug, rutaPagina, rutasPagina, slugLocal } from "@/lib/paginas";
import { TARIFAS } from "@/lib/tarifas";
import HeroPagina from "@/components/layout/HeroPagina";
import HeroExpediente from "@/components/expediente/HeroExpediente";
import HeroFormulario, { type Borrador } from "@/components/formulario/HeroFormulario";
import PrecioFases, { type TextosPrecioFases } from "@/components/expediente/PrecioFases";
import PresupuestoMedida, { type TextosPresupuesto } from "@/components/expediente/PresupuestoMedida";
import type { TextosCalculadora } from "@/components/expediente/CalculadoraPlazo";
import IndiceServicio from "@/components/services/IndiceServicio";
import SeccionesServicio, { type Seccion } from "@/components/services/SeccionesServicio";
import Tarifas from "@/components/precios/Tarifas";
import FormularioDiagnostico from "@/components/cta/FormularioDiagnostico";
import BarraAccion from "@/components/cta/BarraAccion";
import BloqueAccion from "@/components/cta/BloqueAccion";
import RelacionadosPagina from "@/components/paginas/RelacionadosPagina";
import { metaPagina, recortar } from "@/lib/seo";

/**
 * Las páginas de servicio, una por intención de búsqueda (ver lib/paginas.ts).
 *
 * Orden fijo: lo que le pasa al cliente y cómo se resuelve, cuánto cuesta, las
 * preguntas que quedan y el formulario en la propia página. Nada obliga a ir
 * a /contacto para pedir presupuesto.
 */

type Props = { params: Promise<{ locale: string; pagina: string }> };

// Cualquier otro primer segmento es un 404, no una página vacía.
export const dynamicParams = false;

// Cada idioma con su slug: /es/declarar-criptomonedas, /en/declare-crypto-taxes-spain…
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  return PAGINAS.map((p) => ({ pagina: slugLocal(p.slug, params.locale) }));
}

interface Contenido {
  /**
   * «expediente»: plantilla de las páginas de «¿Cómo lo justifico ante la
   * AEAT?», con calculadora de plazo y precio en dos partes. Sin ella, la de
   * siempre.
   */
  plantilla?: "expediente" | "formulario";
  title: string;
  excerpt: string;
  hero: {
    etiqueta?: string;
    h1: string;
    subheading: string;
    cta?: { label: string; href: string };
    secundaria?: { label: string; href: string };
    calculadora?: TextosCalculadora;
    /** Plantilla formulario: el borrador dibujado del hero. */
    borrador?: Borrador;
  };
  toc: { id: string; label: string }[];
  sections: Seccion[];
  tarifas?: { h2: string; entrada?: string; nota?: string };
  /** Precio en dos partes, solo en la plantilla expediente. */
  precioFases?: TextosPrecioFases;
  /** Sin tabla de precios: presupuesto cerrado a medida (inspección). */
  presupuesto?: TextosPresupuesto;
  cierre: { h2: string; body: string; button?: { label: string } };
  seo: { title: string; description: string; keywords?: string[] };
}

async function cargar(locale: string, slug: string): Promise<Contenido | null> {
  try {
    const ruta = path.join(process.cwd(), "messages", "paginas", locale, `${slug}.json`);
    return JSON.parse(await fs.readFile(ruta, "utf-8"));
  } catch {
    // Sin el contenido en este idioma no se sirve el español con canonical
    // ajeno: la página no existe.
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale, pagina: slugUrl } = await params;
  setRequestLocale(locale);
  const meta = paginaPorSlug(slugUrl, locale);
  if (!meta) return {};
  const datos = await cargar(locale, meta.slug);
  if (!datos) return {};
  return metaPagina({
    locale,
    ruta: rutasPagina(meta.slug),
    titulo: datos.seo.title,
    descripcion: datos.seo.description,
    keywords: datos.seo.keywords,
  });
}

export default async function PaginaServicio({ params }: Props) {
  const { locale, pagina: slugUrl } = await params;
  setRequestLocale(locale);

  // El slug de la URL es el del idioma; el interno (`pagina`) es el español.
  const meta = paginaPorSlug(slugUrl, locale);
  if (!meta) notFound();
  const pagina = meta.slug;
  const ruta = rutaPagina(pagina, locale);
  const datos = await cargar(locale, pagina);
  if (!meta || !datos) notFound();

  const t = await getTranslations({ locale, namespace: "paginas" });
  const nombre = t(`nombres.${pagina}`);
  const url = canonicalFor(locale as Locale, ruta);
  const { hero, toc, sections, tarifas, cierre } = datos;

  const contenido = sections.filter((s) => s.id !== "faq");
  const faq = sections.find((s) => s.id === "faq");
  const conTarifas = meta.tarifas && tarifas;
  const expediente = datos.plantilla === "expediente";

  /* ---------------------------------------------------------- Datos estructurados */

  const breadcrumb = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}${ruta}`,
    customLabels: { [slugUrl]: nombre },
    baseUrl: SITE_URL,
  });

  const servicio = generateDetailedServiceSchema({
    locale: locale as Locale,
    serviceName: nombre,
    description: datos.seo.description,
    serviceType: pagina,
    url,
    breadcrumb,
    baseUrl: SITE_URL,
  });
  if (conTarifas) {
    servicio.offers = {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice:
        Math.min(...TARIFAS.map((x) => x.precio)) +
        (expediente ? datos.precioFases?.suplemento ?? 0 : 0),
      offerCount: TARIFAS.length,
    };
  }

  const faqSchema = faq?.items
    ? generateFAQSchema({
        locale: locale as Locale,
        items: faq.items as { q: string; a: string }[],
        url,
      })
    : null;

  const pasos = sections.find((s) => s.steps && s.steps.length > 0);
  const howTo = pasos?.steps
    ? generateHowToSchema({
        locale: locale as Locale,
        name: `${nombre} - ${pasos.h2}`,
        description: datos.excerpt,
        steps: pasos.steps.map((s) => ({ name: s.title, text: s.body })),
        url,
        baseUrl: SITE_URL,
      })
    : null;

  const esquemas = [breadcrumb, servicio, faqSchema, howTo].filter(Boolean);

  return (
    <>
      {esquemas.map((e, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(e) }}
        />
      ))}

      {datos.plantilla === "formulario" ? (
        <HeroFormulario
          etiqueta={hero.etiqueta}
          titulo={hero.h1}
          entrada={hero.subheading}
          accion={hero.cta}
          secundaria={hero.secundaria}
          borrador={hero.borrador}
        />
      ) : expediente ? (
        <HeroExpediente
          locale={locale}
          etiqueta={hero.etiqueta}
          titulo={hero.h1}
          entrada={hero.subheading}
          accion={hero.cta}
          secundaria={hero.secundaria}
          calculadora={hero.calculadora}
        />
      ) : (
        <HeroPagina
          id={pagina}
          etiqueta={hero.etiqueta}
          titulo={hero.h1}
          entrada={hero.subheading}
          accion={hero.cta}
          secundaria={hero.secundaria}
        />
      )}

      <IndiceServicio items={toc} />

      <SeccionesServicio secciones={contenido} locale={locale} />

      {datos.presupuesto ? (
        <PresupuestoMedida textos={datos.presupuesto} />
      ) : expediente && datos.precioFases ? (
        <PrecioFases locale={locale} textos={datos.precioFases} />
      ) : conTarifas ? (
        <Tarifas
          locale={locale}
          titulo={tarifas.h2}
          entrada={tarifas.entrada}
          nota={tarifas.nota}
        />
      ) : null}

      {faq ? <SeccionesServicio secciones={[{ ...faq, fondo: faq.fondo ?? "blanco" }]} locale={locale} /> : null}

      {/* El presupuesto se pide aquí mismo, con el caso ya identificado. */}
      <section id="diagnostico" className="scroll-mt-20 bg-papel py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8">
            <h2 className="text-seccion text-azul">{cierre.h2}</h2>
            <p className="mt-4 max-w-[68ch] text-lectura text-pizarra">{cierre.body}</p>
          </div>
          <FormularioDiagnostico
            situacion={nombre}
            accion={cierre.button?.label ?? t("enviar")}
          />
        </div>
      </section>

      {/* En la plantilla expediente sobra: la calculadora del hero ya lo hace. */}
      {meta.urgente && !expediente ? (
        <BloqueAccion
          temperatura="urgente"
          plazo={t("plazoAviso")}
          titulo={t("urgenteTitulo")}
          apoyo={t("urgenteApoyo")}
          accion={{ texto: "+34 663 482 301", href: "tel:+34663482301" }}
        />
      ) : null}

      <RelacionadosPagina locale={locale} pagina={meta} />

      <BarraAccion
        contexto={nombre}
        href="#diagnostico"
        accion={t("barraAccion")}
        urgente={meta.urgente}
      />
    </>
  );
}
