import * as React from 'react';

export interface ParagraphProps extends React.AllHTMLAttributes<HTMLParagraphElement> {
    weight: 'w1' | 'w2' | 'w3';
}
