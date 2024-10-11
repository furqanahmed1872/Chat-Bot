import { z } from 'zod';

// Define the schema for the form validation
export const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
