import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IProduct, IProductReq, IProductResponse } from '../types';
import { removeDuplicate } from '@/shared/lib/removeDublicate';
import { IResponse } from '@/shared/types';

export const fetchProducts = createAsyncThunk<IProduct[], IProductReq, ThunkConfig<string>>(
    'fetch/products',
    async ({ offset }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const productsArr = await extra.apiAuth.post<IResponse>('', {
                action: 'get_ids',
                params: { offset, limit: 50 },
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

            return removeDuplicate(items.data.result);
        } catch (e) {
            fetchProducts({ offset });
            return rejectWithValue('Ошибка загрузки данных');
        }
    }
);
