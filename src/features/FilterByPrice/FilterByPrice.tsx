import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterProductsByName } from '@/features/FilterByName/model/services/filterProductsByName';
import { useAppDispatch } from '@/shared/hooks';
import { filterProductsByPrice } from '@/features/FilterByPrice/model/services/filterProductsByPrice';

export const FilterByPrice = () => {
    const [value, setValue] = useState<number | undefined>(undefined);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ price: `${value}` });
        dispatch(filterProductsByPrice({ price: value! })).finally(() => setValue(undefined));
    };

    useEffect(() => {
        if (searchParams.get('price')) {
            const queryValue = searchParams.get('price');
            dispatch(filterProductsByPrice({ price: Number(queryValue!) }));
        }
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <input type='number' onChange={(e) => setValue(Number(e.target.value))} />
        </form>
    );
};
