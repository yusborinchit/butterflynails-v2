import { z } from "zod";

export const bookingFormSchema = z.object({
  date: z.string().regex(/^\d{4}\-\d{2}\-\d{2}$/, {
    message: "La fecha no es valida",
  }),
  timeId: z.string().regex(/^\d+$/, { message: "El turno no es valido" }),
  serviceId: z.string().regex(/^\d+$/, { message: "Servicio no valido" }),
  name: z
    .string()
    .min(3, { message: "El nombre no es valido (Mínimo 3 caracteres)" })
    .max(255, { message: "El nombre no es valido (Máximo 255 caracteres)" }),
  ci: z.string().regex(/^\d{8}$/, {
    message: "La cédula no es valida (Sin puntos ni guiones)",
  }),
  username: z.string().min(1, {
    message: "El usuario de instagram no puede ser vacío",
  }),
  phone: z.string().regex(/^\d{9}$/, {
    message: "El número de celular no es valido",
  }),
  email: z.string().email({ message: "El email no es valido" }),
});

export const cancelDayFormSchema = z.object({
  date: z.string().regex(/^\d{4}\-\d{2}\-\d{2}$/, {
    message: "La fecha no es valida",
  }),
  timeId: z.string().regex(/^-?\d+$/, { message: "El turno no es valido" }),
});

export const editServiceFormSchema = z.object({
  id: z.number({ message: "Id no valido" }),
  name: z
    .string()
    .min(3, { message: "El nombre no es valido (Mínimo 3 caracteres)" })
    .max(255, { message: "El nombre no es valido (Máximo 255 caracteres)" }),
  description: z
    .string()
    .min(3, {
      message: "La descripción no es valido (Mínimo 3 caracteres)",
    })
    .max(255, {
      message: "La descripción no es valido (Máximo 255 caracteres)",
    }),
  price: z.number().min(0, { message: "El precio no puede ser negativo" }),
});

export const editBookingTimeFormSchema = z.object({
  id: z.number({ message: "Id no valido" }),
  time: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "La hora no es valida (Formato: HH:MM)",
  }),
});

export const createBookingTimeFormSchema = z.object({
  time: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "La hora no es valida (Formato: HH:MM)",
  }),
});

export const signInFormSchema = z.object({
  username: z.string().min(1, { message: "El nombre no puede estar vacío" }),
  password: z
    .string()
    .min(1, { message: "La contraseña no puede estar vacío" }),
});
