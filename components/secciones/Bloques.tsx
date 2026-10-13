import { Angulo, AnguloInverso, Arco, CuartoDeCirculo } from "@/components/brand/Formas";
import Patron from "@/components/brand/Patron";
import TablaDatos, { type FilaDato } from "@/components/brand/TablaDatos";
import ChipEstado from "@/components/brand/ChipEstado";
import ButtonLink from "@/components/ui/ButtonLink";
import {
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  Blocks,
  ChartCandlestick,
  Coins,
  Gift,
  Store,
  Wallet,
} from "lucide-react";

/**
 * Biblioteca de bloques de sección.
 *
 * El manual es austero —color plano, esquinas rectas, sin sombras— pero austero
 * no es monótono. La variedad no sale de decorar, sale de tres cosas que el
 * sistema sí permite: cambiar la escala, cambiar la composición y usar las
 * piezas de la marca (las cuatro formas y el patrón) como elementos
 * estructurales y no como iconos pequeños.
 *
 * Cada sección del contenido declara su `tipo` y su `fondo`, y aquí se le da
 * el tratamiento que le corresponde.
 */

export type FondoSeccion = "blanco" | "papel" | "azul" | "patron";

const FORMAS = { angulo: Angulo, arco: Arco, cuarto: CuartoDeCirculo, inverso: AnguloInverso };
export type NombreForma = keyof typeof FORMAS;

/**
 * Iconos para cuando cada tarjeta nombra una cosa concreta —un tipo de fuente,
 * una plataforma— y no un paso. Ahí las formas del símbolo se confunden con
 * las de los procesos de otras secciones; un icono dice qué es cada una.
 */
const ICONOS = {
  exchange: ChartCandlestick,
  wallet: Wallet,
  defi: Blocks,
  mercado: Store,
  euros: Banknote,
  permuta: ArrowLeftRight,
  rendimiento: Coins,
  regalo: Gift,
};
export type NombreIcono = keyof typeof ICONOS;

/* ---------------------------------------------------------------- Envoltura */

export function Envoltura({
  id,
  fondo = "blanco",
  children,
  ancho = "max-w-5xl",
}: {
  id?: string;
  fondo?: FondoSeccion;
  children: React.ReactNode;
  ancho?: string;
}) {
  const oscuro = fondo === "azul" || fondo === "patron";
  const clases =
    fondo === "papel" ? "bg-papel" : oscuro ? "bg-azul" : "bg-blanco";

  return (
    <section id={id} className={`relative overflow-hidden scroll-mt-20 ${clases}`}>
      {fondo === "patron" ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 lg:block">
          <Patron version="azul" bloque={64} />
        </div>
      ) : null}
      <div className={`relative mx-auto ${ancho} px-6 py-14 md:py-16`}>{children}</div>
    </section>
  );
}

