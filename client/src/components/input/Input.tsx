import type { ControllerRenderProps, FieldError, FieldValues } from 'react-hook-form';

interface BaseInputProps<TFieldValues extends FieldValues> {
	field: ControllerRenderProps<TFieldValues>;
	label: string;
	type?: string;
	error?: FieldError;
	placeholder?: string;
}

export function BaseInput<TFieldValues extends FieldValues>({
	field,
	label,
	type = 'text',
	error,
	placeholder,
}: BaseInputProps<TFieldValues>) {
	return (
		<div style={{ display: 'inline-block', marginLeft: '30px' }}>
			<label htmlFor={field.name} style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
				{label}
			</label>
			<input
				{...field}
				id={field.name}
				type={type}
				placeholder={placeholder}
				data-cy={field.name}
				style={{
					padding: '8px',
					border: '1px solid #ccc',
					borderRadius: '4px',
				}}
			/>
			{error && (
				<div style={{ color: 'red', marginTop: '4px' }} data-cy={`error-${field.name}`}>{error.message}</div>
			)}
		</div>
	);
}
