import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IProduct, IProductResponse } from '@/entities/Products';
import { IResponse } from '@/shared/types';
import { paginateActions } from '@/features/Paginate';
import { removeDuplicate } from '@/shared/lib/removeDublicate';

interface IFilterByNameProps {
    product: string;
}

const cache: Map<string, IProduct[]> = new Map();

export const byName = createAsyncThunk<IProduct[], IFilterByNameProps, ThunkConfig<string>>(
    'filter/byName',
    async ({ product }, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            if (!cache.has(product)) {
                const productsArr = await extra.apiAuth.post<IResponse>('', {
                    action: 'filter',
                    params: { product },
                });

                if (!productsArr.data) {
                    throw new Error();
                }

                const items = await extra.apiAuth.post<IProductResponse>('', {
                    action: 'get_items',
                    params: { ids: productsArr.data.result },
                });

                if (!items.data) {
                    throw new Error();
                }

                const products = removeDuplicate(items.data.result);

                dispatch(paginateActions.setTotalPages(Math.ceil(products.length / 50)));

                cache.set(product, products);

                return products;
            }

            return Array.from(cache.get(product)!);
        } catch (e) {
            dispatch(byName({ product }));
            return rejectWithValue('Ошибка загрузки данных');
        }
    }
);
