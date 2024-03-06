import { useSelector } from 'react-redux';
import { FilterByName } from '@/widgets/Filter/ui/FilterByName';
import { FilterByPrice } from '@/widgets/Filter/ui/FilterByPrice';
import { FilterByBrand } from '@/widgets/Filter/ui/FilterByBrand';
import { Button } from '@/shared/ui/Button';
import styles from './Filter.module.scss';
import { productSelectors } from '@/entities/Products';
import { useQuery } from '@/shared/hooks';

export const Filter = () => {
    const { isQuery, onQueryReset } = useQuery();
    const isLoading = useSelector(productSelectors.isLoading);

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
