
import { z } from 'zod';

export const loginSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is required" })
    .max(50, { message: "First Name cannot exceed 50 characters" }),
  
  lastName: z
    .string()
    .min(1, { message: "Last Name is required" })
    .max(50, { message: "Last Name cannot exceed 50 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" }),

  agreeToTerms: z
    .boolean()
    .refine((value) => value === true, { message: "You must agree to the terms of service" })
});
