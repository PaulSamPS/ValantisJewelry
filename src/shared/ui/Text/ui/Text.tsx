import clsx from 'clsx';
import { TextProps } from '../model/types';
import styles from './Text.module.scss';

export const Text = ({ children, weight = 'regular', error, className, ...restProps }: TextProps) => {
    const classes = clsx(styles.text, styles[weight], error && styles.error, className);

    return (
        <span {...restProps} className={classes}>
            {children}
        </span>
    );
};
