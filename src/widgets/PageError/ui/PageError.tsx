import React from 'react';
import { useSelector } from 'react-redux';
import styles from './PageError.module.scss';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { getProductsErrorState } from '@/entities/Products';

export const PageError = () => {
    const error = useSelector(getProductsErrorState);

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
