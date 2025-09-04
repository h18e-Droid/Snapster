"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const index = z.object({
  email: z.string().nonempty("Email is required").trim().email("Invalid email address"),
  password: z.string().trim().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
})

export const useFormConfig = {
  resolver: zodResolver(index),
  mode: "onBlur",
  reValidateMode: "onBlur",
} as const
