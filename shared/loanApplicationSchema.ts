import { z } from 'zod';

export const loanApplicationSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	employmentStatus: z.enum(['Employed', 'Self-Employed', 'Unemployed'], {
		required_error: 'Employment status is required',
	}),
	employerName: z.string().optional(),
	loanPurpose: z.string().min(1, 'Loan purpose is required'),
	amount: z.coerce.number().min(2000, 'Minimum loan amount is $2000').max(1000000),
	deposit: z.coerce.number().min(0, 'Deposit cannot be negative'),
	loanTerm: z.coerce.number().min(1).max(7, 'Loan term must be between 1 and 7 years')
})
	.refine((data) => data.deposit <= data.amount, {
		message: 'Deposit must not exceed the loan amount',
		path: ['deposit'],
	});

export type LoanApplicationForm = z.infer<typeof loanApplicationSchema>;