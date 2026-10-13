"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone } from "lucide-react";
import IconoWhatsApp from "@/components/brand/IconoWhatsApp";

/**
 * Barra de acción fija — páginas de situación.
 *
 * Aparece cuando la persona ya ha leído lo suficiente para reconocerse en el
 * caso, y ofrece la acción que le corresponde por temperatura. En los casos con
 * plazo administrativo (requerimiento, inspección, sanción) el canal directo va
 * primero: ahí la fecha manda sobre el formulario.
 *
 * §04 y §15 — WhatsApp es un canal legítimo de la marca, con el límite de no
 * dar criterio definitivo por chat.
 */

const TELEFONO = "+34663482301";
const TELEFONO_VISIBLE = "+34 663 482 301";
const WHATSAPP = "https://wa.me/34663482301";

interface BarraAccionProps {
  /** Qué se está mirando. Se muestra a la izquierda para no perder el contexto. */
  contexto: string;
  /** Destino de la acción principal. */
  href: string;
  accion?: string;
  /** En un caso con plazo, el canal directo va delante del formulario. */
  urgente?: boolean;
  /** Píxeles de desplazamiento antes de mostrarla. */
  desde?: number;
}

export default function BarraAccion({
  contexto,
  href,
  accion = "Cuéntanos tu operativa",
  urgente = false,
  desde = 520,
}: BarraAccionProps) {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > desde);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, [desde]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-azul bg-azul transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <p className="hidden min-w-0 flex-1 truncate text-nota text-niebla sm:block">
          {contexto}
        </p>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          {urgente ? (
            <>
              <a
                href={`tel:${TELEFONO}`}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-rojo px-5 font-semibold text-blanco transition-colors hover:bg-rojo/90 sm:flex-none"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{TELEFONO_VISIBLE}</span>
                <span className="sm:hidden">Llamar</span>
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 border-2 border-blanco px-5 font-semibold text-blanco transition-colors hover:bg-blanco hover:text-azul"
              >
                <IconoWhatsApp className="h-5 w-5" />
                WhatsApp
              </a>
            </>
          ) : (
            <>
              {href.startsWith("#") ? (
                <a
                  href={href}
                  className="inline-flex h-11 flex-1 items-center justify-center bg-rojo px-6 font-semibold text-blanco transition-colors hover:bg-rojo/90 sm:flex-none"
                >
                  {accion}
                </a>
              ) : (
                <Link
                  href={href}
                  className="inline-flex h-11 flex-1 items-center justify-center bg-rojo px-6 font-semibold text-blanco transition-colors hover:bg-rojo/90 sm:flex-none"
                >
                  {accion}
                </Link>
              )}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 border-2 border-blanco px-5 font-semibold text-blanco transition-colors hover:bg-blanco hover:text-azul"
                aria-label={t("escribirWhatsapp")}
              >
                <IconoWhatsApp className="h-5 w-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
