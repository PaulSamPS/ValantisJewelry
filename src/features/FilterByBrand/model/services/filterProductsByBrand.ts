import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IProduct, IProductResponse, productActions } from '@/entities/Products';
import { IResponse } from '@/shared/types';
import { paginateActions } from '@/features/Paginate';
import { removeDuplicate } from '@/shared/lib/removeDublicate';

interface IFilterByNameProps {
    brand: string;
}

export const filterProductsByBrand = createAsyncThunk<IProduct[], IFilterByNameProps, ThunkConfig<string>>(
    'filter/byBrand',
    async ({ brand }, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const productsArr = await extra.apiAuth.post<IResponse>('', {
                action: 'filter',
                params: { brand },
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

            const products = removeDuplicate(items.data.result);

            dispatch(paginateActions.setTotalPages(Math.ceil(products.length / 50)));

            return products;
        } catch (e) {
            return rejectWithValue('Ошибка загрузки данных');
        }
    }
);
