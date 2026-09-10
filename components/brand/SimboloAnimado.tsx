/**
 * El símbolo entrando a su posición — Manual de marca §12.
 *
 * «Una sola animación autorizada: los cuatro cuadrantes entrando a su posición
 *  al cargar. Nunca en bucle ni al pasar el ratón.»
 *
 * Es la firma de movimiento de la marca y cuenta el argumento entero: cuatro
 * piezas distintas —el dato en bruto, el criterio, el proceso, el resultado—
 * que llegan de fuera y acaban encajando en la misma retícula.
 *
 * Todo en CSS: sin JavaScript, sin bucle, una sola vez al cargar. Con
 * `prefers-reduced-motion` las piezas aparecen ya colocadas.
 */
interface SimboloAnimadoProps {
  tam?: number;
  className?: string;
  titulo?: string;
  /** Retraso antes de arrancar, en milisegundos. */
  retraso?: number;
}

export default function SimboloAnimado({
  tam = 180,
  className,
  titulo = "Cleriontax",
  retraso = 0,
}: SimboloAnimadoProps) {
  const id = `sim-${retraso}-${tam}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes ct-entra-tl { from { transform: translate(-42%, -42%); opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes ct-entra-tr { from { transform: translate(42%, -42%);  opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes ct-entra-bl { from { transform: translate(-42%, 42%);  opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes ct-entra-br { from { transform: translate(42%, 42%);   opacity: 0 } to { transform: none; opacity: 1 } }

.${id} .ct-q {
  opacity: 0;
  animation-duration: 620ms;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(.22,.61,.36,1);
}
.${id} .ct-tl { animation-name: ct-entra-tl; animation-delay: ${retraso}ms }
.${id} .ct-tr { animation-name: ct-entra-tr; animation-delay: ${retraso + 90}ms }
.${id} .ct-bl { animation-name: ct-entra-bl; animation-delay: ${retraso + 180}ms }
.${id} .ct-br { animation-name: ct-entra-br; animation-delay: ${retraso + 270}ms }

@media (prefers-reduced-motion: reduce) {
  .${id} .ct-q { animation: none; opacity: 1 }
}
`,
        }}
      />
      <svg
        width={tam}
        height={tam}
        viewBox="0 0 259 259"
        className={`${id} ${className ?? ""}`}
        role="img"
        aria-label={titulo}
        focusable="false"
      >
        <title>{titulo}</title>
        {/* Ángulo — el dato en bruto */}
        <path className="ct-q ct-tl" d="M0 0 H119 V57.9 H57.9 V119 H0 Z" fill="currentColor" />
        {/* Cuarto de círculo — el criterio fiscal, la única pieza en rojo */}
        <path
          className="ct-q ct-tr"
          d="M141.5 0 A117.5 117.5 0 0 0 259 117.5 L259 0 Z"
          fill="#DC2618"
        />
        {/* Arco — el proceso */}
        <path
          className="ct-q ct-bl"
          d="M0 141.5 A117.5 117.5 0 0 1 117.5 259 L56.7 259 A56.7 56.7 0 0 0 0 202.3 Z"
          fill="currentColor"
        />
        {/* Ángulo inverso — el resultado */}
        <path
          className="ct-q ct-br"
          d="M259 259 H139.1 V200.2 H200.2 V139.1 H259 Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
}
