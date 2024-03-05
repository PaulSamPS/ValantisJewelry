import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './FetchError.module.scss';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { priceRub } from '@/shared/lib/priceRub';
import { useAppDispatch } from '@/shared/hooks';
import {
    fetchProducts,
    filterProductsByBrand,
    filterProductsByName,
    filterProductsByPrice,
} from '@/entities/Products/model/services';
import { getPaginateOffsetState } from '@/features/Paginate';

interface FetchErrorProps {
    error: string;
}
export const FetchError = ({ error }: FetchErrorProps) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const offset = useSelector(getPaginateOffsetState);
    const reloadPage = () => {
        if (searchParams.has('search')) {
            const query = searchParams.get('search');
            dispatch(filterProductsByName({ product: query! }));
        } else if (searchParams.has('price')) {
            const query = searchParams.get('price');
            dispatch(filterProductsByPrice({ price: Number(query!) }));
        } else if (searchParams.has('brand')) {
            const query = searchParams.get('brand');
            dispatch(filterProductsByBrand({ brand: query! }));
        } else {
            dispatch(fetchProducts({ offset }));
        }
    };

    return (
        <div className={styles.error}>
            <Text weight='medium' error>
                {error}
            </Text>
            <Button size='m' appearance='primary' onClick={reloadPage}>
                Повторить
            </Button>
        </div>
    );
};
