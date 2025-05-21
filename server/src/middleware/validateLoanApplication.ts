import { Request, Response, NextFunction } from 'express';
import { loanApplicationSchema } from '../../../shared/loanApplicationSchema';

export function validateLoanApplication(req: Request, res: Response, next: NextFunction): void {
	const result = loanApplicationSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ error: result.error.format() });
	}
	req.body = result.data;
	next();
}

