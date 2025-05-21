import { z } from 'zod';

export const personalDetailsSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    employmentStatus: z.enum(['Employed', 'Self-Employed', 'Unemployed'], {
        required_error: 'Employment status is required',
    }),
    employerName: z.string().optional(),
});

export type PersonalDetailsPageForm = z.infer<typeof personalDetailsSchema>;
