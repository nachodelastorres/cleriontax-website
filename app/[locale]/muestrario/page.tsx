import Patron from "@/components/brand/Patron";
import {
  Angulo,
  AnguloInverso,
  Arco,
  CuartoDeCirculo,
  Simbolo,
} from "@/components/brand/Formas";
import ChipEstado from "@/components/brand/ChipEstado";
import TablaDatos from "@/components/brand/TablaDatos";
import ButtonLink from "@/components/ui/ButtonLink";
import BloqueAccion from "@/components/cta/BloqueAccion";
import FormularioDiagnostico from "@/components/cta/FormularioDiagnostico";

/**
 * Muestrario interno del sistema de marca. Página de trabajo para revisar los
 * componentes de la fase 02 con el código real; se retira antes de publicar.
 */
export const metadata = {
  title: "Muestrario del sistema — Cleriontax",
  robots: { index: false, follow: false },
};

function Bloque({
  n,
  titulo,
  nota,
  children,
}: {
  n: string;
  titulo: string;
  nota?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-niebla py-12">
      <div className="mb-7 grid grid-cols-[44px_1fr] gap-3">
        <span className="pt-2 font-mono text-dato text-rojo">{n}</span>
        <div>
          <h2 className="text-seccion text-azul">{titulo}</h2>
          {nota ? <p className="mt-2 max-w-[64ch] text-lectura text-pizarra">{nota}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function Muestrario() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-16">
      <header className="pb-10">
        <span className="font-mono text-dato text-rojo">Fase 02 · componentes de marca</span>
        <h1 className="mt-3 text-hero text-azul">Muestrario del sistema</h1>
        <p className="mt-4 max-w-[66ch] text-lectura text-pizarra">
          Las piezas del manual llevadas a código. Página interna de revisión: no se
          indexa y se retira antes del relanzamiento.
        </p>
      </header>

      <Bloque
        n="08"
        titulo="Las cuatro formas"
        nota="Vocabulario gráfico de la marca, tomado de la geometría del propio logotipo. Se usan sueltas como viñetas o marcas de sección, siempre a 0°, 90°, 180° o 270°."
      >
        <div className="grid gap-px border border-niebla bg-niebla sm:grid-cols-2 lg:grid-cols-4">
          {[
            { F: Angulo, n: "Ángulo", d: "El dato en bruto: recto, duro, tal como llega del exchange.", rojo: false },
            { F: CuartoDeCirculo, n: "Cuarto de círculo", d: "El criterio fiscal. La única pieza en rojo y la única que decide.", rojo: true },
            { F: Arco, n: "Arco", d: "El proceso: limpieza y conciliación que curva el dato hasta encajarlo.", rojo: false },
            { F: AnguloInverso, n: "Ángulo inverso", d: "El resultado: el mismo ángulo, ya cerrado sobre el informe.", rojo: false },
          ].map(({ F, n, d, rojo }) => (
            <div key={n} className="bg-blanco p-6">
              <F tam={54} className={rojo ? "text-rojo" : "text-azul"} />
              <p className="mt-5 text-subtitulo text-azul">{n}</p>
              <p className="mt-1.5 text-nota text-pizarra">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-end gap-10 border border-niebla bg-papel p-8">
          <div>
            <Simbolo tam={96} />
            <p className="mt-4 font-mono text-dato text-pizarra">Símbolo completo</p>
          </div>
          <div>
            <Simbolo tam={40} />
            <p className="mt-4 font-mono text-dato text-pizarra">40 px</p>
          </div>
          <div>
            <Simbolo tam={24} />
            <p className="mt-4 font-mono text-dato text-pizarra">24 px · mínimo §07</p>
          </div>
          <div className="flex items-center gap-2">
            <Angulo tam={9} className="text-rojo" />
            <span className="text-nota text-azul">Como viñeta de lista</span>
          </div>
        </div>
      </Bloque>

      <Bloque
        n="13"
        titulo="El patrón"
        nota="El ángulo del símbolo extruido en isometría: cara superior clara, derecha media, izquierda oscura. Los bloques se traban en escaleras que suben de izquierda a derecha. Tres luminosidades de un solo color, nunca mezclados."
      >
        <div className="grid gap-px border border-niebla bg-niebla md:grid-cols-3">
          {(["azul", "claro", "rojo"] as const).map((v) => (
            <div key={v} className="bg-blanco">
              <div className="relative h-56">
                <Patron version={v} bloque={54} />
              </div>
              <div className="p-4">
                <p className="font-mono text-dato text-azul">{v}</p>
                <p className="mt-1 text-nota text-pizarra">
                  {v === "azul"
                    ? "Por defecto: portadas, reversos y fondos de sección."
                    : v === "claro"
                      ? "Fondos de documento y separadores."
                      : "Excepcional: una sola pieza por campaña."}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-3 font-mono text-dato text-pizarra">
            Como banda a sangre, con el logotipo en su versión inversa
          </p>
          <div className="relative h-40 overflow-hidden border border-niebla">
            <Patron version="azul" bloque={64} />
            <div className="absolute inset-0 flex items-center px-8">
              <span className="text-seccion text-blanco">Un informe que se sostiene</span>
            </div>
          </div>
        </div>
      </Bloque>

      <Bloque
        n="17"
        titulo="La tabla de datos"
        nota="En un informe la tabla es la protagonista: cifras monoespaciadas alineadas a la derecha, formato español y el criterio siempre visible. El componente exige el criterio: una cifra sin criterio no se publica."
      >
        <TablaDatos
          titulo="Informe fiscal"
          periodo="ejercicio 2025"
          filas={[
            { concepto: "Ganancias patrimoniales", importe: 18402.15 },
            { concepto: "Pérdidas patrimoniales", importe: -6117.8 },
            { concepto: "Rendimientos de staking", importe: 1293.44 },
            { concepto: "Operaciones revisadas a mano", recuento: 37 },
          ]}
          criterio="FIFO"
          datosDeEjemplo
        />
      </Bloque>

      <Bloque
        n="10"
        titulo="Estados del dato"
        nota="Verde y ámbar solo describen el estado real de un dato, nunca decoran. El color nunca va solo: siempre lleva etiqueta. El ámbar se queda en 2,7:1 sobre blanco, así que no porta texto y su etiqueta va en azul."
      >
        <div className="flex flex-wrap items-center gap-4 border border-niebla bg-blanco p-8">
          <ChipEstado estado="conciliado">Conciliado</ChipEstado>
          <ChipEstado estado="revision">Requiere revisión</ChipEstado>
          <span className="font-mono text-dato text-pizarra">
            0x7a3f…c91b · 12.480,37 € · 21 % · 3–5 días
          </span>
        </div>
      </Bloque>

      <Bloque
        n="17"
        titulo="Acciones"
        nota="Una acción principal en rojo y una secundaria en contorno azul. Nunca dos botones del mismo peso."
      >
        <div className="flex flex-wrap items-center gap-4 border border-niebla bg-blanco p-8">
          <ButtonLink href="/contacto" variant="principal" size="lg">
            Solicitar informe fiscal
          </ButtonLink>
          <ButtonLink href="/servicios" variant="secundaria" size="lg">
            Ver servicios
          </ButtonLink>
        </div>
        <div className="mt-px flex flex-wrap items-center gap-4 border border-niebla bg-azul p-8">
          <ButtonLink href="/contacto" variant="principal" size="lg">
            Solicitar informe fiscal
          </ButtonLink>
          <ButtonLink href="/servicios" variant="secundaria-inversa" size="lg">
            Ver servicios
          </ButtonLink>
        </div>
      </Bloque>

      <Bloque
        n="11"
        titulo="La escala tipográfica"
        nota="Plus Jakarta Sans para todo, IBM Plex Mono solo para el dato."
      >
        <div className="space-y-6 border border-niebla bg-blanco p-8">
          <div>
            <p className="text-hero text-azul">Un informe que se sostiene</p>
            <p className="mt-1 font-mono text-dato text-pizarra">Jakarta 800 · 52/55 · −4 %</p>
          </div>
          <div>
            <p className="text-seccion text-azul">Reconciliación de carteras cripto</p>
            <p className="mt-1 font-mono text-dato text-pizarra">Jakarta 700 · 33/38 · −3 %</p>
          </div>
          <div>
            <p className="text-subtitulo text-azul">Clasificamos cada operación</p>
            <p className="mt-1 font-mono text-dato text-pizarra">Jakarta 600 · 21/28 · −2 %</p>
          </div>
          <div>
            <p className="max-w-[72ch] text-lectura text-azul">
              Analizamos cada operación según los criterios fiscales españoles y
              justificamos su origen dentro del informe.
            </p>
            <p className="mt-1 font-mono text-dato text-pizarra">Jakarta 400 · 17/27</p>
          </div>
          <div>
            <p className="max-w-[72ch] text-nota text-pizarra">
              Nota al pie, aclaración metodológica o advertencia legal que acompaña a una tabla.
            </p>
            <p className="mt-1 font-mono text-dato text-pizarra">Jakarta 400 · 14/22 · Pizarra</p>
          </div>
          <div>
            <p className="font-mono text-dato text-azul">
              modelo 721 · FIFO · 0x7a3f…c91b · 12.480,37 €
            </p>
            <p className="mt-1 font-mono text-dato text-pizarra">Plex Mono 400 · 13/20</p>
          </div>
        </div>
      </Bloque>

      <Bloque
        n="→"
        titulo="Bloques de acción"
        nota="La acción cambia con la temperatura del visitante. Al del blog se le lleva a su situación; al que se ha reconocido en el problema se le pide el diagnóstico; al que tiene un plazo encima se le da el teléfono con la fecha por delante."
      >
        <div className="space-y-px">
          <BloqueAccion
            temperatura="frio"
            titulo="¿Tu caso se parece a alguno de estos?"
            apoyo="Antes de decidir nada, mira si tu operativa encaja en una de las situaciones que ya hemos resuelto."
            accion={{ texto: "Ver si tu caso encaja", href: "/servicios" }}
          />
          <BloqueAccion
            temperatura="templado"
            titulo="Cuéntanos cómo es tu operativa."
            apoyo="Con el número de operaciones, dónde operas y qué ejercicios te preocupan, sabemos qué trabajo hay por delante y te damos plazo y precio orientativos."
            accion={{ texto: "Cuéntanos tu operativa", href: "/contacto" }}
            secundaria={{ texto: "Ver el método", href: "/servicios" }}
          />
          <BloqueAccion
            temperatura="urgente"
            plazo="Diez días hábiles para contestar"
            titulo="¿Tienes un requerimiento de la AEAT encima de la mesa?"
            apoyo="Llámanos y lo miramos hoy. Necesitamos la notificación y el detalle de tus operaciones del ejercicio requerido."
            accion={{ texto: "+34 663 482 301", href: "/contacto" }}
            secundaria={{ texto: "Qué necesitamos de ti", href: "/servicios" }}
          />
        </div>
      </Bloque>

      <Bloque
        n="→"
        titulo="El diagnóstico de operativa"
        nota="La pieza central de la conversión. No es un contacto con campos de más: clasifica el caso antes de la primera conversación, y los que traen plazo administrativo llegan marcados al correo interno."
      >
        <FormularioDiagnostico situacion="muestrario" />
      </Bloque>

      <Bloque n="10" titulo="La paleta" nota="Dos colores de marca, neutros y dos colores de estado. El rojo pesa menos que el azul.">
        <div className="grid grid-cols-2 gap-px border border-niebla bg-niebla sm:grid-cols-4">
          {[
            ["Azul Cleriontax", "#050A30", "bg-azul"],
            ["Rojo Señal", "#DC2618", "bg-rojo"],
            ["Blanco", "#FFFFFF", "bg-blanco"],
            ["Papel", "#F2F3F6", "bg-papel"],
            ["Niebla", "#C9CCD6", "bg-niebla"],
            ["Pizarra", "#4A5A66", "bg-pizarra"],
            ["Verde Conciliado", "#17706A", "bg-verde-conciliado"],
            ["Ámbar Revisión", "#D4941C", "bg-ambar-revision"],
          ].map(([nombre, hex, clase]) => (
            <div key={hex} className="bg-blanco">
              <div className={`h-20 ${clase}`} />
              <div className="p-3">
                <p className="text-nota text-azul">{nombre}</p>
                <p className="font-mono text-dato text-pizarra">{hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Bloque>
    </main>
  );
}
