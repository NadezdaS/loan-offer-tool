import type { LoanApplication, LenderData } from '../../../shared/types';

const applications: LoanApplication[] = [];

export const applicationStore = {
	getById: (id: number) => applications[id],
	add: (application: LoanApplication): number => {
		applications.push(application);
		return applications.length - 1;
	},
};

export const lenders: LenderData[] = [
	{ lenderName: 'Lender A', interestRate: 5.5, fee: 10 },
	{ lenderName: 'Lender B', interestRate: 5.0, fee: 15 },
	{ lenderName: 'Lender C', interestRate: 6.0, fee: 0 },
];