import { Request, Response } from 'express';
import { applicationStore, lenders } from '../models/dataStore';
import { calculateMonthlyPayment } from '../utils/calculateMontlyPayment';
import { LenderOffersResponse } from '../../../shared/types';

export const handleLoanApplication = (req: Request, res: Response): void => {
	const applicationId = applicationStore.add(req.body);
	res.status(201).json({ message: `Application ${applicationId} received`, applicationId: applicationId });
};

export const getOffers = (req: Request, res: Response<LenderOffersResponse | { error: string }>): void => {
	const applicationId = parseInt(req.params.applicationId);
	const application = applicationStore.getById(applicationId);

	if (!application) {
		res.status(404).json({ error: `Application with id ${applicationId} not found` });
		return;
	}

	const offers = lenders.map((lender) => ({
		lenderName: lender.lenderName,
		interestRate: lender.interestRate,
		fee: lender.fee,
		monthlyRepayment: calculateMonthlyPayment(
			application.amount - application.deposit,
			lender.interestRate,
			application.loanTerm
		)
	}));

	res.json({ offers });
};
