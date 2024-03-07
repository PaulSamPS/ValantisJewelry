import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks';
import { Input } from '@/shared/ui/Input';
import styles from './FilterByName.module.scss';
import { Button } from '@/shared/ui/Button';
import { productSelectors, fetchProducts } from '@/entities/Products';

export const FilterByName = () => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(productSelectors.isLoading);
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ search: `${value}`, page: '1' });
        dispatch(fetchProducts.byName({ product: value })).finally(() => setValue(''));
    };

    useEffect(() => {
        if (searchParams.get('search')) {
            const queryValue = searchParams.get('search');
            dispatch(fetchProducts.byName({ product: queryValue! }));
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
            <Button size='s' appearance='primary' type='submit' disabled={value.trim().length <= 0 || isLoading}>
                Поиск
            </Button>
        </form>
    );
};
