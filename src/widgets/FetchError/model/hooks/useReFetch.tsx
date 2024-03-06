import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchProducts } from '@/entities/Products';
import { useAppDispatch, useQuery } from '@/shared/hooks';
import { paginateSelectors } from '@/features/Paginate';

export const useReFetch = () => {
    const dispatch = useAppDispatch();
    const offset = useSelector(paginateSelectors.currentOffset);
    const [searchParams] = useSearchParams();
    const { queryValue } = useQuery();

    const reFetch = () => {
        const newQuery = searchParams.get(queryValue);

        switch (queryValue) {
            case 'search':
                return dispatch(fetchProducts.byName({ product: newQuery! }));
            case 'price':
                return dispatch(fetchProducts.byPrice({ price: Number(newQuery) }));
            case 'brand':
                return dispatch(fetchProducts.byBrand({ brand: newQuery }));
            default:
                return dispatch(fetchProducts.all({ offset }));
        }
    };

    return { reFetch };
};
