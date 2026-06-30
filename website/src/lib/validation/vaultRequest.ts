import { z } from 'zod';

export const vaultRequestSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  role: z.string().min(1, 'Please select your role'),
  technicalChallenge: z.string().optional(),
  agreed: z.boolean().refine(val => val === true, {
    message: 'You must confirm your authority',
  }),
});

export type VaultRequestData = z.infer<typeof vaultRequestSchema>;
