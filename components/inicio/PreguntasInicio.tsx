import { getTranslations } from "next-intl/server";
import { Cabecera } from "@/components/secciones/Bloques";
import { generateFAQSchema } from "@/lib/schemas";
import { canonicalFor, type Locale } from "@/lib/site";

/**
 * Preguntas frecuentes de la home.
 *
 * Sustituye a la FAQ anterior, que situaba las criptomonedas en el extranjero
 * en el modelo 720 (es el 721) y prometía un informe «100 % preciso» (§18).
 *
 * Sin JavaScript: `<details>` nativo, accesible y rastreable. El schema
 * FAQPage se construye desde el mismo contenido que se muestra.
 */
export default async function PreguntasInicio({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.faq" });
  const items = t.raw("items") as { q: string; a: string }[];

  const schema = generateFAQSchema({
    locale: locale as Locale,
    items,
    url: canonicalFor(locale as Locale),
  });

  return (
    <section className="bg-papel">
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Cabecera marca="05" titulo={t("titulo")} />
          </div>
        </div>

        <div className="border-t-2 border-azul lg:col-span-8">
          {items.map((item, i) => (
            <details key={i} className="group border-b border-niebla bg-papel open:bg-blanco">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-1 py-6 marker:content-none md:px-5 [&::-webkit-details-marker]:hidden">
                <span className="text-subtitulo text-azul">{item.q}</span>
                <span
                  className="mt-1 flex h-7 w-7 flex-none items-center justify-center border border-azul text-lectura font-semibold leading-none text-azul group-open:bg-azul group-open:text-blanco"
                  aria-hidden="true"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="max-w-[68ch] px-1 pb-7 text-lectura text-pizarra md:px-5">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
