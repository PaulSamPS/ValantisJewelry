import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@/shared/ui/Spinner';
import {
    getCurrentPageState,
    getProductsIsLoadingState,
    getProductsState,
    getTotalPagesState,
    ProductList,
} from '@/entities/Products';
import { Paginate } from '@/widgets/Paginate';

const Main = () => {
    const products = useSelector(getProductsState);
    const isLoading = useSelector(getProductsIsLoadingState);
    const totalPages = useSelector(getTotalPagesState);
    const currentPage = useSelector(getCurrentPageState);

    return (
        <>
            {isLoading ? <Spinner /> : <ProductList products={products} />}
            <Paginate currentPage={currentPage} arr={totalPages} isLoading={isLoading} />
        </>
    );
};
export default Main;
