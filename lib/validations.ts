import { z } from "zod";

export const contactFormSchema = z.object({
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

export type ContactFormData = z.infer<typeof contactFormSchema>;
