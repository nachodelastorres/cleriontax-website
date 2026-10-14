import SimboloAnimado from "@/components/brand/SimboloAnimado";

/**
 * El símbolo como fondo de una cabecera azul, solo en móvil.
 *
 * En pantalla pequeña el símbolo no cabe al lado del titular y la cabecera
 * se queda vacía: va detrás, grande, tenue y cortado por el borde derecho.
 * La sección que lo contiene necesita `relative`; el recorte lo hace la propia
 * capa, así que la sección no tiene que llevar `overflow-hidden`.
 */
export default function SimboloFondo() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
      <div className="absolute -right-28 top-20 opacity-[0.07]">
        <SimboloAnimado tam={340} className="text-blanco" retraso={160} titulo="" />
      </div>
    </div>
  );
}
