import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks';
import { fetchProducts } from '@/entities/Products';
import { AppLink } from '@/shared/ui/AppLink';
import { AppRouter } from '@/app/providers/Router';
import { ThemeSwitcher } from '@/widgets/ThemeSwwitcher';
import styles from './App.module.scss';
import { getCurrentPageState } from '@/entities/Products/model/selectors/getCurrentPageState';

export const App = () => {
    const dispatch = useAppDispatch();
    const currentPage = useSelector(getCurrentPageState);

    useEffect(() => {
        dispatch(fetchProducts({ offset: currentPage }));
    }, [currentPage, dispatch]);

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <AppLink to={`${__BASE_URL__}`}>Main</AppLink>
                    <AppLink to={`${__BASE_URL__}/product`}>Product</AppLink>
                </nav>
                <ThemeSwitcher />
            </header>
            <main className={styles.main}>
                <AppRouter />
            </main>
            <footer className={styles.footer}>{new Date().getFullYear()}</footer>
        </>
    );
};
