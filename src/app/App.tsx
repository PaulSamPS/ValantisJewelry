import React, { useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { fetchProducts } from '@/entities/Products';
import { AppLink } from '@/shared/ui/AppLink';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <AppLink to={`${__BASE_URL__}`}>Main</AppLink>
            <AppLink to={`${__BASE_URL__}/product`}>Product</AppLink>
        </div>
    );
};
