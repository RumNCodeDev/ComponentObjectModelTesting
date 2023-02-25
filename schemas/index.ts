import { z } from "zod";

export const muiRhfFormZodSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First Name is required")
      .max(10, "Maybe a nickname instead?"),
    lastName: z.string().min(3, "Please enter a last name"),
    emailAddress: z.string().email(),
    age: z.string(),
    favoriteColor: z.string().min(1, "I MUST KNOW!!!"),
  })
  .refine(({ age }) => parseInt(age) >= 18, {
    message: "Must be 18 or older",
    path: ["age"],
  });
