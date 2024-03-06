import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@/shared/ui/Spinner';
import { fetchProducts, productSelectors, ProductList } from '@/entities/Products';
import { Paginate, paginateSelectors } from '@/features/Paginate';
import { useAppDispatch, useQuery } from '@/shared/hooks';
import styles from './Main.module.scss';
import { Title } from '@/shared/ui/Title';
import { Filter } from '@/widgets/Filter/ui/Filter';

const Main = () => {
    const dispatch = useAppDispatch();
    const offset = useSelector(paginateSelectors.currentOffset);
    const totalPages = useSelector(paginateSelectors.totalPages);
    const currentPage = useSelector(paginateSelectors.currentPage);
    const products = useSelector(productSelectors.products);
    const isLoading = useSelector(productSelectors.isLoading);
    const error = useSelector(productSelectors.error);
    const { isQuery, queryValue } = useQuery();

    useEffect(() => {
        if (isQuery) {
            dispatch(fetchProducts.all({ offset }));
        }
    }, [dispatch, isQuery, offset]);

    const allProducts = useCallback(() => {
        if (!isQuery) {
            return products?.slice(offset, offset + 50);
        }
        return products;
    }, [offset, products]);

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
                            {`Результатаы поиска по  
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
