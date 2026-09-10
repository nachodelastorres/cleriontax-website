"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  diagnosticoSchema,
  SITUACIONES_AEAT,
  VOLUMENES,
  type DiagnosticoData,
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
 * resultado ni de ahorro (§18).
 */

interface FormularioDiagnosticoProps {
  /**
   * Situación desde la que se llega. La rellena la landing; viaja con el envío
   * para que el aviso interno diga de qué página salió.
   */
  situacion?: string;
  /** Texto de la acción principal. */
  accion?: string;
  className?: string;
}

export default function FormularioDiagnostico({
  situacion = "",
  accion = "Enviar diagnóstico",
  className,
}: FormularioDiagnosticoProps) {
  const [estado, setEstado] = useState<"listo" | "enviando" | "enviado" | "error">("listo");
  const [detalleError, setDetalleError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiagnosticoData>({
    resolver: zodResolver(diagnosticoSchema),
    defaultValues: { situacion, message: "", privacyConsent: false },
  });

  async function onSubmit(datos: DiagnosticoData) {
    setEstado("enviando");
    setDetalleError(null);

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

      if (!res.ok || !json.success) {
        throw new Error(json.message || "No se ha podido enviar.");
      }

      setEstado("enviado");
      reset();
    } catch (e) {
      setEstado("error");
      setDetalleError(
        e instanceof Error ? e.message : "No se ha podido enviar el diagnóstico."
      );
    }
  }

  if (estado === "enviado") {
    return (
      <div className={`border border-niebla bg-blanco p-8 ${className ?? ""}`}>
        <ChipEstado estado="conciliado">Recibido</ChipEstado>
        <p className="mt-4 text-subtitulo text-azul">
          Tenemos tu operativa. Te escribimos en 24–48 horas laborables.
        </p>
        <p className="mt-3 max-w-[66ch] text-lectura text-pizarra">
          Si en tu caso hay un plazo de la AEAT corriendo, llámanos y lo miramos hoy:{" "}
          <a href="tel:+34663482301" className="text-rojo">
            +34 663 482 301
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
      <p className="max-w-[64ch] text-lectura text-pizarra">
        Cuéntanos cómo es tu operativa. Con esto sabemos qué trabajo tienes por delante
        y te damos un plazo y un precio orientativos, sin compromiso.
      </p>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <Select
          label="¿Cuántas operaciones tienes, más o menos?"
          required
          options={[{ value: "", label: "Elige un rango" }, ...VOLUMENES]}
          error={errors.volumen?.message}
          {...register("volumen")}
        />
        <Select
          label="¿Hay algo de la AEAT de por medio?"
          required
          options={[{ value: "", label: "Elige una opción" }, ...SITUACIONES_AEAT]}
          error={errors.situacionAeat?.message}
          {...register("situacionAeat")}
        />
        <Input
          label="¿Dónde operas?"
          placeholder="Binance, MetaMask, Solana, Ledger…"
          required
          error={errors.plataformas?.message}
          {...register("plataformas")}
        />
        <Input
          label="¿Qué ejercicios te preocupan?"
          placeholder="2022–2025"
          required
          error={errors.ejercicios?.message}
          {...register("ejercicios")}
        />
      </div>

      <div className="mt-7 border-t border-niebla pt-7">
        <div className="grid gap-5 md:grid-cols-3">
          <Input
            label="Nombre"
            required
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email"
            type="email"
            required
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Teléfono"
            type="tel"
            required
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <div className="mt-5">
          <Textarea
            label="Algo más que debamos saber (opcional)"
            rows={3}
            error={errors.message?.message}
            {...register("message")}
          />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-nota text-pizarra">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 flex-none accent-rojo"
          {...register("privacyConsent")}
        />
        <span>
          He leído y acepto la{" "}
          <a href="/privacidad" className="text-rojo">
            política de privacidad
          </a>
          .
        </span>
      </label>
      {errors.privacyConsent ? (
        <p className="mt-1.5 text-nota text-rojo">{errors.privacyConsent.message}</p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="principal" size="lg" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando…" : accion}
        </Button>
        <span className="font-mono text-dato text-pizarra">
          Respuesta en 24–48 h laborables
        </span>
      </div>

      {estado === "error" && detalleError ? (
        <p className="mt-4 border-l-2 border-rojo bg-papel px-4 py-3 text-nota text-azul">
          {detalleError} Puedes escribirnos a{" "}
          <a href="mailto:info@cleriontax.com" className="text-rojo">
            info@cleriontax.com
          </a>{" "}
          o llamarnos al{" "}
          <a href="tel:+34663482301" className="text-rojo">
            +34 663 482 301
          </a>
          .
        </p>
      ) : null}

      <p className="mt-6 max-w-[72ch] text-nota text-pizarra">
        La información publicada por Cleriontax tiene carácter divulgativo y no constituye
        asesoramiento fiscal personalizado ni asesoramiento de inversión. Cada situación
        requiere un análisis individual.
      </p>
    </form>
  );
}
