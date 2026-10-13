import { promises as fs, existsSync } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import SimboloAnimado from "@/components/brand/SimboloAnimado";
import ButtonLink from "@/components/ui/ButtonLink";
import { generateBreadcrumbSchema, getOrganizationReference } from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";

/**
 * Sobre nosotros.
 *
 * No es una página de servicio y no se parece a ninguna: sin el hero del
 * patrón, sin tarjetas ni tablas, sin bloque de presupuesto. Se lee como una
 * pieza editorial: un manifiesto, de dónde venimos, las personas en grande y
 * una conversación de ejemplo que enseña cómo trabajamos en vez de contarlo.
 *
 * El contenido vive en `messages/pages/{locale}/sobre-nosotros.json`. Las
 * fotos del equipo se leen de `public/images/team/{id}.(jpg|png|webp)`: hasta
 * que existan, cada retrato muestra la inicial.
 */

type Props = { params: Promise<{ locale: string }> };

interface Contenido {
  seo: { title: string; description: string };
  hero: { etiqueta: string; h1: string; subheading: string; meta: string[] };
  origen: { etiqueta: string; h2: string; parrafos: string[] };
  equipo: {
    etiqueta: string;
    h2: string;
    seOcupa: string;
    personas: { id: string; nombre: string; rol: string; body: string; foco: string }[];
  };
  trato: {
    etiqueta: string;
    h2: string;
    principios: string[];
    chat: {
      titulo: string;
      nota: string;
      nosotros: string;
      mensajes: { de: "nosotros" | "cliente"; hora: string; texto: string }[];
    };
  };
  cierre: { h2: string; body: string; enlace: string };
}

async function cargar(locale: string): Promise<Contenido | null> {
  try {
    const ruta = path.join(process.cwd(), "messages", "pages", locale, "sobre-nosotros.json");
    return JSON.parse(await fs.readFile(ruta, "utf-8"));
  } catch {
    return locale !== "es" ? cargar("es") : null;
  }
}

