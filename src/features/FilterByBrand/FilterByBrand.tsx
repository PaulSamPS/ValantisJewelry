import React, { useEffect, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch } from '@/shared/hooks';
import styles from './FilterByBrands.module.scss';
import { Text } from '@/shared/ui/Text';
import { Spinner } from '@/shared/ui/Spinner';
import { fetchProducts, productSelectors } from '@/entities/Products';
import { brandsSelectors } from '@/entities/Brands';

export const FilterByBrand = () => {
    const dispatch = useAppDispatch();
    const brands = useSelector(brandsSelectors.brands);
    const isLoading = useSelector(brandsSelectors.isLoading);
    const isLoadingProducts = useSelector(productSelectors.isLoading);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('brand');
    const isBrandQuery = searchParams.has('brand');

    const handleClick = (brand: string) => {
        if (!isLoadingProducts) {
            setSearchParams({ brand: `${brand}`, page: '1' });
        }
    };

    const handleKeyboardClick = (brand: string, e: KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoadingProducts) {
            setSearchParams({ brand: `${brand}`, page: '1' });
            dispatch(fetchProducts.byBrand({ brand }));
        }
    };

    useEffect(() => {
        if (isBrandQuery) {
            dispatch(fetchProducts.byBrand({ brand: query === 'null' ? null : query }));
        }
    }, [dispatch, isBrandQuery, query]);

    return (
        <div className={styles.wrapper}>
            <Text weight='regular' className={styles.label}>
                Поиск по бренду
            </Text>
            <div className={clsx(styles['brand-list'], isLoading && styles.loading)}>
                {isLoading ? (
                    <Spinner className={styles.spinner} />
                ) : (
                    brands?.map((b) => (
                        <span
                            role='button'
                            tabIndex={0}
                            aria-label={`Сортировать по бренду ${b}`}
                            key={b}
                            className={clsx(
                                styles['brand-name'],
                                ((query === b && isBrandQuery) || (query === 'null' && b === null)) && styles.active,
                                isLoadingProducts && styles.disabled
                            )}
                            onClick={() => handleClick(b)}
                            onKeyDown={(e) => handleKeyboardClick(b, e)}
                            aria-disabled={isLoadingProducts}
                        >
                            {b === null ? 'No_brand' : b}
                        </span>
                    ))
                )}
            </div>
        </div>
    );
};
