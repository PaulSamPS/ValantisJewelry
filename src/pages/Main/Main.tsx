import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/shared/ui/Spinner';
import { fetchProducts, getProductsIsLoadingState, getProductsState, ProductList } from '@/entities/Products';
import {
    getPaginateOffsetState,
    getPaginatePageState,
    getPaginateTotalPagesState,
    Paginate,
} from '@/features/Paginate';
import { useAppDispatch } from '@/shared/hooks';

const Main = () => {
    const dispatch = useAppDispatch();
    const offset = useSelector(getPaginateOffsetState);
    const products = useSelector(getProductsState);
    const isLoading = useSelector(getProductsIsLoadingState);
    const totalPages = useSelector(getPaginateTotalPagesState);
    const currentPage = useSelector(getPaginatePageState);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get('search') && !searchParams.get('price') && !searchParams.get('brand')) {
            dispatch(fetchProducts({ offset }));
        }
    }, [dispatch, offset, searchParams]);

    const allProducts = useCallback(() => {
        if (searchParams.get('search') || searchParams.get('price') || searchParams.get('brand')) {
            return products?.slice(offset, offset + 50);
        }
        return products;
    }, [offset, products, searchParams]);

    return (
        <>
            {isLoading ? <Spinner /> : <ProductList products={allProducts()} />}
            {totalPages?.length > 1 && <Paginate currentPage={currentPage} arr={totalPages} isLoading={isLoading} />}
        </>
    );
};
export default Main;
