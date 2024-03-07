import React from 'react';

export interface TitleProps extends Omit<React.AllHTMLAttributes<HTMLElement>, 'size'> {
    weight: 'regular' | 'medium' | 'bold';
    size: 'h1' | 'h2';
    uppercase?: boolean;
}
