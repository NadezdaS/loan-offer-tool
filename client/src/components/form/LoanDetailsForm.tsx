import { Controller } from 'react-hook-form';
import type { Control, FieldErrors, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form';
import type { LoanApplicationForm } from '../../../../shared/loanApplicationSchema';
import Button from '../button/Button';
import { BaseInput } from '../input/Input';

interface Props {
    control: Control<LoanApplicationForm>;
    errors: FieldErrors<LoanApplicationForm>;
    handleSubmit: UseFormHandleSubmit<LoanApplicationForm>;
    watch: UseFormWatch<LoanApplicationForm>;
    onSubmit: (data: LoanApplicationForm) => void;
}

export default function LoanDetailsForm({ control, errors, handleSubmit, watch, onSubmit }: Props) {
    const loanPurpose = watch('loanPurpose');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name='loanPurpose' control={control} render={({ field }) => <BaseInput field={field} label={'Loan Purpose'} placeholder='Type purpose...' error={errors.loanPurpose} />} />
            <Controller name='amount' control={control} render={({ field }) => <BaseInput field={field} label={'Amount'} type={'number'} placeholder='Select amount...' error={errors.amount} />} />
            {loanPurpose === 'Vehicle' && (
                <Controller name='deposit' control={control} render={({ field }) => <BaseInput field={field} type={'number'} label={'Deposit'} error={errors.deposit} />} />
            )}
            <Controller name='loanTerm' control={control} render={({ field }) => <BaseInput field={field} type={'number'} label={'Loan Term'} placeholder='Loan Term (Years)' error={errors.loanTerm} />} />
            <Button type='submit' className='ml-20' data-cy='submit-loan-button'>Submit</Button>
        </form>
    );
}
