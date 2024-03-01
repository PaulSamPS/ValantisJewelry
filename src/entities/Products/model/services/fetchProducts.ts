import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IProduct, IProductReq, IProductResponse, IResponseArr } from '../types';
import { productActions } from '@/entities/Products';
import { removeDuplicate } from '@/entities/Products/model/lib/removeDublicate';

export const fetchProducts = createAsyncThunk<IProduct[], IProductReq, ThunkConfig<string>>(
    'fetch/products',
    async ({ offset }, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const productsArr = await extra.apiAuth.post<IResponseArr>('', {
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

            const productsAll = await extra.apiAuth.post<IResponseArr>('', {
                action: 'get_ids',
            });

            if (!productsAll.data) {
                throw new Error();
            }

            dispatch(productActions.setTotalPages(Math.ceil(productsAll.data.result.length / 50)));

            return removeDuplicate(items.data.result);
        } catch (e) {
            return rejectWithValue('error');
        }
    }
);
