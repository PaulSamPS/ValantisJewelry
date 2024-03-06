import React from 'react';
import styles from './FetchError.module.scss';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { useReFetch } from '@/widgets/FetchError/model/hooks/useReFetch';

interface FetchErrorProps {
    error?: string;
}
export const FetchError = ({ error = 'Что - то пошло не так' }: FetchErrorProps) => {
    const { reFetch } = useReFetch();

    return (
        <div className={styles.error}>
            <Text weight='medium' error>
                {error}
            </Text>
            <Button size='m' appearance='primary' onClick={reFetch}>
                Повторить
            </Button>
        </div>
    );
};
