import React from 'react';
import styles from './FetchError.module.scss';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

interface FetchErrorProps {
    error: string;
}
export const FetchError = ({ error }: FetchErrorProps) => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={styles.error}>
            <Text weight='medium' error>
                {error}
            </Text>
            <Button size='m' appearance='primary' onClick={reloadPage}>
                Обновить страницу
            </Button>
        </div>
    );
};
