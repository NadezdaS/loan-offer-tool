export interface LoanApplication {
    firstName: string;
    lastName: string;
    email: string;
    employmentStatus: 'Employed' | 'Self-Employed' | 'Unemployed';
    employerName?: string;
    loanPurpose: string;
    amount: number;
    deposit: number;
    loanTerm: number;
}

export interface LoanApplicationResponse {
    applicationId: number;
}

export interface LenderData {
    lenderName: string;
    interestRate: number;
    fee: number;
}

export interface LenderOffer extends LenderData {
    monthlyRepayment: number;
}

export interface LenderOffersResponse {
    offers: LenderOffer[];
}


