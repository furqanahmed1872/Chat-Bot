import { z } from 'zod';

// Define the schema for the form validation
export const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
