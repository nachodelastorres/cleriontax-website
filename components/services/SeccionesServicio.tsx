import { Angulo } from "@/components/brand/Formas";
import {
  Envoltura,
  Cabecera,
  BloqueCifras,
  BloqueCronologia,
  BloqueComparativa,
  BloqueCita,
  BloqueFormas,
  BloqueTabla,
  type FondoSeccion,
  type Cifra,
  type Hito,
  type Columna,
  type PasoForma,
  type NombreForma,
} from "@/components/secciones/Bloques";
import type { FilaDato } from "@/components/brand/TablaDatos";

/**
 * Renderiza las secciones de una página.
 *
 * Cada sección declara qué es —prosa, viñetas, pasos, casos, preguntas, cifras,
 * cronología, comparativa, cita o tabla— y sobre qué fondo va. De ahí sale el
 * ritmo distinto de cada página sin salirse del sistema: no hay dos páginas
 * que compongan los mismos bloques en el mismo orden.
 *
 * Si una sección no declara `fondo`, alterna blanco y papel como antes.
 */

export interface Seccion {
  id: string;
  h2: string;
  /** Entradilla bajo el titular de sección. */
  entrada?: string;
  fondo?: FondoSeccion;

  body?: string;
  bullets?: string[];
  steps?: { title: string; body: string }[];
  items?: ({ title: string; body: string } | { q: string; a: string })[];

  cifras?: Cifra[];
  hitos?: Hito[];
  columnas?: Columna[];
  formas?: PasoForma[];
  cita?: { texto: string; pie?: string; forma?: NombreForma };
  tabla?: {
    titulo?: string;
    periodo?: string;
    filas: FilaDato[];
    criterio: string;
    columnaConcepto?: string;
    columnaValor?: string;
    pie?: string;
  };
  /** Solo en la sección de cierre, que monta la página aparte. */
  button?: { label: string; href: string };
}

/**
 * Texto plano con enlaces internos escritos como `[texto](/ruta)`. Es la única
 * marca que admite la prosa: lo justo para enlazar páginas entre sí sin abrir
 * la puerta a HTML en el contenido.
 */
function ConEnlaces({
  texto,
  locale,
  oscuro,
}: {
  texto: string;
  locale?: string;
  oscuro?: boolean;
}) {
  // Con dos grupos, split devuelve: texto, etiqueta, ruta, texto, etiqueta, ruta…
  const partes = texto.split(/\[([^\]]+)\]\((\/[^)\s]*)\)/g);
  return (
    <>
      {partes.map((parte, i) => {
        if (i % 3 === 0) return parte;
        if (i % 3 === 2) return null;
        const ruta = partes[i + 1];
        const href = locale && !ruta.startsWith("/#") ? `/${locale}${ruta}` : ruta;
        return (
          <a
            key={i}
            href={href}
            className={`font-semibold underline decoration-rojo underline-offset-4 ${
              oscuro ? "text-blanco" : "text-azul hover:text-rojo"
            }`}
          >
            {parte}
          </a>
        );
      })}
    </>
  );
}

function Cuerpo({ texto, oscuro, locale }: { texto: string; oscuro?: boolean; locale?: string }) {
  return (
    <div className="max-w-[72ch] space-y-4">
      {texto.split(/\n{2,}/).map((p, i) => (
        <p key={i} className={`text-lectura ${oscuro ? "text-niebla" : "text-pizarra"}`}>
          <ConEnlaces texto={p} locale={locale} oscuro={oscuro} />
        </p>
      ))}
    </div>
  );
}

