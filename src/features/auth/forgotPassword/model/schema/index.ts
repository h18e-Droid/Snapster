import { z } from "zod"

export const ForgotPasswordSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address").trim(),
  recaptcha: z.boolean().refine((val) => val, {
    message: "Please verify you are not a robot",
  }),
})
