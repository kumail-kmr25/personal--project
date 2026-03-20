import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  budget: z.string().min(1, 'Select a budget range'),
  message: z.string().min(20, 'Please add at least 20 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;