/** Los enlaces internos del contenido se escriben sin idioma: aquí se les añade. */
function conIdioma(html: string, locale?: string) {
  return locale ? html.replace(/href="\/(?!\/)/g, `href="/${locale}/`) : html;
}

function Vinetas({
  items,
  oscuro,
  locale,
}: {
  items: string[];
  oscuro?: boolean;
  locale?: string;
}) {
  return (
    <ul className="grid max-w-[72ch] gap-4">
      {items.map((b, i) => (
        <li key={i} className="grid grid-cols-[14px_1fr] gap-3">
          <Angulo tam={10} className="mt-2 text-rojo" />
          <span
            className={`text-lectura ${oscuro ? "text-niebla [&_strong]:text-blanco" : "text-pizarra [&_strong]:text-azul"} [&_strong]:font-semibold`}
            dangerouslySetInnerHTML={{ __html: conIdioma(b, locale) }}
          />
        </li>
      ))}
    </ul>
  );
}

function Pasos({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid max-w-[76ch] gap-px border border-niebla bg-niebla">
      {items.map((s, i) => (
        <li key={i} className="grid grid-cols-[24px_1fr] gap-3 bg-blanco p-6">
          <Angulo tam={12} className="mt-2 text-rojo" />
          <div>
            <h3 className="text-subtitulo text-azul">{s.title}</h3>
            <p className="mt-2 text-lectura text-pizarra">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Casos({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-px border border-niebla bg-niebla md:grid-cols-2">
      {items.map((c, i) => (
        <article key={i} className="bg-blanco p-6">
          <h3 className="text-subtitulo text-azul">{c.title}</h3>
          <p className="mt-3 text-nota text-pizarra">{c.body}</p>
        </article>
      ))}
    </div>
  );
}

function Preguntas({ items, locale }: { items: { q: string; a: string }[]; locale?: string }) {
  return (
    <dl className="grid max-w-[76ch] gap-px border border-niebla bg-niebla">
      {items.map((f, i) => (
        <div key={i} className="bg-blanco p-6">
          <dt className="text-subtitulo text-azul">{f.q}</dt>
          <dd className="mt-2 text-lectura text-pizarra">
            <ConEnlaces texto={f.a} locale={locale} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function SeccionesServicio({
  secciones,
  locale,
}: {
  secciones: Seccion[];
  /** Para prefijar los enlaces internos y traducir las etiquetas fijas. */
  locale?: string;
}) {
  const visibles = secciones.filter((s) => s.id !== "cta");

  return (
    <>
      {visibles.map((s, i) => {
        const esFaq = s.id === "faq";
        const fondo: FondoSeccion = s.fondo ?? (i % 2 === 0 ? "blanco" : "papel");
        const oscuro = fondo === "azul" || fondo === "patron";

        // Una cita a escala de portada no lleva cabecera: es la cabecera.
        if (s.cita) {
          return (
            <Envoltura key={s.id} id={s.id} fondo={fondo}>
              <BloqueCita {...s.cita} />
            </Envoltura>
          );
        }

        return (
          <Envoltura key={s.id} id={s.id} fondo={fondo}>
            <Cabecera
              titulo={s.h2}
              entrada={s.entrada}
              oscuro={oscuro}
            />

            <div>
              {s.body ? <Cuerpo texto={s.body} oscuro={oscuro} locale={locale} /> : null}
              {s.cifras ? <BloqueCifras cifras={s.cifras} oscuro={oscuro} /> : null}
              {s.hitos ? <BloqueCronologia hitos={s.hitos} /> : null}
              {s.columnas ? <BloqueComparativa columnas={s.columnas} locale={locale} /> : null}
              {s.formas ? <BloqueFormas pasos={s.formas} oscuro={oscuro} /> : null}
              {s.tabla ? <BloqueTabla {...s.tabla} /> : null}
              {s.bullets ? (
                <div className={s.body ? "mt-8" : ""}>
                  <Vinetas items={s.bullets} oscuro={oscuro} locale={locale} />
                </div>
              ) : null}
              {s.steps ? <Pasos items={s.steps} /> : null}
              {s.items && !esFaq ? (
                <Casos items={s.items as { title: string; body: string }[]} />
              ) : null}
              {s.items && esFaq ? (
                <Preguntas items={s.items as { q: string; a: string }[]} locale={locale} />
              ) : null}
            </div>
          </Envoltura>
        );
      })}
    </>
  );
}
