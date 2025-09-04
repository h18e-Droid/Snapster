import { z } from "zod"

export const CreateNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[!@#$%^&*()\-,.?":{}|<>]/, "Must contain at least one special character (!@#$ etc.)"),
    passwordConfirm: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters")
      .max(20, "Password confirmation must be no more than 20 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  })
