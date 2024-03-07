import * as React from 'react';
import cx from 'clsx';
import { ParagraphProps } from '../model/types/Paragraph.props';
import styles from './Paragraph.module.scss';

export const Paragraph = ({ weight, children, className, ...restProps }: ParagraphProps) => {
    const classes = cx(className, styles.paragraph, styles[weight]);

    return (
        <p className={classes} {...restProps}>
            {children}
        </p>
    );
};
