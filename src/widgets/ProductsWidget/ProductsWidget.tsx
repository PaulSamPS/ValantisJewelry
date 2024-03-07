import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/shared/ui/Spinner';
import { Title } from '@/shared/ui/Title';
import { fetchProducts, productSelectors, ProductList } from '@/entities/Products';
import { totalPages, Paginate, paginateActions, paginateSelectors } from '@/features/Paginate';
import { useAppDispatch, useQuery } from '@/shared/hooks';

export const ProductsWidget = () => {
    const isLoading = useSelector(productSelectors.isLoading);
    const products = useSelector(productSelectors.products);
    const error = useSelector(productSelectors.error);
    const total = useSelector(paginateSelectors.totalPages);
    const currentPage = useSelector(paginateSelectors.currentPage);
    const offset = useSelector(paginateSelectors.currentOffset);
    const { isQuery, queryValue } = useQuery();
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (searchParams.has('page')) {
            const queryPage = searchParams.get('page');
            dispatch(paginateActions.setQueryPage(Number(queryPage)));
            dispatch(paginateActions.setCurrentOffset((Number(queryPage) - 1) * 50));
        }
        if (!isQuery) {
            dispatch(totalPages());
        }
    }, [dispatch, isQuery, searchParams]);

    useEffect(() => {
        if (!isQuery) {
            dispatch(fetchProducts.all({ offset }));
        }
    }, [dispatch, offset, isQuery]);

    const allProducts = useMemo(() => {
        if (isQuery) {
            return products?.slice(offset, offset + 50);
        }
        return products;
    }, [offset, products, isQuery]);

    return (
        <>
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
                    <ProductList products={allProducts} error={error!} />
                </>
            )}
            {totalPages?.length > 1 && !error && !isLoading && (
                <Paginate currentPage={currentPage} arr={total} isLoading={isLoading} />
            )}
        </>
    );
};
