import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchProducts } from '@/entities/Products';
import { useAppDispatch } from '@/shared/hooks';
import { paginateSelectors } from '@/features/Paginate';

export const useReFetch = () => {
    const dispatch = useAppDispatch();
    const offset = useSelector(paginateSelectors.currentOffset);
    const [searchParams] = useSearchParams();

    const reFetch = () => {
        const querySearch = searchParams.get('search');
        const queryPrice = searchParams.get('price');
        const queryBrand = searchParams.get('brand');

        if (querySearch) {
            return dispatch(fetchProducts.byName({ product: querySearch! }));
        }

        if (queryPrice) {
            return dispatch(fetchProducts.byPrice({ price: Number(queryPrice) }));
        }

        if (queryBrand) {
            return dispatch(fetchProducts.byBrand({ brand: queryBrand }));
        }

        return dispatch(fetchProducts.all({ offset }));
    };

    return { reFetch };
};
