import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Cabecera } from "@/components/secciones/Bloques";

/**
 * Los cuatro perfiles del manual (§05), cada uno con su puerta.
 *
 * A, B y C entran por una situación; D, el despacho que deriva, tiene página
 * propia porque su argumento no es el problema sino la metodología (plan,
 * decisión C). Por eso D va en azul: es el único bloque que no habla al
 * contribuyente.
 */
const PERFILES = [
  { id: "A", href: "/situaciones/miles-de-transacciones" },
  { id: "B", href: "/situaciones/declarar-criptomonedas" },
  // C es el perfil con plazo: su letra es la única pieza en rojo del bloque.
  { id: "C", href: "/situaciones/requerimiento-de-hacienda", acento: true },
  { id: "D", href: "/despachos", oscuro: true },
] as const;

export default async function Perfiles({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.perfiles" });

  return (
    <section className="bg-papel">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Cabecera titulo={t("titulo")} entrada={t("entrada")} />

        <div className="grid gap-px border border-niebla bg-niebla sm:grid-cols-2 lg:grid-cols-4">
          {PERFILES.map((p) => {
            const oscuro = "oscuro" in p && p.oscuro;
            const acento = "acento" in p && p.acento;
            return (
              <Link
                key={p.id}
                href={p.href}
                className={`group flex flex-col p-7 transition-colors duration-200 ${
                  oscuro ? "bg-azul hover:bg-azul/95" : "bg-blanco hover:bg-papel/70"
                }`}
              >
                <span
                  className={`text-[80px] font-extrabold leading-none tracking-[-0.05em] ${
                    acento ? "text-rojo" : oscuro ? "text-blanco" : "text-azul"
                  }`}
                  aria-hidden="true"
                >
                  {p.id}
                </span>

                <h3 className={`mt-8 text-subtitulo ${oscuro ? "text-blanco" : "text-azul"}`}>
                  {t(`items.${p.id}.nombre`)}
                </h3>
                <p className={`mt-3 flex-1 text-nota ${oscuro ? "text-niebla" : "text-pizarra"}`}>
                  {t(`items.${p.id}.descripcion`)}
                </p>

                <div className={`mt-6 border-t pt-4 ${oscuro ? "border-blanco/20" : "border-niebla"}`}>
                  <p className={`text-dato ${oscuro ? "text-niebla" : "text-pizarra"}`}>{t("mensaje")}</p>
                  <p className={`mt-1 text-nota font-semibold ${oscuro ? "text-blanco" : "text-azul"}`}>
                    {t(`items.${p.id}.mensaje`)}
                  </p>
                </div>

                <span
                  className={`mt-6 inline-flex items-center gap-2 text-nota font-semibold group-hover:underline group-hover:underline-offset-4 ${
                    oscuro ? "text-blanco" : "text-azul"
                  }`}
                >
                  {t(`items.${p.id}.enlace`)}
                  <ArrowRight className={`h-4 w-4 flex-none ${oscuro ? "text-blanco" : "text-rojo"}`} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
