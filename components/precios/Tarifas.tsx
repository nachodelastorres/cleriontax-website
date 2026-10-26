import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Angulo } from "@/components/brand/Formas";
import { Cabecera, Envoltura, type FondoSeccion } from "@/components/secciones/Bloques";
import { TARIFAS, PRECIO_RENTA } from "@/lib/tarifas";
import { rutaPagina } from "@/lib/paginas";

/**
 * Los cuatro tramos de precio.
 *
 * Aparece en tres sitios con el mismo dibujo: la home (sin el desglose, con
 * enlace a /precios), cada página de servicio que se cotiza por tramos y la
 * propia página de precios. Los importes salen de `lib/tarifas.ts`; los textos,
 * del namespace `tarifas`, salvo el titular y la entradilla, que cada página
 * puede ajustar a su caso.
 *
 * Bajo las tarjetas va la elección de cómo terminar: llevar las cifras al
 * asesor de siempre (incluido) o que presentemos la renta (aparte). La renta
 * no entra nunca en el tramo, y se cuenta como opción, no como exclusión.
 */
export default async function Tarifas({
  locale,
  titulo,
  entrada,
  nota,
  fondo = "papel",
  resumida = false,
  id = "precio",
}: {
  locale: string;
  titulo?: string;
  entrada?: string;
  /** Matiz propio de la página, bajo las tarjetas. */
  nota?: string;
  fondo?: FondoSeccion;
  /** Solo las tarjetas y el enlace a /precios. */
  resumida?: boolean;
  id?: string;
}) {
  const t = await getTranslations({ locale, namespace: "tarifas" });
  const incluye = t.raw("incluye") as string[];
  const formato = new Intl.NumberFormat(locale === "en" ? "en-IE" : `${locale}-ES`, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <Envoltura id={id} fondo={fondo} ancho="max-w-6xl">
      <Cabecera titulo={titulo ?? t("titulo")} entrada={entrada ?? t("entrada")} />

      <ul className="grid gap-px border border-niebla bg-niebla sm:grid-cols-2 lg:grid-cols-4">
        {TARIFAS.map((tarifa) => {
          const ultima = tarifa.desde;
          return (
            <li key={tarifa.id} className={`flex flex-col p-7 ${ultima ? "bg-azul" : "bg-blanco"}`}>
              <h3 className={`text-subtitulo ${ultima ? "text-blanco" : "text-azul"}`}>
                {t(`items.${tarifa.id}.nombre`)}
              </h3>
              <p className="mt-6 flex items-baseline gap-2">
                {tarifa.desde ? (
                  <span className="text-nota text-niebla">{t("desde")}</span>
                ) : null}
                <span
                  className={`font-dato tabular-nums text-[44px] leading-none tracking-[-0.03em] ${
                    ultima ? "text-blanco" : "text-azul"
                  }`}
                >
                  {formato.format(tarifa.precio)}
                </span>
              </p>
              {/* Junto al importe y no en una nota al pie: la duda surge al ver la cifra. */}
              <p className={`mt-2 text-dato ${ultima ? "text-niebla" : "text-pizarra"}`}>
                {t("iva")}
              </p>
              <p className={`mt-5 flex-1 text-nota ${ultima ? "text-niebla" : "text-pizarra"}`}>
                {t(`items.${tarifa.id}.para`)}
              </p>
            </li>
          );
        })}
      </ul>

      {nota ? <p className="mt-6 max-w-[72ch] text-nota text-pizarra">{nota}</p> : null}

      {resumida ? (
        <p className="mt-6 max-w-[72ch] text-nota text-pizarra">
          {t("renta.linea", { precio: formato.format(PRECIO_RENTA) })}
        </p>
      ) : (
        <div className="mt-12">
          <h3 className="text-subtitulo text-azul">{t("renta.titulo")}</h3>
          <p className="mt-3 max-w-[72ch] text-lectura text-pizarra">{t("renta.entrada")}</p>
          <div className="mt-6 grid gap-px border border-niebla bg-niebla md:grid-cols-2">
            <div className="flex flex-col bg-blanco p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-subtitulo text-azul">{t("renta.asesor.titulo")}</h4>
                <p className="text-nota font-semibold text-pizarra">{t("renta.asesor.precio")}</p>
              </div>
              <p className="mt-4 text-lectura text-pizarra">{t("renta.asesor.body")}</p>
            </div>
            <div className="flex flex-col border-t-4 border-rojo bg-blanco p-7 md:border-t-0 md:border-l-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-subtitulo text-azul">{t("renta.nosotros.titulo")}</h4>
                <p className="font-dato tabular-nums text-[28px] leading-none tracking-[-0.02em] text-azul">
                  +{formato.format(PRECIO_RENTA)}
                </p>
              </div>
              <p className="mt-2 text-dato text-pizarra">{t("renta.nosotros.unidad")}</p>
              <p className="mt-4 text-lectura text-pizarra">{t("renta.nosotros.body")}</p>
              <p className="mt-4 text-nota text-pizarra">{t("renta.nosotros.nota")}</p>
            </div>
          </div>
        </div>
      )}

      {resumida ? null : (
        <div className="mt-10 grid gap-10 md:grid-cols-[3fr_2fr]">
          <div>
            <h3 className="text-subtitulo text-azul">{t("incluyeTitulo")}</h3>
            <ul className="mt-5 grid gap-3">
              {incluye.map((item) => (
                <li key={item} className="grid grid-cols-[14px_1fr] gap-3">
                  <Angulo tam={10} className="mt-2 text-rojo" />
                  <span className="text-lectura text-pizarra">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-2 border-rojo pl-6">
            <h3 className="text-subtitulo text-azul">{t("fuenteTitulo")}</h3>
            <p className="mt-3 text-lectura text-pizarra">{t("fuenteTexto")}</p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a
          href={resumida ? `/${locale}${rutaPagina("contacto", locale)}` : "#diagnostico"}
          className="inline-flex items-center gap-2 text-nota font-semibold text-rojo underline-offset-4 hover:underline"
        >
          {t("accion")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        {resumida ? (
          <Link
            href="/precios"
            className="text-nota font-semibold text-azul underline-offset-4 hover:underline"
          >
            {t("verPrecios")}
          </Link>
        ) : null}
      </div>
    </Envoltura>
  );
}
