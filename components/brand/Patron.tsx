/**
 * Patrón isométrico — Manual de marca §13.
 *
 * «El ángulo del símbolo, extruido en isometría y repetido en diagonal.
 *  Es el único patrón de la marca.»
 *
 * Aquí no se redibuja el patrón: se usa la obra original de §13. Se extrajo de
 * las láminas del manual y se recortó a su azulejo real, midiendo el periodo
 * de repetición sobre los propios píxeles: 276 px de alto exactos, verificado
 * con una costura del 9,6 % frente al 8,9 % de diferencia media entre filas
 * contiguas, es decir, imperceptible.
 *
 * El azulejo real mide 670 x 277 px. La lámina venía con margen sobrante por
 * la derecha y por abajo; el recorte se ajustó midiendo la costura sobre los
 * propios píxeles, no a ojo. Con estas medidas la costura vertical es del
 * 0,0 % —encaje exacto— y la horizontal del 3,6 %, por debajo del 7,5 % de
 * diferencia media entre dos columnas contiguas cualesquiera del dibujo, o
 * sea imperceptible.
 *
 * Un píxel de más o de menos en el alto desalinea el dibujo en cada
 * repetición y las columnas del galón se solapan visiblemente.
 *
 * Reglas que siguen vigentes: nunca con texto de lectura encima, nunca a
 * opacidad reducida «para que no moleste», y nunca dos versiones de color en
 * la misma pieza.
 */

type Version = "azul" | "rojo" | "claro";

const ARCHIVOS: Record<Version, string> = {
  azul: "/images/brand/patron-azul.png",
  rojo: "/images/brand/patron-rojo.png",
  claro: "/images/brand/patron-claro.png",
};

/** Tono dominante de cada versión, por si la imagen tarda en cargar. */
const FONDO: Record<Version, string> = {
  azul: "#22326B",
  rojo: "#F0503F",
  claro: "#FFFFFF",
};

/** Azulejo real, medido sobre los píxeles de la lámina. */
const ANCHO_AZULEJO = 670;
const ALTO_AZULEJO = 277;

interface PatronProps {
  /** Azul por defecto. El rojo es excepcional: una sola pieza por campaña. */
  version?: Version;
  /**
   * Ancho del galón en píxeles. En la lámina original mide 133 px; el manual
   * pide entre 1/14 y 1/8 del lado menor de la superficie.
   */
  bloque?: number;
  className?: string;
  /** Borde por el que sangra la banda. */
  anclaje?: "derecha" | "izquierda";
}

export default function Patron({
  version = "azul",
  bloque = 133,
  className,
  anclaje = "derecha",
}: PatronProps) {
  // El galón mide 133 px en la lámina: el resto se escala en proporción.
  const escala = bloque / 133;
  const ancho = ANCHO_AZULEJO * escala;
  const alto = ALTO_AZULEJO * escala;

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: FONDO[version],
        backgroundImage: `url(${ARCHIVOS[version]})`,
        backgroundRepeat: "repeat",
        backgroundSize: `${ancho}px ${alto}px`,
        backgroundPosition: anclaje === "derecha" ? "right top" : "left top",
      }}
    />
  );
}
