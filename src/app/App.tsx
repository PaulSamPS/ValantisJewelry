import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useQuery } from '@/shared/hooks';
import { AppLink } from '@/shared/ui/AppLink';
import { AppRouter } from '@/app/providers/Router';
import { ThemeSwitcher } from '@/widgets/ThemeSwwitcher';
import styles from './App.module.scss';
import { paginateActions, fetchTotalCountProducts } from '@/features/Paginate';
import { fetchBrands } from '@/entities/Brands/model/services/fetchBrands';
import { Text } from '@/shared/ui/Text';
import { ScrollUp } from '@/widgets/ScrollUp/ScrollUp';

export const App = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { isQuery } = useQuery();

    useEffect(() => {
        if (searchParams.has('page')) {
            const queryPage = searchParams.get('page');
            dispatch(paginateActions.setQueryPage(Number(queryPage)));
            dispatch(paginateActions.setCurrentOffset((Number(queryPage) - 1) * 50));
        }
        if (isQuery) {
            dispatch(fetchTotalCountProducts());
        }
    }, [dispatch, isQuery, searchParams]);

    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <AppLink to={{ pathname: '/', search: 'page=1' }}>
                        <img src='./assets/logo.png' alt='Logo' width={30} height={30} />
                        <Text weight='medium'>Valantis</Text>
                    </AppLink>
                </nav>
                <ThemeSwitcher />
            </header>
            <main className={styles.main}>
                <AppRouter />
                <ScrollUp />
            </main>
            <footer className={styles.footer}>
                Valantis&copy;
                {new Date().getFullYear()}
            </footer>
        </>
    );
};
