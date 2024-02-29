import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchProducts = createAsyncThunk<void, void, ThunkConfig<string>>(
    'fetch/products',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.apiAuth.post('', {
                action: 'get_items',
            });

            if (!response.data) {
                throw new Error();
            }

            console.log(response);

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    }
);
