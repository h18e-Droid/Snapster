import { z } from "zod"

export const emailSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("The email must match the format example@example.com")
    .trim(),
})

export type EmailInputs = z.infer<typeof emailSchema>
