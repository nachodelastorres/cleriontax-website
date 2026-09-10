import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/site";

/**
 * Nota legal de pieza divulgativa — Manual de marca §18.
 *
 * «La información publicada por Cleriontax tiene carácter divulgativo y no
 *  constituye asesoramiento fiscal personalizado ni asesoramiento de inversión.
 *  Cada situación requiere un análisis individual.»
 *
 * El manual la exige en toda pieza divulgativa, así que acompaña a cada
 * artículo, no solo al pie del sitio.
 */
export default async function NotaLegal({ locale }: { locale: string }) {
  const t = await getTranslations({ locale: locale as Locale, namespace: "blog" });

  return (
    <aside className="border-l-2 border-niebla bg-papel px-5 py-4">
      <p className="max-w-[72ch] text-nota text-pizarra">{t("notaLegal")}</p>
    </aside>
  );
}
