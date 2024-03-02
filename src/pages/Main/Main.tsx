import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@/shared/ui/Spinner';
import { getProductsIsLoadingState, getProductsState, ProductList } from '@/entities/Products';
import Paginate from '@/widgets/Paginate/Paginate';
import { getTotalPagesState } from '@/entities/Products/model/selectors/getTotalPagesState';
import { getCurrentPageState } from '@/entities/Products/model/selectors/getCurrentPageState';

const Main = () => {
    const products = useSelector(getProductsState);
    const isLoading = useSelector(getProductsIsLoadingState);
    const totalPages = useSelector(getTotalPagesState);
    const currentPage = useSelector(getCurrentPageState);

    return (
        <>
            {/* {isLoading ? <Spinner /> : <ProductList products={products} />} */}
            <Paginate currentPage={currentPage} arr={totalPages} />
        </>
    );
};
export default Main;
