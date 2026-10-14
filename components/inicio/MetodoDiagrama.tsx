import { getTranslations } from "next-intl/server";
import { Angulo, AnguloInverso, Arco, CuartoDeCirculo } from "@/components/brand/Formas";
import { Cabecera } from "@/components/secciones/Bloques";
import { formatearNumero } from "@/lib/format";

/**
 * El método en una figura — la composición base del manual (§12):
 *
 *   «A la izquierda, datos de longitudes distintas: exchanges, wallets,
 *    protocolos. En el centro, el símbolo como punto de conciliación. A la
 *    derecha, una columna de ancho constante con una línea en rojo señalando
 *    lo revisado a mano.»
 *
 * Las cifras son de una cartera ficticia y cuadran entre sí: lo que entra por
 * la izquierda es lo que se concilia por la derecha. Llevan su nota de datos
 * de ejemplo (§14).
 */

/** Fuentes de la cartera de ejemplo. El caso Solana: casi todo es spam. */
const FUENTES = [
  { nombre: "Binance · CSV", n: 48212 },
  { nombre: "Solana · wallet", n: 41556 },
  { nombre: "Kraken · API", n: 6930 },
  { nombre: "MetaMask · 0x7a3f…c91b", n: 3877 },
  { nombre: "Ledger · xpub", n: 1204 },
  { nombre: "Uniswap v3", n: 912 },
];

const RECIBIDAS = FUENTES.reduce((suma, f) => suma + f.n, 0); // 102.691
const SPAM = 38900;
const DUPLICADOS = 611;
const INTERNAS = 2418;
export const FISCALES = RECIBIDAS - SPAM - DUPLICADOS - INTERNAS; // 60.762
export const REVISADAS_A_MANO = 37;

/**
 * Longitud de cada barra. Escala de raíz cuadrada: con escala lineal, Uniswap
 * mediría un 2 % de Binance y no se vería; así las longitudes siguen siendo
 * distintas y ordenadas, que es lo que la figura tiene que contar.
 */
const MAXIMO = Math.max(...FUENTES.map((f) => f.n));
const largo = (n: number) => `${Math.round(Math.sqrt(n / MAXIMO) * 100)}%`;

const menos = (n: number) => `−${formatearNumero(n)}`;

export default async function MetodoDiagrama({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.metodo" });

  const filas = [
    { clave: "recibidas", valor: formatearNumero(RECIBIDAS) },
    { clave: "spam", valor: menos(SPAM) },
    { clave: "duplicados", valor: menos(DUPLICADOS) },
    { clave: "internas", valor: menos(INTERNAS) },
    { clave: "fiscales", valor: formatearNumero(FISCALES), total: true },
    { clave: "manual", valor: formatearNumero(REVISADAS_A_MANO), rojo: true },
  ];

  return (
    <section className="bg-azul">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Cabecera titulo={t("titulo")} entrada={t("entrada")} oscuro />

        <figure className="m-0 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-14">
          {/* Izquierda — lo que llega, de longitudes distintas */}
          <div>
            <p className="mb-5 text-nota font-semibold text-blanco">{t("fuentes")}</p>
            <ul className="space-y-4">
              {FUENTES.map((f) => (
                <li key={f.nombre}>
                  <div className="flex items-baseline justify-between gap-4 font-dato tabular-nums text-dato">
                    <span className="truncate text-niebla">{f.nombre}</span>
                    <span className="cifra-tabla text-blanco">{formatearNumero(f.n)}</span>
                  </div>
                  <div className="mt-1.5 flex h-2 justify-end bg-blanco/10">
                    <div className="h-full bg-niebla" style={{ width: largo(f.n) }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Centro — el símbolo como punto de conciliación */}
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-2 gap-[14px]" aria-hidden="true">
              <Angulo tam={60} className="text-blanco" />
              <CuartoDeCirculo tam={60} className="text-rojo" />
              <Arco tam={60} className="text-blanco" />
              <AnguloInverso tam={60} className="text-blanco" />
            </div>
            <span className="text-nota font-semibold text-niebla">{t("conciliacion")}</span>
          </div>

          {/* Derecha — columna de ancho constante, con la línea roja de lo revisado a mano */}
          <div>
            <p className="mb-5 text-nota font-semibold text-blanco">{t("resultado")}</p>
            <dl className="border border-blanco/15">
              {filas.map((f) => (
                <div
                  key={f.clave}
                  className={`relative grid grid-cols-[1fr_auto] items-baseline gap-4 px-4 py-3 ${
                    f.total ? "border-t border-blanco/40" : "border-t border-blanco/10 first:border-t-0"
                  } ${f.rojo ? "bg-rojo/15" : ""}`}
                >
                  {f.rojo ? (
                    <span className="absolute inset-y-0 left-0 w-1 bg-rojo" aria-hidden="true" />
                  ) : null}
                  <dt className={`text-nota ${f.total || f.rojo ? "font-semibold text-blanco" : "text-niebla"}`}>
                    {t(`filas.${f.clave}`)}
                  </dt>
                  <dd className="cifra-tabla m-0 font-dato tabular-nums text-dato text-blanco">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figcaption className="text-nota text-niebla lg:col-span-3">{t("nota")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
