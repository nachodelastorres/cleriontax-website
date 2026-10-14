import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Cabecera, Envoltura } from "@/components/secciones/Bloques";
import { TARIFAS } from "@/lib/tarifas";

/**
 * Precio de las páginas de «¿Cómo lo justifico ante la AEAT?».
 *
 * Aquí no se cobra una cosa sino dos, y se enseñan como dos partes seguidas:
 * reconstruir las cifras, con los tramos más el suplemento por plazo, y contestar a Hacienda,
 * con presupuesto cerrado en cuanto se lee la notificación. Los importes salen
 * de `lib/tarifas.ts`, como en el resto de la web.
 */

export interface TextosPrecioFases {
  h2: string;
  entrada?: string;
  /**
   * Euros que se suman a cada tramo: reconstruir cifras para un procedimiento
   * abierto no es el mismo trabajo que un informe sin plazo.
   */
  suplemento?: number;
  reconstruccion: { titulo: string; body: string; nota?: string };
  contestacion: { titulo: string; precio: string; body: string; incluye: string[] };
  accion: string;
}

export default async function PrecioFases({
  locale,
  textos,
  id = "precio",
}: {
  locale: string;
  textos: TextosPrecioFases;
  id?: string;
}) {
  const t = await getTranslations({ locale, namespace: "tarifas" });
  const formato = new Intl.NumberFormat(locale === "en" ? "en-IE" : `${locale}-ES`, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <Envoltura id={id} fondo="papel" ancho="max-w-6xl">
      <Cabecera titulo={textos.h2} entrada={textos.entrada} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
        {/* Reconstruir: los tramos, con el suplemento por plazo. */}
        <div className="border border-niebla bg-blanco p-7 md:p-8">
          <h3 className="text-subtitulo text-azul">{textos.reconstruccion.titulo}</h3>
          <p className="mt-2 text-nota text-pizarra">{textos.reconstruccion.body}</p>
          <dl className="mt-6">
            {TARIFAS.map((tarifa) => (
              <div
                key={tarifa.id}
                className="flex items-baseline justify-between gap-4 border-t border-niebla py-3"
              >
                <dt className="text-lectura text-azul">{t(`items.${tarifa.id}.nombre`)}</dt>
                <dd className="font-dato text-subtitulo text-azul">
                  {tarifa.desde ? (
                    <span className="mr-1.5 text-nota text-pizarra">{t("desde")}</span>
                  ) : null}
                  {formato.format(tarifa.precio + (textos.suplemento ?? 0))}
                </dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-niebla pt-3 text-dato text-pizarra">{t("iva")}</p>
          {textos.reconstruccion.nota ? (
            <p className="mt-4 border-l-2 border-rojo pl-3 text-nota text-azul">
              {textos.reconstruccion.nota}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-center" aria-hidden="true">
          <ArrowRight className="h-8 w-8 rotate-90 text-rojo lg:rotate-0" strokeWidth={1.75} />
        </div>

        {/* Contestar: presupuesto cerrado tras leer la notificación. */}
        <div className="flex flex-col bg-azul p-7 md:p-8">
          <h3 className="text-subtitulo text-blanco">{textos.contestacion.titulo}</h3>
          <p className="mt-6 text-[34px] font-semibold leading-none tracking-[-0.02em] text-blanco">
            {textos.contestacion.precio}
          </p>
          <p className="mt-4 text-nota text-niebla">{textos.contestacion.body}</p>
          <ul className="mt-6 grid gap-3 border-t border-pizarra/40 pt-6">
            {textos.contestacion.incluye.map((item) => (
              <li key={item} className="grid grid-cols-[12px_1fr] gap-3 text-nota text-niebla">
                <span className="mt-2 h-1.5 w-1.5 bg-rojo" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

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
