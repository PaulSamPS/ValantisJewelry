import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FilterByBrand } from '@/entities/Products/ui/FilterByBrand';
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
import { FilterByName } from '@/entities/Products/ui/FilterByName/FilterByName';
import { FilterByPrice } from '@/entities/Products/ui/FilterByPrice/FilterByPrice';
import styles from './Main.module.scss';
import { Button } from '@/shared/ui/Button';
import { Title } from '@/shared/ui/Title';
import { priceRub } from '@/shared/lib/priceRub';

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
    const [isSearchParamsValue, setIsSearchParamsValue] = useState<string>('');

    useEffect(() => {
        if (!searchParams.get('search') && !searchParams.get('price') && !searchParams.get('brand')) {
            dispatch(fetchProducts({ offset }));
        }
    }, [dispatch, offset, searchParams]);

    useEffect(() => {
        if (searchParams.has('search')) {
            setIsSearchParamsValue(`${searchParams.get('search')}`);
            setIsDisabled(false);
        } else if (searchParams.has('price')) {
            setIsSearchParamsValue(`цене ${priceRub(Number(searchParams.get('price')))}`);
            setIsDisabled(false);
        } else if (searchParams.has('brand')) {
            const query = searchParams.get('brand');
            if (query === 'null') {
                setIsSearchParamsValue('продуктам без бренда');
            } else {
                setIsSearchParamsValue(`бренду ${searchParams.get('brand')}`);
            }
            setIsDisabled(false);
        } else {
            setIsSearchParamsValue('');
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
        <section className={styles.wrapper}>
            <Title weight='medium' size='h1'>
                Поиск товаров
            </Title>
            <div className={styles.top}>
                <FilterByName />
                <FilterByPrice />
                <FilterByBrand />
                <Button
                    size='m'
                    appearance='secondary'
                    onClick={() => setSearchParams('page=1')}
                    disabled={isDisabled || isLoading}
                >
                    Сбросить фильтры
                </Button>
            </div>

            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {isSearchParamsValue && (
                        <Title weight='medium' size='h2'>
                            {`Результатаы поиска по  
                    ${isSearchParamsValue}`}
                        </Title>
                    )}
                    <ProductList products={allProducts()} error={error!} />
                </>
            )}
            {totalPages?.length > 1 && !error && (
                <Paginate currentPage={currentPage} arr={totalPages} isLoading={isLoading} />
            )}
        </section>
    );
};
export default Main;
