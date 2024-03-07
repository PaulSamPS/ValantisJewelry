import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IResponse } from '@/shared/types';
import { removeDublicateString } from '@/shared/lib/removeDublicateString';

const cache: Map<string, number> = new Map();
export const totalPages = createAsyncThunk<number, void, ThunkConfig<string>>(
    'fetch/totalCountProducts',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            if (cache.has('all')) {
                const productsAll = await extra.apiAuth.post<IResponse>('', {
                    action: 'get_ids',
                });

                if (!productsAll.data) {
                    throw new Error();
                }

                const total = Math.ceil(removeDublicateString(productsAll.data.result).length / 50);

                cache.set('all', total);

                return total;
            }
            return Number(cache.get('all'));
        } catch (e) {
            dispatch(totalPages());
            return rejectWithValue('error');
        }
    }
);
