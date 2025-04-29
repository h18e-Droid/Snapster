import { z } from "zod"

export const loginSchema = z
  .object({
    text: z
      .string()
      .trim()
      .nonempty("Username is required")
      .min(6, "Minimum number of characters is 6")
      .max(30, "Maximum number of characters is 30"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("The email must match the format example@example.com")
      .trim(),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Minimum number of characters is 6")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])\S+$/,
        "Password must contain a-z, A-Z, and special characters",
      ),
    confirmPassword: z
      .string()
      .nonempty("Password confirmation is required"),
    agree: z.boolean().refine((val) => val, {
      message: "You must agree to continue",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords must match",
  })

export type Inputs = z.infer<typeof loginSchema>
