import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/shared/ui/Spinner';
import { fetchProducts, productSelectors, ProductList } from '@/entities/Products';
import { fetchTotalCountProducts, Paginate, paginateActions, paginateSelectors } from '@/features/Paginate';
import { useAppDispatch, useQuery } from '@/shared/hooks';
import styles from './Main.module.scss';
import { Title } from '@/shared/ui/Title';
import { Filter } from '@/widgets/Filter/ui/Filter';
import { fetchBrands } from '@/entities/Brands/model/services/fetchBrands';

const Main = () => {
    const { isQuery, queryValue } = useQuery();
    const dispatch = useAppDispatch();
    const offset = useSelector(paginateSelectors.currentOffset);
    const totalPages = useSelector(paginateSelectors.totalPages);
    const currentPage = useSelector(paginateSelectors.currentPage);
    const products = useSelector(productSelectors.products);
    const isLoading = useSelector(productSelectors.isLoading);
    const error = useSelector(productSelectors.error);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has('page')) {
            const queryPage = searchParams.get('page');
            dispatch(paginateActions.setQueryPage(Number(queryPage)));
            dispatch(paginateActions.setCurrentOffset((Number(queryPage) - 1) * 50));
        }
        if (!isQuery) {
            dispatch(fetchTotalCountProducts());
        }
    }, [dispatch, isQuery, searchParams]);

    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);

    useEffect(() => {
        if (!isQuery) {
            dispatch(fetchProducts.all({ offset }));
        }
    }, [dispatch, offset, isQuery]);

    const allProducts = useCallback(() => {
        if (isQuery) {
            return products?.slice(offset, offset + 50);
        }
        return products;
    }, [offset, products, isQuery]);

    return (
        <section className={styles.wrapper}>
            <Title weight='medium' size='h1'>
                Поиск товаров
            </Title>
            <Filter />
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {queryValue && (
                        <Title weight='medium' size='h2'>
                            {`Результаты поиска по  
                                ${queryValue}`}
                        </Title>
                    )}
                    <ProductList products={allProducts()} error={error!} />
                </>
            )}
            {totalPages?.length > 1 && !error && !isLoading && (
                <Paginate currentPage={currentPage} arr={totalPages} isLoading={isLoading} />
            )}
        </section>
    );
};
export default Main;
