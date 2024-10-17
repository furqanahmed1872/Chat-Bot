import { z } from 'zod';

// Define the schema for the form validation
export const forgetSchema = z.object({
  email: z.string().email('Invalid email address'),
});
