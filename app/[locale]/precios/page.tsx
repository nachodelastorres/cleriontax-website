import { getTranslations } from "next-intl/server";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";
import { TARIFAS } from "@/lib/tarifas";
import HeroPagina from "@/components/layout/HeroPagina";
import Tarifas from "@/components/precios/Tarifas";
import SeccionesServicio, { type Seccion } from "@/components/services/SeccionesServicio";
import FormularioDiagnostico from "@/components/cta/FormularioDiagnostico";
import BarraAccion from "@/components/cta/BarraAccion";

/**
 * Precios — ataca «precio asesor fiscal criptomonedas» y «cuánto cuesta
 * declarar criptomonedas». Las páginas de servicio enseñan los mismos tramos;
 * esta es la que los explica enteros y la que dice qué va aparte.
 */

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "precios" });

  return {
    title: t("seoTitulo"),
    description: t("seoDescripcion"),
    alternates: getAlternates(locale as Locale, "/precios"),
    openGraph: {
      title: t("seoTitulo"),
      description: t("seoDescripcion"),
      type: "website",
      locale,
      url: canonicalFor(locale as Locale, "/precios"),
    },
  };
}

export default async function PreciosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "precios" });
  const tTarifas = await getTranslations({ locale, namespace: "tarifas" });
  const url = canonicalFor(locale as Locale, "/precios");

  const faq = t.raw("faq") as { q: string; a: string }[];

  const secciones: Seccion[] = [
    {
      id: "como",
      h2: t("comoTitulo"),
      steps: t.raw("como") as { title: string; body: string }[],
      fondo: "blanco",
    },
    {
      id: "aparte",
      h2: t("aparteTitulo"),
      entrada: t("aparteEntrada"),
      items: t.raw("aparte") as { title: string; body: string }[],
      fondo: "papel",
    },
    { id: "faq", h2: t("faqTitulo"), items: faq, fondo: "blanco" },
  ];

  const breadcrumb = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}/precios`,
    customLabels: { precios: t("etiqueta") },
    baseUrl: SITE_URL,
  });

  const catalogo = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: t("titulo"),
    url,
    itemListElement: TARIFAS.map((tarifa) => ({
      "@type": "Offer",
      name: tTarifas(`items.${tarifa.id}.nombre`),
      description: tTarifas(`items.${tarifa.id}.para`),
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        ...(tarifa.desde ? { minPrice: tarifa.precio } : { price: tarifa.precio }),
      },
    })),
  };

  const faqSchema = generateFAQSchema({ locale: locale as Locale, items: faq, url });
  const esquemas = [breadcrumb, catalogo, faqSchema].filter(Boolean);

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
        id="precios"
        etiqueta={t("etiqueta")}
        titulo={t("titulo")}
        entrada={t("entrada")}
        accion={{ label: t("accion"), href: "#diagnostico" }}
      />

      <Tarifas locale={locale} fondo="blanco" />

      <SeccionesServicio secciones={secciones} locale={locale} />

      <section id="diagnostico" className="scroll-mt-20 bg-papel py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8">
            <h2 className="text-seccion text-azul">{t("cierreTitulo")}</h2>
            <p className="mt-4 max-w-[68ch] text-lectura text-pizarra">{t("cierreTexto")}</p>
          </div>
          <FormularioDiagnostico situacion={t("etiqueta")} accion={t("accion")} />
        </div>
      </section>

      <BarraAccion contexto={t("etiqueta")} href="#diagnostico" accion={t("accion")} />
    </>
  );
}
