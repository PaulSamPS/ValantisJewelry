import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetchProducts';
import { ProductsSchema } from '../types';

const initialState: ProductsSchema = {
    products: undefined,
    error: undefined,
    isLoading: false,
};

export const profileSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productActions } = profileSlice;
export const { reducer: productsReducer } = profileSlice;
