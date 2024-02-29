import clsx from 'clsx';
import { AllHTMLAttributes } from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps extends AllHTMLAttributes<HTMLDivElement> {
    background?: string;
}

export const Spinner = ({
    background = 'var(--color)',
    className,
    'aria-label': ariaLabel = 'Загружается...',
}: SpinnerProps) => (
    <div className={clsx(styles.wrapper, className)}>
        <span role='status' aria-label={ariaLabel} className={styles.spinner}>
            <div style={{ background }} />
            <div style={{ background }} />
            <div style={{ background }} />
            <div style={{ background }} />
        </span>
    </div>
);
