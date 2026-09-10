/**
 * Chip de estado — Manual de marca §10.
 *
 * Verde Conciliado y Ámbar Revisión «solo describen el estado real de un dato,
 * nunca decoran». Y, como el manual exige, «el color nunca es el único portador
 * de información»: el chip siempre lleva etiqueta además de la marca de color.
 *
 * Contraste: el verde alcanza 5,8:1 sobre blanco y puede llevar texto; el ámbar
 * se queda en 2,7:1, así que aparece «solo relleno o icono, nunca texto» — por
 * eso su etiqueta va en azul y el ámbar queda reducido a la marca.
 */

type Estado = "conciliado" | "revision";

const ESTILOS: Record<Estado, { marca: string; texto: string; fondo: string }> = {
  conciliado: {
    marca: "bg-verde-conciliado",
    texto: "text-verde-conciliado",
    fondo: "bg-verde-conciliado/10",
  },
  revision: {
    // El ámbar no porta texto: la etiqueta va en azul.
    marca: "bg-ambar-revision",
    texto: "text-azul",
    fondo: "bg-ambar-revision/15",
  },
};

interface ChipEstadoProps {
  estado: Estado;
  /** Etiqueta obligatoria: el color no puede ir solo. */
  children: React.ReactNode;
  className?: string;
}

export default function ChipEstado({ estado, children, className }: ChipEstadoProps) {
  const e = ESTILOS[estado];

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 font-mono text-dato ${e.fondo} ${e.texto} ${className ?? ""}`}
    >
      <span className={`h-2 w-2 flex-none ${e.marca}`} aria-hidden="true" />
      {children}
    </span>
  );
}
