/**
 * Las cuatro formas del símbolo — Manual de marca §08.
 *
 * «Las cuatro formas no son decorativas: son el vocabulario gráfico de la marca.»
 *
 *   Ángulo            El dato en bruto: recto, duro, tal como llega del exchange.
 *   Cuarto de círculo El criterio fiscal. La única pieza en rojo y la única que decide.
 *   Arco              El proceso: limpieza y conciliación que curva el dato hasta encajarlo.
 *   Ángulo inverso    El resultado: el mismo ángulo, ya cerrado sobre el informe.
 *
 * Pueden usarse sueltas como viñetas, marcas de sección o recortes de imagen,
 * «siempre a 0°, 90°, 180° o 270°: nunca en ángulos intermedios» — de ahí que
 * la prop `giro` solo admita esos cuatro valores.
 *
 * La geometría está tomada del propio logotipo, no reinterpretada: retícula de
 * 259, módulo Q = 118,96, calle 22,5 (0,19 Q) y trazo 57,9 (½ Q).
 */

type Giro = 0 | 90 | 180 | 270;

interface FormaProps {
  /** Lado del cuadro, en píxeles. */
  tam?: number;
  /** Solo múltiplos de 90° (§08). */
  giro?: Giro;
  className?: string;
  /** Texto alternativo. Si se omite, la forma se marca como decorativa. */
  titulo?: string;
}

/** Cuadrante del símbolo, normalizado a un cuadro de 0–119. */
const CUADRO = 119;

function Svg({
  tam = 16,
  giro = 0,
  className,
  titulo,
  children,
}: FormaProps & { children: React.ReactNode }) {
  return (
    <svg
      width={tam}
      height={tam}
      viewBox={`0 0 ${CUADRO} ${CUADRO}`}
      className={className}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      style={giro ? { transform: `rotate(${giro}deg)` } : undefined}
      focusable="false"
    >
      {titulo ? <title>{titulo}</title> : null}
      {children}
    </svg>
  );
}

/** Ángulo — el dato en bruto. Barras de 119 × 57,9 en escuadra. */
export function Angulo(props: FormaProps) {
  return (
    <Svg {...props}>
      <path d="M0 0 H119 V57.9 H57.9 V119 H0 Z" fill="currentColor" />
    </Svg>
  );
}

/** Ángulo inverso — el resultado, el mismo ángulo cerrado sobre el informe. */
export function AnguloInverso(props: FormaProps) {
  return (
    <Svg {...props}>
      <path d="M119 119 H0 V61.1 H61.1 V0 H119 Z" fill="currentColor" />
    </Svg>
  );
}

/**
 * Cuarto de círculo — el criterio fiscal.
 * Disco de cuarto con el vértice en la esquina superior derecha (r = 119).
 * Es la única pieza que va en rojo (§08, §10).
 */
export function CuartoDeCirculo(props: FormaProps) {
  return (
    <Svg {...props}>
      <path d="M0 0 A119 119 0 0 0 119 119 L119 0 Z" fill="currentColor" />
    </Svg>
  );
}

/**
 * Arco — el proceso.
 * Anillo de cuarto centrado en la esquina inferior izquierda:
 * radio exterior 119, interior 58,3; el grosor es el trazo del símbolo.
 */
export function Arco(props: FormaProps) {
  return (
    <Svg {...props}>
      <path
        d="M0 0 A119 119 0 0 1 119 119 L58.3 119 A58.3 58.3 0 0 0 0 60.7 Z"
        fill="currentColor"
      />
    </Svg>
  );
}

/**
 * El símbolo completo: los cuatro cuadrantes en su retícula, con el cuarto de
 * círculo en rojo. Retícula real del logotipo (259 con calle de 22,5).
 */
export function Simbolo({
  tam = 48,
  className,
  titulo = "Cleriontax",
}: {
  tam?: number;
  className?: string;
  titulo?: string;
}) {
  return (
    <svg
      width={tam}
      height={tam}
      viewBox="0 0 259 259"
      className={className}
      role="img"
      aria-label={titulo}
      focusable="false"
    >
      <title>{titulo}</title>
      {/* Ángulo — arriba izquierda */}
      <path d="M0 0 H119 V57.9 H57.9 V119 H0 Z" fill="#050A30" />
      {/* Cuarto de círculo — arriba derecha. La única pieza en rojo. */}
      <path d="M141.5 0 A117.5 117.5 0 0 0 259 117.5 L259 0 Z" fill="#DC2618" />
      {/* Arco — abajo izquierda */}
      <path
        d="M0 141.5 A117.5 117.5 0 0 1 117.5 259 L56.7 259 A56.7 56.7 0 0 0 0 202.3 Z"
        fill="#050A30"
      />
      {/* Ángulo inverso — abajo derecha */}
      <path d="M259 259 H139.1 V200.2 H200.2 V139.1 H259 Z" fill="#050A30" />
    </svg>
  );
}
