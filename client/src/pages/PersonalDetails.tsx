import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalDetailsSchema, type PersonalDetailsPageForm } from '../../../shared/personalDetailsSchema';
import { useNavigate } from 'react-router-dom';
import PersonalDetailsForm from '../components/form/PersonalDetailsForm';

export default function PersonalDetails() {
	const navigate = useNavigate();

	const defaultValues: PersonalDetailsPageForm = {
		firstName: '',
		lastName: '',
		email: '',
		employmentStatus: 'Employed',
		employerName: '',
	};

	const { control, formState: { errors }, handleSubmit, watch } = useForm<PersonalDetailsPageForm>({
		resolver: zodResolver(personalDetailsSchema),
		defaultValues: defaultValues,
	});

	const onSubmit = (data: PersonalDetailsPageForm) => {
		localStorage.setItem('loanForm', JSON.stringify(data));
		navigate('/loan-details');
	};

	return (
		<div>
			<h2>Personal Details</h2>
			<p>Enter your personal details, then click 'Next' to continue.</p>
			<PersonalDetailsForm
				control={control}
				errors={errors}
				handleSubmit={handleSubmit}
				watch={watch}
				onSubmit={onSubmit}
			/>
		</div>

	);
}