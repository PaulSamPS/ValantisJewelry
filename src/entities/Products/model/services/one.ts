import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IOneReq, IProduct, IProductResponse } from '../types';
import { removeDuplicate } from '@/shared/lib/removeDublicate';

const cache: Map<string, IProduct[]> = new Map();

export const one = createAsyncThunk<IProduct[], IOneReq, ThunkConfig<string>>(
    'fetch/one',
    async ({ productId }, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            if (!cache.has(productId)) {
                const items = await extra.apiAuth.post<IProductResponse>('', {
                    action: 'get_items',
                    params: { ids: [productId] },
                });

                if (!items.data) {
                    throw new Error();
                }

                const { result } = items.data;

                cache.set(productId, result);

                return result;
            }
            return Array.from(cache.get(productId)!);
        } catch (e) {
            dispatch(one({ productId }));
            return rejectWithValue('Ошибка загрузки данных');
        }
    }
);
