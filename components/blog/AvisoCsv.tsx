import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import { TARIFAS } from "@/lib/tarifas";
import { rutaPagina } from "@/lib/paginas";

/**
 * Los tutoriales de exportar historiales son lo que más tráfico trae al blog,
 * y quien los lee está reuniendo sus datos para Hacienda: justo el cliente del
 * informe fiscal. Aquí no vale el cierre genérico del artículo; se le ofrece
 * el siguiente paso de lo que está haciendo, con el precio a la vista.
 *
 * Dos piezas: una línea al empezar, para quien prefiere no hacerlo, y un
 * bloque al terminar, para quien ya tiene el CSV.
 */

/** Artículo → plataforma que nombra el aviso. */
export const PLATAFORMA_CSV: Record<string, string> = {
  "como-exportar-historial-binance-correctamente": "Binance",
  "como-exportar-historial-bybit-csv-tributacion": "Bybit",
  "como-obtener-csv-kraken-tributacion": "Kraken",
  "como-exportar-historial-metamask": "MetaMask",
  "como-exportar-historial-ledger-csv": "Ledger",
};

const PRECIO_DESDE = Math.min(...TARIFAS.map((t) => t.precio));

function euros(locale: string, valor: number) {
  return new Intl.NumberFormat(locale === "en" ? "en-IE" : `${locale}-ES`, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(valor);
}

export async function AvisoCsvLinea({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blog.avisoCsv" });
  return (
    <p className="mb-10 border-l-2 border-rojo bg-papel px-5 py-4 text-nota text-pizarra">
      {t("linea", { precio: euros(locale, PRECIO_DESDE) })}{" "}
      <Link
        href={`${rutaPagina("informe-fiscal-criptomonedas", locale)}#diagnostico`}
        className="inline-flex items-center gap-1 font-semibold text-rojo underline-offset-4 hover:underline"
      >
        {t("lineaAccion")}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </p>
  );
}

export async function AvisoCsvBloque({ locale, plataforma }: { locale: string; plataforma: string }) {
  const t = await getTranslations({ locale, namespace: "blog.avisoCsv" });
  return (
    <aside className="mt-12 border border-niebla border-l-4 border-l-rojo bg-blanco p-7 md:p-8">
      <h2 className="text-subtitulo text-azul">{t("titulo", { plataforma })}</h2>
      <p className="mt-3 max-w-[62ch] text-lectura text-pizarra">{t("texto")}</p>
      <p className="mt-4 text-lectura font-semibold text-azul">
        {t("precio", { precio: euros(locale, PRECIO_DESDE) })}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
        <ButtonLink
          href={`${rutaPagina("informe-fiscal-criptomonedas", locale)}#diagnostico`}
          variant="principal"
          size="lg"
        >
          {t("accion")}
        </ButtonLink>
        <Link
          href={rutaPagina("precios", locale)}
          className="text-nota font-semibold text-azul underline-offset-4 hover:underline"
        >
          {t("verPrecios")}
        </Link>
      </div>
    </aside>
  );
}
