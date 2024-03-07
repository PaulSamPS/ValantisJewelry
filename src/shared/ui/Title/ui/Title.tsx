import clsx from 'clsx';
import { ElementType } from 'react';
import { TitleProps } from '../model/types';
import styles from './Title.module.scss';

export const Title = ({ children, weight = 'bold', size = 'h1', uppercase, className, ...restProps }: TitleProps) => {
    const Component = `${size}` as ElementType;

    const classes = clsx(styles[size], styles.title, styles[weight], uppercase && styles.uppercase, className);

    return (
        <Component {...restProps} className={classes}>
            {children}
        </Component>
    );
};
