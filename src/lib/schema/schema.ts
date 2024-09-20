import { z } from 'zod';

// Define the schema for the form validation
export const formSchema = z.object({
  firstname: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastname: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  include: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms of service',
  }),
});

// Type for the form schema
export type FormSchema = typeof formSchema;
