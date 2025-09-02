import { z } from "zod";

export const schemaLogin = z.object({
  username: z.string().min(1, "El nombre es obligatorio"),
  password: z.string().min(6, "La contraseña es obligatoria"),
});

export type LoginFormValues = z.infer<typeof schemaLogin>;
