import React, { useEffect, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { getBrandsState } from '@/entities/Brands/model/selectors/getBrandsState';
import { useAppDispatch } from '@/shared/hooks';
import { filterProductsByBrand } from '@/features/FilterByBrand/model/services/filterProductsByBrand';
import styles from './FilterByBrands.module.scss';
import { Text } from '@/shared/ui/Text';
import { Spinner } from '@/shared/ui/Spinner';
import { getBrandsIsLoadingState } from '@/entities/Brands/model/selectors/getBrandsIsLoadingState';

export const FilterByBrand = () => {
    const brands = useSelector(getBrandsState);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('brand');
    const isLoading = useSelector(getBrandsIsLoadingState);

    const handleClick = (brand: string) => {
        setSearchParams({ brand: `${brand}`, page: '1' });
        dispatch(filterProductsByBrand({ brand }));
    };

    const handleKeyboardClick = (brand: string, e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setSearchParams({ brand: `${brand}`, page: '1' });
            dispatch(filterProductsByBrand({ brand }));
        }
    };

    useEffect(() => {
        if (searchParams.get('brand')) {
            const queryValue = searchParams.get('brand');
            dispatch(filterProductsByBrand({ brand: queryValue! }));
        }
    }, []);

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
                            className={clsx(styles['brand-name'], query === b && styles.active)}
                            onClick={() => handleClick(b)}
                            onKeyDown={(e) => handleKeyboardClick(b, e)}
                        >
                            {b === null ? 'No_brand' : b}
                        </span>
                    ))
                )}
            </div>
        </div>
    );
};
