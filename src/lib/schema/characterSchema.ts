import { z } from "zod";

export const characterSchema = z.object({
  character: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(50, { message: 'Name must be at most 50 characters long.' }),

  voice: z
    .string()
    .min(1, { message: 'Voice is required.' })
    .max(30, { message: 'Voice must be at most 30 characters long.' }),

  visibility: z
    .string()
    .min(1, { message: 'Visibility is required.' })
    .max(20, { message: 'Visibility must be at most 20 characters long.' }),

  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .max(200, { message: 'Description must be at most 200 characters long.' }),

  prompt: z
    .string()
    .min(5, { message: 'Prompt must be at least 5 characters long.' })
    .max(150, { message: 'Prompt must be at most 150 characters long.' }),

  image: z.string().min(3, { message: 'Image is required.' }),
});
