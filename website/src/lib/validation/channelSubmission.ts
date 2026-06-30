import { z } from 'zod';

export const channelSubmissionSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().min(2, 'Company/Project name must be at least 2 characters'),
  role: z.string().min(1, 'Please select your role'),
  tier: z.enum(['Personal', 'Incubation', 'Scale', 'Incident Response']),
  technicalBrief: z.string()
    .min(10, 'Technical brief must be at least 10 characters')
    .max(500, 'Technical brief is limited to 500 characters'),
  referralCode: z.string().optional(),
  ndaReady: z.boolean().refine(val => val === true, {
    message: 'You must check this box to proceed',
  }),
});

export type ChannelSubmissionData = z.infer<typeof channelSubmissionSchema>;
