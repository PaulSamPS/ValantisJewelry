import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IProduct, IProductResponse } from '@/entities/Products';
import { IResponse } from '@/shared/types';
import { paginateActions } from '@/features/Paginate';
import { removeDuplicate } from '@/shared/lib/removeDublicate';

interface IFilterByNameProps {
    price: number;
}

const cache: Map<number, IProduct[]> = new Map();

export const byPrice = createAsyncThunk<IProduct[], IFilterByNameProps, ThunkConfig<string>>(
    'filter/byPrice',
    async ({ price }, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            if (!cache.has(price)) {
                const productsArr = await extra.apiAuth.post<IResponse>('', {
                    action: 'filter',
                    params: { price },
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

                cache.set(price, products);

                return products;
            }
            return Array.from(cache.get(price)!);
        } catch (e) {
            dispatch(byPrice({ price }));
            return rejectWithValue('Ошибка загрузки данных');
        }
    }
);
