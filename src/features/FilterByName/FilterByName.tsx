import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterProductsByName } from '@/features/FilterByName/model/services/filterProductsByName';
import { useAppDispatch } from '@/shared/hooks';

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
        <form onSubmit={handleSubmit}>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
    );
};
