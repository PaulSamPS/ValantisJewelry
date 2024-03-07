import { AllHTMLAttributes } from 'react';

export interface TextProps extends AllHTMLAttributes<HTMLSpanElement>{
    weight: 'regular' | 'medium'
    error?: boolean;
}