/** La foto de una persona del equipo, si ya se ha subido. */
function foto(id: string) {
  for (const ext of ["jpg", "png", "webp"]) {
    if (existsSync(path.join(process.cwd(), "public", "images", "team", `${id}.${ext}`))) {
      return `/images/team/${id}.${ext}`;
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const datos = await cargar(locale);
  if (!datos) return {};
  return {
    title: datos.seo.title,
    description: datos.seo.description,
    alternates: getAlternates(locale as Locale, "/sobre-nosotros"),
    openGraph: {
      title: datos.seo.title,
      description: datos.seo.description,
      type: "website",
      locale,
      url: canonicalFor(locale as Locale, "/sobre-nosotros"),
    },
  };
}

/** Etiqueta pequeña sobre cada titular. */
function Etiqueta({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <p className={`text-dato font-semibold uppercase tracking-wide ${claro ? "text-niebla" : "text-rojo"}`}>
      {children}
    </p>
  );
}

export default async function SobreNosotrosPage({ params }: Props) {
  const { locale } = await params;
  const datos = await cargar(locale);
  if (!datos) notFound();
  const { hero, origen, equipo, trato, cierre } = datos;

  const breadcrumb = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}/sobre-nosotros`,
    baseUrl: SITE_URL,
  });
  const esquema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: datos.seo.title,
    description: datos.seo.description,
    url: canonicalFor(locale as Locale, "/sobre-nosotros"),
    breadcrumb,
    mainEntity: getOrganizationReference(SITE_URL),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(esquema) }} />

      {/* Manifiesto: blanco, tipografía grande y el símbolo. Sin botones. */}
      <section className="bg-blanco">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-28 md:pb-20 md:pt-36">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <Etiqueta>{hero.etiqueta}</Etiqueta>
              <h1 className="mt-6 max-w-[17ch] text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] text-azul md:text-[64px]">
                {hero.h1}
              </h1>
              <p className="mt-8 max-w-[58ch] text-lectura text-pizarra">{hero.subheading}</p>
            </div>
            <SimboloAnimado tam={280} dispersa className="hidden text-azul lg:block" retraso={200} />
          </div>
          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-niebla pt-5">
            {hero.meta.map((m) => (
              <li key={m} className="text-dato font-semibold uppercase tracking-wide text-pizarra">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* De dónde venimos: el despacho Benavides, con su logo. */}
      <section id="origen" className="scroll-mt-20 bg-azul">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <Etiqueta claro>{origen.etiqueta}</Etiqueta>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/Logo_Benavides_Negativo_Tagline.svg"
              alt="Benavides"
              className="mt-5 w-56 max-w-full"
            />
          </div>
          <div>
            <h2 className="text-seccion text-blanco">{origen.h2}</h2>
            <div className="mt-6 max-w-[68ch] space-y-4">
              {origen.parrafos.map((p, i) => (
                <p
                  key={i}
                  className={`text-lectura ${i === origen.parrafos.length - 1 ? "text-blanco" : "text-niebla"}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Las personas, como en una revista: retrato grande y texto, alternando. */}
      <section id="equipo" className="scroll-mt-20 bg-blanco">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Etiqueta>{equipo.etiqueta}</Etiqueta>
          <h2 className="mt-4 max-w-[22ch] text-seccion text-azul">{equipo.h2}</h2>

          <div className="mt-14 grid gap-16 md:gap-24">
            {equipo.personas.map((p, i) => {
              const src = foto(p.id);
              const derecha = i % 2 === 1;
              return (
                <article key={p.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  <div className={`relative aspect-[4/5] overflow-hidden bg-azul ${derecha ? "md:order-2" : ""}`}>
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={p.nombre} className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      // Marcador hasta que llegue la foto: la inicial, enorme.
                      <span
                        className="absolute inset-0 flex items-center justify-center font-dato text-[200px] font-semibold leading-none text-blanco/90"
                        aria-hidden="true"
                      >
                        {p.nombre.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-dato font-semibold uppercase tracking-wide text-rojo">{p.rol}</p>
                    <h3 className="mt-3 text-[40px] font-extrabold leading-none tracking-[-0.04em] text-azul md:text-[56px]">
                      {p.nombre}
                    </h3>
                    <p className="mt-6 max-w-[52ch] text-lectura text-pizarra">{p.body}</p>
                    <p className="mt-8 border-l-4 border-rojo pl-5 text-subtitulo text-azul">
                      <span className="text-pizarra">{equipo.seOcupa} </span>
                      {p.foco}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos: los principios, y una conversación que los enseña. */}
      <section id="como-trabajamos" className="scroll-mt-20 bg-papel">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <Etiqueta>{trato.etiqueta}</Etiqueta>
            <h2 className="mt-4 text-seccion text-azul">{trato.h2}</h2>
            <ul className="mt-10 grid gap-6">
              {trato.principios.map((pr) => (
                <li key={pr} className="border-t border-niebla pt-6 text-[28px] font-semibold leading-tight tracking-[-0.02em] text-azul">
                  {pr}
                </li>
              ))}
            </ul>
          </div>

          <figure className="border border-niebla bg-blanco">
            <figcaption className="flex items-center justify-between gap-4 border-b border-niebla px-6 py-4">
              <span className="text-nota font-semibold text-azul">{trato.chat.titulo}</span>
              <span className="text-dato text-pizarra">{trato.chat.nota}</span>
            </figcaption>
            <ol className="grid gap-4 px-6 py-6">
              {trato.chat.mensajes.map((m, i) => {
                const nuestro = m.de === "nosotros";
                return (
                  <li key={i} className={`flex ${nuestro ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[85%] px-4 py-3 ${nuestro ? "bg-azul text-blanco" : "border border-niebla bg-papel text-azul"}`}>
                      {nuestro ? (
                        <p className="text-dato font-semibold uppercase tracking-wide text-niebla">
                          {trato.chat.nosotros}
                        </p>
                      ) : null}
                      <p className="mt-1 text-nota">{m.texto}</p>
                      <p className={`mt-2 text-right text-dato ${nuestro ? "text-niebla" : "text-pizarra"}`}>
                        {m.hora}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </figure>
        </div>
      </section>

      {/* Cierre: una invitación, no un bloque de venta. */}
      <section className="bg-blanco">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:justify-between md:py-28">
          <div>
            <h2 className="text-[48px] font-extrabold leading-none tracking-[-0.04em] text-azul md:text-[72px]">
              {cierre.h2}
            </h2>
            <p className="mt-6 max-w-[48ch] text-lectura text-pizarra">{cierre.body}</p>
          </div>
          <ButtonLink href="/contacto" variant="principal" size="lg" className="group flex-none gap-3">
            {cierre.enlace}
            <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
