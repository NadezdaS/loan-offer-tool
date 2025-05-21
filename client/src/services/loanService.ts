import axios from 'axios';
import type { LoanApplicationForm } from '../../../shared/loanApplicationSchema';
import type { LoanApplicationResponse, LenderOffer } from '../../../shared/types';

const API_BASE = 'http://localhost:8080/api';

export const submitLoanApplication = async (data: LoanApplicationForm): Promise<LoanApplicationResponse> => {
	const res = await axios.post<LoanApplicationResponse>(`${API_BASE}/loan-application`, data);
	return res.data;
};

export const getLenderOffers = async (applicationId: number): Promise<LenderOffer[]> => {
	const res = await fetch(`${API_BASE}/lender-offers/${applicationId}`);
	if (!res.ok) {
		throw new Error(`Application with id ${applicationId} not found`);
	} 
	const data: { offers: LenderOffer[] } = await res.json();
	return data.offers;
};
