"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  crearDiagnosticoSchema,
  SITUACIONES_AEAT,
  VOLUMENES,
  type DiagnosticoData,
  type ErroresDiagnostico,
} from "@/lib/validations";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ChipEstado from "@/components/brand/ChipEstado";

/**
 * Diagnóstico de operativa — la acción principal de las páginas de situación.
 *
 * No es un contacto con campos de más. Es la pieza que clasifica el caso antes
 * de la primera conversación: cuántas operaciones, dónde, qué ejercicios y si
 * hay algo de la AEAT de por medio. Rellenarlo ya es empezar a ordenar la
 * operativa.
 *
 * Voz (§15): primero la respuesta, segunda persona, y ninguna promesa de
 * resultado ni de ahorro (§18). Textos en el namespace `diagnostico`; los
 * valores que viajan al servidor no cambian con el idioma.
 */

interface FormularioDiagnosticoProps {
  /**
   * Situación desde la que se llega. La rellena la landing; viaja con el envío
   * para que el aviso interno diga de qué página salió.
   */
  situacion?: string;
  /** Texto de la acción principal. Por defecto, el del namespace. */
  accion?: string;
  className?: string;
}

const TELEFONO = "+34663482301";
const TELEFONO_VISIBLE = "+34 663 482 301";
const CORREO = "info@cleriontax.com";

export default function FormularioDiagnostico({
  situacion = "",
  accion,
  className,
}: FormularioDiagnosticoProps) {
  const t = useTranslations("diagnostico");
  const [estado, setEstado] = useState<"listo" | "enviando" | "enviado" | "error">("listo");

  const esquema = useMemo(
    () => crearDiagnosticoSchema(t.raw("errores") as ErroresDiagnostico),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiagnosticoData>({
    resolver: zodResolver(esquema),
    defaultValues: { situacion, message: "", privacyConsent: false },
  });

  async function onSubmit(datos: DiagnosticoData) {
    setEstado("enviando");

    try {
      const cuerpo = new FormData();
      cuerpo.append("name", datos.name);
      cuerpo.append("email", datos.email);
      cuerpo.append("phone", datos.phone);
      cuerpo.append("message", datos.message ?? "");
      cuerpo.append("situacion", situacion);
      cuerpo.append("volumen", datos.volumen);
      cuerpo.append("plataformas", datos.plataformas);
      cuerpo.append("ejercicios", datos.ejercicios);
      cuerpo.append("situacionAeat", datos.situacionAeat);

      const res = await fetch("/api/contact", { method: "POST", body: cuerpo });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      setEstado("enviado");
      reset();
    } catch {
      // El detalle del servidor viene en español y no aporta al visitante:
      // se le da el mensaje en su idioma y los canales directos.
      setEstado("error");
    }
  }

  if (estado === "enviado") {
    return (
      <div className={`border border-niebla bg-blanco p-8 ${className ?? ""}`}>
        <ChipEstado estado="conciliado">{t("recibido.chip")}</ChipEstado>
        <p className="mt-4 text-subtitulo text-azul">{t("recibido.titulo")}</p>
        <p className="mt-3 max-w-[66ch] text-lectura text-pizarra">
          {t("recibido.texto")}{" "}
          <a href={`tel:${TELEFONO}`} className="text-rojo">
            {TELEFONO_VISIBLE}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`border border-niebla bg-blanco p-6 md:p-8 ${className ?? ""}`}
    >
      <p className="max-w-[64ch] text-lectura text-pizarra">{t("intro")}</p>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <Select
          label={t("volumen.label")}
          required
          options={[
            { value: "", label: t("volumen.elige") },
            ...VOLUMENES.map((o) => ({ value: o.value, label: t(`volumenes.${o.value}`) })),
          ]}
          error={errors.volumen?.message}
          {...register("volumen")}
        />
        <Select
          label={t("aeat.label")}
          required
          options={[
            { value: "", label: t("aeat.elige") },
            ...SITUACIONES_AEAT.map((o) => ({
              value: o.value,
              label: t(`situacionesAeat.${o.value}`),
            })),
          ]}
          error={errors.situacionAeat?.message}
          {...register("situacionAeat")}
        />
        <Input
          label={t("plataformas.label")}
          placeholder={t("plataformas.placeholder")}
          required
          error={errors.plataformas?.message}
          {...register("plataformas")}
        />
        <Input
          label={t("ejercicios.label")}
          placeholder={t("ejercicios.placeholder")}
          required
          error={errors.ejercicios?.message}
          {...register("ejercicios")}
        />
      </div>

      <div className="mt-7 border-t border-niebla pt-7">
        <div className="grid gap-5 md:grid-cols-3">
          <Input label={t("nombre")} required error={errors.name?.message} {...register("name")} />
          <Input
            label={t("email")}
            type="email"
            required
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label={t("telefono")}
            type="tel"
            required
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <div className="mt-5">
          <Textarea label={t("mensaje")} rows={3} error={errors.message?.message} {...register("message")} />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-nota text-pizarra">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 flex-none accent-rojo"
          {...register("privacyConsent")}
        />
        <span>
          {t("privacidadAntes")}{" "}
          <Link href="/privacidad" className="text-rojo">
            {t("privacidadEnlace")}
          </Link>
          .
        </span>
      </label>
      {errors.privacyConsent ? (
        <p className="mt-1.5 text-nota text-rojo">{errors.privacyConsent.message}</p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="principal" size="lg" disabled={estado === "enviando"}>
          {estado === "enviando" ? t("enviando") : accion ?? t("enviar")}
        </Button>
        <span className="font-mono text-dato text-pizarra">{t("respuesta")}</span>
      </div>

      {estado === "error" ? (
        <p className="mt-4 border-l-2 border-rojo bg-papel px-4 py-3 text-nota text-azul">
          {t("error.generico")} {t("error.escribenos")}{" "}
          <a href={`mailto:${CORREO}`} className="text-rojo">
            {CORREO}
          </a>{" "}
          {t("error.llamanos")}{" "}
          <a href={`tel:${TELEFONO}`} className="text-rojo">
            {TELEFONO_VISIBLE}
          </a>
          .
        </p>
      ) : null}

      <p className="mt-6 max-w-[72ch] text-nota text-pizarra">{t("nota")}</p>
    </form>
  );
}
