import {
  Copy,
  Eye,
  FolderCheck,
  Hourglass,
  MessageSquareText,
  Scale,
  ShieldAlert,
  Users,
} from "lucide-react";

/**
 * Carta de derechos ante una inspección.
 *
 * Cada derecho en su tarjeta y con su icono: se recorren de un vistazo y se
 * recuerdan mejor que una lista. Va sobre azul, con tarjetas sueltas de borde
 * fino. Conviene que sean múltiplo de cuatro: una fila a medias se ve coja.
 */

const ICONOS = {
  alcance: Eye,
  asesor: Users,
  autoincriminacion: ShieldAlert,
  alegar: MessageSquareText,
  copia: Copy,
  yaConsta: FolderCheck,
  prescripcion: Hourglass,
  recurrir: Scale,
};
export type IconoDerecho = keyof typeof ICONOS;

export interface Derecho {
  icono: IconoDerecho;
  titulo: string;
  body: string;
}

export default function CartaDerechos({ derechos }: { derechos: Derecho[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {derechos.map((d) => {
        const Icono = ICONOS[d.icono];
        return (
          <li key={d.titulo} className="border border-pizarra/50 p-6">
            <Icono className="h-8 w-8 text-rojo" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-5 text-subtitulo text-blanco">{d.titulo}</h3>
            <p className="mt-2 text-nota text-niebla">{d.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
