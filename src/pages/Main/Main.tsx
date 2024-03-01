import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@/shared/ui/Spinner';
import { getProductsIsLoadingState, getProductsState, ProductList } from '@/entities/Products';

const Main = () => {
    const products = useSelector(getProductsState);
    const isLoading = useSelector(getProductsIsLoadingState);

    if (isLoading) {
        return <Spinner />;
    }

    return <ProductList products={products} />;
};
export default Main;
