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

/**
 * Mensajes de error del diagnóstico. El formulario los recibe traducidos
 * (namespace `diagnostico.errores`); el servidor usa estos, en español, porque
 * solo acaban en el correo interno.
 */
export type ErroresDiagnostico = Record<
  | "nombreCorto"
  | "nombreLargo"
  | "emailInvalido"
  | "emailObligatorio"
  | "telefonoObligatorio"
  | "telefonoFormato"
  | "mensajeLargo"
  | "volumen"
  | "plataformasCorto"
  | "plataformasLargo"
  | "ejerciciosCorto"
  | "ejerciciosLargo"
  | "situacionAeat"
  | "privacidad",
  string
>;

const ERRORES_ES: ErroresDiagnostico = {
  nombreCorto: "El nombre debe tener al menos 2 caracteres",
  nombreLargo: "El nombre es demasiado largo",
  emailInvalido: "Email inválido",
  emailObligatorio: "El email es obligatorio",
  telefonoObligatorio: "El teléfono es obligatorio",
  telefonoFormato: "Formato de teléfono inválido",
  mensajeLargo: "El mensaje es demasiado largo",
  volumen: "Indica un volumen aproximado",
  plataformasCorto: "Dinos al menos dónde operas",
  plataformasLargo: "Demasiado largo: resume las principales",
  ejerciciosCorto: "Indica al menos un ejercicio",
  ejerciciosLargo: "Demasiado largo",
  situacionAeat: "Indica si hay algo de la AEAT de por medio",
  privacidad: "Debes aceptar la política de privacidad",
};

function crearDiagnosticoServerSchema(m: ErroresDiagnostico) {
  return z.object({
    name: z.string().min(2, m.nombreCorto).max(100, m.nombreLargo),
    email: z.string().email(m.emailInvalido).min(1, m.emailObligatorio),
    phone: z
      .string()
      .min(1, m.telefonoObligatorio)
      .regex(/^[+]?[\d\s()-]+$/, m.telefonoFormato),
    message: z.string().max(1000, m.mensajeLargo).optional(),
    /** Situación desde la que se llega. La rellena la landing, no la persona. */
    situacion: z.string().max(120).optional(),
    volumen: z.enum(valores(VOLUMENES), { message: m.volumen }),
    /** Exchanges, wallets y cadenas donde opera. Texto libre a propósito. */
    plataformas: z.string().min(2, m.plataformasCorto).max(400, m.plataformasLargo),
    /** Ejercicios afectados, en el formato que la persona los tenga en la cabeza. */
    ejercicios: z.string().min(4, m.ejerciciosCorto).max(120, m.ejerciciosLargo),
    situacionAeat: z.enum(valores(SITUACIONES_AEAT), { message: m.situacionAeat }),
  });
}

/** Esquema del formulario, con los mensajes en el idioma de la página. */
export function crearDiagnosticoSchema(m: ErroresDiagnostico = ERRORES_ES) {
  return crearDiagnosticoServerSchema(m).extend({
    privacyConsent: z.boolean().refine((val) => val === true, { message: m.privacidad }),
  });
}

export const diagnosticoServerSchema = crearDiagnosticoServerSchema(ERRORES_ES);
export const diagnosticoSchema = crearDiagnosticoSchema(ERRORES_ES);

export type DiagnosticoData = z.infer<typeof diagnosticoSchema>;
export type DiagnosticoServerData = z.infer<typeof diagnosticoServerSchema>;

/** Etiqueta legible de un valor almacenado, para el correo interno. */
export function etiqueta(
  opciones: readonly { value: string; label: string }[],
  valor: string
): string {
  return opciones.find((o) => o.value === valor)?.label ?? valor;
}
