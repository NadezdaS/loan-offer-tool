import type { ControllerRenderProps, FieldError, FieldValues } from 'react-hook-form';

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps<T extends FieldValues> {
    field: ControllerRenderProps<T>;
    label: string;
    options: Option[];
    error?: FieldError;
}

export default function SelectInput<T extends FieldValues>({ field, label, options, error }: SelectInputProps<T>) {
    return (
        <div style={{ display: 'inline-block', marginLeft: '30px' }}>
            <label htmlFor={field.name} style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                {label}
            </label>
            <select
                {...field}
                id={field.name}
                data-cy={field.name}
                style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    minWidth: '170px'
                }}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (
                <div style={{ color: 'red', marginTop: '4px' }}>{error.message}</div>
            )}
        </div>
    );
}
