import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks';
import { filterProductsByPrice } from '@/features/FilterByPrice/model/services/filterProductsByPrice';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import styles from './FilterByPrice.module.scss';

const REGEXP = /[\D]+/g;
export const FilterByPrice = () => {
    const [value, setValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.replace(REGEXP, ''));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ price: `${value}` });
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
            <Button size='s' appearance='primary' type='submit' disabled={value.length <= 0}>
                Поиск
            </Button>
        </form>
    );
};
