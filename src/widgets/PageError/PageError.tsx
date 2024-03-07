import React from 'react';
import styles from './PageError.module.scss';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

export const PageError = () => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={styles.error}>
            <Text weight='medium' error>
                Что-то пошло не так...
            </Text>
            <Button size='m' appearance='primary' onClick={reloadPage}>
                Обновить страницу
            </Button>
        </div>
    );
};
