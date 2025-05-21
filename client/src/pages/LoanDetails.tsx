import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loanApplicationSchema, type LoanApplicationForm } from '../../../shared/loanApplicationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitLoanApplication } from '../services/loanService';
import LoanDetailsForm from '../components/form/LoanDetailsForm';
import { getInitialFormValues } from '../utils/getInitialFormValues';

export default function LoanDetails() {
	const navigate = useNavigate();

	const loanDefaults: Partial<LoanApplicationForm> = {
		loanPurpose: '',
		amount: 2000,
		deposit: 0,
		loanTerm: 1,
	};

	const defaultValues = getInitialFormValues(loanDefaults, 'loanForm');

	const { control, formState: { errors }, handleSubmit, watch } = useForm<LoanApplicationForm>({
		resolver: zodResolver(loanApplicationSchema),
		defaultValues,
	});

	const onSubmit = async (data: LoanApplicationForm) => {
		const existing = JSON.parse(localStorage.getItem('loanForm') || '{}');
		const merged = { ...existing, ...data };
		localStorage.setItem('loanForm', JSON.stringify(merged));
		const res = await submitLoanApplication(merged);
		navigate(`/results/${res.applicationId}`);
	};

	return (
		<div>
			<h2>Loan Details</h2>
			<p>Enter your loan details, then click 'Submit' to see lenders offers.</p>
			<LoanDetailsForm
				control={control}
				errors={errors}
				handleSubmit={handleSubmit}
				watch={watch}
				onSubmit={onSubmit}
			/>
		</div>

	);
}