import clsx from 'clsx';
import { ButtonHTMLAttributes, memo } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: 's' | 'm' | 'l';
    appearance: 'primary' | 'clear';
}

export const Button = memo(({ className, children, appearance, size = 'm', ...otherProps }: ButtonProps) => {
    const classes: { [p: number]: boolean | undefined } = {
        [styles[appearance]]: true,
        [styles[size]]: true,
    };

    return (
        // eslint-disable-next-line react/button-has-type
        <button className={clsx(styles.button, classes, className)} {...otherProps}>
            {children}
        </button>
    );
});
