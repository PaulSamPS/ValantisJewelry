import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IProduct, IProductReq, IProductResponse } from '../types';
import { removeDuplicate } from '@/shared/lib/removeDublicate';
import { IResponse } from '@/shared/types';

const cache: Map<number, IProduct[]> = new Map();

export const all = createAsyncThunk<IProduct[], IProductReq, ThunkConfig<string>>(
    'fetch/all',
    async ({ offset }, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            if (!cache.has(offset)) {
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

                const result = removeDuplicate(items.data.result);

                cache.set(offset, result);

                return result;
            }
            return Array.from(cache.get(offset)!);
        } catch (e) {
            dispatch(all({ offset }));
            return rejectWithValue('Ошибка загрузки данных');
        }
    }
);
