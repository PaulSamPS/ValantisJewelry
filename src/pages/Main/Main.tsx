import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/shared/ui/Spinner';
import {
    fetchProducts,
    getProductsErrorState,
    getProductsIsLoadingState,
    getProductsState,
    ProductList,
} from '@/entities/Products';
import {
    getPaginateOffsetState,
    getPaginatePageState,
    getPaginateTotalPagesState,
    Paginate,
} from '@/features/Paginate';
import { useAppDispatch } from '@/shared/hooks';
import { FilterByName } from '@/features/FilterByName/FilterByName';
import { FilterByPrice } from '@/features/FilterByPrice/FilterByPrice';
import { FilterByBrand } from '@/features/FilterByBrand';
import styles from './Main.module.scss';
import { Button } from '@/shared/ui/Button';

const Main = () => {
    const dispatch = useAppDispatch();
    const offset = useSelector(getPaginateOffsetState);
    const products = useSelector(getProductsState);
    const isLoading = useSelector(getProductsIsLoadingState);
    const totalPages = useSelector(getPaginateTotalPagesState);
    const currentPage = useSelector(getPaginatePageState);
    const error = useSelector(getProductsErrorState);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (!searchParams.get('search') && !searchParams.get('price') && !searchParams.get('brand')) {
            dispatch(fetchProducts({ offset }));
        }
    }, [dispatch, offset, searchParams]);

    useEffect(() => {
        if (searchParams.get('search')) {
            setIsDisabled(false);
        } else if (searchParams.get('price')) {
            setIsDisabled(false);
        } else if (searchParams.get('brand')) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [searchParams]);

    const allProducts = useCallback(() => {
        if (searchParams.get('search') || searchParams.get('price') || searchParams.get('brand')) {
            return products?.slice(offset, offset + 50);
        }
        return products;
    }, [offset, products, searchParams]);

    return (
        <div className={styles.wrapper}>
            <section className={styles.top}>
                <FilterByName />
                <FilterByPrice />
                <FilterByBrand />
                <Button size='m' appearance='secondary' onClick={() => setSearchParams('page=1')} disabled={isDisabled}>
                    Сбросить фильтры
                </Button>
            </section>
            {isLoading ? <Spinner /> : <ProductList products={allProducts()} error={error!} />}
            {totalPages?.length > 1 && !error && (
                <Paginate currentPage={currentPage} arr={totalPages} isLoading={isLoading} />
            )}
        </div>
    );
};
export default Main;
