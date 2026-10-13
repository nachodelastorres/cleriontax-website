import { promises as fs, existsSync } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { BellRing, Check, Crosshair, Database, Equal, MessagesSquare, Plus, Scale } from "lucide-react";
import HeroPagina from "@/components/layout/HeroPagina";
import BloqueAccion from "@/components/cta/BloqueAccion";
import { Cabecera, Envoltura } from "@/components/secciones/Bloques";
import { generateBreadcrumbSchema, getOrganizationReference } from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";

/**
 * Sobre nosotros.
 *
 * Responde, por este orden, a quiénes somos (la rama de inversiones y cripto
 * del despacho Benavides), por qué existimos (lo que un generalista no
 * alcanza), cómo trabajamos (datos y fiscalidad a la vez), quiénes somos en
 * persona y por qué somos un despacho boutique.
 *
 * El contenido vive en `messages/pages/{locale}/sobre-nosotros.json`. Las
 * fotos del equipo se leen de `public/images/team/{id}.(jpg|png|webp)`: hasta
 * que existan, cada ficha muestra un marcador con la inicial.
 */

type Props = { params: Promise<{ locale: string }> };

interface Contenido {
  seo: { title: string; description: string };
  hero: { etiqueta: string; h1: string; subheading: string; cta: { label: string; href: string } };
  origen: { etiqueta: string; h2: string; parrafos: string[] };
  duo: {
    h2: string;
    entrada: string;
    datos: { titulo: string; items: string[] };
    fiscal: { titulo: string; items: string[] };
    resultado: string;
  };
  equipo: { h2: string; entrada: string; personas: { id: string; nombre: string; rol: string; body: string }[] };
  boutique: {
    h2: string;
    entrada: string;
    items: { icono: keyof typeof ICONOS; titulo: string; body: string }[];
  };
  cierre: { titulo: string; apoyo: string; accion: string };
}

const ICONOS = { proactividad: BellRing, comunicacion: MessagesSquare, precision: Crosshair };

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

export default async function SobreNosotrosPage({ params }: Props) {
  const { locale } = await params;
  const datos = await cargar(locale);
  if (!datos) notFound();
  const { hero, origen, duo, equipo, boutique, cierre } = datos;

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

      <HeroPagina
        id="sobre-nosotros"
        etiqueta={hero.etiqueta}
        titulo={hero.h1}
        entrada={hero.subheading}
        accion={hero.cta}
      />

      {/* De dónde venimos: el despacho Benavides, con su logo. */}
      <Envoltura id="origen" fondo="azul" ancho="max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-dato font-semibold uppercase tracking-wide text-niebla">{origen.etiqueta}</p>
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
                <p key={i} className={`text-lectura ${i === origen.parrafos.length - 1 ? "text-blanco" : "text-niebla"}`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Envoltura>

      {/* Datos + fiscalidad = cifras que se pueden defender. */}
      <Envoltura id="como-trabajamos" fondo="blanco" ancho="max-w-6xl">
        <Cabecera titulo={duo.h2} entrada={duo.entrada} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] lg:items-stretch lg:gap-0">
          {[
            { mitad: duo.datos, Icono: Database },
            null,
            { mitad: duo.fiscal, Icono: Scale },
          ].map((m, i) =>
            m ? (
              <div key={i} className="border border-niebla bg-blanco p-7 md:p-8">
                <m.Icono className="h-8 w-8 text-rojo" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-subtitulo text-azul">{m.mitad.titulo}</h3>
                <ul className="mt-5 grid gap-3">
                  {m.mitad.items.map((item) => (
                    <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2 text-nota text-pizarra">
                      <Check className="mt-0.5 h-4 w-4 text-azul" strokeWidth={3} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div key={i} className="flex items-center justify-center" aria-hidden="true">
                <Plus className="h-8 w-8 text-rojo" strokeWidth={2.5} />
              </div>
            ),
          )}
        </div>
        <div className="mt-4 flex items-center gap-4 bg-azul px-7 py-6 md:px-8">
          <Equal className="h-8 w-8 flex-none text-rojo" strokeWidth={2.5} aria-hidden="true" />
          <p className="text-seccion text-blanco">{duo.resultado}</p>
        </div>
      </Envoltura>

      {/* Quiénes somos: las dos personas, con foto o con su marcador. */}
      <Envoltura id="equipo" fondo="papel" ancho="max-w-6xl">
        <Cabecera titulo={equipo.h2} entrada={equipo.entrada} />
        <ul className="grid gap-6 md:grid-cols-2">
          {equipo.personas.map((p) => {
            const src = foto(p.id);
            return (
              <li key={p.id} className="grid border border-niebla bg-blanco sm:grid-cols-[13rem_minmax(0,1fr)]">
                <div className="relative aspect-[4/5] bg-azul sm:aspect-auto sm:min-h-[16rem]">
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={p.nombre} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    // Marcador hasta que llegue la foto: la inicial sobre azul.
                    <span
                      className="absolute inset-0 flex items-center justify-center font-dato text-[96px] font-semibold leading-none text-blanco/90"
                      aria-hidden="true"
                    >
                      {p.nombre.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="p-7">
                  <p className="text-dato font-semibold uppercase tracking-wide text-rojo">{p.rol}</p>
                  <h3 className="mt-2 text-seccion text-azul">{p.nombre}</h3>
                  <p className="mt-4 text-lectura text-pizarra">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Envoltura>

      {/* Por qué boutique. */}
      <Envoltura id="boutique" fondo="blanco" ancho="max-w-6xl">
        <Cabecera titulo={boutique.h2} entrada={boutique.entrada} />
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {boutique.items.map((b) => {
            const Icono = ICONOS[b.icono];
            return (
              <li key={b.titulo} className="border-t-2 border-azul pt-6">
                <Icono className="h-8 w-8 text-rojo" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-subtitulo text-azul">{b.titulo}</h3>
                <p className="mt-3 text-lectura text-pizarra">{b.body}</p>
              </li>
            );
          })}
        </ul>
      </Envoltura>

      <BloqueAccion
        temperatura="templado"
        titulo={cierre.titulo}
        apoyo={cierre.apoyo}
        accion={{ texto: cierre.accion, href: "/contacto" }}
      />
    </>
  );
}
