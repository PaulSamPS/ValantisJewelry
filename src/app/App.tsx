import React, { useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { fetchProducts } from '@/entities/Products';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return <div className='app'>Valantis</div>;
};
