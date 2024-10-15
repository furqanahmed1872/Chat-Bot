import { z } from 'zod';

// Define the schema for the form validation
export const formSchema = z.object({
  firstname: z
    .string()
    .min(1, 'First name is required')
    .max(10, 'First name is too long')
    .regex(/^[A-Za-z\s'-]+$/, 'First name must only contain letters'),
  lastname: z
    .string()
    .min(1, 'Last name is required')
    .max(10, 'Last name is too long')
    .regex(/^[A-Za-z\s'-]+$/, 'Last name must only contain letters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  include: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms of service.',
  }),
});
