import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { removeDublicateString } from '@/shared/lib/removeDublicateString';
import { IResponse } from '@/shared/types';

const cache: Map<string, string[]> = new Map();

export const fetchBrands = createAsyncThunk<string[], void, ThunkConfig<string>>('fetch/brand', async (_, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    try {
        if (!cache.has('brands')) {
            const resBrands = await extra.apiAuth.post<IResponse>('', {
                action: 'get_fields',
                params: { field: 'brand' },
            });

            if (!resBrands.data) {
                throw new Error();
            }
            const brands = removeDublicateString(resBrands.data.result).sort();

            cache.set('brands', brands);

            return brands;
        }

        return Array.from(cache.get('brands')!);
    } catch (e) {
        dispatch(fetchBrands());
        return rejectWithValue('Ошибка загрузки данных');
    }
});
