import React, { useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { fetchProducts } from '@/entities/Products';
import { AppLink } from '@/shared/ui/AppLink';
import { AppRouter } from '@/app/providers/Router';
import { ThemeSwitcher } from '@/widgets/ThemeSwwitcher';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className='app'>
            <ThemeSwitcher />
            <AppLink to={`${__BASE_URL__}`}>Main</AppLink>
            <AppLink to={`${__BASE_URL__}/product`}>Product</AppLink>
            <AppRouter />
        </div>
    );
};
