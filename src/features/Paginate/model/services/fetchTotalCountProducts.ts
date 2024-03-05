import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IResponse } from '@/shared/types';
import { removeDublicateString } from '@/shared/lib/removeDublicateString';

export const fetchTotalCountProducts = createAsyncThunk<number, void, ThunkConfig<string>>(
    'fetch/totalCountProducts',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const productsAll = await extra.apiAuth.post<IResponse>('', {
                action: 'get_ids',
            });

            if (!productsAll.data) {
                throw new Error();
            }

            const total = removeDublicateString(productsAll.data.result);

            return Math.ceil(total.length / 50);
        } catch (e) {
            fetchTotalCountProducts();
            return rejectWithValue('error');
        }
    }
);
