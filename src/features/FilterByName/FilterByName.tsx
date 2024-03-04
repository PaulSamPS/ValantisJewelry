import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterProductsByName } from '@/features/FilterByName/model/services/filterProductsByName';
import { useAppDispatch } from '@/shared/hooks';
import { Input } from '@/shared/ui/Input';
import styles from './FilterByName.module.scss';
import { Button } from '@/shared/ui/Button';

export const FilterByName = () => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ search: `${value}` });
        dispatch(filterProductsByName({ product: value })).finally(() => setValue(''));
    };

    useEffect(() => {
        if (searchParams.get('search')) {
            const queryValue = searchParams.get('search');
            dispatch(filterProductsByName({ product: queryValue! }));
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <Input
                label='Поиск по названию'
                placeholder='Поиск продукта'
                name='search'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button size='s' appearance='primary' type='submit' disabled={value.trim().length <= 0}>
                Поиск
            </Button>
        </form>
    );
};