export function Cabecera({
  marca,
  titulo,
  entrada,
  oscuro = false,
}: {
  /** Marca de sección. Sin ella, la cabecera empieza en el margen. */
  marca?: string;
  titulo: string;
  entrada?: string;
  oscuro?: boolean;
}) {
  return (
    <div className={`mb-9 ${marca ? "grid grid-cols-[44px_1fr] gap-3" : ""}`}>
      {marca ? (
        <span className="pt-2 font-semibold text-dato text-rojo">{marca}</span>
      ) : null}
      <div>
        <h2 className={`text-seccion ${oscuro ? "text-blanco" : "text-azul"}`}>{titulo}</h2>
        {entrada ? (
          <p
            className={`mt-4 max-w-[64ch] text-lectura ${oscuro ? "text-niebla" : "text-pizarra"}`}
          >
            {entrada}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Cifras */

export interface Cifra {
  valor: string;
  etiqueta: string;
  /** Destaca una sola cifra del grupo, la que sostiene el argumento. */
  acento?: boolean;
}

/** Cifras grandes. Solo cuando el número es de verdad el argumento (§11). */
export function BloqueCifras({ cifras, oscuro }: { cifras: Cifra[]; oscuro?: boolean }) {
  return (
    <div
      className={`grid gap-px sm:grid-cols-2 lg:grid-cols-${Math.min(cifras.length, 4)} ${
        oscuro ? "bg-pizarra/40" : "bg-niebla"
      } border ${oscuro ? "border-pizarra/40" : "border-niebla"}`}
    >
      {cifras.map((c, i) => (
        <div key={i} className={`${oscuro ? "bg-azul" : "bg-blanco"} p-7`}>
          <div
            className={`font-dato tabular-nums text-[44px] leading-none tracking-[-0.03em] ${
              c.acento ? "text-rojo" : oscuro ? "text-blanco" : "text-azul"
            }`}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {c.valor}
          </div>
          <p className={`mt-4 text-nota ${oscuro ? "text-niebla" : "text-pizarra"}`}>
            {c.etiqueta}
          </p>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- Cronología */

export interface Hito {
  cuando: string;
  titulo: string;
  body: string;
  /** El hito en el que se agota el plazo. */
  critico?: boolean;
}

/**
 * Línea de tiempo de un procedimiento. Es el bloque que faltaba para las
 * situaciones con plazo: una fecha se entiende mejor colocada en un eje que
 * descrita en un párrafo.
 */
export function BloqueCronologia({ hitos }: { hitos: Hito[] }) {
  return (
    <ol className="relative grid gap-px border border-niebla bg-niebla">
      {hitos.map((h, i) => (
        <li key={i} className="grid grid-cols-[110px_1fr] gap-4 bg-blanco p-6 md:grid-cols-[150px_1fr] md:p-7">
          <div className="flex items-start gap-3">
            <span
              className={`mt-1.5 h-2.5 w-2.5 flex-none ${h.critico ? "bg-rojo" : "bg-niebla"}`}
              aria-hidden="true"
            />
            <span
              className={`font-dato tabular-nums text-dato ${h.critico ? "text-rojo" : "text-pizarra"}`}
            >
              {h.cuando}
            </span>
          </div>
          <div>
            <h3 className="text-subtitulo text-azul">{h.titulo}</h3>
            <p className="mt-2 max-w-[64ch] text-lectura text-pizarra">{h.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- Contraste */

export interface Contraste {
  /** Cabeceras de las dos columnas: lo que falla y cómo queda bien hecho. */
  antes: string;
  despues: string;
  filas: { aspecto: string; antes: string; despues: string }[];
}

/**
 * Antes y después, emparejados fila a fila. Cuando cada fallo tiene su
 * corrección, ponerlos uno frente a otro deja leer cada par de un vistazo, sin
 * tener que cruzar dos listas en paralelo.
 */
export function BloqueContraste({ antes, despues, filas }: Contraste) {
  return (
    <div className="mt-10 border border-niebla bg-blanco">
      {/* Cabeceras: solo en pantalla ancha, donde las columnas se alinean. */}
      <div className="hidden grid-cols-[10rem_1fr_2.5rem_1fr] items-end gap-x-6 border-b border-niebla px-7 py-6 md:grid">
        <span aria-hidden="true" />
        <h3 className="bg-ambar-revision/15 px-4 py-3 text-center text-subtitulo text-azul">
          {antes}
        </h3>
        <span aria-hidden="true" />
        <h3 className="bg-verde-conciliado/10 px-4 py-3 text-center text-subtitulo text-azul">
          {despues}
        </h3>
      </div>

      <ul>
        {filas.map((f, i) => (
          <li
            key={i}
            className={`grid gap-x-6 gap-y-3 px-7 py-6 md:grid-cols-[10rem_1fr_2.5rem_1fr] md:items-center ${
              i > 0 ? "border-t border-niebla" : ""
            }`}
          >
            <span className="text-dato font-semibold uppercase tracking-wide text-pizarra">
              {f.aspecto}
            </span>

            <span className="text-nota text-azul">
              <span className="sr-only">{antes}: </span>
              {f.antes}
            </span>

            <ArrowRight
              className="hidden h-5 w-5 text-rojo md:block"
              strokeWidth={2}
              aria-hidden="true"
            />

            <span className="text-nota text-azul">
              <span className="sr-only">{despues}: </span>
              {f.despues}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- Derivación */

export interface Derivacion {
  /** El caso del lector, en forma de pregunta: es el gancho. */
  pregunta: string;
  apoyo?: string;
  accion: string;
  href: string;
}

/**
 * Lleva a la página vecina cuando el lector está en otro caso. Va en una
 * franja y con botón, no como enlace dentro de una viñeta: es una acción, y
 * una viñeta más se pierde. El botón es secundario para no competir con la
 * acción principal de la página.
 */
export function BloqueDerivacion({ pregunta, apoyo, accion, href }: Derivacion) {
  return (
    <div className="mt-10 flex flex-col gap-6 border border-niebla border-l-4 border-l-rojo bg-blanco px-7 py-7 md:flex-row md:items-center md:justify-between md:gap-10">
      <div>
        <p className="text-subtitulo text-azul">{pregunta}</p>
        {apoyo ? <p className="mt-2 text-nota text-pizarra">{apoyo}</p> : null}
      </div>
      <ButtonLink href={href} variant="secundaria" className="flex-none gap-2">
        {accion}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </ButtonLink>
    </div>
  );
}

/* -------------------------------------------------------------- Comparativa */

export interface Columna {
  titulo: string;
  items: string[];
  /** La columna que representa la posición de la marca. */
  correcta?: boolean;
}

/** Dos columnas enfrentadas. Para contrastes del tipo «así sí / así no» (§15). */
const ETIQUETAS_COMPARATIVA: Record<string, { si: string; no: string }> = {
  es: { si: "Así sí", no: "Así no" },
  ca: { si: "Així sí", no: "Així no" },
  en: { si: "The right way", no: "The wrong way" },
};

export function BloqueComparativa({
  columnas,
  locale = "es",
}: {
  columnas: Columna[];
  locale?: string;
}) {
  const etiquetas = ETIQUETAS_COMPARATIVA[locale] ?? ETIQUETAS_COMPARATIVA.es;
  return (
    <div className="grid gap-px border border-niebla bg-niebla md:grid-cols-2">
      {columnas.map((c, i) => (
        <div key={i} className="bg-blanco p-7">
          <div className="flex items-center gap-3">
            <ChipEstado estado={c.correcta ? "conciliado" : "revision"}>
              {c.correcta ? etiquetas.si : etiquetas.no}
            </ChipEstado>
          </div>
          <h3 className="mt-5 text-subtitulo text-azul">{c.titulo}</h3>
          <ul className="mt-4 grid gap-3">
            {c.items.map((it, j) => (
              <li key={j} className="grid grid-cols-[12px_1fr] gap-3">
                <span
                  className={`mt-2 h-2 w-2 flex-none ${c.correcta ? "bg-verde-conciliado" : "bg-ambar-revision"}`}
                  aria-hidden="true"
                />
                <span className="text-nota text-pizarra">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------- Cita */

/**
 * Una sola frase a escala de portada. Es el recurso para la tesis de la
 * página: rompe el ritmo de lectura sin añadir un solo adorno.
 */
export function BloqueCita({
  texto,
  pie,
  forma,
}: {
  texto: string;
  pie?: string;
  forma?: NombreForma;
}) {
  const Forma = forma ? FORMAS[forma] : null;

  return (
    <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
      {Forma ? <Forma tam={72} className="flex-none text-rojo" /> : null}
      <div>
        <p className="max-w-[20ch] text-hero text-blanco">{texto}</p>
        {pie ? <p className="mt-6 max-w-[60ch] text-lectura text-niebla">{pie}</p> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Formas */

export interface PasoForma {
  /** Una de las dos: la forma del símbolo, o un icono descriptivo. */
  forma?: NombreForma;
  icono?: NombreIcono;
  titulo: string;
  body: string;
}

/**
 * Las cuatro formas a escala grande explicando un proceso. Es el uso que el
 * manual les da (§08): vocabulario gráfico, no decoración.
 */
export function BloqueFormas({ pasos, oscuro }: { pasos: PasoForma[]; oscuro?: boolean }) {
  return (
    <div
      className={`grid gap-px border sm:grid-cols-2 lg:grid-cols-4 ${
        oscuro ? "border-pizarra/40 bg-pizarra/40" : "border-niebla bg-niebla"
      }`}
    >
      {pasos.map((p, i) => {
        const Icono = p.icono ? ICONOS[p.icono] : null;
        const Forma = FORMAS[p.forma ?? "angulo"];
        const esCriterio = p.forma === "cuarto";
        return (
          <div key={i} className={`${oscuro ? "bg-azul" : "bg-blanco"} p-7`}>
            {Icono ? (
              <Icono
                size={48}
                strokeWidth={1.5}
                aria-hidden="true"
                className={oscuro ? "text-blanco" : "text-azul"}
              />
            ) : (
              <Forma
                tam={64}
                className={esCriterio ? "text-rojo" : oscuro ? "text-blanco" : "text-azul"}
              />
            )}
            <h3 className={`mt-6 text-subtitulo ${oscuro ? "text-blanco" : "text-azul"}`}>
              {p.titulo}
            </h3>
            <p className={`mt-2 text-nota ${oscuro ? "text-niebla" : "text-pizarra"}`}>
              {p.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------- Tabla */

export function BloqueTabla({
  titulo,
  periodo,
  filas,
  criterio,
  columnaConcepto,
  columnaValor,
  pie,
}: {
  titulo?: string;
  periodo?: string;
  filas: FilaDato[];
  criterio: string;
  /** Cabeceras y pie ya traducidos. En español se usan los de TablaDatos. */
  columnaConcepto?: string;
  columnaValor?: string;
  pie?: string;
}) {
  return (
    <TablaDatos
      titulo={titulo}
      periodo={periodo}
      filas={filas}
      criterio={criterio}
      columnaConcepto={columnaConcepto}
      columnaValor={columnaValor}
      pie={pie}
      datosDeEjemplo
      className="max-w-3xl"
    />
  );
}
