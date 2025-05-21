import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export default function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
    const variantClass = variant === 'secondary' ? styles.secondary : styles.primary;

    return (
        <button className={`${styles.button} ${variantClass} ${className ?? ''}`} type={type} {...props} />
    );
}