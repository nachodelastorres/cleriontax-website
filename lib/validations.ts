import { z } from "zod";

// Base schema for server-side validation (without privacyConsent)
export const contactFormServerSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z
    .string()
    .email("Email inválido")
    .min(1, "El email es obligatorio"),
  phone: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(/^[+]?[\d\s()-]+$/, "Formato de teléfono inválido"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje es demasiado largo"),
});

// Full schema for client-side validation (includes privacyConsent)
export const contactFormSchema = contactFormServerSchema.extend({
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debes aceptar la política de privacidad",
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactFormServerData = z.infer<typeof contactFormServerSchema>;

/* --------------------------------------------------------------------------
 * Diagnóstico de operativa
 *
 * No es un formulario de contacto con campos de más: es la pieza que clasifica
 * el caso antes de la primera llamada. Rellenarlo ya es empezar a ordenar la
 * operativa, que es justo lo que se vende.
 *
 * Los rangos son deliberadamente amplios: quien tiene 100.000 operaciones en
 * Solana no sabe cuántas son, y pedirle una cifra exacta es pedirle el trabajo
 * que viene a encargar.
 * ----------------------------------------------------------------------- */

export const VOLUMENES = [
  { value: "hasta-500", label: "Menos de 500" },
  { value: "500-5000", label: "Entre 500 y 5.000" },
  { value: "5000-50000", label: "Entre 5.000 y 50.000" },
  { value: "mas-50000", label: "Más de 50.000" },
  { value: "no-lo-se", label: "No lo sé" },
] as const;

export const SITUACIONES_AEAT = [
  { value: "ninguna", label: "Nada por ahora" },
  { value: "requerimiento", label: "He recibido un requerimiento" },
  { value: "comprobacion", label: "Estoy en una comprobación limitada" },
  { value: "inspeccion", label: "Estoy en una inspección" },
  { value: "sancion", label: "Me han sancionado" },
  { value: "sin-declarar", label: "No declaré ejercicios anteriores" },
] as const;

const valores = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as unknown as [string, ...string[]];

export const diagnosticoServerSchema = contactFormServerSchema
  .extend({
    message: z.string().max(1000, "El mensaje es demasiado largo").optional(),
  })
  .extend({
    /** Situación desde la que se llega. La rellena la landing, no la persona. */
    situacion: z.string().max(120).optional(),
    volumen: z.enum(valores(VOLUMENES), {
      message: "Indica un volumen aproximado",
    }),
    /** Exchanges, wallets y cadenas donde opera. Texto libre a propósito. */
    plataformas: z
      .string()
      .min(2, "Dinos al menos dónde operas")
      .max(400, "Demasiado largo: resume las principales"),
    /** Ejercicios afectados, en el formato que la persona los tenga en la cabeza. */
    ejercicios: z
      .string()
      .min(4, "Indica al menos un ejercicio")
      .max(120, "Demasiado largo"),
    situacionAeat: z.enum(valores(SITUACIONES_AEAT), {
      message: "Indica si hay algo de la AEAT de por medio",
    }),
  });

export const diagnosticoSchema = diagnosticoServerSchema.extend({
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad",
  }),
});

export type DiagnosticoData = z.infer<typeof diagnosticoSchema>;
export type DiagnosticoServerData = z.infer<typeof diagnosticoServerSchema>;

/** Etiqueta legible de un valor almacenado, para el correo interno. */
export function etiqueta(
  opciones: readonly { value: string; label: string }[],
  valor: string
): string {
  return opciones.find((o) => o.value === valor)?.label ?? valor;
}
