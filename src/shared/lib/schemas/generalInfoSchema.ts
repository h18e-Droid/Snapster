import { z } from "zod";

export const generalInfoSchema = z.object({
  userName: z.string()
    .trim()
    .nonempty("Username is required")
    .min(6, "Minimum number of characters is 6")
    .max(30, "Maximum number of characters is 30")
    .regex(/^(?=\S+$)[a-zA-Z0-9_-]+$/, "You can use letters, numbers, dashes and underscores"),
  firstName: z.string()
    .trim()
    .nonempty("Firstname is required")
    .min(1, "Minimum number of characters is 1")
    .max(50, "Maximum number of characters is 50")
    .regex(/^[A-Za-zА-Яа-я]+$/, "You can use only capital letters and lowercase"),
  lastName: z.string()
    .trim()
    .nonempty("Lastname is required")
    .min(1, "Minimum number of characters is 1")
    .max(50, "Maximum number of characters is 50")
    .regex(/^[A-Za-zА-Яа-я]+$/, "You can use only capital letters and lowercase"),
  dateOfBirth: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  aboutMe: z.string()
    .trim()
    .max(200, "Maximum number of characters is 200")
    .regex(/^[0-9A-Za-zА-Яа-я!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]+$/)
    .or(z.literal(""))
    .optional(),
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;
