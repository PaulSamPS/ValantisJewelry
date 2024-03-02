import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IResponseArr } from '../types';

export const fetchTotalCountProducts = createAsyncThunk<number, void, ThunkConfig<string>>(
    'fetch/totalCountProducts',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const productsAll = await extra.apiAuth.post<IResponseArr>('', {
                action: 'get_ids',
            });

            if (!productsAll.data) {
                throw new Error();
            }
            console.log(productsAll.data.result.length);

            return Math.ceil(productsAll.data.result.length / 50);
        } catch (e) {
            return rejectWithValue('error');
        }
    }
);
