import { Controller } from 'react-hook-form';
import type { Control, FieldErrors, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form';
import type { PersonalDetailsPageForm } from '../../../../shared/personalDetailsSchema';
import Button from '../button/Button';
import { BaseInput } from '../input/Input';
import SelectInput from '../select/SelectInput';

interface Props {
    control: Control<PersonalDetailsPageForm>;
    errors: FieldErrors<PersonalDetailsPageForm>;
    handleSubmit: UseFormHandleSubmit<PersonalDetailsPageForm>;
    watch: UseFormWatch<PersonalDetailsPageForm>;
    onSubmit: (data: PersonalDetailsPageForm) => void;
}

export default function PersonalDetailsForm({ control, errors, handleSubmit, watch, onSubmit }: Props) {
    const employmentStatus = watch('employmentStatus');

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', marginBottom: '20px' }}>
            <Controller name="firstName" control={control} render={({ field }) => <BaseInput field={field} label={'First Name'} placeholder="First Name..." error={errors.firstName} />} />
            <Controller name="lastName" control={control} render={({ field }) => <BaseInput field={field} label={'Last Name'} placeholder="Last Name..." error={errors.lastName} />} />
            <Controller name="email" control={control} render={({ field }) => <BaseInput field={field} label={'Email address'} type={'email'} placeholder="email..." error={errors.email} />} />
            <Controller name="employmentStatus" control={control} render={({ field }) => (
                <SelectInput<PersonalDetailsPageForm>
                    field={field}
                    label="Employment Status"
                    options={[
                        { value: 'Employed', label: 'Employed' },
                        { value: 'Self-Employed', label: 'Self-Employed' },
                        { value: 'Unemployed', label: 'Unemployed' },
                    ]}
                    error={errors.employmentStatus}
                />
            )} />
            {employmentStatus === 'Employed' && (
                <Controller name="employerName" control={control} render={({ field }) => <BaseInput field={field} label={'Employer Name'} placeholder="employer name..." error={errors.employerName} />} />
            )}
            <Button id='personal-details-page-next-btn' type="submit" className='ml-20' data-cy='personal-details-page-next-button'>Next</Button>

        </form>
    );
}
