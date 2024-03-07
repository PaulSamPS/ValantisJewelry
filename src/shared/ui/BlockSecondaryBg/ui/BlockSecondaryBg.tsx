import React from 'react';
import clsx from 'clsx';
import { IBlockSecondaryBgType } from '@/shared/ui/BlockSecondaryBg/model/types';
import styles from './BlockSecondaryBg.module.scss';

export const BlockSecondaryBg = ({ children, className, ...otherProps }: IBlockSecondaryBgType) => (
    <div className={clsx(styles.wrapper, className)} {...otherProps}>
        {children}
    </div>
);
