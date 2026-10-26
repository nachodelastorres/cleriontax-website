import { ArrowRight } from "lucide-react";
import { Angulo } from "@/components/brand/Formas";
import { Cabecera, Envoltura, type FondoSeccion } from "@/components/secciones/Bloques";

/**
 * Precio fijo de un encargo que no se cotiza por tramos (el modelo 721).
 *
 * Mismo dibujo que una tarjeta de `Tarifas`, con lo que incluye al lado. El
 * importe lo pasa la página desde `lib/tarifas.ts`; los textos, del JSON.
 */

export interface TextosPrecioUnico {
  h2: string;
  entrada?: string;
  nombre: string;
  /** «IVA incluido, por ejercicio»: junto a la cifra. */
  unidad: string;
  incluyeTitulo: string;
  incluye: string[];
  nota?: string;
  accion: string;
  fondo?: FondoSeccion;
}

export default function PrecioUnico({
  locale,
  precio,
  textos,
  id = "precio",
}: {
  locale: string;
  precio: number;
  textos: TextosPrecioUnico;
  id?: string;
}) {
  const formato = new Intl.NumberFormat(locale === "en" ? "en-IE" : `${locale}-ES`, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <Envoltura id={id} fondo={textos.fondo ?? "papel"} ancho="max-w-6xl">
      <Cabecera titulo={textos.h2} entrada={textos.entrada} />

      <div className="grid gap-px border border-niebla bg-niebla md:grid-cols-[2fr_3fr]">
        <div className="flex flex-col bg-azul p-7 md:p-8">
          <h3 className="text-subtitulo text-blanco">{textos.nombre}</h3>
          <p className="mt-6 font-dato tabular-nums text-[44px] leading-none tracking-[-0.03em] text-blanco">
            {formato.format(precio)}
          </p>
          <p className="mt-2 text-dato text-niebla">{textos.unidad}</p>
        </div>
        <div className="bg-blanco p-7 md:p-8">
          <h3 className="text-subtitulo text-azul">{textos.incluyeTitulo}</h3>
          <ul className="mt-5 grid gap-3">
            {textos.incluye.map((item) => (
              <li key={item} className="grid grid-cols-[14px_1fr] gap-3">
                <Angulo tam={10} className="mt-2 text-rojo" />
                <span className="text-lectura text-pizarra">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {textos.nota ? <p className="mt-6 max-w-[72ch] text-nota text-pizarra">{textos.nota}</p> : null}

      <a
        href="#diagnostico"
        className="mt-8 inline-flex items-center gap-2 text-nota font-semibold text-rojo underline-offset-4 hover:underline"
      >
        {textos.accion}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </Envoltura>
  );
}
