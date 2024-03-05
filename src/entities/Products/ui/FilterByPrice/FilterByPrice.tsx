import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks';
import { filterProductsByPrice } from '../../model/services/filterProductsByPrice';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import styles from './FilterByPrice.module.scss';
import { getProductsIsLoadingState } from '@/entities/Products';

const REGEXP = /[\D]+/g;
export const FilterByPrice = () => {
    const [value, setValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const isLoading = useSelector(getProductsIsLoadingState);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.replace(REGEXP, ''));
    };

    console.log(value.length <= 0 && isLoading);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ price: `${value}`, page: '1' });
        dispatch(filterProductsByPrice({ price: Number(value)! })).finally(() => setValue(''));
    };

    useEffect(() => {
        if (searchParams.get('price')) {
            const queryValue = searchParams.get('price');
            dispatch(filterProductsByPrice({ price: Number(queryValue!) }));
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <Input
                label='Поиск по цене'
                placeholder='Введите цену'
                name='price'
                value={value}
                onChange={(e) => onChange(e)}
            />
            <Button size='s' appearance='primary' type='submit' disabled={value.length <= 0 || isLoading}>
                Поиск
            </Button>
        </form>
    );
};
