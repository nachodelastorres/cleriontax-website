import { setRequestLocale } from "next-intl/server";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, Mail, Phone } from "lucide-react";
import IconoWhatsApp from "@/components/brand/IconoWhatsApp";
import FormularioDiagnostico from "@/components/cta/FormularioDiagnostico";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";
import { metaPagina, recortar } from "@/lib/seo";

/**
 * Contacto.
 *
 * Misma voz que «sobre nosotros»: blanco, tipografía grande y nada de bloques
 * de venta. Arriba, los tres canales directos en filas grandes, porque mucha
 * gente prefiere escribir o llamar a rellenar nada. Debajo, el formulario de
 * diagnóstico —el mismo de las páginas de servicio, que ya clasifica el caso—
 * y qué pasa después de enviarlo.
 *
 * El contenido vive en `messages/pages/{locale}/contacto.json`.
 */

type Props = { params: Promise<{ locale: string }> };

type TipoCanal = "whatsapp" | "telefono" | "email";

interface Contenido {
  seo: { title: string; description: string };
  hero: { etiqueta: string; h1: string; subheading: string };
  canales: { tipo: TipoCanal; etiqueta: string; valor: string; nota: string }[];
  horario: string;
  formulario: { h2: string; entrada: string };
  despues: { h2: string; pasos: string[]; nota: string };
}

const ENLACES: Record<TipoCanal, string> = {
  whatsapp: "https://wa.me/34663482301",
  telefono: "tel:+34663482301",
  email: "mailto:info@cleriontax.com",
};

async function cargar(locale: string): Promise<Contenido | null> {
  try {
    const ruta = path.join(process.cwd(), "messages", "pages", locale, "contacto.json");
    return JSON.parse(await fs.readFile(ruta, "utf-8"));
  } catch {
    return locale !== "es" ? cargar("es") : null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const datos = await cargar(locale);
  if (!datos) return {};
  return metaPagina({ locale, ruta: "/contacto", titulo: datos.seo.title, descripcion: datos.seo.description });
}

function IconoCanal({ tipo }: { tipo: TipoCanal }) {
  if (tipo === "whatsapp") return <IconoWhatsApp className="h-9 w-9" />;
  const Icono = tipo === "telefono" ? Phone : Mail;
  return <Icono className="h-9 w-9 text-azul" strokeWidth={1.5} aria-hidden="true" />;
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const datos = await cargar(locale);
  if (!datos) notFound();
  const { hero, canales, horario, formulario, despues } = datos;

  const breadcrumb = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}/contacto`,
    baseUrl: SITE_URL,
  });
  const esquema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: datos.seo.title,
    description: datos.seo.description,
    url: canonicalFor(locale as Locale, "/contacto"),
    breadcrumb,
    mainEntity: { "@type": "ProfessionalService", "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(esquema) }} />

      {/* Titular y canales directos. */}
      <section className="bg-blanco">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
          <p className="text-dato font-semibold uppercase tracking-wide text-rojo">{hero.etiqueta}</p>
          <h1 className="mt-6 max-w-[18ch] text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] text-azul md:text-[64px]">
            {hero.h1}
          </h1>
          <p className="mt-8 max-w-[58ch] text-lectura text-pizarra">{hero.subheading}</p>

          <ul className="mt-14 border-b border-niebla">
            {canales.map((c) => (
              <li key={c.tipo} className="border-t border-niebla">
                <a
                  href={ENLACES[c.tipo]}
                  {...(c.tipo === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
                  className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-5 gap-y-1 py-6 transition-colors duration-200 hover:bg-papel md:grid-cols-[3.5rem_12rem_1fr_auto] md:px-4"
                >
                  <IconoCanal tipo={c.tipo} />
                  <span className="text-dato font-semibold uppercase tracking-wide text-pizarra md:order-none">
                    {c.etiqueta}
                  </span>
                  <span className="col-span-1 col-start-2 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-azul md:col-auto md:text-[32px]">
                    {c.valor}
                    <span className="mt-1 block text-nota font-normal tracking-normal text-pizarra md:hidden">
                      {c.nota}
                    </span>
                  </span>
                  <span className="row-span-2 row-start-1 col-start-3 flex items-center gap-4 md:col-auto md:row-auto">
                    <span className="hidden text-nota text-pizarra lg:inline">{c.nota}</span>
                    <ArrowUpRight
                      className="h-7 w-7 text-rojo transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 inline-flex items-center gap-2 text-nota text-pizarra">
            <Clock className="h-4 w-4 text-rojo" aria-hidden="true" />
            {horario}
          </p>
        </div>
      </section>

      {/* El formulario y lo que pasa después. */}
      <section id="diagnostico" className="scroll-mt-20 bg-papel">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <h2 className="text-seccion text-azul">{formulario.h2}</h2>
            <p className="mt-4 max-w-[60ch] text-lectura text-pizarra">{formulario.entrada}</p>
            <div className="mt-8">
              <FormularioDiagnostico situacion="Contacto" />
            </div>
          </div>

          <aside className="lg:pt-2">
            <h2 className="text-subtitulo text-azul">{despues.h2}</h2>
            <ol className="mt-6">
              {despues.pasos.map((paso, i) => {
                const ultimo = i === despues.pasos.length - 1;
                return (
                  <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-x-4">
                    <div className="relative flex justify-center" aria-hidden="true">
                      {!ultimo ? <span className="absolute inset-y-0 w-0.5 bg-azul/20" /> : null}
                      <span className="relative mt-1.5 h-3 w-3 bg-rojo" />
                    </div>
                    <p className={`text-lectura text-pizarra ${ultimo ? "" : "pb-7"}`}>{paso}</p>
                  </li>
                );
              })}
            </ol>
            <span className="mt-8 inline-flex items-center gap-2 bg-azul/10 px-2.5 py-1 text-dato font-semibold text-azul">
              <span className="h-2 w-2 bg-rojo" aria-hidden="true" />
              {despues.nota}
            </span>
          </aside>
        </div>
      </section>
    </>
  );
}
