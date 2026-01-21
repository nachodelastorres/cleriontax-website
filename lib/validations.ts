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
