import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FilterByName } from '@/features/FilterByName';
import { FilterByPrice } from '@/features/FilterByPrice';
import { FilterByBrand } from '@/features/FilterByBrand';
import { Button } from '@/shared/ui/Button';
import styles from './Filter.module.scss';
import { productSelectors } from '@/entities/Products';
import { useAppDispatch, useQuery } from '@/shared/hooks';
import { fetchBrands } from '@/entities/Brands/model/services/fetchBrands';

export const Filter = () => {
    const { isQuery, onQueryReset } = useQuery();
    const isLoading = useSelector(productSelectors.isLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);

    return (
        <div className={styles.filter}>
            <FilterByName />
            <FilterByPrice />
            <FilterByBrand />
            <Button size='m' appearance='secondary' onClick={onQueryReset} disabled={!isQuery || isLoading}>
                Сбросить фильтры
            </Button>
        </div>
    );
};
