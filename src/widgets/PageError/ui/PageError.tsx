import clsx from 'clsx';
import { AllHTMLAttributes } from 'react';
import styles from './PageError.module.scss';
import { Button } from '@/shared/ui/Button';
import { Paragraph } from '@/shared/ui/Paragraph/Paragraph';

interface PageErrorProps extends AllHTMLAttributes<HTMLDivElement> {}

export const PageError = ({ className }: PageErrorProps) => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={clsx(styles.error, className)}>
            <Paragraph weight='w3'>Что-то пошло не так</Paragraph>
            <Button size='m' appearance='primary' onClick={reloadPage}>
                Обновить страницу
            </Button>
        </div>
    );
};
