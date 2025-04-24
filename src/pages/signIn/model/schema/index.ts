import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const index = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
})

export const useFormConfig = {
  resolver: zodResolver(index),
  mode: "onBlur",
  reValidateMode: "onBlur",
} as const
