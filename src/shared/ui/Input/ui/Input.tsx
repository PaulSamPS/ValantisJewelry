import clsx from 'clsx';
import React, { ForwardedRef, forwardRef, memo } from 'react';
import styles from './Input.module.scss';
import { InputProps } from '../model/types';

const InputComponent = forwardRef(
    ({ className, error, label, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => (
        <div className={clsx(className, styles.wrapper, label && styles['with-label'])}>
            {label && (
                <label htmlFor={label} className={styles.label}>
                    {label}
                </label>
            )}
            <input
                ref={ref}
                name={label}
                id={label}
                className={clsx(styles.input, {
                    [styles.error]: error,
                })}
                {...props}
            />
            {error && <span className={styles['error-message']}>{error}</span>}
        </div>
    )
);

export const Input = memo(InputComponent);
