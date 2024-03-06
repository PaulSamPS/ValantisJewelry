import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IResponse } from '@/shared/types';
import { removeDublicateString } from '@/shared/lib/removeDublicateString';

export const fetchBrands = createAsyncThunk<string[], void, ThunkConfig<string>>('fetch/brand', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
        const resBrands = await extra.apiAuth.post<IResponse>('', {
            action: 'get_fields',
            params: { field: 'brand' },
        });

        if (!resBrands.data) {
            throw new Error();
        }

        return removeDublicateString(resBrands.data.result).sort();
    } catch (e) {
        return rejectWithValue('Ошибка загрузки данных');
    }
});
